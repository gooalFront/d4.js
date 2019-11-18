![webpack](https://img.shields.io/badge/webpack-3.12-orange.svg) ![npm](https://img.shields.io/badge/npm-6.1.0-orange.svg) ![d3](https://img.shields.io/badge/d3-4.13.0-orange.svg) ![node](https://img.shields.io/badge/node-8.9.3-orange.svg)

### repo 
从github迁移至码云

### 功能
> 基础画图
> 标题修改
> 颜色修改
> 数据选择（基础图仅限柱状图，饼图，散点图）
> 坐标轴方向可选 （针对基础图）


### 配置
```javascript
	options:{
		chart:{
			// el mouted
			el:"#el",
			// chart type
			type:'line'
			// data of chart
			data:[],
			// title describe
			title:'this is title describe',
			// title click callback
			dblclick:function(){}
			// title mouseover callback  参数分别是事件对象和当前title的d3对象
			mouseover:function(ev,obj){}
			 // 自定义颜色
			colors:[],
			// title mouseout callback 参数同上
			mouseout:function(ev,obj){}
			// 是否开启图的数据选择
			enableChartSelect:true,
			// 数据选择时候的回调，参数是选择的数据
			padding:1, // 最大1 柱子的留白 0-1
			innerPadding,// 分组柱状图的分组内柱子留白 0-1
			onselect:function(data){}, // 选择数据的时候回调
			clearselect:function(){} // 清空数据的时候回调
			// 画图时使用的数据key 默认是 x,y,category（按顺序来） 不想使用默认的数据key时  可以另外指定
			custom:['key','value','category']
			direction:"horizontal" // 针对柱状图有效，horizontal / vertical (柱子方向，水平或者垂直)
			// 自定义分类顺序 针对有分类的图
			orderBy:[],
			// 是否平滑 针对折线有用  'cardinal step natural linear basic default->linear
			interpolate:'cardinal',
			// 针对饼图，环形图，玫瑰图  自定义饼间距
			padding:0.02,
			// 针对饼图，环形图，玫瑰图 外圆半径
			outerRadius:120,
			// 针对饼图，环形图，玫瑰图 内圆半径
			innerRadius:0
			//  针对饼图，环形图，玫瑰图 开始角度
			startAngle:0,
			// 针对饼图，环形图，玫瑰图 结束角度
			endAngle:360,
			// 针对饼图，环形图，玫瑰图  是否显示文字信息
			showLabel:true,
			 // 针对玫瑰图  内圆最小半径，不传默认0
			minRadius: 100,
			// 图中有圆形的时候有用，设置圆的半径
			radius:4,
			// 针对散点图，设置鼠标hover半径大小
			hoverRadius:6,
			// 针对箱线图的配置
			scatter:{
				show:true,
				style:{
					fill:"#000"
				}
			}，
			// 针对聚类图的配置
			heatmap:{
				width:480,
				height:480
			},
			leftCluster:{
				show:true,
				stroke:"#ccc"
			},
			topCluster:{
				show:true,
				stroke:"#ccc"
			},
		},
		axis:{
			x:{
				// x 标题
				title:"x标题",
				// x标题点击回调
				dblclick:function(event){
					// this
				},
				// x轴文字旋转
				rotate:60,
				//基础图适用 x轴刻度文字格式化函数 val当前的刻度文字
				formatter:val=>val,
				position:"bottom" // bottom top
			},
			y:{
				// y 标题
				title:"y标题",
				 // y标题点击回调
				dblclick:function(event){
					// this
				},
				//基础图适用 y轴刻度文字格式化函数 val当前的刻度文字
				formatter:val=>val,
				position:"left" // left right
			},
		},
		legend:{
				// 是否显示图例
				show: true,
				//图例标题  默认不做溢出处理
				title:"sample num",
				// 图例位置 目前只能right
				position: "right",
				// 图例双击回调
				dblclick: function(d,i) {
					console.log(d,i);
				}
		},
		// 提示框 d当前数据
		tooltip:function(d){
			return (
					"<span>样本：" +
					d.data.sample_name +
					"</span><br><span>占比：" +
					(d[1]-d[0]) +
					"%</span>"
				);
		}
	}
```



