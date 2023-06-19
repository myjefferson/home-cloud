<h1 align="center" title="logo HOME CLOUD"><img style="width: 120px;" src="frontend/src/assets/img/logo-home-cloud-blue.svg" alt="HOME CLOUD"></h1>
<h3><i>Home Cloud</i> é um sistema voltado para pessoas que desejam fazer um armazenamento de arquivos de "nuvem" em casa.</h3>
<h5 style="text-align: center;"><i>Projeto em Desenvolvimento</i></h5>
<h1>Sobre</h1>
<p>O sistema web <i><strong>Home Cloud</strong></i> pode facilitar o compartilhamento de arquivos acessando a mesma rede local. Na imagem a seguir, podemos ver a tela principal com alguns itens já adicionados.</p>
<img src="./frontend/src/assets/screens/screen-1.png" style="border: 1px solid #e1e1e1; width: 100%;">
<h1>Tecnologias Utilizadas</h1>
<ul>
    <li>ReactJS</li>
    <li>React Native</li>
    <li>NodeJS</li>
    <li>SQLite</li>
</ul>
<h1>Executando o Projeto</h1>

<p>Este projeto é dividido em duas parte (por enquanto):</p>

<ol>
    <li>Backend (pasta de servidor)</li>
    <li>Frontend (pasta web)</li>
    <li>Mobile <i>(em desenvolvimento)</i></li>
</ol>

<p>O Backend é a parte mais importante, para fazer funcionar o frontend.</p>

<h2>Pré-requisitos</h2>
<p>Você vai precisar ter instalado em sua máquina as seguintes ferramentas:</p>
<ul>
    <li>NodeJS</li>
    <li>Visual Studio Code</li>
    <li>Yarn (ou NPM)</li>a
    <li>Git</li>
</ul>

</hr>

<h2>Layout</h2>
<p>A seguir, será apresentado o desenho das telas do sistema web. O layout foi desenvolvido no Figma</p>
<img src="./frontend/src/assets/screens/screen-4.png" style="border: 1px solid #e1e1e1; width: 100%;">

<h3>Cores Utilizadas</h3>

| Cores - Hex |
|-------------| 
| ![#1070FF](https://via.placeholder.com/15/1070FF/000000?text=+) `#1070FF` |
| ![#F8A832](https://via.placeholder.com/15/F8A832/000000?text=+) `#F8A832` |
| ![#38007E](https://via.placeholder.com/15/38007E/000000?text=+) `#38007E` |
| ![#5F00D7](https://via.placeholder.com/15/5F00D7/000000?text=+) `#5F00D7` |
| ![#FF2626](https://via.placeholder.com/15/FF2626/000000?text=+) `#FF2626` |

</hr>
<h2>Iniciando o BackEnd (servidor)</h2>
<p>Após instalado as ferramentas citadas nos pré-requisitos:</p>
<ul>
    <li>Crie uma pasta no local onde deseja instalar o Home Cloud.</li>
    <li>Após isso, com o VS Code aberto, vá em <strong>Arquivo</strong> > <strong>Abrir Pasta</strong> e selecione a pasta que você criou.</li>
    <li>Agora vamos utilizar o terminal do VS Code para os comando a seguir.</li>
</ul>

```
    # Clone este repositório
    $ git clone https://github.com/myjefferson/home-cloud.git

    # Acesse a pasta do projeto
    $ cd home-cloud

    # Vá para a pasta da aplicação Backend
    $ cd backend

    # Instale as dependências
    $ npm install

    # Execute a aplicação em modo de desenvolvimento
    $ npm run dev

    # Pronto! O nosso servidor foi iniciado.
```

<h2>Iniciando a aplicação web (Frontend)</h2>
<p>Utilize um terminal e siga os seguintes comandos:</p>

```
    # Acesse a pasta do projeto
    $ cd home-cloud

    # Vá para a pasta da aplicação Backend
    $ cd frontend

    # Instale as dependências
    $ npm install

    # Execute a aplicação em modo de desenvolvimento
    $ npm run start

    # Pronto! A nossa aplicação web foi iniciado e pronto para uso.
```
</hr>

<p align="center">Desenvolvido com 💙 por <strong><a href="https://github.com/myjefferson">Jefferson Carvalho</a></strong></p>
