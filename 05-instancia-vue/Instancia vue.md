# Instancia do Vue

## Usando Múltiplas Instâncias Vue

* é possivel, mas não é a melhor estrategia

* em que situação isso vai si aplicar? (4:00)
  * mini aplicação vue para controlar uma parte da pagina

```html
<div id="app1">
  {{titulo1}} {{titulo2}}
</div>

<div id="app2">
  {{titulo1}} {{titulo2}}
</div>

<script>
  new Vue({
    el: "#app1",
    data: {
      titulo1: "Teste 1"
    }
  })

  new Vue({
    el: "#app2",
    data: {
      titulo2: "Teste 2"
    }
  })

</script>
```
>não funciona dessa forma!!!
* correção

```html
<meta charset="utf-8">
<script src="https://unpkg.com/vue"></script>

<div id="app1">
  {{titulo1}}
  <button @click="alterar">Alterar</button>
</div>

<div id="app2">
  {{titulo2}}
  <button @click="alterar">Alterar</button>

</div>

<script>
  new Vue({
    el: "#app1",
    data: {
      titulo1: "Teste 1"
    },
    methods: {
      alterar() {
        this.titulo1 += "!!!!"
      }
    }
  })

  new Vue({
    el: "#app2",
    data: {
      titulo2: "Teste 2"
    },
    methods: {
      alterar() {
        this.titulo2 += "????"
      }
    }
  })

</script>

```




#
## Acessando a Instância Vue Externamente

* Apartir de uma instancia eu consigo mexer em outra instância?

```html
<meta charset="utf-8">
<script src="https://unpkg.com/vue"></script>

<div id="app1">
  {{titulo1}}
  <button @click="alterar">Alterar</button>
</div>

<div id="app2">
  {{titulo2}}
  <button @click="alterar">Alterar</button>

</div>

<script>
  const vm1 = new Vue({
    el: "#app1",
    data: {
      titulo1: "Teste 1"
    },
    methods: {
      alterar() {
        vm2.titulo2 += "??????"
      }
    }
  })

  const vm2 = new Vue({
    el: "#app2",
    data: {
      titulo2: "Teste 2"
    },
    methods: {
      alterar() {
        vm1.titulo1 += "!!!!"
      }
    }
  })

  setTimeout(() => {
    vm1.titulo1 = "Alterado pelo timer!"
  }, 4000);

</script>

```

* em que cenários isso é legal?

* Vimos então que é totalmente possivel acessar dados de uma outra instancia do vue, e que podemos tambem alterar um dado de uma instancia do vue externamente, seja em outra instância ou pelo javascript diretamente, porém isso não é legal nesse caso, pois estamos alterando dados que estao no controle do Vue, e o Vue já gerencia muita coisa, então fazer um comportamento desses poderia resultar em comportamento inesperado, pois esses nao não casos comuns dentro do mundo do Vue.

* e também, caso eu tenha duas instancias que precisam interagir entre si, é mais legal eu criar apenas uma instancia pra agrupar todos os comportamentos.

* e si precisar acessar externamente tem que ter muito cuidado para nao alterar nada que esteja sobre o controle do vue e gerar comportamentos inesperados.




* mas seria mais legal eu criar apenas uma a


#
## Como o VueJS Gerencia os Dados e Métodos

* Será que consigo interpolar esse valor? (1:50)


```html
<meta charset="utf-8">
<script src="https://unpkg.com/vue"></script>

<div id="app">
  {{titulo1}}
  <button @click="alterar">Alterar</button>
  {{novaInfo}}
</div>


<script>
  const vm = new Vue({
    el: "#app",
    data: {
      titulo1: "Teste 1"
    },
    methods: {
      alterar() {
        this.titulo1 += "!"
      }
    }
  })

  vm.novaInfo = "Teste"
  console.log(novaInfo)

</script>
```


#

## Meu Vue Framework
* Padrão de projeto Observe

* O virtual dom é um objeto javascript que simula o dom atual. Mudanças são primeiramente feitas nesse objeto e em seguida uma verificação é feita no DOM, para sincronizar o mesmo.

```html
<meta charset="utf-8">
<script src="https://unpkg.com/vue"></script>

<div id="app">
  {{nome}} {{ sobrenome }} {{ 100 + 53 }} {{ Math.pow(2,3)}}
</div>


<script>
  function MeuVue(params) {
    this.$el = document.querySelector(params.el)
    this.$data = params.data

    for (let atr in this.$data) {
      Object.defineProperty(this, atr, {
        get: () => {
          return this.$data[atr]
        },
        set: value => {
          this.$data[atr] = value
        }
      })
    }

    // interpolar
    const regex = /\{\{([\s\w)(,.+*-]*)\}\}/g
    this.$el.innerHTML = this.$el.innerHTML.replace(regex, (match, $1) => {
      const value = this[$1.trim()]
      return value ? value : eval($1)
    })
  }

  const vm = new MeuVue({
    el: "#app",
    data: {
      nome: "Maria",
      sobrenome: "Silva"
    }
  })

  console.log(vm.nome)
  console.log(vm.$data.nome)

  vm.nome = "Pedro"
  console.log(vm.nome)
  console.log(vm.$data.nome)

  // vm.$data.idade = 31
  // console.log(vm.idade)


</script>

```


