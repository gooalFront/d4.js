/**
 * @time 2018/8/9
 * @author xiaofang<1692977129@qq.com>
 * @description 箱线图
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

class Boxplot extends Base {
    constructor(options, rootConfig,styleConfig) {
        super(options, rootConfig,styleConfig);
        this.drawBoxplot();
    }

    // 画箱线
    drawBoxplot() {
        d3.selectAll(this.chart.el + " svg").remove();
        var that = this;
        this.svg = d3.select(this.chart.el).append("svg")
            .attr('class', 'd4-chart-content')
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('version', '1.1')
            .on("click", function() {
                that.resetChartSelect();
            });

        //比例尺的min、max
        var yMin, yMax;
        if ("min" in this.axis.y) {
            yMin = this.axis.y.min;
        } else {
            yMin = d3.min(this.axis.y.data, function(d) { return Math.floor(d); });
        }

        if ("max" in this.axis.y) {
            yMax = this.axis.y.max;
        } else {
            yMax = d3.max(this.axis.y.data, function(d) { return Math.ceil(d); });
        }

        //比例尺
        var xScale = d3.scalePoint().padding(0.5);
        var yScale = d3.scaleLinear();

        xScale.domain(this.axis.x.data.map(function(d) { return d; }));
        yScale.domain([yMin, yMax]).nice();

        var colorScale = d3.scaleOrdinal().range(this.colors.map(function(d) { return d })).domain(this.axis.x.data.map(function(d) { return d }));

        //计算布局
        var ticks = yScale.ticks();
        this.axis.y.data = ticks;
        this._computedLayout(null,yScale);
        this.svg.attr('width', this.layout.w).attr('height', this.layout.h);

        //图例
        if (!!this.legend && this.legend.show) {
            var legendData = this.legend.data;
            this._computedLegendLayout(this.svg, legendData);
            drawLegend.call(this, colorScale);
        }

        xScale.rangeRound([0, this.layout.area.w]);
        yScale.range([this.layout.area.h, 0]);

        //title and axis
        if ('title' in this.chart) drawChartTitle.call(this);
        if ('x' in this.axis) drawxAxis.call(this, xScale);
        if ('y' in this.axis) drawYAxis.call(this, yScale);
        if ('title' in this.axis.x) drawXTitle.call(this);
        if ('title' in this.axis.y) drawYTitle.call(this);

        //画主体需要的布局参数
        var space = 20;
        var chartData = this.chart.data;
        var dataLen = chartData.length;
        var small_rect_w = (this.layout.area.w - (dataLen + 1) * space) / dataLen;
        if (small_rect_w > 64) {
            small_rect_w = 64;
        }
        if (small_rect_w < 5) {
            small_rect_w = 5;
        }

        //画图主体
        var body_g = this.svg.append("g").attr("class", "chart-area")
            .attr("transform", "translate(" + (this.layout.padding + this.layout.y + this.layout.yLabel) + "," + (this.layout.padding + this.layout.title) + ")");

        var allBox_g = body_g.append("g")
            .attr("class", "box");

        var singleBox_g = allBox_g.selectAll(".boxLine_g")
            .data(chartData)
            .enter()
            .append("g");

        var line_rect_g = singleBox_g.append("g").attr("class", "lineRect")
            .on("mouseover", function(d) {
                var high = d.boxData.high,
                    low = d.boxData.low,
                    y1 = d.boxData.y1,
                    y2 = d.boxData.y2,
                    median = d.boxData.median;

                if ("tooltip" in that && that.tooltip) {
                    var html = that.tooltip(d);
                }
                tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : `x：${d.name}<br>上限：${high}<br>上四分位数：${y2}<br>中位数：${median}<br>下四分位数：${y1}<br>下限：${low}`);
            })
            .on("mousemove", function() {
                tooltip.update(d3.event.pageX, d3.event.pageY);
            })
            .on("mouseout", function() {
                tooltip.hide();
            })

        //box high line
        this._drawLline(line_rect_g, xScale, yScale, small_rect_w / 2, "high", "high");

        //box vertical line
        this._drawLline(line_rect_g, xScale, yScale, 0, "high", "low");

        //box low line
        this._drawLline(line_rect_g, xScale, yScale, small_rect_w / 4, "low", "low");

        //box rect
        line_rect_g.append("rect")
            .attr("width", small_rect_w)
            .attr("height", function(d) {
                var r_height = Math.abs(yScale(d.boxData.y1) - yScale(d.boxData.y2));
                return r_height;
            })
            .attr("x", function(d) {
                var rect_x = xScale(d.name) - small_rect_w / 2;
                return rect_x;
            })
            .attr("y", function(d) {
                var rect_y = yScale(d.boxData.y2);
                return rect_y;
            })
            .attr("fill", function(d) {
                return ("style" in that.chart && "fill" in that.chart.style) ? that.chart.style.fill : colorScale(d.name);
            })
            .attr("stroke-width", 1)
            .attr("stroke", ("style" in that.chart && "stroke" in that.chart.style) ? that.chart.style.stroke : "#000000")
            .attr("class", function(d) {
                return d.name;
            })

        // box rect median line
        this._drawLline(line_rect_g, xScale, yScale, small_rect_w / 2, "median", "median");

        //画散点
        if ("scatter" in this.chart && this.chart.scatter.show) {
            var radius = 3;
            var scatter = that.chart.scatter;
            var scatterStyle = scatter.style;

            var scatter_r = ("style" in scatter && "radius" in scatterStyle) ? scatterStyle.radius : radius;

            // scatter
            singleBox_g.append("g")
                .attr("class", "boxSpot")
                .selectAll("boxCircle")
                .data(function(d) {
                    return d.spotData;
                })
                .enter()
                .append("circle")
                .attr("r", 0)
                .attr("cx", function(d) {
                    return xScale(d.x);
                })
                .attr("cy", function(d) {
                    return yScale(d.y);
                })
                .attr("fill", function(d) {
                    if ("style" in scatter && "fill" in scatterStyle) {
                        return scatterStyle.fill;
                    } else {
                        return colorScale(d.x);
                    }
                })
                .attr("stroke", function(d) {
                    if ("style" in scatter && "stroke" in scatterStyle) {
                        return scatterStyle.stroke;
                    } else {
                        return colorScale(d.x);
                    }
                })
                .attr("stroke-width", function() {
                    if ("style" in scatter && "stroke-width" in scatterStyle) {
                        return scatterStyle["stroke-width"];
                    } else {
                        return 1;
                    }
                })
                .on("mouseover", function(d) {
                    d3.select(this).transition().attr('r', scatter_r + 2);
                    if ("tooltip" in that.chart.scatter && that.chart.scatter.tooltip) {
                        var html = that.chart.scatter.tooltip(d);
                    }
                    tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : `x：${d.x}<br>y：${d.y}`);
                })
                .on("mousemove", function() {
                    tooltip.update(d3.event.pageX, d3.event.pageY);
                })
                .on("mouseout", function() {
                    d3.select(this).transition().attr('r', scatter_r);
                    tooltip.hide();
                })
                .on('click', function(d) {
                    if (that.selectedModule) {
                        that._applyChartSelect(d, d3.select(this), ("style" in scatter && "fill" in scatterStyle) ? scatterStyle.fill : colorScale(d.x));
                        d3.event.stopPropagation();
                    } else {
                        return false;
                    }
                })
                .transition()
                .duration(800)
                .attr("r", scatter_r)

        }

        // 画折线
        if ("line" in this.chart && this.chart.line.show) {
            var chartline = that.chart.line;
            var lineStyle = chartline.style;

            var line = d3.line()
                .x(function(d) {
                    return xScale(d.x);
                })
                .y(function(d) {
                    return yScale(d.y);
                });

            line.curve(this._computedInterpolate(this.chart.line.interpolate));

            var line_g = body_g.append("g").attr("class", "line");
            //path
            line_g.append('path')
                .datum(this.chart.line.data)
                .attr("class", "linePath")
                .attr('fill', 'none')
                .attr('stroke', function() {
                    return ("style" in chartline && "stroke" in lineStyle) ? lineStyle.stroke : "#000";
                })
                .attr("stroke-width", function() {
                    return ("style" in chartline && "stroke-width" in lineStyle) ? lineStyle["stroke-width"] : 1;
                });

            line_g.append('path')
                .attr("class", "linePath")

            line_g.select("path.linePath")
                .datum(this.chart.line.data)
                .attr("d", line)
                .transition()
                .duration(800)
                .attrTween("stroke-dasharray", this._tweenDash);

            //point
            var point_r = ("style" in chartline && "stroke-width" in lineStyle) ? lineStyle["stroke-width"] + 1 : 2;
            if (this.chart.line.point) {
                line_g.selectAll("point")
                    .data(this.chart.line.data).enter()
                    .append("circle")
                    .attr("r", 0)
                    .attr("cx", function(d) {
                        return xScale(d.x);
                    })
                    .attr("cy", function(d) {
                        return yScale(d.y);
                    })
                    .attr("fill", function() {
                        return ("style" in chartline && "stroke" in lineStyle) ? lineStyle.stroke : "#000";
                    })
                    .on("mouseover", function(d) {
                        d3.select(this).transition().attr('r', point_r + 2);
                        if ("tooltip" in chartline && chartline.tooltip) {
                            var html = chartline.tooltip(d);
                        }
                        tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : `x：${d.x}<br>y：${d.y}`);
                    })
                    .on("mousemove", function() {
                        tooltip.update(d3.event.pageX, d3.event.pageY);
                    })
                    .on("mouseout", function() {
                        d3.select(this).transition().attr('r', point_r);
                        tooltip.hide();
                    })
                    .transition()
                    .duration(800)
                    .attr("r", point_r)

            }
        }

    }

    //画线
    _drawLline(g, xScale, yScale, num, key1, key2) {
        g.append("line")
            .attr("stroke-width", 2)
            .attr("stroke", ("style" in this.chart && "stroke" in this.chart.style) ? this.chart.style.stroke : "#000000")
            .attr("x1", function(d) {
                var median_x1 = xScale(d.name) - num;
                return median_x1;
            })
            .attr("x2", function(d) {
                var median_x2 = xScale(d.name) + num;
                return median_x2;
            })
            .attr("y1", function(d) {
                var median_y1 = d.boxData[key1];
                return yScale(median_y1);
            })
            .attr("y2", function(d) {
                var median_y2 = d.boxData[key2];
                return yScale(median_y2);
            });
    }

    //path animate
    _tweenDash() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) { return i(t); };
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
        this.drawBoxplot();
        return this;
    }
}

export default Boxplot;
