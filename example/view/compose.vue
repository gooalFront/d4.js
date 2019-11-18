<template>
    <div id="compose-chart">
        <h3>组合图</h3>
        <p class="text">使用垂直的柱子显示类别之间的数值比较。其中一个轴表示需要对比的分类维度，另一个轴代表相应的数值。</p>
		<el-button size="small" @click="redraw">重画</el-button>
		<el-button size="small" @click="deepRedraw">deepRedraw</el-button>
		<el-button size="small" @click="single">单选</el-button>
		<el-button size="small" @click="multiple">多选</el-button>

		x:
 		<el-button size="small" @click="changeXAxis('bottom')">bottom</el-button>
 		<el-button size="small" @click="changeXAxis('top')">top</el-button>
		 &emsp;y:
 		<el-button size="small" @click="changeYAxis('left')">left</el-button>
 		<el-button size="small" @click="changeYAxis('right')">right</el-button>

		<input ref="inputColor" @change="colorChange" type="color">
		<div class="chart-content" id="chart-compose" style="height:600px;"></div>
		<codemirror ref="code"
			v-model="code"
			:options="options"
		></codemirror>
    </div>
</template>

<script>
export default {
  name: "composeChart",
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
			title: "柱状图",
			dblclick: function(event) {
				var name = prompt("请输入需要修改的标题", "");
				if (name) {
				this.setChartTitle(name);
				this.updateTitle();
				}
			},
			custom: ["key", "value","value"],
			el: "#chart-compose",
			type: "compose",
			data: [
				{ key: "一月", value: 145 },
				{ key: "二月", value: 220 },
				{ key: "三月", value: 1850 },
				{ key: "四月", value: 590 },
				{ key: "五月", value: 200 },
				{ key: "六月", value: 480 },
				{ key: "七月", value: 1260 },
				{ key: "八月", value: 597 },
				{ key: "九月", value: 168 }
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
				}
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
			},
			legend: {
				show: true,
				position: "right"
			},
			"tooltip": function(d) {
				return "<span>x:"+d.key+"</span><span>y:"+d.value+"</span>"
			}
		}`,
      chart: null,
      selectedModule: "",
      d: "",
      i: "",
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
          //   enableChartSelect: false, // enable chart select apply selectedModule->'single'
          selectedModule: "single",
          onselect: data => {
            console.log(data);
          },
          custom: [["key", "value", "key"], ["key", "value","key"]],
          el: "#chart-compose",
          type: ["bar", "line"],
          data: [
            [
              { key: "一月", value: 145 },
              { key: "二月", value: 220 },
              { key: "三月", value: 1850 },
              { key: "四月", value: 590 },
              { key: "五月", value: 200 },
              { key: "六月", value: 480 },
              { key: "七月", value: 1260 },
              { key: "八月", value: 597 },
              { key: "九月", value: 168 }
            ],
            [
              { key: 0, value: 17 },
              { key: 20, value: 46 },
              { key: 100, value: 10 },
              { key: 30, value: 291 },
              { key: 40, value: 32 },
              { key: 50, value: 285 },
              { key: 60, value: 218 },
              { key: 70, value: 212 },
              { key: 80, value: 38 },
              { key: 90, value: 76 }
            ]
          ]
        },
        axis: {
          x: {
            title: "x标题1",
            position: "bottom",
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setXTitle(name);
                this.updateTitle();
              }
            },
            rotate: 60
          },
          y: {
            title: "y标题1",
            position: "left",
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setYTitle(name);
                this.updateTitle();
              }
            }
          },
          x0: {
            title: "x标题2",
            position: "top",
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setXTitle(name);
                this.updateTitle();
              }
            },
            rotate: 60
          },
          y0: {
            title: "y标题2",
            position: "right",
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setYTitle(name);
                this.updateTitle();
              }
            }
          }
        },
        legend: [
          {
            show: true,
            position: "right",
            dblclick: (d, i) => {
              this.d = d;
              this.i = i;
              console.log(d, i);
              this.$refs.inputColor.click();
            }
          },
          {
            show: true,
            position: "right",
            dblclick: (d, i) => {
              this.d = d;
              this.i = i;
              console.log(d, i);
              this.$refs.inputColor.click();
            }
          }
        ],
        tooltip: [
          function(d) {
            return (
              "<span>x：" + d.key + "</span><br><span>y：" + d.value + "</span>"
            );
          },
          function(d) {
            return (
              "<span>x：" + d.key + "</span><br><span>y：" + d.value + "</span>"
            );
          }
        ]
      }
    };
  },
  mounted() {
    this.chart = this.d4.init(this.config);
    this.selectedModule =
      this.config.chart.selectedModule ||
      (this.config.chart.enableChartSelect ? "single" : "");
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
      console.log(this.chart);
    },
    multiple() {
      this.selectedModule = "multiple";
      this.chart.setChartSelectModule(this.selectedModule);
    },
    colorChange(event) {
      this.chart.setColor(event.target.value, this.i);
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
