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

class CircleTree extends Base {
    constructor(options, rootConfig,styleConfig) {
        super(options, rootConfig,styleConfig);
        this.drawChart();
    }

    drawChart(){
        d3.selectAll(this.chart.el+" svg").remove();
        var that=this;
        var data=this.chart.data;
        //圆的外半径和内半径
        var outerRadius = 400,
            innerRadius = outerRadius - 100;
        //当前点击的link的所有子link数组
        var linkArr = [];
        var sizeArr = [];
        //创建聚类布局
        var cluster = d3.cluster()
            .size([360, innerRadius])
            .separation(function (a, b) { return 1; });

        var svgW=outerRadius * 2+this.layout.padding*2,
            svgH=outerRadius * 2+this.layout.padding*2+this.layout.title;

        //动态设置 SVG 高度
        this.svg = d3.select(this.chart.el).append('svg')
            .attr("width", svgW)
            .attr("height", svgH)
            .on("click", function() {
                that.resetChartSelect();
            });

        this.layout.w=svgW;
        this.layout.h=svgH;
        this.layout.area.w=outerRadius * 2;
        this.layout.area.h=outerRadius * 2;

        //title
        if ('title' in this.chart) drawChartTitle.call(this, outerRadius);

        //画系统发育树
        var chart = this.svg.append("g")
            .attr("transform", "translate(" + outerRadius + "," + (outerRadius+this.layout.title) + ")");

        var root = d3.hierarchy(data) //分层
            .sort(function (a, b) { return (a.value - b.value) || d3.ascending(a.data.length, b.data.length); }); //排序

        cluster(root); //聚类

        //树的所有叶子结点（没有子节点的节点）
        var leaves = root.leaves();
        //设置叶子节点文本颜色文本颜色
        leaves.forEach(function (d) {
            return d.color = "#A9A9A9";
        });

        //设置半径
        setRadius(root, root.data.length = 0, innerRadius / maxLength(root));

        var links = root.links();
        //画线
        var linkExtension = chart.append("g")
            .attr("class", "link-extensions")
            .selectAll("path")
            .data(links.filter(function (d) { return !d.target.children; }))
            .enter().append("path")
            .each(function (d) {
                d.target.linkExtensionNode = this;
            })
            .attr("d", linkExtensionConstant)

        var link = chart.append("g")
            .attr("class", "links")
            .selectAll("path")
            .data(links)
            .enter().append("path")
            .attr('stroke',"#000000")
            .attr('stroke-width',2)
            .attr('fill',"none")
            .each(function (d) {
                d.target.linkNode = this;
            })
            .attr('name', function (d, i) { return d.target.data.name; })
            .attr("d", linkConstant)
            .style('cursor','pointer')
            .on('mouseover',function(){
                d3.select(this).attr('stroke','#cccccc').attr('stroke-width',4);
            })
            .on('mouseout',function(){
                d3.select(this).attr('stroke','#000000').attr('stroke-width',2);
            })
            .on('click', function (d,i) {
                d3.event.stopPropagation();
                var childlinks = findChild(d.target);
                if(that.chart.line && that.chart.line.click){
                    that.chart.line.click(this,childlinks,d);
                }
                
            });

        //画size
        var size = chart.append('g')
            .attr('class', 'sizes')
            .selectAll('text')
            .data(root.descendants())
            .enter()
            .append('text').text(function (d) { return isNaN(parseInt(d.data.size)) ? '' : parseInt(d.data.size); })
            .each(function (d) {
                d.sizeNode = this;
            })
            .attr("text-anchor", function (d) { return d.x < 180 ? "end" : "start"; })
            .attr("transform", function (d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y - 2) + ",14)" + (d.x < 180 ? "" : "rotate(180)") })
            .style('opacity', 0)
            .style('font-size',"10px")
            .attr('class', 'link-size')

