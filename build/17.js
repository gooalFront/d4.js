webpackJsonp([17],{688:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n(720),i=n.n(a);for(var l in a)"default"!==l&&function(t){n.d(e,t,function(){return a[t]})}(l);var r=n(756),o=n(543),s=o(i.a,r.a,!1,null,null,null);e.default=s.exports},720:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"clusterChart",computed:{options:function(){return{mode:"javascript",tabSize:2,lineNumbers:!0,lineWrapping:!0,viewportMargin:1/0,showCursorWhenSelecting:!0,readOnly:!0,theme:"neo",extraKeys:{"Ctrl-Space":"autocomplete"}}}},data:function(){var t=this;return{code:'\n\t {\n        chart: {\n          title: "聚类热图",\n          dblclick: function(event) {\n            var name = prompt("请输入需要修改的标题", "");\n            if (name) {\n              this.setChartTitle(name);\n              this.updateTitle();\n            }\n          },\n          mouseover: function(event, titleObj) {\n            titleObj\n              .attr("fill", "blue")\n              .append("title")\n              .text("custom");\n          },\n          mouseout: function(event, titleObj) {\n            titleObj.attr("fill", "#333");\n            titleObj.select("title").remove();\n          },\n          el: "#chart-cluster",\n          type: "cluster",\n          data: [],\n          colors: ["#ff0000", "#ffffff", "#0070c0"],\n          heatmap: {\n            width: 480,\n            height: 480\n          },\n          leftCluster: {\n            show: true\n            // stroke:"#ccc"\n          },\n          topCluster: {\n            show: true,\n            // stroke: "#ccc"\n\t\t  },\n\t\t  //   enableChartSelect:true,\n          //   selectedModule: "",\n          onselect: data => {\n            console.log(data);\n          },\n        },\n        axis: {\n          x: {\n            title: "样本",\n            rotate: 30,\n            dblclick: function(event) {\n              var name = prompt("请输入需要修改的标题", "");\n              if (name) {\n                this.setXTitle(name);\n                this.updateTitle();\n              }\n            }\n          },\n          y: {\n            show: true\n          }\n        },\n        legend: {\n          show: true,\n          type: "gradient",\n        //   min: -3,\n        //   max: 3,\n          data: [],\n\t\t  position: "right",\n\t\t  dblclick:(d,i)=>{\n\t\t\tthis.d = d;\n            this.i = i;\n            this.$refs.inputColor.click();\n\t\t  }\n        },\n        tooltip: function(d) {\n          return "<span>基因：d.x</span><br><span>y：d.y</span>";\n        }\n      }\n\t  ',chart:null,config:{chart:{title:"聚类热图",dblclick:function(t){var e=prompt("请输入需要修改的标题","");e&&(this.setChartTitle(e),this.updateTitle())},mouseover:function(t,e){e.attr("fill","blue").append("title").text("双击修改标题")},mouseout:function(t,e){e.attr("fill","#333"),e.select("title").remove()},el:"#chart-cluster",type:"cluster",data:[],colors:["#ff0000","#ffffff","#0070c0","#FEF6B2"],heatmap:{width:480,height:480},leftCluster:{show:!0},topCluster:{show:!0},onselect:function(t){console.log(t)}},axis:{x:{title:"样本",rotate:30,dblclick:function(t){var e=prompt("请输入需要修改的标题","");e&&(this.setXTitle(e),this.updateTitle())},mouseover:function(t,e){e.attr("fill","blue").append("title").text("双击修改x标题")},mouseout:function(t,e){e.attr("fill","#333"),e.select("title").remove()}},y:{show:!0}},legend:{show:!0,type:"gradient",min:-5,max:5,data:[],position:"right",dblclick:function(e,n){t.d=e,t.i=n,t.$refs.inputColor.click()},mouseover:function(t,e){e.append("title").text("双击修改颜色")},mouseout:function(t,e){e.select("title").remove()}},tooltip:function(t){return"<span>基因："+t.x+"</span><br><span>y："+t.y+"</span>"}}}},mounted:function(){for(var t={leftCluster:{name:"",children:[{name:"53417"},{name:"",children:[{name:"100041759"},{name:"100041787"}]}]},topCluster:{name:"",children:[{name:"BT3"},{name:"",children:[{name:"BT1"},{name:"BT2"}]}]},heatmapData:[{name:"BT3",heatmap:[{x:"53417",y:.0840642647884745},{x:"100041759",y:3.2735158897021197},{x:"100041787",y:4.31397137105902}]},{name:"BT1",heatmap:[{x:"53417",y:.20163386116964999},{x:"100041759",y:2.25701061820602},{x:"100041787",y:3.35895882583233}]},{name:"BT2",heatmap:[{x:"53417",y:.124328135002202},{x:"100041759",y:1.72246602447109},{x:"100041787",y:2.91456452349394}]}]},e=t.heatmapData,n=e.length,a=[],i=[],l=0;l<n;l++){a.push(e[l].name);for(var r=e[l].heatmap.length,o=0;o<r;o++)i.push(e[l].heatmap[o].y)}this.config.chart.data=t,this.config.legend.data=i,this.chart=this.d4.init(this.config)},methods:{redraw:function(){this.chart.redraw()},deepRedraw:function(){this.chart.redraw(!0)},colorChange:function(t){this.chart.setColor(t.target.value,this.i),this.chart.redraw()},single:function(){this.selectedModule="single",this.chart.setChartSelectModule(this.selectedModule)},multiple:function(){this.selectedModule="multiple",this.chart.setChartSelectModule(this.selectedModule)}}}},756:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"cluster-chart"}},[n("h3",[t._v("聚类热图")]),t._v(" "),n("el-button",{attrs:{size:"small"},on:{click:t.redraw}},[t._v("Redraw")]),t._v(" "),n("el-button",{attrs:{size:"small"},on:{click:t.deepRedraw}},[t._v("deepRedraw")]),t._v(" "),n("el-button",{attrs:{size:"small"},on:{click:t.single}},[t._v("单选")]),t._v(" "),n("el-button",{attrs:{size:"small"},on:{click:t.multiple}},[t._v("多选")]),t._v(" "),n("input",{ref:"inputColor",attrs:{type:"color"},on:{change:t.colorChange}}),t._v(" "),n("div",{staticClass:"chart-content",attrs:{id:"chart-cluster"}}),t._v(" "),n("codemirror",{ref:"code",attrs:{options:t.options},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}})],1)},i=[],l={render:a,staticRenderFns:i};e.a=l}});
//# sourceMappingURL=17.js.map