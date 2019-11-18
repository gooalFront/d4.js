<template>
	<div id="cluster-chart">
	<h3>聚类热图</h3>
	<el-button size="small" @click="redraw">Redraw</el-button>
	<el-button size="small" @click="deepRedraw">deepRedraw</el-button>
	<el-button size="small" @click="single">单选</el-button>
	<el-button size="small" @click="multiple">多选</el-button>
	<input type="color" ref="inputColor" @change="colorChange">
	<div class="chart-content" id="chart-cluster"></div>
	<codemirror ref='code' v-model="code" :options="options"></codemirror>
</div>
</template>

<script>
export default {
  name: "clusterChart",
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
	 {
        chart: {
          title: "聚类热图",
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
          el: "#chart-cluster",
          type: "cluster",
          data: [],
          colors: ["#ff0000", "#ffffff", "#0070c0"],
          heatmap: {
            width: 480,
            height: 480
          },
          leftCluster: {
            show: true
            // stroke:"#ccc"
          },
          topCluster: {
            show: true,
            // stroke: "#ccc"
		  },
		  //   enableChartSelect:true,
          //   selectedModule: "",
          onselect: data => {
            console.log(data);
          },
        },
        axis: {
          x: {
            title: "样本",
            rotate: 30,
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setXTitle(name);
                this.updateTitle();
              }
            }
          },
          y: {
            show: true
          }
        },
        legend: {
          show: true,
          type: "gradient",
        //   min: -3,
        //   max: 3,
          data: [],
		  position: "right",
		  dblclick:(d,i)=>{
			this.d = d;
            this.i = i;
            this.$refs.inputColor.click();
		  }
        },
        tooltip: function(d) {
          return "<span>基因：d.x</span><br><span>y：d.y</span>";
        }
      }
	  `,
      chart: null,
      config: {
        chart: {
          title: "聚类热图",
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
              .text("双击修改标题");
          },
          mouseout: function(event, titleObj) {
            titleObj.attr("fill", "#333");
            titleObj.select("title").remove();
          },
          el: "#chart-cluster",
          type: "cluster",
          data: [],
          colors: ["#ff0000", "#ffffff", "#0070c0", "#FEF6B2"],
          heatmap: {
            width: 480,
            height: 480
          },
          leftCluster: {
            show: true
            // stroke:"#ccc"
          },
          topCluster: {
            show: true
            // stroke: "#ccc"
          },
          //   enableChartSelect:true,
          //   selectedModule: "",
          onselect: data => {
            console.log(data);
          }
        },
        axis: {
          x: {
            title: "样本",
            rotate: 30,
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setXTitle(name);
                this.updateTitle();
              }
            },
            mouseover: function(event, title) {
              title
                .attr("fill", "blue")
                .append("title")
                .text("双击修改x标题");
            },
            mouseout: function(event, title) {
              title.attr("fill", "#333");
              title.select("title").remove();
            }
          },
          y: {
            show: true
          }
        },
        legend: {
          show: true,
          type: "gradient",
          min: -5,
          max: 5,
          data: [],
          position: "right",
          dblclick: (d, i) => {
            this.d = d;
            this.i = i;
            this.$refs.inputColor.click();
          },
          mouseover: function(event, legendObj) {
            legendObj.append("title").text("双击修改颜色");
          },
          mouseout: function(event, legendObj) {
            legendObj.select("title").remove();
          }
        },
        tooltip: function(d) {
          return `<span>基因：${d.x}</span><br><span>y：${d.y}</span>`;
        }
      }
    };
  },
  mounted() {
    var data = {
      leftCluster: {
        name: "",
        children: [
          {
            name: "53417"
          },
          {
            name: "",
            children: [
              {
                name: "100041759"
              },
              {
                name: "100041787"
              }
            ]
          }
        ]
      },
      topCluster: {
        name: "",
        children: [
          {
            name: "BT3"
          },
          {
            name: "",
            children: [
              {
                name: "BT1"
              },
              {
                name: "BT2"
              }
            ]
          }
        ]
      },
      heatmapData: [
        {
          name: "BT3",
          heatmap: [
            {
              x: "53417",
              y: 0.0840642647884745
            },
            {
              x: "100041759",
              y: 3.2735158897021197
            },
            {
              x: "100041787",
              y: 4.31397137105902
            }
          ]
        },
        {
          name: "BT1",
          heatmap: [
            {
              x: "53417",
              y: 0.20163386116964999
            },
            {
              x: "100041759",
              y: 2.25701061820602
            },
            {
              x: "100041787",
              y: 3.35895882583233
            }
          ]
        },
        {
          name: "BT2",
          heatmap: [
            {
              x: "53417",
              y: 0.124328135002202
            },
            {
              x: "100041759",
              y: 1.72246602447109
            },
            {
              x: "100041787",
              y: 2.91456452349394
            }
          ]
        }
      ]
    };

    var heatmapData = data.heatmapData;
    var dataLength = heatmapData.length;
    var xData = [],
      legendData = [];

    for (var i = 0; i < dataLength; i++) {
      xData.push(heatmapData[i].name);
      var heatmapLength = heatmapData[i].heatmap.length;
      for (var j = 0; j < heatmapLength; j++) {
        legendData.push(heatmapData[i].heatmap[j].y);
      }
    }

    this.config.chart.data = data;
    this.config.legend.data = legendData;

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

