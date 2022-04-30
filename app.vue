<script setup>
import Card from './card.vue'
useHead({
  title: 'Wordle',
  link: {rel:'icon', href:'https://letterboxd.com/favicon.ico'},
})
</script>

<template>
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600;700&display=swap" rel="stylesheet"> 
</head>

<body class="m-0 h-full font-graph flex flex-col items-center">

  <header class="header">
    <div class="header-items">
      <div class="flex flex-1 h-fit"><img src="./assets/info.svg" class="icon"></div>
      <h1 class="font-semibold text-3xl" >Wordle</h1>
      <div class="flex flex-1 h-fit justify-end"><img src="./assets/info.svg" class="icon"></div>
    </div>
  </header>

  <div class="game w-full h-full flex flex-col items-center justify-center">
    <div class="card-list grid grid-cols-3 w-full overflow-hidden">
      <Card v-for="(film,i) in films" :film="film" :i="i" :key="i" @flip="grayFilm"></Card>
    </div>
    <div class="button my-6 " :class="{ 'bg-emerald-500':last!=10,'bg-slate-500':last==10 }"  @click="confirm">CONFIRM</div>
  </div>
  
</body>
</template>

<script>
import csv from './assets/filmList.csv'

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
    }
  },

  beforeMount(){
    this.getMovies()
  }
}
</script>