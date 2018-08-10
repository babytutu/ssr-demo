<template>
  <div class="demo">
    <div class="demo-logo vue">
      <ver-icon label="vue" ver="v2.5.17"></ver-icon>
    </div>
    <div class="demo-logo webpack">
      <ver-icon label="webpack" ver="v4.16.5"></ver-icon>
    </div>
    <div class="demo-logo vue">
      <router-link to="/counter">a vuex demo</router-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    verIcon: () => import('./../../components/ver-icon.vue')
  },
  title() {
    return 'home'
  },
}
</script>


<style lang="stylus" scoped>
.vue
  background-image url('~src/assets/images/vue.png')
.webpack
  background-image url('~src/assets/images/webpack.svg')
</style>
