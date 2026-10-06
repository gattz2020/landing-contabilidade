# Vértice Contabilidade · Landing Page

🇧🇷 [Português](#-português) · 🇺🇸 [English](#-english)

![Preview](assets/img/preview-desktop.png)

**🔗 Demo:** https://gattz2020.github.io/landing-contabilidade/

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-222?logo=github)

---

## 🇧🇷 Português

Landing page de alta conversão para um **escritório de contabilidade** (empresa fictícia), feita com **HTML, CSS e JavaScript puros**: sem frameworks, sem build e com carregamento rápido.

### ✨ Funcionalidades
- **Design premium em tema escuro**: gradientes, glassmorphism e micro-animações.
- **100% responsivo** (desktop, tablet e celular) com menu mobile acessível.
- **Animações ao rolar** com `IntersectionObserver` e suporte a `prefers-reduced-motion`.
- **Contadores animados** de resultados.
- **Planos com alternância mensal/anual** e desconto calculado.
- **FAQ em accordion** com `<details>` nativo, que mantém só um item aberto.
- **Formulário com validação e máscara de telefone** que **envia o lead direto para o WhatsApp**, sem precisar de backend.
- **Botão flutuante de WhatsApp**.
- **SEO**: meta tags, Open Graph, dados estruturados (`schema.org/AccountingService`), HTML semântico e um único `<h1>`.
- **Acessibilidade**: link "pular para o conteúdo", `aria-*`, foco visível e contraste adequado.

### 🗂️ Estrutura
```
landing-contabilidade/
├── index.html        # Estrutura semântica
├── css/style.css     # Design system (tokens) + componentes + responsivo
├── js/main.js        # Interações (JS puro, sem dependências)
└── assets/img/       # Imagens
```

### ▶️ Como rodar localmente
```bash
# Opção 1: abra o index.html direto no navegador
# Opção 2: servidor local
python -m http.server 5500
# acesse http://localhost:5500
```

### ⚙️ Como personalizar para um cliente
| O quê | Onde |
|---|---|
| Cores e fontes | variáveis em `:root` no `css/style.css` |
| Número do WhatsApp | `WHATSAPP_NUMBER` em `js/main.js` e no link `#whatsapp-float` |
| Textos, planos e preços | `index.html` (`data-monthly` / `data-yearly`) |

---

## 🇺🇸 English

High-converting landing page for an **accounting firm** (fictional business), built with **vanilla HTML, CSS and JavaScript**: no frameworks, no build step, fast loading.

### ✨ Features
- **Premium dark UI**: gradients, glassmorphism and micro-animations.
- **Fully responsive** (desktop, tablet and mobile) with an accessible mobile menu.
- **Scroll-reveal animations** with `IntersectionObserver`, respecting `prefers-reduced-motion`.
- **Animated stat counters**.
- **Pricing with a monthly/yearly toggle**.
- **FAQ accordion** using native `<details>`, with only one item open at a time.
- **Contact form with validation and a phone mask** that **sends the lead straight to WhatsApp**, so no backend is needed.
- **Floating WhatsApp button**.
- **SEO**: meta tags, Open Graph, structured data (`schema.org/AccountingService`), semantic HTML.
- **Accessibility**: skip link, `aria-*` attributes, visible focus states.

### ▶️ Run locally
```bash
python -m http.server 5500
# open http://localhost:5500
```

---

👤 **João Marcelo** · [GitHub @gattz2020](https://github.com/gattz2020)
Disponível para projetos freelance de landing pages, automação e dados. / *Available for freelance work: landing pages, automation and data.*

> Projeto fictício para portfólio. Nomes, números e depoimentos são ilustrativos.
> *Fictional portfolio project. Names, figures and testimonials are illustrative.*
