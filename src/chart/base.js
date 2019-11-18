/**
 * @time 2018年7月25日17:20:43
 * @author joke<277637411@qq.com>
 * @description 图表基类-添加公共方法
 */
import global from '../config';
import UUID from 'uuid-js';
import * as d3 from 'd3';

class Base {
	constructor({ chart, axis, legend, otherLegend, tooltip }, rootConfig, styleConfig) {
		this._init(
			{
				chart,
				axis,
				legend,
				otherLegend,
				tooltip
			},
			rootConfig,
			styleConfig
		);
	}

	_init({ chart, axis, legend, otherLegend, tooltip }, rootConfig, styleConfig) {
		this.chart = chart;
		this.axis = axis;
		this.legend = legend;
		this.otherLegend = otherLegend;
		this.tooltip = tooltip;
		this.rootConfig = rootConfig;

		this.styleConfig = global;
		for (let name in styleConfig) {
			if (styleConfig[name] instanceof Object) {
				for (let it in styleConfig[name]) {
					this.styleConfig[name][it] = styleConfig[name][it];
				}
			} else {
				this.styleConfig[name] = styleConfig[name];
			}
		}

		this.aColors = (this.chart.colors || []).concat(this._copyArr(this.styleConfig.aColors));
		this.colors = (this.chart.colors || []).concat(this._copyArr(this.styleConfig.colors));
		this.otherColors = (this.chart.otherColors || []).concat(this._copyArr(this.styleConfig.colors));
		this.default = this._deepCopyObj({
			chart,
			axis,
			legend,
			otherLegend,
			tooltip
		});

		// chart selected params default enable 'single' module ;
		// single or multiple or false(Boolean) ;
		if ('enableChartSelect' in this.chart) {
			this.selectedModule = this.chart.enableChartSelect ? this.chart.selectedModule || 'single' : false;
		} else {
			this.selectedModule = this.rootConfig.enableChartSelect ? this.chart.selectedModule || 'single' : false;
		}
		this.selectedData = [];

		this.layout = {
			padding: this.styleConfig.padding,
			title: this.chart.title && this.chart.title.length ? this.styleConfig.titleHeight : 0,
			x: this.styleConfig.xTitleHeight,
			y: this.styleConfig.yTitleWidth, // title
			xLabel: 0, // label
			yLabel: 0,
			x1: 0,
			y1: 0,
			x1Label: 0,
			y1Label: 0,
			legend: {
				list: [], // 计算后的图例列表
				totalWidth: 0, // 图例所占容器的总宽度
				widthArr: [], // 图例极值存放没一列最长的图例长度
				columnLegendCount: 0 // 一列所放的图例个数
			},
			otherLegend: {
				list: [], // 计算后的图例列表
				totalWidth: 0, // 图例所占容器的总宽度
				widthArr: [], // 图例极值存放每一列最长的图例长度
				columnLegendCount: 0 // 一列所放的图例个数
			},
			area: {
				// 画图区域
				w: 0,
				h: 0
			},
			w: 0,
			h: 0
		};
	}

