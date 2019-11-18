<template>
    <div id="horizontal-bar-chart">
        <h3>水平柱状图</h3>
        <p class="text">使用水平的柱子显示类别之间的数值比较。其中一个轴表示需要对比的分类维度，另一个轴代表相应的数值。</p>
		<el-button size="small" @click="redraw">重画</el-button>
		<el-button size="small" @click="deepRedraw">deepRedraw</el-button>
		<el-button size="small" @click="changeDirection">切换方向</el-button>
		&emsp;current:{{curDirection}}
		<el-button size="small" @click="single">单选</el-button>
		<el-button size="small" @click="multiple">多选</el-button>

		x:
 		<el-button size="small" @click="changeXAxis('bottom')">bottom</el-button>
 		<el-button size="small" @click="changeXAxis('top')">top</el-button>
		 &emsp;y:
 		<el-button size="small" @click="changeYAxis('left')">left</el-button>
 		<el-button size="small" @click="changeYAxis('right')">right</el-button>

		<input ref="inputColor" @change="colorChange" type="color">
		<div class="chart-content" style="height:800px" id="chart-bar"></div>
		<codemirror ref="code"
			v-model="code"
			:options="options"
		></codemirror>
    </div>
</template>

<script>
export default {
  name: "horizontalBarChart",
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
      curDirection: "horizontal",
      code: `
			chart: {
				title: "水平柱状图",
				dblclick: function(event) {
					var name = prompt("请输入需要修改的标题", "");
					if (name) {
						this.setChartTitle(name);
						this.updateTitle();
					}
				},
				custom: ["num", "go_level2", "go_level1"],
				el: "#chart-bar",
				type: "bar",
				direction:"horizontal", // vertical default
				data: [
						{
							"go_level2": "antioxidant activity",
							"go_level1": "molecular_function",
							"num": 26
						},
						{
							"go_level2": "behavior",
							"go_level1": "biological_process",
							"num": 223
						},
						{
							"go_level2": "binding",
							"go_level1": "molecular_function",
							"num": 6031
						},
						{
							"go_level2": "biological adhesion",
							"go_level1": "biological_process",
							"num": 348
						},
						{
							"go_level2": "biological phase",
							"go_level1": "biological_process",
							"num": 226
						},
						{
							"go_level2": "biological regulation",
							"go_level1": "biological_process",
							"num": 3834
						},
						{
							"go_level2": "catalytic activity",
							"go_level1": "molecular_function",
							"num": 2709
						},
						{
							"go_level2": "cell",
							"go_level1": "cellular_component",
							"num": 6486
						},
						{
							"go_level2": "cell aggregation",
							"go_level1": "biological_process",
							"num": 9
						},
						{
							"go_level2": "cell junction",
							"go_level1": "cellular_component",
							"num": 359
						},
						{
							"go_level2": "cell killing",
							"go_level1": "biological_process",
							"num": 34
						},
						{
							"go_level2": "cell part",
							"go_level1": "cellular_component",
							"num": 6485
						},
						{
							"go_level2": "cell proliferation",
							"go_level1": "biological_process",
							"num": 683
						},
						{
							"go_level2": "cellular component organization or biogenesis",
							"go_level1": "biological_process",
							"num": 1971
						},
						{
							"go_level2": "cellular process",
							"go_level1": "biological_process",
							"num": 5976
						},
						{
							"go_level2": "detoxification",
							"go_level1": "biological_process",
							"num": 2
						},
						{
							"go_level2": "developmental process",
							"go_level1": "biological_process",
							"num": 2259
						},
						{
							"go_level2": "extracellular region",
							"go_level1": "cellular_component",
							"num": 913
						},
						{
							"go_level2": "extracellular region part",
							"go_level1": "cellular_component",
							"num": 845
						},
						{
							"go_level2": "growth",
							"go_level1": "biological_process",
							"num": 326
						},
						{
							"go_level2": "hijacked molecular function",
							"go_level1": "molecular_function",
							"num": 10
						},
						{
							"go_level2": "immune system process",
							"go_level1": "biological_process",
							"num": 882
						},
						{
							"go_level2": "virion part",
							"go_level1": "cellular_component",
							"num": 7
						},
						{
							"go_level2": "nitrogen utilization",
							"go_level1": "biological_process",
							"num": 3,
						}, {
							"go_level2": "nucleoid",
							"go_level1": "cellular_component",
							"num": 4,
						}, {
							"go_level2": "organelle",
							"go_level1": "cellular_component",
							"num": 5145,
						}, {
							"go_level2": "organelle part",
							"go_level1": "cellular_component",
							"num": 3144,
						}, {
							"go_level2": "other organism",
							"go_level1": "cellular_component",
							"num": 17,
						}, {
							"go_level2": "other organism part",
							"go_level1": "cellular_component",
							"num": 17,
						}, {
							"go_level2": "pigmentation",
							"go_level1": "biological_process",
							"num": 24,
						}, {
							"go_level2": "positive regulation of biological process",
							"go_level1": "biological_process",
							"num": 1375,
						}, {
							"go_level2": "presynaptic process involved in chemical synaptic transmission",
							"go_level1": "biological_process",
							"num": 40,
						}, {
							"go_level2": "protein tag",
							"go_level1": "molecular_function",
							"num": 1,
						}, {
							"go_level2": "regulation of biological process",
							"go_level1": "biological_process",
							"num": 3486,
						}, {
							"go_level2": "reproduction",
							"go_level1": "biological_process",
							"num": 479,
						}, {
							"go_level2": "reproductive process",
							"go_level1": "biological_process",
							"num": 478,
						}, {
							"go_level2": "response to stimulus",
							"go_level1": "biological_process",
							"num": 3079,
						}, {
							"go_level2": "rhythmic process",
							"go_level1": "biological_process",
							"num": 108,
						}, {
							"go_level2": "signal transducer activity",
							"go_level1": "molecular_function",
							"num": 701,
						}, {
							"go_level2": "signaling",
							"go_level1": "biological_process",
							"num": 2368,
						}, {
							"go_level2": "structural molecule activity",
							"go_level1": "molecular_function",
							"num": 304,
						}, {
							"go_level2": "supramolecular complex",
							"go_level1": "cellular_component",
							"num": 232,
						}, {
							"go_level2": "synapse",
							"go_level1": "cellular_component",
							"num": 208,
						}, {
							"go_level2": "synapse part",
							"go_level1": "cellular_component",
							"num": 162,
						}, {
							"go_level2": "transcription regulator activity",
							"go_level1": "molecular_function",
							"num": 355,
						}, {
							"go_level2": "translation regulator activity",
							"go_level1": "molecular_function",
							"num": 13,
						}, {
							"go_level2": "transporter activity",
							"go_level1": "molecular_function",
							"num": 587,
						}, {
							"go_level2": "virion",
							"go_level1": "cellular_component",
							"num": 7,
						}, {
							"go_level2": "virion part",
							"go_level1": "cellular_component",
							"num": 7,
						}
					]
			},
			axis: {
				x: {
					title: "x标题",
					dblclick: function(event) {
					var name = prompt("请输入需要修改的标题", "");
						if (name) {
							this.setXTitle(name);
							this.updateTitle();
						}
					},
					rotate:60
				},
				y: {
					title: "y标题",
					dblclick: function(event) {
					var name = prompt("请输入需要修改的标题", "");
						if (name) {
							this.setYTitle(name);
							this.updateTitle();
						}
					}
				}
			},
			legend: {
				show: true,
				position: "right",
				dblclick:function(el){
					console.log(el)
				}
			},
			tooltip: function(d) {
				return "<span>Number："+d.num+"</span><br><span>Level2："+d.go_level2+"</span>";
			}
	}`,
      chart: null,
      i: 0,
      config: {
        chart: {
          title: "水平柱状图",
          dblclick: function(event) {
            var name = prompt("请输入需要修改的标题", "");
            if (name) {
              this.setChartTitle(name);
              this.updateTitle();
            }
          },
          onselect: function(data) {
            console.log(data);
          },
		  width:600,
          enableChartSelect: true,
          padding: 0.4,
          selectedModule: "multiple",
          custom: ["num", "go_level2", "go_level1"],
          el: "#chart-bar",
          type: "bar",
          direction: "horizontal", // vertical default
          data: [
            {
              go_level2: "antioxidant activity",
              go_level1: "molecular_function",
              num: 26
            },
            {
              go_level2: "behavior",
              go_level1: "biological_process",
              num: 223
            },
            {
              go_level2: "binding",
              go_level1: "molecular_function",
              num: 6031
            },
            {
              go_level2: "biological adhesion",
              go_level1: "biological_process",
              num: 348
            },
            {
              go_level2: "biological phase",
              go_level1: "biological_process",
              num: 226
            },
            {
              go_level2: "biological regulation",
              go_level1: "biological_process",
              num: 3834
            },
            {
              go_level2: "catalytic activity",
              go_level1: "molecular_function",
              num: 2709
            },
            {
              go_level2: "cell",
              go_level1: "cellular_component",
              num: 6486
            },
            {
              go_level2: "cell aggregation",
              go_level1: "biological_process",
              num: 9
            },
            {
              go_level2: "cell junction",
              go_level1: "cellular_component",
              num: 359
            },
            {
              go_level2: "cell killing",
              go_level1: "biological_process",
              num: 34
            },
            {
              go_level2: "cell part",
              go_level1: "cellular_component",
              num: 6485
            },
            {
              go_level2: "cell proliferation",
              go_level1: "biological_process",
              num: 683
            },
            {
              go_level2: "cellular component organization or biogenesis",
              go_level1: "biological_process",
              num: 1971
            },
            {
              go_level2: "cellular process",
              go_level1: "biological_process",
              num: 5976
            },
            {
              go_level2: "detoxification",
              go_level1: "biological_process",
              num: 2
            },
            {
              go_level2: "developmental process",
              go_level1: "biological_process",
              num: 2259
            },
            {
              go_level2: "extracellular region",
              go_level1: "cellular_component",
              num: 913
            },
            {
              go_level2: "extracellular region part",
              go_level1: "cellular_component",
              num: 845
            },
            {
              go_level2: "growth",
              go_level1: "biological_process",
              num: 326
            },
            {
              go_level2: "hijacked molecular function",
              go_level1: "molecular_function",
              num: 10
            },
            {
              go_level2: "immune system process",
              go_level1: "biological_process",
              num: 882
            },
            {
              go_level2: "virion part",
              go_level1: "cellular_component",
              num: 7
            },
            {
              go_level2: "nitrogen utilization",
              go_level1: "biological_process",
              num: 3
            },
            {
              go_level2: "nucleoid",
              go_level1: "cellular_component",
              num: 4
            },
            {
              go_level2: "organelle",
              go_level1: "cellular_component",
              num: 5145
            },
            {
              go_level2: "organelle part",
              go_level1: "cellular_component",
              num: 3144
            },
            {
              go_level2: "other organism",
              go_level1: "cellular_component",
              num: 17
            },
            {
              go_level2: "other organism part",
              go_level1: "cellular_component",
              num: 17
            },
            {
              go_level2: "pigmentation",
              go_level1: "biological_process",
              num: 24
            },
            {
              go_level2: "positive regulation of biological process",
              go_level1: "biological_process",
              num: 1375
            },
            {
              go_level2:
                "presynaptic process involved in chemical synaptic transmission",
              go_level1: "biological_process",
              num: 40
            },
            {
              go_level2: "protein tag",
              go_level1: "molecular_function",
              num: 1
            },
            {
              go_level2: "regulation of biological process",
              go_level1: "biological_process",
              num: 3486
            },
            {
              go_level2: "reproduction",
              go_level1: "biological_process",
              num: 479
            },
            {
              go_level2: "reproductive process",
              go_level1: "biological_process",
              num: 478
            },
            {
              go_level2: "response to stimulus",
              go_level1: "biological_process",
              num: 3079
            },
            {
              go_level2: "rhythmic process",
              go_level1: "biological_process",
              num: 108
            },
            {
              go_level2: "signal transducer activity",
              go_level1: "molecular_function",
              num: 701
            },
            {
              go_level2: "signaling",
              go_level1: "biological_process",
              num: 2368
            },
            {
              go_level2: "structural molecule activity",
              go_level1: "molecular_function",
              num: 304
            },
            {
              go_level2: "supramolecular complex",
              go_level1: "cellular_component",
              num: 232
            },
            {
              go_level2: "synapse",
              go_level1: "cellular_component",
              num: 208
            },
            {
              go_level2: "synapse part",
              go_level1: "cellular_component",
              num: 162
            },
            {
              go_level2: "transcription regulator activity",
              go_level1: "molecular_function",
              num: 355
            },
            {
              go_level2: "translation regulator activity",
              go_level1: "molecular_function",
              num: 13
            },
            {
              go_level2: "transporter activity",
              go_level1: "molecular_function",
              num: 587
            },
            {
              go_level2: "virion",
              go_level1: "cellular_component",
              num: 7
            },
            {
              go_level2: "virion part",
              go_level1: "cellular_component",
              num: 7
            }
          ]
        },
        axis: {
          x: {
            title: "x标题",
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setXTitle(name);
                this.updateTitle();
              }
            },
			ticks:6,
            position: "bottom",
            rotate: 60
          },
          y: {
            title: "y标题",
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setYTitle(name);
                this.updateTitle();
              }
            },
            position: "left"
          }
        },
        legend: {
          show: true,
          title: "图例标题",
          position: "right",
          dblclick: (d, i) => {
            this.$refs.inputColor.click();
            this.i = i;
          }
        },
        tooltip: function(d) {
          return `<span>Number：${d.num}</span><br><span>Level2：${
            d.go_level2
          }</span>`;
        }
      }
    };
  },
  mounted() {
    this.chart = this.d4.init(this.config);
	console.log(this.chart);
  },
  methods: {
    redraw() {
      this.chart.redraw();
    },
    deepRedraw() {
      this.chart.redraw(true);
    },
    single() {
      this.selectedModule = "single";
      this.chart.setChartSelectModule(this.selectedModule);
    },
    multiple() {
      this.selectedModule = "multiple";
      this.chart.setChartSelectModule(this.selectedModule);
    },
    colorChange(event) {
      this.chart.setColor(event.target.value, this.i);
      this.chart.redraw();
    },
    changeDirection() {
      var p = this.chart.getOptions();
      if (this.curDirection === "horizontal") {
        this.curDirection = "vertical";
        p.chart.title = "vertical-bar-chart";
        p.chart.direction = this.curDirection;
        p.chart.custom = ["go_level2", "num", "go_level1"];
      } else {
        this.curDirection = "horizontal";
        p.chart.title = "horizontal-bar-chart";
        p.chart.direction = this.curDirection;
        p.chart.custom = ["num", "go_level2", "go_level1"];
      }
      this.chart.setOptions(p);
      this.chart.redraw();
    },
    changeXAxis(pos) {
      var p = this.chart.getOptions();
      p.axis.x.position = pos;
      this.chart.setOptions(p);
      this.chart.redraw();
    },
    changeYAxis(pos) {
      var p = this.chart.getOptions();
      p.axis.y.position = pos;
      this.chart.setOptions(p);
      this.chart.redraw();
    }
  }
};
</script>
