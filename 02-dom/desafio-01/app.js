new Vue({
  el: "#desafio",
  data: {
    nome: "Romim",
    idade: 21,
    image: 'http://files.cod3r.com.br/curso-vue/vue.jpg'
  },
  methods: {
    random() {
      return Math.random()
    }
  }
})