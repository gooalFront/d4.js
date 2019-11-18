<template>
    <div id="group-bar-chart">
        <h3>分组柱状图</h3>
        <p class="text">当使用者需要在同一个轴上显示各个分类下不同的分组时，需要用到分组柱状图。</p>
		<el-button size="small" @click="redraw">重画</el-button>
		<el-button size="small" @click="changeDirection">切换方向</el-button>
		<el-button size="small" @click="deepRedraw">deepRedraw</el-button>
		&emsp;current:{{curDirection}}
		<el-button size="small" @click="single">单选</el-button>
		<el-button size="small" @click="multiple">多选</el-button>
		<input ref="inputColor" @change="colorChange" type="color">

		x：
 		<el-button size="small" @click="changeXAxis('bottom')">bottom</el-button>
 		<el-button size="small" @click="changeXAxis('top')">top</el-button>
		 &emsp;y:
 		<el-button size="small" @click="changeYAxis('left')">left</el-button>
 		<el-button size="small" @click="changeYAxis('right')">right</el-button>

		<div class="chart-content"  id="chart-bar"></div>
		<codemirror ref="code"
			v-model="code"
			:options="options"
		></codemirror>
    </div>
</template>

<script>
export default {
  name: "groupBarChart",
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
      curDirection: "vertical",
      code: `
		{
			chart: {
				title: "分组柱状图",
				dblclick: function(event) {
					var name = prompt("请输入需要修改的标题", "");
					if (name) {
					this.setChartTitle(name);
					this.updateTitle();
					}
				},
				el: "#chart-bar",
				type: "groupBar",
				// 自定义分类顺序
				// orderBy:['一月','三月','五月','二月','四月'],
				custom:['key','value','category'],
				// direction:"horizontal", // vertical default
				data: [
						{ key: "一月", value: "32", category: "上海" },
						{ key: "二月", value: "32", category: "上海" },
						{ key: "三月", value: "36", category: "上海" },
						{ key: "四月", value: "12", category: "上海" },
						{ key: "五月", value: "34", category: "上海" },
						{ key: "一月", value: "12", category: "广州" },
						{ key: "二月", value: "31", category: "广州" },
						{ key: "三月", value: "24", category: "广州" },
						{ key: "四月", value: "16", category: "广州" },
						{ key: "五月", value: "25", category: "广州" },
						{ key: "一月", value: "29", category: "北京" },
						{ key: "二月", value: "24", category: "北京" },
						{ key: "三月", value: "21", category: "北京" },
						{ key: "四月", value: "28", category: "北京" },
						{ key: "五月", value: "31", category: "北京" },
						{ key: "一月", value: "19", category: "深圳" },
						{ key: "二月", value: "22", category: "深圳" },
						{ key: "三月", value: "21", category: "深圳" },
						{ key: "四月", value: "31", category: "深圳" },
						{ key: "五月", value: "29", category: "深圳" },
						{ key: "一月", value: "24", category: "武汉" },
						{ key: "二月", value: "30", category: "武汉" },
						{ key: "三月", value: "39", category: "武汉" },
						{ key: "四月", value: "31", category: "武汉" },
						{ key: "五月", value: "40", category: "武汉" }
				]
			},
			axis: {
				x: {
					title: "x",
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
					title: "y",
					dblclick: function(event) {
					var name = prompt("请输入需要修改的标题", "");
						if (name) {
							this.setYTitle(name);
							this.updateTitle();
						}
					},

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
				return "<span>月份："+d.key+"</span><br><span>数量："+d.value+"</span>";
			}
	}`,
	  chart: null,
	  i:0,
      config: {
        chart: {
          title: "分组柱状图",
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
          padding:0.1,
          innerPadding:0.1,
          enableChartSelect: true,
          el: "#chart-bar",
          type: "groupBar",
          // 自定义分类顺序
          // orderBy:['一月','三月','五月','二月','四月'],
          custom: ["value", "key", "category"],
          direction:"horizontal", // vertical default
          data: [
            { key: "一月", value: "0.01", category: "上海" },
            { key: "二月", value: "32", category: "上海" },
            { key: "三月", value: "36", category: "上海" },
            { key: "四月", value: "12", category: "上海" },
            { key: "五月", value: "34", category: "上海" },
            { key: "一月", value: "12", category: "广州" },
            { key: "二月", value: "31", category: "广州" },
            { key: "三月", value: "24", category: "广州" },
            { key: "四月", value: "16", category: "广州" },
            { key: "五月", value: "25", category: "广州" },
            { key: "一月", value: "29", category: "北京" },
            { key: "二月", value: "24", category: "北京" },
            { key: "三月", value: "21", category: "北京" },
            { key: "四月", value: "28", category: "北京" },
            { key: "五月", value: "31", category: "北京" },
            { key: "一月", value: "19", category: "深圳" },
            { key: "二月", value: "22", category: "深圳" },
            { key: "三月", value: "21", category: "深圳" },
            { key: "四月", value: "31", category: "深圳" },
            { key: "五月", value: "29", category: "深圳" },
            { key: "一月", value: "24", category: "武汉" },
            { key: "二月", value: "30", category: "武汉" },
            { key: "三月", value: "39", category: "武汉" },
            { key: "四月", value: "31", category: "武汉" },
            { key: "五月", value: "40", category: "武汉" }
          ]
        },
        axis: {
          x: {
            title: "x",
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setXTitle(name);
                this.updateTitle();
              }
            },
			rotate: 60,
			position:"bottom"
          },
          y: {
            title: "y",
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
          position: "right",
          dblclick: (d,i)=>{
			  this.i = i;
			  this.$refs.inputColor.click();
		  }
        },
        tooltip: function(d) {
          return (
            "<span>月份：" +
            d.key +
            "</span><br><span>数量：" +
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
      this.chart.redraw();
	},
	deepRedraw(){
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
	  this.chart.setColor(event.target.value,this.i);
	  this.chart.redraw();
    },
    changeDirection() {
      if (this.curDirection === "horizontal") {
        this.curDirection = "vertical";
        this.config.chart.title = "vertical-groupbar-chart";
        this.config.chart.direction = this.curDirection;
        this.config.chart.custom = ["key", "value", "category"];
      } else {
        this.curDirection = "horizontal";
        this.config.chart.title = "horizontal-groupbar-chart";
        this.config.chart.direction = this.curDirection;
        this.config.chart.custom = ["value", "key", "category"];
      }

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
