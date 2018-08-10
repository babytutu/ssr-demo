<template>
  <div class="demo">
    <button @click='increment' class="btn btn-info">Increment +1</button>
    <button @click='decrement' class="btn btn-info">Decrement -1</button>
    <h3>Count is {{ count }}</h3>
    <router-link to="/">home</router-link>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  title: 'counter',
  computed: {
    ...mapGetters({
      count: 'getCount'
    })
  },
  methods: {
    ...mapActions([
      'increment',
      'decrement'
    ])
  }
}
</script>