	// 计算布局信息  x,y scale
	_computedLayout(x = null, y = null) {
		var $el = document.querySelector(this.chart.el);
		var styles = $el.currentStyle ? $el.currentStyle : window.getComputedStyle($el, null);

		this.width = this.chart.width || +styles.width.replace('px', '') || this.styleConfig['width'];
		this.height = this.chart.height || +styles.height.replace('px', '') || this.styleConfig['height'];

		this.layout.w = this.width;
		this.layout.h = this.height;
		// 找出xlabel 值最长的一项 算出长度
		// 旋转算出高度即为xLabel高度
		// 根据配置项整理所有的布局数据

		// 不是组合图
		if (this.chart.type !== 'group') {
			var key = 'x',
				value = 'y';

			if (this.chart.custom instanceof Array && this.chart.custom.length && this.chart.custom[0])
				key = this.chart.custom[0];
			if (this.chart.custom instanceof Array && this.chart.custom.length && this.chart.custom[1])
				value = this.chart.custom[1];

			// 计算Y轴label的最大宽度
			var yLabelWidth, tw;
			if ('x' in this.axis || 'y' in this.axis) {
				// 有Y轴
				if ('y' in this.axis) {
					yLabelWidth = this._getAxisLabelMaxLength(
						'y',
						y
							? 'data' in y ? y['data'] : y.ticks()
							: this.chart.data.map((val) => {
									return val[value];
								})
					);
				}

				// 有X轴
				if ('x' in this.axis) {
					tw = this._getAxisLabelMaxLength(
						'x',
						x
							? 'data' in x ? x['data'] : x.ticks()
							: this.chart.data.map((val) => {
									return val[key];
								})
					);
				}

				this.layout = {
					padding: this.styleConfig.padding,
					title: this.chart.title && this.chart.title.length ? this.styleConfig.titleHeight : 0,
					x: this.axis.x && this.axis.x.title ? this.styleConfig.xTitleHeight : 0,
					y: this.axis.y && this.axis.y.title ? this.styleConfig.yTitleWidth : 0,
					x1: 0,
					y1: 0,
					x1Label: 0,
					y1Label: 0,
					xLabel: tw ? tw : this.styleConfig.fontSize,
					yLabel: yLabelWidth ? yLabelWidth : 0,
					legend: {
						list: [],
						totalWidth: 0, // 图例所占容器的总宽度
						widthArr: [],
						columnLegendCount: 0
					},
					otherLegend: {
						list: [], // 计算后的图例列表
						totalWidth: 0, // 图例所占容器的总宽度
						widthArr: [], // 图例极值存放每一列最长的图例长度
						columnLegendCount: 0 // 一列所放的图例个数
					},
					area: {
						w: 0,
						h: 0
					},
					w: this.width,
					h: this.height
				};

				this.layout.area.w =
					this.width -
					this.layout.padding * 2 -
					this.layout.y -
					this.layout.legend.totalWidth -
					this.layout.yLabel;
				this.layout.area.h =
					this.height - this.layout.padding * 2 - this.layout.title - this.layout.x - this.layout.xLabel;

				if (this.layout.area.w < this.styleConfig.areaMinWidth) {
					this.layout.area.w = this.styleConfig.areaMinWidth;
					this.layout.w =
						this.layout.area.w +
						this.layout.padding * 2 +
						this.layout.y +
						this.layout.legend.totalWidth +
						this.layout.yLabel;
				}

				if (this.layout.area.h < this.styleConfig.areaMinHeight) {
					this.layout.area.h = this.styleConfig.areaMinHeight;
					this.layout.h =
						this.layout.area.h +
						this.layout.padding * 2 +
						this.layout.title +
						this.layout.x +
						this.layout.xLabel;
				}
			} else {
				// 没有坐标轴
				this.layout = {
					padding: this.styleConfig.padding,
					title: this.chart.title && this.chart.title.length ? this.styleConfig.titleHeight : 0,
					x: 0,
					y: 0,
					xLabel: 0,
					yLabel: 0,
					x1: 0,
					y1: 0,
					x1Label: 0,
					y1Label: 0,
					legend: {
						list: [],
						totalWidth: 0, // 图例所占容器的总宽度
						widthArr: [],
						columnLegendCount: 0
					},
					otherLegend: {
						list: [], // 计算后的图例列表
						totalWidth: 0, // 图例所占容器的总宽度
						widthArr: [], // 图例极值存放每一列最长的图例长度
						columnLegendCount: 0 // 一列所放的图例个数
					},
					area: {
						// 画图区域
						w: 0,
						h: 0
					},
					w: this.width,
					h: this.height
				};
				this.layout.area.w =
					this.width -
					this.layout.padding * 2 -
					this.layout.y -
					this.layout.legend.totalWidth -
					this.layout.yLabel -
					this.styleConfig.legendMargin;
				this.layout.area.h =
					this.height - this.layout.padding * 2 - this.layout.title - this.layout.x - this.layout.xLabel;

				if (this.layout.area.w < this.styleConfig.areaMinWidth) {
					this.layout.area.w = this.styleConfig.areaMinWidth;
					this.layout.w =
						this.layout.area.w +
						this.layout.padding * 2 +
						this.layout.y +
						this.layout.legend.totalWidth +
						this.layout.yLabel;
				}

				if (this.layout.area.h < this.styleConfig.areaMinHeight) {
					this.layout.area.h = this.styleConfig.areaMinHeight;
					this.layout.h =
						this.layout.area.h +
						this.layout.padding * 2 +
						this.layout.title +
						this.layout.x +
						this.layout.xLabel;
				}
			}
		} else if (this.chart.type === 'group') {
			if ('x' in this.axis || 'x1' in this.axis || 'y' in this.axis || 'y1' in this.axis) {
				var xLabelWidth = 0,
					x1LabelWidth = 0,
					yLabelWidth = 0,
					y1LabelWidth = 0;

				var xAxisData = [],
					x1AxisData = [],
					yAxisData = [],
					y1AxisData = [];

				if (this.chart.data.length) {
					this.chart.data.forEach((v) => {
						xAxisData.push(v['x']);
						yAxisData.push(v['y']);
					});
				}

				if (this.chart.otherData.length) {
					this.chart.otherData.forEach((v) => {
						x1AxisData.push(v['x']);
						y1AxisData.push(v['y']);
					});
				}

				if ('x' in this.axis) {
					if (!('data' in this.axis.x) || ('data' in this.axis.x && !this.axis.x.data.length)) {
						this.axis.x.data = xAxisData;
					}

					xLabelWidth = this._getAxisLabelMaxLength('x');
				}
				if ('y' in this.axis) {
					if (!('data' in this.axis.y) || ('data' in this.axis.y && !this.axis.y.data.length)) {
						this.axis.y.data = yAxisData;
					}

					yLabelWidth = this._getAxisLabelMaxLength('y');
				}
				if ('x1' in this.axis) {
					if (!('data' in this.axis.x1) || ('data' in this.axis.x1 && !this.axis.x1.data.length)) {
						this.axis.x1.data = x1AxisData;
					}

					x1LabelWidth = this._getAxisLabelMaxLength('x1');
				}
				if ('y1' in this.axis) {
					if (!('data' in this.axis.y1) || ('data' in this.axis.y1 && !this.axis.y1.data.length)) {
						this.axis.y1.data = y1AxisData;
					}

					y1LabelWidth = this._getAxisLabelMaxLength('y1');
				}

				this.layout = {
					padding: this.styleConfig.padding,
					title: this.chart.title && this.chart.title.length ? this.styleConfig.titleHeight : 0,
					x: 'x' in this.axis ? this.styleConfig.xTitleHeight : 0,
					y: 'y' in this.axis ? this.styleConfig.yTitleWidth : 0, // title
					xLabel: xLabelWidth ? xLabelWidth : 0, // label
					yLabel: yLabelWidth ? yLabelWidth : 0,
					x1: 'x1' in this.axis ? this.styleConfig.xTitleHeight : 0,
					y1: 'y1' in this.axis ? this.styleConfig.yTitleWidth : 0,
					x1Label: x1LabelWidth ? x1LabelWidth : 0,
					y1Label: y1LabelWidth ? y1LabelWidth + 16 : 0,
					legend: {
						list: [], // 计算后的图例列表
						totalWidth: 0, // 图例所占容器的总宽度
						widthArr: [], // 图例极值存放没一列最长的图例长度
						columnLegendCount: 0 // 一列所放的图例个数
					},
					otherLegend: {
						list: [], // 计算后的图例列表
						totalWidth: 0, // 图例所占容器的总宽度
						widthArr: [], // 图例极值存放每一列最长的图例长度
						columnLegendCount: 0 // 一列所放的图例个数
					},
					area: {
						// 画图区域
						w: 0,
						h: 0
					},
					w: this.width,
					h: this.height
				};
			} else {
				this.layout = {
					padding: this.styleConfig.padding,
					title: this.chart.title && this.chart.title.length ? this.styleConfig.titleHeight : 0,
					x: 0,
					y: 0, // title
					xLabel: 0, // label
					yLabel: 0,
					x1: 0,
					y1: 0,
					x1Label: 0,
					y1Label: 0,
					legend: {
						list: [], // 计算后的图例列表
						totalWidth: 0, // 图例所占容器的总宽度
						widthArr: [], // 图例极值存放没一列最长的图例长度
						columnLegendCount: 0 // 一列所放的图例个数
					},
					otherLegend: {
						list: [], // 计算后的图例列表
						totalWidth: 0, // 图例所占容器的总宽度
						widthArr: [], // 图例极值存放每一列最长的图例长度
						columnLegendCount: 0 // 一列所放的图例个数
					},
					area: {
						// 画图区域
						w: 0,
						h: 0
					},
					w: this.width,
					h: this.height
				};
			}

			this.layout.area.w =
				this.width -
				this.layout.padding * 2 -
				this.layout.y -
				this.layout.yLabel -
				this.layout.y1 -
				this.layout.y1Label -
				this.layout.legend.totalWidth -
				this.layout.otherLegend.totalWidth -
				this.styleConfig.legendMargin;
			this.layout.area.h =
				this.height -
				this.layout.padding * 2 -
				this.layout.title -
				this.layout.x -
				this.layout.xLabel -
				this.layout.x1 -
				this.layout.x1Label;

			if (this.layout.area.w < this.styleConfig.areaMinWidth) {
				this.layout.area.w = this.styleConfig.areaMinWidth;
				this.layout.w =
					this.layout.area.w +
					this.layout.padding * 2 +
					this.layout.title +
					this.layout.y +
					this.layout.yLabel +
					this.layout.y1 +
					this.layout.y1Label +
					this.layout.legend.totalWidth +
					this.layout.otherLegend.totalWidth +
					this.styleConfig.legendMargin;
			}
			if (this.layout.area.h < this.styleConfig.areaMinHeight) {
				this.layout.area.h = this.styleConfig.areaMinHeight;
				this.layout.h =
					this.layout.area.h +
					this.layout.padding * 2 +
					this.layout.title +
					this.layout.x +
					this.layout.xLabel +
					this.layout.x1 +
					this.layout.x1Label;
			}
		}
		this._mathRoundLayout();
	}

