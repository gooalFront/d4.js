/**
 * @time 2018年8月13日14:02:48
 * @author joke<277637411@qq.com>
 * @description 柱状图类
 */

import Base from './base';
import * as d3 from 'd3';
import UUID from 'uuid-js';
import tooltip from './tools/tooltip';
import { drawChartTitle } from './tools/title';
import { drawxAxis, drawYAxis } from './tools/axis';
import { drawXTitle, drawYTitle } from './tools/axisTitle';

import { drawLegend } from './tools/legend';
import { pie } from 'd3';

class Pie extends Base {
	constructor(options, rootConfig, styleConfig) {
		super(options, rootConfig, styleConfig);
		// this._validData();
		this._draw();
	}

	_validData() {
		return true;
	}

	_draw() {
		var _self = this;
		var key = 'x';
		var value = 'y';
		var category = 'category';

		this.id = 'd4' + UUID.create().toString().replace(/-/g, '');

		if (this.chart.custom instanceof Array && this.chart.custom[0]) key = this.chart.custom[0];
		if (this.chart.custom instanceof Array && this.chart.custom[1]) value = this.chart.custom[1];
		category = this.chart.custom[2] || key;

		d3.selectAll(this.chart.el + ' svg').remove();
		this.svg = d3
			.select(this.chart.el)
			.append('svg')
			.attr('id', this.id)
			.attr('class', 'd4-chart-content')
			.attr('xmlns', 'http://www.w3.org/2000/svg')
			.attr('version', '1.1')
			.on('click', () => {
				this.resetChartSelect();
			});

		// 默认用key去分类
		var legendArr = {};
		this.chart.data.forEach((val, index) => {
			legendArr[val[category]] = 1;
		});
		legendArr = Object.keys(legendArr);

		var z = d3.scaleOrdinal().domain(legendArr).range(this.colors.slice(0, legendArr.length));
		var indexScale = d3.scaleLinear().range([1,1.2]);

		// 计算图例布局画图例
		// 基础柱状图默认以x轴为图例分类
		this._computedLayout();
		if (!!this.legend && this.legend.show) {
			this._computedLegendLayout(this.svg, legendArr);
			drawLegend.call(this, z);
		}
		this.svg.attr('width', this.layout.w).attr('height', this.layout.h);

		// 弧生成器
		var flag = 2.5;
		var outerR =
			this.chart.outerRadius ||
			(this.layout.area.w < this.layout.area.h ? this.layout.area.w / flag : this.layout.area.h / flag);
		var pie = d3
			.pie()
			.value((d) => d[value])
			.startAngle(this.chart.startAngle / 180 * Math.PI || 0)
			.endAngle(this.chart.endAngle / 180 * Math.PI || 2 * Math.PI);
		var pieArc = d3
			.arc()
			.innerRadius(this.chart.innerRadius || 0)
			.outerRadius(outerR)
			.padAngle(this.chart.padding || 0.01)
			.cornerRadius(this.styleConfig.pirArcConerRadius);
		var outerTextRadius = outerR * 2.5;
		var textArc = d3.arc().innerRadius(0).outerRadius(outerTextRadius);
		// 如果是玫瑰图
		if (this.chart.pieType === 'rose') {
			var rosePie = d3
				.pie()
				.value((d) => 1)
				.startAngle(this.chart.startAngle / 180 * Math.PI || 0)
				.endAngle(this.chart.endAngle / 180 * Math.PI || 2 * Math.PI);
			var roseScale = d3
				.scaleLinear()
				.domain([ d3.min(this.chart.data, (d) => d[value]), d3.max(this.chart.data, (d) => d[value]) ])
				.range([ this.chart.minRadius || this.chart.outerRadius / 2, outerR ]);
		}

		// draw  title
		if ('title' in this.chart) drawChartTitle.call(this, this.layout.padding + this.layout.area.w / 2);

		// computed cx cy
		var disx, disy;
		disx = this.layout.padding + this.layout.area.w / 2;
		disy = this.layout.padding + this.layout.title + this.layout.area.h / 2 - 10;

		// append wrap
		var series = this.svg
			.append('g')
			.attr('class', 'series')
			.attr('transform', 'translate(' + disx + ',' + disy + ')');

		var data = this.chart.pieType === 'rose' ? rosePie(this.chart.data) : pie(this.chart.data);
		// 将各自的生成器  放在数据里面
		this.chart.data.forEach((val, index) => {
			if (this.chart.pieType === 'rose') {
				val['arcGenerator'] = d3
					.arc()
					.innerRadius(this.chart.innerRadius || 0)
					.outerRadius(roseScale(val[value]))
					.padAngle(this.chart.padding || 0.01)
					.cornerRadius(this.styleConfig.pirArcConerRadius);
			} else {
				val['arcGenerator'] = pieArc;
			}
		});

		// append arc
		var arc = series
			.selectAll('path')
			.data(data)
			.enter()
			.append('path')
			.attr('fill', (d) => z(d.data[key]))
			.on('mouseover', function(d) {
				// hover 显示label
				d3.select('.class-'+d.data[key]).style('opacity',1).style('font-weight','bold');

				d3.select(this).transition().style('opacity', '0.6');
				if (_self.tooltip) var html = _self.tooltip(d);
				tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : `x:${d[key]}<br>y:${d[value]}`);
			})
			.on('mousemove', function(d) {
				tooltip.update(d3.event.pageX, d3.event.pageY);
			})
			.on('mouseout', function(d) {
				// 鼠标移出隐藏label
				d3.select('.class-'+d.data[key]).style('opacity',0).style('font-weight','normal');

				d3.select(this).transition().style('opacity', 1);
				tooltip.hide();
			})
			.on('click', function(d, i) {
				if (_self.selectedModule) {
					_self._applyChartSelect(d, d3.select(this), z(d.data[category]));
					// stop default
					d3.event.stopPropagation();
				} else {
					return false;
				}
			})
			.transition()
			.duration(800)
			.attrTween('d', arcTween);

