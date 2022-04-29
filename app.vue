<script setup>
useHead({
  title: 'Letterboxd Roulette',
  link: {rel:'icon', href:'https://letterboxd.com/favicon.ico'},
})
</script>

<script>
import csv from './assets/filmList.csv'
import './assets/css/card.css'

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

  resetFilms() {
    for (let i=0; i<10 ; i++) {
      this.films[i]['hidden'] = true
    }
    setTimeout(() => {this.rollFilms()}, 500);
  },

  rollFilms() {
    this.films = []
    this.prev = false

    const nums = new Set();
    while (nums.size !== 10) {
      nums.add(Math.floor(Math.random() * 1400) + 1);
    }

    for (let item of nums) {
      let selecFilm = csv[item]
      this.films.push({'hidden':true,'off':false,'select':false,href:selecFilm.href,'src':'https://a.ltrbxd.com/resized/'+selecFilm.src})
    }
  },

  selectFilm() {
    this.films[this.prev]['select'] = true
    for (let i=0; i<10 ; i++) {
      if (i == this.prev) { continue }
      this.films[i]['hidden'] = false
      this.films[i]['off'] = true
    }
  }
  
  },
  beforeMount(){
    this.rollFilms()
  },
}
</script>

<template>
<body class="m-0 h-full font-graph">
  <header class="h-16 bg-[#14181c] block px-[15%]">
    <div class="flex items-center float-left">
      <img class="h-16" src="./assets/logo.svg">
      <h1 class="font-bold text-4xl pb-[7px]">Roulette</h1>
    </div>
    <div class="float-right h-full flex gap-5">
    </div>
    
  </header>
  <div class="max-w-5xl mx-auto flex flex-col align-center">
    <div class="mx-auto grid grid-cols-5 gap-7 p-12">
      <div v-for="(film,i) in films"
        class="card hover:scale-105 transition-transform"
        @click="showFilm(i)">
        <div class="inner" :class="{ 'flip':!film.hidden }">
          <div class="back"></div>
          <img class="front" :class="{ 'grayscale':film.off, 'selected':film.select }" :src="film.src">    
        </div>
      </div>
    </div>
    <div class="flex mx-auto gap-6">
      <button class="but bg-lime-600 my-auto" @click="selectFilm()">LOCK</button>
      <button class="but bg-blue-500 my-auto" @click="resetFilms()">RESET</button>
    </div>
  </div>
  
  <div class="modal-container">
    <div class="modal">
      <h2>helppp</h2>
      <p>pogggers</p>
    </div>
  </div>
</body>
</template>