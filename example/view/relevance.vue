<template>
  <div id="relevance-chart">
    <h3>相关性图</h3>
    <el-button size="small" @click="redraw">Redraw</el-button>
    <el-button size="small" @click="deepRedraw">deepRedraw</el-button>
    <el-button size="small" @click="single">单选</el-button>
    <el-button size="small" @click="multiple">多选</el-button>
    <input type="color" ref="inputColor" @change="colorChange">
    <div class="chart-content" id="chart-relevance"></div>
    <!-- <codemirror ref="code" v-model="code" :options="options"></codemirror> -->
  </div>
</template>

<script>
export default {
  name: "relevanceChart",
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
	  `,
      chart: null,
      config: {
        chart: {
          title: "相关性图",
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
          el: "#chart-relevance",
          type: "relevance",
          data: [],
          colors: ["#deecf7","#0f529a"],
          showText:true,
          //   enableChartSelect:true,
          //   selectedModule: "",
          onselect: data => {
            console.log(data);
          }
        },
        axis: {
          x: {
            title: "x样本",
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
            title: "y样本",
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setYTitle(name);
                this.updateTitle();
              }
            },
            mouseover: function(event, title) {
              title
                .attr("fill", "blue")
                .append("title")
                .text("双击修改y标题");
            },
            mouseout: function(event, title) {
              title.attr("fill", "#333");
              title.select("title").remove();
            }
          }
        },
        legend: {
          show: true,
          type: "gradient",
          // min: -5,
          // max: 5,
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
          return `<span>x：${d.x}</span><br><span>y：${d.y}</span><br><span>category：${d.category}</span>`;
        }
      }
    };
  },
  mounted() {
    var data = {
      chartData: [
        { x: 0, y: 0, value: 1.0, sample1: "HBRR1", sample2: "HBRR1" },
        { x: 0, y: 1, value: 0.9986954, sample1: "HBRR1", sample2: "HBRR2" },
        { x: 0, y: 2, value: 0.9990913, sample1: "HBRR1", sample2: "HBRR3" },
        { x: 0, y: 3, value: 0.6653944, sample1: "HBRR1", sample2: "UHRR1" },
        { x: 0, y: 4, value: 0.6511694, sample1: "HBRR1", sample2: "UHRR2" },
        { x: 0, y: 5, value: 0.6992406, sample1: "HBRR1", sample2: "UHRR3" },
        { x: 1, y: 0, value: 0.9986954, sample1: "HBRR2", sample2: "HBRR1" },
        { x: 1, y: 1, value: 1.0, sample1: "HBRR2", sample2: "HBRR2" },
        {
          x: 1,
          y: 2,
          value: 0.9992274999999999,
          sample1: "HBRR2",
          sample2: "HBRR3"
        },
        { x: 1, y: 3, value: 0.6681957, sample1: "HBRR2", sample2: "UHRR1" },
        {
          x: 1,
          y: 4,
          value: 0.6532098000000001,
          sample1: "HBRR2",
          sample2: "UHRR2"
        },
        { x: 1, y: 5, value: 0.7005845, sample1: "HBRR2", sample2: "UHRR3" },
        { x: 2, y: 0, value: 0.9990913, sample1: "HBRR3", sample2: "HBRR1" },
        {
          x: 2,
          y: 1,
          value: 0.9992274999999999,
          sample1: "HBRR3",
          sample2: "HBRR2"
        },
        { x: 2, y: 2, value: 1.0, sample1: "HBRR3", sample2: "HBRR3" },
        { x: 2, y: 3, value: 0.6565749, sample1: "HBRR3", sample2: "UHRR1" },
        { x: 2, y: 4, value: 0.6423825, sample1: "HBRR3", sample2: "UHRR2" },
        {
          x: 2,
          y: 5,
          value: 0.6887486999999999,
          sample1: "HBRR3",
          sample2: "UHRR3"
        },
        { x: 3, y: 0, value: 0.6653944, sample1: "UHRR1", sample2: "HBRR1" },
        { x: 3, y: 1, value: 0.6681957, sample1: "UHRR1", sample2: "HBRR2" },
        { x: 3, y: 2, value: 0.6565749, sample1: "UHRR1", sample2: "HBRR3" },
        { x: 3, y: 3, value: 1.0, sample1: "UHRR1", sample2: "UHRR1" },
        { x: 3, y: 4, value: 0.9934458, sample1: "UHRR1", sample2: "UHRR2" },
        { x: 3, y: 5, value: 0.9902178, sample1: "UHRR1", sample2: "UHRR3" },
        { x: 4, y: 0, value: 0.6511694, sample1: "UHRR2", sample2: "HBRR1" },
        {
          x: 4,
          y: 1,
          value: 0.6532098000000001,
          sample1: "UHRR2",
          sample2: "HBRR2"
        },
        { x: 4, y: 2, value: 0.6423825, sample1: "UHRR2", sample2: "HBRR3" },
        { x: 4, y: 3, value: 0.9934458, sample1: "UHRR2", sample2: "UHRR1" },
        { x: 4, y: 4, value: 1.0, sample1: "UHRR2", sample2: "UHRR2" },
        {
          x: 4,
          y: 5,
          value: 0.9808735000000001,
          sample1: "UHRR2",
          sample2: "UHRR3"
        },
        { x: 5, y: 0, value: 0.6992406, sample1: "UHRR3", sample2: "HBRR1" },
        { x: 5, y: 1, value: 0.7005845, sample1: "UHRR3", sample2: "HBRR2" },
        {
          x: 5,
          y: 2,
          value: 0.6887486999999999,
          sample1: "UHRR3",
          sample2: "HBRR3"
        },
        { x: 5, y: 3, value: 0.9902178, sample1: "UHRR3", sample2: "UHRR1" },
        {
          x: 5,
          y: 4,
          value: 0.9808735000000001,
          sample1: "UHRR3",
          sample2: "UHRR2"
        },
        { x: 5, y: 5, value: 1.0, sample1: "UHRR3", sample2: "UHRR3" }
      ],
    };

    var chartdata=[];
    data.chartData.forEach(d => {
       chartdata.push({
           x:d.sample1,
           y:d.sample2,
           category:d.value,
           i:d.x,
           j:d.y
       }) 
    });

    this.config.chart.data = chartdata;

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