		arc.attr('stroke', 'white').attr('stroke-width', 4).attr('stroke-opacity', 0);
		// 如果可以点击选择 给hover手型
		let chartSelectFlag = false;
		chartSelectFlag =
			'enableChartSelect' in this.chart ? this.chart.enableChartSelect : this.rootConfig.enableChartSelect;
		if (chartSelectFlag && this.chart.onselect) {
			arc.style('cursor', 'pointer');
		}

		function arcTween(a) {
			let startAngle = a.startAngle;
			let i = d3.interpolate(a.startAngle, a.endAngle);
			return function(t) {
				return a.data.arcGenerator({
					startAngle: startAngle,
					endAngle: i(t)
				});
			};
		}

		function appendText(text, d, textd) {
			let [ x, y ] = textArc.centroid(textd);
			series
				.append('text')
				.text(text)
				.attr('transform', 'translate(' + textArc.centroid(textd) + ')')
				.attr('text-anchor', d.startAngle <= Math.PI ? 'start' : 'end')
				.attr('dominant-baseline', 'middle')
				.attr('class','class-'+d.data[key])
				// .attr('fill',z(d.data[key]))
				.style('font-size', _self.styleConfig.fontSize)
				.style('opacity',0)

			// var pos = _self.degTOxy(d.middleAngle / Math.PI * 180, +outerR + 10);
			// var disR = 8;  // 画连线向外扩张的范围
			// var linePoint = _self.degTOxy(d.middleAngle / Math.PI *180 ,+outerR+10+disR);
			// <path d="M250 150 L150 350 L350 350 Z" />
			// series
			// 	.append('path')
			// 	.attr('d',`M${pos.x} ${pos.y} L${linePoint.x} ${linePoint.y} L${x} ${y}`)
			// 	// .attr('x1', pos.x)
			// 	// .attr('y1', pos.y)
			// 	// .attr('x2', x)
			// 	// .attr('y2', y)
			// 	.attr('fill','transparent')
			// 	.attr('stroke', z(d.data[key]));
		}

