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

class Circos extends Base {
    constructor(options, rootConfig,styleConfig) {
        super(options, rootConfig,styleConfig);
        this.drawChart();
    }

    drawChart() {
        d3.selectAll(this.chart.el+" svg").remove();
        var that=this;
        //定义数据
        var outerRing = this.chart.data.rings;
        var lineData = this.chart.data.lines;

        var isShowGene = this.chart.showText;

        var max_chrNameLength = d3.max(outerRing, function(d) {
            return d.name.length;
        })

        //legend
        var legendData=[];
        if(this.legend && this.legend.data && this.legend.data.length){
            legendData=this.legend.data;
        }else{
            outerRing.forEach(d=>{
                legendData.push(d.name);
            })
        }

        //定义容器宽高、边距
        var width = 600,
            height = 600,
            tick_margin = 38,
            outer_margin = max_chrNameLength * 8 + tick_margin,
            outer_padding = 10,
            outerRadius = Math.min(width, height) * 0.5 - outer_margin,
            innerRadius = outerRadius - outer_padding,

            column_h = 30,
            inner_margin = 5;

        var innerRadius1 = innerRadius - column_h - inner_margin,
            innerRadius2 = innerRadius1 - column_h - inner_margin,
            innerRadius3 = innerRadius2 - inner_margin - outer_padding;

        this.layout.area.w=width;
        this.layout.area.h=height;
        
        var svgW=this.layout.padding*2+this.layout.area.w;
        var svgH=this.layout.padding*2+this.layout.area.h+this.layout.title;
        
        this.layout.w=svgW;
        this.layout.h=svgH;

        //外环颜色比例尺
        var colorScale = d3.scaleOrdinal()
            .domain(legendData) // d3.range(outerRing.length)
            .range(this.colors);

        //svg
        this.svg = d3.select(this.chart.el).append('svg');

        //title
        if ('title' in this.chart) drawChartTitle.call(this, this.layout.area.w/2);

        //定义主容器
        var body_g = this.svg.append("g")
            .attr("transform", "translate(" + width / 2 + "," + (height / 2+this.layout.title) + ")");

        //柱状图容器
        var column1_g = body_g.append("g")
            .attr("class", "innerRing1");

        var column2_g = body_g.append("g")
            .attr("class", "innerRing2");

        var column3_g = body_g.append("g")
            .attr("class", "innerRing3");

        //外环
        var outer_space = 8;
        var sum_chrlength = d3.sum(outerRing, function(d) {
            return d.length;
        })

        //周长比例尺
        var outerGirthScale = d3.scaleLinear().range([0, 2 * Math.PI * innerRadius - outer_space * outerRing.length]).domain([0, sum_chrlength]);

        //角度比例尺
        var outerAngleScale = d3.scaleLinear().range([0, 2 * Math.PI]).domain([0, 2 * Math.PI * innerRadius]);
        var spaceAngle = outerAngleScale(outer_space);

        //数据处理成画图数据结构
        var chartData = [];
        var StartBeforeAngle = 0,
            EndBeforeAngle = 0;

        var allColumn1 = [],
            allColumn2 = [],
            allColumn3 = [],
            allGeneName = [];

        for (var i = 0; i < outerRing.length; i++) {
            var d = outerRing[i];
            var each_angle = outerAngleScale(outerGirthScale(d.length));
            EndBeforeAngle += each_angle;
            StartBeforeAngle = EndBeforeAngle - each_angle;

            var startAngle = StartBeforeAngle + i * spaceAngle,
                endAngle = EndBeforeAngle + i * spaceAngle;

            var column1_len = d.column1 && d.column1.length,
                column2_len = d.column2 && d.column2.length,
                column3_len = d.column3 && d.column3.length,
                point_len = d.pointData && d.pointData.length;

            var column1_w = column1_len ? outerGirthScale(d.length) / column1_len : 0,
                column2_w = column2_len ? outerGirthScale(d.length) / column2_len : 0,
                column3_w = column3_len ? outerGirthScale(d.length) / column3_len : 0;

            var posScale = d3.scaleLinear().range([0, (endAngle - startAngle) * 180 / Math.PI]).domain([0, d.maxPos]);

            chartData.push({
                "index": i,
                "value": d.length,
                "startAngle": startAngle,
                "endAngle": endAngle,
                "angle": (startAngle + endAngle) / 2,
                "name": d.name,
                "column1": [],
                "column2": [],
                "column3": [],
                "maxPos": d.maxPos,
                "pointData": []

            })

            if (column1_len) {
                for (var j = 0; j < column1_len; j++) {
                    var column1_d = d.column1[j];
                    allColumn1.push(column1_d);
                    chartData[i].column1.push({
                        "value": d.column1[j],
                        "width": column1_w,
                        "rotateAngle": j * ((each_angle * 180 / Math.PI) / column1_len) + startAngle * 180 / Math.PI
                    })
                }
            }

            if (column2_len) {
                for (var j = 0; j < column2_len; j++) {
                    var column2_d = d.column2[j];
                    allColumn2.push(column2_d);
                    chartData[i].column2.push({
                        "value": d.column2[j],
                        "width": column2_w,
                        "rotateAngle": j * ((each_angle * 180 / Math.PI) / column2_len) + startAngle * 180 / Math.PI
                    })
                }
            }

            if(column3_len){
                for (var j = 0; j < column3_len; j++) {
                    var column3_d = d.column3[j];
                    allColumn3.push(column3_d);
                    chartData[i].column3.push({
                        "value": d.column3[j],
                        "width": column3_w,
                        "rotateAngle": j * ((each_angle * 180 / Math.PI) / column3_len) + startAngle * 180 / Math.PI
                    })
                }
            }

            if (point_len) {
                for (var j = 0; j < point_len; j++) {
                    var point_d = d.pointData[j].name;
                    allGeneName.push(point_d);
                    chartData[i].pointData.push({
                        "name": d.pointData[j].name,
                        "pos": d.pointData[j].pos,
                        "angle": startAngle * 180 / Math.PI + posScale(d.pointData[j].pos)
                    })
                }
            }

        }

        //gene name
        var showTextLength = 10;
        var max_geneName_len = d3.max(allGeneName, function(d) {
                return d.length;
            })
            // var inner_padding = max_geneName_len * 6;
        var inner_padding = showTextLength * 6;
        if (!isShowGene) {
            inner_padding = 40;
        }
        var innerRadius4 = innerRadius3 - inner_padding - inner_margin;
        var innerRadius5 = 10;
        var circle_r = 2;
        var gene_text_y = -(innerRadius4 + circle_r);

        if (lineData.length) {
            for (var i = 0; i < lineData.length; i++) {
                var upChr = lineData[i]['startName'];
                var dwChr = lineData[i]['endName'];
                chartData.forEach(function(val, index) {
                        //角度比例尺
                        var line_posScale = d3.scaleLinear().range([0, (val.endAngle - val.startAngle) * 180 / Math.PI]).domain([0, val.maxPos]);
                        // 点的角度转换成坐标值
                        var startUp = degTOxy(line_posScale(lineData[i]["startPos"]) + (val.startAngle * 180 / Math.PI), innerRadius4);
                        var startDw = degTOxy(line_posScale(lineData[i]["endPos"]) + (val.startAngle * 180 / Math.PI), innerRadius4);
                        //line start
                        if (val.name == upChr) {
                            lineData[i]['startAngel'] = line_posScale(lineData[i]["startPos"]) + (val.startAngle * 180 / Math.PI);
                            lineData[i]['up_x'] = startUp.x;
                            lineData[i]['up_y'] = startUp.y;
                        }
                        //line end
                        if (val.name == dwChr) {
                            lineData[i]['endAngel'] = line_posScale(lineData[i]["endPos"]) + (val.startAngle * 180 / Math.PI);
                            lineData[i]['dw_x'] = startDw.x;
                            lineData[i]['dw_y'] = startDw.y;
                        }
                    })
                    // line middle
                var middleAngel = lineData[i].startAngel + (lineData[i].endAngel - lineData[i].startAngel) / 2;
                var middleObj = degTOxy(middleAngel, innerRadius5);
                lineData[i]['x'] = middleObj.x;
                lineData[i]['y'] = middleObj.y;
            }
        }

        // 点的角度转换成坐标值
        function degTOxy(start, r) {
            var x, y;
            //1象限
            if (start > 0 && start <= 90) {
                x = Math.cos((90 - start) * Math.PI / 180) * r
                y = -Math.sin((90 - start) * Math.PI / 180) * r
            }
            // 2象限
            if (start > 270 && start <= 360) {
                y = -Math.cos((360 - start) * Math.PI / 180) * r
                x = -Math.sin((360 - start) * Math.PI / 180) * r
            }
            // 3象限
            if (start > 180 && start <= 270) {
                y = Math.cos((start - 180) * Math.PI / 180) * r
                x = -Math.sin((start - 180) * Math.PI / 180) * r
            }
            // 4象限
            if (start > 90 && start <= 180) {
                y = Math.cos((180 - start) * Math.PI / 180) * r
                x = Math.sin((180 - start) * Math.PI / 180) * r
            }

            return {
                x: x,
                y: y
            }
        }

        //outer ring scale
        var max_chrLength = d3.max(outerRing, function(d) {
            return d.length;
        })
        var powLen = max_chrLength.toString().length - 1;
        var tick_step = Math.pow(10, powLen);

        //scale of first column
        var max_column1_val = d3.max(allColumn1, function(d) {
            return d;
        })
        var yScale_column1 = d3.scaleLinear().range([0, column_h]).domain([0, max_column1_val]).clamp(true);

        //scale of second column
        var max_column2_val = d3.max(allColumn2, function(d) {
            return d;
        })
        var yScale_column2 = d3.scaleLinear().range([0, column_h]).domain([0, max_column2_val]).clamp(true);

        //scale of three column
        var max_column3_val = d3.max(allColumn3, function(d) {
            return d;
        })
        var min_column3_val = d3.min(allColumn3, function(d) {
            return d;
        })
        var colors_column3 = ["#CA7499", "#b21052"];
        var colorScale_column3 = d3.scaleLinear().range(colors_column3).domain([min_column3_val, max_column3_val]);

        drawOuterRing();

        //画外环
        function drawOuterRing() {
            //外弦
            var arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

            //定义外弦容器
            var outRing_g = body_g.append("g")
                .attr("class", "outerRing");

            //画外弦
            var group = outRing_g.selectAll("g")
                .data(chartData)
                .enter()
                .append("g");
            //path
            group.append("path")
                .style("fill", function(d) {
                    return colorScale(d.name);
                })
                .style("stroke", function(d) {
                    return d3.rgb(colorScale(d.name)).darker();
                })
                .attr("d", arc)
                .on("mouseover", function(d) {
                    if ("tooltip" in that && that.tooltip) {
                        var html = that.tooltip(d);
                    }
                    tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : `name：${d.name}<br>length：${d.value}`);
                })
                .on("mousemove", function() {
                    tooltip.update(d3.event.pageX, d3.event.pageY);
                })
                .on("mouseout", function() {
                    tooltip.hide();
                });

            //text
            var text_y = -(outerRadius + tick_margin);
            group.append("text")
                .style("font-size", "12px")
                .style("font-weight", 600)
                .attr("dominant-baseline", "middle")
                .attr("y", text_y)
                .attr("transform", function(d) {
                    var textAngle = d.angle * 180 / Math.PI;
                    var eachTextLen = d.name.length * 7;
                    if (textAngle >= 0 && textAngle <= 180) {
                        d3.select(this).attr("text-anchor", "left");
                        return "rotate(" + textAngle + ") rotate(-90,0 " + text_y + ")";
                    } else {
                        d3.select(this).attr("text-anchor", "middle");
                        return "rotate(" + textAngle + ") rotate(90,0 " + text_y + ") translate(" + (-eachTextLen / 2) + ", 0)";
                    }
                })
                .style("color", "#000000")
                .text(function(d) {
                    return d.name;
                });
            //tick
            var formatValue = d3.formatPrefix(",.0", tick_step); // 外环刻度值显示形式
            var groupTick = group.selectAll(".group-tick")
                .data(function(d) {
                    return groupTicks(d, tick_step);
                })
                .enter().append("g")
                .attr("class", "group-tick")
                .attr("transform", function(d) {
                    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ") translate(" + outerRadius + ",0)";
                });
            //tick line
            groupTick.append("line")
                .attr("x2", 6)
                .attr("stroke", "#000000");
            //tick text
            groupTick.filter(function(d) {
                    return d.value % tick_step === 0;
                })
                .append("text")
                .style("font-size", "10px")
                .attr("x", 8)
                .attr("dy", ".35em")
                .attr("transform", function(d) {
                    return d.angle > Math.PI ? "rotate(180) translate(-16)" : null;
                })
                .style("text-anchor", function(d) {
                    return d.angle > Math.PI ? "end" : null;
                })
                .text(function(d) {
                    return formatValue(d.value);
                });
        }

