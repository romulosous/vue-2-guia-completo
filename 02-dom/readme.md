

----

## 🎓 Aprendizados

- [x] Introdução ao capítulo
- [x] Mexer com template
- [x] Manipular mais de um eventos com nossos dados
- [x] Trabalhar com propriedades reativas
- [x] Two Way data binding
- [x] Aplicar estilos na nossa tag



#
## Entendendo VueJS Templates
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
## Sintaxe de Template e Instancia VueJS Trabalhando Juntos

* Vue cria acessso diretos quando voce trabalha, por exemplo, dentro do template

* o que é interpolar/interpretar?
  * vai ler o que está dentro do {{}}, vai executar esse codigo,  e substituir isso por alguma coisa, que será um valor textual.

* HTML nada mais é do que um codigo textual interpretado pelo browser
  * então aquilo que vai interpretado dentro do {{}} tem que ser resolvido para uma string
  

#
## Acessando Dados na Instância VueJS

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
* Importante: **Nao pode ter uma função e um dado com o mesmo nome**


#
## Binding de Atributos

* Para propriedades dentro das tags, usar diretivas

* v-bind <- fazer a ligação entre um dado que está na Instancia do Vue a um dado que está no atributo de uma propriedade da tag

* Com o `v-bind`, é só colocar diretamente o nome, sem a nescessidade do  `{{}}`

* O que são diretivas?
  * É a nomeclatura que o Vue usa, que sao propriedades personalizadas interpretadas pelo Vue.

#
## Evitando Re-Renderização
* **v-once** impedir que os dados sejam reativo
  * é diferente do modificador `once`, que modifica o comportamento de uma diretiva

#
## Diretiva V-HTML (Imprimir HTML Puro)
  * Com essa diretiva, posso passar codigo HTML atráves de um atributo no Vue
  * Converter string para HTML Verdadeiro

* Só que deve tomar muito cuidado ao aceitar scripts assim diretamente!
  * XSS Attack


#
## Escutando Eventos
* v-on <- diretiva que intercepta os eventos
  * "quando um evento acontecer:"
    * significa que voce vai chamar uma funcao

<br/>

### **v-on:mousemove** 
  * Ao passar o mouse em cima da tag **< p>**, é mostrado a posição do mouse.


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
<br/>

### **v-on:click**
* Ao ser clicado o elemento dispara uma função.

 ```html
 <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<div id="app">
    <p>{{ contador }}</p>
    <button v-on:click="somar">Somar 1</button>
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            contador: 0
        },
        methods: {
            somar(){
                this.contador++
            }
        }
    })
</script>

 ```

#
## Passando nossos proprios argumentos com Eventos

* Por padrão o Vue já reconhece o parâmetro Vue, ou seja, mesmo que eu não passe ele na função, eu consigo usar ele. Não tem haver diretamente com o Vue, é um evento gerado pelo javascript. No entando, no momento que passamos nossos proprios parametros especifico, automaticamente o **event** não será mais passado por padrão

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

* se eu passar outro parâmetro para a função e ainda sim quiser usar o evento, eu preciso usar o event assim $event com dólar na frente e o nome obrigatoriamente precisa ser event.
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

* Parar quando eu passar por cima da tag `span`

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

* Fazer o binding apenas quando sair do campo
  `v-model.lazy`

* `v-model.number`, `v-model.trim`....


