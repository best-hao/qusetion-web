<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body,#app{
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	overflow: hidden;
}
[v-cloak]{
  display:none
}
.page-nav{
	display: flex;
	flex-direction: row-reverse;
	padding: 10px 20px;
}
</style>
