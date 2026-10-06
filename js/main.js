/* ==========================================================================
   Vértice Contabilidade — Interações
   Sem dependências: JavaScript puro (ES2020+)
   ========================================================================== */
(() => {
  "use strict";

  const WHATSAPP_NUMBER = "5511999990000";
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header com fundo ao rolar ---------- */
  const header = $("#header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  const menuToggle = $("#menu-toggle");
  const nav = $("#nav");
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  menuToggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  $$("a", nav).forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

  /* ---------- Link ativo conforme a seção visível ---------- */
  const navLinks = $$(".nav__link");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${entry.target.id}`));
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  navLinks.forEach((l) => {
    const section = $(l.getAttribute("href"));
    if (section) sectionObserver.observe(section);
  });
  // Seções sem link no menu: ao passar por elas, nenhum link fica ativo
  ["#inicio", "#sobre", "#contato"].forEach((id) => $(id) && sectionObserver.observe($(id)));

  /* ---------- Animação de entrada (reveal) ---------- */
  const revealEls = $$(".reveal");
  // Escalonamento automático para elementos irmãos
  revealEls.forEach((el) => {
    const siblings = [...el.parentElement.children].filter((c) => c.classList.contains("reveal"));
    const index = siblings.indexOf(el);
    if (index > 0) el.style.setProperty("--delay", `${Math.min(index * 0.08, 0.4)}s`);
  });

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("is-visible");
        obs.unobserve(el);
        // Remove as classes depois da animação para devolver as transições originais (hover dos cards)
        setTimeout(() => {
          el.classList.remove("reveal", "is-visible");
          el.style.removeProperty("--delay");
        }, 1400);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Contadores animados ---------- */
  const formatNumber = (n) => n.toLocaleString("pt-BR");
  const animateCounter = (el) => {
    const target = Number(el.dataset.count);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    if (prefersReducedMotion) {
      el.textContent = `${prefix}${formatNumber(target)}${suffix}`;
      return;
    }
    const duration = 1800;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = `${prefix}${formatNumber(Math.round(target * eased))}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );
  $$("[data-count]").forEach((el) => counterObserver.observe(el));

  /* ---------- Brilho que segue o mouse nos cards de serviço ---------- */
  $$(".service").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });

  /* ---------- Alternância mensal / anual ---------- */
  const billingSwitch = $("#billing-switch");
  const labelMensal = $("#label-mensal");
  const labelAnual = $("#label-anual");
  billingSwitch.addEventListener("click", () => {
    const yearly = billingSwitch.getAttribute("aria-checked") !== "true";
    billingSwitch.setAttribute("aria-checked", String(yearly));
    labelMensal.classList.toggle("is-active", !yearly);
    labelAnual.classList.toggle("is-active", yearly);

    $$(".plan__value").forEach((el) => {
      el.classList.add("is-changing");
      setTimeout(() => {
        el.textContent = yearly ? el.dataset.yearly : el.dataset.monthly;
        el.classList.remove("is-changing");
      }, 200);
    });
  });

  /* ---------- Botões dos planos pré-selecionam o plano no formulário ---------- */
  const planoSelect = $("#plano");
  $$("[data-plan]").forEach((btn) =>
    btn.addEventListener("click", () => {
      planoSelect.value = btn.dataset.plan;
    })
  );

  /* ---------- FAQ: mantém apenas um item aberto ---------- */
  const faqItems = $$(".faq__item");
  faqItems.forEach((item) =>
    item.addEventListener("toggle", () => {
      if (item.open) faqItems.forEach((other) => other !== item && (other.open = false));
    })
  );

  /* ---------- Máscara de telefone ---------- */
  const phoneInput = $("#telefone");
  phoneInput.addEventListener("input", () => {
    const d = phoneInput.value.replace(/\D/g, "").slice(0, 11);
    let masked = d;
    if (d.length > 2) masked = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length > 7) masked = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
    phoneInput.value = masked;
  });

  /* ---------- Toast ---------- */
  const toast = $("#toast");
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 4000);
  };

  /* ---------- Validação do formulário + envio para o WhatsApp ---------- */
  const form = $("#contact-form");
  const validators = {
    nome: (v) => (v.trim().length >= 3 ? "" : "Informe seu nome completo."),
    telefone: (v) => (v.replace(/\D/g, "").length >= 10 ? "" : "Informe um WhatsApp válido com DDD."),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Informe um e-mail válido."),
    regime: (v) => (v ? "" : "Selecione uma opção."),
  };

  const validateField = (input) => {
    const validator = validators[input.name];
    if (!validator) return true;
    const error = validator(input.value);
    const field = input.closest(".field");
    field.classList.toggle("has-error", Boolean(error));
    $(".field__error", field).textContent = error;
    input.setAttribute("aria-invalid", String(Boolean(error)));
    return !error;
  };

  Object.keys(validators).forEach((name) => {
    const input = form.elements[name];
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => input.closest(".field").classList.contains("has-error") && validateField(input));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = Object.keys(validators).map((name) => form.elements[name]);
    const results = inputs.map(validateField);
    if (results.includes(false)) {
      inputs[results.indexOf(false)].focus();
      showToast("⚠️ Confira os campos destacados.");
      return;
    }

    const data = Object.fromEntries(new FormData(form));
    const lines = [
      "Olá! Gostaria de um diagnóstico contábil gratuito.",
      "",
      `*Nome:* ${data.nome}`,
      `*WhatsApp:* ${data.telefone}`,
      `*E-mail:* ${data.email}`,
      `*Situação:* ${data.regime}`,
      data.plano && `*Plano de interesse:* ${data.plano}`,
      data.mensagem && `*Mensagem:* ${data.mensagem}`,
    ].filter((l) => l !== "" && l !== undefined && l !== false);
    lines.splice(1, 0, "");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
    showToast("✅ Tudo certo! Abrindo o WhatsApp…");
    setTimeout(() => window.open(url, "_blank", "noopener"), 700);
    form.reset();
  });

  /* ---------- Ano no rodapé ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
