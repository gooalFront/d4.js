/**
 * @time 2018年8月14日15:41:15
 * @author joke<277637411@qq.com>
 * @description 分组柱状图类
 */

import Base from './base';
import * as d3 from 'd3';
import UUID from 'uuid-js';
import tooltip from './tools/tooltip';

import { drawChartTitle } from './tools/title';
import { drawxAxis, drawYAxis } from './tools/axis';
import { drawXTitle, drawYTitle } from './tools/axisTitle';

import { drawLegend } from './tools/legend';
import categoryLine from './categoryLine';

class StackBar extends Base {
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
		var total = 'total';
		var xMinScale, xMaxScale, yMinScale, yMaxScale;
		var xPos, yPos;

		if (this.chart.stackBarType === 'common') {
			// 普通堆叠图才可以设置最大值最小值
			if ('x' in this.axis && 'minScale' in this.axis.x) xMinScale = this.axis.x.minScale;
			if ('x' in this.axis && 'maxScale' in this.axis.x) xMaxScale = this.axis.x.maxScale;
			if ('y' in this.axis && 'minScale' in this.axis.y) yMinScale = this.axis.y.minScale;
			if ('y' in this.axis && 'minScale' in this.axis.y) yMaxScale = this.axis.y.maxScale;
		}

		if ('x' in this.axis) xPos = this.axis.x.position || 'bottom';
		if ('y' in this.axis) yPos = this.axis.y.position || 'left';

		// 生成svg id
		d3.selectAll(this.chart.el + ' svg').remove();
		this.id = 'd4' + UUID.create().toString().replace(/-/g, '');

		// 根据direction stackBarType 固定key value
		if (this.chart.custom instanceof Array && this.chart.custom[0] && this.chart.stackBarType === 'common')
			key = this.chart.custom[0];
		if (this.chart.custom instanceof Array && this.chart.custom[1] && this.chart.stackBarType === 'common')
			total = this.chart.custom[1];
		// 百分比横向堆叠图的value
		if (this.chart.custom instanceof Array && this.chart.custom[0] && this.chart.stackBarType === 'percent')
			key = this.chart.custom[0];
		if (this.chart.custom instanceof Array && this.chart.custom[1] && this.chart.stackBarType === 'percent')
			total = this.chart.custom[1];
		// if ( this.chart.custom instanceof Array && this.chart.custom[1] && this.chart.stackBarType === 'percent') value = this.chart.custom[1];

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

		// 找出分类，图例，数据最大最小值
		var keyList = {};
		var categoryList = {};
		var valueList = {};
		var categoryCustom = this.chart.custom.slice(2); // 用户自定义的分类
		// sample_name y
		if (this.chart.stackBarType === 'common') {
			this.chart.data.forEach((val, index) => {
				for (var name in val) {
					if ('direction' in this.chart && this.chart.direction === 'horizontal') {
						if (name === key) {
							keyList[val[key]] = 1;
						}
						if (name !== total && categoryCustom.includes(name)) categoryList[name] = 1;
					} else {
						if (name !== total && categoryCustom.includes(name)) categoryList[name] = 1;
						if (name === key) keyList[val[key]] = 1;
					}

					// // 找x轴的分类
					// if (name === key) {
					// 	if ('direction' in this.chart && this.chart.direction === 'horizontal') {
					// 		// keyList[val[value]] = 1;
					// 	// } else {
					// 		keyList[val[key]] = 1;
					// 	}
					// } else {
					// 	// 找需要画的分类
					// 	if (name !== total && categoryCustom.includes(name)) {
					// 		// valueList[val[name]] = 1;
					// 		categoryList[name] = 1;
					// 	}
					// }
				}
			});
		} else if (this.chart.stackBarType === 'percent') {
			// [null,'name]
			this.chart.data.forEach((val, index) => {
				for (var name in val) {
					if ('direction' in this.chart && this.chart.direction === 'horizontal') {
						if (name === key) {
							if (val[value] !== total) valueList[val[name]] = 1;
						} else {
							// if (val[name] !== 'total') valueList[val[name]] = 1;
							if (name !== total && categoryCustom.includes(name)) {
								categoryList[name] = 1;
							}
						}
					} else {
						if (name === key) {
							if (val[key] !== total) {
								keyList[val[key]] = 1;
							}
						} else {
							// if (val[key] != 'total') valueList[val[name]] = 1;
							if (name !== total && categoryCustom.includes(name)) categoryList[name] = 1;
						}
					}
				}
			});
		}

		keyList = Object.keys(keyList);
		valueList = Object.keys(valueList);
		categoryList = Object.keys(categoryList);

		// 是否有自定义的分组顺序（分类自定义顺序）
		if ('orderBy' in this.chart && this.chart.orderBy.length) {
			keyList = this.chart.orderBy;
		}