	_getAxisLabelMaxLength(axis, data) {
		var arr = [];
		var arrDefault = [];

		arrDefault =
			'data' in this.axis[axis] && this.axis[axis].data.length ? this.axis[axis].data.concat() : [ ...data ];

		// 如果有自定义的formatter函数
		if ('formatter' in this.axis[axis]) {
			arr = arrDefault.map((val, index) => {
				return this.axis[axis].formatter(val);
			});
		} else {
			arr = [ ...arrDefault ];
		}

		let oSvg = d3.select('body').append('svg');
		let text = oSvg.append('text');

		let res = [];
		let rw = 0;
		let xFlag = [ 'x', 'x1' ];
		let yFlag = [ 'y', 'y1' ];
		arr.forEach((v) => {
			let labelText = '' + v;
			labelText =
				labelText.length > this.styleConfig.textMaxLength
					? labelText.substring(0, this.styleConfig.textMaxLength + 1) + '...'
					: labelText;
			text.text('').text(labelText).style('font-size', this.styleConfig.ticksFontSize);
			let labelWidth = text.nodes()[0].getBBox().width + 10;

			if (xFlag.includes(axis)) {
				rw =
					'rotate' in this.axis[axis]
						? labelWidth * Math.sin(this.axis[axis].rotate * Math.PI / 180)
						: this.styleConfig.ticksFontSize;
			}

			if (yFlag.includes(axis)) {
				rw =
					'rotate' in this.axis[axis]
						? labelWidth * Math.sin(this.axis[axis].rotate * Math.PI / 180)
						: labelWidth;
			}

			res.push(rw);
		});

		res.sort((n, m) => {
			return m - n;
		});
		oSvg.remove();
		return res[0];
	}

