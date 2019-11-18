<template>
    <div id="stack-bar-percent-chart">
        <h3>百分比堆叠柱状图</h3>
        <p class="text">柱子的各个层代表的是该类别数据占该分组总体数据的百分比。</p>
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
  name: "stackBarPercentChart",
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
      code: `{
        chart: {
			title: "百分比堆叠柱状图",
			dblclick: function(event) {
				var name = prompt("请输入需要修改的标题", "");
				if (name) {
					this.setChartTitle(name);
					this.updateTitle();
				}
			},
			el: "#chart-bar",
			type: "stackBarPercent",
			// 自定义分类顺序
			// orderBy:['HBRR2','HBRR1','UHRR1','UHRR2','HBRR3','UHRR3'],
			custom: ["sample_name"],  // x y
			// direction:"horizontal", // vertical default
			data:[
					{
						"sample_name": "HBRR1",
						"Alternative 3' Splicing Site（A3SS）": 11.4341675734494,
						"Alternative 5' Splicing Site（A5SS）": 9.941240478781284,
						"Mutually exclusive exons（MXE）": 8.496191512513601,
						"Retained Intron（RI）": 7.41240478781284,
						"Skipped Exon（SE）": 62.71599564744287
					},
					{
						"sample_name": "HBRR2",
						"Alternative 3' Splicing Site（A3SS）": 11.65040007034204,
						"Alternative 5' Splicing Site（A5SS）": 9.869867229402972,
						"Mutually exclusive exons（MXE）": 8.115712652774114,
						"Retained Intron（RI）": 7.407895893783523,
						"Skipped Exon（SE）": 62.95612415369736
					},
					{
						"sample_name": "HBRR3",
						"Alternative 3' Splicing Site（A3SS）": 11.813340807174889,
						"Alternative 5' Splicing Site（A5SS）": 10.089686098654708,
						"Mutually exclusive exons（MXE）": 8.109118086696562,
						"Retained Intron（RI）": 7.646674140508221,
						"Skipped Exon（SE）": 62.341180866965615
					},
					{
						"sample_name": "UHRR1",
						"Alternative 3' Splicing Site（A3SS）": 12.126520681265207,
						"Alternative 5' Splicing Site（A5SS）": 10.817518248175183,
						"Mutually exclusive exons（MXE）": 8.034063260340632,
						"Retained Intron（RI）": 8.02433090024331,
						"Skipped Exon（SE）": 60.99756690997567
					},
					{
						"sample_name": "UHRR2",
						"Alternative 3' Splicing Site（A3SS）": 11.222567965935145,
						"Alternative 5' Splicing Site（A5SS）": 10.1580412708811,
						"Mutually exclusive exons（MXE）": 8.733213232885687,
						"Retained Intron（RI）": 7.275630527350148,
						"Skipped Exon（SE）": 62.610547002947925
					},
					{
						"sample_name": "UHRR3",
						"Alternative 3' Splicing Site（A3SS）": 11.33591906913511,
						"Alternative 5' Splicing Site（A5SS）": 9.988404174497182,
						"Mutually exclusive exons（MXE）": 8.844815866288137,
						"Retained Intron（RI）": 7.025470830501019,
						"Skipped Exon（SE）": 62.80539005957855
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
					rotate: 60
				},
				y: {
					title: "y",
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
					"<span>样本：" +
					d.data.sample_name +
					"</span><br><span>占比：" +
					(d[1]-d[0]) +
					"%</span>"
				);
			}
       	}`,
      chart: null,
      config: {
        chart: {
          title: "百分比堆叠柱状图",
          dblclick: function(event) {
            var name = prompt("请输入需要修改的标题", "");
            if (name) {
              this.setChartTitle(name);
              this.updateTitle();
            }
          },
          padding:0.6,
          enableChartSelect: true,
          onselect: function(data) {
            console.log(data);
          },
          el: "#chart-bar",
          type: "stackBarPercent",
          // 自定义分类顺序
          // orderBy:['HBRR2','HBRR1','UHRR1','UHRR2','HBRR3','UHRR3'],
          custom: ["sample_name","total","Alternative 3' Splicing Site（A3SS）","Alternative 5' Splicing Site（A5SS）","Mutually exclusive exons（MXE）","Retained Intron（RI）","Skipped Exon（SE）"], // x y
          // direction:"horizontal", // vertical default
          data: [
            {
              sample_name: "HBRR111111111111111",
              total:123,
			  other:3,
              "Alternative 3' Splicing Site（A3SS）": 11.4341675734494,
              "Alternative 5' Splicing Site（A5SS）": 9.941240478781284,
              "Mutually exclusive exons（MXE）": 8.496191512513601,
              "Retained Intron（RI）": 7.41240478781284,
              "Skipped Exon（SE）": 62.71599564744287
            },
            {
              sample_name: "HBRR2222222222222222222",
              "Alternative 3' Splicing Site（A3SS）": 11.65040007034204,
              "Alternative 5' Splicing Site（A5SS）": 9.869867229402972,
              "Mutually exclusive exons（MXE）": 8.115712652774114,
              "Retained Intron（RI）": 7.407895893783523,
              "Skipped Exon（SE）": 62.95612415369736
            },
            {
              sample_name: "HBRR3333333333333333",
              "Alternative 3' Splicing Site（A3SS）": 11.813340807174889,
              "Alternative 5' Splicing Site（A5SS）": 10.089686098654708,
              "Mutually exclusive exons（MXE）": 8.109118086696562,
              "Retained Intron（RI）": 7.646674140508221,
              "Skipped Exon（SE）": 62.341180866965615
            },
            {
              sample_name: "UHRR11111111111111111",
              "Alternative 3' Splicing Site（A3SS）": 12.126520681265207,
              "Alternative 5' Splicing Site（A5SS）": 10.817518248175183,
              "Mutually exclusive exons（MXE）": 8.034063260340632,
              "Retained Intron（RI）": 8.02433090024331,
              "Skipped Exon（SE）": 60.99756690997567
            },
            {
              sample_name: "UHRR22222222222222222222",
              "Alternative 3' Splicing Site（A3SS）": 11.222567965935145,
              "Alternative 5' Splicing Site（A5SS）": 10.1580412708811,
              "Mutually exclusive exons（MXE）": 8.733213232885687,
              "Retained Intron（RI）": 7.275630527350148,
              "Skipped Exon（SE）": 62.610547002947925
            },
            {
              sample_name: "UHRR33333333333333333",
              "Alternative 3' Splicing Site（A3SS）": 11.33591906913511,
              "Alternative 5' Splicing Site（A5SS）": 9.988404174497182,
              "Mutually exclusive exons（MXE）": 8.844815866288137,
              "Retained Intron（RI）": 7.025470830501019,
              "Skipped Exon（SE）": 62.80539005957855
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
            rotate: 60
          },
          y: {
            title: "y",
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
          dblclick: (d, i) => {
            this.$refs.inputColor.click();
            this.i = i;
          }
        },
        tooltip: function(d) {
          return (
            "<span>样本：" +
            d.data.sample_name +
            "</span><br><span>占比：" +
            (d[1] - d[0]) +
            "%</span>"
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
