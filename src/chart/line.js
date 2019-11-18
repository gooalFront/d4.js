/**
 * @time 2018年7月25日17:05:44
 * @author joke<277637411@qq.com>
 * @description 折线图类
 */

/**
 *  chart: {
        title: "折线图",
        el: ".chart-content",
        type: "line",
        data: [],
        custom:['key','value']
    },
    axis: {
        x: {},
        y: {}
    },
    legend: {
        show: true,
        position: "right"
    },
    tooltip: function() {}
*/

import Base from './base';
import * as d3 from 'd3';
import UUID from 'uuid-js';
import tooltip from './tools/tooltip';
import { drawChartTitle } from './tools/title';
import { drawxAxis, drawYAxis } from './tools/axis';
import { drawXTitle, drawYTitle } from './tools/axisTitle';

class Line extends Base {
    constructor(options, rootConfig, styleConfig) {
        super(options, rootConfig, styleConfig);
        // this._validData();
        this._draw();
    }

    /**
     * TODO 数据验证
     */
    _validData() {
        return true;
    }

    /**
     * 画折线图方法
     */

    _draw() {
        var _self = this;
        var key = 'x';
        var value = 'y';
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

        // 分配任务画图
        // 创建比例尺
        var x = null;
        var y = d3
            .scaleLinear()
            .domain([
                yMinScale || d3.min(this.chart.data, (d, i) => d[value]),
                yMaxScale || d3.max(this.chart.data, (d, i) => d[value])
            ]);
        this.axis.y['data'] = y.ticks();

        if (typeof this.chart.data[0][key] == 'string') {
            x = d3.scalePoint().domain(this.chart.data.map((d, i) => d[key]));
            this._computedLayout(null, y);
        }

        if (typeof this.chart.data[0][key] == 'number') {
            x = d3.scaleLinear().domain([
                xMinScale ||
                d3.min(this.chart.data, (d) => {
                    return d[key];
                }),
                xMaxScale ||
                d3.max(this.chart.data, (d) => {
                    return d[key];
                })
            ]);
            this._computedLayout(x, y);
        }

        d3.selectAll(this.chart.el + ' svg').remove();
        this.svg = d3
            .select(this.chart.el)
            .append('svg')
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('version', '1.1')
            .attr('id', this.id)
            .attr('class', 'd4-chart-content');
        this.svg.attr('width', this.layout.w).attr('height', this.layout.h);
        // append line
        var lineg = this.svg.append('g').attr('class', 'series');
        // append point
        var pointWrap = this.svg.append('g').attr('class', 'point');

        if (xPos === 'top') {
            if (yPos === 'left') {
                x.range([0, this.layout.area.w]);
                y.range([0, this.layout.area.h]);
                lineg.attr(
                    'transform',
                    'translate(' +
                    (this.layout.padding + this.layout.y + this.layout.yLabel) +
                    ',' +
                    (this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) +
                    ')'
                );
                pointWrap.attr(
                    'transform',
                    'translate(' +
                    (this.layout.padding + this.layout.y + this.layout.yLabel) +
                    ',' +
                    (this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) +
                    ')'
                );
            } else {
                x.range([this.layout.area.w, 0]);
                y.range([0, this.layout.area.h]);
                lineg.attr(
                    'transform',
                    'translate(' +
                    this.layout.padding +
                    ',' +
                    (this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) +
                    ')'
                );
                pointWrap.attr(
                    'transform',
                    'translate(' +
                    this.layout.padding +
                    ',' +
                    (this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) +
                    ')'
                );
            }
        } else {
            if (yPos === 'left') {
                y.range([this.layout.area.h, 0]);
                x.range([0, this.layout.area.w]);
                lineg.attr(
                    'transform',
                    'translate(' +
                    (this.layout.padding + this.layout.y + this.layout.yLabel) +
                    ',' +
                    (this.layout.padding + this.layout.title) +
                    ')'
                );
                pointWrap.attr(
                    'transform',
                    'translate(' +
                    (this.layout.padding + this.layout.y + this.layout.yLabel) +
                    ',' +
                    (this.layout.padding + this.layout.title) +
                    ')'
                );
            } else {
                y.range([this.layout.area.h, 0]);
                x.range([this.layout.area.w, 0]);
                lineg.attr(
                    'transform',
                    'translate(' + this.layout.padding + ',' + (this.layout.padding + this.layout.title) + ')'
                );
                pointWrap.attr(
                    'transform',
                    'translate(' + this.layout.padding + ',' + (this.layout.padding + this.layout.title) + ')'
                );
            }
        }

        var line = d3
            .line()
            .x(function(d, i) {
                return x(d[key]);
            })
            .y(function(d, i) {
                return y(d[value]);
            });

        line.curve(this._computedInterpolate(this.chart.interpolate || 'linear'));

        // draw  title && axis && axistitle
        if ('title' in this.chart) drawChartTitle.call(this);
        if ('x' in this.axis) drawxAxis.call(this, x);
        if ('y' in this.axis) drawYAxis.call(this, y);
        if ('x' in this.axis && 'title' in this.axis.x) drawXTitle.call(this);
        if ('y' in this.axis && 'title' in this.axis.y) drawYTitle.call(this);

        lineg
            .append('path')
            .datum(this.chart.data)
            .attr('class', 'linePath')
            .attr('fill', 'none')
            .attr('stroke', this.colors[0]);

        lineg.append('path').attr('class', 'linePath');

        lineg
            .select('path.linePath')
            .datum(this.chart.data)
            .attr('d', line)
            .transition()
            .duration(800)
            .attrTween('stroke-dasharray', function() {
                var l = this.getTotalLength(),
                    i = d3.interpolateString('0,' + l, l + ',' + l);
                return function(t) {
                    return i(t);
                };
            });

        // append point
        pointWrap
            .selectAll('circle')
            .data(this.chart.data)
            .enter()
            .append('circle')
            .attr('cx', function(d) {
                return x(d[key]);
            })
            .attr('cy', function(d) {
                return y(d[value]);
            })
            .attr('data-x', function(d) {
                return d[key];
            })
            .attr('data-y', function(d) {
                return d[value];
            })
            .attr('r', 0)
            .on('mouseover', function(d) {
                d3.select(this).transition().attr('r', _self.chart.radius * 2 || _self.styleConfig.pointRadius * 2);
                if (_self.tooltip) var html = _self.tooltip(d);
                tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : `x:${d[key]}<br>y:${d[value]}`);
            })
            .on('mousemove', function() {
                tooltip.update(d3.event.pageX, d3.event.pageY);
            })
            .on('mouseout', function() {
                d3.select(this).transition().attr('r', _self.chart.radius || _self.styleConfig.pointRadius);
                tooltip.hide();
            })
            .attr('fill', this.colors[0])
            .transition()
            .duration(1200)
            .attr('r', this.chart.radius || _self.styleConfig.pointRadius);
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
    redraw() {
        d3.select('#' + this.id).remove();
        this._computedLayout();
        this._draw();
    }
}

export default Line;