        //第一环柱状图
        if (outerRing[0].column1 && outerRing[0].column1.length) {
            drawColumn(column1_g, "column1", innerRadius1, yScale_column1, "#10afff");
        }

        //第二环柱状图
        if (outerRing[0].column2 && outerRing[0].column2.length) {
            drawColumn(column2_g, "column2", innerRadius2, yScale_column2, "#ffd226");
        }

        //第三环柱状图
        if (outerRing[0].column3 && outerRing[0].column3.length) {
            drawColumn2();
        }

        //画第一、二环柱状图
        function drawColumn(container_g, type, radius, yScale_column, color) {
            var rects_g = container_g.selectAll("rects_g")
                .data(chartData)
                .enter()
                .append("g");

            if (type == "column1") {
                rects_g.selectAll("rects")
                    .data(function(data) {
                        return data.column1;
                    })
                    .enter()
                    .append("rect")
                    .attr("width", function(d) {
                        return d.width;
                    })
                    .attr("y", function(d) {
                        return -(radius + yScale_column(d.value));
                    })
                    .attr("transform", function(d, i) {
                        return "rotate(" + d.rotateAngle + ")";
                    })
                    .attr("fill", color)
                    .on("mouseover", function(d) {
                        var html = `value：${d.value}`;
                        tooltip.show(d3.event.pageX, d3.event.pageY, html);
                    })
                    .on("mousemove", function() {
                        tooltip.update(d3.event.pageX, d3.event.pageY);
                    })
                    .on("mouseout", function() {
                        tooltip.hide();
                    })
                    .transition()
                    .delay(function (d, i) {
                        return i * 10;
                    })
                    .duration(300)
                    .attr("height", function(d) {
                        return yScale_column(d.value);
                    });
            } else if (type == "column2") {
                rects_g.selectAll("rects")
                    .data(function(data) {
                        return data.column2;
                    })
                    .enter()
                    .append("rect")
                    .attr("width", function(d) {
                        return d.width;
                    })
                    .attr("y", function(d) {
                        return -(radius + yScale_column(d.value));
                    })
                    .attr("transform", function(d, i) {
                        return "rotate(" + d.rotateAngle + ")";
                    })
                    .attr("fill", color)
                    .on("mouseover", function(d) {
                        var html = `value：${d.value}`;
                        tooltip.show(d3.event.pageX, d3.event.pageY, html);
                    })
                    .on("mousemove", function() {
                        tooltip.update(d3.event.pageX, d3.event.pageY);
                    })
                    .on("mouseout", function() {
                        tooltip.hide();
                    })
                    .transition()
                    .delay(function (d, i) {
                        return i * 10;
                    })
                    .duration(300)
                    .attr("height", function(d) {
                        return yScale_column(d.value);
                    });
            }
        }

