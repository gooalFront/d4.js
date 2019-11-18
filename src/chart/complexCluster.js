/**
 * @time 2018/12/10
 * @author xiaofang<1692977129@qq.com>
 * @description 复杂聚类热图
 */

import Base from "./base";
import * as d3 from "d3";
import tooltip from "./tools/tooltip";
import { drawChartTitle } from "./tools/title";
import { drawLegend } from "./tools/legend";

class ComplexCluster extends Base {
	constructor(options, rootConfig,styleConfig) {
		super(options, rootConfig,styleConfig);
		this.drawCluster();
	}

	drawCluster() {
		d3.selectAll(`${this.chart.el} svg`).remove();
		let that = this;
		let timer=null;
		
		let leftIdReq=/[^a-zA-Z0-9\_\u4e00-\u9fa5]/gi;
		let leftSelectedData=[];

		let colors = [];
		let colorsLen = ("colors" in this.chart && this.chart.colors.length) ? this.chart.colors.length : 3;
        colors = this.colors.slice(0, colorsLen);

		//定义数据
		let data = this.chart.data;
		let min = data.min,
			max = data.max;
		let valuemin, valuemax;
		let leftLineData = data.left.line,
			topLineData = data.top.line,
			heatmapData = data.heatmaps;

		let legends=[], olegends = [];

		if (!!this.legend) {
			if ("min" in this.legend) {
				valuemin = this.legend.min;
			} else {
				valuemin = min;
			}

			if('max' in this.legend){
				valuemax = this.legend.max;
			}else{
				valuemax = max;
			}

			if(this.legend.data){
				legends=this.legend.data;
			}

			if (!!this.legend.oLegend && !!this.legend.oLegend.data) {
				olegends = this.legend.oLegend.data;
			}
		}

		let sumColorsNum=0;
		let beforeColorsLen=0;
		olegends.forEach(d=>{
			// d.data.forEach((m, j) => {
			// 	if (m === null) {
			// 		d.data.splice(j, 1);
			// 	}
			// });
			d.data=d.data.filter(m=>m!=null);
			sumColorsNum+=d.data.length;
			beforeColorsLen=sumColorsNum-d.data.length;
			d.bColorsLen=beforeColorsLen;
		})

		let othercolorsLen = sumColorsNum;
		let gaugeColors=this.otherColors.slice(0,othercolorsLen);

		let topSimples = [];
		let topComplexes = [];
		if (data.top.simple && data.top.simple.length) {
			topSimples = data.top.simple;
		}
		if (data.top.complex && data.top.complex.length) {
			topComplexes = data.top.complex;
		}

		let leftSimples = [];
		let leftComplexes = [];
		if (data.left.simple && data.left.simple.length) {
			leftSimples = data.left.simple;
		}
		if (data.left.complex && data.left.complex.length) {
			leftComplexes = data.left.complex;
		}

		let isTopCluster = true;
		let isLeftCluster = true;
		if (JSON.stringify(leftLineData)==='{}') {
			isLeftCluster = false;
		}
		if (JSON.stringify(topLineData)==='{}') {
			isTopCluster = false;
		}

		let heatmapData_len = heatmapData.length;
		let YgeneDataLen = heatmapData[0].heatmap.length;

		//定义图例的宽高
		let legend_width = this.styleConfig.gradientLegend.w;
		let legend_height = this.styleConfig.gradientLegend.h;

		let space = 10; //heatmap与周边的间距
		let small_space = 3; //图例与热图右边文字间距

		//文字最长
		let xTexts=[];
        leftSimples.forEach(d=>{
            xTexts.push(d.title);
        })
        leftComplexes.forEach(d=>{
            xTexts.push(d.title)
        })
        heatmapData.forEach(d=>{
            xTexts.push(d.name);
        })
		let max_x_textLength = d3.max(xTexts, d => d.length);

		let max_y_textLength = 0;
		if('y' in this.axis && this.axis.y.type){
			if (this.axis.y.type !== "hidden") {
				if (this.axis.y.type === "id") {
					max_y_textLength = d3.max( heatmapData[0].heatmap, d => d.x.length );
				} else {
					max_y_textLength = d3.max( heatmapData[0].heatmap, d => d[this.axis.y.type].length );
				}
			}
		}

		//下边文字高度、右边文字的宽度
		let XtextHeight = max_x_textLength * 7;
		let YtextWidth = max_y_textLength * 7;

		//预留间距
		let margin = { top: 60, bottom: 40, left: 20, right: 40 };

		//定义热图宽高
		let heatmap_width = 0,
			heatmap_height = 0;

		//计算单个rect长和宽
		let single_rect_width = 0;
		let single_rect_height = 0;

		if (heatmapData_len <= 20) {
			heatmap_width = 480;
		} else {
			let single_width = 24;
			heatmap_width = single_width * heatmapData_len;
		}

		heatmap_height = 480;

		if('heatmap' in this.chart){
			if(this.chart.heatmap.width){
				heatmap_width = this.chart.heatmap.width;
			}

			if(this.chart.heatmap.height){
				heatmap_height = this.chart.heatmap.height;
			}
		}

		single_rect_width = heatmap_width / heatmapData_len;

		single_rect_height = heatmap_height / YgeneDataLen;

		//定义折线宽高
		let cluster_height = 0,
			cluster_width = 0;
		let topCluster_width = 0,
			topCluster_height = 0;

		if('left' in this.chart){
			if (this.chart.left.show && isLeftCluster) {
				cluster_height = heatmap_height;
				cluster_width = this.styleConfig.cluster.leftWidth;
			}
		}	

		if('top' in this.chart){
			if (this.chart.top.show && isTopCluster) {
				topCluster_width = heatmap_width;
				topCluster_height = this.styleConfig.cluster.topHeight;
			}
		}

		//top left rect width height
		let simpleRectWH = 16,
			complexRectWH = 6;

		// top
		let topSimpleHeight = topSimples.length * (simpleRectWH + small_space);
		let topComplexHeight = 0;
		if (topComplexes.length) {
			topComplexes.forEach(d => {
				let curHeight = d.data.length * (complexRectWH + small_space);
				d.h = curHeight;
				topComplexHeight += curHeight;
			});
		}
		let topColumnHeight = topSimpleHeight + topComplexHeight;

		//left
		let leftSimpleWidth = leftSimples.length * (simpleRectWH + small_space);
		let leftComplexWidth = 0;
		if (leftComplexes.length) {
			leftComplexes.forEach(d => {
				let curWidth = d.data.length * (complexRectWH + small_space);
				d.h = curWidth;
				leftComplexWidth += curWidth;
			});
		}
		let leftColumnWidth = leftSimpleWidth + leftComplexWidth;

		//热图区偏移
		let heatmap_x = margin.left + cluster_width + leftColumnWidth;
		let heatmap_y = margin.top + topCluster_height + topColumnHeight;

		//图例

		//颜色比例尺
        let colorDomains = [];
        for (let i = 0; i < colorsLen; i++) {
            let obj = valuemin + i * ((valuemax - valuemin) / (colorsLen - 1));
            colorDomains.push(obj);
		}
		
		let colorScale;
		if(this.legend.type && this.legend.type==='gradient'){
			colorScale = d3
				.scaleLinear()
				.domain(colorDomains)
				.range(colors)
				.interpolate(d3.interpolateRgb)
				.clamp(true);
		}else{
			colorScale = d3.scaleOrdinal()
				.domain([valuemin,valuemax])
				.range(colors)
		}

		let gradientLegendWidth = 0; //渐变图例总宽度

		if('legend' in this && this.legend.show){
			if(this.legend.type && this.legend.type==='gradient'){
				let legendTickMax=d3.max(colorScale.ticks(),d=>d.toString().length);
				gradientLegendWidth = legend_width + legendTickMax * 8;
			}else{
				gradientLegendWidth = legend_width + valuemax.toString().length * 8;
			}
		}

		let legendColNumScale = d3.scaleLinear().domain([200, 2000]).range([8, 80]).clamp(true);

		let OrdinalRectW = 16,
			OrdinalRectH = 16, // rect width height
			legend_chart_space = 36, //图例与图的距离
			legend_col_space = 32, //图例之间每列的距离
			text_space = 5, //rect text space
			bottom_space = 6; //rect 上下 space
		let legend_col_num = Math.floor(legendColNumScale(heatmap_height)); //每列个数
		let showMaxFontLenght = 1000; //图例最多显示1000个字符
		let OrdinalLegendWidth = 0;	//离散图例总宽度

		if (olegends.length) {
			let curTotalLen = 0;
			let preLen = 0;
			let legendTotalColNum = 0; //图例总列数
			let legendTotalTextW = 0; //所有文本宽度

			olegends.forEach((d, i) => {
				let curLen = d.data.length;
				curTotalLen += curLen;
				preLen = curTotalLen - curLen;
				d.colors = gaugeColors.slice(preLen, curTotalLen);
				d.scale = d3
					.scaleOrdinal()
					.range(d.colors.map(m => m))
					.domain(d.data.map(m => m));

				d.chunks = this.chunk(d.data, legend_col_num);
				legendTotalColNum += d.chunks.length;
				d.chunks.forEach(n => {
					let maxTextLen = d3.max(n, x =>{
						let itemTextLen=x.length <= showMaxFontLenght ? x.length * 7 : (showMaxFontLenght + 2) * 7;
						let titleLen = d.title.length*7;
						return titleLen >= itemTextLen ? titleLen : itemTextLen;
					});
					legendTotalTextW += maxTextLen;
				});
			});

			if(('legend' in this) && ('oLegend' in this.legend) && this.legend.oLegend.show){
				OrdinalLegendWidth = legendTotalColNum * (OrdinalRectW + text_space + legend_col_space) + legendTotalTextW;
			}
		}

		//svg总宽高
		let totalWidth = heatmap_x + heatmap_width + space + YtextWidth + space + gradientLegendWidth + legend_chart_space + OrdinalLegendWidth + margin.right,
			totalHeight = heatmap_y + heatmap_height + XtextHeight + margin.bottom;

		this.layout.title=margin.top;
		this.layout.cluster={
			leftWidth:heatmap_x,
			topHeight:heatmap_y
		}
		this.layout.area.w=heatmap_width;
		this.layout.area.h=heatmap_height;
		this.layout.w=totalWidth;
		this.layout.h=totalHeight;

		//x、y比例尺
		let xScale = d3
			.scaleBand()
			.range([0, heatmap_width])
			.domain( heatmapData.map(function(d) { return d.name; }) );

		let yScale = d3
			.scaleBand()
			.range([0, heatmap_height])
			.domain( heatmapData[0].heatmap.map(function(d) { return d.x; }) );

		//定义渐变图例位置偏移
		let legendTrans_x = heatmap_x + heatmap_width + space + YtextWidth + space,
			legendTrans_y = heatmap_y+10;

		// left translate
		let topLine_x = heatmap_x + heatmap_width - margin.left;

		//定义容器
		let svg = d3
			.select(`${this.chart.el}`)
			.append("svg")
			.attr('class', 'd4-chart-content')
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('version', '1.1')
			.attr("width", totalWidth)
			.attr("height", totalHeight);

		this.svg = svg;

		let body_g = svg
			.append("g")
			.attr( "transform", "translate(" + margin.left + "," + margin.top + ")" );

		let heatmap_g = body_g
			.append("g")
			.attr("class", "heatmap")
			.attr( "transform", "translate(" + (heatmap_x - margin.left) + "," + (heatmap_y - margin.top) + ")" );


		//title
		if ('title' in this.chart){
			drawChartTitle.call(this,heatmap_x+heatmap_width/2);
		}

		let isMousedown = false;
		//heatmap
		drawHeatmap();

		//交互
		heatmapInteract();

		//top line
		if('top' in this.chart){
			if (this.chart.top.show && isTopCluster) {
				this._drawLine( "topLine", topCluster_width, topCluster_height, body_g, topLine_x, 0, topLineData );
			}
		}

		//top simple rect
		if (topSimples.length) {
			let simple_g = body_g
				.append("g")
				.attr("class", "simpleRects")
				.attr(
					"transform",
					`translate(${heatmap_x - margin.left},${topCluster_height})`
				);
			for (let i = 0; i < topSimples.length; i++) {
				drawSimple('top', topSimples, i, simple_g,
					d => xScale(d.name), i * (simpleRectWH + small_space),
					single_rect_width, simpleRectWH,
					`translate(${heatmap_width + space},${i * (simpleRectWH + small_space) + simpleRectWH / 2}) rotate(0)`
				);
			}
		}

		//top complex rect
		if (topComplexes.length) {
			let complex_g = body_g
				.append("g")
				.attr("class", "complexRects")
				.attr(
					"transform",
					`translate(${heatmap_x - margin.left},${topCluster_height +
						topSimpleHeight})`
				);
			drawComplex('top', topComplexes, complex_g,
				k => xScale(k.name), 0,
				single_rect_width, complexRectWH,
				(d, i) => `translate(0,${i * (complexRectWH + small_space)})`,
				d => `translate(${heatmap_width + space},${d.h / 2}) rotate(0)`
			);
		}
		
		
		//left line
		if('left' in this.chart){
			if (this.chart.left.show && isLeftCluster) {
				this._drawLine( "leftLine", cluster_height, cluster_width, body_g, 0, heatmap_y - margin.top, leftLineData );
			}
		}

		//left simple rect
		if (leftSimples.length) {
			let simple_g = body_g
				.append("g")
				.attr("class", "simpleRects")
				.attr(
					"transform",
					`translate(${cluster_width},${heatmap_y - margin.top})`
				);

			for (let i = 0; i < leftSimples.length; i++) {
				drawSimple('left', leftSimples, i, simple_g,
					i * (simpleRectWH + small_space), d => yScale(d.name),
					simpleRectWH, single_rect_height,
					`translate(${i * (simpleRectWH + small_space) + simpleRectWH / 2},${heatmap_height + space}) rotate(90)`
				);
			}
		}

		//left complex rect
		if (leftComplexes.length) {
			let complex_g = body_g
				.append("g")
				.attr("class", "complexRects")
				.attr(
					"transform",
					`translate(${cluster_width + leftSimpleWidth},${heatmap_y - margin.top})`
				);
			drawComplex('left', leftComplexes, complex_g,
				0, k => yScale(k.name),
				complexRectWH, single_rect_height,
				(d, i) => `translate(${i * (complexRectWH + small_space)},0)`,
				d => `translate(${d.h / 2},${heatmap_height + space}) rotate(90)`
			);
		}

		// y text
		if('y' in this.axis && this.axis.y.type){
			if (this.axis.y.type !== "hidden") {
				drawYText();
			}
		}

		//legend
		if('legend' in this && this.legend.show){
			// legend
			if(!this.legend.type || this.legend.type!=='gradient'){
				this.layout.legend.columnLegendCount=2;
				this.layout.legend.list=[legends];
				this.layout.legend.totalWidth=gradientLegendWidth;
				this.layout.legend.widthArr=gradientLegendWidth;
			}
			
			drawLegend.call(this, colorScale, colors, legendTrans_x, legendTrans_y);

			//Ordinal legend
			if (olegends.length && ('oLegend' in this.legend) && this.legend.oLegend.show) {
				drawOrdinalLegend();
			}
		}

		//画top left simple column
		function drawSimple(type,data, i, g, x, y, width, height, transform) {
			data.forEach(d => {
				olegends.forEach(m => {
					if (d.title === m.title) {
						d.scale = m.scale;
					}
				});
			});

			let d = data[i];
			let simplePath_g = g.append("g");

			if(!that.chart[type].isBlockClick){
				simplePath_g
					.selectAll(".rects")
					.data(d.data)
					.enter()
					.append("rect")
					.attr("fill", m =>
						m.type === null ? "#000000" : d.scale(m.type)
					)
					.attr("x", x)
					.attr("y", y)
					.attr("width", width)
					.attr("height", height)
					.on("mouseover", function(d) {
						if (type in that.chart && 'simple' in that.chart[type] && !!that.chart[type].simple.tooltip) {
							var html = that.chart[type].simple.tooltip(d);
						}
						let tipText = `type: ${d.type}<br> name:  ${d.name}`;
						tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : tipText);
					})
					.on("mousemove", function() {
						tooltip.update(d3.event.pageX, d3.event.pageY);
					})
					.on("mouseout", function() {
						tooltip.hide();
					})
			}else{
				d.data.forEach(m=>{
					m.isChecked=false;
					m.blocks=[];
					m.block.forEach(k=>{
						m.blocks.push({
							"title":d.title,
							"type":m.type,
							"name":k,
							"checked":m.isChecked
						})
					})
				})
	
				simplePath_g
					.selectAll(".rectsG")
					.data(d.data)
					.enter()
					.append('g')
					.on("mousedown",function(m){
						clearEventBubble(d3.event);
						if(!m.block) return;
	
						d3.select('.selectedHeatmapRect').attr("width", 0).attr("height", 0);
						isMousedown = false;
					})
					.on("mouseup",function(m){
						clearEventBubble(d3.event);
						if(!m.block) return;
	
						d3.select('.selectedHeatmapRect').attr("width", 0).attr("height", 0);
						isMousedown = false;
						that.selectedData.length = 0;
	
						m.isChecked=!m.isChecked;

						m.blocks.forEach(k=>{
							k.checked=m.isChecked;
						})
	
						if(m.isChecked){
							m.blocks.forEach(k=>{
								let tid=("s"+type+k.title+k.type+k.name).replace(leftIdReq,"");
								d3.select('#'+tid).style('fill',"#FF4C06");
							})
						}
						else{
							m.blocks.forEach(k=>{
								let tid=("s"+type+k.title+k.type+k.name).replace(leftIdReq,"");
								d3.select('#'+tid).style('fill',k.type === null ? "#000000" : d.scale(k.type));
							})
						}
						
						m.blocks.forEach(k=>{
							if(k.checked) leftSelectedData.push(k);
						})

						// for(let j=0;j<leftSelectedData.length;j++){
						// 	if(!leftSelectedData[j].checked){
						// 		leftSelectedData.splice(j,1);
						// 		j--;
						// 	}
						// }
						// 或者
						leftSelectedData=leftSelectedData.filter(k=>k.checked===true);

						leftSelectedData.forEach(k=>{
							that.selectedData.push(k.name);
						})

						if(that.chart.onselect){
							that.selectedData=Array.from(new Set(that.selectedData));
							that.chart.onselect(that.selectedData);
						}
					})
					.selectAll('rects')
					.data(m=>m.blocks)
					.enter()
					.append("rect")
					.attr('id',m=>("s"+type+m.title+m.type+m.name).replace(leftIdReq,""))
					.attr("fill", m =>
						m.type === null ? "#000000" : d.scale(m.type)
					)
					.attr("x", x)
					.attr("y", y)
					.attr("width", width)
					.attr("height", height)
					.style('cursor','pointer')
					.on("mouseover", function(d) {
						if (type in that.chart && 'simple' in that.chart[type] && !!that.chart[type].simple.tooltip) {
							var html = that.chart[type].simple.tooltip(d);
						}
						let tipText = `type: ${d.type}<br> name:  ${d.name}`;
						tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : tipText);
					})
					.on("mousemove", function() {
						tooltip.update(d3.event.pageX, d3.event.pageY);
					})
					.on("mouseout", function() {
						tooltip.hide();
					})
					
			}

