<template>
    <div id="left-layout">
        <ul>
            <li ref="one" v-for="(item,index) in list"  :key="index">
              <div class="title">
                <i :class="item.class"></i><span>{{item.label}}</span><i class="arrow fa fa-angle-right" :class="{'fa-angle-down':curActiveName === item.name}"></i>
              </div>
              <router-link tag="div" class="sec" v-for="(child,key) in item.children" :key="key" :to="{path:'/chart/'+child.name}">
                <span>{{child.label}}</span>
              </router-link>
            </li>

        </ul>
    </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "left",
  data() {
    return {
      curActiveName: "basic-line",
      list: [
        {
          name: "line-chart",
          label: "折线图",
          class: "iconfont icon-line",
          children: [
            {
              name: "basic-line",
              label: "基础折线图"
            },
            {
              name: "category-line",
              label: "分类折线图"
            }
          ]
        },
        {
          name: "bar-chart",
          label: "柱状图",
          class: "iconfont icon-bar",
          children: [
            {
              name: "bar",
              label: "基础柱状图"
            },
            {
              name: "horizontal-bar",
              label: "水平柱状图"
            },
            {
              name: "group-bar",
              label: "分组柱状图"
            },
            {
              name: "stack-bar",
              label: "堆叠柱状图"
            },
            {
              name: "stack-bar-percent",
              label: "百分比堆叠柱状图"
            }
          ]
        },
        {
          name: "pie-chart",
          class: "iconfont icon-pie",
          label: "饼图",
          children: [
            {
              name: "pie-chart",
              label: "饼图"
            },
            {
              name: "ring-chart",
              label: "环形图"
            },
            {
              name: "rose-chart",
              label: "玫瑰图"
            }
          ]
        },
        {
          name: "scatter-chart",
          class: "iconfont icon-point",
          label: "散点图",
          children: [
            {
              name: "scatter-chart",
              label: "散点图"
            }
          ]
        },
        {
          name: "area-chart",
          class: "iconfont icon-area",
          label: "面积图",
          children: [
            {
              name: "area-chart",
              label: "面积图"
            }
          ]
        },
        {
          name: "boxplot-chart",
          class: "iconfont icon-box",
          label: "箱线图",
          children: [
            {
              name: "boxplot",
              label: "箱线图"
            }
          ]
        },
        {
          name: "cluster-chart",
          class: "iconfont icon-heatmap",
          label: "热图",
          children: [
            {
              name: "cluster",
              label: "普通聚类热图"
            },
            {
              name: "complexCluster",
              label: "复杂聚类热图"
            },
            {
              name: "relevance",
              label: "相关性图"
            }
          ]
        },
        {
          name: "bubble-chart",
          class: "iconfont icon-bubble",
          label: "气泡图",
          children: [
            {
              name: "bubble",
              label: "气泡图"
            }
          ]
    },
    {
          name: "group-chart",
          class: "iconfont icon-bubble",
          label: "组合图",
          children: [
            {
              name: "group",
              label: "基础图组合"
            }
          ]
    },
    {
          name: "circos-chart",
          class: "iconfont icon-bubble",
          label: "环形图",
          children: [
            {
              name: "circos",
              label: "circos图"
            },
            {
              name: "risingSun",
              label: "旭日图"
            },
            {
              name:'circleTree',
              label:"环树图"
            }
          ]
    },
		{
          name: "other-chart",
          class: "iconfont icon-bubble",
          label: "其他",
          children: [
            {
              name: "manhattan",
              label: "曼哈顿图"
            }
          ]
		},
		// {
        //   name: "compose-chart",
        //   class: "iconfont icon-legend",
        //   label: "组合图",
        //   children: [
        //     {
        //       name: "compose-chart",
        //       label: "组合图"
        //     }
        //   ]
        // }
      ]
    };
  },
  mounted() {
    $("#left-layout .title")
      .on("mouseover", function() {
        $("#left-layout .title").removeClass("active");
        $(this).addClass("active");
      })
      .on("mouseout", function() {
        $(this).removeClass("active");
      })
      .on("click", function() {
		if($(this).hasClass('show')){
			$(this).removeClass('show').parent().find('.sec').slideUp();
			$(this).find('.arrow').attr('class','arrow fa fa-angle-right');
		}else{
			$(this).addClass('show').parent().find('.sec').slideDown();
			$(this).find(".arrow").attr('class','arrow fa fa-angle-down');
		}
      });
  }
};
</script>
