<template>
    <div id="scatter-chart">
        <h3>散点图</h3>
        <p class="text">它将所有的数据以点的形式展现在笛卡尔坐标系上，以显示变量之间的相互影响程度，点的位置由变量的数值决定。</p>
		<el-button size="small" @click="redraw">重画</el-button>
		<el-button  size="small" @click="deepRedraw">deepRedraw</el-button>
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
  name: "scatterChart",
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
				title: "散点图",
				dblclick: function(event) {
					var name = prompt("请输入需要修改的标题", "");
					if (name) {
						this.setChartTitle(name);
						this.updateTitle();
					}
				},
				el: "#chart-bar",
				type: "scatter",
				radius:3,  // custom radius
				hoverRadius:6,  // custom hover radius
				custom: ["height", "weight","gender"], // x y category
				data: [
						{
							"gender": "female",
							"height": 161.2,
							"weight": 51.6
						},
						{
							"gender": "female",
							"height": 167.5,
							"weight": 59
						},
						......
						......
						......
						{
							"gender": "male",
							"height": 180.3,
							"weight": 83.2
						}
					]
			},
			axis: {
				x: {
					title: "Height(CM)",
					dblclick: function(event) {
						var name = prompt("请输入需要修改的标题", "");
						if (name) {
							this.setXTitle(name);
							this.updateTitle();
						}
					}
				},
				y: {
					title: "Weight(KG)",
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
				},
				// custom category
				// if no data use key of chart's data to computed category
				data:['female','male']
			},
			tooltip: function(d) {
				return (
					"<span>身高：" +
					d.height +
					"</span><br><span>体重：" +
					d.weight +
					"</span>"
				);
			}
	}`,
	  chart: null,
	  i:0,
      config: {
        chart: {
          title: "散点图",
          dblclick: function(event) {
            var name = prompt("请输入需要修改的标题", "");
            if (name) {
              this.setChartTitle(name);
              this.updateTitle();
            }
          },
          onselect: function(d) {
            console.log(d);
          },
          el: "#chart-bar",
          type: "scatter",
          radius: 3, // custom radius
          hoverRadius: 6, // custom hover radius
        //   data: [
        //     {
        //       gender: "female",
        //       height: 161.2,
        //       weight: 51.6
        //     },
        //     {
        //       gender: "female",
        //       height: 167.5,
        //       weight: 59
        //     },
        //     {
        //       gender: "female",
        //       height: 159.5,
        //       weight: 49.2
        //     },
        //     {
        //       gender: "female",
        //       height: 157,
        //       weight: 63
        //     },
        //     {
        //       gender: "male",
        //       height: 155.8,
        //       weight: 53.6
        //     },
        //     {
        //       gender: "female",
        //       height: 170,
        //       weight: 59
        //     },
        //     {
        //       gender: "female",
        //       height: 159.1,
        //       weight: 47.6
        //     },
        //     {
        //       gender: "male",
        //       height: 166,
        //       weight: 69.8
        //     },
        //     {
        //       gender: "female",
        //       height: 176.2,
        //       weight: 66.8
        //     },
        //     {
        //       gender: "female",
        //       height: 160.2,
        //       weight: 75.2
        //     },
        //     {
        //       gender: "male",
        //       height: 172.5,
        //       weight: 55.2
        //     },
        //     {
        //       gender: "female",
        //       height: 170.9,
        //       weight: 54.2
        //     },
        //     {
        //       gender: "female",
        //       height: 172.9,
        //       weight: 62.5
        //     },
        //     {
        //       gender: "male",
        //       height: 153.4,
        //       weight: 42
        //     },
        //     {
        //       gender: "female",
        //       height: 160,
        //       weight: 50
        //     },
        //     {
        //       gender: "male",
        //       height: 147.2,
        //       weight: 49.8
        //     },
        //     {
        //       gender: "male",
        //       height: 168.2,
        //       weight: 49.2
        //     },
        //     {
        //       gender: "male",
        //       height: 175,
        //       weight: 73.2
        //     },
        //     {
        //       gender: "male",
        //       height: 157,
        //       weight: 47.8
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 68.8
        //     },
        //     {
        //       gender: "male",
        //       height: 159.5,
        //       weight: 50.6
        //     },
        //     {
        //       gender: "male",
        //       height: 175,
        //       weight: 82.5
        //     },
        //     {
        //       gender: "male",
        //       height: 166.8,
        //       weight: 57.2
        //     },
        //     {
        //       gender: "male",
        //       height: 176.5,
        //       weight: 87.8
        //     },
        //     {
        //       gender: "male",
        //       height: 170.2,
        //       weight: 72.8
        //     },
        //     {
        //       gender: "male",
        //       height: 174,
        //       weight: 54.5
        //     },
        //     {
        //       gender: "male",
        //       height: 173,
        //       weight: 59.8
        //     },
        //     {
        //       gender: "male",
        //       height: 179.9,
        //       weight: 67.3
        //     },
        //     {
        //       gender: "male",
        //       height: 170.5,
        //       weight: 67.8
        //     },
        //     {
        //       gender: "male",
        //       height: 160,
        //       weight: 47
        //     },
        //     {
        //       gender: "male",
        //       height: 154.4,
        //       weight: 46.2
        //     },
        //     {
        //       gender: "male",
        //       height: 162,
        //       weight: 55
        //     },
        //     {
        //       gender: "male",
        //       height: 176.5,
        //       weight: 83
        //     },
        //     {
        //       gender: "male",
        //       height: 160,
        //       weight: 54.4
        //     },
        //     {
        //       gender: "male",
        //       height: 152,
        //       weight: 45.8
        //     },
        //     {
        //       gender: "male",
        //       height: 162.1,
        //       weight: 53.6
        //     },
        //     {
        //       gender: "male",
        //       height: 170,
        //       weight: 73.2
        //     },
        //     {
        //       gender: "male",
        //       height: 160.2,
        //       weight: 52.1
        //     },
        //     {
        //       gender: "male",
        //       height: 161.3,
        //       weight: 67.9
        //     },
        //     {
        //       gender: "male",
        //       height: 166.4,
        //       weight: 56.6
        //     },
        //     {
        //       gender: "male",
        //       height: 168.9,
        //       weight: 62.3
        //     },
        //     {
        //       gender: "male",
        //       height: 163.8,
        //       weight: 58.5
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 54.5
        //     },
        //     {
        //       gender: "male",
        //       height: 160,
        //       weight: 50.2
        //     },
        //     {
        //       gender: "male",
        //       height: 161.3,
        //       weight: 60.3
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 58.3
        //     },
        //     {
        //       gender: "male",
        //       height: 165.1,
        //       weight: 56.2
        //     },
        //     {
        //       gender: "male",
        //       height: 160,
        //       weight: 50.2
        //     },
        //     {
        //       gender: "male",
        //       height: 170,
        //       weight: 72.9
        //     },
        //     {
        //       gender: "male",
        //       height: 157.5,
        //       weight: 59.8
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 61
        //     },
        //     {
        //       gender: "male",
        //       height: 160.7,
        //       weight: 69.1
        //     },
        //     {
        //       gender: "male",
        //       height: 163.2,
        //       weight: 55.9
        //     },
        //     {
        //       gender: "male",
        //       height: 152.4,
        //       weight: 46.5
        //     },
        //     {
        //       gender: "male",
        //       height: 157.5,
        //       weight: 54.3
        //     },
        //     {
        //       gender: "male",
        //       height: 168.3,
        //       weight: 54.8
        //     },
        //     {
        //       gender: "male",
        //       height: 180.3,
        //       weight: 60.7
        //     },
        //     {
        //       gender: "male",
        //       height: 165.5,
        //       weight: 60
        //     },
        //     {
        //       gender: "male",
        //       height: 165,
        //       weight: 62
        //     },
        //     {
        //       gender: "male",
        //       height: 164.5,
        //       weight: 60.3
        //     },
        //     {
        //       gender: "male",
        //       height: 156,
        //       weight: 52.7
        //     },
        //     {
        //       gender: "male",
        //       height: 160,
        //       weight: 74.3
        //     },
        //     {
        //       gender: "female",
        //       height: 163,
        //       weight: 62
        //     },
        //     {
        //       gender: "female",
        //       height: 165.7,
        //       weight: 73.1
        //     },
        //     {
        //       gender: "female",
        //       height: 161,
        //       weight: 80
        //     },
        //     {
        //       gender: "male",
        //       height: 162,
        //       weight: 54.7
        //     },
        //     {
        //       gender: "male",
        //       height: 166,
        //       weight: 53.2
        //     },
        //     {
        //       gender: "male",
        //       height: 174,
        //       weight: 75.7
        //     },
        //     {
        //       gender: "male",
        //       height: 172.7,
        //       weight: 61.1
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 55.7
        //     },
        //     {
        //       gender: "male",
        //       height: 151.1,
        //       weight: 48.7
        //     },
        //     {
        //       gender: "male",
        //       height: 164.5,
        //       weight: 52.3
        //     },
        //     {
        //       gender: "male",
        //       height: 163.5,
        //       weight: 50
        //     },
        //     {
        //       gender: "male",
        //       height: 152,
        //       weight: 59.3
        //     },
        //     {
        //       gender: "male",
        //       height: 169,
        //       weight: 62.5
        //     },
        //     {
        //       gender: "male",
        //       height: 164,
        //       weight: 55.7
        //     },
        //     {
        //       gender: "male",
        //       height: 161.2,
        //       weight: 54.8
        //     },
        //     {
        //       gender: "male",
        //       height: 155,
        //       weight: 45.9
        //     },
        //     {
        //       gender: "male",
        //       height: 170,
        //       weight: 70.6
        //     },
        //     {
        //       gender: "male",
        //       height: 176.2,
        //       weight: 67.2
        //     },
        //     {
        //       gender: "male",
        //       height: 170,
        //       weight: 69.4
        //     },
        //     {
        //       gender: "male",
        //       height: 162.5,
        //       weight: 58.2
        //     },
        //     {
        //       gender: "male",
        //       height: 170.3,
        //       weight: 64.8
        //     },
        //     {
        //       gender: "male",
        //       height: 164.1,
        //       weight: 71.6
        //     },
        //     {
        //       gender: "male",
        //       height: 169.5,
        //       weight: 52.8
        //     },
        //     {
        //       gender: "male",
        //       height: 163.2,
        //       weight: 59.8
        //     },
        //     {
        //       gender: "male",
        //       height: 154.5,
        //       weight: 49
        //     },
        //     {
        //       gender: "male",
        //       height: 159.8,
        //       weight: 50
        //     },
        //     {
        //       gender: "male",
        //       height: 173.2,
        //       weight: 69.2
        //     },
        //     {
        //       gender: "male",
        //       height: 170,
        //       weight: 55.9
        //     },
        //     {
        //       gender: "male",
        //       height: 161.4,
        //       weight: 63.4
        //     },
        //     {
        //       gender: "male",
        //       height: 169,
        //       weight: 58.2
        //     },
        //     {
        //       gender: "male",
        //       height: 166.2,
        //       weight: 58.6
        //     },
        //     {
        //       gender: "male",
        //       height: 159.4,
        //       weight: 45.7
        //     },
        //     {
        //       gender: "male",
        //       height: 162.5,
        //       weight: 52.2
        //     },
        //     {
        //       gender: "male",
        //       height: 159,
        //       weight: 48.6
        //     },
        //     {
        //       gender: "male",
        //       height: 162.8,
        //       weight: 57.8
        //     },
        //     {
        //       gender: "male",
        //       height: 159,
        //       weight: 55.6
        //     },
        //     {
        //       gender: "male",
        //       height: 179.8,
        //       weight: 66.8
        //     },
        //     {
        //       gender: "male",
        //       height: 162.9,
        //       weight: 59.4
        //     },
        //     {
        //       gender: "male",
        //       height: 161,
        //       weight: 53.6
        //     },
        //     {
        //       gender: "male",
        //       height: 151.1,
        //       weight: 73.2
        //     },
        //     {
        //       gender: "male",
        //       height: 168.2,
        //       weight: 53.4
        //     },
        //     {
        //       gender: "male",
        //       height: 168.9,
        //       weight: 69
        //     },
        //     {
        //       gender: "male",
        //       height: 173.2,
        //       weight: 58.4
        //     },
        //     {
        //       gender: "male",
        //       height: 171.8,
        //       weight: 56.2
        //     },
        //     {
        //       gender: "male",
        //       height: 178,
        //       weight: 70.6
        //     },
        //     {
        //       gender: "male",
        //       height: 164.3,
        //       weight: 59.8
        //     },
        //     {
        //       gender: "male",
        //       height: 163,
        //       weight: 72
        //     },
        //     {
        //       gender: "male",
        //       height: 168.5,
        //       weight: 65.2
        //     },
        //     {
        //       gender: "male",
        //       height: 166.8,
        //       weight: 56.6
        //     },
        //     {
        //       gender: "male",
        //       height: 172.7,
        //       weight: 105.2
        //     },
        //     {
        //       gender: "male",
        //       height: 163.5,
        //       weight: 51.8
        //     },
        //     {
        //       gender: "male",
        //       height: 169.4,
        //       weight: 63.4
        //     },
        //     {
        //       gender: "male",
        //       height: 167.8,
        //       weight: 59
        //     },
        //     {
        //       gender: "male",
        //       height: 159.5,
        //       weight: 47.6
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 63
        //     },
        //     {
        //       gender: "male",
        //       height: 161.2,
        //       weight: 55.2
        //     },
        //     {
        //       gender: "male",
        //       height: 160,
        //       weight: 45
        //     },
        //     {
        //       gender: "male",
        //       height: 163.2,
        //       weight: 54
        //     },
        //     {
        //       gender: "male",
        //       height: 162.2,
        //       weight: 50.2
        //     },
        //     {
        //       gender: "male",
        //       height: 161.3,
        //       weight: 60.2
        //     },
        //     {
        //       gender: "male",
        //       height: 149.5,
        //       weight: 44.8
        //     },
        //     {
        //       gender: "male",
        //       height: 157.5,
        //       weight: 58.8
        //     },
        //     {
        //       gender: "male",
        //       height: 163.2,
        //       weight: 56.4
        //     },
        //     {
        //       gender: "male",
        //       height: 172.7,
        //       weight: 62
        //     },
        //     {
        //       gender: "male",
        //       height: 155,
        //       weight: 49.2
        //     },
        //     {
        //       gender: "male",
        //       height: 156.5,
        //       weight: 67.2
        //     },
        //     {
        //       gender: "male",
        //       height: 164,
        //       weight: 53.8
        //     },
        //     {
        //       gender: "male",
        //       height: 160.9,
        //       weight: 54.4
        //     },
        //     {
        //       gender: "male",
        //       height: 162.8,
        //       weight: 58
        //     },
        //     {
        //       gender: "male",
        //       height: 167,
        //       weight: 59.8
        //     },
        //     {
        //       gender: "male",
        //       height: 160,
        //       weight: 54.8
        //     },
        //     {
        //       gender: "male",
        //       height: 160,
        //       weight: 43.2
        //     },
        //     {
        //       gender: "male",
        //       height: 168.9,
        //       weight: 60.5
        //     },
        //     {
        //       gender: "male",
        //       height: 158.2,
        //       weight: 46.4
        //     },
        //     {
        //       gender: "male",
        //       height: 156,
        //       weight: 64.4
        //     },
        //     {
        //       gender: "male",
        //       height: 160,
        //       weight: 48.8
        //     },
        //     {
        //       gender: "male",
        //       height: 167.1,
        //       weight: 62.2
        //     },
        //     {
        //       gender: "male",
        //       height: 158,
        //       weight: 55.5
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 57.8
        //     },
        //     {
        //       gender: "male",
        //       height: 156,
        //       weight: 54.6
        //     },
        //     {
        //       gender: "male",
        //       height: 162.1,
        //       weight: 59.2
        //     },
        //     {
        //       gender: "male",
        //       height: 173.4,
        //       weight: 52.7
        //     },
        //     {
        //       gender: "male",
        //       height: 159.8,
        //       weight: 53.2
        //     },
        //     {
        //       gender: "male",
        //       height: 170.5,
        //       weight: 64.5
        //     },
        //     {
        //       gender: "male",
        //       height: 159.2,
        //       weight: 51.8
        //     },
        //     {
        //       gender: "male",
        //       height: 157.5,
        //       weight: 56
        //     },
        //     {
        //       gender: "male",
        //       height: 161.3,
        //       weight: 63.6
        //     },
        //     {
        //       gender: "male",
        //       height: 162.6,
        //       weight: 63.2
        //     },
        //     {
        //       gender: "male",
        //       height: 160,
        //       weight: 59.5
        //     },
        //     {
        //       gender: "male",
        //       height: 168.9,
        //       weight: 56.8
        //     },
        //     {
        //       gender: "male",
        //       height: 165.1,
        //       weight: 64.1
        //     },
        //     {
        //       gender: "male",
        //       height: 162.6,
        //       weight: 50
        //     },
        //     {
        //       gender: "male",
        //       height: 165.1,
        //       weight: 72.3
        //     },
        //     {
        //       gender: "male",
        //       height: 166.4,
        //       weight: 55
        //     },
        //     {
        //       gender: "male",
        //       height: 160,
        //       weight: 55.9
        //     },
        //     {
        //       gender: "male",
        //       height: 152.4,
        //       weight: 60.4
        //     },
        //     {
        //       gender: "male",
        //       height: 170.2,
        //       weight: 69.1
        //     },
        //     {
        //       gender: "male",
        //       height: 162.6,
        //       weight: 84.5
        //     },
        //     {
        //       gender: "male",
        //       height: 170.2,
        //       weight: 55.9
        //     },
        //     {
        //       gender: "male",
        //       height: 158.8,
        //       weight: 55.5
        //     },
        //     {
        //       gender: "male",
        //       height: 172.7,
        //       weight: 69.5
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 76.4
        //     },
        //     {
        //       gender: "male",
        //       height: 162.6,
        //       weight: 61.4
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 65.9
        //     },
        //     {
        //       gender: "male",
        //       height: 156.2,
        //       weight: 58.6
        //     },
        //     {
        //       gender: "male",
        //       height: 175.2,
        //       weight: 66.8
        //     },
        //     {
        //       gender: "male",
        //       height: 172.1,
        //       weight: 56.6
        //     },
        //     {
        //       gender: "male",
        //       height: 162.6,
        //       weight: 58.6
        //     },
        //     {
        //       gender: "male",
        //       height: 160,
        //       weight: 55.9
        //     },
        //     {
        //       gender: "male",
        //       height: 165.1,
        //       weight: 59.1
        //     },
        //     {
        //       gender: "male",
        //       height: 182.9,
        //       weight: 81.8
        //     },
        //     {
        //       gender: "male",
        //       height: 166.4,
        //       weight: 70.7
        //     },
        //     {
        //       gender: "male",
        //       height: 165.1,
        //       weight: 56.8
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 60
        //     },
        //     {
        //       gender: "male",
        //       height: 165.1,
        //       weight: 58.2
        //     },
        //     {
        //       gender: "male",
        //       height: 175.3,
        //       weight: 72.7
        //     },
        //     {
        //       gender: "male",
        //       height: 154.9,
        //       weight: 54.1
        //     },
        //     {
        //       gender: "male",
        //       height: 158.8,
        //       weight: 49.1
        //     },
        //     {
        //       gender: "female",
        //       height: 172.7,
        //       weight: 75.9
        //     },
        //     {
        //       gender: "female",
        //       height: 168.9,
        //       weight: 55
        //     },
        //     {
        //       gender: "female",
        //       height: 161.3,
        //       weight: 57.3
        //     },
        //     {
        //       gender: "female",
        //       height: 167.6,
        //       weight: 55
        //     },
        //     {
        //       gender: "female",
        //       height: 165.1,
        //       weight: 65.5
        //     },
        //     {
        //       gender: "female",
        //       height: 175.3,
        //       weight: 65.5
        //     },
        //     {
        //       gender: "female",
        //       height: 157.5,
        //       weight: 48.6
        //     },
        //     {
        //       gender: "female",
        //       height: 163.8,
        //       weight: 58.6
        //     },
        //     {
        //       gender: "female",
        //       height: 167.6,
        //       weight: 63.6
        //     },
        //     {
        //       gender: "female",
        //       height: 165.1,
        //       weight: 55.2
        //     },
        //     {
        //       gender: "female",
        //       height: 165.1,
        //       weight: 62.7
        //     },
        //     {
        //       gender: "female",
        //       height: 168.9,
        //       weight: 56.6
        //     },
        //     {
        //       gender: "female",
        //       height: 162.6,
        //       weight: 53.9
        //     },
        //     {
        //       gender: "female",
        //       height: 164.5,
        //       weight: 63.2
        //     },
        //     {
        //       gender: "female",
        //       height: 176.5,
        //       weight: 73.6
        //     },
        //     {
        //       gender: "female",
        //       height: 168.9,
        //       weight: 62
        //     },
        //     {
        //       gender: "female",
        //       height: 175.3,
        //       weight: 63.6
        //     },
        //     {
        //       gender: "female",
        //       height: 159.4,
        //       weight: 53.2
        //     },
        //     {
        //       gender: "female",
        //       height: 160,
        //       weight: 53.4
        //     },
        //     {
        //       gender: "female",
        //       height: 170.2,
        //       weight: 55
        //     },
        //     {
        //       gender: "female",
        //       height: 162.6,
        //       weight: 70.5
        //     },
        //     {
        //       gender: "female",
        //       height: 167.6,
        //       weight: 54.5
        //     },
        //     {
        //       gender: "female",
        //       height: 162.6,
        //       weight: 54.5
        //     },
        //     {
        //       gender: "female",
        //       height: 160.7,
        //       weight: 55.9
        //     },
        //     {
        //       gender: "female",
        //       height: 160,
        //       weight: 59
        //     },
        //     {
        //       gender: "female",
        //       height: 157.5,
        //       weight: 63.6
        //     },
        //     {
        //       gender: "female",
        //       height: 162.6,
        //       weight: 54.5
        //     },
        //     {
        //       gender: "female",
        //       height: 152.4,
        //       weight: 47.3
        //     },
        //     {
        //       gender: "female",
        //       height: 170.2,
        //       weight: 67.7
        //     },
        //     {
        //       gender: "female",
        //       height: 165.1,
        //       weight: 80.9
        //     },
        //     {
        //       gender: "female",
        //       height: 172.7,
        //       weight: 70.5
        //     },
        //     {
        //       gender: "female",
        //       height: 165.1,
        //       weight: 60.9
        //     },
        //     {
        //       gender: "female",
        //       height: 170.2,
        //       weight: 63.6
        //     },
        //     {
        //       gender: "female",
        //       height: 170.2,
        //       weight: 54.5
        //     },
        //     {
        //       gender: "female",
        //       height: 170.2,
        //       weight: 59.1
        //     },
        //     {
        //       gender: "female",
        //       height: 161.3,
        //       weight: 70.5
        //     },
        //     {
        //       gender: "female",
        //       height: 167.6,
        //       weight: 52.7
        //     },
        //     {
        //       gender: "female",
        //       height: 167.6,
        //       weight: 62.7
        //     },
        //     {
        //       gender: "female",
        //       height: 165.1,
        //       weight: 86.3
        //     },
        //     {
        //       gender: "female",
        //       height: 162.6,
        //       weight: 66.4
        //     },
        //     {
        //       gender: "female",
        //       height: 152.4,
        //       weight: 67.3
        //     },
        //     {
        //       gender: "female",
        //       height: 168.9,
        //       weight: 63
        //     },
        //     {
        //       gender: "female",
        //       height: 170.2,
        //       weight: 73.6
        //     },
        //     {
        //       gender: "female",
        //       height: 175.2,
        //       weight: 62.3
        //     },
        //     {
        //       gender: "female",
        //       height: 175.2,
        //       weight: 57.7
        //     },
        //     {
        //       gender: "female",
        //       height: 160,
        //       weight: 55.4
        //     },
        //     {
        //       gender: "female",
        //       height: 165.1,
        //       weight: 104.1
        //     },
        //     {
        //       gender: "female",
        //       height: 174,
        //       weight: 55.5
        //     },
        //     {
        //       gender: "female",
        //       height: 170.2,
        //       weight: 77.3
        //     },
        //     {
        //       gender: "female",
        //       height: 160,
        //       weight: 80.5
        //     },
        //     {
        //       gender: "female",
        //       height: 167.6,
        //       weight: 64.5
        //     },
        //     {
        //       gender: "female",
        //       height: 167.6,
        //       weight: 72.3
        //     },
        //     {
        //       gender: "female",
        //       height: 167.6,
        //       weight: 61.4
        //     },
        //     {
        //       gender: "female",
        //       height: 154.9,
        //       weight: 58.2
        //     },
        //     {
        //       gender: "female",
        //       height: 162.6,
        //       weight: 81.8
        //     },
        //     {
        //       gender: "female",
        //       height: 175.3,
        //       weight: 63.6
        //     },
        //     {
        //       gender: "female",
        //       height: 171.4,
        //       weight: 53.4
        //     },
        //     {
        //       gender: "female",
        //       height: 157.5,
        //       weight: 54.5
        //     },
        //     {
        //       gender: "female",
        //       height: 165.1,
        //       weight: 53.6
        //     },
        //     {
        //       gender: "female",
        //       height: 160,
        //       weight: 60
        //     },
        //     {
        //       gender: "female",
        //       height: 174,
        //       weight: 73.6
        //     },
        //     {
        //       gender: "female",
        //       height: 162.6,
        //       weight: 61.4
        //     },
        //     {
        //       gender: "female",
        //       height: 174,
        //       weight: 55.5
        //     },
        //     {
        //       gender: "female",
        //       height: 162.6,
        //       weight: 63.6
        //     },
        //     {
        //       gender: "female",
        //       height: 161.3,
        //       weight: 60.9
        //     },
        //     {
        //       gender: "female",
        //       height: 156.2,
        //       weight: 60
        //     },
        //     {
        //       gender: "female",
        //       height: 149.9,
        //       weight: 46.8
        //     },
        //     {
        //       gender: "female",
        //       height: 169.5,
        //       weight: 57.3
        //     },
        //     {
        //       gender: "female",
        //       height: 160,
        //       weight: 64.1
        //     },
        //     {
        //       gender: "female",
        //       height: 175.3,
        //       weight: 63.6
        //     },
        //     {
        //       gender: "female",
        //       height: 169.5,
        //       weight: 67.3
        //     },
        //     {
        //       gender: "female",
        //       height: 160,
        //       weight: 75.5
        //     },
        //     {
        //       gender: "female",
        //       height: 172.7,
        //       weight: 68.2
        //     },
        //     {
        //       gender: "female",
        //       height: 162.6,
        //       weight: 61.4
        //     },
        //     {
        //       gender: "female",
        //       height: 157.5,
        //       weight: 76.8
        //     },
        //     {
        //       gender: "female",
        //       height: 176.5,
        //       weight: 71.8
        //     },
        //     {
        //       gender: "female",
        //       height: 164.4,
        //       weight: 55.5
        //     },
        //     {
        //       gender: "female",
        //       height: 160.7,
        //       weight: 48.6
        //     },
        //     {
        //       gender: "female",
        //       height: 174,
        //       weight: 66.4
        //     },
        //     {
        //       gender: "female",
        //       height: 163.8,
        //       weight: 67.3
        //     },
        //     {
        //       gender: "male",
        //       height: 174,
        //       weight: 65.6
        //     },
        //     {
        //       gender: "male",
        //       height: 175.3,
        //       weight: 71.8
        //     },
        //     {
        //       gender: "male",
        //       height: 193.5,
        //       weight: 80.7
        //     },
        //     {
        //       gender: "male",
        //       height: 186.5,
        //       weight: 72.6
        //     },
        //     {
        //       gender: "male",
        //       height: 187.2,
        //       weight: 78.8
        //     },
        //     {
        //       gender: "male",
        //       height: 181.5,
        //       weight: 74.8
        //     },
        //     {
        //       gender: "male",
        //       height: 184,
        //       weight: 86.4
        //     },
        //     {
        //       gender: "male",
        //       height: 184.5,
        //       weight: 78.4
        //     },
        //     {
        //       gender: "male",
        //       height: 175,
        //       weight: 62
        //     },
        //     {
        //       gender: "male",
        //       height: 184,
        //       weight: 81.6
        //     },
        //     {
        //       gender: "male",
        //       height: 180,
        //       weight: 76.6
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 83.6
        //     },
        //     {
        //       gender: "male",
        //       height: 192,
        //       weight: 90
        //     },
        //     {
        //       gender: "male",
        //       height: 176,
        //       weight: 74.6
        //     },
        //     {
        //       gender: "male",
        //       height: 174,
        //       weight: 71
        //     },
        //     {
        //       gender: "male",
        //       height: 184,
        //       weight: 79.6
        //     },
        //     {
        //       gender: "male",
        //       height: 192.7,
        //       weight: 93.8
        //     },
        //     {
        //       gender: "male",
        //       height: 171.5,
        //       weight: 70
        //     },
        //     {
        //       gender: "male",
        //       height: 173,
        //       weight: 72.4
        //     },
        //     {
        //       gender: "male",
        //       height: 176,
        //       weight: 85.9
        //     },
        //     {
        //       gender: "male",
        //       height: 176,
        //       weight: 78.8
        //     },
        //     {
        //       gender: "male",
        //       height: 180.5,
        //       weight: 77.8
        //     },
        //     {
        //       gender: "male",
        //       height: 172.7,
        //       weight: 66.2
        //     },
        //     {
        //       gender: "male",
        //       height: 176,
        //       weight: 86.4
        //     },
        //     {
        //       gender: "male",
        //       height: 173.5,
        //       weight: 81.8
        //     },
        //     {
        //       gender: "male",
        //       height: 178,
        //       weight: 89.6
        //     },
        //     {
        //       gender: "male",
        //       height: 180.3,
        //       weight: 82.8
        //     },
        //     {
        //       gender: "male",
        //       height: 180.3,
        //       weight: 76.4
        //     },
        //     {
        //       gender: "male",
        //       height: 164.5,
        //       weight: 63.2
        //     },
        //     {
        //       gender: "male",
        //       height: 173,
        //       weight: 60.9
        //     },
        //     {
        //       gender: "male",
        //       height: 183.5,
        //       weight: 74.8
        //     },
        //     {
        //       gender: "male",
        //       height: 175.5,
        //       weight: 70
        //     },
        //     {
        //       gender: "male",
        //       height: 188,
        //       weight: 72.4
        //     },
        //     {
        //       gender: "male",
        //       height: 189.2,
        //       weight: 84.1
        //     },
        //     {
        //       gender: "male",
        //       height: 172.8,
        //       weight: 69.1
        //     },
        //     {
        //       gender: "male",
        //       height: 170,
        //       weight: 59.5
        //     },
        //     {
        //       gender: "male",
        //       height: 182,
        //       weight: 67.2
        //     },
        //     {
        //       gender: "male",
        //       height: 170,
        //       weight: 61.3
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 68.6
        //     },
        //     {
        //       gender: "male",
        //       height: 184.2,
        //       weight: 80.1
        //     },
        //     {
        //       gender: "male",
        //       height: 186.7,
        //       weight: 87.8
        //     },
        //     {
        //       gender: "male",
        //       height: 171.4,
        //       weight: 84.7
        //     },
        //     {
        //       gender: "male",
        //       height: 172.7,
        //       weight: 73.4
        //     },
        //     {
        //       gender: "male",
        //       height: 175.3,
        //       weight: 72.1
        //     },
        //     {
        //       gender: "male",
        //       height: 180.3,
        //       weight: 82.6
        //     },
        //     {
        //       gender: "male",
        //       height: 182.9,
        //       weight: 88.7
        //     },
        //     {
        //       gender: "male",
        //       height: 188,
        //       weight: 84.1
        //     },
        //     {
        //       gender: "male",
        //       height: 177.2,
        //       weight: 94.1
        //     },
        //     {
        //       gender: "male",
        //       height: 172.1,
        //       weight: 74.9
        //     },
        //     {
        //       gender: "male",
        //       height: 167,
        //       weight: 59.1
        //     },
        //     {
        //       gender: "male",
        //       height: 169.5,
        //       weight: 75.6
        //     },
        //     {
        //       gender: "male",
        //       height: 174,
        //       weight: 86.2
        //     },
        //     {
        //       gender: "male",
        //       height: 172.7,
        //       weight: 75.3
        //     },
        //     {
        //       gender: "male",
        //       height: 182.2,
        //       weight: 87.1
        //     },
        //     {
        //       gender: "male",
        //       height: 164.1,
        //       weight: 55.2
        //     },
        //     {
        //       gender: "male",
        //       height: 163,
        //       weight: 57
        //     },
        //     {
        //       gender: "male",
        //       height: 171.5,
        //       weight: 61.4
        //     },
        //     {
        //       gender: "male",
        //       height: 184.2,
        //       weight: 76.8
        //     },
        //     {
        //       gender: "male",
        //       height: 174,
        //       weight: 86.8
        //     },
        //     {
        //       gender: "male",
        //       height: 174,
        //       weight: 72.2
        //     },
        //     {
        //       gender: "male",
        //       height: 177,
        //       weight: 71.6
        //     },
        //     {
        //       gender: "male",
        //       height: 186,
        //       weight: 84.8
        //     },
        //     {
        //       gender: "male",
        //       height: 167,
        //       weight: 68.2
        //     },
        //     {
        //       gender: "male",
        //       height: 171.8,
        //       weight: 66.1
        //     },
        //     {
        //       gender: "male",
        //       height: 182,
        //       weight: 72
        //     },
        //     {
        //       gender: "male",
        //       height: 167,
        //       weight: 64.6
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 74.8
        //     },
        //     {
        //       gender: "male",
        //       height: 164.5,
        //       weight: 70
        //     },
        //     {
        //       gender: "male",
        //       height: 192,
        //       weight: 101.6
        //     },
        //     {
        //       gender: "male",
        //       height: 175.5,
        //       weight: 63.2
        //     },
        //     {
        //       gender: "male",
        //       height: 171.2,
        //       weight: 79.1
        //     },
        //     {
        //       gender: "male",
        //       height: 181.6,
        //       weight: 78.9
        //     },
        //     {
        //       gender: "male",
        //       height: 167.4,
        //       weight: 67.7
        //     },
        //     {
        //       gender: "male",
        //       height: 181.1,
        //       weight: 66
        //     },
        //     {
        //       gender: "male",
        //       height: 177,
        //       weight: 68.2
        //     },
        //     {
        //       gender: "male",
        //       height: 174.5,
        //       weight: 63.9
        //     },
        //     {
        //       gender: "male",
        //       height: 177.5,
        //       weight: 72
        //     },
        //     {
        //       gender: "male",
        //       height: 170.5,
        //       weight: 56.8
        //     },
        //     {
        //       gender: "male",
        //       height: 182.4,
        //       weight: 74.5
        //     },
        //     {
        //       gender: "male",
        //       height: 197.1,
        //       weight: 90.9
        //     },
        //     {
        //       gender: "male",
        //       height: 180.1,
        //       weight: 93
        //     },
        //     {
        //       gender: "male",
        //       height: 175.5,
        //       weight: 80.9
        //     },
        //     {
        //       gender: "male",
        //       height: 180.6,
        //       weight: 72.7
        //     },
        //     {
        //       gender: "male",
        //       height: 184.4,
        //       weight: 68
        //     },
        //     {
        //       gender: "male",
        //       height: 175.5,
        //       weight: 70.9
        //     },
        //     {
        //       gender: "male",
        //       height: 180.6,
        //       weight: 72.5
        //     },
        //     {
        //       gender: "male",
        //       height: 177,
        //       weight: 72.5
        //     },
        //     {
        //       gender: "male",
        //       height: 177.1,
        //       weight: 83.4
        //     },
        //     {
        //       gender: "male",
        //       height: 181.6,
        //       weight: 75.5
        //     },
        //     {
        //       gender: "male",
        //       height: 176.5,
        //       weight: 73
        //     },
        //     {
        //       gender: "male",
        //       height: 175,
        //       weight: 70.2
        //     },
        //     {
        //       gender: "male",
        //       height: 174,
        //       weight: 73.4
        //     },
        //     {
        //       gender: "male",
        //       height: 165.1,
        //       weight: 70.5
        //     },
        //     {
        //       gender: "male",
        //       height: 177,
        //       weight: 68.9
        //     },
        //     {
        //       gender: "male",
        //       height: 192,
        //       weight: 102.3
        //     },
        //     {
        //       gender: "male",
        //       height: 176.5,
        //       weight: 68.4
        //     },
        //     {
        //       gender: "male",
        //       height: 169.4,
        //       weight: 65.9
        //     },
        //     {
        //       gender: "male",
        //       height: 182.1,
        //       weight: 75.7
        //     },
        //     {
        //       gender: "male",
        //       height: 179.8,
        //       weight: 84.5
        //     },
        //     {
        //       gender: "male",
        //       height: 175.3,
        //       weight: 87.7
        //     },
        //     {
        //       gender: "male",
        //       height: 184.9,
        //       weight: 86.4
        //     },
        //     {
        //       gender: "male",
        //       height: 177.3,
        //       weight: 73.2
        //     },
        //     {
        //       gender: "male",
        //       height: 167.4,
        //       weight: 53.9
        //     },
        //     {
        //       gender: "male",
        //       height: 178.1,
        //       weight: 72
        //     },
        //     {
        //       gender: "male",
        //       height: 168.9,
        //       weight: 55.5
        //     },
        //     {
        //       gender: "male",
        //       height: 157.2,
        //       weight: 58.4
        //     },
        //     {
        //       gender: "male",
        //       height: 180.3,
        //       weight: 83.2
        //     },
        //     {
        //       gender: "male",
        //       height: 170.2,
        //       weight: 72.7
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 64.1
        //     },
        //     {
        //       gender: "male",
        //       height: 172.7,
        //       weight: 72.3
        //     },
        //     {
        //       gender: "male",
        //       height: 165.1,
        //       weight: 65
        //     },
        //     {
        //       gender: "male",
        //       height: 186.7,
        //       weight: 86.4
        //     },
        //     {
        //       gender: "male",
        //       height: 165.1,
        //       weight: 65
        //     },
        //     {
        //       gender: "male",
        //       height: 174,
        //       weight: 88.6
        //     },
        //     {
        //       gender: "male",
        //       height: 175.3,
        //       weight: 84.1
        //     },
        //     {
        //       gender: "male",
        //       height: 185.4,
        //       weight: 66.8
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 75.5
        //     },
        //     {
        //       gender: "male",
        //       height: 180.3,
        //       weight: 93.2
        //     },
        //     {
        //       gender: "male",
        //       height: 180.3,
        //       weight: 82.7
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 58
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 79.5
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 78.6
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 71.8
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 116.4
        //     },
        //     {
        //       gender: "male",
        //       height: 163.8,
        //       weight: 72.2
        //     },
        //     {
        //       gender: "male",
        //       height: 188,
        //       weight: 83.6
        //     },
        //     {
        //       gender: "male",
        //       height: 198.1,
        //       weight: 85.5
        //     },
        //     {
        //       gender: "male",
        //       height: 175.3,
        //       weight: 90.9
        //     },
        //     {
        //       gender: "male",
        //       height: 166.4,
        //       weight: 85.9
        //     },
        //     {
        //       gender: "male",
        //       height: 190.5,
        //       weight: 89.1
        //     },
        //     {
        //       gender: "male",
        //       height: 166.4,
        //       weight: 75
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 77.7
        //     },
        //     {
        //       gender: "male",
        //       height: 179.7,
        //       weight: 86.4
        //     },
        //     {
        //       gender: "male",
        //       height: 172.7,
        //       weight: 90.9
        //     },
        //     {
        //       gender: "male",
        //       height: 190.5,
        //       weight: 73.6
        //     },
        //     {
        //       gender: "male",
        //       height: 185.4,
        //       weight: 76.4
        //     },
        //     {
        //       gender: "male",
        //       height: 168.9,
        //       weight: 69.1
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 84.5
        //     },
        //     {
        //       gender: "male",
        //       height: 175.3,
        //       weight: 64.5
        //     },
        //     {
        //       gender: "male",
        //       height: 170.2,
        //       weight: 69.1
        //     },
        //     {
        //       gender: "male",
        //       height: 190.5,
        //       weight: 108.6
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 86.4
        //     },
        //     {
        //       gender: "male",
        //       height: 190.5,
        //       weight: 80.9
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 87.7
        //     },
        //     {
        //       gender: "male",
        //       height: 184.2,
        //       weight: 94.5
        //     },
        //     {
        //       gender: "male",
        //       height: 176.5,
        //       weight: 80.2
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 72
        //     },
        //     {
        //       gender: "male",
        //       height: 180.3,
        //       weight: 71.4
        //     },
        //     {
        //       gender: "male",
        //       height: 171.4,
        //       weight: 72.7
        //     },
        //     {
        //       gender: "male",
        //       height: 172.7,
        //       weight: 84.1
        //     },
        //     {
        //       gender: "male",
        //       height: 172.7,
        //       weight: 76.8
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 63.6
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 80.9
        //     },
        //     {
        //       gender: "male",
        //       height: 182.9,
        //       weight: 80.9
        //     },
        //     {
        //       gender: "male",
        //       height: 170.2,
        //       weight: 85.5
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 68.6
        //     },
        //     {
        //       gender: "male",
        //       height: 175.3,
        //       weight: 67.7
        //     },
        //     {
        //       gender: "male",
        //       height: 165.1,
        //       weight: 66.4
        //     },
        //     {
        //       gender: "male",
        //       height: 185.4,
        //       weight: 102.3
        //     },
        //     {
        //       gender: "male",
        //       height: 181.6,
        //       weight: 70.5
        //     },
        //     {
        //       gender: "male",
        //       height: 172.7,
        //       weight: 95.9
        //     },
        //     {
        //       gender: "male",
        //       height: 190.5,
        //       weight: 84.1
        //     },
        //     {
        //       gender: "male",
        //       height: 179.1,
        //       weight: 87.3
        //     },
        //     {
        //       gender: "male",
        //       height: 175.3,
        //       weight: 71.8
        //     },
        //     {
        //       gender: "male",
        //       height: 170.2,
        //       weight: 65.9
        //     },
        //     {
        //       gender: "male",
        //       height: 193,
        //       weight: 95.9
        //     },
        //     {
        //       gender: "male",
        //       height: 171.4,
        //       weight: 91.4
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 81.8
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 96.8
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 69.1
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 82.7
        //     },
        //     {
        //       gender: "male",
        //       height: 180.3,
        //       weight: 75.5
        //     },
        //     {
        //       gender: "male",
        //       height: 182.9,
        //       weight: 79.5
        //     },
        //     {
        //       gender: "male",
        //       height: 176.5,
        //       weight: 73.6
        //     },
        //     {
        //       gender: "male",
        //       height: 186.7,
        //       weight: 91.8
        //     },
        //     {
        //       gender: "male",
        //       height: 188,
        //       weight: 84.1
        //     },
        //     {
        //       gender: "male",
        //       height: 188,
        //       weight: 85.9
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 81.8
        //     },
        //     {
        //       gender: "male",
        //       height: 174,
        //       weight: 82.5
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 80.5
        //     },
        //     {
        //       gender: "male",
        //       height: 171.4,
        //       weight: 70
        //     },
        //     {
        //       gender: "male",
        //       height: 185.4,
        //       weight: 81.8
        //     },
        //     {
        //       gender: "male",
        //       height: 185.4,
        //       weight: 84.1
        //     },
        //     {
        //       gender: "male",
        //       height: 188,
        //       weight: 90.5
        //     },
        //     {
        //       gender: "male",
        //       height: 188,
        //       weight: 91.4
        //     },
        //     {
        //       gender: "male",
        //       height: 182.9,
        //       weight: 89.1
        //     },
        //     {
        //       gender: "male",
        //       height: 176.5,
        //       weight: 85
        //     },
        //     {
        //       gender: "male",
        //       height: 175.3,
        //       weight: 69.1
        //     },
        //     {
        //       gender: "male",
        //       height: 175.3,
        //       weight: 73.6
        //     },
        //     {
        //       gender: "male",
        //       height: 188,
        //       weight: 80.5
        //     },
        //     {
        //       gender: "male",
        //       height: 188,
        //       weight: 82.7
        //     },
        //     {
        //       gender: "male",
        //       height: 175.3,
        //       weight: 86.4
        //     },
        //     {
        //       gender: "male",
        //       height: 170.5,
        //       weight: 67.7
        //     },
        //     {
        //       gender: "male",
        //       height: 179.1,
        //       weight: 92.7
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 93.6
        //     },
        //     {
        //       gender: "male",
        //       height: 175.3,
        //       weight: 70.9
        //     },
        //     {
        //       gender: "male",
        //       height: 182.9,
        //       weight: 75
        //     },
        //     {
        //       gender: "male",
        //       height: 170.8,
        //       weight: 93.2
        //     },
        //     {
        //       gender: "male",
        //       height: 188,
        //       weight: 93.2
        //     },
        //     {
        //       gender: "male",
        //       height: 180.3,
        //       weight: 77.7
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 61.4
        //     },
        //     {
        //       gender: "male",
        //       height: 185.4,
        //       weight: 94.1
        //     },
        //     {
        //       gender: "male",
        //       height: 168.9,
        //       weight: 75
        //     },
        //     {
        //       gender: "male",
        //       height: 185.4,
        //       weight: 83.6
        //     },
        //     {
        //       gender: "male",
        //       height: 180.3,
        //       weight: 85.5
        //     },
        //     {
        //       gender: "male",
        //       height: 174,
        //       weight: 73.9
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 66.8
        //     },
        //     {
        //       gender: "male",
        //       height: 182.9,
        //       weight: 87.3
        //     },
        //     {
        //       gender: "male",
        //       height: 160,
        //       weight: 72.3
        //     },
        //     {
        //       gender: "male",
        //       height: 180.3,
        //       weight: 88.6
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 75.5
        //     },
        //     {
        //       gender: "male",
        //       height: 186.7,
        //       weight: 101.4
        //     },
        //     {
        //       gender: "male",
        //       height: 175.3,
        //       weight: 91.1
        //     },
        //     {
        //       gender: "male",
        //       height: 175.3,
        //       weight: 67.3
        //     },
        //     {
        //       gender: "male",
        //       height: 175.9,
        //       weight: 77.7
        //     },
        //     {
        //       gender: "male",
        //       height: 175.3,
        //       weight: 81.8
        //     },
        //     {
        //       gender: "male",
        //       height: 179.1,
        //       weight: 75.5
        //     },
        //     {
        //       gender: "male",
        //       height: 181.6,
        //       weight: 84.5
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 76.6
        //     },
        //     {
        //       gender: "male",
        //       height: 182.9,
        //       weight: 85
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 102.5
        //     },
        //     {
        //       gender: "male",
        //       height: 184.2,
        //       weight: 77.3
        //     },
        //     {
        //       gender: "male",
        //       height: 179.1,
        //       weight: 71.8
        //     },
        //     {
        //       gender: "male",
        //       height: 176.5,
        //       weight: 87.9
        //     },
        //     {
        //       gender: "male",
        //       height: 188,
        //       weight: 94.3
        //     },
        //     {
        //       gender: "male",
        //       height: 174,
        //       weight: 70.9
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 64.5
        //     },
        //     {
        //       gender: "male",
        //       height: 170.2,
        //       weight: 77.3
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 72.3
        //     },
        //     {
        //       gender: "male",
        //       height: 188,
        //       weight: 87.3
        //     },
        //     {
        //       gender: "male",
        //       height: 174,
        //       weight: 80
        //     },
        //     {
        //       gender: "male",
        //       height: 176.5,
        //       weight: 82.3
        //     },
        //     {
        //       gender: "male",
        //       height: 180.3,
        //       weight: 73.6
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 74.1
        //     },
        //     {
        //       gender: "male",
        //       height: 188,
        //       weight: 85.9
        //     },
        //     {
        //       gender: "male",
        //       height: 180.3,
        //       weight: 73.2
        //     },
        //     {
        //       gender: "male",
        //       height: 167.6,
        //       weight: 76.3
        //     },
        //     {
        //       gender: "male",
        //       height: 183,
        //       weight: 65.9
        //     },
        //     {
        //       gender: "male",
        //       height: 183,
        //       weight: 90.9
        //     },
        //     {
        //       gender: "male",
        //       height: 179.1,
        //       weight: 89.1
        //     },
        //     {
        //       gender: "male",
        //       height: 170.2,
        //       weight: 62.3
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 82.7
        //     },
        //     {
        //       gender: "male",
        //       height: 179.1,
        //       weight: 79.1
        //     },
        //     {
        //       gender: "male",
        //       height: 190.5,
        //       weight: 98.2
        //     },
        //     {
        //       gender: "male",
        //       height: 177.8,
        //       weight: 84.1
        //     },
        //     {
        //       gender: "male",
        //       height: 180.3,
        //       weight: 83.2
        //     },
        //     {
        //       gender: "male",
        //       height: 180.3,
        //       weight: 83.2
        //     }
        //   ],
			custom: [ 'pca_comp1', 'pca_comp2', 'sample_name' ], // x y category
		  data:[{"sample_name":"KO_elo","pca_comp1":-0.414345827931845,"pca_comp2":0.234081607476174},{"sample_name":"KO_pac","pca_comp1":-0.418018469635253,"pca_comp2":0.0008428518728297},{"sample_name":"KO_rou","pca_comp1":-0.408099550781589,"pca_comp2":0.419796881420451},{"sample_name":"WT_elo","pca_comp1":-0.407906990171309,"pca_comp2":0.374828429512092},{"sample_name":"WT_pac","pca_comp1":-0.38973256808292,"pca_comp2":-0.710069138131184},{"sample_name":"WT_rou","pca_comp1":-0.410795890091437,"pca_comp2":-0.352535298225427}]
        },
        axis: {
          x: {
            title: "Height(CM)",
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setXTitle(name);
                this.updateTitle();
              }
            },
			rotate:45
          },
          y: {
            title: "Weight(KG)",
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setYTitle(name);
                this.updateTitle();
              }
            },
			rotate:60
          }
        },
        legend: {
          show: true,
          position: "right",
          dblclick: (d, i) => {
            this.$refs.inputColor.click();
            this.i = i;
          },
          data: ["female", "male"]
        },
        tooltip: function(d) {
			console.log(d)
          return (
            "<span>身高：" +
            d.height +
            "</span><br><span>体重：" +
            d.weight +
            "</span>"
          );
        }
      }
    };
  },
  mounted() {
    this.chart = this.d4.init(this.config);
	console.log(this.chart)
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
