<template>
  <div id="app">
    子应用2
    <button @click="getSession">获取缓存</button>
  </div>
</template>

<script>

import store from '@/store/index'
export default {
  name: 'App',
  data(){
    return{

    }
  },
  methods:{
    getSession(){
      console.log('name',localStorage.getItem('user'))
      console.log('age',sessionStorage.getItem('age'));
      console.log('sex',sessionStorage.getItem('sex'))
      console.log(this.$store);
      console.log('vuex-name',store.state.name)
      console.log('vuex-count',store.state.count)
      console.log('vuex-age',store.state.age)
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
