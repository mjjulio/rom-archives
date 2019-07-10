<template>
  <div
    id="home"
    class="container">
    <div class="text-center">
      <img
        class="img-responsive"
        src="@/assets/ragnarokmobile.jpg">
      <p>created by dzulai</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
<!-- styling for the component -->
<style scoped>
#home {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.img-responsive {
  max-width: 100%;
  display: block;
  height: auto;
  margin: 0 auto;
}
</style>
