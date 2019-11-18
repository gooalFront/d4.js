/**
 * @time 2018年8月27日10:38:32
 * @author joke<277637411@qq.com>
 * @description 组合图
 */

import Base from '../base';
import * as d3 from 'd3';
import UUID from 'uuid-js';
import tooltip from '../tools/tooltip';

import {
	drawChartTitle
} from '../tools/title';
import {
	drawXTitle,
	drawYTitle
} from '../tools/axisTitle';
import {
	drawLegend
} from '../tools/legend';
import {
	drawxAxis
} from '../tools/axis';

class Compose extends Base {
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
		var key = 'x',
			key1 = 'x';
		var value = 'y',
			value1 = 'y';
		var category = '',
			category1 = '';
		var xMinScale, x0MinScale, xMaxScale, x0MaxScale, yMinScale, y0MinScale, yMaxScale, y0MaxScale;

		if ('x' in this.axis && 'minScale' in this.axis.x) xMinScale = this.axis.x.minScale;
		if ('x' in this.axis && 'maxScale' in this.axis.x) xMaxScale = this.axis.x.maxScale;
		if ('x0' in this.axis && 'minScale' in this.axis.x0) x0MinScale = this.axis.x0.minScale;
		if ('x0' in this.axis && 'maxScale' in this.axis.x0) x0MaxScale = this.axis.x0.maxScale;
		if ('y' in this.axis && 'minScale' in this.axis.y) yMinScale = this.axis.y.minScale;
		if ('y' in this.axis && 'maxScale' in this.axis.y) yMaxScale = this.axis.y.maxScale;
		if ('y0' in this.axis && 'minScale' in this.axis.y0) y0MinScale = this.axis.y0.minScale;
		if ('y0' in this.axis && 'maxScale' in this.axis.y0) y0MaxScale = this.axis.y0.maxScale;

		this.id = 'd4' + UUID.create().toString().replace(/-/g, '');
		this.svg = d3.select(this.chart.el).append('svg').attr('xmlns','http://www.w3.org/2000/svg').attr('version','1.1').attr('id', this.id).attr('width', '100%').attr('height', '100%');

		if (this.chart.custom[0] instanceof Array && this.chart.custom[0][0]) key = this.chart.custom[0][0];
		if (this.chart.custom[0] instanceof Array && this.chart.custom[0][1]) value = this.chart.custom[0][1];
		if (this.chart.custom[0] instanceof Array && this.chart.custom[0][2]) category = this.chart.custom[0][2];
		if (this.chart.custom[1] instanceof Array && this.chart.custom[1][0]) key1 = this.chart.custom[1][0];
		if (this.chart.custom[1] instanceof Array && this.chart.custom[1][1]) value1 = this.chart.custom[1][1];
		if (this.chart.custom[1] instanceof Array && this.chart.custom[1][2]) category1 = this.chart.custom[1][2];



		// 是否有图例
		if (category && this.legend[0].show) var categoryArr = this._getLegendArr(category, this.chart.data[0]);
		if (category1 && this.legend[1].show) var categoryArr1 = this._getLegendArr(category1, this.chart.data[1]);

		// 计算图例布局 没有图例则不算 画图例
		this._computedLayout();
		if (category && category1) {
			var totalWidth = this._computedLegendLayout(this.svg, categoryArr);
			var totalWidth1 = this._computedLegendLayout(this.svg, categoryArr1);
			var z = d3.scaleOrdinal().domain(categoryArr).range(this.colors.slice(0, categoryArr.length));
			var z0 = d3.scaleOrdinal().domain(categoryArr1).range(this.colors.slice(0, categoryArr1.length));

			if (totalWidth < totalWidth1) {
				this._computedLayout();
				this._computedLegendLayout(this.svg, categoryArr1, 2);
				drawLegend.call(this, z0, null, null, null, 2);
				this._computedLayout();
				this._computedLegendLayout(this.svg, categoryArr);
				drawLegend.call(this, z);
			} else {
				this._computedLayout();
				this._computedLegendLayout(this.svg, categoryArr);
				drawLegend.call(this, z);
				this._computedLayout();
				this._computedLegendLayout(this.svg, categoryArr1);
				drawLegend.call(this, z0, null, null, null, 2);
			}
		} else if (category || category1) {
			if (category) {
				this._computedLegendLayout(this.svg, categoryArr);
				var z = d3.scaleOrdinal().domain(categoryArr).range(this.colors.slice(0, categoryArr.length));
			} else {
				this._computedLegendLayout(this.svg, categoryArr1);
				var z = d3.scaleOrdinal().domain(categoryArr1).range(this.colors.slice(0, categoryArr1.length));
			}
			drawLegend.call(this, z);
		}

		// 画标题
		if ('title' in this.chart) drawChartTitle.call(this);

		//定义坐标轴 画坐标轴
		var x = this._getxAxisOrderByData(this.chart.type[0], xMinScale, xMaxScale, key, this.chart.data[0]);
		var x0 = this._getxAxisOrderByData(this.chart.type[1], x0MinScale, x0MaxScale, key1, this.chart.data[1]);
		var y = this._getyAxisOrderByData(this.chart.type[0], yMinScale, yMaxScale, value, this.chart.data[0]);
		var y0 = this._getyAxisOrderByData(this.chart.type[1], y0MinScale, y0MaxScale, value1, this.chart.data[1]);
		x.range([0, this.layout.area.w]);
		x0.range([this.layout.area.w, 0]);
		y.range([this.layout.area.h, 0]);
		y0.range([0, this.layout.area.h]);