			simplePath_g
				.append("text")
				.style("font-size", "14px")
				.style("text-anchor", "start")
				.style("dominant-baseline", "middle")
				.attr("transform", transform)
				.text(d.title);
		}

		//画top left complex column
		function drawComplex(type, data, g, x, y, width, height, transform, textTransform ) {
			data.forEach(d => {
				olegends.forEach(n => {
					if (d.title === n.title) {
						d.scale = n.scale;
					}
				});

				d.data.forEach(m => {
					m.data.forEach(k => {
						k.type = m.type;
						k.scale = d.scale;

						if(k.block){
							k.isChecked=false;
							k.blocks=[];
							k.block.forEach(a=>{
								k.blocks.push({
									"title":d.title,
									"type":k.type,
									"name":a,
									"checked":k.isChecked,
									"scale":k.scale
								})
							})
						}
					});
				});
			});

			let complexPath_g = g
				.selectAll("g")
				.data(data)
				.enter()
				.append("g")
				.attr("transform", (d, i) => `translate(${i * d.h},0)`);

			let rects_g = complexPath_g
				.selectAll("g")
				.data(d => d.data)
				.enter()
				.append("g")
				.attr("transform", transform)
				.on("mouseover", d=> {
					if (type in that.chart && 'complex' in that.chart[type] && !!that.chart[type].complex.tooltip) {
						var html = that.chart[type].complex.tooltip(d);
					}
					let tipText = `${d.type}`;
					tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : tipText);
				})
				.on("mousemove", function() {
					tooltip.update(d3.event.pageX, d3.event.pageY);
				})
				.on("mouseout", function() {
					tooltip.hide();
				})

			if(!that.chart[type].isBlockClick){
				rects_g.selectAll("rect")
					.data(m => m.data)
					.enter()
					.append("rect")
					.attr("x", x)
					.attr("y", y)
					.attr("fill", k =>
						k.type === null ? "#000000" : k.scale(k.type)
					)
					.attr("width", width)
					.attr("height", height);
			}else{
				rects_g.selectAll(".complexRectsG")
					.data(m => m.data)
					.enter()
					.append("g")
					.on("mousedown",function(m){
						clearEventBubble(d3.event);
						if(!m.block) return;
	
						d3.select('.selectedHeatmapRect').attr("width", 0).attr("height", 0);
						isMousedown = false;
					})
					.on("mouseup",function(m){
						clearEventBubble(d3.event);
						if(!m.block) return;
						
						d3.select('.selectedHeatmapRect').attr("width", 0).attr("height", 0);
						isMousedown = false;
						that.selectedData.length = 0;
	
						m.isChecked=!m.isChecked;

						m.blocks.forEach(k=>{
							k.checked=m.isChecked;
						})
	
						if(m.isChecked){
							m.blocks.forEach(k=>{
								let tid=("c"+type+k.title+k.type+k.name).replace(leftIdReq,"");
								d3.select('#'+tid).style('fill',"#FF4C06");
							})
						}
						else{
							m.blocks.forEach(k=>{
								let tid=("c"+type+k.title+k.type+k.name).replace(leftIdReq,"");
								d3.select('#'+tid).style('fill',k.type === null ? "#000000" : k.scale(k.type));
							})
						}
						
						m.blocks.forEach(k=>{
							if(k.checked) leftSelectedData.push(k);
						})

						leftSelectedData=leftSelectedData.filter(k=>k.checked===true);

						leftSelectedData.forEach(k=>{
							that.selectedData.push(k.name);
						})

						if(that.chart.onselect){
							that.selectedData=Array.from(new Set(that.selectedData));
							that.chart.onselect(that.selectedData);
						}
					})
					.selectAll("rect")
					.data(k=>k.blocks)
					.enter()
					.append("rect")
					.attr("id",k=>("c"+type+k.title+k.type+k.name).replace(leftIdReq,""))
					.style("cursor", "pointer")
					.attr("x", x)
					.attr("y", y)
					.attr("fill", k =>
						k.type === null ? "#000000" : k.scale(k.type)
					)
					.attr("width", width)
					.attr("height", height);
			}

			complexPath_g
				.append("text")
				.style("text-anchor", "start")
				.style("dominant-baseline", "middle")
				.attr("transform", textTransform)
				.text(d => d.title);
		}

		//画离散型图例
		function drawOrdinalLegend() {
			let olegend_x = heatmap_x + heatmap_width + space + YtextWidth + space + gradientLegendWidth + legend_chart_space;
			let olegend_y = heatmap_y+14;
			let title_space = 10;

			let legendWrap = svg
				.append("g")
				.attr("class", "OrdinalLegend")
				.attr("transform", `translate(${olegend_x},${olegend_y})`);
			olegends.forEach(d => {
				if(d.data.length){
					let curLegend = legendWrap.append("g").attr("class", "oLegend");
			
					let sumWidth = 0,
						sumBeforeWidth = 0;
					let widthArr = [];
	
					let legendGroup = curLegend
						.append("g")
						.attr('myTitle',d.title)
						.attr("transform", `translate(0,${title_space})`)
						.selectAll(".legendGroup")
						.data(d.chunks)
						.enter()
						.append("g")
						.attr("class", "legendGroup")
						.attr('index',(m,n)=>n);
	
					let series = legendGroup
						.selectAll(".boxSeries")
						.data(m => m)
						.enter()
						.append("g")
						.attr("class", "boxSeries");
	
					series
						.append("rect")
						.attr("fill", m => (m === null ? "#000000" : d.scale(m)))
						.attr("width", OrdinalRectW)
						.attr("height", OrdinalRectH)
						.attr("index",function(m,j){
							let sumLen=0;
							let pi=Number(d3.select(this.parentNode.parentNode).attr('index'));
							for(let n=0;n<pi;n++){
								sumLen+=d.chunks[n].length;
							}
							let index=sumLen+j;
							let curIndex=d.bColorsLen+index;
							return curIndex;
						})
						.style("cursor", "pointer")
						.on("mouseover", function() {
							that.legend.oLegend.mouseover && that.legend.oLegend.mouseover(d3.event,d3.select(this));
						})
						.on("mouseout", function() {
							that.legend.oLegend.mouseout && that.legend.oLegend.mouseout(d3.event,d3.select(this));
						})
						.on("mousedown", function(m, j) {
							let oEvent = d3.event || event;
							clearEventBubble(oEvent);
							let index=Number(d3.select(this).attr("index"));
	
							that.legend.oLegend.click && that.legend.oLegend.click(d3.select(this).node(),index);
						})
						.on("mouseup",function(){
							clearEventBubble(d3.event);
						});
	
					series
						.append("text")
						.style("font-size", "12px")
						.attr("font-family", "Consolas, Monaco, monospace")
						.attr("text-anchor", "right")
						.attr("dominant-baseline", "middle")
						.attr(
							"transform",
							"translate(" + (OrdinalRectW + text_space) + "," + OrdinalRectH / 2 + ")"
						)
						.text(m =>
							m.length <= showMaxFontLenght ? m : m.substring(0, showMaxFontLenght) + "..."
						)
						.append("title")
						.text(m => m);
	
					d3.selectAll("g.legendGroup")
						.attr("transform", function(m, i) {
							let curWidth=d3.select(this).node().getBBox().width;
							let titlelen=d3.select(this.parentNode).attr('myTitle').length*7;
							let colWidth = curWidth >= titlelen ? curWidth : titlelen;
							widthArr[i] = colWidth;
							sumWidth += widthArr[i];
							sumBeforeWidth = sumWidth - widthArr[widthArr.length - 1];
							let x = sumBeforeWidth + i * legend_col_space;
							return "translate(" + x + ",0)";
						})
						.selectAll("g.boxSeries")
						.attr("transform", function(d, j) {
							return (
								"translate(0," + j * (OrdinalRectH + bottom_space) + ")"
							);
						});
	
						curLegend
						.append("text")
						.attr("class", "oLegendTitle")
						.style("font-size", "14px")
						.style("text-anchor", "start")
	
						.text(function() {
							// let textwidth =
							// 	d.title.length * 7 + legend_col_space / 2;
							// let colWidth = d3 .select(this.parentNode) .select(".legendGroup") .node() .getBBox().width;
							// if (textwidth <= colWidth) {
							// 	return d.title;
							// } else {
							// 	let showNum = Math.ceil(colWidth / 7);
							// 	if (showNum < d.title.length) {
							// 		return d.title.substring(0, showNum) + "...";
							// 	} else {
									return d.title;
							// 	}
							// }
						})
						// .append("title")
						// .text(d.title);
				}
					
				});

			d3.selectAll(".oLegend text.oLegendTitle").attr(
				"transform",
				function() {
					if(d3.select(this.parentNode)){
						let x = d3.select(this.parentNode).select(".legendGroup").attr("transform");
						return x;
					}
				}
			);
		}

		//画热图
		function drawHeatmap() {
			d3.selectAll(".heatmapRects").remove();
			
			for (let i = 0; i < heatmapData_len; i++) {
				let rect_g = heatmap_g
					.append("g")
					.attr("class", "heatmapRects");
				//画矩形
				rect_g
					.selectAll("rect")
					.data(heatmapData[i].heatmap)
					.enter()
					.append("rect")
					.attr("x", i * single_rect_width)
					.attr("y", (d, j) => j * single_rect_height)
					.attr("width", single_rect_width)
					.attr("height", single_rect_height)
					.attr("fill", d =>
						d.y === null ? "#000000" : colorScale(d.y)
					);

				//添加x轴的名称
				let xText=rect_g
					.append("text")
					.style("font-family", "Consolas, Monaco, monospace")
					.style("font-size", "12px")
					.text(function(){
						if('x' in that.axis && that.axis.x.type){
							if(that.axis.x.type==='hidden'){
								return "";
							}else{
								return that.axis.x.type==='id' ? heatmapData[i].name : heatmapData[i][that.axis.x.type]
							}
						}else{
							return heatmapData[i].name;
						}
					})
					.style("text-anchor", "start")
					.style('cursor', that.axis.x && that.axis.x.dblclick ? 'pointer' : "default")
					.attr("transform", function() {
						let xRotate=90;
						if('x' in that.axis && 'rotate' in that.axis.x){
							xRotate = that.axis.x.rotate;
						}
						return (
							"translate(" + (i * single_rect_width + single_rect_width / 2) + "," +
							(heatmap_height + space) + ") rotate("+xRotate+")"
						);
					});

				xText
				.on("mouseover", function() {
					that.axis.x && that.axis.x.mouseover && that.axis.x.mouseover.call(that, d3.event, xText);
				})
				.on("mouseout", function() {
					that.axis.x && that.axis.x.mouseout && that.axis.x.mouseout.call(that, d3.event, xText);
				})
				.on("dblclick",function(){
					clearEventBubble(d3.event);
					timer && clearTimeout(timer);
					that.axis.x && that.axis.x.dblclick && that.axis.x.dblclick.call(that, d3.event, xText.node());
				})

			}
		}

		//热图交互
		function heatmapInteract() {
			//定义热图矩形交互
			let interact_g = heatmap_g.append("g");
			let big_rect = interact_g
				.append("rect")
				.attr("width", heatmap_width)
				.attr("height", heatmap_height)
				.style("cursor", "pointer")
				.attr("fill", "transparent");

			let select_rect = interact_g
				.append("rect")
				.attr("class",'selectedHeatmapRect')
				.attr("width", 0)
				.attr("height", 0)
				.attr("fill", "#000000")
				.style("opacity", 0.4);

			let select_rw = heatmap_width,
				select_rh = 0;
			let trans_x = 0,
				trans_y = 0;
			let down_x = 0,
				down_y = 0;
			let down_j;
			big_rect.on("mousedown", function(ev) {
				isMousedown = true;
				let downEvent = ev || d3.event;
	
				//当前down位置
				down_x = downEvent.offsetX - heatmap_x;
				down_y = downEvent.offsetY - heatmap_y;
				//当前down索引
				let downIndex = getIndex(down_x, down_y);
				down_j = downIndex.y_index;
				clearEventBubble(downEvent);
			});

			big_rect.on("mousemove", function(ev) {
				let moveEvent = ev || d3.event;
				let x_dis = moveEvent.offsetX - heatmap_x;
				let y_dis = moveEvent.offsetY - heatmap_y;

				if (isMousedown) {
					select_rh = Math.abs(y_dis - down_y);
					trans_y = d3.min([y_dis, down_y]);
					select_rect
						.attr("width", select_rw)
						.attr("height", select_rh)
						.attr("x", trans_x)
						.attr("y", trans_y);
				} else {
					//当前move到的rect的索引
					let index = getIndex(x_dis, y_dis);
					let i = index.x_index,
						j = index.y_index;
					let d = heatmapData[i].heatmap[j];
					let gene = d.x;
					if(!!that.axis.y && that.axis.y.type && that.axis.y.type !=='hidden'){
						gene = (that.axis.y.type === "id") ? d.x : d[that.axis.y.type];
					}
					let tipText = `Sample: ${ heatmapData[i].name }<br> Gene:  ${gene}<br> Value: ${d.y}`;
					if ("tooltip" in that && that.tooltip) {
                        var html = that.tooltip(d);
					}
					tooltip.show(d3.event.pageX, d3.event.pageY, html ? html : tipText);
				}
				clearEventBubble(moveEvent);
			});

			select_rect.on("mousemove", function(ev) {
				let moveSelectEvent = ev || d3.event;
				clearEventBubble(moveSelectEvent);
				let y_select_dis = moveSelectEvent.offsetY - heatmap_y;

				if (isMousedown) {
					select_rh = Math.abs(y_select_dis - down_y);
					trans_y = d3.min([y_select_dis, down_y]);
					select_rect
						.attr("width", select_rw)
						.attr("height", select_rh)
						.attr("x", trans_x)
						.attr("y", trans_y);
				}
			});

			select_rect.on("mouseup", function(ev) {
				isMousedown = false;
				let upEvent = ev || d3.event;
					//当前up位置
					let up_x = upEvent.offsetX - heatmap_x;
					let up_y = upEvent.offsetY - heatmap_y;
	
					//当前up索引
					let upIndex = getIndex(up_x, up_y);
					let up_j = upIndex.y_index;
	
					let geneId;
					if (down_j > up_j) {
						geneId = heatmapData[0].heatmap.slice(up_j, down_j + 1);
					} else {
						geneId = heatmapData[0].heatmap.slice(down_j, up_j + 1);
					}
	
					let resGeneId = [];
					geneId.forEach(function(val) {
						resGeneId.push(val.x);
					});
	
					let high_j = d3.min([up_j, down_j]),
						low_j = d3.max([up_j, down_j]);
					let highHeight = high_j * single_rect_height;
					let lowHeight = (low_j + 1) * single_rect_height;
	
					select_rh = Math.abs(lowHeight - highHeight);
					trans_y = d3.min([lowHeight, highHeight]);
					select_rect
						.attr("width", select_rw)
						.attr("height", select_rh)
						.attr("x", trans_x)
						.attr("y", trans_y);

					clearLeftSelected();
	
					that.selectedData=resGeneId;
	
					if(that.chart.onselect){
						that.chart.onselect(resGeneId);
					}

				clearEventBubble(upEvent);
			});

			big_rect.on("mouseup", function() {
				clearEventBubble(d3.event);
				timer && clearTimeout(timer);
				timer = setTimeout(function(){
					select_rect.attr("width", 0).attr("height", 0);
					isMousedown = false;
				},300)
				
			});

			big_rect.on("mouseout", function() {
				tooltip.hide();
			});

			d3.select(`${that.chart.el} svg`).on("mousedown", function() {
				timer && clearTimeout(timer);

				timer = setTimeout(function(){
					select_rect.attr("width", 0).attr("height", 0);
					isMousedown = false;
				},300)
			});

			d3.select(`${that.chart.el} svg`).on("mouseup", function() {
				timer && clearTimeout(timer);

				timer = setTimeout(function(){
					select_rect.attr("width", 0).attr("height", 0);
					
					clearLeftSelected();

					isMousedown = false;
					that.selectedData.length = 0;
					if(that.chart.onselect){
						that.chart.onselect(that.selectedData);
					}
				},300)
			});
		}

		//清空左侧分类的选择
		function clearLeftSelected(){
			if(that.chart['left'].isBlockClick){
				leftSimples.forEach(d=>{
					d.data.forEach(m=>{
						m.isChecked=false;
						m.blocks.forEach(k=>{
							k.checked=false;
							let tid=("sleft"+k.title+k.type+k.name).replace(leftIdReq,"");
							d3.select('#'+tid).style('fill',k.type === null ? "#000000" : d.scale(k.type));
						})
					})
				})
	
				leftComplexes.forEach(d=>{
					d.data.forEach(m=>{
						m.data.forEach(n=>{
							n.isChecked=false;
							n.blocks.forEach(k=>{
								k.checked=false;
								let tid=("cleft"+k.title+k.type+k.name).replace(leftIdReq,"");
								d3.select('#'+tid).style('fill',k.type === null ? "#000000" : k.scale(k.type));
							})
						})
					})
				})
			}

			if(that.chart['top'].isBlockClick){
				topSimples.forEach(d=>{
					d.data.forEach(m=>{
						m.isChecked=false;
						m.blocks.forEach(k=>{
							k.checked=false;
							let tid=("stop"+k.title+k.type+k.name).replace(leftIdReq,"");
							d3.select('#'+tid).style('fill',k.type === null ? "#000000" : d.scale(k.type));
						})
					})
				})
	
				topComplexes.forEach(d=>{
					d.data.forEach(m=>{
						m.data.forEach(n=>{
							n.isChecked=false;
							n.blocks.forEach(k=>{
								k.checked=false;
								let tid=("ctop"+k.title+k.type+k.name).replace(leftIdReq,"");
								d3.select('#'+tid).style('fill',k.type === null ? "#000000" : k.scale(k.type));
							})
						})
					})
				})
			}

			leftSelectedData.length=0;
		}

		//获取heatmap横纵索引
		function getIndex(x, y) {
			let rect_i = 0,
				rect_j = 0;

			for (let i = 0; i < heatmapData_len; i++) {
				if (i == heatmapData_len - 1) {
					if (
						x >= xScale(heatmapData[i].name) &&
						x <= heatmap_width
					) {
						rect_i = heatmapData_len - 1;
					}
				} else {
					if (
						x >= xScale(heatmapData[i].name) &&
						x <= xScale(heatmapData[i + 1].name)
					) {
						rect_i = i;
					}
				}

				let heatmap = heatmapData[i].heatmap;
				let heatmap_len = heatmap.length;

				for (let j = 0; j < heatmap_len; j++) {
					if (j == heatmap_len - 1) {
						if (y >= yScale(heatmap[j].x) && y <= heatmap_height) {
							rect_j = heatmap_len - 1;
						}
					} else {
						if (
							y >= yScale(heatmap[j].x) &&
							y <= yScale(heatmap[j + 1].x)
						) {
							rect_j = j;
						}
					}
				}
			}

			let indexObj = {
				x_index: rect_i,
				y_index: rect_j
			};
			return indexObj;
		}

		//画热图右边的文字名称
		function drawYText() {
			//添加heatmap的右边名称
			let y_texts = heatmap_g
				.append("g")
				.attr(
					"transform",
					"translate(" + (heatmap_width + space) + ",0)"
				)
				.selectAll("y_text")
				.data(heatmapData[0].heatmap)
				.enter()
				.append("text")
				.style("font-family", "Consolas, Monaco, monospace")
				.style("font-size", "12px")
				.style("dominant-baseline", "middle")
				.text(function(d) {
					return that.axis.y.type === "id" ? d.x : d[that.axis.y.type];
				})
				.attr("y", function(d, i) {
					return i * single_rect_height + single_rect_height / 2;
				});
		}

		//阻止冒泡
		function clearEventBubble(evt) {
			if (evt.stopPropagation) {
				evt.stopPropagation();
			} else {
				evt.cancelBubble = true;
			}

			if (evt.preventDefault) {
				evt.preventDefault();
			} else {
				evt.returnValue = false;
			}
		}

	}

	//画聚类折线图
	_drawLine(type, size1, size2, gContainer, translateX, translateY, data) {
		let cluster = d3
			.cluster()
			.size([size1, size2])
			.separation(function() {
				return 1;
			});

		let cluster_g = gContainer.append("g").attr("class", type);
		if (type == "leftLine") {
			cluster_g.attr(
				"transform",
				"translate(" + translateX + "," + translateY + ")"
			);
		}

		if (type == "topLine") {
			cluster_g.attr(
				"transform",
				"translate(" + translateX + "," + translateY + ") rotate(90)"
			);
		}

		//根据数据建立模型
		let root = d3.hierarchy(data);
		cluster(root);

		cluster_g
			.selectAll("path")
			.data(root.links())
			.enter()
			.append("path")
			.attr("fill", "none")
			.attr("stroke-width", 1)
			.attr("stroke", "#000000")
			.attr("d", this._elbow);
	}

	_elbow(d, i) {
		return ( "M" + d.source.y + "," + d.source.x + "V" + d.target.x + "H" + d.target.y );
	}

	updateTitle() {
        if ('title' in this.chart) drawChartTitle.call(this,this.layout.cluster.leftWidth+this.layout.area.w/2);
    }

    // redraw
    redraw(flag) {
        if (!!flag) {
            this._init(this._deepCopyObj(this.default), this.rootConfig);
        }
        this.drawCluster();
        return this;
    }

	// 数组分组
	chunk(array, size) {
		let length = array.length;

		//判断不是数组，或者size没有设置，size小于1，就返回空数组
		if (!length || !size || size < 1) {
			return [];
		}

		let index = 0; //用来表示切割元素的范围start
		let resIndex = 0; //用来递增表示输出数组的下标

		//根据length和size算出输出数组的长度，并且创建它。
		let result = new Array(Math.ceil(length / size));

		//循环
		while (index < length) {
			//循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
			result[resIndex++] = array.slice(index, (index += size));
		}

		//输出新数组
		return result;
	}
}

export default ComplexCluster;