        // 添加叶子节点标签文本
        chart.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(leaves)
            .enter().append("text")
            .attr('name', function (d) { return d.data.name; })
            .attr("dy", ".31em")
            .attr("transform", function (d) { return "rotate(" + (d.x - 90) + ")translate(" + (innerRadius + 4) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
            .attr("text-anchor", function (d) { return d.x < 180 ? "start" : "end"; })
            .style('font-size',"10px")
            .attr('fill', function (d) {
                return d.color;
            })
            .text(function (d) {
                return d.data.name;
            })
            .on("click", function(d) {
                if (that.selectedModule) {
                    that._applyChartSelect(d.data, d3.select(this), d.color);
                    d3.event.stopPropagation();
                } else {
                    return false;
                }
            })
            .on("mouseenter", mouseovered(true))
            .on("mousemove", function() {
                tooltip.update(d3.event.pageX, d3.event.pageY);
            })
            .on("mouseout", mouseovered(false))


        //find currentEle's all childpath
        function findChild(node) {
            var tempArr = [];
            tempArr.push(node.linkNode);
            findChildLinks(tempArr, node);
            return tempArr;
        }

         //find all childlinks
         function findChildLinks(tempArr, node) {
            if (node.children) {
                for (var y = 0; y < node.children.length; y++) {
                    var item = node.children[y];
                    if (item.linkNode) tempArr.push(item.linkNode)
                    if (item.children) findChildLinks(tempArr, item);
                }
            } else {
                return;
            }
        }

        // 根据状态，设置移入、移出
        function mouseovered(active) {
            return function (d) {
                if (active) {
                    sizeArr = [];
                    findParentSize(sizeArr, d);
                    sizeArr.forEach(function (val, index) {
                        d3.select(val).style('opacity', 1);
                        d3.select(val).style('font-weight', 'bold');
                    })
                    var str = '',
                        icount = 0;
                    if (d.data.anno.length) {
                        for (var i = 0; i < d.data.anno.length; i++) {
                            if (icount == 5) break;
                            if (d.data.anno[i].value) {
                                str += d.data.anno[i].name + ' : ' + d.data.anno[i].value + '<br>';
                                icount++;
                            }
                        }
                    } 
                    var tips = `name：${d.data.name} <br> ${str}`;
                    if(that.tooltip){
                        var html=that.tooltip(d.data);
                    }
                    tooltip.show(d3.event.pageX,d3.event.pageY,html ? html : tips);
                } else {
                    sizeArr.forEach(function (val) { d3.select(val).style('opacity', 0) })
                    tooltip.hide();
                }

                d3.select(this).attr();
                d3.select(d.linkExtensionNode).classed("link-extension--active", active).each(moveToFront);
                do d3.select(d.linkNode).classed("link--active", active).each(moveToFront); while (d = d.parent);

            };
        }

        //find all size on path
        function findParentSize(sizeArr, item) {
            if (item.parent) {
                if (item.parent.children.length == 1) {
                    findParentSize(sizeArr, item.parent)
                } else if (!item.children) {
                    findParentSize(sizeArr, item.parent)
                } else {
                    sizeArr.push(item.sizeNode);
                    findParentSize(sizeArr, item.parent)
                }
            } else if (!item.parent) {
                sizeArr.push(item.sizeNode);
            }
        }


        function moveToFront() {
            this.parentNode.appendChild(this);
        }

        // 获取子节点最大数量
        function maxLength(d) {
            return d.data.length + (d.children ? d3.max(d.children, maxLength) : 0);
        }

        // 设置半径
        function setRadius(d, y0, k) {
            d.radius = (y0 += d.data.length) * k;
            if (d.children) d.children.forEach(function (d) { setRadius(d, y0, k); });
        }

        // 以下方法根据结点类型，设置 corner
        function linkVariable(d) {
            return linkStep(d.source.x, d.source.radius, d.target.x, d.target.radius);
        }

        function linkConstant(d) {
            return linkStep(d.source.x, d.source.y, d.target.x, d.target.y);
        }

        function linkExtensionVariable(d) {
            return linkStep(d.target.x, d.target.radius, d.target.x, innerRadius);
        }

        function linkExtensionConstant(d) {
            return linkStep(d.target.x, d.target.y, d.target.x, innerRadius);
        }
        // 设置枝的 corner
        function linkStep(startAngle, startRadius, endAngle, endRadius) {
            var c0 = Math.cos(startAngle = (startAngle - 90) / 180 * Math.PI),
                s0 = Math.sin(startAngle),
                c1 = Math.cos(endAngle = (endAngle - 90) / 180 * Math.PI),
                s1 = Math.sin(endAngle);
            return "M" + startRadius * c0 + "," + startRadius * s0 +
                (endAngle === startAngle ? "" : "A" + startRadius + "," + startRadius + " 0 0 " + (endAngle > startAngle ? 1 : 0) + " " + startRadius * c1 + "," + startRadius * s1) +
                "L" + endRadius * c1 + "," + endRadius * s1;
        }

    }

    updateTitle() {
        if ('title' in this.chart) drawChartTitle.call(this, this.layout.area.w/2);
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

export default CircleTree;

