# INTENTRA — Landing Page

Vanilla JS + HTML + CSS landing page para intentra.io.
Sin frameworks. Sin build step. Sin dependencias externas.
i18n EN/ES nativo. CSP-compliant.

## Archivos
- index.html     — página principal (9 secciones)
- threats.html   — página educativa de vectores de ataque (10 vectores)
- styles.css     — design system compartido por ambas páginas
- app.js         — i18n, animaciones, stat popups, interacciones
- logo.png       — logo estático

## Design System (styles.css)
Tokens en :root — NO hardcodear colores, nunca.
--bg / --bg-surface / --bg-card
--cyan / --deny / --review / --allow
--font-display: Syne | --font-mono: JetBrains Mono | --font-body: Inter
Clases compartidas: .container .btn-primary .btn-ghost .btn-nav
.nav .nav-inner .nav-logo .nav-links .nav-actions .nav-burger
.footer .footer-inner .footer-brand .footer-links .footer-bottom
.font-mono .noise .section .section--dark

## i18n (app.js)
Sistema propio en app.js — objeto STRINGS con claves EN y ES.
Cualquier texto visible en index.html debe tener data-i18n="clave".
threats.html es English-only — NO necesita i18n.
Al agregar texto nuevo a index.html: agregar la clave en ambas locales de STRINGS.

## Reglas no negociables
R1 — Nunca tocar styles.css sin revisar qué clases usa la otra página primero.
R2 — Nunca inline styles en HTML — todo va en styles.css o en <style> de threats.html.
R3 — threats.html tiene su propio <style> local para estilos page-specific.
     No moverlos a styles.css — son estilos que no aplican a index.html.
R4 — El nav y footer de threats.html son copias exactas del de index.html.
     Si cambias el nav/footer en index.html, replicar el cambio en threats.html.
R5 — Logo SVG: 5 rectángulos formando una H con brazo vertical continuo.
     viewBox="0 0 100 121". Nunca reemplazar por otro SVG sin autorización.
R6 — Links entre páginas: index.html usa href="threats.html",
     threats.html usa href="index.html" y href="index.html#section".

## Placeholders pendientes (no inventar valores)
- Chrome Web Store URL → "#install" por ahora
- GitHub repo URL → no existe aún
- og:image → /og-image.png (archivo no creado aún)
- Donation address → "— coming soon —"
- Canonical URL → https://intentra.io (ok) / https://intentra.io/threats.html

## Contexto del producto
Intentra es un Zero-Trust Transaction Firewall para Web3.
Chrome extension (MV3). Intercepta transacciones antes de que lleguen a la wallet.
Competitor principal: Kerberus Sentinel (adquirió Pocket Universe).
Diferenciador clave: policy engine configurable vs enfoque opaco automático.
Tagline: "Intent-Based Transaction Governance"
