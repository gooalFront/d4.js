webpackJsonp([6],{677:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(709),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);var s=n(745),o=n(543),l=o(i.a,s.a,!1,null,null,null);e.default=l.exports},709:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"roseChart",computed:{options:function(){return{mode:"javascript",tabSize:2,lineNumbers:!0,lineWrapping:!0,viewportMargin:1/0,showCursorWhenSelecting:!0,readOnly:!0,theme:"neo",extraKeys:{"Ctrl-Space":"autocomplete"}}}},data:function(){var t=this;return{code:'\n\t\t\tchart: {\n\t\t\t\ttitle: "玫瑰图",\n\t\t\t\tdblclick: function(event) {\n\t\t\t\t\tvar name = prompt("请输入需要修改的标题", "");\n\t\t\t\t\tif (name) {\n\t\t\t\t\t\tthis.setChartTitle(name);\n\t\t\t\t\t\tthis.updateTitle();\n\t\t\t\t\t}\n\t\t\t\t},\n          \t\tpadding: 0.05, // custom blank angle\n\t\t\t\tinnerRadius: 0, // custom inner radius\n\t\t\t\tminRadius: 100, // minRadius to service rose chart\n\t\t\t\touterRadius: 180, // outer circle radius\n\t\t\t\tstartAngle: 0, // custom start angle\n\t\t\t\tendAngle: 360, // custom end angle\n\t\t\t\tshowLabel: true, // custom label show or hide\n\t\t\t\tcustom: ["year", "population"],\n\t\t\t\tel: "#chart-rose", // pie chart type\n\t\t\t\ttype: "pie-rose",\n\t\t\t\tdata: [\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tyear: "2001",\n\t\t\t\t\t\t\tpopulation: 80\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tyear: "2002",\n\t\t\t\t\t\t\tpopulation: 38\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tyear: "2003",\n\t\t\t\t\t\t\tpopulation: 33.7\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tyear: "2004",\n\t\t\t\t\t\t\tpopulation: 12\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tyear: "2005",\n\t\t\t\t\t\t\tpopulation:2\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tyear: "2006",\n\t\t\t\t\t\t\tpopulation: 31.7\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tyear: "2007",\n\t\t\t\t\t\t\tpopulation: 12\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tyear: "2008",\n\t\t\t\t\t\t\tpopulation: 46\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tyear: "2009",\n\t\t\t\t\t\t\tpopulation: 38.3\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tyear: "2010",\n\t\t\t\t\t\t\tpopulation: 28\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tyear: "2011",\n\t\t\t\t\t\t\tpopulation: 42.5\n\t\t\t\t\t\t},\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\tyear: "2012",\n\t\t\t\t\t\t\tpopulation: 30.3\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t},\n\t\t\t\tlegend: {\n\t\t\t\t\tshow: true,\n\t\t\t\t\tposition: "right",\n\t\t\t\t\tdblclick:function(el){\n\t\t\t\t\t\tconsole.log(el)\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\ttooltip: function(d) {\n\t\t\t\t\treturn "<span>key："+d.data.key+"</span><br><span>value："+d.data.value+"</span>";\n\t\t\t\t}\n\t\t\t}',chart:null,angle:{start:0,end:360},radius:{inner:0,outer:200,minRadius:80},i:0,config:{chart:{title:"玫瑰图",dblclick:function(t){var e=prompt("请输入需要修改的标题","");e&&(this.setChartTitle(e),this.updateTitle())},onselect:function(t){console.log(t)},enableChartSelect:!0,padding:.01,innerRadius:0,minRadius:100,outerRadius:200,startAngle:0,endAngle:360,showLabel:!0,custom:["year","population"],el:"#chart-rose",type:"pie-rose",data:[{year:"2001",population:80},{year:"2002",population:38},{year:"2003",population:33.7},{year:"2004",population:12},{year:"2005",population:2},{year:"2006",population:31.7},{year:"2007",population:12},{year:"2008",population:46},{year:"2009",population:38.3},{year:"2010",population:28},{year:"2011",population:42.5},{year:"2012",population:30.3}]},legend:{show:!0,position:"right",dblclick:function(e,n){t.$refs.inputColor.click(),t.i=n}},tooltip:function(t){return"<span>year："+t.data.year+"</span><br><span>number："+t.data.population+"</span>"}}}},mounted:function(){this.chart=this.d4.init(this.config)},methods:{redraw:function(){this.config.chart.startAngle=this.angle.start,this.config.chart.endAngle=this.angle.end,this.config.chart.innerRadius=this.radius.inner,this.config.chart.outerRadius=this.radius.outer,this.config.chart.minRadius=this.radius.minRadius,this.chart.setOptions(this.config),this.chart.redraw()},deepRedraw:function(){this.chart.redraw(!0)},single:function(){this.selectedModule="single",this.chart.setChartSelectModule(this.selectedModule)},multiple:function(){this.selectedModule="multiple",this.chart.setChartSelectModule(this.selectedModule)},colorChange:function(t){this.chart.setColor(t.target.value,this.i),this.chart.redraw()},reset:function(){this.angle.start=0,this.angle.end=360,this.radius.inner=0,this.radius.outer=200,this.radius.minRadius=100,this.config.chart.showLabel=!0,this.config.chart.startAngle=this.angle.start,this.config.chart.endAngle=this.angle.end,this.config.chart.innerRadius=this.radius.inner,this.config.chart.outerRadius=this.radius.outer,this.config.chart.minRadius=this.radius.minRadius,this.chart.setOptions(this.config),this.chart.redraw()},toggle:function(){this.config.chart.showLabel=!this.config.chart.showLabel,this.chart.setOptions(this.config),this.chart.redraw()}}}},745:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"rose-chart"}},[n("h3",[t._v("玫瑰图")]),t._v(" "),n("p",{staticClass:"text"},[t._v("玫瑰图，又名鸡冠花图、极坐标区域图，是南丁格尔在克里米亚战争期间提交的一份关于士兵死伤的报告时发明的一种图表,是在极坐标下绘制的柱状图，使用圆弧的半径长短表示数据的大小（数量的多少）。")]),t._v(" "),n("div",[n("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.angle}},[n("el-form-item",{attrs:{label:"开始角度"}},[n("el-input",{attrs:{type:"number",size:"small",placeholder:"开始角度"},model:{value:t.angle.start,callback:function(e){t.$set(t.angle,"start",e)},expression:"angle.start"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"结束角度"}},[n("el-input",{attrs:{type:"number",size:"small",placeholder:"结束角度"},model:{value:t.angle.end,callback:function(e){t.$set(t.angle,"end",e)},expression:"angle.end"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"内圆半径"}},[n("el-input",{attrs:{type:"number",size:"small",placeholder:"结束角度"},model:{value:t.radius.inner,callback:function(e){t.$set(t.radius,"inner",e)},expression:"radius.inner"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"外圆半径"}},[n("el-input",{attrs:{type:"number",size:"small",placeholder:"结束角度"},model:{value:t.radius.outer,callback:function(e){t.$set(t.radius,"outer",e)},expression:"radius.outer"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"最小半径"}},[n("el-input",{attrs:{type:"number",size:"small",placeholder:"最小半径"},model:{value:t.radius.minRadius,callback:function(e){t.$set(t.radius,"minRadius",e)},expression:"radius.minRadius"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{size:"small"},on:{click:t.toggle}},[t._v("切换文本")])],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{size:"small"},on:{click:t.reset}},[t._v("重置")])],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{size:"small"},on:{click:t.redraw}},[t._v("重画")])],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{size:"small"},on:{click:t.deepRedraw}},[t._v("deepRedraw")])],1),t._v(" "),n("el-button",{attrs:{size:"small"},on:{click:t.single}},[t._v("单选")]),t._v(" "),n("el-button",{attrs:{size:"small"},on:{click:t.multiple}},[t._v("多选")]),t._v(" "),n("input",{ref:"inputColor",attrs:{type:"color"},on:{change:t.colorChange}})],1)],1),t._v(" "),n("div",{staticClass:"chart-content",attrs:{id:"chart-rose"}}),t._v(" "),n("codemirror",{ref:"code",attrs:{options:t.options},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1)},i=[],r={render:a,staticRenderFns:i};e.a=r}});
//# sourceMappingURL=6.js.map