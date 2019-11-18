const Index = r => require.ensure([], () => r(require('../view/index.vue')), 'Index')
const Docs = r => require.ensure([], () => r(require('../view/docs.vue')), 'Docs')
const Chart = r => require.ensure([], () => r(require('../view/chart.vue')), 'Chart')
    // const Compose = r => require.ensure([], () => r(require('../view/compose.vue')), 'Compose')
const Area = r => require.ensure([], () => r(require('../view/area.vue')), 'Area')
const Scatter = r => require.ensure([], () => r(require('../view/scatter.vue')), 'Scatter')
const Rose = r => require.ensure([], () => r(require('../view/rose.vue')), 'Rose')
const Ring = r => require.ensure([], () => r(require('../view/ring.vue')), 'Ring')
const Pie = r => require.ensure([], () => r(require('../view/pie.vue')), 'Pie')
const Bar = r => require.ensure([], () => r(require('../view/bar.vue')), 'Bar')
const HorizontalBar = r => require.ensure([], () => r(require('../view/horizontalBar.vue')), 'HorizontalBar')
const GroupBar = r => require.ensure([], () => r(require('../view/groupBar.vue')), 'GroupBar')
const StackBarPercent = r => require.ensure([], () => r(require('../view/stackBarPercent.vue')), 'StackBarPercent')
const StackBar = r => require.ensure([], () => r(require('../view/stackBar.vue')), 'StackBar')
const BasicLine = r => require.ensure([], () => r(require('../view/line.vue')), 'BasicLine')
const CategoryLine = r => require.ensure([], () => r(require('../view/categoryLine.vue')), 'categoryLine')
const Boxplot = r => require.ensure([], () => r(require('../view/boxplot.vue')), 'boxplot')
const Cluster = r => require.ensure([], () => r(require("../view/cluster.vue")), 'cluster')
const ComplexCluster = r => require.ensure([],()=>r(require("../view/complexCluster.vue")),'complexCluster')
const Relevance = r => require.ensure([], () => r(require("../view/relevance.vue")), 'relevance')
const Bubble = r => require.ensure([], () => r(require('../view/bubble.vue')), 'bubble')
const Group = r => require.ensure([], () => r(require('../view/group.vue')), 'group')
const Circos = r => require.ensure([], () => r(require('../view/circos.vue')), 'circos')
const RisingSun = r => require.ensure([], () => r(require('../view/risingSun.vue')), 'risingSun')
const CircleTree = r => require.ensure([], () => r(require('../view/circleTree.vue')), 'circleTree')
const Manhattan = r => require.ensure([], () => r(require('../view/manhattan.vue')), 'manhattan')

const baseUrl = '/chart'

const routes = [{
        path: `${baseUrl}/`,
        component: Chart,
        children: [
            // { name: "compose", path: `compose-chart`, component: Compose },
            { name: "area", path: `area-chart`, component: Area },
            { name: "pie", path: `pie-chart`, component: Pie },
            { name: "ring", path: `ring-chart`, component: Ring },
            { name: "rose", path: `rose-chart`, component: Rose },
            { name: "scatter", path: `scatter-chart`, component: Scatter },
            { name: "stackBarPercent", path: `stack-bar-percent`, component: StackBarPercent },
            { name: "stackBar", path: `stack-bar`, component: StackBar },
            { name: "groupBar", path: `group-bar`, component: GroupBar },
            { name: "horizontalBar", path: `horizontal-bar`, component: HorizontalBar },
            { name: "bar", path: `bar`, component: Bar },
            { name: "basicLine", path: `basic-line`, component: BasicLine },
            { name: "categoryLine", path: `category-line`, component: CategoryLine },
            { name: "boxplot", path: `boxplot`, component: Boxplot },
            { name: "cluster", path: `cluster`, component: Cluster },
            { name: "relevance", path: `relevance`, component: Relevance },
            { name:'complexCluster',path:`complexCluster`,component:ComplexCluster},
            { name:'circos',path:'circos',component:Circos },
            { name:'risingSun',path:'risingSun',component:RisingSun },
            { name:'circleTree',path:'circleTree',component:CircleTree },
            { name: "bubble", path: `bubble`, component: Bubble },
            { name: "group", path: `group`, component: Group },
            { name: "manhattan", path: `manhattan`, component: Manhattan },
            { path: '/', redirect: `basic-line` },
            { path: '*', redirect: `basic-line` }
        ]
    },
    {
        name: "index",
        path: "/index",
        component: Index
	},
	{
		name:"docs",
		path:"/docs",
		component:Docs
	},
    {
        path: "/",
        redirect: "/index"
    },
    {
        path: "*",
        redirect: '/index'
    }
]


export default routes;
