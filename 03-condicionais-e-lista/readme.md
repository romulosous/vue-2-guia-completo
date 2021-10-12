
# Condicionais & Renderização de Listas

## Renderização condicional com v-if-else

> **v-if** se a condição for true aparece o elemento, se não **(v-else)** aparece o outro elemento.

> Veja nos elementos, eles desaparecem na DOM conforme a condição.

```html
<div id="app">
  <p v-if="logado">Usuário Logado: {{nome}}</p>
  <p v-else>Nenhum usuário Logado</p>
  <button @click="logado = !logado">
    {{logado ? 'Sair': 'Entrar'}}</button>
</div>

<script>
  new Vue({
    el: "#app",
    data: {
      nome: "Maria",
      logado: false
    }
  })
</script>
```
* O v-if remove o elemento da pagina

> **v-else-if** vários if aninhados

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<div id="app">
    <p v-if="logado">Usuário Logado: {{ nome }}</p>
    <p v-else-if="anonimo">Navegando como anônimo</p>
    <p v-else>Nenhum usuário logado</p>
    <button @click="logado = !logado">{{ logado ? 'Sair' : 'Entrar' }}</button>
    <input type="checkbox" v-model="anonimo">
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            nome: 'Maria',
            logado: false,
            anonimo: false
        }
    })
</script>

```

#

## Usando v-if com Template
* recurso do html5
  * conseguimos envolver nossas tags sem o template aparecer na DOM

```html
<div v-if="logado">
    <p>Usuário Logado: {{nome}}</p>
    <p>Perfil: Admin</p>
  </div>

  <!-- VS -->

  <template v-if="logado">
    <p>Usuário Logado: {{nome}}</p>
    <p>Perfil: Admin</p>
  </template>
```

#
## Esconder o Elemento com v-show
* trabalha com o CSS
  * `display: none`

>Com a diretiva **v-show**, o elemento não desaparece da DOM, apenas é usado um estilo para ele ficar display:none. **v-show** não tem "else", basta aplicar uma negação a ele. Como é aplicado apenas um estilo, o v-show é mais performático do que o v-if, pois o v-if altera a DOM.

```html
<meta charset="UTF-8">
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<div id="app">
    <template v-if="logado">
        <p>Usuário Logado: {{ nome }}</p>
        <p>Perfil: admin</p>
    </template>
   
    <p v-else-if="anonimo">Navegando como anônimo</p>
    <p v-else>Nenhum usuário logado</p>
    <button @click="logado = !logado">{{ logado ? 'Sair' : 'Entrar' }}</button>
    <input type="checkbox" v-model="anonimo">
    <hr>
    <footer v-show="logado">
        Feito para você! {{ nome }}
    </footer>
    <footer v-show="!logado">
        Feito para você desconhecido
    </footer>
</div>

<script>
    new Vue({
        el: '#app',
        data: {
            nome: 'Maria',
            logado: false,
            anonimo: false
        }
    })
</script>

```

#
## Renderizando Lista com v-for
* com **v-for** eu consigo fazer algo semelhante ao **forEach** 

```html
<div id="app">
  <ul>
    <li v-for="cor in cores">{{cor}}</li>
  </ul>
</div>

<script>
  new Vue({
    el: "#app",
    data: {
      cores: ['vermelho', 'verde', 'amarelo', 'azul'],
      pessoas: [
        { nome: 'Ana', idade: 26, peso: 59 },
        { nome: 'Guilherme', idade: 22, peso: 89 }
      ]
    }
  })
</script>
```

<br>

## Acessando o indice Atual:
* O segundo parâmetro sempre será o segundo valor mais importante, nesse caso o índice. **v-for="(cor, indice) in cores"**

```html
<ul>
    <li v-for="(cor, index) in cores">{{index + 1}} - {{cor}}</li>
</ul>

<script>
    new Vue({
        el: '#app',
        data: {
            cores: ['azul', 'verde', 'amarelo', 'rosa']
        }
    })
</script>
```

<br><br>

## Usando v-for com Template:
* dessa forma, o template não será exibido(ficará oculta no DOM), apenas as tags de dentro:

```html
<template v-for="(cor, i) in cores">
    <h1>{{cor}}</h1>
    <p>{{i}}</p>
  </template>
```

#
## Iterando em Objetos

* Nesse caso, o segundo parâmetro de maior importante será a chave, e o terceiro o índice.

```html
<div id="app">
  <ul>
    <li v-for="pessoa in pessoas">
      <span v-for="(valor, chave, index) in pessoa">
        {{chave}} = {{valor}} ({{index + 1}})
      </span>
    </li>
  </ul>
</div>

<script>
  new Vue({
    el: "#app",
    data: {
      pessoas: [
        { nome: 'Ana', idade: 26, peso: 59 },
        { nome: 'Guilherme', idade: 22, peso: 89 }
      ]
    }
  })
</script>
```

#
## Identificando os Elementos no v-for

* O atributo **key** é apenas um atributo que visa auxiliar o Vue no controle de alterações em listas. Para que o que está sendo apresentado na tela, reflita exatamente o que está no array.


```html
<div id="app">
  <ul>
    <li v-for="(cor, index) in cores" :key="cor">{{index + 1}} - {{cor}}</li>
  </ul>
  <hr>
  <button @click="cores.push('branca')">Adicionar</button>

</div>

<script>
  new Vue({
    el: "#app",
    data: {
      cores: ['vermelho', 'verde', 'amarelo', 'azul'],
    }
  })
</script>

```