		// 颜色比例尺
		var z = d3.scaleOrdinal().domain(categoryList).range(this.colors.slice(0, categoryList.length));

		var allRect = this.svg.append('g').attr('class', 'series');
		// 创建比例尺 垂直或者水平
		if ('direction' in this.chart && this.chart.direction === 'horizontal') {
			// 水平
			var y = d3.scaleBand().padding(this.chart.padding || 0.3);

			var x = d3.scaleLinear();
			if (this.chart.stackBarType === 'common') {
				x
					.domain([
						0,
						d3.max(this.chart.data, function(d) {
							return d[total];
						})
					])
					.nice();
				y.domain(keyList);
			} else {
				x.domain([ 0, 100 ]);
				y.domain(valueList);
			}

			// 把刻度放在参数对应轴的data里
			var ticks = x.ticks();
			if (this.chart.stackBarType === 'common') {
				this.axis.y['data'] =  keyList ;
			}else{
				this.axis.y['data'] = valueList ;
			}

			this.axis.x['data'] = ticks;

			// 计算布局
			this._computedLayout(x);
			if (!!this.legend && this.legend.show) {
				this._computedLegendLayout(this.svg, categoryList);
				drawLegend.call(this, z);
			}
			this.svg.attr('width', this.layout.w).attr('height', this.layout.h);

			// xPos, yPos, x, y, xRange1, xRange2, yRange1, yRange2, wrap1, wrap2
			this._applyPosition(xPos, yPos, x, y, 0, this.layout.area.w, 0, this.layout.area.h, allRect, null);
			var rectHeight = y.bandwidth();
		} else {
			var y = d3.scaleLinear();
			if (this.chart.stackBarType === 'common') {
				y.domain([
					0,
					d3.max(this.chart.data, function(d) {
						return d[total];
					})
				]);
			} else {
				y.domain([ 0, 100 ]);
			}

			var x = d3.scaleBand().domain(keyList).padding(this.chart.padding || 0.3);

			// 把刻度放在参数对应轴的data里
			this.axis.y['data'] = y.ticks();
			this.axis.x['data'] = keyList;

			// 计算布局
			this._computedLayout(null, y);
			if (!!this.legend && this.legend.show) {
				this._computedLegendLayout(this.svg, categoryList);
				drawLegend.call(this, z);
			}
			this.svg.attr('width', this.layout.w).attr('height', this.layout.h);

			// xPos, yPos, x, y, xRange1, xRange2, yRange1, yRange2, wrap1, wrap2
			this._applyPosition(xPos, yPos, x, y, 0, this.layout.area.w, this.layout.area.h, 0, allRect, null);
			var rectWidth = x.bandwidth();
		}
		var stack = d3.stack().keys(categoryList);

		// draw  title && axis && axistitle
		if ('title' in this.chart) drawChartTitle.call(this);
		if ('x' in this.axis) drawxAxis.call(this, x);
		if ('y' in this.axis) drawYAxis.call(this, y, ticks);
		if ('x' in this.axis && 'title' in this.axis.x) drawXTitle.call(this);
		if ('y' in this.axis && 'title' in this.axis.y) drawYTitle.call(this);

		// append rect
		var data = stack(this.chart.data);
		data.forEach((val, index) => {
			val.forEach((v, i) => {
				v['key'] = val.key;
			});
		});

		var rectG = allRect.selectAll('g').data(data).enter().append('g').attr('fill', function(d) {
			return z(d.key);
		});

