
## Renderização condicional com v-if-else

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

#

## Usando V-if com Template
* recurso do html5

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

#
## Renderizando Lista com v-for
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

<br><br>
* Acessando o indice Atual:

```html
<ul>
    <li v-for="(cor, index) in cores">{{index + 1}} - {{cor}}</li>
  </ul>
```

<br><br>
* Usando v-for com Template:

```html
<template v-for="(cor, i) in cores">
    <h1>{{cor}}</h1>
    <p>{{i}}</p>
  </template>
```
#
## Iterando em Objetos

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

* propriedade `key`

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