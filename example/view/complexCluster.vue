<template>
  <div id="complexCluster-chart">
    <h3>复杂聚类热图</h3>
    <el-button size="small" @click="redraw">Redraw</el-button>
    <el-button size="small" @click="deepRedraw">deepRedraw</el-button>
    <input type="color" ref="inputColor" @change="colorChange">
    <input type="color" ref="oinputColor" @change="ocolorChange">
    <div class="chart-content" id="chart-complexCluster" style="height:100%"></div>
    <codemirror ref="code" v-model="code" :options="options"></codemirror>
  </div>
</template>

<script>
export default {
  name: "complexClusterChart",
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
      code: `
      {
        chart: {
          title: "聚类热图",
          dblclick: function(event) {
            var name = prompt("请输入需要修改的标题", "");
            if (name) {
              this.setChartTitle(name);
              this.updateTitle();
            }
          },
          mouseover: function(event, titleObj) {
            titleObj
              .attr("fill", "blue")
              .append("title")
              .text("双击修改标题");
          },
          mouseout: function(event, titleObj) {
            titleObj.attr("fill", "#333");
            titleObj.select("title").remove();
          },
          el: "#chart-complexCluster",
          type: "complexCluster",
          data: [],
          colors: ["#0070c0", "#ff0000"],
          heatmap: {
            // width: 680,
            // height: 680
          },
          left: {
            show: true, //控制折线是否显示
            isBlockClick:true, //是否可以点击色块
            simple:{
              // tooltip:function(d){
              //   return "left name:d.name";
              // }
            },
            complex:{
              // tooltip:function(d){
              //   return "left type:d.type";
              // }
            }
          },
          top: {
            show: true,
            simple:{
              // tooltip:function(d){
              //   return "top name:d.name";
              // }
            },
            complex:{
              // tooltip:function(d){
              //   return "top type:d.type";
              // }
            }
          },
          onselect: data => {
            console.log(data);
          }
        },
        axis: {
          x: {
            // rotate: 30,
            type:"id",  //hidden,id,symbol
            dblclick: function(event,title) {
              console.log(title)
            },
            mouseover: function(event, title) {
              title
                .attr("fill", "blue")
                .append("title")
                .text("双击修改");
            },
            mouseout: function(event, title) {
              title.attr("fill", "#333");
              title.select("title").remove();
            }
          },
          y: {
            type:"id"  //hidden,id,symbol
          }
        },
        legend: {
          show: true,
          // type: "gradient",
          // min: -5,
          // max: 5,
          data: [],
          // position: "right",
          click: (d, i) => {
            this.d = d;
            this.i = i;
            this.$refs.inputColor.click();
          },
          mouseover: function(event, legendObj) {
            legendObj.append("title").text("单击修改颜色");
          },
          mouseout: function(event, legendObj) {
            legendObj.select("title").remove();
          },
          oLegend:{
            show:true,
            data:[]
          }
        },
        tooltip: function(d) {
          // return "<span>基因：d.x</span><br><span>y：d.y</span>";
        }
  }
      `,
      chart: null,
      config: {
        chart: {
          title: "聚类热图",
          dblclick: function(event) {
            var name = prompt("请输入需要修改的标题", "");
            if (name) {
              this.setChartTitle(name);
              this.updateTitle();
            }
          },
          mouseover: function(event, titleObj) {
            titleObj
              .attr("fill", "blue")
              .append("title")
              .text("双击修改标题");
          },
          mouseout: function(event, titleObj) {
            titleObj.attr("fill", "#333");
            titleObj.select("title").remove();
          },
          el: "#chart-complexCluster",
          type: "complexCluster",
          data: [],
          colors: ["#0070c0", "#ff0000"],
          otherColors:["#9adf81","#e4531f"],
          heatmap: {
            // width: 680,
            // height: 280
          },
          left: {
            show: true, //控制折线是否显示
            isBlockClick:true, //是否可以点击色块
            simple:{
              // tooltip:function(d){
              //   return `left name:${d.name}`;
              // }
            },
            complex:{
              // tooltip:function(d){
              //   return `left type:${d.type}`
              // }
            }
          },
          top: {
            show: true,
            simple:{
              // tooltip:function(d){
              //   return `top name:${d.name}`;
              // }
            },
            complex:{
              // tooltip:function(d){
              //   return `top type:${d.type}`
              // }
            }
          },
          onselect: data => {
            console.log(data);
          }
        },
        axis: {
          x: {
            // rotate: 30,
            type:"id",  //hidden,id,symbol
            dblclick: function(event,title) {
              console.log(title)
            },
            mouseover: function(event, title) {
              title
                .attr("fill", "blue")
                .append("title")
                .text("双击修改");
            },
            mouseout: function(event, title) {
              title.attr("fill", "#333");
              title.select("title").remove();
            }
          },
          y: {
            type:"id"  //hidden,id,symbol
          }
        },
        legend: {
          show: true,
          // type: "gradient",
          // min: -5,
          // max: 5,
          data: [],
          // position: "right",
          click: (d, i) => {
            this.d = d;
            this.i = i;
            this.$refs.inputColor.click();
          },
          mouseover: function(event, legendObj) {
            legendObj.append("title").text("单击修改颜色");
          },
          mouseout: function(event, legendObj) {
            legendObj.select("title").remove();
          },
          oLegend:{
            show:true,
            data:[],
            click: (el,i) => {
              this.od = el;
              this.oi = i;
              this.$refs.oinputColor.click();
            },
            mouseover: function(event, legendObj) {
              legendObj.append("title").text("单击修改颜色");
            },
            mouseout: function(event, legendObj) {
              legendObj.select("title").remove();
            }
          }
        },
        tooltip: function(d) {
          // return `<span>基因：${d.x}</span><br><span>y：${d.y}</span>`;
        }
      }
    };
  },
  mounted() {
    var data = {
      min: 0,
      max: 1,
      top: {
        line: {
          name: "",
          children: [{ name: "A1-vs-B1" }, { name: "B1-vs-C1" }]
        },
        simple: [
          {
            data: [
              { name: "A1-vs-B1", type: "Path1" },
              { name: "B1-vs-C1", type: "Path2" }
            ],
            title: "cellType"
          },
          {
            data: [
              { name: "A1-vs-B1", type: "3" },
              { name: "B1-vs-C1", type: "2" }
            ],
            title: "time"
          }
        ],
        complex:[
            {
              "data": [
                {
                  "data": [
                    {
                      "name": "A1-vs-B1"
                    },
                    {
                      "name": "B1-vs-C1"
                    }
                  ],
                  "type": "GO:0060089//molecular transducer"
                },
                {
                  "data": [
                    {
                      "name": "A1-vs-B1"
                    }
                  ],
                  "type": "GO:0038023//signaling receptor"
                },
                {
                  "data": [
                    {
                      "name": "B1-vs-C1"
                    }
                  ],
                  "type": "GO:0031226//intrinsic component of plasma"
                },
                {
                  "data": [
                    {
                      "name": "B1-vs-C1"
                    },
                    {
                      "name": "A1-vs-B1"
                    }
                  ],
                  "type": "GO:0004871//signal transducer"
                },
                {
                  "data": [
                    {
                      "name": "A1-vs-B1"
                    }
                  ],
                  "type": "GO:0045202"
                }
              ],
              "title": "GO Term"
            }
          ]

      },
      left: {
        line: {
          name: "",
          children: [
            { name: "QRNONHSAG058902.1" },
            {
              name: "",
              children: [
                {
                  name: "",
                  children: [
                    { name: "QRNONHSAG053078.2" },
                    {
                      name: "",
                      children: [
                        {
                          name: "",
                          children: [
                            { name: "QRNONHSAG098014.1" },
                            {
                              name: "",
                              children: [
                                { name: "QRNONHSAG098159.1" },
                                { name: "QRNONHSAG052904.2" }
                              ]
                            }
                          ]
                        },
                        {
                          name: "",
                          children: [
                            { name: "QRNONHSAG032644.2" },
                            { name: "QRNONHSAG045262.2" }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  name: "",
                  children: [
                    { name: "QRNONHSAG020674.2" },
                    {
                      name: "",
                      children: [
                        { name: "QRNONHSAG031441.2" },
                        {
                          name: "",
                          children: [
                            {
                              name: "",
                              children: [
                                { name: "QRNONHSAG092707.1" },
                                {
                                  name: "",
                                  children: [
                                    { name: "QRNONHSAG030455.2" },
                                    { name: "QRNONHSAG056217.1" }
                                  ]
                                }
                              ]
                            },
                            {
                              name: "",
                              children: [
                                { name: "QRNONHSAG100682.1" },
                                {
                                  name: "",
                                  children: [
                                    { name: "QRNONHSAG075883.1" },
                                    { name: "QRNONHSAG060103.1" }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        complex: [
				{
					"data": [
						{
							"data": [
								{
									"block": ["QRNONHSAG032644.2"]
								},
								{
									"block": ["QRNONHSAG030455.2"]
								}
							],
							"type": "GO:0060089//molecular transducer activity"
						},
						{
							"data": [
								{
									"block": ["QRNONHSAG020674.2"]
								}
							],
							"type": "GO:0030594//neurotransmitter receptor activity"
						},
						{
							"data": [
								{
									"block": ["QRNONHSAG020674.2"]
								}
							],
							"type": "GO:0098552//side of membrane"
						},
						{
							"data": [
								{
									"block": ["QRNONHSAG030455.2"]
								}
							],
							"type": "GO:0038023//signaling receptor activity"
						},
						{
							"data": [
								{
									"block": ["QRNONHSAG098014.1"]
								}
							],
							"type": "GO:0031226//intrinsic component of plasma membrane"
						},
						{
							"data": [
								{
									"block": [
										"QRNONHSAG052904.2",
										"QRNONHSAG032644.2"
									]
								},
								{
									"block": ["QRNONHSAG031441.2"]
								}
							],
							"type": "GO:0004871//signal transducer activity"
						},
						{
							"data": [
								{
									"block": ["QRNONHSAG052904.2"]
								}
							],
							"type": "GO:0043167//ion binding"
						},
						{
							"data": [
								{
									"block": ["QRNONHSAG098159.1"]
								}
							],
							"type": "GO:0045202//synapse"
						},
						{
							"data": [
								{
									"block": ["QRNONHSAG098014.1"]
								}
							],
							"type": "GO:0098794//postsynapse"
						},
						{
							"data": [
								{
									"block": ["QRNONHSAG031441.2"]
								}
							],
							"type": "GO:1990351//transporter complex"
						},
						{
							"data": [
								{
									"block": ["QRNONHSAG058902.1"]
								}
							],
							"type": "GO:0043169//cation binding"
						},
						{
							"data": [
								{
									"block": ["QRNONHSAG053078.2"]
								}
							],
							"type": "GO:0005488//binding"
						}
					],
					"title": "GO Term"
				}
			  ],
        simple: [
          {
            data: [
              { type: "h", block:['QRNONHSAG058902.1','QRNONHSAG053078.2','QRNONHSAG098014.1'] },
              { type: "l",block:['QRNONHSAG098159.1'] },
              { type: "h",block:['QRNONHSAG052904.2'] },
              { type: null,block:['QRNONHSAG032644.2']},
              { type: "l",block:['QRNONHSAG045262.2','QRNONHSAG020674.2'] },
              { type: "h" ,block:['QRNONHSAG031441.2','QRNONHSAG092707.1']},
              { type: null,block:['QRNONHSAG030455.2'] },
              { type: "m" ,block:['QRNONHSAG056217.1','QRNONHSAG100682.1']},
              { type: "l",block:['QRNONHSAG075883.1'] },
              { type: "h",block:['QRNONHSAG060103.1'] }
            ],
            title: "gene_coding_type"
          },
          {
            data: [
              { type: "h2", block:['QRNONHSAG058902.1','QRNONHSAG053078.2'] },
              { type: "m2",block:['QRNONHSAG098014.1','QRNONHSAG098159.1'] },
              { type: "h2",block:['QRNONHSAG052904.2'] },
              { type: null,block:['QRNONHSAG032644.2']},
              { type: "l2",block:['QRNONHSAG045262.2'] },
              { type: "h2" ,block:['QRNONHSAG020674.2','QRNONHSAG031441.2','QRNONHSAG092707.1']},
              { type: null,block:['QRNONHSAG030455.2'] },
              { type: "m2" ,block:['QRNONHSAG056217.1','QRNONHSAG100682.1']},
              { type: "l2",block:['QRNONHSAG075883.1'] },
              { type: "h2",block:['QRNONHSAG060103.1'] }
            ],
            title: "gene_coding"
          }
        ]
      },
      heatmaps: [
        {
          name: "A1-vs-B1",
          heatmap: [
            {
              x: "QRNONHSAG058902.1",
              y: 1,
              symbol: "QRNONHSAG058902.1"
            },
            {
              x: "QRNONHSAG053078.2",
              y: 0,
              symbol: "QRNONHSAG053078.2"
            },
            {
              x: "QRNONHSAG098014.1",
              y: 1,
              symbol: "QRNONHSAG098014.1"
            },
            {
              x: "QRNONHSAG098159.1",
              y: 0,
              symbol: "QRNONHSAG098159.1"
            },
            {
              x: "QRNONHSAG052904.2",
              y: 1,
              symbol: "QRNONHSAG052904.2"
            },
            {
              x: "QRNONHSAG032644.2",
              y: 1,
              symbol: "QRNONHSAG032644.2"
            },
            {
              x: "QRNONHSAG045262.2",
              y: 1,
              symbol: "QRNONHSAG045262.2"
            },
            {
              x: "QRNONHSAG020674.2",
              y: 1,
              symbol: "QRNONHSAG020674.2"
            },
            {
              x: "QRNONHSAG031441.2",
              y: 0,
              symbol: "QRNONHSAG031441.2"
            },
            {
              x: "QRNONHSAG092707.1",
              y: 0,
              symbol: "QRNONHSAG092707.1"
            },
            {
              x: "QRNONHSAG030455.2",
              y: 0,
              symbol: "QRNONHSAG030455.2"
            },
            {
              x: "QRNONHSAG056217.1",
              y: 1,
              symbol: "QRNONHSAG056217.1"
            },
            {
              x: "QRNONHSAG100682.1",
              y: 0,
              symbol: "QRNONHSAG100682.1"
            },
            {
              x: "QRNONHSAG075883.1",
              y: 1,
              symbol: "QRNONHSAG075883.1"
            },
            {
              x: "QRNONHSAG060103.1",
              y: 0,
              symbol: "QRNONHSAG060103.1"
            }
          ]
        },
        {
          name: "B1-vs-C1",
          heatmap: [
            {
              x: "QRNONHSAG058902.1",
              y: 0,
              symbol: "QRNONHSAG058902.1"
            },
            {
              x: "QRNONHSAG053078.2",
              y: 1,
              symbol: "QRNONHSAG053078.2"
            },
            {
              x: "QRNONHSAG098014.1",
              y: 0,
              symbol: "QRNONHSAG098014.1"
            },
            {
              x: "QRNONHSAG098159.1",
              y: 1,
              symbol: "QRNONHSAG098159.1"
            },
            {
              x: "QRNONHSAG052904.2",
              y: 1,
              symbol: "QRNONHSAG052904.2"
            },
            {
              x: "QRNONHSAG032644.2",
              y: 0,
              symbol: "QRNONHSAG032644.2"
            },
            {
              x: "QRNONHSAG045262.2",
              y: 1,
              symbol: "QRNONHSAG045262.2"
            },
            {
              x: "QRNONHSAG020674.2",
              y: 1,
              symbol: "QRNONHSAG020674.2"
            },
            {
              x: "QRNONHSAG031441.2",
              y: 0,
              symbol: "QRNONHSAG031441.2"
            },
            {
              x: "QRNONHSAG092707.1",
              y: 1,
              symbol: "QRNONHSAG092707.1"
            },
            {
              x: "QRNONHSAG030455.2",
              y: 0,
              symbol: "QRNONHSAG030455.2"
            },
            {
              x: "QRNONHSAG056217.1",
              y: 1,
              symbol: "QRNONHSAG056217.1"
            },
            {
              x: "QRNONHSAG100682.1",
              y: 1,
              symbol: "QRNONHSAG100682.1"
            },
            {
              x: "QRNONHSAG075883.1",
              y: 0,
              symbol: "QRNONHSAG075883.1"
            },
            {
              x: "QRNONHSAG060103.1",
              y:1,
              symbol: "QRNONHSAG060103.1"
            }
          ]
        }
      ]
    };

    var gauge= [
        { data: ["Path2", "Path1"], title: "cellType" },
        { data: ["2", "3"], title: "time" },
        { data: ["h","l","m",null], title: "gene_coding_type" },
        { data: ["h2","l2","m2",null], title: "gene_coding" },
        {
          data: [
            "GO:0060089//molecular transducer activity",
            "GO:0030594//neurotransmitter receptor activity",
            "GO:0098552//side of membrane",
            "GO:0038023//signaling receptor activity",
            "GO:0031226//intrinsic component of plasma membrane",
            "GO:0004871//signal transducer activity",
            "GO:0043167//ion binding",
            "GO:0045202//synapse",
            "GO:0098794//postsynapse",
            "GO:1990351//transporter complex",
            "GO:0043169//cation binding",
            "GO:0005488//binding",
            "GO:0060089//molecular transducer",
            "GO:0038023//signaling receptor",
            "GO:0031226//intrinsic component of plasma",
            "GO:0004871//signal transducer",
            "GO:0045202"
          ],
          title: "GO Term"
        }
      ];

    var legendData = [data.min,data.max];

    this.config.chart.data = data;
    this.config.legend.data = legendData;
    this.config.legend.oLegend.data=gauge;

    this.chart = this.d4.init(this.config);
  },
  methods: {
    redraw() {
      this.chart.redraw();
    },
    deepRedraw() {
      this.chart.redraw(true);
    },
    colorChange(event) {
      this.chart.setColor(event.target.value, this.i);
      this.chart.redraw();
    },
    ocolorChange(event){
      this.chart.setColor(event.target.value, this.oi,'otherColors');
      this.chart.redraw();
    }
  }
};
</script>

