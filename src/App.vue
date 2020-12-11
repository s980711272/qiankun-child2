<template>
  <div id="child">
    子应用2
    <button @click="getSession">获取缓存</button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{

    }
  },
  methods:{
    getSession(){

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
