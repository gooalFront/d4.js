<template>
    <div id="pie-chart">
        <h3>环形图</h3>
        <p class="text">基础环图，其本质是饼图将中间区域挖空。</p>
		<div>
			<el-form :inline="true" :model="angle" class="demo-form-inline">
				<el-form-item label="开始角度">
					<el-input type="number" size="small" v-model="angle.start" placeholder="开始角度"></el-input>
				</el-form-item>
				<el-form-item label="结束角度">
					<el-input type="number" size="small" v-model="angle.end" placeholder="结束角度"></el-input>
				</el-form-item>
				<el-form-item label="内圆半径">
					<el-input type="number" size="small" v-model="radius.inner" placeholder="结束角度"></el-input>
				</el-form-item>
				<el-form-item label="外圆半径">
					<el-input type="number" size="small" v-model="radius.outer" placeholder="结束角度"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button  size="small" @click="toggle">切换文本</el-button>
				</el-form-item>
				<el-form-item>
					<el-button  size="small" @click="reset">重置</el-button>
				</el-form-item>
				<el-form-item>
					<el-button  size="small" @click="redraw">重画</el-button>
				</el-form-item>
				<el-form-item>
					<el-button  size="small" @click="deepRedraw">deepRedraw</el-button>
				</el-form-item>
				<el-button size="small" @click="single">单选</el-button>
				<el-button size="small" @click="multiple">多选</el-button>
				<input ref="inputColor" @change="colorChange" type="color">

			</el-form>
		</div>
		<div class="chart-content" id="chart-pie"></div>
		<codemirror ref="code"
			v-model="code"
			:options="options"
		></codemirror>
    </div>
</template>

<script>
export default {
  name: "pieChart",
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
				title: "环形图",
				dblclick: function(event) {
					var name = prompt("请输入需要修改的标题", "");
					if (name) {
						this.setChartTitle(name);
						this.updateTitle();
					}
				},
				padding:0.02,  // custom blank angle
				innerRadius:100, // custom inner radius
				outerRadius:150, // outer circle radius
				startAngle:0, // custom start angle
				endAngle:360,  // custom end angle
				showLabel:true,  // custom label show or hide
				custom: ["key", "value"],
				el: "#chart-pie",  // pie chart type
				type: "pie",
				data: [
						{ key: "一月", value: 289 },
						{ key: "二月", value: 220 },
						{ key: "三月", value: 1850 },
						{ key: "四月", value: 590 },
						{ key: "五月", value: 350 },
						{ key: "六月", value: 480 },
						{ key: "七月", value: 1260 },
						{ key: "八月", value: 597 }
					]
				},
				legend: {
					show: true,
					position: "right",
					dblclick:function(el){
						console.log(el)
					}
				},
				tooltip: function(d) {
					return "<span>key："+d.data.key+"</span><br><span>value："+d.data.value+"</span>";
				}
			}`,
      chart: null,
      angle: {
        start: 0,
        end: 360
      },
      radius: {
        inner: 100,
        outer: 150
	  },
	  i:0,
      config: {
        chart: {
          title: "环形图",
          dblclick: function(event) {
            var name = prompt("请输入需要修改的标题", "");
            if (name) {
              this.setChartTitle(name);
              this.updateTitle();
            }
		  },
		  onselect:data=>{console.log(data)},
		  enableChartSelect:true,
          padding: 0.02, // custom blank angle
          innerRadius: 100, // custom inner radius
          outerRadius: 150, // outer circle radius
          startAngle: 0, // custom start angle
          endAngle: 360, // custom end angle
          showLabel: true, // custom label show or hide
          custom: ["key", "value"],
          el: "#chart-pie", // pie chart type
          type: "pie",
          data: [
            { key: "一月", value: 289 },
            { key: "二月", value: 220 },
            { key: "三月", value: 1850 },
            { key: "四月", value: 590 },
            { key: "五月", value: 350 },
            { key: "六月", value: 480 },
            { key: "七月", value: 900 },
            { key: "八月", value: 597 }
          ]
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
            "<span>key：" +
            d.data.key +
            "</span><br><span>value：" +
            d.data.value +
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
      console.log(event.target.value, this.i);
      this.chart.setColor(event.target.value, this.i);
      this.chart.redraw();
    },

    reset() {
      this.angle.start = 0;
      this.angle.end = 360;
      this.radius.inner = 100;
      this.radius.outer = 150;
      this.config.chart.showLabel = true;
      this.config.chart.startAngle = this.angle.start;
      this.config.chart.endAngle = this.angle.end;
      this.config.chart.innerRadius = this.radius.inner;
      this.config.chart.outerRadius = this.radius.outer;
      this.chart.setOptions(this.config);
      this.chart.redraw();
    },
    toggle() {
      this.config.chart.showLabel = !this.config.chart.showLabel;
      this.chart.setOptions(this.config);
      this.chart.redraw();
    }
  }
};
</script>
