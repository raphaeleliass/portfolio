# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Recrutadores e líderes técnicos avaliando Raphael Elias para uma vaga de desenvolvimento.

## Product Purpose

Apresentar o perfil profissional, a trajetória e os meios de contato de Raphael Elias para apoiar oportunidades de emprego.

## Operating Context

O portfólio profissional fica em raphaelelias.dev. O catálogo de apps está publicado em apps.raphaelelias.dev, conforme confirmado pelo usuário.

## Capabilities and Constraints

- Trajetória é o conteúdo central da página; apps recebem destaque equivalente por meio do acesso na apresentação e na navegação.
- Não duplicar projetos selecionados nem o catálogo no portfólio profissional.
- Estrutura confirmada: apresentação, trajetória, sobre e tecnologias, artigos e contato.
- Preservar os conteúdos factuais e os serviços existentes que continuarem pertinentes.
- O usuário confirmou que não possui experiência profissional formal. A seção se chama Trajetória e apresenta formação e prática de desenvolvimento, sem sugerir vínculos empregatícios. Datas e marcos específicos precisam ser confirmados antes da publicação. A antiga Timeline de repositórios foi substituída pela trajetória nesta implementação.
- A apresentação e a navegação oferecem acesso ao catálogo publicado, em nova aba.

## Brand Commitments

Usar raphael-design para a identidade editorial minimalista e apple-design para a precisão de feedback e movimento. Manter paleta neutra, hierarquia tipográfica e acessibilidade.

## Evidence on Hand

- Apresentação e formação: src/components/layout/About.tsx.
- Tecnologias: src/data/index.ts e src/components/layout/Skills.tsx.
- Artigos: src/components/layout/Blog.tsx e src/services/getBlogPosts.ts.
- Contato: src/components/layout/Contact.tsx.
- A antiga listagem de repositórios foi retirada da página principal. src/components/layout/Timeline.tsx agora apresenta a trajetória; src/services/getPinnedRepos.ts permanece sem uso nessa página.

## Product Principles

- Tornar o perfil profissional compreensível em uma leitura rápida.
- Sustentar a trajetória com fatos verificáveis, sem inventar resultados ou vínculos.
- Concentrar os apps em seu catálogo próprio, com acesso evidente pelo portfólio.
- Facilitar o contato e a avaliação técnica.