	_computedLegendLayout(svg, categoryArr, type) {
		//type:"legend" or "otherLegend"
		if (!type) type = 'legend';
		var h = this.layout.area.h;
		var singleLegendH = this.styleConfig.legend.h + this.styleConfig.legend.m;
		var columnCount = Math.ceil(this.layout.area.h / singleLegendH);
		this.layout[type].columnLegendCount = categoryArr.length > columnCount ? columnCount : categoryArr.length;
		let oSvg = d3.select('body').append('svg').attr('opacity', 0);
		// 超出一列的高度
		if (categoryArr.length > columnCount) {
			// 计算列
			var legendRowArr = [];
			var temp = [];
			var count = 0;
			var legendWidthArr = [];

			do {
				legendRowArr.push(categoryArr.slice(count * columnCount, (count + 1) * columnCount));
				temp = categoryArr.slice((count + 1) * columnCount);
				count++;
			} while (temp.length > columnCount);

			legendRowArr.push(temp);
			this.layout[type].list = legendRowArr;
			// 计算每一行最大文字长度
			var textWidth = [];
			legendRowArr.forEach((value, index) => {
				textWidth.push([]);
				value.forEach((val, i) => {
					var testLegendText = oSvg
						.append('text')
						.attr('class', 'test-legend-text')
						.attr('opacity', 0)
						.text(('' + val).substring(0, this.styleConfig.legend.textMaxLength))
						.style('font-size', this.styleConfig.legendFontSize);
					var width = testLegendText.nodes()[0].getBBox().width;
					textWidth[index].push(width);
					testLegendText.remove();
				});
				textWidth[index].sort((a, b) => b - a);
				textWidth[index] = textWidth[index][0];
			});
			oSvg.remove();

			// 通过dom计算宽度 文字宽度
			textWidth.forEach((val, index) => {
				legendWidthArr[index] = {
					width: val,
					overflow: false
				};

				legendWidthArr[index].width =
					val + this.styleConfig.legend.w + this.styleConfig.legend.m + this.styleConfig.legend.p;
				this.layout[type].totalWidth += legendWidthArr[index].width;
				this.layout[type].widthArr = legendWidthArr.concat([]);
			});
		} else {
			// 没有超出
			var temp = categoryArr.concat([]);
			this.layout[type].list = [ categoryArr ];

			temp.forEach((val, index) => {
				var testLegendText = oSvg
					.append('text')
					.attr('class', 'test-legend-text')
					.attr('opacity', 0)
					.text(('' + val).substring(0, this.styleConfig.legend.textMaxLength))
					.style('font-size', this.styleConfig.legendFontSize);
				temp[index] = testLegendText.nodes()[0].getBBox().width;
				testLegendText.remove();
			});
			oSvg.remove();
			temp.sort((a, b) => b - a);
			var obj = {
				width: 0,
				overflow: false
			};
			this.layout[type].totalWidth =
				temp[0] + this.styleConfig.legend.w + this.styleConfig.legend.m + this.styleConfig.legend.p;
			obj.width = this.layout[type].totalWidth;
			// obj.overflow = temp[0].length > (this.styleConfig.legend.textMaxLength - 1); // 一个字体的空间放...
			this.layout[type].widthArr = [ obj ];
		}

		let areaw =
			this.layout.w -
			this.layout.legend.totalWidth -
			this.layout.otherLegend.totalWidth -
			this.styleConfig.legendMargin -
			this.layout.y -
			this.layout.yLabel -
			this.layout.y1 -
			this.layout.y1Label -
			this.layout.padding * 2;
		let areah =
			this.layout.h -
			this.layout.title -
			this.layout.x1 -
			this.layout.x1Title -
			this.layout.x -
			this.layout.xLabel -
			this.layout.padding * 2;
		if (areaw < this.styleConfig.areaMinWidth) {
			this.layout.area.w = this.styleConfig.areaMinWidth;
			this.layout.w =
				this.layout.area.w +
				this.layout.padding * 2 +
				this.layout.y +
				this.layout.yLabel +
				this.layout.legend.totalWidth +
				this.styleConfig.legendMargin +
				this.layout.otherLegend.totalWidth +
				this.layout.y1 +
				this.layout.y1Label;
			// this.layout.area.w = this.layout.w -this.layout.padding*2 - this.layout.y - this.layout.legend.totalWidth - this.layout.yLabel - this.styleConfig.legendMargin;
		} else {
			this.layout.area.w =
				this.layout.area.w -
				this.layout.legend.totalWidth -
				this.layout.otherLegend.totalWidth -
				this.styleConfig.legendMargin;
		}

		if (areah < this.styleConfig.areaMinHeight) {
			this.layout.area.h = this.styleConfig.areaMinHeight;
			this.layout.h =
				this.layout.area.h +
				this.layout.padding * 2 +
				this.layout.title +
				this.layout.x +
				this.layout.xLabel +
				this.layout.x1 +
				this.layout.x1Label;
			// this.layout.area.h = this.layout.h - this.layout.padding*2 - this.layout.title - this.layout.x - this.layout.xLabel;
		}

		this._mathRoundLayout();
		return this.layout.legend.totalWidth;
	}