#
## Colocando $refs e Usando nos Templates

> `document.querySelector("h1").innerText = "bla bla"`

> `vm.$refs.aulaRef.innerText = "Alterado diretamente :("`

```html
<meta charset="utf-8">
<script src="https://unpkg.com/vue"></script>

<div id="app">
  <h1 ref="aulaRef">{{aula}}</h1>
  <h2>{{modulo}}</h2>
  <button @click="alterarAula">Alterar Aula</button>
  <button @click="alterarModulo">Alterar Modulo</button>
</div>

<script>
  const vm = new Vue({
    el: "#app",
    data: {
      aula: "Aula: Usando Refs",
      modulo: "Modulo: Instância Vue"
    },
    methods: {
      alterarAula() {
        this.aula += "#"
      },
      alterarModulo() {
        this.modulo += "#"
        console.log(this.$ref.aulaRef.innerText)
      }
    }
  })

  vm.$refs.aulaRef.innerText = "Alterado diretamente :("
</script>

```

* estado interno é quem de fato vai ser aplicado quando voce precisa alterar um determinado valor.

* cuidado nao violar algum principio do Vue


#
## Montando um Template 

* Uma forma de monta a vue Instance:

```html
<meta charset="utf-8">
<script src="https://unpkg.com/vue"></script>

<div id="app">
  <h1>{{aula}}</h1>
  <h2>{{modulo}}</h2>
  <button @click="alterarAula">Alterar Aula</button>
  <button @click="alterarModulo">Alterar Modulo</button>
</div>

<script>
  const vm = new Vue({
    // el: "#app",
    data: {
      aula: "Aula: Montando Instância Vue",
      modulo: "Modulo: Instância Vue"
    },
    methods: {
      alterarAula() {
        this.aula += "#"
      },
      alterarModulo() {
        this.modulo += "#"
      }
    }
  })

  vm.$mount("#app")

</script>
```

* outra forma:

```html
<meta charset="utf-8">
<script src="https://unpkg.com/vue"></script>

<div id="app">
</div>

<script>
  const vm = new Vue({
    // el: "#app",
    template: `
    <div>
      <h1>{{aula}}</h1>
      <h2>{{modulo}}</h2>
      <button @click="alterarAula">Alterar Aula</button>
      <button @click="alterarModulo">Alterar Modulo</button>
    </div>
    `,
    data: {
      aula: "Aula: Montando Instância Vue",
      modulo: "Modulo: Instância Vue"
    },
    methods: {
      alterarAula() {
        this.aula += "#"
      },
      alterarModulo() {
        this.modulo += "#"
      }
    }
  })

  // vm.$mount("#app")
  vm.$mount()
  document.querySelector("#app").appendChild(vm.$el) // montando usando uma linha de Js Puro

</script>

```

* Template gera o $el e fica pronto pra ser injetado 


#

## Usando Componentes

```html
<meta charset="utf-8">
<script src="https://unpkg.com/vue"></script>

<div id="app">
  <comp></comp>
  <comp></comp>
  <comp></comp>
</div>

<script>

  Vue.component('comp', {
    template: `
    <div>
      <h1>{{aula}}</h1>
      <h2>{{modulo}}</h2>
      <button @click="alterarAula">Alterar Aula</button>
      <button @click="alterarModulo">Alterar Modulo</button>
    </div>
    `,
    data: function () {
      return {
        aula: "Aula: Montando Instância Vue",
        modulo: "Modulo: Instância Vue"
      }
    },
    methods: {
      alterarAula() {
        this.aula += "#"
      },
      alterarModulo() {
        this.modulo += "#"
      }
    }
  })


  const vm = new Vue({
    el: "#app"

  })


</script>

```

* uma instancia vue nao é um componente

* explica o porque no contexto dos componentes precisamos ter uma função que retorne um objeto (7:00)


### Limitações dos Templates ?

### Como o VueJS Atualiza o DOM?

#
## Ciclo de Vida Da instância Vue

```html
<meta charset="utf-8">
<script src="https://unpkg.com/vue"></script>

<div id="app">
  <h1>{{ titulo}}</h1>
  <button @click="titulo += '#'">Alterar Titulo</button>
  <button @click="$destroy()">Destruir</button>
</div>

<script>

  const vm = new Vue({
    el: "#app",
    data: {
      titulo: 'Ciclo de vida'
    },
    beforeCreate() {
      console.log("Antes de criar")
    },
    created() {
      console.log("Criado")
    },
    beforeMount() {
      console.log("Antes de montar! (DOM)")
    },
    mounted() {
      console.log("DOM montada")
    },
    beforeUpdate() {
      console.log("Antes de atualizar")
    },
    updated() {
      console.log("atualizado")
    },
    beforeDestroy() {
      console.log("Antes de destruir")
    },
    destroyed() {
      console.log("Destruido")
    },

  })


</script>
```

