/**
 * @tima 2018年7月31日11:28:50
 * @author joke<277637411@qq.com>
 * @description 坐标轴的上的标题
 */
import * as d3 from "d3";

export const drawXTitle = function(x, y, xPosition, yPosition) {
    // TODO position
    var _self = this;
    let beforeXTitle = _self.svg.select(".x-title");
    if (beforeXTitle.nodes().length) beforeXTitle.remove();
    var xPos, yPos;
    if (_self.axis && "x" in _self.axis)
        xPos = xPosition || _self.axis.x.position || "bottom";
    if (_self.axis && "y" in _self.axis)
        yPos = yPosition || _self.axis.y.position || "left";
    // apply position
    var { xDis, yDis } = _applyAxisTitlePosition.call(_self, xPos, yPos, "x");
    var xTitle = _self.svg.append("g").attr("class", "x-title axis-title");

    xTitle.attr(
        "transform",
        "translate(" + (x || xDis) + "," + (y || yDis) + ")"
    );
    var xTitleText = xTitle.append("text").text(_self.axis.x.title);

    xTitleText
        .attr("dy", 4)
        .style("font-size", this.styleConfig.axisTitleFontSize)
        .style("font-family", this.styleConfig.fontFamily)
        .attr("dominant-baseline", xPos==='bottom'?"initial":"central")
        .attr("text-anchor", "middle")
        .on("mouseover", function() {
            _self.axis.x.mouseover && _self.axis.x.mouseover.call(_self, d3.event, xTitle);
        })
        .on("mouseout", function() {
            _self.axis.x.mouseout && _self.axis.x.mouseout.call(_self, d3.event, xTitle);
        })
        .on("click", function() {
            _self.axis.x.click &&
                _self.axis.x.click.call(_self, d3.event);
        })
        .on("dblclick", function() {
            _self.axis.x.dblclick &&
                _self.axis.x.dblclick.call(_self, d3.event);
        });

    if ("dblclick" in this.axis.x || "click" in this.axis.x) {
        xTitle.style('cursor', 'pointer').style('user-select', 'none');
    }
};

export const drawYTitle = function(xPosition, yPosition) {
    var _self = this;
    let beforeYTitle = _self.svg.select(".y-title");
    if (beforeYTitle.nodes().length) beforeYTitle.remove();
    var xPos = xPosition || _self.axis.x.position || "bottom";
    var yPos = yPosition || _self.axis.y.position || "left";

    // apply position
    var { xDis, yDis } = _applyAxisTitlePosition.call(_self, xPos, yPos, "y");

    var yTitle = _self.svg.append("g").attr("class", "y-title axis-title");

    yTitle.attr("transform", "translate(" + xDis + "," + yDis + ")");
    var yTitleText = yTitle.append("text");

    yTitleText
        .text(_self.axis.y.title)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline",yPos==='left'?'hanging':'inherit')
        .attr("transform", "rotate(-90)")
        .style("font-size", this.styleConfig.axisTitleFontSize)
        .style("font-family",this.styleConfig.fontFamily)
        .on("mouseover", function() {
            _self.axis.y.mouseover && _self.axis.y.mouseover.call(_self, d3.event, yTitle);
        })
        .on("mouseout", function() {
            _self.axis.y.mouseout && _self.axis.y.mouseout.call(_self, d3.event, yTitle);
        })
        .on("click", function() {
            _self.axis.y.click &&
                _self.axis.y.click.call(_self, d3.event);
        })
        .on("dblclick", function() {
            _self.axis.y.dblclick &&
                _self.axis.y.dblclick.call(_self, d3.event);
        });

    if ("dblclick" in this.axis.y || "click" in this.axis.y) {
        yTitle.style('cursor', 'pointer').style('user-select', 'none');
    }
};


//组合图
export const drawGroupXTitle = function(axis,x, y) { //axis:"x" or "x1"
    var _self = this;
    let beforeXTitle = _self.svg.select(`.${axis}-title`);
    if (beforeXTitle.nodes().length) beforeXTitle.remove();

    // apply position
    var { xDis, yDis } = _applyGroupAxisTitlePosition.call(_self, axis);
    var xTitle = _self.svg.append("g").attr("class", `${axis}-title axis-title`);

    xTitle.attr(
        "transform",
        "translate(" + (x || xDis) + "," + (y || yDis) + ")"
    );
    var xTitleText = xTitle.append("text").text(_self.axis[axis].title);

    xTitleText
        .attr("dy", 4)
        .style("font-size", this.styleConfig.axisTitleFontSize)
        .style("font-family", this.styleConfig.fontFamily)
        .attr("dominant-baseline", axis==='x'?"initial":"central")
        .attr("text-anchor", "middle")
        .on("mouseover", function() {
            _self.axis[axis].mouseover && _self.axis[axis].mouseover.call(_self, d3.event, xTitle);
        })
        .on("mouseout", function() {
            _self.axis[axis].mouseout && _self.axis[axis].mouseout.call(_self, d3.event, xTitle);
        })
        .on("click", function() {
            _self.axis[axis].click &&
                _self.axis[axis].click.call(_self, d3.event);
        })
        .on("dblclick", function() {
            _self.axis[axis].dblclick &&
                _self.axis[axis].dblclick.call(_self, d3.event);
        });

    if ("dblclick" in this.axis[axis] || "click" in this.axis[axis]) {
        xTitle.style('cursor', 'pointer').style('user-select', 'none');
    }
};