	_computedUnSeparationLegendData(svg, categoryArr) {
		let type = 'legend';
		var h = this.layout.area.h;
		var singleLegendH = this.styleConfig.legend.h + this.styleConfig.legend.m;
		var columnCount = Math.ceil(this.layout.area.h / singleLegendH);
		this.layout[type].columnLegendCount = categoryArr.length > columnCount ? columnCount : categoryArr.length;
		let oSvg = d3.select('body').append('svg').attr('opacity', 0);
		// 超出一列的高度
		if (categoryArr.length > columnCount) {
			// 计算列
			var legendRowArr = [];
			var temp = [];
			var count = 0;
			var legendWidthArr = [];

			do {
				legendRowArr.push(categoryArr.slice(count * columnCount, (count + 1) * columnCount));
				temp = categoryArr.slice((count + 1) * columnCount);
				count++;
			} while (temp.length > columnCount);

			legendRowArr.push(temp);
			this.layout[type].list = legendRowArr;
			// 计算每一行最大文字长度
			var textWidth = [];
			legendRowArr.forEach((value, index) => {
				textWidth.push([]);
				value.forEach((val, i) => {
					var testLegendText = oSvg
						.append('text')
						.attr('class', 'test-legend-text')
						.attr('opacity', 0)
						.text(('' + val).substring(0, this.styleConfig.legend.textMaxLength))
						.style('font-size', this.styleConfig.legendFontSize);
					var width = testLegendText.nodes()[0].getBBox().width;
					textWidth[index].push(width);
					testLegendText.remove();
				});
				textWidth[index].sort((a, b) => b - a);
				textWidth[index] = textWidth[index][0];
			});
			oSvg.remove();

			// 通过dom计算宽度 文字宽度
			textWidth.forEach((val, index) => {
				legendWidthArr[index] = {
					width: val,
					overflow: false
				};

				legendWidthArr[index].width =
					val + this.styleConfig.legend.w + this.styleConfig.legend.m + this.styleConfig.legend.p;
				this.layout[type].totalWidth += legendWidthArr[index].width;
				this.layout[type].widthArr = legendWidthArr.concat([]);
			});
		} else {
			// 没有超出
			var temp = categoryArr.concat([]);
			this.layout[type].list = [ categoryArr ];

			temp.forEach((val, index) => {
				var testLegendText = oSvg
					.append('text')
					.attr('class', 'test-legend-text')
					.attr('opacity', 0)
					.text(('' + val).substring(0, this.styleConfig.legend.textMaxLength))
					.style('font-size', this.styleConfig.legendFontSize);
				temp[index] = testLegendText.nodes()[0].getBBox().width;
				testLegendText.remove();
			});
			oSvg.remove();
			temp.sort((a, b) => b - a);
			var obj = {
				width: 0,
				overflow: false
			};
			this.layout[type].totalWidth =
				temp[0] + this.styleConfig.legend.w + this.styleConfig.legend.m + this.styleConfig.legend.p;
			obj.width = this.layout[type].totalWidth;
			// obj.overflow = temp[0].length > (this.styleConfig.legend.textMaxLength - 1); // 一个字体的空间放...
			this.layout[type].widthArr = [ obj ];
		}

		let areaw =
			this.layout.w -
			this.layout.legend.totalWidth -
			this.styleConfig.legendMargin -
			this.layout.y -
			this.layout.yLabel -
			this.layout.y1 -
			this.layout.y1Label -
			this.layout.padding * 2;
		let areah =
			this.layout.h -
			this.layout.title -
			this.layout.x1 -
			this.layout.x1Title -
			this.layout.x -
			this.layout.xLabel -
			this.layout.padding * 2;
		if (areaw < this.styleConfig.areaMinWidth) {
			this.layout.area.w = this.styleConfig.areaMinWidth;
			this.layout.w =
				this.layout.area.w +
				this.layout.padding * 2 +
				this.layout.y +
				this.layout.yLabel +
				this.layout.legend.totalWidth +
				this.styleConfig.legendMargin +
				this.layout.y1 +
				this.layout.y1Label;
			// this.layout.area.w = this.layout.w -this.layout.padding*2 - this.layout.y - this.layout.legend.totalWidth - this.layout.yLabel - this.styleConfig.legendMargin;
		} else {
			this.layout.area.w =
				this.layout.area.w -
				this.layout.legend.totalWidth -
				this.layout.otherLegend.totalWidth -
				this.styleConfig.legendMargin;
		}

		if (areah < this.styleConfig.areaMinHeight) {
			this.layout.area.h = this.styleConfig.areaMinHeight;
			this.layout.h =
				this.layout.area.h +
				this.layout.padding * 2 +
				this.layout.title +
				this.layout.x +
				this.layout.xLabel +
				this.layout.x1 +
				this.layout.x1Label;
			// this.layout.area.h = this.layout.h - this.layout.padding*2 - this.layout.title - this.layout.x - this.layout.xLabel;
		}

		this._mathRoundLayout();
		return this.layout.legend.totalWidth;
	}

