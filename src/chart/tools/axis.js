/**
 * @time 2018年7月26日09:44:05
 * @author joke<277637411@qq.com>
 * @description 画坐标轴方法
 */

import * as d3 from 'd3';
import global from '../../config';

export const drawxAxis = function(x, tickValue, tickFormats) {
	var _self = this;
	var xG = _self.svg.append('g').attr('class', 'axis x-axis');
	var xPos, yPos;
	var ticks = 'ticks' in _self.axis.x ? _self.axis.x.ticks : _self.styleConfig.defaultTicks;
	if (_self.axis && 'x' in _self.axis) xPos = _self.axis.x.position || 'bottom';
	if (_self.axis && 'y' in _self.axis) yPos = _self.axis.y.position || 'left';

	var { xDis, yDis } = _applyAxisPosition.call(_self, xPos, yPos, 'x');

	xG.attr('transform', 'translate(' + xDis + ',' + yDis + ')');
	switch (xPos) {
		case 'top':
			let axisTop = d3.axisTop(x).tickValues(tickValue && tickValue).tickFormat(function(d, i) {
				var text;
				if (tickFormats && tickFormats.length) {
					text = '' + tickFormats[i];
				} else {
					text = '' + d;
				}

				if (_self.axis.x.formatter) {
					text = _self.axis.x.formatter(text);
				}
				var val =
					text.length > global.textMaxLength ? text.substring(0, global.textMaxLength + 1) + '...' : text;
				return val;
			});
			axisTop.ticks(ticks);
			xG.call(axisTop);
			break;
		case 'bottom':
			let axisBottom = d3.axisBottom(x).tickValues(tickValue && tickValue).tickFormat(function(d, i) {
				var text;
				if (tickFormats && tickFormats.length) {
					text = '' + tickFormats[i];
				} else {
					text = '' + d;
				}

				if (_self.axis.x.formatter) {
					text = _self.axis.x.formatter(text);
				}
				var val =
					text.length > global.textMaxLength ? text.substring(0, global.textMaxLength + 1) + '...' : text;
				return val;
			});
			axisBottom.ticks(ticks);
			xG.call(axisBottom);
			break;
	}
	xG
		.selectAll('text')
		.style('font-size', this.styleConfig.ticksFontSize)
		.style('font-family', this.styleConfig.fontFamily)
		.style('fill', this.styleConfig.ticksFontColor);
	xG.selectAll('line').attr('stroke', this.styleConfig.ticksStrokeColor);
	xG.select('path').attr('stroke', this.styleConfig.axisStrokeColor);

	// 是否旋转坐标轴标签
	if ('x' in _self.axis && 'rotate' in _self.axis.x) {
		var rotate = Math.abs(_self.axis.x.rotate) > 60 ? 60 : Math.abs(_self.axis.x.rotate);
		var allAxisText = _self.svg
			.selectAll('.x-axis text')
			.attr('text-anchor', 'end')
			.attr('dx', function() {
				if (rotate != 90 && rotate != '90') {
					return '-0.8em';
				} else {
					return '-1em';
				}
			})
			.attr('dy', function() {
				if (rotate != 90 && rotate != '90') {
					return '0.5em';
				} else {
					return '-0.5em';
				}
			});

		if (xPos === 'top') {
			allAxisText.attr('transform', 'rotate(' + _self.axis.x.rotate + ')');
		} else {
			allAxisText.attr('transform', 'rotate(-' + _self.axis.x.rotate + ')');
		}
	}
};

export const drawYAxis = function(y) {
	var _self = this;
	var yG = _self.svg.append('g').attr('class', 'axis y-axis');
	var xPos = _self.axis.x.position || 'bottom';
	var yPos = _self.axis.y.position || 'left';
	var ticks = 'ticks' in _self.axis.y ? _self.axis.y.ticks : _self.styleConfig.defaultTicks;
	var tickValue = 'data' in _self.axis.y ? _self.axis.y.data : null;
	var { xDis, yDis } = _applyAxisPosition.call(_self, xPos, yPos, 'y');
	yG.attr('transform', 'translate(' + xDis + ',' + yDis + ')');

	switch (yPos) {
		case 'left':
			let axisLeft = d3.axisLeft(y).tickValues(tickValue && tickValue).tickFormat(function(d) {
				var text = '' + d;
				if (_self.axis.y.formatter) {
					text = _self.axis.y.formatter(text);
				}
				var val =
					text.length > global.textMaxLength ? text.substring(0, global.textMaxLength + 1) + '...' : text;
				return val;
			});
			axisLeft.ticks(ticks);
			yG.call(axisLeft);
			break;
		case 'right':
			let axisRight = d3.axisRight(y).tickValues(tickValue && tickValue).tickFormat(function(d) {
				let text = '' + d;
				if (_self.axis.y.formatter) {
					text = _self.axis.y.formatter(text);
				}
				var val = text.length > global.textMaxLength ? text.substring(0, global.textMaxLength + 1) : text;
				return val;
			});
			axisRight.ticks(ticks);
			yG.call(axisRight);
			break;
	}
	yG
		.selectAll('text')
		.style('font-size', this.styleConfig.ticksFontSize)
		.style('font-family', this.styleConfig.fontFamily)
		.style('fill', this.styleConfig.ticksFontColor);
	yG.selectAll('line').attr('stroke', this.styleConfig.ticksStrokeColor);
	yG.select('path').attr('stroke', this.styleConfig.axisStrokeColor);
};

