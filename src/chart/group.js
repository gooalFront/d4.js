/**
 * @time 2018/8/27
 * @author xiaofang<1692977129@qq.com>
 * @description 组合图
 */

import Base from './base';
import * as d3 from 'd3';
import tooltip from './tools/tooltip';
import {
    drawChartTitle
} from './tools/title';
import {
    drawGroupXAxis,
    drawGroupYAxis,
} from './tools/axis';
import {
    drawGroupXTitle,
    drawGroupYTitle
} from './tools/axisTitle';
import {
    drawGroupLegend
} from './tools/legend';

class Group extends Base {
    constructor(options, rootConfig,styleConfig) {
        super(options, rootConfig,styleConfig);
        this.drawgroup();
    }

    drawgroup() {
        d3.selectAll(this.chart.el + " svg").remove();
        var that = this;
        var data = this.chart.data,
            len = data.length;

        // other data
        var otherData=[];
        if(this.chart.otherData && this.chart.otherData.length){
            otherData=this.chart.otherData;
        }

        var legendData=[];
        var otherlegendData=[];
        
        //legend data
        if(!!this.legend && "data" in this.legend && this.legend.data.length){
            legendData=Array.from(new Set(this.legend.data));
        }else{
            data.forEach(d => {
                if(d['category']){
                    legendData.push(d['category']);
                    legendData=Array.from(new Set(legendData));
                }
            });
        }

        //other legend data
        if(!!this.otherLegend && "data" in this.otherLegend && this.otherLegend.data.length){
            otherlegendData=Array.from(new Set(this.otherLegend.data));
        }else{
            otherData.forEach(d => {
                if(d['category']){
                    otherlegendData.push(d['category']);
                    otherlegendData=Array.from(new Set(otherlegendData));
                }
            });
        }

        // svg
        this.svg = d3.select(this.chart.el).append("svg")
            .attr('class', 'd4-chart-content')
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('version', '1.1')
            .on("click", function() {
                that.resetChartSelect();
            });

        var barDirection= "vertical";  //柱状图方向：vertical（默认） 、 horizontal
        var padding= 0.3;
        if('padding' in this.chart){
            if(this.chart.padding<1){
                padding=this.chart.padding;
            }
        }

        //颜色比例尺  离散（默认）
        var colorScale = d3.scaleOrdinal().range(this.colors.map(function(d) { return d })).domain(legendData.map(function(d) { return d }));
        var otherColorScale = d3.scaleOrdinal().range(this.otherColors.map(function(d) { return d })).domain(otherlegendData.map(function(d) { return d }));

        //colors （用于渐变）
        var colorsLen = ("colors" in this.chart && this.chart.colors.length) ? this.chart.colors.length : 3;
        var colors = this.colors.slice(0, colorsLen);
        var colorDomainArr = [];

        //other colors （用于渐变）
        var othercolorsLen = ("otherColors" in this.chart && this.chart.otherColors.length) ? this.chart.otherColors.length : 3;
        var otherColors = this.otherColors.slice(0, othercolorsLen);
        var otherColorDomains = [];

        // x y scale
        var xScale,yScale;
        var xScaleBand,yScaleBand;
        var xLiner,yLiner;

        //x
        if (typeof data[0].x === "number") {
            if(!!this.axis.x && !!this.axis.x.type && this.axis.x.type=='discrete'){
                xLiner=false;

                xScale = d3.scalePoint().padding(padding).domain(data.map(function(d) {
                    return d.x;
                }));

                xScaleBand = d3.scaleBand().paddingInner(padding).domain(data.map(function(d) {
                    return d.x;
                }));
            }else{
                xLiner=true;
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
                xScale = d3.scaleLinear().domain([x_min, x_max]);
                var ticks = xScale.ticks();
                if(!!this.axis.x) this.axis.x.data = ticks;
            }
        }else{
            xLiner=false;

            xScale = d3.scalePoint().padding(padding).domain(data.map(function(d) {
                return d.x;
            }));

            xScaleBand = d3.scaleBand().paddingInner(padding).domain(data.map(function(d) {
                return d.x;
            }));
        }

        //y
        if (typeof data[0].y === "number") {
            if(!!this.axis.y && !!this.axis.y.type && this.axis.y.type=='discrete'){
                yLiner=false;
                yScale = d3.scalePoint().padding(padding).domain(data.map(function(d) {
                    return d.y;
                }));

                yScaleBand = d3.scaleBand().paddingInner(padding).domain(data.map(function(d) {
                    return d.y;
                }));
            }else{
                yLiner=true;
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
                var ticks = yScale.ticks();
                if(!!this.axis.y) this.axis.y.data = ticks;
            }
        } else {
            yLiner=false;
            yScale = d3.scalePoint().padding(padding).domain(data.map(function(d) {
                return d.y;
            }));

            yScaleBand = d3.scaleBand().paddingInner(padding).domain(data.map(function(d) {
                return d.y;
            }));
        }

       
        // x1 y1 scale
        var x1Scale,y1Scale;
        var x1ScaleBand,y1ScaleBand;
        var x1Liner,y1Liner;

        //x1
        if (typeof otherData[0].x === "number") {
            if(!!this.axis.x1 && !!this.axis.x1.type && this.axis.x1.type=='discrete'){
                x1Liner=false;

                x1Scale = d3.scalePoint().padding(padding).domain(otherData.map(function(d) {
                    return d.x;
                }));

                x1ScaleBand = d3.scaleBand().paddingInner(padding).domain(otherData.map(function(d) {
                    return d.x;
                }));
            }else{
                x1Liner=true;
                var x1_min = 0,
                x1_max = 0;

                if (this.axis.x1 && "min" in this.axis.x1) {
                    x1_min = this.axis.x1.min;
                } else {
                    x1_min = d3.min(otherData, function(d) {
                        return d.x;
                    })
                }
        
                if (this.axis.x1 && "max" in this.axis.x1) {
                    x1_max = this.axis.x1.max;
                } else {
                    x1_max = d3.max(otherData, function(d) {
                        return d.x;
                    })
                }
                x1Scale = d3.scaleLinear().domain([x1_min, x1_max]);
                var ticks = x1Scale.ticks();
                if(!!this.axis.x1) this.axis.x1.data = ticks;
            }
        }else{
            x1Liner=false;

            x1Scale = d3.scalePoint().padding(padding).domain(otherData.map(function(d) {
                return d.x;
            }));

            x1ScaleBand = d3.scaleBand().paddingInner(padding).domain(otherData.map(function(d) {
                return d.x;
            }));
        }

        //y1
        if (typeof otherData[0].y === "number") {
            if(!!this.axis.y1 && !!this.axis.y1.type && this.axis.y1.type=='discrete'){
                y1Liner=false;
                y1Scale = d3.scalePoint().padding(padding).domain(otherData.map(function(d) {
                    return d.y;
                }));

                y1ScaleBand = d3.scaleBand().paddingInner(padding).domain(otherData.map(function(d) {
                    return d.y;
                }));
            }else{
                y1Liner=true;
                var y1_min = 0,
                    y1_max = 0;
    
                if (this.axis.y1 && "min" in this.axis.y1) {
                    y1_min = this.axis.y1.min;
                } else {
                    y1_min = d3.min(otherData, function(d) {
                        return d.y;
                    })
                }
    
                if (this.axis.y1 && "max" in this.axis.y1) {
                    y1_max = this.axis.y1.max;
                } else {
                    y1_max = d3.max(otherData, function(d) {
                        return d.y;
                    })
                }
                y1Scale = d3.scaleLinear().domain([y1_min, y1_max]);
                var ticks = y1Scale.ticks();
                if(!!this.axis.y1) this.axis.y1.data = ticks;
            }
        } else {
            y1Liner=false;
            y1Scale = d3.scalePoint().padding(padding).domain(otherData.map(function(d) {
                return d.y;
            }));

            y1ScaleBand = d3.scaleBand().paddingInner(padding).domain(otherData.map(function(d) {
                return d.y;
            }));
        }


        //gradient legend
        if(!!this.legend && !!this.legend.type && this.legend.type==='gradient'){
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
    
            for (var i = 0; i < colorsLen; i++) {
                var obj = valuemin + i * ((valuemax - valuemin) / (colorsLen - 1));
                colorDomainArr.push(obj);
            }
    
            //颜色比例尺  渐变
            colorScale = d3.scaleLinear().domain(colorDomainArr).range(colors).interpolate(d3.interpolateRgb).clamp(true).nice();
        }

        //other gradient legend
        if(!!this.otherLegend && !!this.otherLegend.type && this.otherLegend.type==='gradient'){
            var ovaluemin, ovaluemax;
            if (!!this.otherLegend && "min" in this.otherLegend) {
                ovaluemin = this.otherLegend.min;
            } else {
                ovaluemin = d3.min(otherlegendData, function(d) {
                    return d;
                });
            }
    
            if (!!this.otherLegend && "max" in this.otherLegend) {
                ovaluemax = this.otherLegend.max;
            } else {
                ovaluemax = d3.max(otherlegendData, function(d) {
                    return d;
                });
            }
    
            for (var i = 0; i < othercolorsLen; i++) {
                var obj = ovaluemin + i * ((ovaluemax - ovaluemin) / (othercolorsLen - 1));
                otherColorDomains.push(obj);
            }
    
            //颜色比例尺  渐变
            otherColorScale = d3.scaleLinear().domain(otherColorDomains).range(otherColors).interpolate(d3.interpolateRgb).clamp(true).nice();
        }

        //散点半径
        var radius=5;

        if('radius' in this.chart && this.chart.radius){
            radius=this.chart.radius;
        }

        this._computedLayout();

        // 判断是否需要合并图例
        if(!!this.legend && !('type' in this.legend) && !!this.otherLegend && !('type' in this.otherLegend) && 'separation' in this.legend && !this.legend.separation){
            if('show' in this.legend && this.legend.show && 'show' in this.otherLegend && this.otherLegend.show){
                this._computedUnSeparationLegendData(this.svg, [...legendData,...otherlegendData]);
                drawGroupLegend.call(this,'legend', colorScale);
            }
        }else{
            if(!!this.legend && !!this.legend.type && this.legend.type==='gradient'){
                if('show' in this.legend && this.legend.show) this._computedGradietLegendLayout(this.svg, colorScale.ticks());
            }else{
                if('show' in this.legend && this.legend.show) this._computedLegendLayout(this.svg, legendData);
            }
    
            if(!!this.otherLegend && !!this.otherLegend.type && this.otherLegend.type==='gradient'){
                if('show' in this.otherLegend && this.otherLegend.show) this._computedGradietLegendLayout(this.svg, otherColorScale.ticks(),'otherLegend');
            }else{
                if('show' in this.otherLegend && this.otherLegend.show) this._computedLegendLayout(this.svg, otherlegendData,"otherLegend");
            }
    
            //主图图例
            if (!!this.legend && this.legend.show) {
                
                if(!!this.legend.type && this.legend.type==='gradient'){
                    drawGroupLegend.call(this,'legend', colorScale, colors);
                }else{
                    drawGroupLegend.call(this,'legend', colorScale);
                }
               
            }
    
            // 副图图例
            if (!!this.otherLegend && this.otherLegend.show) {
                
                if(!!this.otherLegend.type && this.otherLegend.type==='gradient'){
                    drawGroupLegend.call(this,'otherLegend', otherColorScale, otherColors);
                }else{
                    drawGroupLegend.call(this,'otherLegend', otherColorScale);
                }
               
            }
        }



         // x y scale range
        if(xLiner){
            xScale.range([0, this.layout.area.w]).clamp(true);
        }else{
            xScale.range([0, this.layout.area.w]);
            xScaleBand.range([0, this.layout.area.w]);
        }

        if(yLiner){
            yScale.range([this.layout.area.h, 0]).clamp(true);
        }else{
            yScale.range([this.layout.area.h,0]);
            yScaleBand.range([this.layout.area.h,0]);
        }

        // x1 y1 scale range
        if(x1Liner){
            x1Scale.range([0, this.layout.area.w]).clamp(true);
        }else{
            x1Scale.range([0, this.layout.area.w]);
            x1ScaleBand.range([0, this.layout.area.w]);
        }

        if(y1Liner){
            y1Scale.range([this.layout.area.h, 0]).clamp(true);
        }else{
            y1Scale.range([this.layout.area.h,0]);
            y1ScaleBand.range([this.layout.area.h,0]);
        }

        //title and axis
        if ('title' in this.chart) drawChartTitle.call(this);

        if ('x' in this.axis){
            if(this.chart.types.includes('bar') && this.chart.types[0]==='bar' && !xLiner){
                drawGroupXAxis.call(this, 'x', xScaleBand);
            }else{
                drawGroupXAxis.call(this,'x', xScale);
            }
        }
            
        if ('y' in this.axis){
            if(this.chart.types.includes('bar') && this.chart.types[0]==='bar' && !yLiner){
                drawGroupYAxis.call(this,'y', yScaleBand);
            }else{
                drawGroupYAxis.call(this,'y', yScale);
            }
        }

        if ('x1' in this.axis) drawGroupXAxis.call(this,'x1', x1Scale);
        if ('y1' in this.axis) drawGroupYAxis.call(this,'y1', y1Scale);
       
        if ('x' in this.axis && 'title' in this.axis.x) drawGroupXTitle.call(this,'x');
        if ('y' in this.axis && 'title' in this.axis.y) drawGroupYTitle.call(this,'y');
        if ('x1' in this.axis && 'title' in this.axis.x1) drawGroupXTitle.call(this,'x1');
        if ('y1' in this.axis && 'title' in this.axis.y1) drawGroupYTitle.call(this,'y1');

        var body_g = this.svg.append("g").attr("class", "chart-content")
            .attr("transform", "translate(" + (this.layout.y + this.layout.yLabel + this.layout.padding) + "," + (this.layout.padding + this.layout.title + this.layout.x1+this.layout.x1Label) + ")");
        
        //柱状图
        if(this.chart.types.includes('bar')){
            if(this.chart.types[0]==='bar'){
                if(xLiner && !yLiner){
                    barDirection='horizontal';
                }
        
                if((xLiner && yLiner) || (!xLiner && !yLiner)){
                    if(this.chart.direction){
                        barDirection=this.chart.direction;
                    }
                }

                bar(data);
            }
        }

        //散点图
        if(this.chart.types.includes('scatter')){
            if(this.chart.types[0]!=='scatter' && otherData.length){
                scatter(otherData,'less'); //'less'：副图
            }else{
                scatter(data);
            }
        }

        //折线图
        if(this.chart.types.includes('line')){
            if(this.chart.types[0]!=='line' && otherData.length){
                line(otherData,'less'); //'less'：副图
            }else{
                line(data);
            }
        }
       
        this.svg.attr("width", this.layout.w).attr("height", this.layout.h);

        function scatter(data,type){
            var circle_g = body_g.append('g').attr("class",'chart-circle');
            circle_g.selectAll("groupCircle")
                .data(data)
                .enter()
                .append("circle")
                .attr("r", 0)
                .attr("cx", d =>(type && type==='less') ? x1Scale(d.x) : xScale(d.x))
                .attr("cy", d =>(type && type==='less') ? y1Scale(d.y) : yScale(d.y))
                .attr("fill", d =>(type && type==='less') ? otherColorScale(d.category) : colorScale(d.category))
                .on("mouseover", function(d) {
                    d3.select(this).transition().attr("r", radius + 2);
                    if ("tooltip" in that && that.tooltip) {
                        var html = (type && type==='less') ? that.tooltip[1](d) : that.tooltip[0](d);
                    }
                    tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : `x：${d.x}<br>y：${d.y}`);
                })
                .on("mousemove", function() {
                    tooltip.update(d3.event.pageX, d3.event.pageY);
                })
                .on("mouseout", function(d) {
                    d3.select(this).transition().attr("r", radius);
                    tooltip.hide();
                })
                .on('click', function(d) {
                    if((type && type==='less')){
                        if(that.chart.otherSelect){
                            if (that.selectedModule) {
                                that._applyChartSelect(d, d3.select(this), otherColorScale(d.category));
                                d3.event.stopPropagation();
                            } else {
                                return false;
                            }
                        }
                    }else{
                        if (that.selectedModule) {
                            that._applyChartSelect(d, d3.select(this), colorScale(d.category));
                            d3.event.stopPropagation();
                        } else {
                            return false;
                        }
                    }
                })
                .transition()
                .duration(800)
                .attr("r", radius);
        }

