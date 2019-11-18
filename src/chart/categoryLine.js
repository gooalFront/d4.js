/**
 * @time s2018年8月3日16:30:20
 * @author joke<277637411@qq.com>
 * @description 分类折线图类
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
} from './tools/legend';

class CategoryLine extends Base {
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

        var categoryObj = this._computedCategory(this.chart.data, category);
        var categoryArr = Object.keys(categoryObj);

        // 创建分类颜色比例尺
        var z = d3.scaleOrdinal().domain(categoryArr).range(this.colors.slice(0, categoryArr.length));

        d3.selectAll(this.chart.el + " svg").remove();
        this.svg = d3.select(this.chart.el).append('svg').attr('id', this.id)
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('version', '1.1')
            .attr('class', 'd4-chart-content');

        var y = d3.scaleLinear()
            .domain([yMinScale || d3.min(this.chart.data, (d, i) => d[value]), yMaxScale || d3.max(this.chart.data, (d, i) => d[value])])

        this.axis.y['data'] = y.ticks();

        // 创建比例尺
        var x = null;
        if (typeof this.chart.data[0][key] == 'string') {
            x = d3.scalePoint()
                .domain(this.chart.data.map((d, i) => d[key]))
            this._computedLayout(null, y);
        }
        if (typeof this.chart.data[0][key] == 'number') {
            x = d3.scaleLinear()
                .domain([xMinScale || d3.min(this.chart.data, (d) => {
                    return d[key]
                }), d3.max(xMaxScale || this.chart.data, (d) => {
                    return d[key]
                })])
            this._computedLayout(x, y);
        }


        // 计算图例布局画图例
        if (!!this.legend && this.legend.show) {
            this._computedLegendLayout(this.svg, categoryArr);
            drawLegend.call(this, z);
        }
        this.svg.attr('width', this.layout.w).attr('height', this.layout.h);

        var series = this.svg.append('g')
            .attr('class', 'series')
            .attr('transform', "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title) + ")");
        var point = this.svg.append('g').attr('class', 'point').attr('transform', "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title) + ")");

        if (xPos === 'top') {
            if (yPos === 'left') {
                x.range([0, this.layout.area.w]);
                y.range([d3.min(this.chart.data, (d, i) => d[value]), this.layout.area.h]);
                series.attr('transform', "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) + ")");
                point.attr('transform', "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) + ")");
            } else {
                x.range([this.layout.area.w, 0]);
                y.range([d3.min(this.chart.data, (d, i) => d[value]), this.layout.area.h]);
                series.attr('transform', "translate(" + this.layout.padding + "," + (this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) + ")");
                point.attr('transform', "translate(" + this.layout.padding + "," + (this.layout.padding + this.layout.title + this.layout.x + this.layout.xLabel) + ")");
            }
        } else {
            if (yPos === 'left') {
                y.range([this.layout.area.h, d3.min(this.chart.data, (d, i) => d[value])]);
                x.range([0, this.layout.area.w]);
                series.attr('transform', "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title) + ")");
                point.attr('transform', "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title) + ")");
            } else {
                y.range([this.layout.area.h, d3.min(this.chart.data, (d, i) => d[value])]);
                x.range([this.layout.area.w, 0]);
                series.attr('transform', "translate(" + (this.layout.padding) + "," + (this.layout.padding + this.layout.title) + ")");
                point.attr('transform', "translate(" + (this.layout.padding) + "," + (this.layout.padding + this.layout.title) + ")");
            }

        }

        var line = d3.line()
            .x(function(d, i) {
                return x(d[key])
            })
            .y(function(d, i) {
                return (!d[value] && d[value] != 0) ? y(0) : y(d[value]);
            });

        // 线的插值模式
        line.curve(this._computedInterpolate(this.chart.interpolate || 'linear'));

        // draw  title && axis && axistitle
        if ('title' in this.chart) drawChartTitle.call(this);
        if ('x' in this.axis) drawxAxis.call(this, x);
        if ('y' in this.axis) drawYAxis.call(this, y);
        if ('x' in this.axis && 'title' in this.axis.x) drawXTitle.call(this);
        if ('y' in this.axis && 'title' in this.axis.y) drawYTitle.call(this);



        categoryArr.forEach((val, index) => {
            // append line
            var lineG = series.append('g').attr('class', 'path_g');

            lineG.append('path')
                .attr('class', 'linePath')
                .datum(categoryObj[val])
                .attr('fill', 'none')
                .attr('stroke', z(val));

            lineG.append('path')
                .attr("class", "linePath");

            lineG.select(".linePath")
                .datum(categoryObj[val])
                .attr("d", line)
                .transition()
                .duration(800)
                .attrTween("stroke-dasharray", function() {
                    var l = this.getTotalLength(),
                        i = d3.interpolateString("0," + l, l + "," + l);
                    return function(t) {
                        return i(t);
                    };
                });
            // append point
            point.append('g')
                .selectAll('circle').data(categoryObj[val])
                .enter()
                .append('circle')
                .attr('cx', function(d) {
                    return x(d[key])
                })
                .attr('cy', function(d) {
                    return (!d[value] && d[value] != 0) ? y(0) : y(d[value]);
                })
                .attr('fill', z(val))
                .attr('r', 0)
                .on('mouseover', function(d) {
                    d3.select(this).transition().attr('r', 'radius' in _self.chart ? _self.chart.radius * 2 : _self.styleConfig['pointRadius'] * 2);
                    if (_self.tooltip) var html = _self.tooltip(d);
                    tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : `x:${d[key]}<br>y:${d[value]}`);
                })
                .on("mousemove", function() {
                    tooltip.update(d3.event.pageX, d3.event.pageY);
                })
                .on('mouseout', function() {
                    d3.select(this).transition().attr('r', 'radius' in _self.chart ? _self.chart.radius : _self.styleConfig['pointRadius']);
                    tooltip.hide();
                })
                .transition()
                .duration(800)
                .attr('r', 'radius' in this.chart ? this.chart.radius : this.styleConfig['pointRadius']);
        })
    }

    /**
     * 计算分类
     * @param {data} 元数据
     * @param {categoryKey}  分类数据对应的key
     */
    _computedCategory(data, categoryKey) {
        var catArr = data.map(d => d[categoryKey]);
        var catJson = {};
        catArr.forEach(val => {
            catJson[val] = [];
        })

        data.forEach(val => {
            catJson[val[categoryKey]].push(val);
        })

        return catJson;
    }

    /**
     * 更新图
     */
    updateTitle() {
        // draw  title && axistitle
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

export default CategoryLine;