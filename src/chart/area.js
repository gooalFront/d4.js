/**
 * @time 2018年8月13日14:02:48
 * @author joke<277637411@qq.com>
 * @description 柱状图类
 */

import Base from './base';
import * as d3 from 'd3';
import UUID from 'uuid-js';
import tooltip from './tools/tooltip';
import {
	drawChartTitle
} from './tools/title';
import {
	drawxAxis,
	drawYAxis
} from './tools/axis';
import {
	drawXTitle,
	drawYTitle
} from './tools/axisTitle';

import {
	drawLegend
} from './tools/legend'

class Area extends Base {
	constructor(options, rootConfig,styleConfig) {
		super(options, rootConfig,styleConfig);
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
		var category = '';
		var yMinScale, yMaxScale;
		var xPos, yPos;

		if ('y' in this.axis && 'minScale' in this.axis.y) yMinScale = this.axis.y.minScale;
		if ('y' in this.axis && 'maxScale' in this.axis.y) yMaxScale = this.axis.y.maxScale;
		if ('x' in this.axis) xPos = this.axis.x.position || 'bottom';
		if ('y' in this.axis) yPos = this.axis.y.position || 'left';

		this.id = 'd4' + UUID.create().toString().replace(/-/g, '');

		if (this.chart.custom instanceof Array && this.chart.custom[0]) key = this.chart.custom[0];
		if (this.chart.custom instanceof Array && this.chart.custom[1]) value = this.chart.custom[1];
		if (this.chart.custom instanceof Array && this.chart.custom[2]) category = this.chart.custom[2];

		d3.selectAll(this.chart.el + " svg").remove();
		this.svg = d3.select(this.chart.el).append('svg')
			.attr('id', this.id)
			.attr('class', 'd4-chart-content')
			.attr('xmlns', 'http://www.w3.org/2000/svg')
			.attr('version', '1.1');

		var legendJson = {};
		var legendArr = [];
		var keyArr = {};
		var categoryData = [];
		// 按category给数据分类
		this.chart.data.forEach((val, index) => {
			keyArr[val[key]] = 1;
			if (!legendJson[val[category]]) {
				var json = {
					key: val[category],
					values: [val]
				};
				categoryData.push(json);
				legendJson[val[category]] = 1;
			} else {
				for (var i = 0; i < categoryData.length; i++) {
					if (categoryData[i].key === val[category]) {
						categoryData[i].values.push(val);
						break;
					}
				}
			}
		})

		legendArr = Object.keys(legendJson)
		keyArr = Object.keys(keyArr);
		var z = d3.scaleOrdinal().domain(legendArr).range(this.aColors.slice(0, legendArr.length));

		// 创建比例尺
		var y = d3.scaleLinear() .domain([yMinScale || 0, yMaxScale || d3.max(this.chart.data, (d, i) => d[value])])
		var ticks = y.ticks();
		this.axis.y.data = ticks;
		if (typeof this.chart.data[0][key] === 'string') {
			var x = d3.scalePoint().domain(keyArr)
			this._computedLayout();
		} else {
			var x = d3.scaleLinear().domain(d3.extent(this.chart.data, function (d) {
				return d[key];
			}));
			this._computedLayout(x,null);
		}

		if (!!this.legend && this.legend.show && category) {
			this._computedLegendLayout(this.svg, legendArr);
			drawLegend.call(this, z);
		}
		this.svg.attr('width', this.layout.w).attr('height', this.layout.h);



		var areaWrap = this.svg.append('g').attr('class', 'series')
		this._applyPosition(xPos, yPos, x, y, 0, this.layout.area.w, this.layout.area.h, 0, areaWrap, null);

		var area = d3.area()
			.x(function (d, i) {
				return x(d[key])
			})
			.y0((d, i) => {
				return this.layout.area.h;
			})
			.y1(function (d, i) {
				return y(d[value])
			})
			.curve(this._computedInterpolate(this.chart.interpolate || 'linear'));


		// draw  title && axis && axistitle
		if ('x' in this.axis) drawxAxis.call(this, x);
		if ('y' in this.axis) drawYAxis.call(this, y);
		if ('x' in this.axis && 'title' in this.axis.x) drawXTitle.call(this);
		if ('y' in this.axis && 'title' in this.axis.y) drawYTitle.call(this);

		// append path
		var aPath = areaWrap.selectAll('path')
			.data(categoryData)
			.enter()
			.append('path')
			.attr('d', d => {
				return area(d.values)
			})
			.transition()
			.duration(800)
			.attr('fill', d => z(d.key))
			.attr('stroke', d => z(d.key))
			.attr('stroke-width',2)


		// append point
		var aPoint = areaWrap
			.selectAll('g')
			.data(categoryData)
			.enter()
			.append('g')
			.selectAll('circle')
			.data(d => d.values)
			.enter()
			.append('circle')
			.on('mouseover', function (d) {
				d3.select(this).transition().style('opacity', '0.6').attr('r', 'radius' in _self.chart?_self.chart.radius * 2:_self.styleConfig.pointRadius * 2)
				if (_self.tooltip) var html = _self.tooltip(d);
				tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : `x:${d[key]}<br>y:${d[value]}`);
			})
			.on("mousemove", function () {
				tooltip.update(d3.event.pageX, d3.event.pageY);
			})
			.on('mouseout', function () {
				d3.select(this).transition().style('opacity', 1).attr('r', 'radius' in _self.chart?_self.chart.radius:_self.styleConfig['pointRadius'])
				tooltip.hide();
			})
			.attr('cx', d => {
				return x(d[key])
			})
			.attr('r', 'radius' in this.chart?this.chart.radius:this.styleConfig['pointRadius'])
			.attr('cy', d => y(d[value]))
			.attr('fill', d => z(d[category]))
			.attr('stroke', d => z(d[category]))

	}

	// 应用轴方向
	_applyPosition(xPos, yPos, x, y, xRange1, xRange2, yRange1, yRange2, wrap1, wrap2) {
		if (xPos === 'top') {
			if (yPos === 'left') {
				x.range([xRange1, xRange2]);
				y.range([yRange2, yRange1]);
				wrap1.attr('transform', "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) + ")");
				if (wrap2) {
					wrap2.attr('transform', "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) + ")");
				}
			} else {
				x.range([xRange2, xRange1]);
				y.range([yRange2, yRange1]);
				wrap1.attr('transform', "translate(" + this.layout.padding + "," + (this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) + ")");
				if (wrap2) {
					wrap2.attr('transform', "translate(" + this.layout.padding + "," + (this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) + ")");
				}
			}
		} else {
			if (yPos === 'left') {
				x.range([xRange1, xRange2]);
				y.range([yRange1, yRange2]);
				wrap1.attr('transform', "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title) + ")");
				if (wrap2) {
					wrap2.attr('transform', "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title) + ")");
				}
			} else {
				x.range([xRange2, xRange1]);
				y.range([yRange1, yRange2]);
				wrap1.attr('transform', "translate(" + (this.layout.padding) + "," + (this.layout.padding + this.layout.title) + ")");
				if (wrap2) {
					wrap2.attr('transform', "translate(" + (this.layout.padding) + "," + (this.layout.padding + this.layout.title) + ")");
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

export default Area;
