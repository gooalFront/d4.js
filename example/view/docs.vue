<template>
	<div id="docs">
		<top></top>
		<div class="doc-wrap">
			<div class="doc-tree">
				<p class="level1">start</p>
				<p class="desc">图的基础配置和使用</p><br>
				<codemirror ref="code"
					v-model="code"
					:options="options"
				></codemirror>
			</div>
			<ul class="doc-tree" v-for="val,category in allDoc" >
				<li>
					<div class="level1">{{category}}</div>
					<ol v-for="item in val">
						<li :class="{ 'level2': i===0 ,'level2-code':i===item.length-1 && item.length>2}" v-for="v,i in item">{{v}}</li>
					</ol>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import top from "../top.vue";
	export default {
		name: "docs",
		computed: {
			options: function() {
				return {
					mode: "javascript",
					tabSize:2,
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
				allDoc:{
					"chart":[
						["el<string>","挂载元素,画图的宿主元素","描述2",'el:"#content"'],
						["type<string>","图表类型","可选值有:line，categoryLine，bar，groupBar，stackBar，stackBarPercent，pie，pie-rose，scatter，area，boxplot，cluster，complexCluster，bubble，group，circos，risingSun，CircleTree，manhattan",'type:"line"']
					]
				},
				code:`
				let options = {
					chart: {
						title: "柱状图",
						click: function(event) {
							var name = prompt("请输入需要修改的标题", "");
							if (name) {
								this.setChartTitle(name);
								this.updateTitle();
							}
						},
						el: "#chart-bar",
						type: "bar",
						data: [
							{ key: "一月", value: 145 },
							{ key: "二月", value: 220 },
							{ key: "三月", value: 1850 },
							{ key: "四月", value: 590 },
							{ key: "五月", value: 200 },
							{ key: "六月", value: 480 }
						]
					},
					axis: {
						x: {
							title: "x标题"
						},
						y: {
							title: "y标题"
						}
					},
					legend: {
						show: true,
					},
					"tooltip": function(d) {
						return "<span>x:"+d.key+"</span><span>y:"+d.value+"</span>"
					}
				}

				let chart = new d4().init(options);
				`,
				allDoc:{
					"chart":[
						["el:string","挂载元素,可以为class或者id",'el:"#content"'],
						["type:string","图表类型","可选值有:line，categoryLine，bar，groupBar，stackBar，stackBarPercent，pie，pie-rose，scatter，area，boxplot，cluster，complexCluster，bubble，group，manhattan",'type:"line"'],
						["data:Object[]","用于画图的数据","data:[{name:'joke',age:'18',sex:'male'}，{name:'june',age:'52',sex:'male'}]"],
						["custom:string[]","指定用数据中的key去画图，默认值'key','value','category'","custom:['name','age','sex']"],
						["orderBy:string[]","对于散列的x方向需要定制数据顺序，可以传入期望的顺序达到排序的效果","orderBy:['june','joke]"],
						["title:string","图的标题","title:'标题'"],
						["enableChartSelect:boolean","是否开启图的数据选择,默认false","enableChartSelect:true"],
						["colors:string[]","画图使用的颜色，默认使用配置颜色","colors:['#ccc','red']"],
						["direction:string","针对柱状图有效，horizontal / vertical (柱子方向，水平或者垂直)","direction:horizontal"],
						["interpolate:string","线的插值方式,仅针对折线图有效,默认linear","可选:cardinal / step / natural / linear / basic","interpolate:'step'"],
						["padding:number","留白，针对柱状图柱子的留白，饼图，环形图，玫瑰图  自定义饼间距有效，值的范围是：0-1"],
						["innerPadding:number","分组柱状图的分组内柱子留白,针对分组柱状图有效，值的范围是：0-1"]
						["radius:number","图中有圆形的时候有用，设置圆的半径","radius:4"],
						["outerRadius:number","外圆半径，针对饼图，环形图，玫瑰图","outerRadius:120"],
						["innerRadius:number","内圆半径，针对饼图，环形图，玫瑰图","innerRadius:80"],
						["minRadius:number","针对玫瑰图  内圆最小半径，不传默认0","minRadius:10"],
						["hoverRadius:number","针对散点图，设置鼠标hover半径大小","hoverRadius:6"],
						["startAngle:number","针对饼图，环形图，玫瑰图圆的起始角度","startAngle:0"],
						["endAngle:number","针对饼图，环形图，玫瑰图圆的结束角度","endAngle:360"],
						["showLabel:boolean","针对饼图，环形图，玫瑰图  是否显示文字信息，默认true","showLabel:false"],
						["scatter:object","针对箱线图的配置","show:是否显示箱线图上的散点","style:散点的样式","{show:true,style:{fill:#000}}"],
						["heatmap:object","针对聚类图的设置","width:宽度","height:高度","heatmap:{width:400,height:400}"],
						["leftCluster:object","针对聚类图的设置","show:是否显示聚类左侧树","stroke:树的颜色","leftCluster:{show:true,stroke:'#ccc'}"],
						["topCluster:object","针对聚类图的设置","show:是否显示聚类顶部树","stroke:树的颜色","topCluster:{show:true,stroke:'#ccc'}"],
						["dblclick:function","args:this,event,DomElement","图标题的双击事件","dblclick:function(event,el){}"],
						["mouseover:function","args:this,event,DomElement","图标题的鼠标移入事件","mouseover:function(event,el){}"],
						["onselect:function","args:data:object[]","图开启数据选择的时候，选择数据的回调函数","onselect:function(data){}"],
						["clearselect:function","图开启数据选择的时候，清空数据的回调","clearselect:function(){}"]
					],
					"axis":[
						["x:object","x轴的配置(y同理)","x:{title:'',dblclick:function(event){},rotate:45,formatter:val=>val+'%',position:'bottom'}"],
						["title:string","轴标题","x:{ttile:'x axis'}"],
						["dblclick:function(event)","轴标题","x:{ttile:'x axis'}"],
						["rotate:number","轴上的文字旋转度数","x:{rotate:60}"],
						["formatter:function(value)","轴标签格式化","x:{formatter:val=>val+'%'}"],
						["position:string","轴的位置，x可选为 top / bottom","y可选为 left / right"]
					],
					"legend":[
						["show:boolean","是否显示图例，默认为true","show:false"],
						["type:gradient","图例类型，默认不填为矩形图例，可选为'gradient'渐变图例","type:'gradient'"],
						["separation","针对组合图，是否需要分组画图例","separation:true"],
						["title:string","图例标题,默认为空","title:legend title"],
						["dblclick:function(dom,index)","dom:当前双击的dom元素","index:当前图例的索引","dblclick:function(d,i)"]
					],
					"tooltip":[
						["tooltip:function(d)","d:提示框当前数据","tooltip:function(d){ return `<span>样本${d.name}</span>` } "],
						["tooltip:function(d)[]","当前数据格式仅针对组合图","d:提示框当前数据","tooltip:[function(d){ return `<span>样本${d.name}</span>` }] "]
					],
					"图表对象属性":[
						["redraw:重画图"],
						["setChartTitle:设置图的标题"],
						["setXTitle:设置图的x标题"],
						["setYTitle:设置图的y标题"],
						["updateTitle:更新所有的标题"],
						["getChartSelectModule:获取图当前的选择模式"],
						["setChartSelectModule:设置图的选择模式"],
						["getColors:获取图的颜色"],
						["setColor:设置图的颜色"],
						["setAColor:设置图的rgba颜色"],
						["getOptions:获取图的配置信息"],
						["setOptions:设置图的配置信息"],
						["getRootConfig:获取图的全局配置"],
						["resetChartSelect:重置图的选择状态"]
					]
				}
			}
		},
		methods: {},
		components:{top}
	};
</script>


