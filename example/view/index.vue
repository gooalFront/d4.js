<template>
	<div id="index">
		<a @click="jump">start</a>
	</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    jump() {
      this.$router.push("/chart/line-chart");
    }
  }
};
</script>

<style>
#index {
  position: fixed;
  top: 40%;
  left: 50%;
  width: 200px;
  margin-left: -100px;
  text-align: center;
}
#index > p {
  font-size: 26px;
  font-weight: bold;
}
#index > a {
  display: block;
  padding: 12px 0;
  width: 80%;
  margin: 40px auto;
  border-radius: 4px;
  border: 1px solid #eee;
  background-color: #4e82e4;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  opacity: .8;
  box-shadow: 0px 0 12px 2px #eee;
}
#index > a:hover {
	opacity:1;
}
</style>
