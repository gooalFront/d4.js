### TODO list
- [x] 增加最大最小值，针对线性比例尺；

- [x] 配置项rotate:60：用户自定义角度，若大于60，角度是60

- [x] 计算Y轴字体最大长度

- [x] 渐变式图例，需要给配置：
```javascript
	legend:{
		type:"gradient"
	}
```
- [x]  图例添加标题，没有计算布局，需要计算布局的时候减掉图例标题占的空间 （不重新计算布局 直接在图例上方画标题）     

- [x] 柱状图自定义padding和柱子宽度占比

- [ ] 图例标题是否需要做溢出处理

- [ ] 饼图label重叠问题

- [ ] otherData:[] otherColors:[] otherClick:boolean