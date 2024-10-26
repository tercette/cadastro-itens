# Download o raw folder para uma melhor visualizacao desta documentacao.

# CadastroItens

Este projeto é uma aplicação web para o cadastro e gerenciamento de itens, desenvolvida com Angular CLI versão 16.2.16. A aplicação permite adicionar, editar, excluir e listar itens, com suporte à validação de formulários e armazenamento de dados no LocalStorage.

# funcionalidades

Cadastro de itens: Permite adicionar novos itens com os campos "Nome", "Categoria", "Quantidade", "Preço" e "Ativo".

Edição de itens: Atualiza os dados de itens existentes.

Exclusão de itens: Remove itens da lista com confirmação.

Listagem de itens: Mostra os itens cadastrados em uma tabela, com paginação e ordenação.

Persistência de dados: Os dados são armazenados localmente no navegador, utilizando LocalStorage.

Validação de formulários: O formulário inclui validação para campos obrigatórios e de formato.

Responsividade: A aplicação se adapta a diferentes tamanhos de tela, incluindo um menu colapsável para dispositivos móveis.

## Tecnologias Utilizadas

Angular 16: Framework principal usado para desenvolvimento da aplicação.

NG ZORRO: Biblioteca de componentes baseada no Ant Design para Angular, utilizada para a interface do usuário.

TypeScript: Linguagem utilizada para desenvolvimento do projeto.

LocalStorage: Utilizado para armazenamento de dados localmente no navegador.

RxJS: Biblioteca para programação reativa, utilizada em alguns fluxos de dados da aplicação.

## Estrutura do Projeto

src/
├── app/
│   ├── item-form/               # Componente para o formulário de cadastro e edição de itens
│   ├── item-list/               # Componente para a listagem de itens
│   ├── side-menu/               # Componente para o menu lateral
│   ├── item.service.ts          # Serviço para gerenciamento de itens (CRUD)
│   ├── null-to-na.pipe.ts       # Pipe para tratar valores nulos na visualização
│   └── Types/                   # Definições de tipos e interfaces
├── assets/                      # Arquivos de ativos, como imagens e ícones
├── environments/                # Configurações de ambiente
├── styles.scss                  # Estilos globais da aplicação
└── main.ts                      # Arquivo principal para bootstrap do Angular

## Detalhamento das Funcionalidades
Cadastro e Edição de Itens

O formulário de cadastro de itens possui validação nos seguintes campos:

Nome: Campo obrigatório, com tamanho máximo de 70 caracteres.

Categoria: Campo obrigatório, com opções predefinidas (Automóvel, Caminhão, Avião).

Quantidade e Preço: Campos obrigatórios somente se o item estiver marcado como "Ativo".

Ativo: Campo booleano (checkbox) para indicar se o item está ativo.

Listagem de Itens

A listagem exibe os itens em uma tabela com as colunas: Nome, Categoria, Ativo, Quantidade, Preço e Ações.

Ações disponíveis:

Editar: Abre o formulário com os dados do item selecionado.
Excluir: Exclui o item após confirmação.

Responsividade

A aplicação é responsiva, com layout ajustado para diferentes dispositivos:

Em telas menores, o menu lateral se transforma em um menu tipo "hambúrguer".

A tabela de itens é ajustada para se adaptar ao tamanho da tela.

## Melhorias Futuras
Implementar autenticação e controle de acesso.
Utilizar um backend com API REST para persistência de dados.
Melhorar os testes de integração e cobertura de testes unitários.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