		// 画坐标轴
		var l = this.layout;
		this._drawAxis(l.padding + l.y + l.yLabel, l.padding + l.title + l.x0 + l.x0Axis + l.area.h, x, 'x');
		this._drawAxis(l.padding + l.y + l.yLabel, l.padding + l.title + l.x0 + l.x0Axis, x0, 'x0');
		this._drawAxis(l.padding + l.y + l.yLabel, l.padding + l.title + l.x0 + l.x0Axis, y, 'y');
		this._drawAxis(l.padding + l.y + l.yLabel + l.area.w, l.padding + l.title + l.x0 + l.x0Axis, y0, 'y0');

		// 画坐标轴标题
		this._drawTitle(this.layout.padding + this.layout.y + this.layout.yLabel + this.layout.area.w / 2, this.layout.h - this.layout.padding, 'x', this.axis.x.title);
		this._drawTitle(this.layout.padding + this.layout.y + this.layout.yLabel + this.layout.area.w / 2, this.layout.title + this.layout.padding, 'x0', this.axis.x0.title);
		this._drawTitle(this.layout.padding , this.layout.title + this.layout.padding+this.layout.x0Axis+this.layout.x0+this.layout.area.h/2, 'y', this.axis.y.title);
	}

	_drawTitle(x, y, axis, text) {
		var axisTitle = this.svg.append('g').attr('class', axis + '-title').attr('transform', "translate(" + x + "," + y + ")");
		axisTitle.append('text').text(text).attr('text-anchor', 'middle');
	}

	_drawAxis(x, y, axis, flag) {
		var _self = this;
		var g = this.svg.append('g').attr('class', flag + '-axis').attr('transform', "translate(" + x + "," + y + ")");
		switch (flag) {
			case 'x':
				g.call(d3.axisBottom(axis).tickFormat(function (d) {
					var text = '' + d;
					if (_self.axis.x.formatter) {
						text = _self.axis.x.formatter(text);
					}
					return text.length > global.textMaxLength ? text.substring(0, global.textMaxLength + 1) + '...' : text;
				}));
				break;
			case 'x0':
				g.call(d3.axisTop(axis).tickFormat(function (d) {
					var text = '' + d;
					if (_self.axis.x0.formatter) {
						text = _self.axis.x0.formatter(text);
					}
					return text.length > global.textMaxLength ? text.substring(0, global.textMaxLength + 1) + '...' : text;
				}));
				break;
			case 'y':
				g.call(d3.axisLeft(axis).tickFormat(function (d) {
					var text = '' + d;
					if (_self.axis.y.formatter) {
						text = _self.axis.y.formatter(text);
					}
					return text.length > global.textMaxLength ? text.substring(0, global.textMaxLength + 1) + '...' : text;
				}));
				break;
			case 'y0':
				g.call(d3.axisRight(axis).tickFormat(function (d) {
					var text = '' + d;
					if (_self.axis.y0.formatter) {
						text = _self.axis.y0.formatter(text);
					}
					return text.length > global.textMaxLength ? text.substring(0, global.textMaxLength + 1) + '...' : text;
				}));
				break;
		}

	}

	_getxAxisOrderByData(chartType, minScale, maxScale, key, data) {
		var x;
		switch (chartType) {
			case "line":
				if (typeof data[0][key] == 'string') x = d3.scalePoint().domain(data.map((d, i) => d[key]))
				if (typeof data[0][key] == 'number') x = d3.scaleLinear().domain([minScale || d3.min(data, (d) => {
					return d[key]
				}), maxScale || d3.max(data, (d) => {
					return d[key]
				})])
				break;
			case "bar":
				x = d3.scaleBand().domain(data.map((d) => d[key]));
				break;
			case "scatter":
				x = d3.scaleLinear().domain([minScale || d3.min(data, d => d[key]), xMaxScale || d3.max(data, d => d[key])]);
				break;
		}
		return x;
	}

	_getyAxisOrderByData(chartType, minScale, maxScale, value, data) {
		var y;
		switch (chartType) {
			case "line":
				y = d3.scaleLinear()
					.domain([minScale || d3.min(data, (d, i) => d[value]), maxScale || d3.max(data, (d, i) => d[value])]);
				break;
			case "bar":
				y = d3.scaleLinear()
					.domain([minScale || 0, maxScale || d3.max(data, (d) => d[value])]);
				break;
			case "scatter":
				y = d3.scaleLinear()
					.domain([maxScale || d3.max(data, d => d[value]), minScale || d3.min(data, d => d[value])]);
				break;
		}
		return y;
	}

	_getLegendArr(category, data) {
		var categoryArr = {};
		data.forEach(val => {
			categoryArr[val[category]] = 1;
		})
		return Object.keys(categoryArr);
	}

	/**
	 *
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

export default Compose;
