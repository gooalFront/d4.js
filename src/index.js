/**
 * @time 2018年7月25日16:02:14
 * @author joke <277637411@qq.com>
 * @description 图基类
 */

/**
 * root config
 *  enableColorModify: false,
    enableTitleModify: false,
    enableXTitleModify: false,
    enableYTitleModify: false,
    enableChartSelect: false
 */
import * as d3 from 'd3';
import Line from './chart/line';
import CategoryLine from './chart/categoryLine';
import Bar from './chart/bar';
import GroupBar from './chart/groupBar';
import StackBar from './chart/stackBar';
import Pie from './chart/pie';
import Area from './chart/area';
import Boxplot from './chart/boxplot';
import Cluster from './chart/cluster';
import ComplexCluster from './chart/complexCluster';
import Relevance from './chart/relevance';
import Scatter from './chart/scatter';
import Bubble from "./chart/bubble";
import Group from "./chart/group";
import Circos from "./chart/circos";
import RisingSun from './chart/risingSun';
import CircleTree from './chart/circleTree';
import Manhattan from "./chart/manhattan";


class d4 {
    constructor(options) {
            this.rootConfig = {};
            this.globalChartType = {
                "line": {},
                "bar": {},
                "groupBar": {},
                "stackBar": {},
                "boxplot": {},
                "cluster": {},
                "complexCluster":{},
                "relevance":{},
                "scatter": {},
                "bubble": {},
                "group":{},
                "circos":{},
                "risingSun":{},
                "circleTree":{},
                "manhattan": {}
            }
            if (options) {
                this.rootConfig.enableColorModify = !!options.enableColorModify;
                this.rootConfig.enableTitleModify = !!options.enableTitleModify;
                this.rootConfig.enableXTitleModify = !!options.enableXTitleModify;
                this.rootConfig.enableYTitleModify = !!options.enableYTitleModify;
                this.rootConfig.enableChartSelect = !!options.enableChartSelect;
            } else {
                this.rootConfig.enableColorModify = false;
                this.rootConfig.enableTitleModify = false;
                this.rootConfig.enableXTitleModify = false;
                this.rootConfig.enableYTitleModify = false;
                this.rootConfig.enableChartSelect = false;
            }
        }
        // 初始化参数
    init(options,styleConfig) {
        if (!options.chart || !options.chart.el) throw new Error('Must has el param of chart options');
        if (!options.chart.type) throw new Error('Must hava type param of chart options');
        if (!options.chart.data) throw new Error('Must hava data param of chart options');

        if (!options.axis) options.axis = {};
        if (!options.legend) options.legend = {
            show: false,
            position: "right"
        };

        if (!options.tooltip || typeof options.tooltip != 'function') options.tooltip || null;


        // 根据chartType实例化不同的图
        // 根据类型删除配置  不需要坐标轴的图默认删除axis配置
        switch (options.chart.type) {
            case 'line':
                return new Line(options, this.rootConfig,styleConfig);
            case 'categoryLine':
                return new CategoryLine(options, this.rootConfig,styleConfig);
            case 'bar':
                return new Bar(options, this.rootConfig,styleConfig);
            case 'groupBar':
                return new GroupBar(options, this.rootConfig,styleConfig);
            case 'stackBar':
                options.chart.stackBarType = 'common';
                return new StackBar(options, this.rootConfig,styleConfig);
            case 'stackBarPercent':
                options.chart.stackBarType = 'percent';
                return new StackBar(options, this.rootConfig,styleConfig);
            case 'pie':
                options.chart.pieType = 'common';
                return new Pie(options, this.rootConfig,styleConfig);
            case 'pie-rose':
                options.chart.pieType = 'rose';
                return new Pie(options, this.rootConfig,styleConfig);
            case 'scatter':
                return new Scatter(options, this.rootConfig,styleConfig);
            case 'area':
                return new Area(options, this.rootConfig,styleConfig);
            case 'boxplot':
                return new Boxplot(options, this.rootConfig,styleConfig);
            case 'cluster':
                return new Cluster(options, this.rootConfig,styleConfig);
            case 'complexCluster':
                return new ComplexCluster(options, this.rootConfig,styleConfig);
            case 'relevance':
                return new Relevance(options, this.rootConfig,styleConfig);
            case 'bubble':
                return new Bubble(options, this.rootConfig,styleConfig);
            case 'group':
                return new Group(options, this.rootConfig,styleConfig);
            case 'circos':
                return new Circos(options, this.rootConfig,styleConfig);
            case 'risingSun':
                return new RisingSun(options, this.rootConfig,styleConfig);
            case 'circleTree':
                return new CircleTree(options, this.rootConfig,styleConfig);
            case 'manhattan':
                return new Manhattan(options, this.rootConfig,styleConfig);
        }

    }

}

window.d4 = d4;
window.d3 = d3;

export default d4;
