/**
 * @time 2018/8/27
 * @author xiaofang<1692977129@qq.com>
 * @description 气泡图
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

class Bubble extends Base {
    constructor(options, rootConfig,styleConfig) {
        super(options, rootConfig,styleConfig);
        this.drawBubble();
    }

    drawBubble() {
        d3.selectAll(this.chart.el + " svg").remove();
        var that = this;
        var data = this.chart.data,
            len = data.length;

        var legendData=[];
        if(!!this.legend && "data" in this.legend && this.legend.data.length){
            legendData=this.legend.data;
        }

        //x
        var x_min = 0,
            x_max = 0;

        if (this.axis.x && "min" in this.axis.x) {
            x_min = this.axis.x.min;
        } else {
            x_min = d3.min(data, function(d) {
                return d.x;
            })
        }

        if (this.axis.x && "max" in this.axis.x) {
            x_max = this.axis.x.max;
        } else {
            x_max = d3.max(data, function(d) {
                return d.x;
            })
        }

        //y
		var yScale;
		var yLinerFlag = false;
        if (typeof data[0].y === "number") {
            var y_min = 0,
                y_max = 0;

            if (this.axis.y && "min" in this.axis.y) {
                y_min = this.axis.y.min;
            } else {
                y_min = d3.min(data, function(d) {
                    return d.y;
                })
            }

            if (this.axis.y && "max" in this.axis.y) {
                y_max = this.axis.y.max;
            } else {
                y_max = d3.max(data, function(d) {
                    return d.y;
                })
            }
			yScale = d3.scaleLinear().domain([y_min, y_max]);
			yLinerFlag = true;
        } else {
            yScale = d3.scalePoint().padding(0.5).domain(data.map(function(d) {
                return d.y;
			}));
			yLinerFlag = false;
        }

        //color
        var valuemin, valuemax;
        if (!!this.legend && "min" in this.legend) {
            valuemin = this.legend.min;
        } else {
            valuemin = d3.min(legendData, function(d) {
                return d;
            });
        }

        if (!!this.legend && "max" in this.legend) {
            valuemax = this.legend.max;
        } else {
            valuemax = d3.max(legendData, function(d) {
                return d;
            });
        }

        var colorsLen = ("colors" in this.chart && this.chart.colors.length) ? this.chart.colors.length : 3;
        var colors = this.colors.slice(0, colorsLen);
        var colorDomainArr = [];
        for (var i = 0; i < colorsLen; i++) {
            var obj = valuemin + i * ((valuemax - valuemin) / (colorsLen - 1));
            colorDomainArr.push(obj);
        }

        //x，y轴比例尺
        var xScale = d3.scaleLinear().domain([x_min, x_max]);
        //气泡颜色比例尺
        var colorScale = d3.scaleLinear().domain(colorDomainArr).range(colors).interpolate(d3.interpolateRgb);
        //气泡半径比例尺
        var r_min = d3.min(data, function(d) {
            return d.r;
        });
        var r_max = d3.max(data, function(d) {
            return d.r;
        });
        var Rmin, Rmax;
        if ("radius" in this.chart && "min" in this.chart.radius) {
            Rmin = this.chart.radius.min;
        } else {
            Rmin = 4;
        }
        if ("radius" in this.chart && "max" in this.chart.radius) {
            Rmax = this.chart.radius.max;
        } else {
            Rmax = 8;
        }
        var Rsize_arr = [Rmin, Rmax];
        var rScale = d3.scaleLinear().domain([r_min, r_max]).range(Rsize_arr).clamp(true);

        var ticks = xScale.ticks();
        this.axis.x.data = ticks;
        this._computedLayout(xScale,yLinerFlag?yScale:null);

        this.svg = d3.select(this.chart.el).append("svg")
            .attr('class', 'd4-chart-content')
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('version', '1.1')
            .attr("width", this.layout.w).attr("height", this.layout.h)
            .on("click", function() {
                that.resetChartSelect();
            });

        //图例
        var gradientLegend_h = 0;
        var space = 10;
        if (!!this.legend && this.legend.show) {
            this._computedGradietLegendLayout(this.svg, colorScale.ticks());
            drawLegend.call(this, colorScale, colors, null, this.layout.padding + this.layout.title);
            // gradientLegend_h = d3.select(this.chart.el+" svg .gradient-legend").node().getBBox().height;
            gradientLegend_h = 'title' in this.legend && this.legend.title ? (this.styleConfig.gradientLegend.h+35) : this.styleConfig.gradientLegend.h;

            if (!!this.legend.rLegend && this.legend.rLegend.show) {
                var r_legend = this.svg.append("g").attr("class", "radius-legend")
                    .attr("transform", "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel + this.layout.area.w + this.styleConfig.legendMargin) + "," + (this.layout.padding + this.layout.title + gradientLegend_h + space) + ")");

                if ("title" in this.legend.rLegend) {
                    r_legend.append("text")
                        .style("font-size", this.styleConfig.legendTitleFontSize + 'px')
                        .style("text-anchor", "start")
                        .attr("dominant-baseline", 'middle')
                        .attr('dx',-10)
                        .attr("dy", -(this.styleConfig.legend.p))
                        .text(this.legend.rLegend.title);
                }
                var rData = [];
                var rLen = 5;
                for (var i = 0; i < rLen; i++) {
                    var r = r_min + i * ((r_max - r_min) / (rLen - 1));
                    rData.push(Math.round(r));
                }
                var resultarr = [...new Set(rData)]; //去重
                var circle_legend = r_legend.append("g");
                var r_sum = 0;
                resultarr.forEach(function(d, i) {
                    var r_size = 2 * rScale(d);
                    r_sum += r_size;
                    circle_legend.append("circle")
                        .attr("r", rScale(d))
                        .attr("cy", r_sum + i * space);
                    circle_legend.append("text")
                        .attr("dx", rScale(resultarr[resultarr.length - 1]) + that.styleConfig.legend.m)
                        .attr("dy", r_sum + i * space)
                        .style("font-size", that.styleConfig.legendFontSize)
                        .attr("text-anchor", "start")
                        .attr("dominant-baseline", "middle")
                        .text(d)
                })
            }
        }

        xScale.range([0, this.layout.area.w]).clamp(true);
        if (typeof data[0].y === "number") {
            yScale.range([this.layout.area.h, 0]).clamp(true);
        } else {
            yScale.rangeRound([0, this.layout.area.h]);
        }

        //title and axis
        if ('title' in this.chart) drawChartTitle.call(this);
        if ('x' in this.axis) drawxAxis.call(this, xScale);
        if ('y' in this.axis) drawYAxis.call(this, yScale);
        if ('title' in this.axis.x) drawXTitle.call(this);
        if ('title' in this.axis.y) drawYTitle.call(this);

        //画气泡
        var body_g = this.svg.append("g").attr("class", "chart-area")
            .attr("transform", "translate(" + (this.layout.y + this.layout.yLabel + this.layout.padding) + "," + (this.layout.padding + this.layout.title) + ")");
        body_g.selectAll("bubbleCircle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 0)
            .attr("cx", d => xScale(d.x))
            .attr("cy", d => yScale(d.y))
            .attr("fill", d => colorScale(d.color))
            .attr("fill-opacity", 0.3)
            .attr("stroke", d => colorScale(d.color))
            .attr("stroke-opacity", 0.7)
            .on("mouseover", function(d) {
                d3.select(this).transition().attr("r", rScale(d.r) + 2);
                if ("tooltip" in that && that.tooltip) {
                    var html = that.tooltip(d);
                }
                tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : `x：${d.x}<br>y：${d.y}`);
            })
            .on("mousemove", function() {
                tooltip.update(d3.event.pageX, d3.event.pageY);
            })
            .on("mouseout", function(d) {
                d3.select(this).transition().attr("r", rScale(d.r));
                tooltip.hide();
            })
            .on('click', function(d) {
                if (that.selectedModule) {
                    that._applyChartSelect(d, d3.select(this), colorScale(d.color));
                    d3.event.stopPropagation();
                } else {
                    return false;
                }
            })
            .transition()
            .duration(800)
            .attr("r", d => rScale(d.r));
    }

    updateTitle() {
        if ('title' in this.chart) drawChartTitle.call(this);
        if ('title' in this.axis.x) drawXTitle.call(this);
        if ('title' in this.axis.y) drawYTitle.call(this);
    }

    // redraw
    redraw(flag) {
        if (!!flag) {
            this._init(this._deepCopyObj(this.default), this.rootConfig);
        }
        this.drawBubble();
        return this;
    }
}

export default Bubble;
