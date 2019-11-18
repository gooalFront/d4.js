<template>
<div id="group-chart">
	<h3>组合图</h3>
	<el-button size="small" @click="redraw">Redraw</el-button>
	<el-button size="small" @click="deepRedraw">deepRedraw</el-button>
	<el-button size="small" @click="single">单选</el-button>
	<el-button size="small" @click="multiple">多选</el-button>
	<input type="color" ref="inputColor" @change="colorChange">
  	<input type="color" ref="oinputColor" @change="ocolorChange">
	<div class="chart-content" id="chart-group"></div>
	<codemirror ref='code' v-model="code" :options="options"></codemirror> 
</div>
</template>

<script>
export default {
  name: "groupChart",
  computed: {
    options: function() {
      return {
        mode: "javascript",
        tabSize: 2,
        lineNumbers: true,
        lineWrapping: true,
        viewportMargin: Infinity,
        showCursorWhenSelecting: true,
        readOnly: true,
        theme: "neo",
        extraKeys: { "Ctrl-Space": "autocomplete" }
      };
    }
  },
  data() {
    return {
      code: `
      config: {
        chart: {
          title: "组合图",
          dblclick: function(event) {
            var name = prompt("请输入需要修改的标题", "");
            if (name) {
              this.setChartTitle(name);
              this.updateTitle();
            }
          },
          mouseover: function(event, titleObj) {
            titleObj
              .attr("fill", "blue")
              .append("title")
              .text("custom");
          },
          mouseout: function(event, titleObj) {
            titleObj.attr("fill", "#333");
            titleObj.select("title").remove();
          },
          el: "#chart-group",
          type: "group",
          data: [],
          colors: ["#4575B4", "#FEF6B2", "#D9352A","#ff9896", "#98df8a", "#d62728", "#8c564b", "#c49c94", "#e377c2", "#bcbd22", "#17becf", "#9edae5", "#e6550d"],
          // padding:0.6,
          // direction:"horizontal",
          // radius:4,
          "stroke-width":2,
          // interpolate: "linear", // cardinal basic step natural  linear
          isPoint:true,
          types:['bar','line'],  //bar line scatter area
          otherData:[],  //副图数据
          otherColors:["yellow","red"], //副图的颜色
          otherSelect:true, //副图是否有点击交互
          //   enableChartSelect:true,
          //   selectedModule: "",
          onselect: data => {
            console.log(data);
          }
        },
        axis: {
          x: {
            title: "样本",
            rotate: 60,
            // type:"discrete", //data.x是number时，默认是线性，'discrete'强制x轴转为离散型
            min: 0,
            // max:1,
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setXTitle(name);
                this.updateTitle();
              }
            },
            // formatter: val => "$" + val
          },
          x1:{
              title:"x1 title",
              rotate: 60,
              // type:"discrete",
              min: 0,
              // max:1,
              dblclick: function(event) {
                var name = prompt("请输入需要修改的标题", "");
                if (name) {
                  this.setXTitle(name,'x1');
                  this.updateTitle();
                }
              },
              // formatter: val => "$" + val
          },
          y: {
            title: "log10(FPKM+1)",
            // type:'discrete', //data.y是number时，默认是线性，'discrete'强制y轴转为离散型
            min:0,
            // max:10,
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setYTitle(name);
                this.updateTitle();
              }
            },
            // formatter: val => "$" + val
          },
          y1:{
              title:'y1 title',
               // type:'discrete',
              min:0,
              // max:10,
              dblclick: function(event) {
                var name = prompt("请输入需要修改的标题", "");
                if (name) {
                  this.setYTitle(name,'y1');
                  this.updateTitle();
                }
              },
              // formatter: val => "$" + val
          }
        },
        legend: {
          show: true,
		      separation:true,
          title: "color",
          // data: [],
          // type: "gradient",
          // min: -1,
          // max: 1,
          click: (d, i) => {
            console.log(d,i)
            this.d = d;
            this.i = i;
            this.$refs.inputColor.click();
          },
        },
        otherLegend: {
          show: true,
          title: "other",
          // type: "gradient",
          // min: -1,
          // max: 1,
          // data:[],
          click: (d, i) => {
            console.log(d,i)
            this.od = d;
            this.oi = i;
            this.$refs.oinputColor.click();
          },
        },
        tooltip: [
          function(d) {
          return "<span>x"+d.x+"</span><br><span>y："+
            d.y+"
          </span><br><span>color："+d.category"+</span>";
        },
        function(d) {
          return "<span>x："+d.x+"</span><br><span>y："+
            d.y+"
          </span><br><span>category:"+d.category+"</span>";
        }]
      }
      `,
      chart: null,
      config: {
        chart: {
          title: "组合图",
          dblclick: function(event) {
            var name = prompt("请输入需要修改的标题", "");
            if (name) {
              this.setChartTitle(name);
              this.updateTitle();
            }
          },
          mouseover: function(event, titleObj) {
            titleObj
              .attr("fill", "blue")
              .append("title")
              .text("custom");
          },
          mouseout: function(event, titleObj) {
            titleObj.attr("fill", "#333");
            titleObj.select("title").remove();
          },
          el: "#chart-group",
          type: "group",
          data: [],
          colors: ["#4575B4", "#FEF6B2", "#D9352A","#ff9896", "#98df8a", "#d62728", "#8c564b", "#c49c94", "#e377c2", "#bcbd22", "#17becf", "#9edae5", "#e6550d"],
          // padding:0.6,
          // direction:"horizontal",
          // radius:4,
          "stroke-width":2,
          // interpolate: "linear", // cardinal basic step natural  linear
          isPoint:true,
          types:['bar','line'],  //bar line scatter area
          otherData:[],  //副图数据
          otherColors:["yellow","red"], //副图的颜色
          otherSelect:true, //副图是否有点击交互
          //   enableChartSelect:true,
          //   selectedModule: "",
          onselect: data => {
            console.log(data);
          }
        },
        axis: {
          x: {
            title: "样本",
            rotate: 60,
            // type:"discrete", //data.x是number时，默认是线性，'discrete'强制x轴转为离散型
            min: 0,
            // max:1,
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setXTitle(name);
                this.updateTitle();
              }
            },
            // formatter: val => "$" + val
          },
          x1:{
              title:"x1 title",
              rotate: 60,
              // type:"discrete",
              min: 0,
              // max:1,
              dblclick: function(event) {
                var name = prompt("请输入需要修改的标题", "");
                if (name) {
                  this.setXTitle(name,'x1');
                  this.updateTitle();
                }
              },
              // formatter: val => "$" + val
          },
          y: {
            title: "log10(FPKM+1)",
            // type:'discrete', //data.y是number时，默认是线性，'discrete'强制y轴转为离散型
            min:0,
            // max:10,
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setYTitle(name);
                this.updateTitle();
              }
            },
            // formatter: val => "$" + val
          },
          y1:{
              title:'y1 title',
               // type:'discrete',
              min:0,
              // max:10,
              dblclick: function(event) {
                var name = prompt("请输入需要修改的标题", "");
                if (name) {
                  this.setYTitle(name,'y1');
                  this.updateTitle();
                }
              },
              // formatter: val => "$" + val
          }
        },
        legend: {
          show: true,
		      separation:true,
          title: "color",
          // data: [],
          // type: "gradient",
          // min: -1,
          // max: 1,
          click: (d, i) => {
            console.log(d,i)
            this.d = d;
            this.i = i;
            this.$refs.inputColor.click();
          },
        },
        otherLegend: {
          show: true,
          title: "other",
          // type: "gradient",
          // min: -1,
          // max: 1,
          // data:[],
          click: (d, i) => {
            console.log(d,i)
            this.od = d;
            this.oi = i;
            this.$refs.oinputColor.click();
          },
        },
        tooltip: [
          function(d) {
          return `<span>x：${d.x}</span><br><span>y：${
            d.y
          }</span><br><span>color：${d.category}</span>`;
        },
        function(d) {
          return `<span>x：${d.x}</span><br><span>y：${
            d.y
          }</span><br><span>category：${d.category}</span>`;
        }]
      }
    };
  },
  mounted() {
    var data = [
      {
        MapTitle: "Homologous recombination",
        AdjustedPv: 0.0421377037989652,
        x: 17,
        y: 55
      },
      {
        MapTitle: "aGlycolysis / Gluconeogenesis",
        AdjustedPv: 0.492079651703777,
        x: 12,
        y: 200
      },
      {
        MapTitle: "Pyruvate metabolism",
        AdjustedPv: 0.032295999168308,
        x: 8,
        y: 140
      },
      {
        MapTitle: "N-Glycan biosynthesis",
        AdjustedPv: 0.132295999168308,
        x: 13,
        y: 55
      },
      {
        MapTitle: "bGlycosaminoglycan biosynthesis - heparan sulfate",
        AdjustedPv: 0.232295999168308,
        x: 9,
        y: 35
      },
      {
        MapTitle: "Phenylalanine metabolism",
        AdjustedPv: 0.332295999168308,
        x: 27,
        y: 140
      },
      {
        MapTitle: "cGlycosaminoglycan biosynthesis - chondroitin sulfate",
        AdjustedPv: 0.432295999168308,
        x: 9,
        y: 36
      },
      {
        MapTitle: "Ubiquitin mediated proteolysis",
        AdjustedPv: 0.532295999168308,
        x: 20,
        y: 231
      },
      {
        MapTitle: "Biosynthesis of siderophore group nonribosomal peptides",
        AdjustedPv: 0.632295999168308,
        x: 3,
        y: 7
      },
      {
        MapTitle: "Citrate cycle (TCA cycle)",
        AdjustedPv: 0.732295999168308,
        x: 6,
        y: 98
      },
      {
        MapTitle: "Pathways in cancer",
        AdjustedPv: 0.832295999168308,
        x: 3,
        y: 66
      },
      {
        MapTitle: "dGlycosphingolipid biosynthesis - globo series",
        AdjustedPv: 0.932295999168308,
        x: 5,
        y: 17
      },
      {
        MapTitle: "Base excision repair",
        AdjustedPv: 1.032295999168308,
        x: 15,
        y: 72
      },
      {
        MapTitle: "Nucleotide excision repair",
        AdjustedPv: 1.132295999168308,
        x: 10,
        y: 43
      },
      {
        MapTitle: "Alzheimer's disease",
        AdjustedPv: 1.2932295999168308,
        x: 5,
        y: 82
      },
      {
        MapTitle: "Alanine, aspartate and glutamate metabolism",
        AdjustedPv: 1.3932295999168308,
        x: 15,
        y: 74
      },
      {
        MapTitle: "Sulfur metabolism",
        AdjustedPv: 1.4932295999168308,
        x: 2,
        y: 48
      },
      {
        MapTitle: "Lipoic acid metabolism",
        AdjustedPv: 1.01932295999168308,
        x: 3,
        y: 9
      },
      {
        MapTitle: "VEGF signaling pathway",
        AdjustedPv: 1.1132295999168308,
        x: 1,
        y: 33
      },
      {
        MapTitle: "Novobiocin biosynthesis",
        AdjustedPv: 1.1932295999168308,
        x: 6,
        y: 25
      }
    ];

    var realData = [];
    data.forEach(function(d, i) {
      realData.push({
        y: d.MapTitle,
        x: d.y,
        category:d.MapTitle //图例分类。图例数据：this.config.legend.data存在且有值，否则category为图例数据
      });
    });
    this.config.chart.data = realData;

    var otherData=[];

    data.forEach(function(d, i) {
      otherData.push({
          x:d.MapTitle,
          y:d.x / d.y,
          category:d.AdjustedPv
      })
    })
    this.config.chart.otherData=otherData;

    this.chart = this.d4.init(this.config);
  },
  methods: {
    redraw() {
      this.chart.redraw();
    },
    deepRedraw() {
      this.chart.redraw(true);
    },
    colorChange(event) {
      this.chart.setColor(event.target.value, this.i);
      this.chart.redraw();
    },
    ocolorChange(event){
      this.chart.setColor(event.target.value, this.oi,'otherColors');
      this.chart.redraw();
    },
    single() {
      this.selectedModule = "single";
      this.chart.setChartSelectModule(this.selectedModule);
    },
    multiple() {
      this.selectedModule = "multiple";
      this.chart.setChartSelectModule(this.selectedModule);
    }
  }
};
</script>


