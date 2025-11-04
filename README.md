# Portfólio

Este é um projeto de portfólio pessoal desenvolvido com Next.js e TypeScript, projetado para apresentar minhas habilidades, projetos e posts de blog.

> [Acesse o portfólio](https://raphaelelias.vercel.app)

## Tecnologias Utilizadas

*   **Framework:** Next.js com Turbopack
*   **Linguagem:** TypeScript
*   **UI:** React
*   **Estilização:** Tailwind CSS
*   **Lint & Formatação:** Biome
*   **Gerenciador de Pacotes:** pnpm

## Como Executar o Projeto

### Pré-requisitos

Antes de começar, você precisará ter o [Node.js](https://nodejs.org/) e o [pnpm](https://pnpm.io/) instalados em sua máquina.

### Instalação

1.  Instale as dependências do projeto:
    ```bash
    pnpm install
    ```

### Rodando em Desenvolvimento

2.  Para iniciar o servidor de desenvolvimento, execute:
    ```bash
    pnpm dev
    ```
    O servidor estará disponível em `http://localhost:3000`.

## Build e Produção

1.  **Build para Produção:**
    Para criar uma build otimizada para produção, execute:
    ```bash
    pnpm build
    ```
    Os arquivos da build serão gerados no diretório `.next`.

2.  **Iniciando o Servidor de Produção:**
    Para iniciar o servidor em modo de produção, utilize o comando:
    ```bash
    pnpm start
    ```

## Linting e Formatação

O projeto utiliza o Biome para garantir a qualidade e a consistência do código. Para verificar os arquivos, execute:

```bash
pnpm check
```
