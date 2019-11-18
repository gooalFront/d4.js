/**
 * @time 2018年7月30日10:48:33
 * @author joke <277637411@qq.com>
 * @description 图的标题，x，y标题
 */
import * as d3 from "d3";

export const drawChartTitle = function(x) {
    var timer=null;
    // 没有坐标轴的图 通过自定义的x传位置
    var _self = this;

    let beforeChartTitle = _self.svg.select(".chart-title");
    if (beforeChartTitle.nodes().length) beforeChartTitle.remove();
    var yPos;
    if (_self.axis && "y" in _self.axis) yPos = _self.axis.y.position || "left";

    var xDis = _applyTitlePos.call(_self, yPos);

    var title = _self.svg
        .append("g")
        .attr("transform", "translate(" + (x || xDis) + "," + (_self.styleConfig.padding + _self.styleConfig.titleFontSize) + ")")
        .attr("class", "chart-title");

    var titleText = title.append("text");
    titleText
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "top")
		.style("font-size", _self.styleConfig.titleFontSize)
		.style("font-family",_self.styleConfig.fontFamily)
        .text(function() {
            return _self.chart.title;
        })
        .on("mouseover", function() {
            clearEventBubble(d3.event);
            _self.chart.mouseover && _self.chart.mouseover.call(_self, d3.event, title);
        })
        .on("mouseout", function() {
            clearEventBubble(d3.event);
            _self.chart.mouseout && _self.chart.mouseout.call(_self, d3.event, title);
        })
        .on('mousedown',function(){
            clearEventBubble(d3.event);
            timer && clearTimeout(timer);
            timer = setTimeout(function(){
                _self.chart.mousedown && _self.chart.mousedown.call(_self, d3.event, d3.select(this).node());
            },300);
        })
        .on('mouseup',function(){
            clearEventBubble(d3.event);
            timer && clearTimeout(timer);
            timer = setTimeout(function(){
                _self.chart.mouseup && _self.chart.mouseup.call(_self, d3.event, d3.select(this).node());
            },300);
        })
        .on("dblclick", function() {
            clearEventBubble(d3.event);
            timer && clearTimeout(timer);
            _self.chart.dblclick && _self.chart.dblclick.call(_self, d3.event, d3.select(this).node());
        })
        .on("click", function() {
            clearEventBubble(d3.event);
            timer && clearTimeout(timer);
            timer = setTimeout(function(){
                _self.chart.click && _self.chart.click.call(_self, d3.event, d3.select(this).node());
            },300);
        });

    if (_self.chart.dblclick || _self.chart.click || _self.chart.mousedown || _self.chart.mouseup) {
        title.style('cursor', 'pointer').style('user-select', 'none');
    }
};

function _applyTitlePos(yPos) {
    var l = this.layout;
    if (yPos === "left") {
        return l.padding + l.y + l.yLabel + l.area.w / 2;
    } else if (yPos === "right") {
        return l.padding + l.area.w / 2;
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