//组合图
export const drawGroupXAxis = function(axis, x, xpos, ypos, tickValue, tickFormats) {
	var _self = this;
	var xG = _self.svg.append('g').attr('class', `axis ${axis}-axis`);

	var { xDis, yDis } = _applyGroupAxisPos.call(_self, axis);

	xG.attr('transform', 'translate(' + (xpos || xDis) + ',' + (ypos || yDis) + ')');

	if (axis === 'x') {
		let axisBottom = d3.axisBottom(x).tickValues(tickValue && tickValue).tickFormat(function(d, i) {
			var text;
			if (tickFormats && tickFormats.length) {
				text = '' + tickFormats[i];
			} else {
				text = '' + d;
			}

			if (_self.axis.x.formatter) {
				text = _self.axis.x.formatter(text);
			}
			var val = text.length > global.textMaxLength ? text.substring(0, global.textMaxLength + 1) + '...' : text;
			return val;
		});

		if (typeof axisBottom.ticks === 'function') {
			if ('ticks' in _self.axis.x) {
				axisBottom.ticks(_self.axis.x.ticks);
			} else {
				axisBottom.ticks(_self.styleConfig.defaultTicks);
			}
		}

		xG.call(axisBottom);
	} else if (axis === 'x1') {
		let axisTop = d3.axisTop(x).tickValues(tickValue && tickValue).tickFormat(function(d, i) {
			var text;
			if (tickFormats && tickFormats.length) {
				text = '' + tickFormats[i];
			} else {
				text = '' + d;
			}

			if (_self.axis.x1.formatter) {
				text = _self.axis.x1.formatter(text);
			}
			var val = text.length > global.textMaxLength ? text.substring(0, global.textMaxLength + 1) + '...' : text;
			return val;
		});

		if (typeof axisTop.ticks === 'function') {
			if ('ticks' in _self.axis.x1) {
				axisTop.ticks(_self.axis.x1.ticks);
			} else {
				axisTop.ticks(_self.styleConfig.defaultTicks);
			}
		}

		xG.call(axisTop);
	}

	xG
		.selectAll('text')
		.style('font-size', this.styleConfig.ticksFontSize)
		.style('font-family', this.styleConfig.fontFamily)
		.style('fill', this.styleConfig.ticksFontColor);
	xG.selectAll('line').attr('stroke', this.styleConfig.ticksStrokeColor);
	xG.select('path').attr('stroke', this.styleConfig.axisStrokeColor);

	// 是否旋转坐标轴标签
	if (axis in _self.axis && 'rotate' in _self.axis[axis]) {
		var rotate = Math.abs(_self.axis[axis].rotate) > 60 ? 60 : Math.abs(_self.axis[axis].rotate);
		var allAxisText = _self.svg
			.selectAll(`.${axis}-axis text`)
			.attr('text-anchor', 'end')
			.attr('dx', function() {
				if (rotate != 90 && rotate != '90') {
					return '-0.8em';
				} else {
					return '-1em';
				}
			})
			.attr('dy', function() {
				if (rotate != 90 && rotate != '90') {
					return '0.5em';
				} else {
					return '-0.5em';
				}
			});

		if (axis === 'x1') {
			allAxisText.attr('transform', 'rotate(' + _self.axis.x1.rotate + ')');
		} else if (axis === 'x') {
			allAxisText.attr('transform', 'rotate(-' + _self.axis.x.rotate + ')');
		}
	}
};