        function line(data,type){
            var line = d3.line()
                .x(d=>(type && type==='less') ? x1Scale(d.x) : xScale(d.x))
                .y(d=>(type && type==='less') ? y1Scale(d.y) : yScale(d.y));

            var interpolate=that.chart.interpolate || 'cardinal';
            line.curve(that._computedInterpolate(interpolate));

            var line_g = body_g.append("g").attr("class", "line");
            //path
            line_g.append('path')
                .datum(data)
                .attr("class", "linePath")
                .attr('fill', 'none')
                .attr('stroke', d =>(type && type==='less') ? that.chart.otherColors[0] : that.chart.colors[0])
                .attr("stroke-width", function() {
                    return ("stroke-width" in that.chart && that.chart['stroke-width']) ? that.chart['stroke-width'] : 1;
                });

            line_g.append('path')
                .attr("class", "linePath")

            line_g.select("path.linePath")
                .datum(data)
                .attr("d", line)
                .transition()
                .duration(800)
                .attrTween("stroke-dasharray", that._tweenDash);

            //point
            var point_r = ("stroke-width" in that.chart && that.chart['stroke-width']) ? that.chart['stroke-width'] + 1 : 2;
            if ('isPoint' in that.chart && that.chart.isPoint) {
                line_g.selectAll("point")
                    .data(data).enter()
                    .append("circle")
                    .attr("r", 0)
                    .attr("cx", function(d) {
                        return (type && type==='less') ? x1Scale(d.x) : xScale(d.x);
                    })
                    .attr("cy", function(d) {
                        return (type && type==='less') ? y1Scale(d.y) : yScale(d.y);
                    })
                    .attr("fill", function(d) {
                        return (type && type==='less') ? otherColorScale(d.category) : colorScale(d.category);
                    })
                    .on("mouseover", function(d) {
                        d3.select(this).transition().attr('r', point_r + 2);
                        if ("tooltip" in that && that.tooltip) {
                            var html = (type && type==='less') ? that.tooltip[1](d) : that.tooltip[0](d);
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
                    .on('click', function(d) {
                        if((type && type==='less')){
                            if(that.chart.otherSelect){
                                if (that.selectedModule) {
                                    that._applyChartSelect(d, d3.select(this), otherColorScale(d.category));
                                    d3.event.stopPropagation();
                                } else {
                                    return false;
                                }
                            }
                        }else{
                            if (that.selectedModule) {
                                that._applyChartSelect(d, d3.select(this), colorScale(d.category));
                                d3.event.stopPropagation();
                            } else {
                                return false;
                            }
                        }
                    })
                    .transition()
                    .duration(800)
                    .attr("r", point_r)

            }
        
        }

        function bar(data){
            var rectW=20,rectH=20;
            var bar_g = body_g.append('g').attr("class",'chart-bar');
            var rects =bar_g.selectAll("groupBar")
                .data(data)
                .enter()
                .append("rect")
                .attr("fill", d => colorScale(d.category))
                .on("mouseover", function(d) {
                    d3.select(this).transition().attr("opacity", 0.6);
                    if ("tooltip" in that && that.tooltip) {
                        var html = that.tooltip[0](d);
                    }
                    tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : `x：${d.x}<br>y：${d.y}`);
                })
                .on("mousemove", function() {
                    tooltip.update(d3.event.pageX, d3.event.pageY);
                })
                .on("mouseout", function(d) {
                    d3.select(this).transition().attr("opacity", 1);
                    tooltip.hide();
                })
                .on('click', function(d) {
                    if (that.selectedModule) {
                        that._applyChartSelect(d, d3.select(this), colorScale(d.category));
                        d3.event.stopPropagation();
                    } else {
                        return false;
                    }
                })
            
                if(barDirection==='horizontal'){
                    rects
                        .attr("y", d =>yLiner ? (yScale(d.y)-rectH/2) : yScaleBand(d.y))
                        .attr('height', function () {
                            return yLiner ? rectH : yScaleBand.bandwidth();
                        }).transition().delay(function (d, i) {
                            return i * 20;
                        })
                        .duration(300)
                        .attr('width', function (d) {
                            return xLiner ? xScale(d.x) : xScaleBand(d.x);
                        })
                }
    
                if(barDirection==='vertical'){
                    rects
                        .attr("x", d => xLiner ? (xScale(d.x)-rectW/2) : xScaleBand(d.x))
                        .attr('y', yLiner ? yScale(y_min) : yScaleBand(data[0].y))
                        .attr('width', function () {
                            var barWidth= xLiner ? rectW : xScaleBand.bandwidth();
                            return barWidth;
                        }).transition().delay(function (d, i) {
                            return i * 20;
                        })
                        .duration(300)
                        .attr('y',d=>yLiner ? yScale(d.y) : yScaleBand(d.y))
                        .attr('height', function (d) {
                            var barHeight=yLiner ? (yScale(y_min)-yScale(d.y)) : (yScaleBand(data[0].y)-yScaleBand(d.y));
                            return barHeight;
                        })
                }
            
        }

    }

     //line path animate
     _tweenDash() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function(t) { return i(t); };
    }

    updateTitle() {
        if ('title' in this.chart) drawChartTitle.call(this);
        if ('x' in this.axis && 'title' in this.axis.x) drawGroupXTitle.call(this,'x');
        if ('y' in this.axis && 'title' in this.axis.y) drawGroupYTitle.call(this,'y');
        if ('x1' in this.axis && 'title' in this.axis.x1) drawGroupXTitle.call(this,'x1');
        if ('y1' in this.axis && 'title' in this.axis.y1) drawGroupYTitle.call(this,'y1');
    }

    // redraw
    redraw(flag) {
        if (!!flag) {
            this._init(this._deepCopyObj(this.default), this.rootConfig);
        }
        this.drawgroup();
        return this;
    }
}

export default Group;