        //画第三环柱状图
        function drawColumn2() {
            var threeRect_g = column3_g.selectAll("threeRect_g")
                .data(chartData)
                .enter()
                .append("g");

            threeRect_g.selectAll("threeRects")
                .data(function(data) {
                    return data.column3;
                })
                .enter()
                .append("rect")
                .attr("width", function(d) {
                    return d.width;
                })
                .attr("y", -(innerRadius3 + outer_padding))
                .attr("transform", function(d, i) {
                    return "rotate(" + d.rotateAngle + ")";
                })
                .attr("fill", function(d) {
                    return colorScale_column3(d.value);
                })
                .on("mouseover", function(d) {
                    var html = `value：${d.value}`;
                    tooltip.show(d3.event.pageX, d3.event.pageY, html);
                })
                .on("mousemove", function() {
                    tooltip.update(d3.event.pageX, d3.event.pageY);
                })
                .on("mouseout", function() {
                    tooltip.hide();
                })
                .transition()
                .delay(function (d, i) {
                    return i * 10;
                })
                .duration(300)  
                .attr("height", outer_padding);
        }

        if (lineData.length) {
            //gene name
            drawGene();
            //line
            drawLine();
        }

        // legend
        var legendStartX=this.layout.padding+this.layout.area.w+this.styleConfig.legendMargin;
        var legendStartY=this.layout.padding+this.layout.title;
        if (!!this.legend && this.legend.show) {
            this._computedLegendLayout(this.svg, legendData);
            drawLegend.call(this, colorScale, this.colors, legendStartX, legendStartY);
            svgW=svgW+this.styleConfig.legendMargin+this.layout.legend.totalWidth;
        }