export const drawGroupYTitle = function(axis,x,y) {
    var _self = this;
    let beforeYTitle = _self.svg.select(`.${axis}-title`);
    if (beforeYTitle.nodes().length) beforeYTitle.remove();

    // apply position
    var { xDis, yDis } = _applyGroupAxisTitlePosition.call(_self, `${axis}`);

    var yTitle = _self.svg.append("g").attr("class", `${axis}-title axis-title`);

    yTitle.attr("transform", "translate(" + (x || xDis) + "," + (y || yDis) + ")");
    var yTitleText = yTitle.append("text");

    yTitleText
        .text(_self.axis[axis].title)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", axis==='y'?'hanging':'text-before-edge')
        .attr("transform", "rotate(-90)")
        .style("font-size", this.styleConfig.axisTitleFontSize)
        .style("font-family", this.styleConfig.fontFamily)
        .on("mouseover", function() {
            _self.axis[axis].mouseover && _self.axis[axis].mouseover.call(_self, d3.event, yTitle);
        })
        .on("mouseout", function() {
            _self.axis[axis].mouseout && _self.axis[axis].mouseout.call(_self, d3.event, yTitle);
        })
        .on("click", function() {
            _self.axis[axis].click &&
                _self.axis[axis].click.call(_self, d3.event);
        })
        .on("dblclick", function() {
            _self.axis[axis].dblclick &&
                _self.axis[axis].dblclick.call(_self, d3.event);
        });

    if ("dblclick" in this.axis[axis] || "click" in this.axis[axis]) {
        yTitle.style('cursor', 'pointer').style('user-select', 'none');
    }
};

function _applyAxisTitlePosition(xPos, yPos, axis) {
    var _this = this;
    var l = _this.layout;
    if (xPos === "bottom") {
        if (yPos === "left") {
            if (axis === "x") {
                return {
                    xDis: l.padding + l.y + l.yLabel + l.area.w / 2,
                    yDis: l.h - l.padding
                };
            } else if (axis === "y") {
                return {
                    xDis: l.padding,
                    yDis: l.padding + l.title + l.area.h / 2
                };
            }
        } else if (yPos === "right") {
            if (axis === "x") {
                return {
                    xDis: l.padding + l.area.w / 2,
                    yDis: l.h - l.padding
                };
            } else if (axis === "y") {
                return {
                    xDis: l.padding + l.area.w + l.y + l.yLabel,
                    yDis: l.padding + l.title + l.area.h / 2
                };
            }
        }
    } else if (xPos === "top") {
        if (yPos === "left") {
            if (axis === "x") {
                return {
                    xDis: l.padding + l.y + l.yLabel + l.area.w / 2,
                    yDis: l.padding + l.title
                };
            } else if (axis === "y") {
                return {
                    xDis: l.padding,
                    yDis: l.padding + l.title + l.x + l.xLabel + l.area.h / 2
                };
            }
        } else if (yPos === "right") {
            if (axis === "x") {
                return {
                    xDis: l.padding + l.area.w / 2,
                    yDis: l.padding + l.title
                };
            } else if (axis === "y") {
                return {
                    xDis: l.padding + l.area.w + l.y + l.yLabel,
                    yDis: l.padding + l.title + l.area.h / 2 + l.x + l.xLabel
                };
            }
        }
    }
}

function _applyGroupAxisTitlePosition(axis) {
    var _this = this;
    var l = _this.layout;
    if (axis === "x") {
        return {
            xDis: l.padding + l.y + l.yLabel + l.area.w / 2,
            yDis: l.h - l.padding
        };
    } else if (axis === "y") {
        return {
            xDis: l.padding,
            yDis: l.padding + l.title + l.x1 + l.x1Label + l.area.h / 2
        };
    }else if(axis === "x1"){
        return {
            xDis: l.padding + l.y + l.yLabel + l.area.w / 2,
            yDis: l.padding + l.title
        };
    } else if (axis === "y1") {
        return {
            xDis: l.padding + l.y + l.yLabel + l.area.w + l.y1Label,
            yDis: l.padding + l.title + l.x1 + l.x1Label + l.area.h / 2
        };
    }
}
