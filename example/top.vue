<template>
    <div id="top-layout">
		<span @click="toIndex">D4</span>
		<span @click="toDocs">document</span>
	</div>
</template>

<script>

export default {
  name: "top",
  methods:{
	  toIndex(){
		  this.$router.push('/chart')
	  },
	  toDocs(){
		  this.$router.push('/docs')
	  }
  }
};
</script>

<style>
</style>