        this.svg.attr('width',svgW).attr('height',svgH);

        //画gene name
        function drawGene() {
            //gene容器
            var circle_g = body_g.append("g")
                .attr("class", "circle_g");

            var gene_g = circle_g
                .selectAll(".allGene")
                .data(chartData)
                .enter()
                .append("g")

            var point_g = gene_g.selectAll("g")
                .data(function(d) {
                    return d.pointData;
                })
                .enter()
                .append("g");
            //circle
            point_g.append("circle")
                .attr("transform", function(d) {
                    return "rotate(" + d.angle + ")";
                })
                .attr("r", circle_r)
                .attr("cy", -innerRadius4)
                .attr("fill", "#d62728")
                .on("mouseover", function(d) {
                    var html = `name：${d.name}<br>pos：${d.pos}`;
                    tooltip.show(d3.event.pageX, d3.event.pageY, html);
                })
                .on("mousemove", function() {
                    tooltip.update(d3.event.pageX, d3.event.pageY);
                })
                .on("mouseout", function() {
                    tooltip.hide();
                });
            //text
            if (isShowGene) {
                point_g.append("text")
                    .style("font-family", "Consolas, Monaco, monospace")
                    .style("font-size", "10px")
                    .attr("y", gene_text_y)
                    .attr("transform", function(d) {
                        return "rotate(" + d.angle + ") rotate(-90,0 " + gene_text_y + ")";
                    })
                    .text(function(d) {
                        if (d.name.length <= showTextLength) {
                            return d.name;
                        } else {
                            return d.name.substring(0, showTextLength) + "...";
                        }
                    });

            }

        }