	// 渐变图例的布局计算
	_computedGradietLegendLayout(svg, ticks, type) {
		//type:"legend" or "otherLegend"
		if (!type) type = 'legend';
		if (this[type].type === 'gradient') {
			var tmp = ticks.sort(function(a, b) {
				return ('' + b).length - ('' + a).length;
			});
			var maxLenText = tmp[0];
			var testLegendText = svg
				.append('text')
				.attr('class', 'test-legend-text')
				.attr('opacity', 0)
				.text(('' + maxLenText).substring(0, this.styleConfig.legend.textMaxLength));
			var width = testLegendText.nodes()[0].getBBox().width;
			testLegendText.remove();

			var legendWidth = this.styleConfig.gradientLegend.w + this.styleConfig.legendMargin + width;
			this.layout[type].totalWidth = legendWidth;
		}

		let areaw =
			this.layout.w -
			this.layout.legend.totalWidth -
			this.layout.otherLegend.totalWidth -
			this.styleConfig.legendMargin -
			this.layout.y -
			this.layout.yLabel -
			this.layout.y1 -
			this.layout.y1Label -
			this.layout.padding * 2;
		let areah =
			this.layout.h -
			this.layout.title -
			this.layout.x1 -
			this.layout.x1Label -
			this.layout.x -
			this.layout.xLabel -
			this.layout.padding * 2;
		if (areaw < this.styleConfig.areaMinWidth) {
			this.layout.area.w = this.styleConfig.areaMinWidth;
			this.layout.w =
				this.layout.area.w +
				this.layout.padding * 2 +
				this.layout.y +
				this.layout.yLabel +
				this.layout.legend.totalWidth +
				this.styleConfig.legendMargin +
				this.layout.otherLegend.totalWidth +
				this.layout.y1 +
				this.layout.y1Label;
			// this.layout.area.w = this.layout.w -this.layout.padding*2 - this.layout.y - this.layout.legend.totalWidth - this.layout.yLabel - this.styleConfig.legendMargin;
		} else {
			this.layout.area.w = areaw;
		}

		if (areah < this.styleConfig.areaMinHeight) {
			this.layout.area.h = this.styleConfig.areaMinHeight;
			this.layout.h =
				this.layout.area.h +
				this.layout.padding * 2 +
				this.layout.title +
				this.layout.x +
				this.layout.xLabel +
				this.layout.x1 +
				this.layout.x1Label;
			// this.layout.area.h = this.layout.h - this.layout.padding*2 - this.layout.title - this.layout.x - this.layout.xLabel;
		} else {
			this.layout.area.h = areah;
		}

		this._mathRoundLayout();
	}

