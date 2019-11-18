/**
 * @time 2018年8月6日09:52:58
 * @author joke<277637411@qq.com>
 * @description 画图例
 */
import * as d3 from 'd3';
import global from '../../config';

export const drawLegend = function(colorScale, colors, x, y, ceo = 1) {
    var _self = this;
    var legend_g = null;
    // TODO position  this.legend.position || 'right'
    if ("type" in _self.legend && _self.legend.type == "gradient") { //渐变式图例
        var legendStartX = _self.layout.padding + _self.layout.y + _self.layout.yLabel + _self.layout.area.w + _self.styleConfig.legendMargin;
        var legendStartY = _self.layout.padding + _self.layout.title + (_self.layout.area.h - _self.styleConfig.gradientLegend.h) / 2;
        legend_g = _self.svg.append('g').attr('class', 'gradient-legend')
            .attr('transform', "translate(" + (x || legendStartX) + "," + (y || legendStartY) + ")");

        //线性填充
        var linearGradient = legend_g.append("defs")
            .append("linearGradient")
            .attr("id", "gradientLinear_Color")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");

        var colorsLen = colors.length;

        for (var i = 0; i < colorsLen; i++) {
            linearGradient.append("stop")
                .attr("offset", i * (100 / (colorsLen - 1)) + "%")
                .style("stop-color", colors[i]);
        }

        //画图例矩形
        var legend_w = _self.styleConfig.gradientLegend.w,
            legend_h = _self.styleConfig.gradientLegend.h;

        var legendData=[];
        if(!!_self.legend && "data" in _self.legend && _self.legend.data.length){
            legendData=Array.from(new Set(_self.legend.data));
        }else{
            _self.chart.data.forEach(d => {
                if(d['category']){
                    legendData.push(d['category']);
                }
            });
        }

        var valuemin = 0,
            valuemax = 0;

        if ("min" in _self.legend) {
            valuemin = _self.legend.min;
        } else {
            valuemin = d3.min(legendData, d => d);
        }

        if ("max" in _self.legend) {
            valuemax = _self.legend.max;
        } else {
            valuemax = d3.max(legendData, d => d);
        }

        legend_g.append("rect").attr("width", legend_w).attr("height", legend_h)
            .attr("fill", "url(#" + linearGradient.attr("id") + ")");

        //图例交互
        var timer=null;
        var legendClickRect_h = legend_h / colorsLen;
        var legendClick_g = _self.svg.append("g").attr("class", "click-gradient-legend")
            .attr('transform', "translate(" + (x || legendStartX) + "," + (y || legendStartY) + ")")

        legendClick_g
            .on("mouseover", function() {
                _self.legend.mouseover && _self.legend.mouseover.call(_self, d3.event, legendClick_g);
            })
            .on("mouseout", function() {
                _self.legend.mouseout && _self.legend.mouseout.call(_self, d3.event, legendClick_g);
            })

        legendClick_g.selectAll(".legendClick_Rect")
            .data(colors)
            .enter()
            .append("rect")
            .attr("width", legend_w)
            .attr("height", legendClickRect_h)
            .attr("y", function(d, i) {
                return i * legendClickRect_h;
            })
            .attr("fill", "transparent")
            .on('mousedown',function(d,i){
                clearEventBubble(d3.event);
				timer && clearTimeout(timer);
                timer = setTimeout(function(){
                    _self.legend.mousedown && _self.legend.mousedown.call(_self, d, i);
                },300);
            })
            .on('mouseup',function(d,i){
                clearEventBubble(d3.event);
				timer && clearTimeout(timer);
                timer = setTimeout(function(){
                    _self.legend.mouseup && _self.legend.mouseup.call(_self, d, i);
                },300);
            })
            .on("click", function(d, i) {
                clearEventBubble(d3.event);
				timer && clearTimeout(timer);
                timer = setTimeout(function(){
                    _self.legend.click && _self.legend.click.call(_self, d, i);
                },300);
            })
            .on("dblclick", function(d, i) {
                clearEventBubble(d3.event);
                timer && clearTimeout(timer);
                _self.legend.dblclick && _self.legend.dblclick.call(_self, d, i);
            });

        if (_self.legend.dblclick || _self.legend.click || _self.legend.mousedown || _self.legend.mouseup) {
            legendClick_g
                .style("cursor", "pointer").style('user-select', 'none');
        }

        //画图例的轴
        var legendScale = d3.scaleLinear().range([0, legend_h]) //定义图例比例尺
            .domain([valuemin, valuemax]).nice().clamp(true);
        var yAxis = d3.axisRight(legendScale).tickSizeOuter(0).ticks(5); //设置Y轴
        legend_g.append("g").attr("class", "gradient_legendAxis")
            .attr("transform", "translate(" + legend_w + ",0)")
            .call(yAxis);

        d3.selectAll(".gradient_legendAxis .tick text")
			.style("font-size", _self.styleConfig.legendFontSize)
			.style('font-family',_self.styleConfig.fontFamily)

    } else { //small rect 图例
        var timer=null;

        var legendStartx = _self.layout.w - _self.layout.padding - _self.layout.legend.totalWidth;
        var legendStarty = _self.layout.padding + _self.layout.title;
        // ceo控制开始位置
        if (ceo != 1) legendStarty += this.layout.area.h / ceo + this.styleConfig.composeChartLegendGroupMargin * (ceo - 1);

        legend_g = _self.svg.append('g').attr('class', 'legend')
            .attr('transform', "translate(" + (x ||  legendStartx) + "," + (y ||  legendStarty) + ")");

        _self.layout.legend.list.forEach((val, index) => {

			var curStartx = 0;
            if (index) {
                for (var i = 0; i < index; i++) {
                    curStartx += _self.layout.legend.widthArr[i].width;
                }
			}

            var curLegend = legend_g.append('g').attr('class', 'legend-' + (index + 1))
                .attr('transform', "translate(" + curStartx + ",0)")

            var rect = curLegend.selectAll('rect')
                .data(val)
                .enter()
                .append('rect')
                .attr('x', 0)
                .attr('y', (d, i) => {
                    return i * (global.legend.m + global.legend.h);
                })
                .attr('width', global.legend.w)
                .attr('height', global.legend.h)
                .attr('fill', d => colorScale(d))
                .on("mouseover", function() {
                    _self.legend.mouseover && _self.legend.mouseover.call(_self, d3.event, d3.select(this));
                })
                .on("mouseout", function() {
                    _self.legend.mouseout && _self.legend.mouseout.call(_self, d3.event, d3.select(this));
                })
                .on('mousedown',function(d,i){
                    clearEventBubble(d3.event);
					timer && clearTimeout(timer);
					let _this  = this;
                    timer = setTimeout(function(){
                        _self.legend.mousedown && _self.legend.mousedown.call(_self, d3.select(_this).node(), (_self.layout.legend.columnLegendCount * index) + i);
                    },300);
                })
                .on('mouseup',function(d,i){
                    clearEventBubble(d3.event);
					timer && clearTimeout(timer);
					let _this  = this;
                    timer = setTimeout(function(){
                        _self.legend.mouseup && _self.legend.mouseup.call(_self, d3.select(_this).node(), (_self.layout.legend.columnLegendCount * index) + i);
                    },300);
                })
                .on("click", function(d, i) {
                    clearEventBubble(d3.event);
					timer && clearTimeout(timer);
					let _this  = this;
                    timer = setTimeout(function(){
                        _self.legend.click && _self.legend.click.call(_self, d3.select(_this).node(), (_self.layout.legend.columnLegendCount * index) + i);
                    },300);
                })
                .on('dblclick', function(d, i) {
                    clearEventBubble(d3.event);
                    timer && clearTimeout(timer);
                    _self.legend.dblclick && _self.legend.dblclick.call(_self, d3.select(this).node(), (_self.layout.legend.columnLegendCount * index) + i);
                });

            if ('dblclick' in _self.legend || 'click' in _self.legend || 'mousedown' in _self.legend || 'mouseup' in _self.legend) {
                rect.style('cursor', 'pointer').style('user-select', 'none');
            }

            curLegend.selectAll('text')
                .data(val)
                .enter()
                .append('text')
                .attr('x', 0)
                .attr('y', (d, i) => {
                    return i * (global.legend.m + global.legend.h)
                })
				.style('font-size', this.styleConfig.legendFontSize)
				.style('font-family',this.styleConfig.fontFamily)
                .attr('text-anchor', 'start')
                .attr('dominant-baseline', 'middle')
                .attr('dx', global.legend.w + global.legend.m)
                .attr('dy', global.legend.h / 2)
                .text(d => {
                    return ('' + d).length > global.legend.textMaxLength ? (('' + d).substring(0, global.legend.textMaxLength - 1) + '...') : d;
                })
                .append('title')
                .text(d => d)
        })
    }

    // 是否有图例标题
    if ("title" in _self.legend && _self.legend.show) {
        var legendText = legend_g.append("text")
			.style("font-size", _self.styleConfig.legendTitleFontSize + 'px')
			.style("font-family",_self.styleConfig.fontFamily)
            .style("text-anchor", "start")
            .attr("dominant-baseline", 'middle')
            .attr("dy", -(_self.styleConfig.legend.p))
            .text(_self.legend.title);
    }

}