		var allQuadrant = [ [], [], [], [] ];
		var _self = this;
		// append text
		if (this.chart.showLabel) {
			if (this.chart.pieType === 'common') {
				// var oh = 0;
				// data.forEach(function(d, i) {
				// 	if (!i) {
				// 		var oS = d3.select('body').append('svg').append('text').text(d.data[value]);
				// 		oh = oS.nodes()[0].getBBox().height + 4;
				// 		oS.remove();
				// 	}
				// 	let q = _self.classifyByQuadrant(d, d.data[value], textArc.centroid(d));
				// 	allQuadrant[q['q'] - 1].push(q);
				// });

				// var twoQ = this.computedAngle(allQuadrant,indexScale);
				// twoQ.forEach((v, index) => {
				// 	v.forEach((val,i)=>{
				// 		if(v.length > _self.styleConfig.maxAverageDataLen){
				// 			appendText(val.val,val.srcVal,val.textData);
				// 		}else{
				// 			appendText(val.val, val.srcVal,val.srcVal);
				// 		}
				// 	})
				// });

				data.forEach(val=>{
					appendText(val.data[key],val,val)
				});
			} else if (this.chart.pieType === 'rose') {
				texts
					.attr('x', function(d, i) {
						return 0;
					})
					.attr('y', function(d) {
						return -roseScale(d.data[value]) - 10;
					})
					.attr('transform', (d) => {
						return 'rotate(' + (d.startAngle + (d.endAngle - d.startAngle) / 2) / Math.PI * 180 + ')';
					})
					.attr('text-anchor', 'middle')
					.attr('dominant-baseline', 'top')
					.style('font-size', this.styleConfig.fontSize);
			}
		}
	}

	// 点的角度 转换成坐标值
	degTOxy(start, r) {
		var x, y;
		//1象限
		if (start > 0 && start <= 90) {
			x = Math.cos((90 - start) * Math.PI / 180) * r;
			y = -Math.sin((90 - start) * Math.PI / 180) * r;
		}
		// 2象限
		if (start > 270 && start <= 360) {
			y = -Math.cos((360 - start) * Math.PI / 180) * r;
			x = -Math.sin((360 - start) * Math.PI / 180) * r;
		}
		// 3象限
		if (start > 180 && start <= 270) {
			y = Math.cos((start - 180) * Math.PI / 180) * r;
			x = -Math.sin((start - 180) * Math.PI / 180) * r;
		}
		// 4象限
		if (start > 90 && start <= 180) {
			y = Math.cos((180 - start) * Math.PI / 180) * r;
			x = Math.sin((180 - start) * Math.PI / 180) * r;
		}

		return {
			x: x,
			y: y
		};
	}

	classifyByQuadrant(d, text, pos) {
		/*
			+ - 1
			- - 2
			- + 3
			+ + 4
		*/
		var obj = {
			srcVal: d,
			val: text,
			q: 0,
			pos: pos
		};
		if (pos[0] >= 0 && pos[1] <= 0) {
			obj.q = 1;
		} else if (pos[0] <= 0 && pos[1] <= 0) {
			obj.q = 2;
		} else if (pos[0] <= 0 && pos[1] >= 0) {
			obj.q = 3;
		} else if (pos[0] >= 0 && pos[0] >= 0) {
			obj.q = 4;
		}
		return obj;
	}

	computedAngle(q,indexScale) {
		// 需要分象限的时候把每个象限剩余可用的弧度，弧度范围，平均弧度，中间弧度算出来
		// 算出两个象限的弧度范围 平分到两个象限的所有label
		// 然后两个象限一起画
		let oneFour = q[0].concat(q[3]);
		let twoThr = q[1].concat(q[2]);
		oneFour.sort((a, b) => b.pos[1] - a.pos[1]);
		twoThr.sort((a, b) => b.pos[1] - a.pos[1]);

		var newQ = [ oneFour, twoThr ];
		var spaceDis = 0.2;
		newQ.forEach((v,m) => {
			if (v.length) {
				let rangeDis = Math.PI - spaceDis*2;
				let dis = rangeDis / v.length ;
				v.forEach((val, index) => {
					let startAngle,endAngle;
					if(!index){
						// 1 4
						if(!m){
							startAngle = Math.PI - spaceDis ;
							endAngle = startAngle - dis;
						}else{
							// 2 3
							startAngle = Math.PI + spaceDis;
							endAngle = startAngle +dis;
						}
					}else{
						startAngle = v[index-1].textData.endAngle;
						// 1 4
						if(!m){
							endAngle = startAngle - dis;
						}else{
							// 2 3
							endAngle = startAngle +dis;
						}
					}
					val.textData = {
						startAngle,
						endAngle
					};
					val.srcVal.middleAngle = val.srcVal.startAngle + (val.srcVal.endAngle - val.srcVal.startAngle) /2
				});
			}
		});
		return newQ;
	}

	/**
	 * 更新图
	 */
	updateTitle() {
		if ('title' in this.chart) drawChartTitle.call(this, this.layout.padding + this.layout.area.w / 2);
		if ('x' in this.axis && 'title' in this.axis.x) drawXTitle.call(this);
		if ('y' in this.axis && 'title' in this.axis.y) drawYTitle.call(this);
	}

	/**
	 * redraw
	 */
	redraw(flag) {
		d3.select('#' + this.id).remove();
		if (!!flag) {
			this._init(this._deepCopyObj(this.default), this.rootConfig);
		}
		this._draw();
		this.resetChartSelect();
		return this;
	}
}

export default Pie;
