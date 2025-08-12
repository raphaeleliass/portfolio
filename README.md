# Meu Portfólio

Meu poprtfólio com as principais informações sobre mim e meus projetos mais relevantes.

## 🚀 Telas

O projeto possui três telas principais:

- **Home:** Página principal que exibe meus projetos.
- **Login:** Autenticação para acessar o painel de administrador.
- **Dashboard:** Ambiente para gerenciar (criar, ler, atualizar e excluir) os projetos.

## 🛠️ Tecnologias Utilizadas

- **Next.js:** Framework React para renderização no lado do servidor.
- **Prisma:** ORM para interação com o banco de dados.
- **Better-Auth:** Biblioteca para autenticação.
- **Cloudinary:** Plataforma para gerenciamento de mídias.
- **Shadcn UI:** Componentes de UI para o design.
- **Tailwind CSS:** Framework CSS para estilização.
- **GSAP:** Biblioteca de animação para uma experiência mais fluida.

## ⚙️ Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Execute o projeto:
   ```bash
   pnpm dev
   ```
5. Abra [http://localhost:3000](http://localhost:3000) em seu navegador.

## 🔑 Variáveis de Ambiente

Para executar o projeto, você precisará adicionar as seguintes variáveis de ambiente ao seu arquivo `.env`. Crie um arquivo `.env.local` e adicione as seguintes variáveis:

```bash
# PRISMA DB URL
DATABASE_URL=

# BETTER-AUTH SECRETS
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=

# CLOUDINARY API KEYS
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_API_ENVIRONMENT_VARIABLE=

# APP VARIABLES
NEXT_PUBLIC_APP_BASE_URL=
APP_API_KEY=
APP_USER_ID=
```
