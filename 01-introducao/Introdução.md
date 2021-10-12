# 🤯 Primeira APP em VueJS

## Conceitos
* Qual o melhor Framework?
  * "A melhor ferramenta é aquela que você conhece"

* Framwork Progressivo
* Evan You

* React Vs Vue
  * React -> JSX -> Javascript + XML
  * Vue -> SFC -> Single File Component

* Vantagens:
  * Documentação detalhada
  * Flexibilidade e adaptabilidade
  * multiplataforma
  * da comunidade para a comunidade


## Forma rapida de usar o vuejs (tag script)

* CDN:
  ```html
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  ```


## Instancia do Vue com o construtor
* new Vue({})

  ```html
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

  <div id="app">
    <p>{{ titulo }}</p>
  </div>

  <script>
    new Vue({
        el: '#app',
        data: {
            titulo: 'Hello World!'
        }
    })
  </script>

  ```


* composta de atributos para a configuração do meu projeto vue

* Não preciso criar uma `const v = new Vue({})`
  ```html
  <p>{{v.titulo}}</p> ❌
  ```
  ```html
  <p>{{titulo}}</p> ✔️
  ```
  * Minha template têm acesso direto



## Atributos da instancia
* `el` representa qual trecho do html vou controlar 
* `data` -> obj com dados que quero usar no meu template(HTML) que é controlado pelo vue

* Interpolação -> {{}}
  * fazer data binding (associação de dados)


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
  * Não precisou usar `{{Vue.data.titulo}}`
  * Naturalmente isso não funcionaria em Javascript, mas por baixo dos panos, o Vue cria atalhos pra voce acessar os dados diretamente dentro da instancia do vue.
  * o `this` referencia o Vue, ou seja, consigo acesso direto as propriedades.

  ```js
  this.titulo
  ```
  * não tem o atributo titulo direto no objeto

  ---

  
  ### Diretivas
  * Propriedades personalizadas do html
  * O HTML permite que eu crie propriedades personalizas, o Vue usou isso para criar as suas proprias e chamou isso de **diretivas**

  Para usar os atributos do Vue nas propriedades, não posso fazer assim `<a v-href="{{link}}">Google</a>` , as chaves só funcionam pois dentro das tags do HTML eu tenho conteúdo de texto e elas fazem então a interpolação, agora para as propriedades, tem que utilizar as diretivas do Vue, ex: `<a v-bind:href="link">Google</a>`



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

  * Não precisou passar o evento (`input="alterarTitulo(evento)"`), pois ele é passado sempre que você associa o metodo que voce criou para o evento de um determinado componente HTML




  