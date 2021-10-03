

----

## 🎓 Aprendizados

- [x] Introdução ao capítulo
- [x] Mexer com template
- [x] Manipular mais de um eventos com nossos dados
- [x] Trabalhar com propriedades reativas
- [x] Two Way data binding
- [x] Aplicar estilos na nossa tag



#
## 2-Entendendo VueJS Templates
* A instancia do vue é o intermediario entre a template(o que voce escreveu) e aquilo que será jogado no browser

~~~html
<div id="app">
  <p>{{titulo}}</p>
</div>
~~~

**Modificando DOM apartir do Vue**

<br>

 ```html
<script>
  new Vue({
    el: "#app",
    data: {
      titulo: "Usando VueJS 2"
    }
  })
</script>
 ```

 * O Vue guarda esse template em memória (04:20)
    * Beneficios


#
## 3-Sintaxe de Template e Instancia VueJS Trabalhando Juntos

* Vue cria acessso diretos quando voce trabalha, por exemplo, dentro do template

* o que é interpolar/interpretar?
  * vai ler o que está dentro do {{}}, vai executar esse codigo,  e substituir isso por alguma coisa, que será um valor textual.

* HTML nada mais é do que um codigo textual interpretado pelo browser
  * então aquilo que vai interpretado dentro do {{}} tem que ser resolvido para uma string
  

#
## 4-Acessando Dados na Instância VueJS

* Na template o acesso é direto, mas dentro da instancia do vue o acesso é com o `this`

```html
<script>
  new Vue({
    el: "#app",
    data: {
      titulo: "Usando VueJS"
    },
    methods: {
      saudacao() {
        console.log(this)
        return this.titulo
      }
    }
  })
</script>
```

* Logo acima, o dado **titulo** vai fazer o proxy
* Apartir de saudacao eu consigo acessar o titulo
* this representa a instancia do Vue
* Nao pode ter uma função e um dado com o mesmo nome


#
## 5-Binding de Atributos

* Para propriedades dentro das tags, usar diretivas

* v-bind <- fazer a ligação entre um dado que está na Instancia do Vue a um dado que está no atributo de uma propriedade da tag

* Com o `v-bind`, é só colocar diretamente o nome, sem a nescessidade do  `{{}}`

* O que são diretivas?
  * É a nomeclatura que o Vue usa, que sao propriedades personalizadas interpretadas pelo Vue.

#
## 7- Evitando Re-Renderização
* v-once

#
## 8- Como Imprimir HTML Puro
* atravez da diretiva v-html
* Só que deve tomar muito cuidado ao aceitar scripts assim diretamente!
  * xss Attack


#
## 11- Escutando Eventos
* v-on <- diretiva que intercepta os eventos...."quando um evento acontecer"
  * significa que voce vai chamar uma funcao

```html
<p v-on:mousemove="atualizarXY">Mouse: {{x}} e {{y}}</p>


<script>
  new Vue({
    el: "#app",
    data: {
      x: 0,
      y: 0
    },
    methods: {
      atualizarXY(event) {
        this.x = event.clientX
        this.y = event.clientY
      }

    }
  })
```

*Mesmo que eu não passe o  `event` lá em cima, ele sempre é passado por padrão*

* não tem haver diretamente com o Vue... é um evento gerado pelo Javascript

* Voce pode ignorar o evento

#
## Passando nossos proprios argumentos com Eventos

* No momento que passamos nossos proprios parametros especifico, automaticamente o event não é passado por padrao

```html
<button v-on:click="somar(5)">somar +1</button>

<script>
  new Vue({
    el: "#app",
    data: {
      contador: 0,
    },
    methods: {
      somar(passo, event) {
        console.log(event) // undefined
        this.contador += passo
      }

    }
  })
</script>
```

* e si eu quisesse passar o event?
  * palavra especial reservada: `$event`
    * o evento que foi gerado vai ser passado como parametro para a função
    
    ##### obs: o `$event` é também gerado pelo javascript 

* você pode escolher a ordem traquilamente:
  ```html
  <button v-on:click="somar(5, $event)">somar +1</button>

  <button v-on:click="somar($event, 5)">somar +1</button>
  ```


#
##  14- Modificadores de Eventos

```html
<p v-on:mousemove="atualizarXY">Mouse: {{x}} e {{y}}
    <span v-on:mousemove="parar">PARAR AQUI!!!</span>
  </p>

<script>
  new Vue({
    el: "#app",
    data: {
      x: 0,
      y: 0
    },
    methods: {
      atualizarXY(event) {
        this.x = event.clientX
        this.y = event.clientY
      },
      parar(event) {
        event.stopPropagation()
      }

    }
  })
</script>

```

* Outra forma é apenas utilizando o modificador `.stop`

```html
  <span v-on:mousemove.stop="">PARAR AQUI!!!</span>
```

* voce também  pode encadear modificadores de eventos

