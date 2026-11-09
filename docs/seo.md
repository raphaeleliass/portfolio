# SEO do portfólio

O domínio canônico é `https://raphaelelias.dev`. Título, descrição e cartões sociais ficam em `src/app/layout.tsx`; a URL canônica e os dados estruturados de pessoa, site e perfil ficam em `src/app/page.tsx`.

O sitemap inclui apenas a página pública deste projeto. Âncoras de seções não são páginas separadas; os apps e artigos estão em outros sites e devem ter seus próprios sitemaps. Ao adicionar páginas locais, incluir suas URLs canônicas em `src/app/sitemap.ts` e definir metadados específicos. Não usar a data de cada build como data de atualização do conteúdo.

## Verificação local

Com o build de produção rodando em `http://localhost:3002`:

```sh
node tests/seo.test.mjs http://localhost:3002
```

## Após publicar

1. Confirmar que `/`, `/robots.txt` e `/sitemap.xml` respondem com status 200 no domínio público e que a hospedagem não envia `X-Robots-Tag: noindex`.
2. Redirecionar permanentemente HTTP, `www` e o antigo domínio `raphaelelias.vercel.app` para a URL correspondente em `https://raphaelelias.dev`, na hospedagem que controla esses domínios.
3. Verificar a propriedade no Google Search Console, enviar `https://raphaelelias.dev/sitemap.xml` e inspecionar a página inicial para solicitar indexação. Fazer o mesmo no Bing Webmaster Tools.
4. Validar os dados estruturados no Schema Markup Validator e no teste de resultados avançados do Google. A marcação descreve o perfil; não garante destaque nos resultados.
5. Acompanhar consultas, impressões, cliques e Core Web Vitals no Search Console. Publicar artigos úteis no blog e manter links para o portfólio nos perfis profissionais ajuda a construir descoberta ao longo do tempo.

## Publicação de 9 de novembro de 2026

- Deploy de produção na Vercel: `dpl_7BPYngLJHbokHEd57YX5wF74g81p`, associado a `https://raphaelelias.dev`.
- HTML público, robots, sitemap, dados estruturados e status 404 verificados com `tests/seo.test.mjs`; nenhuma diretiva HTTP `noindex` nas rotas verificadas.
- `www.raphaelelias.dev`, `raphaelelias.vercel.app` e `raphael-elias.vercel.app` redirecionam com 308 diretamente para o domínio canônico, preservando caminho e query. HTTP também redireciona permanentemente para HTTPS. Esses redirects ficam nas configurações de domínio do projeto Vercel, não no Next.js.
- URL inicial enviada ao IndexNow; resposta `202` (recebida, validação da chave pendente). O arquivo de propriedade em `public/*.txt` deve continuar publicado. Isso não equivale a indexação nem substitui o Search Console do Google.
- Google Search Console, Bing Webmaster Tools, validadores online e métricas reais de Core Web Vitals ainda não foram acessados: o navegador da sessão está indisponível. Os dados JSON-LD foram verificados localmente e no HTML público.

O envio ao [IndexNow](https://www.indexnow.org/documentation) pode ser repetido quando houver uma atualização real do conteúdo, usando a chave publicada e apenas as URLs alteradas. Não há envio automático em cada build.

Referências: [Guia de SEO do Google](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [metadados do Next.js](https://nextjs.org/docs/app/getting-started/metadata-and-og-images).
