<script setup>
useHead({
  title: 'Letterboxd Roulette',
  link: {rel:'icon', href:'https://letterboxd.com/favicon.ico'},
})
</script>

<script>
//import './assets/style.css'
import csv from './assets/filmList.csv'

export default { data() { return {
  films: [],
  prev: false
    };
  },

methods: {
  showFilm(i) {
    if (this.films[i].hidden) {
      this.films[i].hidden = false;

      if (this.films[this.prev] != undefined) { this.films[this.prev].off = true; }
      this.prev = i
    } else {
      window.open('https://letterboxd.com/film/'+this.films[i].href, '_blank').focus();
    }
  },

  rollFilms() {
    this.films = []
    this.prev = false
    for (let i=0; i<10 ; i++) {
      let selecFilm = csv[Math.floor(Math.random()*1000)]
      this.films.push({'hidden':true,'off':false,'href':selecFilm.href,'src':'https://a.ltrbxd.com/resized/'+selecFilm.src})
    }
  },
  
  },
  beforeMount(){
    this.rollFilms()
  },
}
</script>

<template>
<body class="font-graph m-0 h-full">
  <header class="h-16 bg-[#14181c] block px-32">
    <div class="flex items-center float-left">
      <img class="h-16" src="./assets/logo.svg">
      <h1 class="font-bold text-4xl pb-[7px]">Roulette</h1>
    </div>
    <div class="float-right font-semig h-full flex">
      <button class="but bg-blue-500 my-auto" @click="rollFilms()">RANDOM</button>
    </div>
    
  </header>
  <div class="app flex-1 max-w-5xl mx-auto p-12" >
    <div class="films mx-auto grid grid-cols-5 gap-6">
        <div v-for="(film,i) in films"
          class="image hover:border-solid overflow-hidden relative"
          :class="{ 'grayscale':film.off, 'brightness-0':film.hidden }"
          @click="showFilm(i)"
        >
          <img class="w-full h-full" :src="film.src">
        </div>
    </div>
  </div>

  <!-- <div class="modal-container">
    <div class="modal">
      <div>
        <h2>Letterboxd Roulette</h2>
        <svg viewbox="0 0 24 24" stroke-width="3" stroke-linecap="round" stroke="#fff">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </div>  
      
      <p>Inspired by <a  class="font-bold" href="https://letterboxd.com/tobiasandersen2/list/random-movie-roulette/">this list</a></p>
    </div>
  </div> -->
</body>
</template>