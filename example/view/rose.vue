<template>
    <div id="rose-chart">
        <h3>玫瑰图</h3>
        <p class="text">玫瑰图，又名鸡冠花图、极坐标区域图，是南丁格尔在克里米亚战争期间提交的一份关于士兵死伤的报告时发明的一种图表,是在极坐标下绘制的柱状图，使用圆弧的半径长短表示数据的大小（数量的多少）。</p>
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
				<el-form-item label="最小半径">
					<el-input type="number" size="small" v-model="radius.minRadius" placeholder="最小半径"></el-input>
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
		<div class="chart-content" id="chart-rose"></div>
		<codemirror ref="code"
			v-model="code"
			:options="options"
		></codemirror>
    </div>
</template>

<script>
export default {
  name: "roseChart",
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
				title: "玫瑰图",
				dblclick: function(event) {
					var name = prompt("请输入需要修改的标题", "");
					if (name) {
						this.setChartTitle(name);
						this.updateTitle();
					}
				},
          		padding: 0.05, // custom blank angle
				innerRadius: 0, // custom inner radius
				minRadius: 100, // minRadius to service rose chart
				outerRadius: 180, // outer circle radius
				startAngle: 0, // custom start angle
				endAngle: 360, // custom end angle
				showLabel: true, // custom label show or hide
				custom: ["year", "population"],
				el: "#chart-rose", // pie chart type
				type: "pie-rose",
				data: [
						{
							year: "2001",
							population: 80
						},
						{
							year: "2002",
							population: 38
						},
						{
							year: "2003",
							population: 33.7
						},
						{
							year: "2004",
							population: 12
						},
						{
							year: "2005",
							population:2
						},
						{
							year: "2006",
							population: 31.7
						},
						{
							year: "2007",
							population: 12
						},
						{
							year: "2008",
							population: 46
						},
						{
							year: "2009",
							population: 38.3
						},
						{
							year: "2010",
							population: 28
						},
						{
							year: "2011",
							population: 42.5
						},
						{
							year: "2012",
							population: 30.3
						}
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
        inner: 0,
        outer: 200,
        minRadius: 80
	  },
	  i:0,
      config: {
        chart: {
          title: "玫瑰图",
          dblclick: function(event) {
            var name = prompt("请输入需要修改的标题", "");
            if (name) {
              this.setChartTitle(name);
              this.updateTitle();
            }
		  },
		  onselect:d=>{console.log(d)},
		  enableChartSelect:true,
          padding: 0.01, // custom blank angle
          innerRadius: 0, // custom inner radius
          minRadius: 100, // minRadius to service rose chart
          outerRadius: 200, // outer circle radius
          startAngle: 0, // custom start angle
          endAngle: 360, // custom end angle
          showLabel: true, // custom label show or hide
          custom: ["year", "population"],
          el: "#chart-rose", // pie chart type
          type: "pie-rose",
          data: [
            {
              year: "2001",
              population: 80
            },
            {
              year: "2002",
              population: 38
            },
            {
              year: "2003",
              population: 33.7
            },
            {
              year: "2004",
              population: 12
            },
            {
              year: "2005",
              population: 2
            },
            {
              year: "2006",
              population: 31.7
            },
            {
              year: "2007",
              population: 12
            },
            {
              year: "2008",
              population: 46
            },
            {
              year: "2009",
              population: 38.3
            },
            {
              year: "2010",
              population: 28
            },
            {
              year: "2011",
              population: 42.5
            },
            {
              year: "2012",
              population: 30.3
            }
          ]
        },
        legend: {
          show: true,
          position: "right",
          dblclick: (d,i)=>{
			  this.$refs.inputColor.click();
			  this.i = i;
		  }
        },
        tooltip: function(d) {
          return (
            "<span>year：" +
            d.data.year +
            "</span><br><span>number：" +
            d.data.population +
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
      this.config.chart.minRadius = this.radius.minRadius;
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
      this.chart.setColor(event.target.value, this.i);
      this.chart.redraw();
    },
    reset() {
      this.angle.start = 0;
      this.angle.end = 360;
      this.radius.inner = 0;
      this.radius.outer = 200;
	  this.radius.minRadius =100;
	  this.config.chart.showLabel = true;
      this.config.chart.startAngle = this.angle.start;
      this.config.chart.endAngle = this.angle.end;
      this.config.chart.innerRadius = this.radius.inner;
      this.config.chart.outerRadius = this.radius.outer;
      this.config.chart.minRadius = this.radius.minRadius;
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
