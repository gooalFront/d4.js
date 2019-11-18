<template>
    <div id="line-chart">
        <h3>基础折线图</h3>
        <p class="text">折线图用于显示数据在一个连续的时间间隔或者时间跨度上的变化，它的特点是反映事物随时间或有序类别而变化的趋势。</p>
		<el-button size="small" @click="redraw">重画</el-button>
		<el-button size="small" @click="set('cardinal')">cardinal</el-button>
		<el-button size="small" @click="set('basic')">basic</el-button>
		<el-button size="small" @click="set('step')">step</el-button>
		<el-button size="small" @click="set('linear')">linear</el-button>
		x:
 		<el-button size="small" @click="changeXAxis('bottom')">bottom</el-button>
 		<el-button size="small" @click="changeXAxis('top')">top</el-button>
		 &emsp;y:
 		<el-button size="small" @click="changeYAxis('left')">left</el-button>
 		<el-button size="small" @click="changeYAxis('right')">right</el-button>

		<div class="chart-content" id="chart-line"></div>
		<codemirror ref="code"
			v-model="code"
			:options="options"
		></codemirror>
    </div>
</template>

<script>
export default {
  name: "lineChart",
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
			chart: {
				title: "折线图",
				smooth:true,
				dblclick: function(event) {
					var name = prompt("请输入需要修改的标题", "");
					if (name) {
					this.setChartTitle(name);
					this.updateTitle();
				}
			},
			el: "#chart-line",
			type: "line",
			data: [
				{ key: 0, value: 17 },
				{ key: 20, value: 46 },
				{ key: 100, value: 100 },
				{ key: 30, value: 291 },
				{ key: 40, value: 32 },
				{ key: 50, value: 285 },
				{ key: 60, value: 218 },
				{ key: 70, value: 212 },
				{ key: 80, value: 38 },
				{ key: 90, value: 76 }
			]
			},
			axis: {
				x: {
					title: "x标题",
					rotate: 60,
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
				}
			},
			"tooltip": function(d) {
				return "<span>x:"+d.key+"</span><br><span>y:"+d.value+"</span>"
			}`,
      chart: null,
      config: {
        chart: {
          title: "折线图",
          interpolate: "cardinal", // cardinal basic step  linear
          dblclick: function(event) {
            var name = prompt("请输入需要修改的标题", "");
            if (name) {
              this.setChartTitle(name);
              this.updateTitle();
            }
          },
          custom: ["key", "value"],
          el: "#chart-line",
          type: "line",
          data: [
            { key: 0, value: 17 },
            { key: 20, value: 46 },
            { key: 30, value: 291 },
            { key: 40, value: 32 },
            { key: 50, value: 285 },
            { key: 60, value: 218 },
            { key: 70, value: 212 },
            { key: 80, value: 38 },
            { key: 90, value: 76 },
            { key: 100, value: 100 }
          ]
        },
        axis: {
          x: {
            title: "x标题",
            rotate: 60,
            position: "bottom",
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
			},
			position:"left"
          }
        },
        legend: {
          show: true,
        },
        tooltip: function(d) {
          return `<span>x:${d.key}</span><br><span>y:${d.value}</span>`;
        }
      }
    };
  },
  mounted() {
    this.chart = this.d4.init(this.config);
  },
  methods: {
    redraw() {
      this.chart.redraw();
    },
    set(type) {
      var p = this.chart.getOptions();
      p.chart.interpolate = type;
      this.chart.setOptions(p);
      this.chart.redraw();
	},
	changeXAxis(pos){
		var p = this.chart.getOptions();
		p.axis.x.position = pos;
		this.chart.setOptions(p);
		this.chart.redraw();
	},
	changeYAxis(pos){
		var p = this.chart.getOptions();
		p.axis.y.position = pos;
		this.chart.setOptions(p);
		this.chart.redraw();
	}
  }
};
</script>