	/**
     * 数据选择 内部区分单选or多选
     * d 当前数据
     * curD3Object 当前元素的d3对象
     * defaultColor 当前元素的默认画图颜色
     */
	_applyChartSelect(d, curD3Object, defaultColor) {
		var selectedId = curD3Object.attr('_selectedId');
		if (selectedId || selectedId == 0) {
			curD3Object.style('fill', defaultColor).attr('_selectedId', null);
			// multiple select default delete item
			if (this.selectedModule === 'multiple') {
				this.selectedData.forEach((val, index) => {
					if (val['_selectedId'] == selectedId) {
						this.selectedData.splice(index, 1);
					}
				});
			} else {
				// reset this selectedData
				this.selectedData.forEach((val, index) => {
					val._el.style('fill', val._defaultColor);
				});
				this.selectedData = [];
			}
		} else {
			if (this.selectedModule === 'single' && this.selectedData.length) {
				// reset this selectedData
				this.selectedData.forEach((val, index) => {
					val._el.style('fill', val._defaultColor).attr('_selectedId', null);
				});
			}
			// 生成id
			var id = 'selectId' + UUID.create().toString().replace(/-/g, '');
			curD3Object.style('fill', this.styleConfig.selectedColor).attr('_selectedId', id);
			d._selectedId = id;
			d._defaultColor = defaultColor;
			d._el = curD3Object;
			this.selectedModule === 'multiple' ? this.selectedData.push(d) : (this.selectedData = [ d ]);
		}
		// callback
		this.chart.onselect && this.chart.onselect(this.selectedData);
	}

