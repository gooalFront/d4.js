/**
 * @time 2018年8月20日16:33:35
 * @author joke<277637411@qq.com>
 * @description 散点图
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
import categoryLine from './categoryLine';

class Scatter extends Base {
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
		var category = 'category';
		var xMinScale, xMaxScale, yMinScale, yMaxScale;
		var xPos, yPos;

		if ('x' in this.axis && 'minScale' in this.axis.x) xMinScale = this.axis.x.minScale;
		if ('x' in this.axis && 'maxScale' in this.axis.x) xMaxScale = this.axis.x.maxScale;
		if ('y' in this.axis && 'minScale' in this.axis.y) yMinScale = this.axis.y.minScale;
		if ('y' in this.axis && 'minScale' in this.axis.y) yMaxScale = this.axis.y.maxScale;
		if ('x' in this.axis) xPos = this.axis.x.position || 'bottom';
		if ('y' in this.axis) yPos = this.axis.y.position || 'left';

		// 生成svg id
		d3.selectAll(this.chart.el + " svg").remove();
		this.id = 'd4' + UUID.create().toString().replace(/-/g, '');

		// 根据direction stackBarType 固定key value
		if (this.chart.custom instanceof Array && this.chart.custom[0]) key = this.chart.custom[0];
		if (this.chart.custom instanceof Array && this.chart.custom[1]) value = this.chart.custom[1];
		if (this.chart.custom instanceof Array && this.chart.custom[2]) category = this.chart.custom[2];


		this.svg = d3.select(this.chart.el).append('svg').attr('id', this.id)
			.attr('class', 'd4-chart-content')
			.attr('xmlns','http://www.w3.org/2000/svg')
			.attr('version','1.1')
			.on('click', () => {
				this.resetChartSelect();
			});

		// 默认用图例数组
		var categoryList = 'data' in this.legend ? this.legend.data : [];
		// 用户没有传默认用category
		if (!categoryList.length) {
			this.chart.data.forEach((d) => {
				categoryList[d[category]] = 1;
			})
			categoryList = Object.keys(categoryList)
		}

		// 颜色比例尺
		var z = d3.scaleOrdinal().domain(categoryList).range(this.colors.slice(0, categoryList.length));

		// 创建比例尺
		var x = d3.scaleLinear().domain([xMinScale || d3.min(this.chart.data, d => d[key]), xMaxScale || d3.max(this.chart.data, d => d[key])]);

		var y = d3.scaleLinear()
			.domain([yMaxScale || d3.max(this.chart.data, d => d[value]), yMinScale || d3.min(this.chart.data, d => d[value])]);

		// 计算布局
		this._computedLayout(x,y);
		if (!!this.legend && this.legend.show) {
			this._computedLegendLayout(this.svg, categoryList);
			drawLegend.call(this, z);
		}
		this.svg.attr('width', this.layout.w).attr('height', this.layout.h);

		var allCircle = this.svg.append('g').attr('class', 'series');
		this._applyPosition(xPos, yPos, x, y, 0, this.layout.area.w, 0, this.layout.area.h, allCircle, null);

		var ticks = y.ticks();

		// draw  title && axis && axistitle
		if ('title' in this.chart) drawChartTitle.call(this);
		if ('x' in this.axis) drawxAxis.call(this, x);
		if ('y' in this.axis) drawYAxis.call(this, y, ticks);
		if ('x' in this.axis && 'title' in this.axis.x) drawXTitle.call(this);
		if ('y' in this.axis && 'title' in this.axis.y) drawYTitle.call(this);

		// append point
		var cir = allCircle.selectAll('circle')
			.data(this.chart.data)
			.enter()
			.append('circle')
			.attr('fill', function (d) {
				return z(d[category])
			})
			.attr('cx', function (d, i) {
				return x(d[key]);
			})
			.attr('cy', function (d) {
				return y(d[value]);
			})
			// .attr('stroke',d=>z(d[category]))
			.on('mouseover', function (d) {
				d3.select(this).transition().attr('r', _self.chart.hoverRadius || 6);
				if (_self.tooltip) var html = _self.tooltip(d);
				tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : `x:${d[key]}<br>y:${d[value]}`);
			})
			.on("mousemove", function () {
				tooltip.update(d3.event.pageX, d3.event.pageY);
			})
			.on('mouseout', function () {
				d3.select(this).transition().attr('r', _self.chart.radius || _self.styleConfig.scatterPointRadius);
				tooltip.hide();
			})
			.on('click', function (d, i) {
				if (_self.selectedModule) {
					_self._applyChartSelect(d, d3.select(this), z(d[category]));
					// stop default
					d3.event.stopPropagation();
				} else {
					return false;
				}
			})
			.transition()
			.duration(800)
			.attr('r', (d) => this.chart.radius || this.styleConfig.scatterPointRadius)

			cir.attr('stroke','white').attr('stroke-width',4).attr('stroke-opacity',0);
			// 如果可以点击选择 给hover手型
			let chartSelectFlag = false;
			chartSelectFlag = 'enableChartSelect' in this.chart?this.chart.enableChartSelect:this.rootConfig.enableChartSelect
			if(chartSelectFlag && this.chart.onselect){
				cir.style('cursor','pointer');
			}

	}

	// 应用轴方向
	_applyPosition(xPos, yPos, x, y, xRange1, xRange2, yRange1, yRange2, wrap1, wrap2) {
		if (xPos === 'top') {
			if (yPos === 'left') {
				x.range([xRange1, xRange2]).nice();
				y.range([yRange2, yRange1]).nice();
				wrap1.attr('transform', "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) + ")");
				if (wrap2) {
					wrap2.attr('transform', "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) + ")");
				}
			} else {
				x.range([xRange2, xRange1]).nice();
				y.range([yRange2, yRange1]).nice();
				wrap1.attr('transform', "translate(" + this.layout.padding + "," + (this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) + ")");
				if (wrap2) {
					wrap2.attr('transform', "translate(" + this.layout.padding + "," + (this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) + ")");
				}
			}
		} else {
			if (yPos === 'left') {
				x.range([xRange1, xRange2]).nice();
				y.range([yRange1, yRange2]).nice();
				wrap1.attr('transform', "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title) + ")");
				if (wrap2) {
					wrap2.attr('transform', "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title) + ")");
				}
			} else {
				x.range([xRange2, xRange1]).nice();
				y.range([yRange1, yRange2]).nice();
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

export default Scatter;
