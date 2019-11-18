/**
 * @time 2018/9/10
 * @author xiaofang<1692977129@qq.com>
 * @description 曼哈顿图
 */

import Base from './base';
import * as d3 from 'd3';
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

class Manhattan extends Base {
    constructor(options, rootConfig,styleConfig) {
        super(options, rootConfig,styleConfig);
        this.drawManhattan();
    }

    drawManhattan() {
        d3.selectAll(this.chart.el + " svg").remove();
        var that = this;
        var data = that.chart.data;
        var len = data.length;

        var lineData = (that.chart.line.data && that.chart.line.data.length) ? that.chart.line.data : [];

        var colorsLen = ("colors" in this.chart && this.chart.colors.length) ? this.chart.colors.length : 4;
        var colors = this.colors.slice(0, colorsLen);

        var rangeSum = 0;
        var ymin = 0,
            ymax = 0;
        var allPoint = [];
        var tickformates = [];

        data.forEach(function(d) {
            var curSum = Math.abs(d.end - d.start);
            rangeSum += curSum;
            tickformates.push(d.name);
            d.point.forEach(function(m) {
                allPoint.push(m);
            })
        });

        var sumRange = 0;
        var xtickValue = data.map(function(d) {
            var range = Math.abs(d.end - d.start);
            sumRange += range;
            return sumRange - range / 2;
        })

        // y min
        if (that.axis.y && "min" in that.axis.y) {
            ymin = that.axis.y.min;
        } else {
            ymin = d3.min(allPoint, function(d) {
                return d.y;
            });
        }

        // y max
        if (that.axis.y && "max" in that.axis.y) {
            ymax = that.axis.y.max;
        } else {
            ymax = d3.max(allPoint, function(d) {
                return d.y;
            });
        }

        // line right text
        let lineTextWidth = 0;
        if (lineData.length) {
            let maxLineName = d3.max(lineData, d => d.name.length * 8);
            let maxLineValue = d3.max(lineData, d => d.value.toString().length * 8);
            lineTextWidth = maxLineName + maxLineValue;
        }

        //x轴方向比例尺
        var xScale = d3.scaleLinear().domain([0, rangeSum]);
        //y轴方向比例尺
        var yScale = d3.scaleLinear().domain([ymin, ymax]);

        this._computedLayout(xScale,yScale);

        if (this.chart.line && this.chart.line.show) {
            xScale.range([0, this.layout.area.w - lineTextWidth]).clamp(true);
        } else {
            xScale.range([0, this.layout.area.w]).clamp(true);
        }

        yScale.range([this.layout.area.h, 0]).clamp(true);

        // var divobj = d3.select(this.chart.el).append("div")
        // .style("position", "relative");

        //canvas
        // var canvas = divobj.append("canvas")
        //     .attr("width", this.layout.area.w).attr("height", this.layout.area.h)
        //     .style("position", "absolute")
        //     .style("top", this.layout.padding + this.layout.title + "px")
        //     .style("left", this.layout.padding + this.layout.y + this.layout.yLabel + "px");

        // canvas = canvas.node();
        // var ctx = canvas.getContext("2d");

        //svg
        // this.svg = divobj.append("svg")
        this.svg = d3.select(this.chart.el).append("svg")
            .attr('class', 'd4-chart-content')
            .attr("width", this.layout.w).attr("height", this.layout.h)
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('version', '1.1')
            .on("click", function() {
                that.resetChartSelect();
            });

        //title and axis
        if ('title' in this.chart) drawChartTitle.call(this);
        if ('x' in this.axis) drawxAxis.call(this, xScale, xtickValue, tickformates);
        if ('y' in this.axis) drawYAxis.call(this, yScale);
        if ('title' in this.axis.x) drawXTitle.call(this);
        if ('title' in this.axis.y) drawYTitle.call(this);

        var chartBody = this.svg.append("g").attr("transform", "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title) + ")")

        //画line
        if (this.chart.line && this.chart.line.show) {
            var throughline = chartBody.selectAll(".throughline")
                .data(lineData).enter()
                .append("g")
                .attr("class", "throughline")

            throughline.append("line")
                .attr("x1", 0)
                .attr("y1", d => yScale(d.value))
                .attr("x2", xScale(rangeSum))
                .attr("y2", d => yScale(d.value))
                .style("stroke", ("style" in that.chart.line && "stroke" in that.chart.line.style) ? that.chart.line.style.stroke : "#000000")
                .style("stroke-width", ("style" in that.chart.line && "stroke-width" in that.chart.line.style) ? that.chart.line.style["stroke-width"] : 1)
                .style("stroke-dasharray", "5, 5")

            throughline.append("text")
                .attr("x", xScale(rangeSum) + lineTextWidth)
                .attr("y", d => yScale(d.value))
                .attr("text-anchor", "end")
                .attr("dominant-baseline", "middle")
                .attr("font-family", " Consolas, Monaco, monospace")
                .style("font-size", that.styleConfig.ticksFontSize)
                .text(d => d.name + "：" + d.value)
        }

        //画散点
        let radius = (this.chart.style && this.chart.style.radius) ? this.chart.style.radius : 2;
        var currentRangeSum = 0;
        data.forEach((d, i) => {
            var range = Math.abs(d.end - d.start);
            currentRangeSum += range; //到当前染色体时的range之和
            var previousRangeSum = currentRangeSum - range; //到当前染色体前一个的range之和

            chartBody.append("g").attr("transform", `translate(${xScale(previousRangeSum)},0)`)
                .selectAll('circle')
                .data(d.point).enter()
                .append("circle")
                .attr("r", 0)
                .attr("fill", colors[i % colorsLen])
                .attr("stroke", (this.chart.style && this.chart.style.stroke) ? this.chart.style.stroke : "none")
                .attr("stroke-width", (this.chart.style && this.chart.style["stroke-width"]) ? this.chart.style["stroke-width"] : 0)
                .style("cursor", "pointer")
                .attr("cx", m => xScale(m.x))
                .attr("cy", m => yScale(m.y))
                .on("mouseover", function(m) {
                    d3.select(this).transition().attr('r', radius + 2);
                    if ("tooltip" in that && that.tooltip) {
                        var html = that.tooltip(m);
                    }
                    tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : `x：${m.x}<br>y：${m.y}`);
                })
                .on("mousemove", function() {
                    tooltip.update(d3.event.pageX, d3.event.pageY);
                })
                .on("mouseout", function() {
                    d3.select(this).transition().attr('r', radius);
                    tooltip.hide();
                })
                .transition()
                .duration(800)
                .attr("r", radius)

            // ctx.beginPath();
            // pointData.forEach(m => {
            //     var cx = xScale(m.x) + xScale(previousRangeSum);
            //     var cy = yScale(m.y);
            //     ctx.moveTo(cx, cy);
            //     ctx.arc(cx, cy, 2, 0, Math.PI * 2);
            // })
            // ctx.fillStyle = colors[i % colorsLen];
            // ctx.fill();
        })

    }
}

export default Manhattan;
