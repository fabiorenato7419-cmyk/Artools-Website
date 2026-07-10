# OPUS.pen — Landing page

Landing page premium de produto (caneta técnica **OPUS nº1**), com hero em vídeo
controlado por scroll (técnica de *frame sequence*), animações cinematográficas
(GSAP + ScrollTrigger + Lenis) e um design system próprio (paleta *gallery/ink/jade*,
tipografia Manrope · Instrument Serif · Space Mono).

## Estrutura

```
.
├── index.html                 # a página (marcação)
├── assets/
│   ├── css/style.css          # estilos
│   ├── js/main.js             # comportamento (GSAP, engine de vídeo, etc.)
│   ├── img/                   # imagens (writing.jpg …)
│   ├── video/                 # vídeo do produto (video3.mp4)
│   ├── frames/                # sequência de frames do hero (192 imagens)
│   └── favicon.svg
├── design-system/             # referência de design (páginas standalone)
├── reference/                 # material de origem (fotos de referência)
├── tools/serve_range.py       # servidor local com suporte a HTTP Range
└── README.md
```

## Rodar localmente

O hero precisa de um servidor com suporte a *HTTP Range* (para o vídeo/seek):

```bash
python tools/serve_range.py
# abra http://localhost:8765
```

## Dobras

1. **Hero** — vídeo full-screen controlado pelo scroll
2. **Engenharia** (`#tecnologia`) — benefícios técnicos
3. **A experiência** (`#experiencia`) — o uso, sensorial
4. **O convite** (`#oferta`) — CTA com vídeo de fundo e card com glow

## Deploy

Site estático — pode ser publicado em qualquer host estático
(GitHub Pages, Netlify, Vercel, Cloudflare Pages). Basta servir a raiz.
Dependências externas via CDN: GSAP, ScrollTrigger, Lenis, SplitType,
Iconify e Google Fonts.

## Tecnologias

HTML/CSS/JS puro · GSAP · ScrollTrigger · Lenis · SplitType · Iconify.
