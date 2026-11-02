# Briefing aprovado — portfólio profissional

## Público e objetivo

Recrutadores e líderes técnicos avaliando Raphael Elias para uma vaga de desenvolvimento. A página deve permitir entender rapidamente seu perfil, conhecer sua trajetória, acessar seus apps e entrar em contato. Modo da superfície: Experience, com foco na apresentação do profissional e acesso ao trabalho em catálogo separado.

## Estrutura e hierarquia

1. Apresentação: Raphael Elias, desenvolvedor full-stack, com as ações “Explorar apps” e “Entrar em contato”.
2. Trajetória: formação e evolução técnica com base em fatos confirmados. Raphael não possui experiência profissional formal; não apresentar empregos, cargos, clientes ou resultados inventados.
3. Sobre e tecnologias: contexto pessoal e competências em formato enxuto, preservando os fatos existentes.
4. Artigos: acesso ao conteúdo técnico existente, com títulos legíveis e hierarquia subordinada à apresentação profissional.
5. Contato: email e caminhos profissionais diretos.

Apps e trajetória têm destaque equivalente por meios diferentes: apps na abertura e navegação; trajetória no conteúdo central. Não duplicar projetos selecionados, cards de repositórios ou catálogo nesta página. O catálogo está publicado em apps.raphaelelias.dev; o portfólio fica em raphaelelias.dev.

## Direção visual aprovada

Identidade editorial minimalista do raphael-design: fundo uniforme, paleta neutra, composição tipográfica marcante, espaço generoso e poucos elementos. Apple-design orienta resposta imediata, transições discretas e continuidade das interações. Sem vidro decorativo, gradientes ornamentais ou animações que atrasem navegação.

Usar tipografia por função, com destaque serifado apenas pontual quando houver conteúdo que o justifique. A implementação deve carregar apenas as fontes efetivamente utilizadas e aproveitar os tokens, componentes e infraestrutura de tema existentes.

## Layout e interação

Hierarquia clara entre identidade, atuação e ações na primeira dobra. Navegação com rótulos compreensíveis e acesso evidente aos apps. Layout adaptado a desktop e mobile, com margens confortáveis, leitura estável e controles acessíveis por teclado. Temas claro e escuro preservados; foco visível, resposta ao pressionar e respeito a movimento reduzido. Conteúdo deve permanecer visível sem depender de animação JavaScript.

## Estados e limites

- Oferecer acesso ao catálogo publicado pela abertura e navegação, com aviso acessível de abertura em nova aba.
- Preservar carregamento e tratar ausência/falha de artigos sem comprometer apresentação e contato.
- Confirmar datas, situação da formação e marcos antes de usá-los como fatos. O texto existente informa início da formação em 2022, não sua conclusão.
- Não criar currículo para download sem um arquivo real fornecido.
- Preservar Next.js, React, componentes locais, tema e serviços pertinentes. Motion já está instalado; não acrescentar uma segunda biblioteca para efeitos simples.

## Alcance da próxima implementação

Recompor a página principal e seus componentes de apresentação, trajetória, tecnologias, artigos, contato e navegação. Retirar a listagem de repositórios da página principal. Ajustar tokens e fontes compartilhados dentro desse escopo e revisar metadados para o domínio confirmado. Não construir nem publicar o catálogo de apps como parte deste trabalho.

## Verificação prevista

Inspeção em desktop e mobile, temas claro/escuro, teclado, movimento reduzido, fontes e overflow. Executar os checks pertinentes do projeto. Validar os estados de artigos e contato e verificar que nenhuma ação encaminhe a um destino apresentado como disponível sem estar pronto.

Este briefing encerra o shape. Não constitui implementação nem validação visual no navegador.
