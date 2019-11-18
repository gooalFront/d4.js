webpackJsonp([4],{684:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=e(716),a=e.n(i);for(var l in i)"default"!==l&&function(t){e.d(n,t,function(){return i[t]})}(l);var o=e(752),r=e(543),c=r(a.a,o.a,!1,null,null,null);n.default=c.exports},716:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={name:"stackBarChart",computed:{options:function(){return{mode:"javascript",tabSize:2,lineNumbers:!0,lineWrapping:!0,viewportMargin:1/0,showCursorWhenSelecting:!0,readOnly:!0,theme:"neo",extraKeys:{"Ctrl-Space":"autocomplete"}}}},data:function(){var t=this;return{curDirection:"vertical",code:'\n\t\t{\n\t\t\tchart: {\n\t\t\t\ttitle: "堆叠柱状图",\n\t\t\t\tdblclick: function(event) {\n\t\t\t\t\tvar name = prompt("请输入需要修改的标题", "");\n\t\t\t\t\tif (name) {\n\t\t\t\t\tthis.setChartTitle(name);\n\t\t\t\t\tthis.updateTitle();\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tel: "#chart-bar",\n\t\t\t\ttype: "stackBar",\n\t\t\t\t// 自定义分类顺序\n\t\t\t\t// orderBy:[\'一月\',\'三月\',\'五月\',\'二月\',\'四月\'],\n\t\t\t\tcustom: ["sample_name", "total"], // x y\n\t\t\t\t//   direction: "horizontal", // vertical default\n\t\t\t\tdata: [\n\t\t\t\t\t{\n\t\t\t\t\tsample_name: "HBRR1",\n\t\t\t\t\t"Alternative 3\' Splicing Site（A3SS）": 13,\n\t\t\t\t\t"Alternative 5\' Splicing Site（A5SS）": 0.1,\n\t\t\t\t\t"Mutually exclusive exons（MXE）": 20,\n\t\t\t\t\t"Retained Intron（RI）": 45,\n\t\t\t\t\t"Skipped Exon（SE）": 32,\n\t\t\t\t\ttotal: 13 + 0.1 + 20 + 45 + 32\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\tsample_name: "HBRR2",\n\t\t\t\t\t"Alternative 3\' Splicing Site（A3SS）": 45,\n\t\t\t\t\t"Alternative 5\' Splicing Site（A5SS）": 27,\n\t\t\t\t\t"Mutually exclusive exons（MXE）": 87,\n\t\t\t\t\t"Retained Intron（RI）": 34,\n\t\t\t\t\t"Skipped Exon（SE）": 6,\n\t\t\t\t\ttotal: 45 + 27 + 87 + 34 + 6\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\tsample_name: "HBRR3",\n\t\t\t\t\t"Alternative 3\' Splicing Site（A3SS）": 11,\n\t\t\t\t\t"Alternative 5\' Splicing Site（A5SS）": 10,\n\t\t\t\t\t"Mutually exclusive exons（MXE）": 8,\n\t\t\t\t\t"Retained Intron（RI）": 7,\n\t\t\t\t\t"Skipped Exon（SE）": 62,\n\t\t\t\t\ttotal: 11 + 10 + 8 + 7 + 62\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\tsample_name: "UHRR1",\n\t\t\t\t\t"Alternative 3\' Splicing Site（A3SS）": 23,\n\t\t\t\t\t"Alternative 5\' Splicing Site（A5SS）": 14,\n\t\t\t\t\t"Mutually exclusive exons（MXE）": 25,\n\t\t\t\t\t"Retained Intron（RI）": 11,\n\t\t\t\t\t"Skipped Exon（SE）": 51,\n\t\t\t\t\ttotal: 23 + 14 + 25 + 11 + 54\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\tsample_name: "UHRR2",\n\t\t\t\t\t"Alternative 3\' Splicing Site（A3SS）": 67,\n\t\t\t\t\t"Alternative 5\' Splicing Site（A5SS）": 45,\n\t\t\t\t\t"Mutually exclusive exons（MXE）": 7,\n\t\t\t\t\t"Retained Intron（RI）": 33,\n\t\t\t\t\t"Skipped Exon（SE）": 45,\n\t\t\t\t\ttotal: 67 + 45 + 7 + 33 + 45\n\t\t\t\t\t},\n\t\t\t\t\t{\n\t\t\t\t\tsample_name: "UHRR3",\n\t\t\t\t\t"Alternative 3\' Splicing Site（A3SS）": 11,\n\t\t\t\t\t"Alternative 5\' Splicing Site（A5SS）": 9,\n\t\t\t\t\t"Mutually exclusive exons（MXE）": 8,\n\t\t\t\t\t"Retained Intron（RI）": 7,\n\t\t\t\t\t"Skipped Exon（SE）": 62,\n\t\t\t\t\ttotal: 11 + 9 + 8 + 7 + 62\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t},\n\t\t\taxis: {\n\t\t\t\tx: {\n\t\t\t\t\ttitle: "x",\n\t\t\t\t\tdblclick: function(event) {\n\t\t\t\t\tvar name = prompt("请输入需要修改的标题", "");\n\t\t\t\t\t\tif (name) {\n\t\t\t\t\t\t\tthis.setXTitle(name);\n\t\t\t\t\t\t\tthis.updateTitle();\n\t\t\t\t\t\t}\n\t\t\t\t\t},\n\t\t\t\t\trotate:60\n\t\t\t\t},\n\t\t\t\ty: {\n\t\t\t\t\ttitle: "y",\n\t\t\t\t\tdblclick: function(event) {\n\t\t\t\t\tvar name = prompt("请输入需要修改的标题", "");\n\t\t\t\t\t\tif (name) {\n\t\t\t\t\t\t\tthis.setYTitle(name);\n\t\t\t\t\t\t\tthis.updateTitle();\n\t\t\t\t\t\t}\n\t\t\t\t\t},\n\n\t\t\t\t}\n\t\t\t},\n\t\t\tlegend: {\n\t\t\t\tshow: true,\n\t\t\t\tposition: "right",\n\t\t\t\tdblclick:function(el){\n\t\t\t\t\tconsole.log(el)\n\t\t\t\t}\n\t\t\t},\n\t\t\ttooltip: function(d) {\n\t\t\t\treturn "<span>月份："+d.key+"</span><br><span>数量："+d.value+"</span>";\n\t\t\t}\n\t}',chart:null,i:0,config:{chart:{title:"堆叠柱状图",dblclick:function(t){var n=prompt("请输入需要修改的标题","");n&&(this.setChartTitle(n),this.updateTitle())},enableChartSelect:!0,onselect:function(t){console.log(t)},padding:.6,el:"#chart-bar",type:"stackBar",custom:["sample_name","total","Alternative 3' Splicing Site（A3SS）","Alternative 5' Splicing Site（A5SS）","Mutually exclusive exons（MXE）","Retained Intron（RI）","Skipped Exon（SE）"],data:[{sample_name:"HBRR1",other1:1,"Alternative 3' Splicing Site（A3SS）":13,"Alternative 5' Splicing Site（A5SS）":.1,"Mutually exclusive exons（MXE）":20,"Retained Intron（RI）":45,"Skipped Exon（SE）":32,total:110.1},{sample_name:"HBRR2","Alternative 3' Splicing Site（A3SS）":45,"Alternative 5' Splicing Site（A5SS）":27,"Mutually exclusive exons（MXE）":87,"Retained Intron（RI）":34,"Skipped Exon（SE）":6,total:199},{sample_name:"HBRR3","Alternative 3' Splicing Site（A3SS）":11,"Alternative 5' Splicing Site（A5SS）":10,"Mutually exclusive exons（MXE）":8,"Retained Intron（RI）":7,"Skipped Exon（SE）":62,total:98},{sample_name:"UHRR1","Alternative 3' Splicing Site（A3SS）":23,"Alternative 5' Splicing Site（A5SS）":14,"Mutually exclusive exons（MXE）":25,"Retained Intron（RI）":11,"Skipped Exon（SE）":51,total:127},{sample_name:"UHRR2","Alternative 3' Splicing Site（A3SS）":67,"Alternative 5' Splicing Site（A5SS）":45,"Mutually exclusive exons（MXE）":7,"Retained Intron（RI）":33,"Skipped Exon（SE）":45,total:197},{sample_name:"UHRR3","Alternative 3' Splicing Site（A3SS）":11,"Alternative 5' Splicing Site（A5SS）":9,"Mutually exclusive exons（MXE）":8,"Retained Intron（RI）":7,"Skipped Exon（SE）":62,total:97}]},axis:{x:{title:"x",dblclick:function(t){var n=prompt("请输入需要修改的标题","");n&&(this.setXTitle(n),this.updateTitle())},rotate:60,position:"bottom"},y:{title:"y",dblclick:function(t){var n=prompt("请输入需要修改的标题","");n&&(this.setYTitle(n),this.updateTitle())},position:"left"}},legend:{show:!0,position:"right",dblclick:function(n,e){t.$refs.inputColor.click(),t.i=e}},tooltip:function(t){return"<span>样本："+t.data.sample_name+"</span><br><span>数量："+(t[1]-t[0])+"</span>"}}}},mounted:function(){this.chart=this.d4.init(this.config)},methods:{redraw:function(){this.chart.redraw()},deepRedraw:function(){this.chart.redraw(!0)},single:function(){this.selectedModule="single",this.chart.setChartSelectModule(this.selectedModule)},multiple:function(){this.selectedModule="multiple",this.chart.setChartSelectModule(this.selectedModule)},colorChange:function(t){console.log(t.target.value,this.i),this.chart.setColor(t.target.value,this.i),this.chart.redraw()},changeDirection:function(){var t=this.chart.getOptions();"horizontal"===this.curDirection?(this.curDirection="vertical",t.chart.title="vertical-stackbar-chart",t.chart.direction=this.curDirection):(this.curDirection="horizontal",t.chart.title="horizontal-stackbar-chart",t.chart.direction=this.curDirection),this.chart.setOptions(t),this.chart.redraw()},changeXAxis:function(t){var n=this.chart.getOptions();n.axis.x.position=t,this.chart.setOptions(n),this.chart.redraw()},changeYAxis:function(t){var n=this.chart.getOptions();n.axis.y.position=t,this.chart.setOptions(n),this.chart.redraw()}}}},752:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"stack-bar-chart"}},[e("h3",[t._v("堆叠柱状图")]),t._v(" "),e("p",{staticClass:"text"},[t._v("与并排显示分类的分组柱状图不同，堆叠柱状图将每个柱子进行分割以显示相同类型下各个数据的大小情况。")]),t._v(" "),e("el-button",{attrs:{size:"small"},on:{click:t.redraw}},[t._v("重画")]),t._v(" "),e("el-button",{attrs:{size:"small"},on:{click:t.deepRedraw}},[t._v("deepRedraw")]),t._v(" "),e("el-button",{attrs:{size:"small"},on:{click:t.changeDirection}},[t._v("切换方向")]),t._v("\n\t\t current:"+t._s(t.curDirection)+"\n\t\t"),e("el-button",{attrs:{size:"small"},on:{click:t.single}},[t._v("单选")]),t._v(" "),e("el-button",{attrs:{size:"small"},on:{click:t.multiple}},[t._v("多选")]),t._v("\n\n\t\tx:\n \t\t"),e("el-button",{attrs:{size:"small"},on:{click:function(n){t.changeXAxis("bottom")}}},[t._v("bottom")]),t._v(" "),e("el-button",{attrs:{size:"small"},on:{click:function(n){t.changeXAxis("top")}}},[t._v("top")]),t._v("\n\t\t  y:\n \t\t"),e("el-button",{attrs:{size:"small"},on:{click:function(n){t.changeYAxis("left")}}},[t._v("left")]),t._v(" "),e("el-button",{attrs:{size:"small"},on:{click:function(n){t.changeYAxis("right")}}},[t._v("right")]),t._v(" "),e("input",{ref:"inputColor",attrs:{type:"color"},on:{change:t.colorChange}}),t._v(" "),e("div",{staticClass:"chart-content",attrs:{id:"chart-bar"}}),t._v(" "),e("codemirror",{ref:"code",attrs:{options:t.options},model:{value:t.code,callback:function(n){t.code=n},expression:"code"}})],1)},a=[],l={render:i,staticRenderFns:a};n.a=l}});
//# sourceMappingURL=4.js.map