		var rect = rectG
			.selectAll('rect')
			.data(function(d, i) {
				return d;
			})
			.enter()
			.append('rect')
			.on('mouseover', function(d) {
				d3.select(this).transition().style('opacity', '0.6');
				if (_self.tooltip) var html = _self.tooltip(d);
				tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : `x:${d[key]}<br>y:${d[value]}`);
			})
			.on('mousemove', function() {
				tooltip.update(d3.event.pageX, d3.event.pageY);
			})
			.on('mouseout', function() {
				d3.select(this).transition().style('opacity', 1);
				tooltip.hide();
			})
			.on('click', function(d, i) {
				if (_self.selectedModule) {
					_self._applyChartSelect(d, d3.select(this), z(d.key));
					// stop default
					d3.event.stopPropagation();
				} else {
					return false;
				}
			});

		var rectH =
			rectHeight > _self.styleConfig.defaultMaxBarWidth ? _self.styleConfig.defaultMaxBarWidth : rectHeight;
		var disH = rectHeight - rectH;
		var rectW = rectWidth > _self.styleConfig.defaultMaxBarWidth ? _self.styleConfig.defaultMaxBarWidth : rectWidth;
		var disW = rectWidth - rectW;

		if ('direction' in _self.chart && _self.chart.direction === 'horizontal') {
			if (yPos === 'left') {
				rect
					.attr('y', function(d) {
						var v = _self.chart.direction === 'horizontal' ? d.data[key] : d.data[value];
						return y(v) + disH / 2;
					})
					.attr('height', function(d) {
						return rectH;
					})
					.transition()
					.delay(function(d, i) {
						return i * 40;
					})
					.duration(300)
					.attr('x', function(d, i) {
						return x(d[0]);
					})
					.attr('width', function(d) {
						return x(d[1]) - x(d[0]);
					});
			} else if (yPos === 'right') {
				rect
					.attr('y', function(d) {
						return y(d.data[value]) + disH / 2;
					})
					.attr('height', function(d) {
						return rectH;
					})
					.attr('x', function(d) {
						return x(0);
					})
					.transition()
					.delay(function(d, i) {
						return i * 40;
					})
					.duration(300)
					.attr('x', function(d, i) {
						return x(d[1]);
					})
					.attr('width', function(d) {
						return x(d[0]) - x(d[1]);
					});
			}
		} else {
			if (xPos === 'bottom') {
				rect
					.attr('x', function(d, i) {
						return x(d.data[key]) + disW / 2;
					})
					.attr('y', function(d) {
						return _self.layout.area.h;
					})
					.attr('width', function(d) {
						return rectW;
					})
					.transition()
					.delay(function(d, i) {
						return i * 40;
					})
					.duration(300)
					.attr('y', function(d) {
						return y(d[1]);
					})
					.attr('height', function(d) {
						return y(d[0]) - y(d[1]);
					});
			} else if (xPos === 'top') {
				rect
					.attr('x', function(d, i) {
						return x(d.data[key]) + disW / 2;
					})
					.attr('y', function(d) {
						return y(yMinScale || 0);
					})
					.attr('width', function(d) {
						return rectW;
					})
					.transition()
					.delay(function(d, i) {
						return i * 40;
					})
					.duration(300)
					.attr('y', function(d) {
						return y(d[0]);
					})
					.attr('height', function(d) {
						return y(d[1]) - y(d[0]);
					});
			}
		}

		rect.attr('stroke', 'white').attr('stroke-width', 4).attr('stroke-opacity', 0);
		// 如果可以点击选择 给hover手型
		let chartSelectFlag = false;
		chartSelectFlag =
			'enableChartSelect' in this.chart ? this.chart.enableChartSelect : this.rootConfig.enableChartSelect;
		if (chartSelectFlag && this.chart.onselect) {
			rect.style('cursor', 'pointer');
		}
	}

	// 应用轴方向
	_applyPosition(xPos, yPos, x, y, xRange1, xRange2, yRange1, yRange2, wrap1, wrap2) {
		if (xPos === 'top') {
			if (yPos === 'left') {
				x.range([ xRange1, xRange2 ]);
				y.range([ yRange2, yRange1 ]);
				wrap1.attr(
					'transform',
					'translate(' +
						(this.layout.padding + this.layout.y + this.layout.yLabel) +
						',' +
						(this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) +
						')'
				);
				if (wrap2) {
					wrap2.attr(
						'transform',
						'translate(' +
							(this.layout.padding + this.layout.y + this.layout.yLabel) +
							',' +
							(this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) +
							')'
					);
				}
			} else {
				x.range([ xRange2, xRange1 ]);
				y.range([ yRange2, yRange1 ]);
				wrap1.attr(
					'transform',
					'translate(' +
						this.layout.padding +
						',' +
						(this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) +
						')'
				);
				if (wrap2) {
					wrap2.attr(
						'transform',
						'translate(' +
							this.layout.padding +
							',' +
							(this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) +
							')'
					);
				}
			}
		} else {
			if (yPos === 'left') {
				x.range([ xRange1, xRange2 ]);
				y.range([ yRange1, yRange2 ]);
				wrap1.attr(
					'transform',
					'translate(' +
						(this.layout.padding + this.layout.y + this.layout.yLabel) +
						',' +
						(this.layout.padding + this.layout.title) +
						')'
				);
				if (wrap2) {
					wrap2.attr(
						'transform',
						'translate(' +
							(this.layout.padding + this.layout.y + this.layout.yLabel) +
							',' +
							(this.layout.padding + this.layout.title) +
							')'
					);
				}
			} else {
				x.range([ xRange2, xRange1 ]);
				y.range([ yRange1, yRange2 ]);
				wrap1.attr(
					'transform',
					'translate(' + this.layout.padding + ',' + (this.layout.padding + this.layout.title) + ')'
				);
				if (wrap2) {
					wrap2.attr(
						'transform',
						'translate(' + this.layout.padding + ',' + (this.layout.padding + this.layout.title) + ')'
					);
				}
			}
		}
	}

	/**
     * 更新图
     */
	updateTitle() {
		if ('title' in this.chart) drawChartTitle.call(this);
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

export default StackBar;
