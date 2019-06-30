<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand href="#">ROM Archives</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-bind:to="'/'">Home</b-nav-item>
          <b-nav-item v-bind:to="'/headgear'">Headgear List</b-nav-item>
          <b-nav-item v-bind:to="'/crafting'">HG Crafting</b-nav-item>
        </b-navbar-nav>  
      </b-collapse>
    </b-navbar>
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
  margin-top: 70px;
}

nav {
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12);
  /* background-color: dodgerblue; */
}
header a {
  color:white;
}
p {
  margin-bottom: 0.5rem;
}
</style>
