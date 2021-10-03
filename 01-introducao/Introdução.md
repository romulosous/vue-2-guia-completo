# 🤯 Primeira APP em VueJS

## Forma rapida de usar o vuejs

* CDN:
  ```html
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  ```


## Instancia do Vue
* new Vue({})

  ```html
  <script>
  new Vue({
    el: "#app",
    data: {
      titulo: "Usando VueJS 2"
    }
  })
</script>


* composta de atributos para a config do meu projeto vue
* Não preciso criar uma `const v = new Vue({})` 
  * Minha template têm acesso direto



## atributos da instancia
* `el` representa qual trecho do html vou controlar 
* `data` -> obj com dados que quero usar no meu template(HTML) que é controlado pelo vue

* Interpolação -> {{}} 


# 

## Extendendo Nossa Aplicação VueJS

### Methods
  * serão executados no momento em que eventos acontecerem no HTML.

  ```javascript
  methods: {
      alterarTitulo: function(event) {
        this.titulo = event.target.value
      }
    }
  ```

  * Naturalmente isso não funcionaria em Javascript, mas por baixo dos panos, o Vue cria atalhos pra voce acessar os dados diretamente dentro da instancia do vue.

  ```js
  this.titulo
  ```
  * não tem o atributo titulo direto no objeto

  ---

  
  ### Diretivas
  * Propriedades personalizadas do html

  ```html
  <input type="text" v-on:input="alterarTitulo">
  ```

  ```javascript
  methods: {
      alterarTitulo: function(event) {
        this.titulo = event.target.value
      }
    }
  ```

  * Não precisou passar o evento, pois ele é passado sempre que você associa o metodo que voce criou para o evento de um determinado componente HTML




  