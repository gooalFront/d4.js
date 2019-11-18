<template>
<div id="bubble-chart">
	<h3>气泡图</h3>
	<el-button size="small" @click="redraw">Redraw</el-button>
	<el-button size="small" @click="deepRedraw">deepRedraw</el-button>
	<el-button size="small" @click="single">单选</el-button>
	<el-button size="small" @click="multiple">多选</el-button>
	<input type="color" ref="inputColor" @change="colorChange">
	<div class="chart-content" id="chart-bubble"></div>
	<codemirror ref='code' v-model="code" :options="options"></codemirror>
</div>
</template>

<script>
export default {
  name: "bubbleChart",
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
          title: "气泡图",
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
              .text("custom");
          },
          mouseout: function(event, titleObj) {
            titleObj.attr("fill", "#333");
            titleObj.select("title").remove();
          },
          el: "#chart-bubble",
          type: "bubble",
          //   enableChartSelect:true,
          //   selectedModule: "",
          onselect: data => {
            console.log(data);
          },
          data: [],
          colors: ["#4575B4", "#FEF6B2", "#D9352A"],
          radius: {
            min: 5,
            max: 10
          }
        },
        axis: {
          x: {
            title: "样本",
            rotate: 20,
            min: 0,
            // max:1,
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setXTitle(name);
                this.updateTitle();
              }
            }
          },
          y: {
            title: "log10(FPKM+1)",
            // min:0,
            // max:10,
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setYTitle(name);
                this.updateTitle();
              }
            }
            // formatter: val => "$" + val
          }
        },
        legend: {
          show: true,
          data: [],
          type: "gradient",
          title: "num",
          position: "right",
          // min: -1,
          // max: 1,
          dblclick: (d, i) => {
            this.d = d;
            this.i = i;
            this.$refs.inputColor.click();
          },
          rLegend: {
            show: true,
            title: "radius"
          }
        },
        tooltip: function(d) {
          return "<span>x：d.x</span><br><span>y： d.y
          </span><br><span>r：d.r</span><br><span>color：d.color</span>";
        }
      }
	`,
      chart: null,
      config: {
        chart: {
          title: "气泡图",
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
              .text("custom");
          },
          mouseout: function(event, titleObj) {
            titleObj.attr("fill", "#333");
            titleObj.select("title").remove();
          },
          el: "#chart-bubble",
          type: "bubble",
          //   enableChartSelect:true,
          //   selectedModule: "",
          onselect: data => {
            console.log(data);
          },
          data: [],
          colors: ["#4575B4", "#FEF6B2", "#D9352A"],
          radius: {
            min: 5,
            max: 10
          }
        },
        axis: {
          x: {
            title: "样本",
            rotate: 20,
            min: 0,
            // max:1,
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setXTitle(name);
                this.updateTitle();
              }
            }
          },
          y: {
            title: "log10(FPKM+1)",
            // min:0,
            // max:10,
            dblclick: function(event) {
              var name = prompt("请输入需要修改的标题", "");
              if (name) {
                this.setYTitle(name);
                this.updateTitle();
              }
            }
            // formatter: val => "$" + val
          }
        },
        legend: {
          show: true,
          data: [],
          type: "gradient",
          title: "num",
          position: "right",
          // min: -1,
          // max: 1,
          dblclick: (d, i) => {
            this.d = d;
            this.i = i;
            this.$refs.inputColor.click();
          },
          rLegend: {
            show: true,
            title: "Gene Number"
          }
        },
        tooltip: function(d) {
          return `<span>x：${d.x}</span><br><span>y：${
            d.y
          }</span><br><span>r：${d.r}</span><br><span>color：${d.color}</span>`;
        }
      }
    };
  },
  mounted() {
    var data = {
      "baseThead": [
        {
          "true_key": "go_c_term_id",
          "name": "go_c_term_id",
          "searchType": "string",
          "hover": "go_c_term_id",
          "children": []
        },
        {
          "true_key": "go_c_term_desc",
          "name": "go_c_term_desc",
          "searchType": "string",
          "hover": "go_c_term_desc",
          "children": []
        },
        {
          "true_key": "go_c_term_level_1",
          "name": "go_c_term_level_1",
          "searchType": "string",
          "hover": "go_c_term_level_1",
          "children": []
        },
        {
          "true_key": "go_c_term_level_2",
          "name": "go_c_term_level_2",
          "searchType": "string",
          "hover": "go_c_term_level_2",
          "children": []
        },
        {
          "true_key": "go_c_term_candidate_gene_num",
          "name": "go_c_term_candidate_gene_num",
          "searchType": "double",
          "hover": "go_c_term_candidate_gene_num",
          "children": []
        },
        {
          "true_key": "go_c_total_candidate_gene_num",
          "name": "go_c_total_candidate_gene_num",
          "searchType": "double",
          "hover": "go_c_total_candidate_gene_num",
          "children": []
        },
        {
          "true_key": "go_c_term_gene_num",
          "name": "go_c_term_gene_num",
          "searchType": "double",
          "hover": "go_c_term_gene_num",
          "children": []
        },
        {
          "true_key": "go_c_total_gene_num",
          "name": "go_c_total_gene_num",
          "searchType": "double",
          "hover": "go_c_total_gene_num",
          "children": []
        },
        {
          "true_key": "go_c_rich_ratio",
          "name": "go_c_rich_ratio",
          "searchType": "double",
          "hover": "go_c_rich_ratio",
          "children": []
        },
        {
          "true_key": "go_c_pvalue",
          "name": "go_c_pvalue",
          "searchType": "double",
          "hover": "go_c_pvalue",
          "children": []
        },
        {
          "true_key": "go_c_qvalue",
          "name": "go_c_qvalue",
          "searchType": "double",
          "hover": "go_c_qvalue",
          "children": []
        }
      ],
      "rows": [
        {
          "go_c_term_id": "GO:0005840",
          "go_c_term_candidate_gene_num": 84,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 197,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.42639593908629403,
          "go_c_pvalue": 8.244220999999998e-41,
          "go_c_qvalue": 7.263159e-38,
          "go_c_term_desc": "ribosome",
          "go_c_term_level_2": "organelle+++cell part+++protein-containing complex+++cell",
          "go_c_term_level_1": "cellular_component"
        },
        {
          "go_c_term_id": "GO:0005829",
          "go_c_term_candidate_gene_num": 572,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 4913,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.116425809077956,
          "go_c_pvalue": 9.063899e-28,
          "go_c_qvalue": 7.985295e-25,
          "go_c_term_desc": "cytosol",
          "go_c_term_level_2": "cell part+++cell",
          "go_c_term_level_1": "cellular_component"
        },
        {
          "go_c_term_id": "GO:0022625",
          "go_c_term_candidate_gene_num": 39,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 64,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.609375,
          "go_c_pvalue": 4.272234e-27,
          "go_c_qvalue": 3.7638379999999995e-24
        },
        {
          "go_c_term_id": "GO:0070062",
          "go_c_term_candidate_gene_num": 286,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 2060,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.138834951456311,
          "go_c_pvalue": 6.819105000000001e-23,
          "go_c_qvalue": 6.007632e-20,
          "go_c_term_desc": "extracellular exosome",
          "go_c_term_level_2": "organelle+++extracellular region part+++extracellular region",
          "go_c_term_level_1": "cellular_component"
        },
        {
          "go_c_term_id": "GO:0005654",
          "go_c_term_candidate_gene_num": 389,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 3111,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.125040180006429,
          "go_c_pvalue": 7.708639999999999e-23,
          "go_c_qvalue": 6.791312e-20,
          "go_c_term_desc": "nucleoplasm",
          "go_c_term_level_2": "membrane-enclosed lumen+++organelle+++cell part+++cell+++organelle part",
          "go_c_term_level_1": "cellular_component"
        },
        {
          "go_c_term_id": "GO:0022627",
          "go_c_term_candidate_gene_num": 28,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 47,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.5957446808510639,
          "go_c_pvalue": 1.921224e-19,
          "go_c_qvalue": 1.692598e-16
        },
        {
          "go_c_term_id": "GO:0005925",
          "go_c_term_candidate_gene_num": 86,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 407,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.21130221130221102,
          "go_c_pvalue": 2.265614e-17,
          "go_c_qvalue": 1.996006e-14,
          "go_c_term_desc": "focal adhesion",
          "go_c_term_level_2": "cell junction",
          "go_c_term_level_1": "cellular_component"
        },
        {
          "go_c_term_id": "GO:1990904",
          "go_c_term_candidate_gene_num": 47,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 159,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.29559748427673,
          "go_c_pvalue": 8.450350999999999e-16,
          "go_c_qvalue": 7.444759e-13,
          "go_c_term_desc": "ribonucleoprotein complex",
          "go_c_term_level_2": "protein-containing complex",
          "go_c_term_level_1": "cellular_component"
        },
        {
          "go_c_term_id": "GO:0042788",
          "go_c_term_candidate_gene_num": 20,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 32,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.625,
          "go_c_pvalue": 7.776443000000001e-15,
          "go_c_qvalue": 6.8510460000000005e-12
        },
        {
          "go_c_term_id": "GO:0005730",
          "go_c_term_candidate_gene_num": 134,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 859,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.155995343422584,
          "go_c_pvalue": 1.3209790000000001e-14,
          "go_c_qvalue": 1.163782e-11,
          "go_c_term_desc": "nucleolus",
          "go_c_term_level_2": "membrane-enclosed lumen+++organelle+++cell part+++cell+++organelle part",
          "go_c_term_level_1": "cellular_component"
        },
        {
          "go_c_term_id": "GO:0005634",
          "go_c_term_candidate_gene_num": 639,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 6396,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.09990619136960599,
          "go_c_pvalue": 5.08995e-14,
          "go_c_qvalue": 4.4842459999999996e-11,
          "go_c_term_desc": "nucleus",
          "go_c_term_level_2": "organelle+++cell part+++cell",
          "go_c_term_level_1": "cellular_component"
        },
        {
          "go_c_term_id": "GO:0005737",
          "go_c_term_candidate_gene_num": 643,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 6451,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.0996744690745621,
          "go_c_pvalue": 6.464417e-14,
          "go_c_qvalue": 5.695151e-11,
          "go_c_term_desc": "cytoplasm",
          "go_c_term_level_2": "cell part+++cell",
          "go_c_term_level_1": "cellular_component"
        },
        {
          "go_c_term_id": "GO:0016607",
          "go_c_term_candidate_gene_num": 68,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 388,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.175257731958763,
          "go_c_pvalue": 4.027088e-10,
          "go_c_qvalue": 3.547865e-7,
          "go_c_term_desc": "nuclear speck",
          "go_c_term_level_2": "membrane-enclosed lumen+++organelle+++cell part+++cell+++organelle part",
          "go_c_term_level_1": "cellular_component"
        },
        {
          "go_c_term_id": "GO:0015935",
          "go_c_term_candidate_gene_num": 14,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 26,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.538461538461538,
          "go_c_pvalue": 1.441271e-9,
          "go_c_qvalue": 1.26976e-6
        },
        {
          "go_c_term_id": "GO:0030667",
          "go_c_term_candidate_gene_num": 28,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 100,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.28,
          "go_c_pvalue": 2.2030800000000002e-9,
          "go_c_qvalue": 1.940913e-6,
          "go_c_term_desc": "secretory granule membrane",
          "go_c_term_level_2": "organelle+++membrane+++cell part+++cell+++organelle part",
          "go_c_term_level_1": "cellular_component"
        },
        {
          "go_c_term_id": "GO:0032991",
          "go_c_term_candidate_gene_num": 96,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 657,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.14611872146118698,
          "go_c_pvalue": 3.1712090000000004e-9,
          "go_c_qvalue": 2.793835e-6,
          "go_c_term_desc": "protein-containing complex",
          "go_c_term_level_2": "protein-containing complex",
          "go_c_term_level_1": "cellular_component"
        },
        {
          "go_c_term_id": "GO:0005739",
          "go_c_term_candidate_gene_num": 182,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 1508,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.12068965517241399,
          "go_c_pvalue": 3.31806e-9,
          "go_c_qvalue": 2.923211e-6,
          "go_c_term_desc": "mitochondrion",
          "go_c_term_level_2": "organelle+++cell part+++cell",
          "go_c_term_level_1": "cellular_component"
        },
        {
          "go_c_term_id": "GO:0005681",
          "go_c_term_candidate_gene_num": 36,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 156,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.23076923076923103,
          "go_c_pvalue": 4.03641e-9,
          "go_c_qvalue": 3.556077e-6,
          "go_c_term_desc": "spliceosomal complex",
          "go_c_term_level_2": "organelle+++cell part+++protein-containing complex+++cell+++organelle part",
          "go_c_term_level_1": "cellular_component"
        },
        {
          "go_c_term_id": "GO:0005743",
          "go_c_term_candidate_gene_num": 68,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 425,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.16,
          "go_c_pvalue": 1.9239279999999998e-8,
          "go_c_qvalue": 1.694981e-5,
          "go_c_term_desc": "mitochondrial inner membrane",
          "go_c_term_level_2": "organelle+++membrane+++cell part+++cell+++organelle part",
          "go_c_term_level_1": "cellular_component"
        },
        {
          "go_c_term_id": "GO:1904813",
          "go_c_term_candidate_gene_num": 29,
          "go_c_total_candidate_gene_num": 1422,
          "go_c_term_gene_num": 124,
          "go_c_total_gene_num": 17913,
          "go_c_rich_ratio": 0.233870967741935,
          "go_c_pvalue": 9.403492e-8,
          "go_c_qvalue": 8.284476000000001e-5,
          "go_c_term_desc": "ficolin-1-rich granule lumen",
          "go_c_term_level_2": "membrane-enclosed lumen+++organelle+++cell part+++cell+++organelle part",
          "go_c_term_level_1": "cellular_component"
        }
      ]
  }

    var realData = [];
    var legendData = [];
    data.rows.forEach(function(d, i) {
        let geneid=d["go_c_term"] ? d["go_c_term"] : d["go_c_term_id"];
        realData.push({
            x: d["go_c_rich_ratio"],
            y: d["go_c_term_desc"],
            r: d["go_c_term_candidate_gene_num"],
            color: d["go_c_qvalue"],
            geneid:geneid
        });
        legendData.push(d["go_c_qvalue"]);
    });
    this.config.chart.data = realData;
    this.config.legend.data = legendData;

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
    single() {
      this.selectedModule = "single";
      this.chart.setChartSelectModule(this.selectedModule);
    },
    multiple() {
      this.selectedModule = "multiple";
      this.chart.setChartSelectModule(this.selectedModule);
    }
  }
};
</script>


