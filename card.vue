<template>
  <div class="card">
    <div class="inner" :class="{ 'flip':!film.hidden }">
      <div class="back" @click="flip()"></div>
      <img class="front" :class="{ 'grayscale':film.hidden }" @click="open()" :src="film.src">    
    </div>
  </div>
</template>

<script>
import './assets/css/card.css'

export default {
  props: {
    film: Object,
    last: Number
  },

  methods: {
    flip() {
      console.log(this.$parent.last)
      // if (this.$parent.last) {
      //    this.$parent.films[this.$parent.last]['off'] = true
      // }
      this.film['hidden'] = false
    },

    open() {
      window.open('https://letterboxd.com/film/'+this.film.href, '_blank').focus();
    }
  }
}
</script>
