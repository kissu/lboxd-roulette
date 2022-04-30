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

  <header class="header flex flex-row items-center justify-center">
    <h1 class="font-semibold text-4xl">Wordle</h1>
  </header>

  <div class="game w-full h-full flex flex-col items-center justify-center">
    <div class="card-list grid grid-cols-3 w-full h-fit">
      <Card v-for="film in films" :film="film"></Card>
    </div>
  </div>
  

</body>
</template>

<script>
import csv from './assets/filmList.csv'

export default { data() { return {
  films: [],
  last: 0,
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
        this.films.push({'hidden':true,href:selecFilm.href,'src':'https://a.ltrbxd.com/resized/'+selecFilm.src})
      }
    }
  },

  beforeMount(){
    this.getMovies()
  }
}
</script>