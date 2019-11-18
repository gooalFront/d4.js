<template>
    <div id="area-chart">
        <h3>面积图</h3>
        <p class="text"> 它是在折线图的基础之上形成的, 它将折线图中折线与自变量坐标轴之间的区域使用颜色或者纹理填充，这样一个填充区域我们叫做面积，颜色的填充可以更好的突出趋势信息。</p>
		<el-form :inline="true" :model="angle" class="demo-form-inline">
			<el-form-item>
				<el-button  size="small" @click="redraw">重画</el-button>
			</el-form-item>
			x:
			<el-button size="small" @click="changeXAxis('bottom')">bottom</el-button>
			<el-button size="small" @click="changeXAxis('top')">top</el-button>
			&emsp;y:
			<el-button size="small" @click="changeYAxis('left')">left</el-button>
			<el-button size="small" @click="changeYAxis('right')">right</el-button>
			<input ref="inputColor" @change="colorChange" type="color">
		</el-form>
		<div class="chart-content" id="chart-area"></div>
		<codemirror ref="code"
			v-model="code"
			:options="options"
		></codemirror>
    </div>
</template>

<script>
export default {
  name: "areaChart",
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
			title: "面积图",
			dblclick: function(event) {
				var name = prompt("请输入需要修改的标题", "");
				if (name) {
					this.setChartTitle(name);
					this.updateTitle();
				}
			},
			custom: ["year", "value","country"],
			el: "#chart-area", // area chart type
			type: "area",
			data: [
				{
					country: "Asia",
					year: "1750",
					value: 502
				},
				{
					country: "Asia",
					year: "1800",
					value: 635
				},
				{
					country: "Asia",
					year: "1850",
					value: 809
				},
				{
					country: "Oceania",
					year: "2050",
					value: 300
				}
			]
        },
        axis: {
			x: {
				title: "Year",
				dblclick: function(event) {
				var name = prompt("请输入需要修改的标题", "");
					if (name) {
						this.setXTitle(name);
						this.updateTitle();
					}
				}
			},
			y: {
				title: "Number",
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
			dblclick: function(el) {
				console.log(el);
			}
        },
        tooltip: function(d) {
			return (
				"<span>year：" +
				d.year +
				"</span><br><span>country：" +
				d.country +
				"</span><br><span>value："+d.value+"</span>"
			);
        }`,
      chart: null,
      angle: {
        start: 0,
        end: 360
      },
      radius: {
        inner: 0,
        outer: 150
      },
      config: {
        chart: {
          title: "面积图",
          dblclick: function(event) {
            var name = prompt("请输入需要修改的标题", "");
            if (name) {
              this.setChartTitle(name);
              this.updateTitle();
            }
          },
          radius: 1.5,
          custom: ["year", "value", "country"],
          interpolate: "linear",
          el: "#chart-area", // area chart type
          type: "area",
          data: [
            {
              country: "Asia",
              year: "1750",
              value: 502
            },
            {
              country: "Asia",
              year: "1800",
              value: 635
            },
            {
              country: "Asia",
              year: "1850",
              value: 809
            },
            {
              country: "Asia",
              year: "1900",
              value: 5268
            },
            {
              country: "Asia",
              year: "1950",
              value: 4400
            },
            {
              country: "Asia",
              year: "1999",
              value: 3634
            },
            {
              country: "Asia",
              year: "2050",
              value: 947
            },
            {
              country: "Africa",
              year: "1750",
              value: 106
            },
            {
              country: "Africa",
              year: "1800",
              value: 107
            },
            {
              country: "Africa",
              year: "1850",
              value: 111
            },
            {
              country: "Africa",
              year: "1900",
              value: 1766
            },
            {
              country: "Africa",
              year: "1950",
              value: 221
            },
            {
              country: "Africa",
              year: "1999",
              value: 767
            },
            {
              country: "Africa",
              year: "2050",
              value: 133
            },
            {
              country: "Europe",
              year: "1750",
              value: 163
            },
            {
              country: "Europe",
              year: "1800",
              value: 203
            },
            {
              country: "Europe",
              year: "1850",
              value: 276
            },
            {
              country: "Europe",
              year: "1900",
              value: 628
            },
            {
              country: "Europe",
              year: "1950",
              value: 547
            },
            {
              country: "Europe",
              year: "1999",
              value: 729
            },
            {
              country: "Europe",
              year: "2050",
              value: 408
            },
            {
              country: "Oceania",
              year: "1750",
              value: 200
            },
            {
              country: "Oceania",
              year: "1800",
              value: 200
            },
            {
              country: "Oceania",
              year: "1850",
              value: 200
            },
            {
              country: "Oceania",
              year: "1900",
              value: 460
            },
            {
              country: "Oceania",
              year: "1950",
              value: 230
            },
            {
              country: "Oceania",
              year: "1999",
              value: 300
            },
            {
              country: "Oceania",
              year: "2050",
              value: 300
            }
          ]
        },
        axis: {
          x: {
            title: "Year",
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setXTitle(name);
                this.updateTitle();
              }
            }
          },
          y: {
            title: "Number",
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setYTitle(name);
                this.updateTitle();
              }
            },
            formatter: function(val) {
              return d3.format(",.0f")(val);
            }
          }
        },
        legend: {
          show: true,
          position: "right",
          dblclick: (d, i) => {
            this.$refs.inputColor.click();
            this.i = i;
          }
        },
        tooltip: function(d) {
          return (
            "<span>year：" +
            d.year +
            "</span><br><span>country：" +
            d.country +
            "</span><br><span>value：" +
            d.value +
            "</span>"
          );
        }
      }
    };
  },
  mounted() {
    this.chart = this.d4.init(this.config);
  },
  methods: {
    redraw() {
      this.config.chart.startAngle = this.angle.start;
      this.config.chart.endAngle = this.angle.end;
      this.config.chart.innerRadius = this.radius.inner;
      this.config.chart.outerRadius = this.radius.outer;
      this.chart.setOptions(this.config);
      this.chart.redraw();
    },
    reset() {
      this.angle.start = 0;
      this.angle.end = 360;
      this.radius.inner = 0;
      this.radius.outer = 150;
      this.config.chart.showLabel = true;
      this.config.chart.startAngle = this.angle.start;
      this.config.chart.endAngle = this.angle.end;
      this.config.chart.innerRadius = this.radius.inner;
      this.config.chart.outerRadius = this.radius.outer;
      this.chart.setOptions(this.config);
      this.chart.redraw();
    },
    colorChange(event) {
      this.chart.setAColor(event.target.value, this.i);
      this.chart.redraw();
    },
    toggle() {
      this.config.chart.showLabel = !this.config.chart.showLabel;
      this.chart.setOptions(this.config);
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
