# Quake Log Parser Node.JS

## Requiriments

* VirtualBox 5.2*
* Vagrant 2.0.2*
* NodeJS 8.9.4
* NPM 5.6

* If you don't want to run with Vagrant, just skip to step 4 in Setting steps  

## Steps for setting

1. vagrant up
2. vagrant ssh
3. cd /vagrant
4. npm install
5. npm run dev

This application started in port 3000 by default

## Steps for tests

1. cd dir_of_project
2. npm test

## What was proposed

Foi proposto o desenvolvimento de um Parser para um Game Log de Quake 3.
A solução aqui apresentada, contém um módulo que manipula e extrai informações do
arquivo de log. Neste módule contém:

1. Método que retorna as informações de todo um jogo, de forma legível
2. Método que rotorna as estatísticas de um jogo
3. Método que retorna a posição de um jogo dentro de um arquivo de log
4. Método para retornar o total de Jogos

O projeto apresenta também uma API para retorno em JSON dos métodos desenvolvido no módulo.
As rotas são as seguintes:

1. GET `/` => Retorna a home do projeto
2. GET `/games/total` => Retorna o total de jogos
3. GET `/games/:num` => Retorna as estatísticas de um jogo, recebendo o número (:num) como parâmetro
4. GET `/games/:num/detail` => Retorna as informações detalhadas de um jogo, recebendo o número (:num) como parâmetro

Utilizei NodeJS para o desenvolvido usando o Framework ExpressJS e o Mocha + Chai para os testes
