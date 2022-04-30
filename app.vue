<script setup>
import Card from './card.vue'
import csv from './assets/filmList.csv'
import './assets/seedrandom.js'
import './assets/css/main.css'
useHead({
  title: 'Wordle',
  link: {rel:'icon', href:'https://letterboxd.com/favicon.ico'},
})
</script>

<template>
<div class="app m-0 h-full flex flex-col items-center">

  <div class="header">
    <div class="header-items">
      <div class="flex flex-1 h-fit">
        <img src="./assets/info.svg" class="icon" @click="open('info-box')">
      </div>
      <h1 class="font-semibold text-3xl" >Wordle</h1>
      <div class="flex flex-1 h-fit justify-end">
        <img src="./assets/settings.svg" class="icon" @click="open('settings-box')">
      </div>
    </div>
  </div>

  <div class="game w-full flex flex-col items-center justify-center">
    <div class="card-list grid grid-cols-3 w-full overflow-hidden">
      <Card v-for="(film,i) in films" :film="film" :i="i" :key="i" @flip="grayFilm"></Card>
    </div>
    <div class="button my-6 " :class="{ 'bg-emerald-500':last!=10,'bg-slate-500':last==10 }"  @click="confirm">CONFIRM</div>
  </div>

  <div ref="info-box" class="overlay">
    <div class="boxx p-5">
      <div class="flex items-center mb-4">
        <h2 class="flex-1 font-semibold">HOW TO PLAY</h2>
        <img src="./assets/x.svg" class="w-6 h-6" @click="close('info-box')">
      </div>
      <p class="font-light text-sm mb-2">Inspired by <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a> and <a href="https://letterboxd.com/tobiasandersen2/list/random-movie-roulette/">this list</a>.</p>
      <p class="font-light text-sm mb-2">Every day there's a new random set of films from the 2000 most popular on Letterboxd.</p>
      <p class="font-light text-sm mb-2">After you select a film, you can choose to select another, but you can't go back. If you want to stop, just click confirm</p>
    </div>
  </div>

  <div ref="settings-box" class="overlay">
    <div class="boxx p-5">
      <div class="flex items-center mb-4">
        <h2 class="flex-1 font-semibold">SETTINGS</h2>
        <img src="./assets/x.svg" class="w-6 h-6" @click="close('settings-box')">
      </div>
      <p class="font-light text-sm mb-2">Settings and new sets of films coming in the future!</p>
      <div class="button my-6 bg-cyan-600" @click="randomFilms">RANDOM</div>
    </div>
  </div>

</div>
</template>

<script>
export default { data() { return {
  films: [],
  last: 10,
    };
  },

  methods: {
    getMovies() {
      const nums = new Set();
      while (nums.size !== 9) {
        nums.add(Math.floor(Math.random() * 1400) + 1);
      }

      for (let item of nums) {
        let selecFilm = csv[item]
        this.films.push({'hidden':true,'gray':false,href:selecFilm.href,'src':'https://a.ltrbxd.com/resized/'+selecFilm.src})
      }
    },

    randomFilms() {
      Math.seedrandom(Date().slice(0,15),{ entropy: true })
      for (let film of this.films) {
        film['hidden'] = true
      }
      setTimeout(() => {
        this.films = []
        this.last = 10
        this.getMovies()
      }, 500);
    },

    grayFilm(i) {
      if (this.last < 10) {
        this.films[this.last]['gray'] = true
      }
      this.last = i
    },

    confirm() {
      if (this.last == 10) { return }
      for (let film of this.films) {
        if (film['hidden']) {
          film['hidden'] = false
          film['gray'] = true
        }
      }
    },

    open(ele) { this.$refs[ele].style.display = 'flex' },
    close(ele) { this.$refs[ele].style.display = 'none' },
  },

  head: {
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600;700&display=swap" rel="stylesheet' },
    ]
  },

  mounted(){
    Math.seedrandom(Date().slice(0,15));
    this.getMovies()
    this.open('info-box')
  }
}
</script>