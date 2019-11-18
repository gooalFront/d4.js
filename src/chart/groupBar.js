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

class GroupBar extends Base {
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
		var xMinScale, xMaxScale, yMinScale, yMaxScale;
		var xPos, yPos;

		if ('x' in this.axis && 'minScale' in this.axis.x) xMinScale = this.axis.x.minScale;
		if ('x' in this.axis && 'maxScale' in this.axis.x) xMaxScale = this.axis.x.maxScale;
		if ('y' in this.axis && 'minScale' in this.axis.y) yMinScale = this.axis.y.minScale;
		if ('y' in this.axis && 'minScale' in this.axis.y) yMaxScale = this.axis.y.maxScale;
		if ('x' in this.axis) xPos = this.axis.x.position || 'bottom';
		if ('y' in this.axis) yPos = this.axis.y.position || 'left';

		this.id = 'd4' + UUID.create().toString().replace(/-/g, '');

		if (this.chart.custom instanceof Array && this.chart.custom[0]) key = this.chart.custom[0];
		if (this.chart.custom instanceof Array && this.chart.custom[1]) value = this.chart.custom[1];
		if (this.chart.custom instanceof Array && this.chart.custom[2]) category = this.chart.custom[2];

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

		var legendArr = [];
		var xOridinal = [];
		var valueArr = [];

		this.chart.data.forEach((val, index) => {
			legendArr.push(val[category]);
			xOridinal.push(val[key]);
			valueArr.push(val[value]);
		});

		legendArr = Array.from(new Set(legendArr));
		xOridinal = Array.from(new Set(xOridinal));
		valueArr = Array.from(new Set(valueArr));

		if ('direction' in this.chart && this.chart.direction === 'horizontal') {
			var tmp = this._copyArr(valueArr);
			valueArr = xOridinal;
			xOridinal = tmp;
		}

		// 是否有自定义的分组顺序
		if ('orderBy' in this.chart && this.chart.orderBy.length) {
			xOridinal = this.chart.orderBy;
		}

		var z = d3.scaleOrdinal().domain(legendArr).range(this.colors.slice(0, legendArr.length));

		var allRect = this.svg.append('g').attr('class', 'series');

		if ('direction' in this.chart && this.chart.direction === 'horizontal') {
			// 水平
			var y = d3.scaleBand().domain(xOridinal).padding(this.chart.padding || 0.3);

			var x = d3.scaleLinear().domain([ xMinScale || 0, xMaxScale || d3.max(valueArr) ]);

			this._computedLayout(x, null);
			if (!!this.legend && this.legend.show) {
				this._computedLegendLayout(this.svg, legendArr);
				drawLegend.call(this, z);
			}
			this.svg.attr('width', this.layout.w).attr('height', this.layout.h);

			// xPos, yPos, x, y, xRange1, xRange2, yRange1, yRange2, wrap1, wrap2
			this._applyPosition(xPos, yPos, x, y, 0, this.layout.area.w, 0, this.layout.area.h, allRect, null);
			var groupScale = d3
				.scaleBand()
				.domain(legendArr)
				.rangeRound([ 0, y.bandwidth() ])
				.padding(this.chart.innerPadding || 0.2);
			var rectHeight = groupScale.bandwidth();
		} else {
			// 垂直
			var x = d3.scaleBand().domain(xOridinal).padding(this.chart.padding || 0.3);
			var y = d3.scaleLinear().domain([ yMinScale || 0, yMaxScale || d3.max(valueArr) ]);

			this._computedLayout(null, y);
			if (!!this.legend && this.legend.show) {
				this._computedLegendLayout(this.svg, legendArr);
				drawLegend.call(this, z);
			}
			this.svg.attr('width', this.layout.w).attr('height', this.layout.h);

			// xPos, yPos, x, y, xRange1, xRange2, yRange1, yRange2, wrap1, wrap2
			this._applyPosition(xPos, yPos, x, y, 0, this.layout.area.w, this.layout.area.h, 0, allRect, null);
			var groupScale = d3
				.scaleBand()
				.domain(legendArr)
				.rangeRound([ 0, x.bandwidth() ])
				.padding(this.chart.innerPadding || 0.2);
			var rectWidth = groupScale.bandwidth();
		}

		// draw  title && axis && axistitle
		if ('title' in this.chart) drawChartTitle.call(this);
		if ('x' in this.axis) drawxAxis.call(this, x);
		if ('y' in this.axis) drawYAxis.call(this, y);
		if ('x' in this.axis && 'title' in this.axis.x) drawXTitle.call(this);
		if ('y' in this.axis && 'title' in this.axis.y) drawYTitle.call(this);

		// append rect
		var rect = allRect
			.selectAll('rect')
			.data(this.chart.data)
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
					_self._applyChartSelect(d, d3.select(this), z(d[category]));
					// stop default
					d3.event.stopPropagation();
				} else {
					return false;
				}
			});

		var rectH = rectHeight > _self.styleConfig.defaultMaxBarWidth ? _self.styleConfig.defaultMaxBarWidth : rectHeight;
		var disH = rectHeight - rectH;
		var rectW = rectWidth > _self.styleConfig.defaultMaxBarWidth ? _self.styleConfig.defaultMaxBarWidth : rectWidth
		var disW = rectWidth - rectW;

		if ('direction' in _self.chart && _self.chart.direction === 'horizontal') {
			if (yPos === 'left') {
				rect
					.attr('x', function(d) {
						return x(xMinScale || 0);
					})
					.attr('y', function(d) {
						return y(d[value]) + groupScale(d[category]) + disH /2;
					})
					.attr('width', function(d) {
						return 0;
					})
					.attr('height', function(d) {
						return rectH;
					})
					.transition()
					.delay(function(d, i) {
						return i * 20;
					})
					.duration(300)
					.attr('width', function(d) {
						return x(d[key]);
					});
			} else if (yPos === 'right') {
				rect
					.attr('x', function(d) {
						return x(xMinScale || 0);
					})
					.attr('y', function(d) {
						return y(d[value]) + groupScale(d[category]) + disH / 2;
					})
					.attr('height', function(d) {
						return rectH;
					})
					.transition()
					.delay(function(d, i) {
						return i * 20;
					})
					.duration(300)
					.attr('width', function(d) {
						return _self.layout.area.w - x(d[key]);
					})
					.attr('x', function(d) {
						return x(d[key]);
					});
			}
			rect.attr('fill', function(d, i) {
				return z(d[category]);
			});
		} else {
			if (xPos === 'bottom') {
				rect
					.attr('x', function(d, i) {
						return x(d[key]) + groupScale(d[category])+ disW/2;
					})
					.attr('y', function(d) {
						return _self.layout.area.h;
					})
					.attr('width', function(d) {
						return rectW ;
					})
					.transition()
					.delay(function(d, i) {
						return i * 20;
					})
					.duration(300)
					.attr('y', function(d) {
						return y(d[value]);
					})
					.attr('height', function(d) {
						return _self.layout.area.h - y(d[value]);
					});
			} else if (xPos === 'top') {
				rect
					.attr('x', function(d, i) {
						return x(d[key]) + groupScale(d[category]) + disW/2;
					})
					.attr('y', function(d) {
						return y(yMinScale || 0);
					})
					.attr('width', function(d) {
						return rectW;
					})
					.transition()
					.delay(function(d, i) {
						return i * 20;
					})
					.duration(300)
					.attr('y', function(d) {
						return y(yMinScale || 0);
					})
					.attr('height', function(d) {
						return y(d[value]);
					});
			}

			rect.attr('fill', function(d, i) {
				return z(d[category]);
			});
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

export default GroupBar;
