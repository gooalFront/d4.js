/**
 * @time 2018年7月26日17:47:52
 * @author joke<277637411@qq.com>
 * @description 提示框
 */
import config from '../../config';

var tooltip = {
	el: null,
	timer: null,
	styles: {
		transition: '.3 all ease',
		backgroundColor: 'transparent',
		position: 'absolute',
		color: '#999',
		wordBreak: 'break-all',
		fontSize: '12px',
		fontFamily:config.fontFamily,
		zIndex:10
	},
	templateStyles: {
		background: '#fff',
		border: '1px solid rgb(221, 221, 221)',
		padding: '12px',
		position: 'relative'
	},
	arrowStyles1: {
		position: 'absolute',
		left: '-17px',
		top: '50%',
		marginTop: '-8px',
		border: '8px solid transparent',
		borderRight: '8px solid rgb(221, 221, 221)'
	},
	arrowStyles2: {
		position: 'absolute',
		left: '-16px',
		top: '50%',
		marginTop: '-8px',
		border: '8px solid transparent',
		borderRight: '8px solid #fff'
	},
	show(x, y, html) {
		var _self = this;
		if (this.timer) clearTimeout(this.timer);
		var width = width || 140;
		var height = height || 60;
		this.el = document.querySelector('#d4-chart-tooltip-wrap');
		if (this.el) {
			this.el.parentNode.removeChild(this.el);
			this.el = null;
		}

		var template = document.createElement('div');
		var div = document.createElement('div');
		var arrow1 = document.createElement('span');
		var arrow2 = document.createElement('span');

		template.innerHTML = html;
		template.appendChild(arrow1);
		template.appendChild(arrow2);
		template.id = 'id="d4-chart-tooltip-001';

		div.id = 'd4-chart-tooltip-wrap';
		div.appendChild(template);

		document.body.appendChild(div);
		div.style.opacity = 0;
		div.style.left = x + 24 + 'px';
		var tooltipHeight = div.offsetHeight;
		div.style.top = y - tooltipHeight / 2 + 'px';
		div.style.opacity = 1;

		this.el = div;
		this._applyStyles(arrow1, this.arrowStyles1);
		this._applyStyles(arrow2, this.arrowStyles2);
		this._applyStyles(div, this.styles);
		this._applyStyles(template, this.templateStyles);

		let allChildren = this.el.querySelectorAll('*');
		Array.from(allChildren).forEach((v) => {
			v.style.fontSize = this.styles.fontSize;
			v.style.fontFamily = this.styles.fontFamily;
			v.style.color = this.styles.color;
		});

		this.el.addEventListener(
			'mouseover',
			function() {
				clearTimeout(_self.timer);
			},
			false
		);

		this.el.addEventListener(
			'mouseout',
			function() {
				_self.hide();
			},
			false
		);
	},
	update(x, y) {
		if (this.el) {
			var wrap = this.el;
			wrap.style.left = x + 24 + 'px';
			wrap.style.top = y - wrap.offsetHeight / 2 + 'px';
		}
	},
	_applyStyles(obj, styles) {
		for (var key in styles) {
			obj.style[key] = styles[key];
		}
	},
	hide() {
		this.timer = setTimeout(() => {
			var tooltip = document.querySelector('#d4-chart-tooltip-wrap');
			if (tooltip) {
				tooltip.parentNode.removeChild(tooltip);
			}
		}, 200);
	}
};

export default tooltip;
