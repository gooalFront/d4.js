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
    drawXTitle,
} from './tools/axisTitle';
import {
    drawLegend
} from './tools/legend';

class Cluster extends Base {
    constructor(options, rootConfig,styleConfig) {
        super(options, rootConfig,styleConfig);
        this.drawCluster();
    }

    drawCluster() {
        d3.selectAll(this.chart.el + " svg").remove();
        var that = this;
        var leftCluster = this.chart.data.leftCluster,
            topCluster = this.chart.data.topCluster,
            heatmapData = [...this.chart.data.heatmapData].reverse();

        var heatmapLen = heatmapData.length,
            YgeneDataLen = heatmapData[0].heatmap.length;

        var heatmap_width = 0,
            heatmap_height = 0;
        if ("heatmap" in this.chart && "width" in this.chart.heatmap) {
            heatmap_width = this.chart.heatmap.width;
            if (heatmap_width < 200 || heatmap_width > 2000) {
                heatmap_width = 480;
            }
        } else {
            heatmap_width = 480;
        }

        if ("heatmap" in this.chart && "height" in this.chart.heatmap) {
            heatmap_height = this.chart.heatmap.height;
            if (heatmap_height < 200 || heatmap_height > 2000) {
                heatmap_height = 480;
            }
        } else {
            heatmap_height = 480;
        }

        this.layout.area.w = heatmap_width;
        this.layout.area.h = heatmap_height;

        var single_rect_width = heatmap_width / heatmapLen,
            single_rect_height = heatmap_height / YgeneDataLen;

        var leftLine_height = 0,
            leftLine_width = 0;
        var topLine_width = 0,
            topLine_height = 0;

        var yName_space = 0;
        var yName_w = 0;

        var xName_space = this.styleConfig.cluster.space;

        if ("leftCluster" in this.chart && this.chart.leftCluster.show) {
            leftLine_height = heatmap_height;
            leftLine_width = this.styleConfig.cluster.leftWidth;
        }

        if ("topCluster" in this.chart && this.chart.topCluster.show) {
            topLine_width = heatmap_width;
            topLine_height = this.styleConfig.cluster.topHeight;
        }

        this.svg = d3.select(this.chart.el).append("svg")
            .attr('class', 'd4-chart-content')
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('version', '1.1')
            .on("click", function() {
                that.resetChartSelect();
            });

        //title
        if ('title' in this.chart) drawChartTitle.call(this, heatmap_width / 2 + this.layout.padding + leftLine_width);

        var body_g = this.svg.append("g")
            .attr("transform", "translate(" + this.layout.padding + "," + (this.layout.title + this.layout.padding) + ")");

        //颜色比例尺
        var valuemax = 0,
            valuemin = 0;

        if (!!this.legend && "min" in this.legend) {
            valuemin = this.legend.min;
        } else {
            heatmapData.forEach(function(val, i) {
                valuemin = d3.min(heatmapData[i].heatmap, function(d) {
                    return d.y;
                })
            })
        }

        if (!!this.legend && "max" in this.legend) {
            valuemax = this.legend.max;
        } else {
            heatmapData.forEach(function(val, i) {
                valuemax = d3.max(heatmapData[i].heatmap, function(d) {
                    return d.y;
                })
            })
        }

        var colorsLen = ("colors" in this.chart && this.chart.colors.length) ? this.chart.colors.length : 3;
        var colors = this.colors.slice(0, colorsLen);
        var colorDomainArr = [];
        for (var i = 0; i < colorsLen; i++) {
            var obj = valuemin + i * ((valuemax - valuemin) / (colorsLen - 1));
            colorDomainArr.push(obj);
        }

        var colorScale = d3.scaleLinear().domain(colorDomainArr).range(colors).interpolate(d3.interpolateRgb);

        //聚类左边折线
        if ("leftCluster" in this.chart && this.chart.leftCluster.show) {
            this._drawLine("leftCluster", leftLine_height, leftLine_width, body_g, 0, topLine_height, leftCluster);
        }

        //聚类顶部折线
        if ("topCluster" in this.chart && this.chart.topCluster.show) {
            this._drawLine("topCluster", topLine_width, topLine_height, body_g, leftLine_width + heatmap_width, 0, topCluster);
        }

        //热图区
        var heatmap_g = body_g.append("g").attr("class", "heatmap")
            .attr("transform", "translate(" + leftLine_width + "," + topLine_height + ")");

        for (var i = 0; i < heatmapLen; i++) {
            var rect_g = heatmap_g.append("g").attr("class", "heatmapRects");
            //画矩形
            rect_g.selectAll("rect")
                .data(heatmapData[i].heatmap)
                .enter()
                .append("rect")
                .attr("x", i * single_rect_width)
                .attr("y", function(d, j) { return j * single_rect_height })
                .attr("width", single_rect_width)
                .attr("height", single_rect_height)
                .attr("fill", function(d) {
                    if (d.y === null) {
                        d.y = 0;
                    }
                    return colorScale(d.y);
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
                .on('click', function(d) {
                    if (that.selectedModule) {
                        that._applyChartSelect(d, d3.select(this), (d.y === null) ? colorScale(0) : colorScale(d.y));
                        d3.event.stopPropagation();
                    } else {
                        return false;
                    }
                })

            //添加x轴的名称
            rect_g.append("text")
                .style("font-family", "Consolas, Monaco, monospace")
                .style("font-size", "12px")
                .text(heatmapData[i].name)
                .style("text-anchor", function() {
                    if ("x" in that.axis && that.axis.x.rotate) {
                        return "start";
                    } else {
                        return "middle";
                    }
                })
                .attr("transform", function() {
                    if ("x" in that.axis && that.axis.x.rotate) {
                        if (that.axis.x.rotate > 90) {
                            that.axis.x.rotate = 0;
                            d3.select(this).style("text-anchor", "middle");
                        }
                        return "translate(" + (i * single_rect_width + single_rect_width / 2) + "," + (heatmap_height + xName_space) + ") rotate(" + that.axis.x.rotate + ")";
                    } else {
                        return "translate(" + (i * single_rect_width + single_rect_width / 2) + "," + (heatmap_height + xName_space) + ")";
                    }
                })
        }

        //添加heatmap的右边名称
        if ("y" in this.axis && this.axis.y.show) {
            yName_space = this.styleConfig.cluster.space;
            heatmap_g.append("g")
                .attr("transform", "translate(" + (heatmap_width + yName_space) + ",0)")
                .attr("class", "cluster-y-text")
                .selectAll("y_text")
                .data(heatmapData[0].heatmap)
                .enter()
                .append("text")
                .style("font-family", "Consolas, Monaco, monospace")
                .style("font-size", "12px")
                .style("dominant-baseline", "middle")
                .text(function(d) {
                    return d.x;
                })
                .attr("y", function(d, i) {
                    return i * single_rect_height + single_rect_height / 2;
                })
            yName_w = d3.select(".cluster-y-text").node().getBBox().width;

        }

        var xName_h = d3.select(".heatmap").node().getBBox().height;

        //图例
        var legendStartX = this.layout.padding + leftLine_width + heatmap_width + yName_space + yName_w + this.styleConfig.legendMargin;
        var legendStartY = this.layout.padding + this.layout.title + topLine_height + (heatmap_height - this.styleConfig.gradientLegend.h) / 2;
        if (!!this.legend && this.legend.show) {
            drawLegend.call(this, colorScale, colors, legendStartX, legendStartY);
            var legend_w = d3.select(".gradient-legend").node().getBBox().width;
        }

        var svgWidth = 2 * this.layout.padding + leftLine_width + heatmap_width + yName_space + yName_w + this.styleConfig.legendMargin + (legend_w || 0);
        var svgHeight = 2 * this.layout.padding + this.layout.title + topLine_height + xName_h + this.layout.x;
        this.layout.yLabel = yName_w;
        this.layout.xLabel = xName_h - heatmap_height;
        this.layout.cluster = {
            leftWidth: leftLine_width,
            topHeight: topLine_height,
            space: this.styleConfig.cluster.space
        }
        this.layout.w = svgWidth;
        this.layout.h = svgHeight;
        if ("x" in this.axis && "title" in this.axis.x) drawXTitle.call(this, this.layout.padding + leftLine_width + heatmap_width / 2, svgHeight - this.layout.padding);
        this.svg.attr('width', svgWidth).attr('height', svgHeight);

    }

    //画聚类折线图
    _drawLine(type, size1, size2, gContainer, translateX, translateY, data) {
        var that = this;
        var cluster = d3.cluster()
            .size([size1, size2])
            .separation(function() { return 1; });

        var cluster_g = gContainer.append("g").attr("class", type);
        if (type == "leftCluster") {
            cluster_g.attr("transform", "translate(" + translateX + "," + translateY + ")");
        }

        if (type == "topCluster") {
            cluster_g.attr("transform", "translate(" + translateX + "," + translateY + ") rotate(90)");
        }

        //根据数据建立模型
        var root = d3.hierarchy(data);
        cluster(root);

        cluster_g.selectAll("path")
            .data(root.links())
            .enter().append("path")
            .attr("fill", "none")
            .attr("stroke-width", 1)
            .attr("stroke", function() {
                if ("stroke" in that.chart[type] && that.chart[type].stroke) {
                    return that.chart[type].stroke;
                } else {
                    return "#000000";
                }
            })
            .attr("d", this._elbow);
    }

    _elbow(d, i) {
        return "M" + d.source.y + "," + d.source.x +
            "V" + d.target.x + "H" + d.target.y;
    }

    updateTitle() {
        if ('title' in this.chart) drawChartTitle.call(this, this.layout.area.w / 2 + this.layout.padding + this.layout.cluster.leftWidth);
        if ('x' in this.axis && 'title' in this.axis.x) drawXTitle.call(this, this.layout.padding + this.layout.cluster.leftWidth + this.layout.area.w / 2, this.layout.h - this.layout.padding);
    }

    // redraw
    redraw(flag) {
        if (!!flag) {
            this._init(this._deepCopyObj(this.default), this.rootConfig);
        }
        this.drawCluster();
        return this;
    }

}

export default Cluster;