<template>
    <div id="pie-chart">
        <h3>饼图</h3>
        <p class="text">饼图广泛得应用在各个领域，用于表示不同分类的占比情况，通过弧度大小来对比各种分类。饼图通过将一个圆饼按照分类的占比划分成多个区块，整个圆饼代表数据的总量，每个区块（圆弧）表示该分类占总体的比例大小，所有区块（圆弧）的加和等于 100%。</p>
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
				<el-form-item>
					<el-button  size="small" @click="randomData">random data</el-button>
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
				title: "饼图",
				dblclick: function(event) {
					var name = prompt("请输入需要修改的标题", "");
					if (name) {
						this.setChartTitle(name);
						this.updateTitle();
					}
				},
				padding:0.02,  // custom blank angle
				outerRadius:120, // outer circle radius
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
        inner: 0,
        outer: 110
	  },
	  i:0,
	  chartData:[
		  {"name":"intergenic","value":471075},{"name":"mature","value":18049631},{"name":"Rfam other sncRNA","value":139322},{"name":"snRNA","value":13233},{"name":"unmap","value":2315875},{"name":"intron","value":701073},{"name":"piRNA","value":78481},{"name":"rRNA","value":230447},{"name":"hairpin","value":12355},{"name":"snoRNA","value":85038},{"name":"precursor","value":2772106},{"name":"exon","value":1209112},{"name":"repeat","value":271492},{"name":"tRNA","value":53494}
	  ],
      config: {
        chart: {
          title: "饼图",
          dblclick: function(event) {
            var name = prompt("请输入需要修改的标题", "");
            if (name) {
              this.setChartTitle(name);
              this.updateTitle();
            }
          },
          onselect: data => {
            console.log(data);
          },
          enableChartSelect: true,
          padding: 0.01, // custom blank angle
          outerRadius: 110, // outer circle radius
          startAngle: 0, // custom start angle
          endAngle: 360, // custom end angle
          showLabel: true, // custom label show or hide
          custom: ["name", "value"],
          el: "#chart-pie", // pie chart type
		  labelFormatter:function(){},
          type: "pie",
          data: []
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
	this.config['chart']['data'] = this.chartData;
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
      this.radius.inner = 0;
      this.radius.outer = 110;
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
    },
	rnd(n,m){
		return Math.floor(Math.random()*(m-n+1)+n);
	},
	randomData(){
		let times = this.rnd(1,20);
		let data = [];
		for(var i=0;i<times;i++){
			data.push({name:this.rnd(1,2000),value:this.rnd(1,100000)})
		}

		this.config.chart.data = data;
		this.chart.redraw();
	}
  }
};
</script>
