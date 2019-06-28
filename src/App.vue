<template>
  <div id="app">
    <header class="container-fluid">
      <div class="container">
        <router-link v-bind:to="'/'">Home</router-link>
        <router-link v-bind:to="'/about'">About</router-link>
        <router-link v-bind:to="'/craft-zeny'">CraftZeny</router-link>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header {
  margin: 0 auto;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);
  background-color: dodgerblue;
  height: 50px;
  margin-bottom: 20px;
}
header a {
  color:white;
}
p {
  margin-bottom: 0.5rem;
}
</style>
