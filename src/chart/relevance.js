/**
 * @time 2018/8/9
 * @author xiaofang<1692977129@qq.com>
 * @description 聚类热图
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

class Relevance extends Base {
    constructor(options, rootConfig,styleConfig) {
        super(options, rootConfig,styleConfig);
        this.drawChart();
    }

    drawChart(){
        d3.selectAll(this.chart.el+" svg").remove();

        var that=this;

        this.svg = d3.select(this.chart.el).append('svg');

        var showValue = "showText" in this.chart ? this.chart.showText : false;

        //数据
        var chartData = this.chart.data;
        var samples=[];
        chartData.forEach(d=>{
            samples.push(d.x);
            samples.push(d.y);
        })
        samples=Array.from(new Set(samples));
        var sampleLen = samples.length;

        var rowRectNum = Math.sqrt(chartData.length);

        //value min 
        var valuemin = d3.min(chartData, function(d) {
            return d.category;
        })
        var minValue = 0;
        if (chartData.length != 1) {
            minValue = parseInt(valuemin * 10) / 10;
        }

        //容器宽高
        var bodyWidth = 0,
            bodyHeight = 0;
        var eachRect_w = 0,
            eachRect_h = 0;

        if (sampleLen <= 6) {
            bodyWidth = 400;
            bodyHeight = 400;
            eachRect_w = bodyWidth / rowRectNum;
            eachRect_h = bodyHeight / rowRectNum;
        } else {
            eachRect_w = 40;
            eachRect_h = 40;
            bodyWidth = eachRect_w * rowRectNum;
            bodyHeight = eachRect_h * rowRectNum;
        }

        // 比例尺
        var xScale = d3.scalePoint() .padding(0.5);
        xScale.domain(samples.map(function(d) { return d; }));
        
        var yScale = d3.scalePoint() .padding(0.5);
        yScale.domain(samples.map(function(d) { return d; }));
        
        var colorsLen = ("colors" in this.chart && this.chart.colors.length) ? this.chart.colors.length : 3;
        var colors = this.colors.slice(0, colorsLen);
        
        var colorScale = d3.scaleLinear().domain([minValue, 1]).range(colors).interpolate(d3.interpolateRgb);
        
        this._computedLayout();
        
        //图例
        if (!!this.legend && this.legend.show) {
            this._computedGradietLegendLayout(this.svg, colorScale.ticks());
            drawLegend.call(this, colorScale, colors,this.layout.padding+this.layout.y+this.layout.yLabel+bodyWidth+this.styleConfig.legendMargin);
        }
        
        this.layout.area.w=bodyWidth;
        this.layout.area.h=bodyHeight;
        this.layout.w=this.layout.padding*2+this.layout.y+this.layout.yLabel+bodyWidth+this.styleConfig.legendMargin+this.layout.legend.totalWidth;
        this.layout.h=this.layout.padding*2+this.layout.title+bodyHeight+this.layout.x+this.layout.xLabel;

        xScale.rangeRound([0, this.layout.area.w]);
        yScale.rangeRound([this.layout.area.h, 0]);
        
        this.svg.attr("width", this.layout.w)
        .attr("height", this.layout.h);
        
        var yValueScale = d3.scaleOrdinal().domain(d3.range(rowRectNum)).range(d3.range(rowRectNum).reverse());

         //title and axis
         if ('title' in this.chart) drawChartTitle.call(this);
         if ('x' in this.axis) drawxAxis.call(this, xScale);
         if ('y' in this.axis) drawYAxis.call(this, yScale);
         if ('x' in this.axis && 'title' in this.axis.x) drawXTitle.call(this);
         if ('y' in this.axis && 'title' in this.axis.y) drawYTitle.call(this);

        //主容器
        var body_g = this.svg.append("g")
            .attr("class", "allRects")
            .attr("transform", "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title) + ")");

        var sampleCorrelate_g = body_g.selectAll(".sampleCorrelate_g")
            .data(chartData)
            .enter()
            .append("g")
            .attr("class", "sampleCorrelate_g")
            .attr("transform", function(d) {
                return "translate(" + d.i * eachRect_w + "," + yValueScale(d.y) * eachRect_h + ")"
            })
            .on("mouseover", function(d) {
                if ("tooltip" in that && that.tooltip) {
                    var html = that.tooltip(d);
                }
                tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : `x：${d.x}<br>y：${d.y}`);
            })
            .on("mousemove", function() {
                tooltip.update(d3.event.pageX, d3.event.pageY);
            })
            .on("mouseout", function() {
                tooltip.hide();
            })

        //rect
        sampleCorrelate_g.append("rect")
            .attr("width", eachRect_w)
            .attr("height", eachRect_h)
            .attr("stroke", "#cccccc")
            .attr("stroke-width", 0.5)
            .attr("fill", function(d) {
                return colorScale(d.category);
            })
            .on('click', function(d) {
                if (that.selectedModule) {
                    that._applyChartSelect(d, d3.select(this), colorScale(d.category));
                    d3.event.stopPropagation();
                } else {
                    return false;
                }
            })

        //text
        if (showValue) {
            sampleCorrelate_g.append("text")
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .style("font-family", "Consolas, Monaco, monospace")
                .attr("x", eachRect_w / 2)
                .attr("y", eachRect_h / 2)
                .style("font-size", "12px")
                .text(function(d) {
                    if (d.category === 1) {
                        return d.category;
                    } else {
                        return d.category.toFixed(3);
                    }
                })
        }

        
    }


    updateTitle() {
        if ('title' in this.chart) drawChartTitle.call(this);
        if ('x' in this.axis && 'title' in this.axis.x) drawXTitle.call(this);
        if ('y' in this.axis && 'title' in this.axis.y) drawYTitle.call(this);
    }

    // redraw
    redraw(flag) {
        if (!!flag) {
            this._init(this._deepCopyObj(this.default), this.rootConfig);
        }
        this.drawChart();
        return this;
    }

}

export default Relevance;