export const drawGroupYAxis = function(axis, y, xpos, ypos) {
	var _self = this;
	var yG = _self.svg.append('g').attr('class', `axis ${axis}-axis`);
	let ticks = 'ticks' in _self.axis[axis] ? _self.axis[axis].ticks : 10;

	var { xDis, yDis } = _applyGroupAxisPos.call(_self, axis);
	yG.attr('transform', 'translate(' + (xpos || xDis) + ',' + (ypos || yDis) + ')');

	if (axis === 'y') {
		let axisLeft = d3.axisLeft(y).ticks(ticks).tickFormat(function(d) {
			var text = '' + d;
			if (_self.axis.y.formatter) {
				text = _self.axis.y.formatter(text);
			}
			var val = text.length > global.textMaxLength ? text.substring(0, global.textMaxLength + 1) + '...' : text;
			return val;
		});

		if (typeof axisLeft.ticks === 'function') {
			if ('ticks' in _self.axis.y) {
				axisLeft.ticks(_self.axis.y.ticks);
			} else {
				axisLeft.ticks(_self.styleConfig.defaultTicks);
			}
		}
		yG.call(axisLeft);
	} else if (axis === 'y1') {
		let axisRight = d3.axisRight(y).ticks(ticks).tickFormat(function(d) {
			let text = '' + d;
			if (_self.axis.y1.formatter) {
				text = _self.axis.y1.formatter(text);
			}
			var val = text.length > global.textMaxLength ? text.substring(0, global.textMaxLength + 1) + '...' : text;
			return val;
		});

		if (typeof axisRight.ticks === 'function') {
			if ('ticks' in _self.axis.y1) {
				axisRight.ticks(_self.axis.y1.ticks);
			} else {
				axisRight.ticks(_self.styleConfig.defaultTicks);
			}
		}
		yG.call(axisRight);
	}

	yG
		.selectAll('text')
		.style('font-size', this.styleConfig.ticksFontSize)
		.style('font-family', this.styleConfig.fontFamily)
		.style('fill', this.styleConfig.ticksFontColor);
	yG.selectAll('line').attr('stroke', this.styleConfig.ticksStrokeColor);
	yG.select('path').attr('stroke', this.styleConfig.axisStrokeColor);
};

function _applyAxisPosition(xPos, yPos, axis) {
	var _this = this;
	var l = _this.layout;
	if (xPos === 'bottom') {
		if (yPos === 'left') {
			if (axis === 'x') {
				return {
					xDis: l.padding + l.y + l.yLabel,
					yDis: l.padding + l.title + l.area.h
				};
			} else if (axis === 'y') {
				return {
					xDis: l.padding + l.y + l.yLabel,
					yDis: l.padding + l.title
				};
			}
		} else if (yPos === 'right') {
			if (axis === 'x') {
				return {
					xDis: l.padding,
					yDis: l.padding + l.title + l.area.h
				};
			} else if (axis === 'y') {
				return {
					xDis: l.padding + l.area.w,
					yDis: l.padding + l.title
				};
			}
		}
	} else if (xPos === 'top') {
		if (yPos === 'left') {
			if (axis === 'x') {
				return {
					xDis: l.padding + l.y + l.yLabel,
					yDis: l.padding + l.title + l.x + l.xLabel
				};
			} else if (axis === 'y') {
				return {
					xDis: l.padding + l.y + l.yLabel,
					yDis: l.padding + l.title + l.x + l.xLabel
				};
			}
		} else if (yPos === 'right') {
			if (axis === 'x') {
				return {
					xDis: l.padding,
					yDis: l.padding + l.title + l.x + l.xLabel
				};
			} else if (axis === 'y') {
				return {
					xDis: l.padding + l.area.w,
					yDis: l.padding + l.title + l.x + l.xLabel
				};
			}
		}
	}
}

function _applyGroupAxisPos(axis) {
	var _this = this;
	var l = _this.layout;

	if (axis === 'x') {
		return {
			xDis: l.padding + l.y + l.yLabel,
			yDis: l.padding + l.title + l.x1 + l.x1Label + l.area.h
		};
	} else if (axis === 'y') {
		return {
			xDis: l.padding + l.y + l.yLabel,
			yDis: l.padding + l.title + l.x1 + l.x1Label
		};
	} else if (axis === 'x1') {
		return {
			xDis: l.padding + l.y + l.yLabel,
			yDis: l.padding + l.title + l.x1 + l.x1Label
		};
	} else if (axis === 'y1') {
		return {
			xDis: l.padding + l.y + l.yLabel + l.area.w,
			yDis: l.padding + l.title + l.x1 + l.x1Label
		};
	}
}
