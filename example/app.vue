<template>
    <div id="app">
		<router-view></router-view>
    </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "app",
  mounted() {
    Vue.prototype.d4 = new d4({ enableChartSelect: true });
  }
};
</script>

<style>
</style>
