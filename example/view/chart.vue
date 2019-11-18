<template>
    <div id="chart">
		<top></top>
		<div class="wrap">
			<left></left>
			<right></right>
		</div>
    </div>
</template>

<script>
import left from "../left.vue";
import top from "../top.vue";
import right from "../right.vue";


export default {
  name: "chart",
  data() {
    return {};
  },

  components: { left, top, right }
};
</script>

<style>
</style>