	// 设置数据选择模式
	setChartSelectModule(module) {
		this.chart.selectedModule = module;
		this.selectedModule = module;
		this.resetChartSelect();
	}

	// 重置数据选择
	resetChartSelect() {
		if (this.selectedData.length) {
			this.selectedData.forEach((val, index) => {
				val._el.style('fill', val._defaultColor).attr('_selectedId', null);
			});
			this.selectedData = [];
			if ('clearselect' in this.chart) this.chart.clearselect.call(this);
		}
	}

	// 设置参数
	setOptions({ chart, axis, legend, otherLegend, tooltip }) {
		this.chart = chart;
		this.axis = axis;
		this.legend = legend;
		this.otherLegend = otherLegend;
		this.tooltip = tooltip;
	}

	setXTitle(text, axis = 'x') {
		this.axis[axis].title = text;
	}

	setYTitle(text, axis = 'y') {
		this.axis[axis].title = text;
	}

	setChartTitle(text) {
		this.chart.title = text;
	}

	// 获取配置信息
	getOptions() {
		return {
			chart: this.chart,
			axis: this.axis,
			legend: this.legend,
			otherLegend: this.otherLegend,
			tooltip: this.tooltip
		};
	}

	// 获取全局配置
	getRootConfig() {
		return this.rootConfig;
	}

	// 设置颜色
	setColor(colorStr, index, type = 'colors') {
		this[type][index] = colorStr;
	}

	// 设置透明色
	setAColor(colorStr, index) {
		this.aColors[index] = colorStr;
	}

	getColors(type = 'colors') {
		return this[type];
	}

	getChartSelectModule() {
		return this.selectedModule;
	}

	_computedInterpolate(type) {
		// cardinal basic step natural  linear
		switch (type) {
			case 'cardinal':
				return d3.curveCardinal.tension(0.3);
			case 'step':
				return d3.curveStep;
			case 'basic':
				return d3.curveBasis;
			case 'natural':
				return d3.curveNatural;
			default:
				return d3.curveLinear;
		}
	}

	// 一层浅拷贝
	_copyObj(targetObj) {
		var obj = {};
		for (var name in targetObj) {
			obj[name] = targetObj[name];
		}
		return obj;
	}

	_copyArr(target) {
		return target.concat();
	}

	_deepCopyObj(obj) {
		var result = {},
			oClass = _isClass(obj);
		for (var key in obj) {
			var copy = obj[key];
			if (_isClass(copy) == 'Object') {
				result[key] = this._deepCopyObj(copy);
			} else if (_isClass(copy) == 'Array') {
				result[key] = this._copyArr(copy);
			} else {
				result[key] = obj[key];
			}
		}
		return result;

		function _isClass(o) {
			if (o === null) return 'Null';
			if (o === undefined) return 'Undefined';
			return Object.prototype.toString.call(o).slice(8, -1);
		}
	}

	_mathRoundLayout() {
		for (let key in this.layout) {
			if (typeof this.layout[key] === 'number') {
				this.layout[key] = Math.round(this.layout[key]);
			} else if (this.layout[key] instanceof Object) {
				for (let name in this.layout[key]) {
					if (typeof this.layout[key][name] === 'number') {
						this.layout[key][name] = Math.round(this.layout[key][name]);
					}
				}
			}
		}
	}
}

export default Base;