```html
  <span v-on:mousemove.stop.prevent="">PARAR AQUI!!!</span>
```


* outros modificadores de eventos: [documentação](https://vuejs.org/v2/guide/events.html#Event-Modifiers)


#
## Eventos de Teclado

```html
<input v-on:keyup.enter.alt="exibirAlerta" type="text">
```
* [key Modifiers](https://vuejs.org/v2/guide/events.html#Key-Modifiers)

#
## Código Javascript no Template

```html
<p>{{contador > 10 ? 'contador > 10': 'contador < 10'}}</p>
```

#### *Podemos passar expressoes simples de uma linha, que nao envolva testes dentro do {{}}*

#
## Usando Two-Way-Binding



* Vue instance X Vue da camada de visão
* Framework Vue alterando HTML

* Two way binding utilizando `v-bind:` + `v-on:`
```html
<div id="app">
  <p>{{titulo}}</p>
  <input type="text" v-bind:value="titulo" v-on:input="titulo = $event.target.value">
</div>

<script>
  new Vue({
    el: "#app",
    data: {
      titulo: ""
    },

  })
</script>
```

* Forma mais simples apartir de uma simples diretiva:

```html
<input type="text" v-model="titulo">
```

<br>

#
## Propriedades Computadas

* Diferença entre usar uma Computed propety X Methods ?

*  o motivo é que basicamente o Vue não sabe qual dos métodos precisa ser executado, dependendo do que foi atualizado. E esse é o tipo de operação que as propriedades calculadas fazem, elas observam as variáveis ​​que precisam ser calculadas ou recalculadas e só são executadas quando necessário.

* [Method vs Computed](https://stackoverflow.com/questions/44350862/method-vs-computed-in-vue)


#
## Monitorando as Mudanças

* `Computed` vs `Watch`?
* Não podemos ter comflitos de nomes entre `data`, `computed` e `methods`, mas no `watch` é obrigatório

<br>

* explique o problema do `this` nesse contexto de tentar acessar o dado contador da instancia Vue, logo abaixo:

```javascript
 watch: {
      contador(novo, antigo) {
        setTimeout(function () {
          this.contador = 0
        }, 2000)
      }
 }
```

* Corrigindo:

```javascript
watch: {
      contador(novo, antigo) {
        const instanciaVue = this
        setTimeout(function () {
          instanciaVue.contador = 0
        }, 2000)
      }
    },
```

ou usando arrow function:

```javascript
contador(novo, antigo) {
        setTimeout(() => {
          console.log(instanciaVue)
          this.contador = 0
        }, 2000)
      }
```


* Propriedades computadas : sincronas
  * chamou, obrigatoriamente tem que retornar o valor

* watch: monitorando as alterações de alguma propriedade

* exemplo do comobox de estado e cidade, para popular comobox de cidade

* Cuidados ao utilizar o `watch`:
  * uma alteração pode disparar uma mudança, que pode gerar um watch, que pode gerar uma mudança...
    * ciclo infinito


#
## Sintaxe Reduzida (Shorthands)

*Antes:*
```html
<div id="app">
  <p>{{contador}}</p>
  <button v-on:click="somar">somar +1</button>
  <hr>
  <input type="text" v-bind:value="contador">
</div>
```

*Depois:*
```html
<div id="app">
  <p>{{contador}}</p>
  <button @click="somar">somar +1</button>
  <hr>
  <input type="text" :value="contador">
</div>
```

#
## Estilo Dinâmico e Classe CSS

```html
 <div class="demo" :class="{'nome-da-classe' : boolean}"></div>
```
* vai acrescentar dentro de classe, aquilo que estiver fazendo o biding

* obs: Colocar entre aspas, caso o nome ferir os nomes validos dos identificadores do javascript 

* example:
```html
 <div class="demo" :class="{c1 : aplicarC1}"></div>
```

* Deixando a template mais enchuta com computed propety:

```html
<div id="app">
  <div class="demo" :class="estilo1" @click="aplicarC1 = !aplicarC1"></div>
  <div class="demo"></div>
  <div class="demo"></div>
</div>

<script>
  new Vue({
    el: "#app",
    data: {
      aplicarC1: false
    },
    computed: {
      estilo1() {
        return {
          c1: this.aplicarC1,
          c2: !this.aplicarC1
        }
      }
    }

  })
</script>
```

* sintaxe de array para aplicar mais de uma classe

```html
<div class="demo" :class="[classeCSS, 'girar', {teste: true}]"></div>
```

* nome do atributo é o mesmo nome da classe? pode colocar apenas uma vez 

```html
<style>
  .perigo {
	background-color: red;
}
</style>

<div :class="[{perigo}, 'quadrado']">Estou sem classe CSS :(</div>

<script>
new Vue({
	el: '#desafio',
	data: {
		perigo: true
	}
})

</script>

```