* outros modificadores de eventos: [documentação](https://vuejs.org/v2/guide/events.html#Event-Modifiers)


#
## Eventos de Teclado

* Fica muito mais fácil controlar quais teclas o usuário digitou, basta passar o nome da tecla `v-on:keyup.(nome da tecla)`. Para controlar duas teclas pressionadas juntas `v-on:keyp.(nomedatecla).(nomedatecla)`

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<div id="app">
    <div>
        <label>Ativa após qualquer tecla:</label>
        <input type="text" v-on:keyup="solteiTecla">
    </div>

    <div>
        <label>Ativa após o enter:</label>
        <input type="text" v-on:keyup.enter="solteiEnter">
    </div>

    <div>
        <label>Ativa após o enter + alt:</label>
        <input type="text"  v-on:keyup.enter.alt="solteiEnter_Alt">
    </div>
    
</div>

<script>
    new Vue({
        el: '#app',
        methods: {  
            solteiTecla(){
                alert('apertei qualquer tecla')
            },

            solteiEnter(){
                alert('Apertei Enter')
            },

            solteiEnter_Alt(){
                alert('Apertei enter+alt')
            }
        }
    })
</script>
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

Por enquanto com v-bind os dados da minha instância Vue modificam apenas o template.

Já os eventos ouvem no template e modificam apenas os dados da instância Vue que por sua vez modificam o template.

Agora o v-model vai modificar ao mesmo tempo o template e os dados da minha instância Vue, funcionando como um espelho ou uma via de mão dupla.



* Vue instance X Vue da camada de visão
* Framework Vue alterando HTML

* Two way binding utilizando `v-bind:` + `v-on:`
  * associação de dados bidirecional
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

Quando existe alguma alteração na irteface os componentes são rendererizados novamente, então os métodos são invocados mesmo sem ter ligação com as propriedades alteradas. Existe uma propriedade no vue chamada computed que o método só vai ser invocado quando a propriedade que tem relação com ele é alterada.

Propriedades computed são chamadas sem os pareteses ()

Repare que sem o computed, o método resultado() era chamado quando clicado em aumentar2, mesmo sem aumentar2 ter relação nenhuma com o método resultado, com o computed uma propriedade computada será apenas invocada quando uma propriedade que está relacionada a ela é atualizada!

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<div id="app">
    <button v-on:click="aumentar">Aumentar</button>
    <button v-on:click="contador2++">Aumentar2</button>
    <button v-on:click="diminuir">Diminuir</button>
    <p>Contador: {{ contador1 }} | {{ contador2 }}</p>
    <p>Resultado: {{ resultado }}</p>
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            contador1: 0,
            contador2: 0
        },

        computed: {
            resultado(){
                console.log("É chamado apenas quando modifico contador1")
                return this.contador1 >= 5 ? 
                       "maior ou igual a 5" : "menor que 5"         
            }
        },

        methods: {
             aumentar(){
                this.contador1++        
            },
             diminuir(){
                this.contador1--           
            },
            /* 
            resultado(){
                console.log(É chamado quando modifico contador 2, mesmo sem ter relação)
                return this.contador >= 5 ? 
                       "maior ou igual a 5" : "menor que 5"         
            } */
        }
    })
</script>

```

O computed é usado quando quero juntar dois dados em um só.

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

* **v-on** por **@**
* **v-bind** por **:(dois pontos)**

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
### 1 - Consigo aplicar estilo css diretamente no template usando:
```html
 <div class="demo" :class="{'nome-da-classe' : valorBoolean}"></div>
```
* vai acrescentar dentro de classe, aquilo que estiver fazendo o binding

* obs: Colocar entre aspas, caso o nome ferir os nomes válidos dos identificadores do javascript 

* example:
```html
 <div class="demo" :class="{'color-red' : aplicarC1}"></div>
```

<br>
<br>

### 2- Deixando a template mais enchuta com computed propety:

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

<br>

### sintaxe de array para aplicar mais de uma classe

```html
<div class="demo" :class="[classeCSS, 'girar', {teste: true}]"></div>

<script>
    new Vue({
        el: '#app',
        data: {
            aplicarC1: false,
            classeCSS: "c1",
            teste: "girar"
        },

        computed: {
            estilo(){
                return {
                    c1: this.aplicarC1,
                    c2: !this.aplicarC1
                }
            }
        }
    })
</script>

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

### Estilo dinâmico sem classe

* Lembrando que para aplicar o nome de uma classe no template que tenha - (hífe) preciso usar aspas. ex: 'background-color'

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<style>
    .caixas{
        display: flex;
        justify-content: space-around;
    }

    .demo{
        width: 100px;
        height: 100px;
        background-color: gray;
    }

</style>

<div id="app">
    <div class="caixas">
        <div class="demo" :style="{'background-color' : cor}"></div>
        <div class="demo" :style="[meuEstilo, {height: altura} ]"></div>
        <div class="demo"></div>
    </div>
    <hr>
    <input type="text" v-model="cor">
    <input type="text" v-model="largura">
</div>

<script>
    new Vue({
        el: '#app',
        data: {
           cor: 'red',
           largura : '300',
           altura : 20
        },

        computed: {
            meuEstilo(){
                return{
                    backGroundColor: this.cor,
                    width : this.largura + 'px'
                }
            }  
        }
    })
</script>

```