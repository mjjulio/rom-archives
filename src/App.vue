<template>
  <div id="app">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
      fixed="top">
      <b-navbar-brand href="#">ROM Archives</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"/>
      <b-collapse
        id="nav-collapse"
        is-nav>
        <b-navbar-nav>
          <b-nav-item :to="'/'">Home</b-nav-item>
          <!-- <b-nav-item v-bind:to="'/headgear'">Headgear List</b-nav-item>
          <b-nav-item v-bind:to="'/crafting'">HG Crafting</b-nav-item> -->
          <b-nav-item-dropdown
            id="headgear-dropdown"
            text="Heagears"
            right>
            <b-dropdown-item :to="'/headgear-list'">List</b-dropdown-item>
            <b-dropdown-item :to="'/headgear-craft'">Crafting</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item :to="'/card-list'">Cards</b-nav-item>
          <b-nav-item :to="'/recipe-list'">Recipe</b-nav-item>
          <b-nav-item :to="'/enchant'">Enchantment</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 70px;
}
html {
  scroll-behavior: smooth;
}
body {
  background: linear-gradient(90deg, azure, transparent, floralwhite);
}
nav {
  font-family: 'Andika', Helvetica, Arial, sans-serif;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2),
    0px 4px 5px 0px rgba(0,0,0,0.14),
    0px 1px 10px 0px rgba(0,0,0,0.12);
  /* background-color: dodgerblue; */
}
header a {
  color:white;
}
p {
  margin-bottom: 0.5rem;
}
.loading {
  overflow: hidden;
  height: 30px;
}
.loading img {
  margin-top: -135px;
}

body:before {
  content: 'xs';
  display: none;
  visibility: hidden;
}
@media (min-width: 576px) {
  body:before {
    content: "sm";
  }
}
@media (min-width: 768px) {
  body:before {
    content: "md";
  }
}
@media (min-width: 992px) {
  body:before {
    content: "lg";
  }
}
@media (min-width: 1200px) {
  body:before {
  content: "xl";
  }
}
</style>
