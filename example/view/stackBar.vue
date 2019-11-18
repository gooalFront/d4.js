<template>
    <div id="stack-bar-chart">
        <h3>堆叠柱状图</h3>
        <p class="text">与并排显示分类的分组柱状图不同，堆叠柱状图将每个柱子进行分割以显示相同类型下各个数据的大小情况。</p>
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
		<div class="chart-content"  id="chart-bar"></div>
		<codemirror ref="code"
			v-model="code"
			:options="options"
		></codemirror>
    </div>
</template>

<script>
export default {
  name: "stackBarChart",
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
				title: "堆叠柱状图",
				dblclick: function(event) {
					var name = prompt("请输入需要修改的标题", "");
					if (name) {
					this.setChartTitle(name);
					this.updateTitle();
					}
				},
				el: "#chart-bar",
				type: "stackBar",
				// 自定义分类顺序
				// orderBy:['一月','三月','五月','二月','四月'],
				custom: ["sample_name", "total"], // x y
				//   direction: "horizontal", // vertical default
				data: [
					{
					sample_name: "HBRR1",
					"Alternative 3' Splicing Site（A3SS）": 13,
					"Alternative 5' Splicing Site（A5SS）": 0.1,
					"Mutually exclusive exons（MXE）": 20,
					"Retained Intron（RI）": 45,
					"Skipped Exon（SE）": 32,
					total: 13 + 0.1 + 20 + 45 + 32
					},
					{
					sample_name: "HBRR2",
					"Alternative 3' Splicing Site（A3SS）": 45,
					"Alternative 5' Splicing Site（A5SS）": 27,
					"Mutually exclusive exons（MXE）": 87,
					"Retained Intron（RI）": 34,
					"Skipped Exon（SE）": 6,
					total: 45 + 27 + 87 + 34 + 6
					},
					{
					sample_name: "HBRR3",
					"Alternative 3' Splicing Site（A3SS）": 11,
					"Alternative 5' Splicing Site（A5SS）": 10,
					"Mutually exclusive exons（MXE）": 8,
					"Retained Intron（RI）": 7,
					"Skipped Exon（SE）": 62,
					total: 11 + 10 + 8 + 7 + 62
					},
					{
					sample_name: "UHRR1",
					"Alternative 3' Splicing Site（A3SS）": 23,
					"Alternative 5' Splicing Site（A5SS）": 14,
					"Mutually exclusive exons（MXE）": 25,
					"Retained Intron（RI）": 11,
					"Skipped Exon（SE）": 51,
					total: 23 + 14 + 25 + 11 + 54
					},
					{
					sample_name: "UHRR2",
					"Alternative 3' Splicing Site（A3SS）": 67,
					"Alternative 5' Splicing Site（A5SS）": 45,
					"Mutually exclusive exons（MXE）": 7,
					"Retained Intron（RI）": 33,
					"Skipped Exon（SE）": 45,
					total: 67 + 45 + 7 + 33 + 45
					},
					{
					sample_name: "UHRR3",
					"Alternative 3' Splicing Site（A3SS）": 11,
					"Alternative 5' Splicing Site（A5SS）": 9,
					"Mutually exclusive exons（MXE）": 8,
					"Retained Intron（RI）": 7,
					"Skipped Exon（SE）": 62,
					total: 11 + 9 + 8 + 7 + 62
					}
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
      i: 0,
      config: {
        chart: {
          title: "堆叠柱状图",
          dblclick: function(event) {
            var name = prompt("请输入需要修改的标题", "");
            if (name) {
              this.setChartTitle(name);
              this.updateTitle();
            }
          },
          enableChartSelect: true,
          onselect: function(data) {
            console.log(data);
          },
          padding:0.6,
          el: "#chart-bar",
          type: "stackBar",
          // 自定义分类顺序
          //   orderBy:['HBRR2','HBRR1','UHRR1','UHRR2','HBRR3','UHRR3'],
          custom: ["sample_name", "total","Alternative 3' Splicing Site（A3SS）","Alternative 5' Splicing Site（A5SS）","Mutually exclusive exons（MXE）","Retained Intron（RI）","Skipped Exon（SE）"], // x y
        //   direction: "horizontal", // vertical default
          data: [
            {
              sample_name: "HBRR1",
			  other1:1,
              "Alternative 3' Splicing Site（A3SS）": 13,
              "Alternative 5' Splicing Site（A5SS）": 0.1,
              "Mutually exclusive exons（MXE）": 20,
              "Retained Intron（RI）": 45,
              "Skipped Exon（SE）": 32,
              total: 13 + 0.1 + 20 + 45 + 32
            },
            {
              sample_name: "HBRR2",
              "Alternative 3' Splicing Site（A3SS）": 45,
              "Alternative 5' Splicing Site（A5SS）": 27,
              "Mutually exclusive exons（MXE）": 87,
              "Retained Intron（RI）": 34,
              "Skipped Exon（SE）": 6,
              total: 45 + 27 + 87 + 34 + 6
            },
            {
              sample_name: "HBRR3",
              "Alternative 3' Splicing Site（A3SS）": 11,
              "Alternative 5' Splicing Site（A5SS）": 10,
              "Mutually exclusive exons（MXE）": 8,
              "Retained Intron（RI）": 7,
              "Skipped Exon（SE）": 62,
              total: 11 + 10 + 8 + 7 + 62
            },
            {
              sample_name: "UHRR1",
              "Alternative 3' Splicing Site（A3SS）": 23,
              "Alternative 5' Splicing Site（A5SS）": 14,
              "Mutually exclusive exons（MXE）": 25,
              "Retained Intron（RI）": 11,
              "Skipped Exon（SE）": 51,
              total: 23 + 14 + 25 + 11 + 54
            },
            {
              sample_name: "UHRR2",
              "Alternative 3' Splicing Site（A3SS）": 67,
              "Alternative 5' Splicing Site（A5SS）": 45,
              "Mutually exclusive exons（MXE）": 7,
              "Retained Intron（RI）": 33,
              "Skipped Exon（SE）": 45,
              total: 67 + 45 + 7 + 33 + 45
            },
            {
              sample_name: "UHRR3",
              "Alternative 3' Splicing Site（A3SS）": 11,
              "Alternative 5' Splicing Site（A5SS）": 9,
              "Mutually exclusive exons（MXE）": 8,
              "Retained Intron（RI）": 7,
              "Skipped Exon（SE）": 62,
              total: 11 + 9 + 8 + 7 + 62
            }
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
            position: "bottom"
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
            position: "left"
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
            "<span>样本：" +
            d.data.sample_name +
            "</span><br><span>数量：" +
            (d[1] - d[0]) +
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
    changeDirection() {
      var p = this.chart.getOptions();
      if (this.curDirection === "horizontal") {
        this.curDirection = "vertical";
        p.chart.title = "vertical-stackbar-chart";
        p.chart.direction = this.curDirection;
      } else {
        this.curDirection = "horizontal";
        p.chart.title = "horizontal-stackbar-chart";
        p.chart.direction = this.curDirection;
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
