<template>
  <div class="card">
    <div class="inner" :class="{ 'flip':!film.hidden }">
      <div class="back" @click="flip()"></div>
      <img class="front" :class="{ 'grayscale':film.gray }" @click="open()" :src="film.src">    
    </div>
  </div>
</template>

<script>
import './assets/css/card.css'

export default {
  props: {
    film: Object,
    i: Number
  },

  methods: {
    flip() {
      this.$emit('flip',this.i)
      this.film['hidden'] = false
    },

    open() {
      window.open('https://letterboxd.com/film/'+this.film.href, '_blank').focus();
    }
  }
}
</script>