        //画line
        function drawLine() {
            //line
            var line_g = body_g.append("g")
                .attr("class", "line_g");

            var path_g = line_g.selectAll(".allLine")
                .data(lineData)
                .enter()
                .append('g');

            path_g.append("path")
                .attr("d", function(d) {
                    return "M" + d.up_x + " " + d.up_y + "Q" + d.x + " " + d.y + " " + d.dw_x + " " + d.dw_y;
                })
                .attr('fill', 'transparent')
                .attr('stroke', function(d) {
                    if (d.startName === d.endName) {
                        return "green";
                    } else {
                        return "red";
                    }
                })
                .attr("stroke-width", function(d) {
                    !!that.chart.style && that.chart.style['stroke-width'] ? that.chart.style['stroke-width'] : 1;
                })
                .on("mouseover", function(d) {
                    var html = `start name：${d.startName}<br>start pos：${d.startPos}<br>end name：${d.endName}<br>end pos：${d.endPos}`;
                    tooltip.show(d3.event.pageX, d3.event.pageY, html);
                })
                .on("mousemove", function() {
                    tooltip.update(d3.event.pageX, d3.event.pageY);
                })
                .on("mouseout", function() {
                    tooltip.hide();
                });
               
        }

        //返回一个数组：[{value: 0, angle: 5.633991554422396},{value: 1000, angle: 5.694823407494192}]
        function groupTicks(d, step) {
            var k = (d.endAngle - d.startAngle) / d.value;
            return d3.range(0, d.value, step).map(function(val) { //d3.range(0, d.value, step)：[0,1000,2000,3000,……]
                return {
                    value: val,
                    angle: val * k + d.startAngle
                };
            });
        }


    }

    updateTitle() {
        if ('title' in this.chart) drawChartTitle.call(this, (this.layout.padding+this.layout.area.w)/2);
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

export default Circos;