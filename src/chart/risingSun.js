/**
 * @time 2019
 * @author xiaofang<1692977129@qq.com>
 * @description 环形图
 */

import Base from './base';
import * as d3 from 'd3';
import tooltip from './tools/tooltip';
import {
    drawChartTitle
} from './tools/title';
import {
    drawLegend
} from './tools/legend';

class RisingSun extends Base {
    constructor(options, rootConfig,styleConfig) {
        super(options, rootConfig,styleConfig);
        this.drawChart();
    }

    drawChart(){
        d3.selectAll("svg").remove();
        var that=this;
        var data = this.chart.data;
        var isShowSVGText = this.chart.showText;
        var svg_width = 800,svg_height = (parseInt(data.children.length / 4) + 1) * 20 + 700;
        //根据门的数量设置svg高度
        this.svg = d3.select(this.chart.el).append('svg').attr("width", svg_width).attr("height", svg_height);
        //设置颜色组
        var color = d3.scaleOrdinal(this.colors);
        var colorarray = [];
        //设置背景框
        var svg_backgroud_rect = this.svg.append("g").append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", svg_width)
            .attr("height", svg_height)
            .attr("fill", "transparent");

        //设置主体圈
        var main_width = 600,
            main_height = 600,
            main_translate_width = 200,
            main_translate_height = 80,
            radius = (Math.min(main_width, main_height) / 2) - 20;
        var svg_main = this.svg.append("g").attr("id", "svg_main")
            .attr("transform", "translate(" + (main_width / 2 + main_translate_width) + "," + (main_height / 2 + main_translate_height) + ")");

        //设置面包屑
        var breadcrumbs_translate_width = 30,
            breadcrumbs_translate_height = 240;
        var svg_breadcrumbs = this.svg.append("g").attr("id", "svg_breadcrumbs")
            .attr("transform", "translate(" + breadcrumbs_translate_width + "," + breadcrumbs_translate_height + ")");

        var b = { w: 140, h: 40, s: 2, t: 16 };

        // Add 左侧百分比
        svg_breadcrumbs.append("text").style("font-size", that.styleConfig.fontSize)
            .attr("id", "svg_breadcrumbs_endlabel")
            .style("fill", that.styleConfig.titleColor);

        //设置图例
        var legend_translate_width = 40,
            legend_translate_height = main_translate_height + main_height + 20;
        var svg_legend = this.svg.append("g").attr("id", "svg_legend")
            .attr("transform", "translate(" + legend_translate_width + "," + legend_translate_height + ")");

        var formatNumber = d3.format(",d");
        var x = d3.scaleLinear().range([0, 2 * Math.PI]);
        var y = d3.scaleSqrt().range([0, radius]);
        var partition = d3.partition();
        var arc = d3.arc()
            .startAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x0))); })
            .endAngle(function (d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x1))); })
            .innerRadius(function (d) { return Math.max(0, y(d.y0)); })
            .outerRadius(function (d) { return Math.max(0, y(d.y1)); });

        var totalSize = 0;

        this.layout.area.w=main_width / 2 + main_translate_width;

        //title
        if ('title' in this.chart) drawChartTitle.call(this, (main_width / 2 + main_translate_width));

        draw_svg(data);

        function draw_svg(root) {
            for (var i = 0; i < root.children.length; i++) {
                var temp = {
                    "name": root.children[i].name,
                    "color": color(root.children[i].name),
                    "colorscale": d3.scaleLinear().domain([0, 10]).range([color(root.children[i].name), "#FFFFFF"]).interpolate(d3.interpolateRgb)
                }
                colorarray.push(temp)
            }

            drawlegend(colorarray)
            root = d3.hierarchy(root);
            root.sum(function (d) { return d.size; });
            var paths = svg_main.selectAll("path")
                .data(partition(root).descendants())
                .enter().append("path").attr("stroke", "#ffffff")
                .attr("d", arc)
                .style("fill", fillcolor)
                .on("click", click)
                .on("mouseover", mouseover)
            // .append("title")
            //   .text(function(d) { return d.data.name + "\n" + formatNumber(d.value); });

            totalSize = paths.datum().value;

            svg_backgroud_rect.on("click", backgroudClick)

            d3.select("#svg_main").on("mouseleave", mouseleave);

            //根据门的分类和级别填充颜色
            function fillcolor(d) {
                //特殊处理最中央的元素
                if (!d.parent) {
                    return "white"
                }
                //节点所在门元素
                var temp_d = d;
                for (i = 0; i < d.depth - 1; i++) {
                    temp_d = temp_d.parent;
                }

                for (i = 0; i < colorarray.length; i++) {
                    if (colorarray[i].name === temp_d.data.name) {
                        return colorarray[i].colorscale(d.depth)
                    }
                }
                // return color((d.children ? d : d.parent).data.name);
            }

            function click(d) {
                svg_main.select("#svg_main_text").remove()
                svg_main.append("g").attr("id", "svg_main_text")
                svg_main.transition()
                    .duration(750)
                    .tween("scale", function () {
                        var xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                            yd = d3.interpolate(y.domain(), [d.y0, 1]),
                            yr = d3.interpolate(y.range(), [d.y0 ? 20 : 0, radius]);
                        return function (t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); };
                    })
                    .selectAll("path")
                    .attrTween("d", function (d) { return function () { return arc(d); }; })
                    .on("end", function () {

                        if (d.depth > 0) {
                            d3.select('#svg_main_text')
                                .selectAll("text")
                                .data(d.descendants())
                                .enter().append("text").style("font-size", that.styleConfig.ticksFontSize).attr("class", "svg_main_text")
                                .attr("opacity", function () {
                                    if (isShowSVGText) {
                                        return 1;
                                    }
                                    return 0;
                                })
                                .attr("transform", function (d) {
                                    var r = x((d.x0) + (d.x1 - d.x0) / 2) / (2 * Math.PI) * 360 - 90
                                    return "rotate(" + r + ")"
                                }
                                )
                                // .attr("x", function (d) { return Math.sqrt(y(d.y0)); })
                                .attr("x", function (d) { return radius / 22 * Math.sqrt(y(d.y0)) })
                                .attr("dx", "6") // margin
                                .attr("dy", ".35em") // vertical-align
                                .text(function (d) { return d.data.name; });
                        }
                    });


                drawlegend(getp_list(d))
            }

            //改动交互前鼠标移除后
            function mouseleave(d) {
                //鼠标离开后是否显示面包屑
                // d3.select("#svg_breadcrumbs")
                //     .style("visibility", "hidden");

                //去掉mouseover事件
                // svg_main.selectAll("path").on("mouseover", null);

                // 每个块移开后重新fill之前的颜色，并添加mouseover事件
                // svg_main.selectAll("path")
                //   .transition()
                //   .duration(750)
                //   .style("opacity", 1)
                //   .on("end", function () {
                //     d3.select(this).on("mouseover", mouseover);
                //   });

                //   d3.select("#explanation")
                //       .style("visibility", "hidden");
            }

            //点击背景还原
            function backgroudClick() {
                d3.select("#svg_breadcrumbs")
                    .style("visibility", "hidden");
                svg_main.selectAll("path").on("mouseover", null);
                svg_main.selectAll("path").style("opacity", 1).on("mouseover", mouseover)
            }

            function mouseover(d) {

                var percentage = (100 * d.value / totalSize).toPrecision(3);
                var percentageString = percentage + "%";
                if (percentage < 0.1) {
                    percentageString = "< 0.1%";
                }

                //   d3.select("#percentage")
                //       .text(percentageString);

                //   d3.select("#explanation")
                //       .style("visibility", "");

                var sequenceArray = d.ancestors().reverse();
                sequenceArray.shift(); // remove root node from the array
                updateBreadcrumbs(sequenceArray, percentageString);

                //对main主体进行控制
                svg_main.selectAll("path")
                    .style("opacity", 0.3);

                // Then highlight only those that are an ancestor of the current segment.
                svg_main.selectAll("path")
                    .filter(function (node) {
                        return (sequenceArray.indexOf(node) >= 0);
                    })
                    .style("opacity", 1);

                //选择最中心的元素时，不显示百分比
                if (!d.parent) {
                    svg_breadcrumbs.select("#svg_breadcrumbs_endlabel").text("")

                }

            }

            //根据数据生成面包屑导航
            function updateBreadcrumbs(nodeArray, percentageString) {

                // Data join; key function combines name and depth (= position in sequence).
                var trail = svg_breadcrumbs
                    .selectAll("g")
                    .data(nodeArray, function (d) {
                        return d.data.name + d.depth;
                    });

                // Remove exiting nodes.
                trail.exit().remove();

                // Add breadcrumb and label for entering nodes.
                var entering = trail.enter().append("g");
                entering.append("polygon")
                    .attr("points", breadcrumbPoints)
                    .style("fill", fillcolor);

                entering.append("text").style("font-size", that.styleConfig.ticksFontSize)
                    .attr("x", b.w / 2)
                    .attr("y", (b.h + b.t) / 2 + b.s)
                    .attr("dy", "0.35em")
                    .attr("text-anchor", "middle")
                    .text(function (d) { return d.data.name; });

                // Merge enter and update selections; set position for all nodes.
                entering.merge(trail).attr("transform", function (d, i) {
                    return "translate(0," + i * (b.h + b.s) + ")";
                });

                // Now move and update the percentage at the end.
                svg_breadcrumbs.select("#svg_breadcrumbs_endlabel")
                    .attr("x", b.w / 2)
                    .attr("y", (nodeArray.length + 0.8) * (b.h + b.s))
                    .attr("dy", "0.35em")
                    .attr("text-anchor", "middle")
                    .text(percentageString);

                // Make the breadcrumb trail visible, if it's hidden.
                svg_breadcrumbs
                    .style("visibility", "");

            }
            //横向面包屑
            // function breadcrumbPoints(d, i) {
            //   var points = [];
            //   points.push("0,0");
            //   points.push(b.w + ",0");
            //   points.push(b.w + b.t + "," + (b.h / 2));
            //   points.push(b.w + "," + b.h);
            //   points.push("0," + b.h);
            //   if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
            //     points.push(b.t + "," + (b.h / 2));
            //   }
            //   return points.join(" ");
            // }

            //生成面包屑ploygon坐标
            function breadcrumbPoints(d, i) {
                var points = [];
                points.push("0,0");
                points.push("0," + b.h);
                points.push(b.w / 2 + "," + (b.h + b.t));
                points.push(b.w + "," + b.h);
                points.push(b.w + ",0");
                if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
                    points.push(b.w / 2 + "," + b.t);
                }
                return points.join(" ");
            }

            //点击后返回门的颜色和名称数组
            function getp_list(d) {
                var p_list = []
                //特殊处理最中央的元素，如果点击的是最中央的元素，则返回所有门数组
                if (!d.parent) {
                    return colorarray;
                }

                //节点所在门元素，如果点击的是非最中央元素，则返回所在的门元素
                var temp_d = d;
                for (i = 0; i < d.depth - 1; i++) {
                    temp_d = temp_d.parent;
                }

                for (i = 0; i < colorarray.length; i++) {
                    if (colorarray[i].name === temp_d.data.name) {
                        var temp_p = {};
                        temp_p.name = temp_d.data.name;
                        temp_p.color = colorarray[i].colorscale(d.depth);
                        p_list.push(temp_p);
                        return p_list
                    }
                }
                // return color((d.children ? d : d.parent).data.name);
            }
            //根据P_LIST数据画图例
            function drawlegend(array) {
                svg_legend.selectAll("g").remove();
                //局部图图例
                if (array.length === 1) {
                    legend_g = svg_legend.append("g").attr("name", array[0].name)
                        .attr("transform", "translate(" + (main_width / 2 + main_translate_width - 100) + ", 20 )");
                    legend_g.append("rect").attr("x", 0).attr("y", 0).attr("width", 10).attr("height", 10).attr("fill", array[0].color)
                    legend_g.append("text").attr("transform", "translate(16,8)").text(array[0].name).style("font-size", that.styleConfig.legendFontSize)
                    return;
                }
                //全局图图例
                for (var i = 0; i < array.length; i++) {
                    var legend_g = svg_legend.append("g").attr("name", array[i].name)
                        .attr("transform", "translate(" + (i % 4) * 200 + "," + parseInt(i / 4) * 20 + ")")
                    legend_g.append("rect").attr("x", 0).attr("y", 0).attr("width", 10).attr("height", 10).attr("fill", array[i].color)
                    legend_g.append("text").attr("transform", "translate(16,8)").text(array[i].name).style("font-size", that.styleConfig.legendFontSize)
                }
            }

        }

        // d3.select(self.frameElement).style("height", main_height + "px");

    }

    updateTitle() {
        if ('title' in this.chart) drawChartTitle.call(this, this.layout.area.w);
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

export default RisingSun;