// other legend
export const drawGroupLegend = function(type,colorScale, colors, x, y, ceo = 1) { //type:"legend" or "otherLegend"
    var _self = this;
    var legend_g = null;

    //x偏移
    var legendStartX = _self.layout.padding + _self.layout.y + _self.layout.yLabel + _self.layout.y1 + _self.layout.y1Label + _self.layout.area.w + _self.styleConfig.legendMargin;
    if(type==='otherLegend'){
        legendStartX = _self.layout.padding + _self.layout.y + _self.layout.yLabel + _self.layout.y1 + _self.layout.y1Label + _self.layout.area.w + _self.styleConfig.legendMargin*1.5 + _self.layout.legend.totalWidth;
    }

    if ("type" in _self[type] && _self[type].type == "gradient") { //渐变式图例
        var legendStartY = _self.layout.padding + _self.layout.title + _self.layout.x1 + _self.layout.x1Label + (_self.layout.area.h - _self.styleConfig.gradientLegend.h) / 2;

        legend_g = _self.svg.append('g').attr('class', `${type}-gradient`)
            .attr('transform', "translate(" + (x || legendStartX) + "," + (y || legendStartY) + ")");

        //线性填充
        var linearGradient = legend_g.append("defs")
            .append("linearGradient")
            .attr("id", `${type}GradientLinearColor`)
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");

        var colorsLen = colors.length;

        for (var i = 0; i < colorsLen; i++) {
            linearGradient.append("stop")
                .attr("offset", i * (100 / (colorsLen - 1)) + "%")
                .style("stop-color", colors[i]);
        }

        //画图例矩形
        var legend_w = _self.styleConfig.gradientLegend.w,
            legend_h = _self.styleConfig.gradientLegend.h;

        var legendData=[];
        if(!!_self[type] && "data" in _self[type] && _self[type].data.length){
            legendData=Array.from(new Set(_self[type].data));
        }else{
            var mydata=[];
            if(type==='otherLegend'){
                mydata=_self.chart.otherData;
            }else{
                mydata=_self.chart.data;
            }
            mydata.forEach(d => {
                if(d['category']){
                    legendData.push(d['category']);
                }
            });
        }

        var valuemin = 0,
            valuemax = 0;

        if ("min" in _self[type]) {
            valuemin = _self[type].min;
        } else {
            valuemin = d3.min(legendData, d => d);
        }

        if ("max" in _self[type]) {
            valuemax = _self[type].max;
        } else {
            valuemax = d3.max(legendData, d => d);
        }

        legend_g.append("rect").attr("width", legend_w).attr("height", legend_h)
            .attr("fill", "url(#" + linearGradient.attr("id") + ")");

        //图例交互
        var timer=null;
        var legendClickRect_h = legend_h / colorsLen;
        var legendClick_g = _self.svg.append("g").attr("class", `${type}-click-gradient`)
            .attr('transform', "translate(" + (x || legendStartX) + "," + (y || legendStartY) + ")")

        legendClick_g
            .on("mouseover", function() {
                _self[type].mouseover && _self[type].mouseover.call(_self, d3.event, legendClick_g);
            })
            .on("mouseout", function() {
                _self[type].mouseout && _self[type].mouseout.call(_self, d3.event, legendClick_g);
            })

        legendClick_g.selectAll(".legendClick_Rect")
            .data(colors)
            .enter()
            .append("rect")
            .attr("width", legend_w)
            .attr("height", legendClickRect_h)
            .attr("y", function(d, i) {
                return i * legendClickRect_h;
            })
            .attr("fill", "transparent")
            .on('mousedown',function(d,i){
                clearEventBubble(d3.event);
				timer && clearTimeout(timer);
                timer = setTimeout(function(){
                    _self[type].mousedown && _self[type].mousedown.call(_self, d, i);
                },300);
            })
            .on('mouseup',function(d,i){
                clearEventBubble(d3.event);
				timer && clearTimeout(timer);
                timer = setTimeout(function(){
                    _self[type].mouseup && _self[type].mouseup.call(_self, d, i);
                },300);
            })
            .on("click", function(d, i) {
                clearEventBubble(d3.event);
				timer && clearTimeout(timer);
                timer = setTimeout(function(){
                    _self[type].click && _self[type].click.call(_self, d, i);
                },300);
            })
            .on("dblclick", function(d, i) {
                clearEventBubble(d3.event);
                timer && clearTimeout(timer);
                _self[type].dblclick && _self[type].dblclick.call(_self, d, i);
            });

        if (_self[type].dblclick || _self[type].click || _self[type].mousedown || _self[type].mouseup) {
            legendClick_g
                .style("cursor", "pointer").style('user-select', 'none');
        }

        //画图例的轴
        var legendScale = d3.scaleLinear().range([0, legend_h]) //定义图例比例尺
            .domain([valuemin, valuemax]).nice().clamp(true);
        var yAxis = d3.axisRight(legendScale).tickSizeOuter(0).ticks(5); //设置Y轴
        legend_g.append("g").attr("class", `${type}GradientAxis`)
            .attr("transform", "translate(" + legend_w + ",0)")
            .call(yAxis);

        d3.selectAll(`.${type}GradientAxis .tick text`)
			.style("font-size", _self.styleConfig.legendFontSize)
			.style("font-family",_self.styleConfig.fontFamily);

    } else { //small rect 图例
        var timer=null;

        var legendStarty = _self.layout.padding + _self.layout.title + _self.layout.x1 + _self.layout.x1Label;

        // ceo控制开始位置
        if (ceo != 1) legendStarty += this.layout.area.h / ceo + this.styleConfig.composeChartLegendGroupMargin * (ceo - 1);

        legend_g = _self.svg.append('g').attr('class', `${type}`)
            .attr('transform', "translate(" + (x ||  legendStartX) + "," + (y ||  legendStarty) + ")");

        _self.layout[type].list.forEach((val, index) => {

			var curStartx = 0;
            if (index) {
                for (var i = 0; i < index; i++) {
                    curStartx += _self.layout[type].widthArr[i].width;
                }
			}

            var curLegend = legend_g.append('g').attr('class', `${type}` + (index + 1))
                .attr('transform', "translate(" + curStartx + ",0)")

            var rect = curLegend.selectAll('rect')
                .data(val)
                .enter()
                .append('rect')
                .attr('x', 0)
                .attr('y', (d, i) => {
                    return i * (global.legend.m + global.legend.h);
                })
                .attr('width', global.legend.w)
                .attr('height', global.legend.h)
                .attr('fill', d => colorScale(d))
                .on("mouseover", function() {
                    _self[type].mouseover && _self[type].mouseover.call(_self, d3.event, d3.select(this));
                })
                .on("mouseout", function() {
                    _self[type].mouseout && _self[type].mouseout.call(_self, d3.event, d3.select(this));
                })
                .on('mousedown',function(d,i){
                    clearEventBubble(d3.event);
					timer && clearTimeout(timer);
					let _this  = this;
                    timer = setTimeout(function(){
                        _self[type].mousedown && _self[type].mousedown.call(_self, d3.select(_this).node(), (_self.layout[type].columnLegendCount * index) + i);
                    },300);
                })
                .on('mouseup',function(d,i){
                    clearEventBubble(d3.event);
					timer && clearTimeout(timer);
					let _this  = this;
                    timer = setTimeout(function(){
                        _self[type].mouseup && _self[type].mouseup.call(_self, d3.select(_this).node(), (_self.layout[type].columnLegendCount * index) + i);
                    },300);
                })
                .on("click", function(d, i) {
                    clearEventBubble(d3.event);
					timer && clearTimeout(timer);
					let _this  = this;
                    timer = setTimeout(function(){
                        _self[type].click && _self[type].click.call(_self, d3.select(_this).node(), (_self.layout[type].columnLegendCount * index) + i);
                    },300);
                })
                .on('dblclick', function(d, i) {
                    clearEventBubble(d3.event);
                    timer && clearTimeout(timer);
                    _self[type].dblclick && _self[type].dblclick.call(_self, d3.select(this).node(), (_self.layout[type].columnLegendCount * index) + i);
                });

            if ('dblclick' in _self[type] || 'click' in _self[type] || 'mousedown' in _self[type] || 'mouseup' in _self[type]) {
                rect.style('cursor', 'pointer').style('user-select', 'none');
            }

            curLegend.selectAll('text')
                .data(val)
                .enter()
                .append('text')
                .attr('x', 0)
                .attr('y', (d, i) => {
                    return i * (global.legend.m + global.legend.h)
                })
				.style('font-size', this.styleConfig.legendFontSize)
				.style("font-family",this.styleConfig.fontFamily)
                .attr('text-anchor', 'start')
                .attr('dominant-baseline', 'middle')
                .attr('dx', global.legend.w + global.legend.m)
                .attr('dy', global.legend.h / 2)
                .text(d => {
                    return ('' + d).length > global.legend.textMaxLength ? (('' + d).substring(0, global.legend.textMaxLength - 1) + '...') : d;
                })
                .append('title')
                .text(d => d)
        })
    }

    // 是否有图例标题
    if ("title" in _self[type] && _self[type].show) {
        var legendText = legend_g.append("text")
			.style("font-size", _self.styleConfig.legendTitleFontSize + 'px')
			.style("font-family",_self.styleConfig.fontFamily)
            .style("text-anchor", "start")
            .attr("dominant-baseline", 'middle')
            .attr("dy", -(_self.styleConfig.legend.p))
            .text(_self[type].title);
    }

}

//阻止冒泡
function clearEventBubble(evt) {
    if (evt.stopPropagation) {
        evt.stopPropagation();
    } else {
        evt.cancelBubble = true;
    }

    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }
}


