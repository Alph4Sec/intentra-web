/* ═══════════════════════════════════════════════════════════
   INTENTRA — app.js
   i18n EN/ES · Nav scroll · Time · Feed simulation
   Vanilla JS — no dependencies — CSP-safe
═══════════════════════════════════════════════════════════ */
'use strict';

/* ── i18n dictionary ── */
const STRINGS = {
  en: {
    nav_how:       'How It Works',
    nav_prot:      'Protection Levels',
    nav_threats:   'Threats',
    nav_compare:   'The Enforcement Difference',
    nav_roadmap:   'Roadmap',
    nav_cta:       'Install Free',

    hero_status:   'POLICY ENGINE ACTIVE',
    hero_status2:  'Ethereum Mainnet',
    hero_eyebrow:  'Zero-Trust Transaction Firewall',
    hero_line1:    'Zero trust',
    hero_line2:    'starts before',
    hero_line3:    'you sign.',
    hero_sub:      'INTENTRA intercepts every transaction before it reaches your wallet — simulates outcomes, enforces your policy, blocks threats. Pre-execution. Local. Zero external calls.',
    hero_cta1:     'Install Chrome Extension',
    hero_cta2:     'See how it works →',
    hero_proof1:   'Free',
    hero_proof2:   'No account required',
    hero_proof3:   'No external data transmission',

    mock_reason1:  'UNLIMITED_APPROVAL detected',
    mock_reason2:  'Contract not in Trusted list',
    mock_reason3:  'Spender unverified',
    mock_decision_label: 'ENFORCEMENT DECISION',
    mock_btn_deny:   '✕ Reject',
    mock_btn_approve: '▶ Approve',
    mock_feed_header: '// Recent decisions',

    stat1_num:   '10',
    stat1_label: 'Threat vectors covered',
    stat2_num:   '3',
    stat2_label: 'Enforcement modes',
    stat3_num:   '1',
    stat3_label: 'Supported chains',
    stat4_num:   '100%',
    stat4_label: 'Local enforcement',
    stat5_num:   '0%',
    stat5_label: 'Fee on transactions',

    pthr_eyebrow: 'THREAT COVERAGE — V1',
    pthr_title:   '10 Threat Vectors Covered',
    pthr_g1:  'APPROVAL &amp; PERMIT ABUSE',
    pthr_r1:  'Unlimited token approvals (MAX_UINT256) — covers both <code>approve</code> and <code>permit</code> tx types',
    pthr_r2:  'Permit signatures with excessive TTL — intercepts <code>signTypedData_v4</code>, evaluates deadline',
    pthr_g2:  'VELOCITY &amp; AUTOMATION ATTACKS',
    pthr_r3:  'Automated drain scripts — kill switch auto-activates on TX/min threshold breach',
    pthr_r4:  'Proxy Upgrade Attack — delegatecall patterns and upgradeable proxy signatures flagged before signing',
    pthr_g3:  'VALUE &amp; TRANSFER RISK',
    pthr_r5:  'High-value native ETH transfers — flags single transfers above configured threshold',
    pthr_r6:  'Daily spending cap — transactions are blocked automatically when aggregate daily ETH spending exceeds your configured limit.',
    pthr_g4:  'CONTRACT RISK',
    pthr_r7:  'First-time interaction with unknown contract — backed by interaction history + seed whitelist',
    pthr_r8:  'High-value calls to unverified contracts — triggers when ETH value exceeds contract call threshold',
    pthr_r9:  'Any contract call in Paranoid mode — all CONTRACT_CALL txs require explicit review',
    pthr_g5:  'EIP-7702',
    pthr_r10: 'Destination wallet delegated via EIP-7702 — reads <code>eth_getCode</code>, detects <code>0xef0100</code> prefix',

    psrv_eyebrow:    'ARCHITECTURE',
    psrv_title:      'EVM Chain Support',
    psrv_lead:       'Intentra is engineered for EVM-compatible chains. V1 ships with full Ethereum Mainnet coverage. Multi-chain expansion coming in V2.',
    psrv_col_chain:  'Chain',
    psrv_col_status: 'Status',
    psrv_eth_status: '✅ Live — V1',
    psrv_v2_status:  '🔜 V2',
    psrv_note:       'Intentra works on any EVM-compatible chain with no extra setup. New chains are added without affecting your existing protection rules.',

    ploc_eyebrow:    'ARCHITECTURE',
    ploc_title:      'Your Protection Runs Locally',
    ploc_lead:       'Every decision Intentra makes happens inside your browser. Intentra never has access to your private keys or funds.',
    ploc_col1:       'Component',
    ploc_col2:       'Where it runs',
    ploc_col3:       'Status',
    ploc_c1:         'Policy engine',
    ploc_c2:         'Contract whitelist',
    ploc_c3:         'Transaction history',
    ploc_c4:         'RPC calls',
    ploc_c5:         'Intentra analytics',
    ploc_c6:         'Reputation APIs',
    ploc_device:     'Your device, privately',
    ploc_wallet_rpc: 'Your wallet\'s RPC',
    ploc_s_local:    '✓ Local',
    ploc_s_rpc:      '↑ Your RPC',
    ploc_s_never:    '✕ Never',
    ploc_wcol:       'Wallet',
    ploc_any_wallet: 'Any EVM browser wallet',
    ploc_s_supported:'✓ Supported',
    ploc_note:       'Works with EVM-compatible browser wallets. The only external calls are to your wallet\'s RPC provider — the same calls your wallet already makes.',

    pfee_eyebrow:       'BUSINESS MODEL',
    pfee_title:         '0% Fee. Always.',
    pfee_lead:          'INTENTRA charges zero fees on transactions. No basis points, no commission. V1 is free to install and free to use.',
    pfee_compare_line:  'Other security tools charge a commission on every transaction. Intentra charges 0%.',
    pfee_donate_label:  'SUPPORT DEVELOPMENT',
    pfee_donate_text:  'Your contribution strengthens the security engine for everyone — faster threat detection, broader coverage, and stronger protection across the entire network.',
    pfee_addr_label:   'EVM Address',

    how_label:  '— 01 / HOW IT WORKS —',
    how_title1: 'Every transaction.',
    how_title2: 'Evaluated before it signs.',
    how_sub:    'INTENTRA sits between the dApp and your wallet. Every call goes through the engine — no exceptions, no bypasses.',

    pipe1_title: 'Intercept',
    pipe1_desc:  'Provider-level hook overrides window.ethereum via EIP-1193. Every eth_sendTransaction, signature request, and typed data call is captured before reaching the wallet.',
    pipe1_s1:    'EIP-1193 + EIP-6963 support',
    pipe1_s2:    'Payload capture at browser level',
    pipe1_s3:    'Transparent to dApp',

    pipe2_title: 'Simulate',
    pipe2_desc:  'Preflight execution against current on-chain state. Calldata is decoded to determine expected token movements and approval grants.',
    pipe2_s1:    'INTENT PARSING + OUTCOME MODELING',
    pipe2_s2:    'APPROVAL GRANT ANALYSIS',

    pipe3_title: 'Enforce',
    pipe3_desc:  'Policy evaluation against your active mode. Three deterministic outcomes: Allow, Review, or Deny. Out-of-policy transactions are blocked before the wallet signing prompt appears.',
    pipe3_s1:    'ZERO-TRUST EVALUATION',
    pipe3_s2:    'PERMISSIVE: MONITOR + ALWAYS-ON PROTECTIONS',
    pipe3_s3:    'BALANCED: ENFORCE ON SUSPICIOUS PATTERNS',
    pipe3_s4:    'PARANOID: REVIEW ON EVERY CONTRACT CALL',
    pipe3_s5:    'CASUAL / TRADER / WHALE PROTECTION PROFILES',
    pipe3_s6:    'CORE PROTECTIONS ALWAYS ON',

    pipe_note:   '// Intentra never has access to your private keys or funds.',

    prot_label:  '— 02 / PROTECTION LEVELS —',
    prot_title1: 'Built for how you actually use DeFi.',
    prot_sub:    'Choose how Intentra reacts, and how much risk you\'re willing to take.',

    prot_modes_heading: 'How Intentra reacts',
    sm1_name: 'Permissive',
    sm1_desc: 'Logs everything and lets most transactions through. Critical threats — velocity attacks, unlimited approvals, daily cap breaches — are still blocked automatically. Built for developers who want full visibility.',
    sm1_tag:  'For testing and advanced users',

    sm2_name: 'Balanced',
    sm2_rec:  'RECOMMENDED',
    sm2_desc: 'Blocks high-risk transactions automatically. Flags suspicious patterns for your review before anything is signed.',
    sm2_tag:  'Default — best for most DeFi users',

    sm3_name: 'Paranoid',
    sm3_desc: 'Every contract interaction — even ones you\'ve approved before — goes through a review overlay. Nothing passes silently.',
    sm3_tag:  'For high-value wallets and cautious users',

    prot_prof_heading: 'Set your risk tolerance',
    pp1_name:  'Casual',
    pp1_desc:  'I use DeFi occasionally. Tighter limits, more alerts.',
    pp1_thresh: '0.5 ETH/tx · 0.2 ETH contract calls · $500 approval alert<br>2 ETH daily cap · 3 tx/min · 4h max permit',

    pp2_name:  'Trader',
    pp2_rec:   'DEFAULT',
    pp2_desc:  'I\'m active in DeFi regularly. Balanced defaults for most users.',
    pp2_thresh: '2 ETH/tx · 0.5 ETH contract calls · $5,000 approval alert<br>10 ETH daily cap · 5 tx/min · 24h max permit',

    pp3_name:  'Whale',
    pp3_desc:  'I move large amounts regularly. Higher limits, less friction.',
    pp3_thresh: '20 ETH/tx · 5 ETH contract calls · $50,000 approval alert<br>100 ETH daily cap · 10 tx/min · 72h max permit',

    prot_cta: 'Casual, Trader, and Whale are starting points — every threshold is fully adjustable. Dial in exactly the protection level that fits your workflow.',

    comp_label:  '— 03 / THE ENFORCEMENT DIFFERENCE —',
    comp_title1: "Warnings don't stop",
    comp_sub:    'A warning only works if you read it, understand it, and act on it correctly — every single time. Intentra removes that requirement.',
    comp_col0:   'Dimension',
    comp_col1:   'Warning-Based Tools',
    comp_col2:   'INTENTRA',
    comp_dim1:   'Evaluation',
    comp1_bad:   'Heuristic signals. Output is a warning, not a decision.',
    comp1_good:  'Clear rules you set. Output is a block, a review, or a pass.',
    comp_dim2:   'Outcome',
    comp2_bad:   'User must abort manually after interpreting the alert.',
    comp2_good:  'Risky transactions blocked or flagged before you sign anything.',
    comp_dim3:   'Control',
    comp3_bad:   'No control. The tool decides for you.',
    comp3_good:  "You're always in control. Review or override any decision.",
    comp_dim4:   'Fee',
    comp4_bad:   'Some charge up to 0.8% on every swap intercepted.',
    comp4_good:  'No fee on your transactions. Ever.',
    comp_dim5:   'Trust Model',
    comp5_bad:   'Correct human judgment under adversarial pressure.',
    comp5_good:  'You set the rules. Intentra enforces them automatically.',

    road_label:   '— 04 / ROADMAP —',
    road_title1:  'V1 is live.',
    road_title2:  ' The engine evolves.',
    road_sub:     'V1 is live. Every transaction you sign is evaluated before it reaches your wallet. The roadmap moves enforcement closer to execution — from the browser to the account layer.',
    road_done:    '✓ V1 — LIVE',
    road_next:       '→ V1.5 — NEXT',
    road_planned:    '○ PLANNED',
    road_v2_status:  '→ V2 — PLANNED',
    road_v3_status:  '◇ VISION',

    road1_title: 'Policy Firewall — Chrome Extension',
    road1_desc:  'EIP-1193 interception, configurable policy engine, proxy detection, velocity kill switch, 10 threat vectors, local enforcement.',
    road2_title: 'Session Key Auditor',
    road2_desc:  'EIP-7702 and ERC-4337 let dApps request delegated signing authority over your account. Intentra evaluates the spend limit, duration, and permission scope of every session key before you authorize it.',
    road3_title: 'Full-Spectrum Coverage',
    road3_desc:  'ERC-20 transfer enforcement and complete EIP-7702 delegation coverage. V2 closes the gaps that V1 leaves open — token-level drain detection, full type-0x04 interception, and transaction simulation across the internal call tree.',
    road4_title: 'Threat Intelligence Network',
    road4_desc:  'Every Intentra user is a sensor. V3 aggregates enforcement data across the network to build a live threat intelligence layer — tracking emerging attack patterns, flagging new malicious contracts, and feeding that intelligence back into the engine before attacks go mainstream.',

    cta_label:  '— INSTALL —',
    cta_title1: 'Your wallet signs.',
    cta_title2: 'INTENTRA decides first.',
    cta_sub:    'Free Chrome extension. No account. No subscription. No transaction fees. Local enforcement — your policy, your browser, your rules.',
    cta_btn1:   'Add to Chrome — Free',

    nav_faq:    'FAQ',

    faq_label:  '— FAQ —',
    faq_title:  'Frequently Asked Questions',
    faq_q1:     'Does Intentra have access to my wallet or private keys?',
    faq_a1:     'No. Intentra only intercepts JSON-RPC calls before they reach your wallet. It never touches your keys, seed phrase, or balance.',
    faq_q2:     'Do my transactions pass through your servers?',
    faq_a2:     'No. All enforcement happens locally in your browser. No transaction data ever leaves your device.',
    faq_q3:     'Does it work with any wallet?',
    faq_a3:     'It works with any wallet that uses window.ethereum — MetaMask, Rabby, Brave Wallet, and others. It does not cover WalletConnect flows or transactions initiated directly from the wallet popup.',
    faq_q4:     'Does it block every transaction or just dangerous ones?',
    faq_a4:     'Only transactions that violate your policy. Normal transactions pass through without interruption.',
    faq_q5:     'What if Intentra blocks something I actually want to do?',
    faq_a5:     'You can adjust your thresholds, add the contract to your trusted list, or temporarily switch to Permissive mode.',
    faq_q6:     'Is it free forever?',
    faq_a6:     'V1 is completely free. No account, no subscription, no transaction fees.',
    faq_q7:     'How do you make money then?',
    faq_a7:     'Advanced V2 features will be available as an optional subscription — never a percentage of your transactions.',
    faq_q8:     'Which networks does it support?',
    faq_a8:     'Ethereum Mainnet and Sepolia testnet. Multi-chain support is on the roadmap.',

    footer_tagline: 'Zero-Trust Transaction Firewall for Web3',
    footer_how:     'How it works',
    footer_threats: 'Threats covered',
    footer_comp:    'Comparison',
    footer_road:    'Roadmap',
    footer_install: 'Install',
    footer_rights:  'All rights reserved.',
    footer_build:   'Built with zero trust.',
  },

  es: {
    nav_how:      'Cómo Funciona',
    nav_prot:     'Niveles de Protección',
    nav_threats:  'Amenazas',
    nav_compare:  'La Diferencia de Imposición',
    nav_roadmap:  'Hoja de Ruta',
    nav_cta:      'Instalar Gratis',

    hero_status:  'MOTOR DE POLÍTICAS ACTIVO',
    hero_status2: 'Ethereum Mainnet',
    hero_eyebrow: 'Firewall de Transacciones Zero-Trust',
    hero_line1:   'Zero trust',
    hero_line2:   'empieza antes',
    hero_line3:   'de firmar.',
    hero_sub:     'INTENTRA intercepta cada transacción antes de que llegue a tu wallet — simula resultados, aplica tu política, bloquea amenazas. Pre-ejecución. Local. Sin llamadas externas.',
    hero_cta1:    'Instalar Extensión Chrome',
    hero_cta2:    'Ver cómo funciona →',
    hero_proof1:  'Gratis',
    hero_proof2:  'Sin cuenta requerida',
    hero_proof3:  'Sin transmisión de datos externos',

    mock_reason1: 'UNLIMITED_APPROVAL detectado',
    mock_reason2: 'Contrato no en lista de confianza',
    mock_reason3: 'Spender no verificado',
    mock_decision_label: 'DECISIÓN DE IMPOSICIÓN',
    mock_btn_deny:   '✕ Rechazar',
    mock_btn_approve: '▶ Aprobar',
    mock_feed_header: '// Decisiones recientes',

    stat1_num:   '10',
    stat1_label: 'Vectores de amenaza cubiertos',
    stat2_num:   '3',
    stat2_label: 'Modos de imposición',
    stat3_num:   '1',
    stat3_label: 'Cadenas soportadas',
    stat4_num:   '100%',
    stat4_label: 'Imposición local',
    stat5_num:   '0%',
    stat5_label: 'Comisión en transacciones',

    pthr_eyebrow: 'COBERTURA DE AMENAZAS — V1',
    pthr_title:   '10 Vectores de Amenaza Cubiertos',
    pthr_g1:  'ABUSO DE APROBACIONES Y PERMITS',
    pthr_r1:  'Aprobaciones de tokens ilimitadas (MAX_UINT256) — cubre tanto <code>approve</code> como <code>permit</code>',
    pthr_r2:  'Firmas Permit con TTL excesivo — intercepta <code>signTypedData_v4</code>, evalúa el deadline',
    pthr_g2:  'ATAQUES DE VELOCIDAD Y AUTOMATIZACIÓN',
    pthr_r3:  'Scripts de drenaje automatizados — el kill switch se activa automáticamente al superar el umbral de TX/min',
    pthr_r4:  'Ataque de Actualización de Proxy — patrones delegatecall y firmas proxy actualizables detectados antes de firmar',
    pthr_g3:  'RIESGO DE VALOR Y TRANSFERENCIA',
    pthr_r5:  'Transferencias nativas de ETH de alto valor — marca transferencias por encima del umbral configurado',
    pthr_r6:  'Límite de gasto diario — las transacciones se bloquean automáticamente cuando el gasto diario acumulado de ETH supera tu límite configurado.',
    pthr_g4:  'RIESGO DE CONTRATO',
    pthr_r7:  'Primera interacción con contrato desconocido — respaldada por historial de interacciones + whitelist semilla',
    pthr_r8:  'Llamadas de alto valor a contratos no verificados — se activa cuando el valor ETH supera el umbral de llamada a contrato',
    pthr_r9:  'Cualquier llamada a contrato en modo Paranoid — todos los tx CONTRACT_CALL requieren revisión explícita',
    pthr_g5:  'EIP-7702',
    pthr_r10: 'Wallet destino delegada vía EIP-7702 — lee <code>eth_getCode</code>, detecta prefijo <code>0xef0100</code>',

    psrv_eyebrow:    'ARQUITECTURA',
    psrv_title:      'Soporte de Cadenas EVM',
    psrv_lead:       'Intentra está diseñado para cadenas compatibles con EVM. V1 viene con cobertura completa de Ethereum Mainnet. Expansión multi-chain en V2.',
    psrv_col_chain:  'Cadena',
    psrv_col_status: 'Estado',
    psrv_eth_status: '✅ Activo — V1',
    psrv_v2_status:  '🔜 V2',
    psrv_note:       'Intentra funciona en cualquier cadena compatible con EVM sin configuración adicional. Las nuevas cadenas se añaden sin afectar tus reglas de protección existentes.',

    ploc_eyebrow:    'ARQUITECTURA',
    ploc_title:      'Tu Protección Se Ejecuta Localmente',
    ploc_lead:       'Cada decisión que toma Intentra ocurre dentro de tu navegador. Intentra nunca tiene acceso a tus claves privadas ni a tus fondos.',
    ploc_col1:       'Componente',
    ploc_col2:       'Dónde se ejecuta',
    ploc_col3:       'Estado',
    ploc_c1:         'Motor de políticas',
    ploc_c2:         'Lista blanca de contratos',
    ploc_c3:         'Historial de transacciones',
    ploc_c4:         'Llamadas RPC',
    ploc_c5:         'Análisis de Intentra',
    ploc_c6:         'APIs de reputación',
    ploc_device:     'Tu dispositivo, en privado',
    ploc_wallet_rpc: 'RPC de tu wallet',
    ploc_s_local:    '✓ Local',
    ploc_s_rpc:      '↑ Tu RPC',
    ploc_s_never:    '✕ Nunca',
    ploc_wcol:       'Wallet',
    ploc_any_wallet: 'Cualquier wallet EVM de navegador',
    ploc_s_supported:'✓ Compatible',
    ploc_note:       'Funciona con wallets EVM de navegador. Las únicas llamadas externas son al proveedor RPC de tu wallet — las mismas llamadas que tu wallet ya realiza.',

    pfee_eyebrow:       'MODELO DE NEGOCIO',
    pfee_title:         '0% de Comisión. Siempre.',
    pfee_lead:          'INTENTRA cobra cero comisiones en transacciones. Sin puntos básicos, sin comisión. V1 es gratuito para instalar y gratuito para usar.',
    pfee_compare_line:  'Otras herramientas de seguridad cobran comisión en cada transacción. Intentra cobra 0%.',
    pfee_donate_label:  'APOYA EL DESARROLLO',
    pfee_donate_text:  'Tu contribución fortalece el motor de seguridad para todos — detección de amenazas más rápida, mayor cobertura y protección más sólida en toda la red.',
    pfee_addr_label:   'Dirección EVM',

    how_label:  '— 01 / CÓMO FUNCIONA —',
    how_title1: 'Cada transacción.',
    how_title2: 'Evaluada antes de firmar.',
    how_sub:    'INTENTRA se sitúa entre la dApp y tu wallet. Cada llamada pasa por el motor — sin excepciones, sin bypasses.',

    pipe1_title: 'Interceptar',
    pipe1_desc:  'Hook a nivel de proveedor anula window.ethereum vía EIP-1193. Cada eth_sendTransaction, solicitud de firma y typed data es capturado antes de llegar a la wallet.',
    pipe1_s1:    'Soporte EIP-1193 + EIP-6963',
    pipe1_s2:    'Captura de payload a nivel navegador',
    pipe1_s3:    'Transparente para la dApp',

    pipe2_title: 'Simular',
    pipe2_desc:  'Ejecución preflight contra el estado actual on-chain. El calldata se decodifica para determinar movimientos de tokens esperados y autorizaciones.',
    pipe2_s1:    'ANÁLISIS DE INTENT + MODELADO DE RESULTADO',
    pipe2_s2:    'ANÁLISIS DE APROBACIONES',

    pipe3_title: 'Imponer',
    pipe3_desc:  'Evaluación de política según tu modo activo. Tres resultados deterministas: Allow, Review o Deny. Las transacciones fuera de política se bloquean antes de que aparezca la firma de la wallet.',
    pipe3_s1:    'EVALUACIÓN ZERO-TRUST',
    pipe3_s2:    'PERMISSIVE: MONITOREO + PROTECCIONES SIEMPRE ACTIVAS',
    pipe3_s3:    'BALANCED: ENFORCEMENT EN PATRONES SOSPECHOSOS',
    pipe3_s4:    'PARANOID: REVIEW EN CADA LLAMADA A CONTRATO',
    pipe3_s5:    'PERFILES DE PROTECCIÓN: CASUAL / TRADER / WHALE',
    pipe3_s6:    'PROTECCIONES CORE SIEMPRE ACTIVAS',

    pipe_note:   '// Intentra nunca tiene acceso a tus claves privadas ni a tus fondos.',

    prot_label:  '— 02 / NIVELES DE PROTECCIÓN —',
    prot_title1: 'Diseñado para cómo realmente usas DeFi.',
    prot_sub:    'Elige cómo reacciona Intentra y cuánto riesgo estás dispuesto a asumir.',

    prot_modes_heading: 'Cómo reacciona Intentra',
    sm1_name: 'Permissive',
    sm1_desc: 'Registra todo y deja pasar la mayoría de transacciones. Las amenazas críticas — ataques de velocidad, aprobaciones ilimitadas, límite diario — siguen bloqueándose automáticamente. Para desarrolladores que quieren visibilidad total.',
    sm1_tag:  'Para pruebas y usuarios avanzados',

    sm2_name: 'Balanced',
    sm2_rec:  'RECOMENDADO',
    sm2_desc: 'Bloquea transacciones de alto riesgo automáticamente. Marca patrones sospechosos para tu revisión antes de firmar.',
    sm2_tag:  'Predeterminado — el mejor para la mayoría de usuarios DeFi',

    sm3_name: 'Paranoid',
    sm3_desc: 'Cada interacción con contratos — incluso las que ya aprobaste antes — pasa por el overlay de revisión. Nada pasa en silencio.',
    sm3_tag:  'Para wallets de alto valor y usuarios cautelosos',

    prot_prof_heading: 'Define tu tolerancia al riesgo',
    pp1_name:  'Casual',
    pp1_desc:  'Uso DeFi ocasionalmente. Límites más estrictos, más alertas.',
    pp1_thresh: '0.5 ETH/tx · 0.2 ETH llamadas a contratos · $500 alerta de aprobación<br>2 ETH límite diario · 3 tx/min · 4h permit máx',

    pp2_name:  'Trader',
    pp2_rec:   'PREDETERMINADO',
    pp2_desc:  'Soy activo en DeFi regularmente. Valores predeterminados balanceados para la mayoría.',
    pp2_thresh: '2 ETH/tx · 0.5 ETH llamadas a contratos · $5,000 alerta de aprobación<br>10 ETH límite diario · 5 tx/min · 24h permit máx',

    pp3_name:  'Whale',
    pp3_desc:  'Muevo grandes cantidades regularmente. Límites más altos, menos fricción.',
    pp3_thresh: '20 ETH/tx · 5 ETH llamadas a contratos · $50,000 alerta de aprobación<br>100 ETH límite diario · 10 tx/min · 72h permit máx',

    prot_cta: 'Casual, Trader y Whale son puntos de partida — cada límite es completamente ajustable. Configura exactamente el nivel de protección que se adapta a tu forma de usar DeFi.',

    comp_label:  '— 03 / LA DIFERENCIA DE IMPOSICIÓN —',
    comp_title1: 'Las alertas no detienen',
    comp_sub:    'Una alerta solo funciona si la lees, la entiendes y actúas correctamente — cada vez. Intentra elimina ese requisito.',
    comp_col0:   'Dimensión', comp_col1: 'Herramientas de Advertencia', comp_col2: 'INTENTRA',
    comp_dim1:   'Evaluación',
    comp1_bad:   'Señales heurísticas. El output es una advertencia, no una decisión.',
    comp1_good:  'Reglas claras que tú defines. El resultado es un bloqueo, revisión o paso.',
    comp_dim2:   'Resultado',
    comp2_bad:   'El usuario debe abortar manualmente tras interpretar la alerta.',
    comp2_good:  'Transacciones riesgosas bloqueadas o marcadas antes de que firmes.',
    comp_dim3:   'Control',
    comp3_bad:   'Sin control. La herramienta decide por ti.',
    comp3_good:  'Siempre en control. Revisa o anula cualquier decisión.',
    comp_dim4:   'Comisión',
    comp4_bad:   'Algunos cobran hasta 0.8% en cada swap interceptado.',
    comp4_good:  'Sin comisión en tus transacciones. Nunca.',
    comp_dim5:   'Modelo de Confianza',
    comp5_bad:   'Juicio humano correcto bajo presión adversarial.',
    comp5_good:  'Tú defines las reglas. Intentra las impone automáticamente.',

    road_label:   '— 04 / HOJA DE RUTA —',
    road_title1:  'V1 está en producción.',
    road_title2:  ' El motor evoluciona.',
    road_sub:     'V1 está en producción. Cada transacción que firmas se evalúa antes de llegar a tu wallet. La hoja de ruta acerca la imposición a la ejecución — del navegador a la capa de cuenta.',
    road_done:       '✓ V1 — EN PRODUCCIÓN',
    road_next:       '→ V1.5 — PRÓXIMO',
    road_planned:    '○ PLANIFICADO',
    road_v2_status:  '→ V2 — PLANIFICADO',
    road_v3_status:  '◇ VISIÓN',

    road1_title: 'Firewall de Políticas — Extensión Chrome',
    road1_desc:  'Interceptación EIP-1193, motor de políticas configurable, detección de proxy, kill switch de velocidad, 10 vectores de amenaza, imposición local.',
    road2_title: 'Auditor de Session Keys',
    road2_desc:  'EIP-7702 y ERC-4337 permiten que las dApps soliciten autoridad de firma delegada sobre tu cuenta. Intentra evalúa el límite de gasto, duración y alcance de permisos de cada session key antes de que la autorices.',
    road3_title: 'Cobertura de Espectro Completo',
    road3_desc:  'Imposición de transferencias ERC-20 y cobertura completa de delegación EIP-7702. V2 cierra las brechas que V1 deja abiertas — detección de drenaje a nivel token, intercepción completa de type-0x04 y simulación de transacciones en el árbol de llamadas internas.',
    road4_title: 'Red de Inteligencia de Amenazas',
    road4_desc:  'Cada usuario de Intentra es un sensor. V3 agrega datos de imposición en toda la red para construir una capa de inteligencia de amenazas en vivo — rastreando patrones de ataque emergentes, marcando nuevos contratos maliciosos y retroalimentando esa inteligencia al motor antes de que los ataques se generalicen.',

    cta_label:  '— INSTALAR —',
    cta_title1: 'Tu wallet firma.',
    cta_title2: 'INTENTRA decide primero.',
    cta_sub:    'Extensión Chrome gratuita. Sin cuenta. Sin suscripción. Sin comisiones. Imposición local — tus reglas, tu navegador, tu política.',
    cta_btn1:   'Agregar a Chrome — Gratis',

    footer_tagline: 'Firewall de Transacciones Zero-Trust para Web3',
    footer_how:     'Cómo funciona',
    nav_faq:    'FAQ',

    faq_label:  '— PREGUNTAS FRECUENTES —',
    faq_title:  'Preguntas Frecuentes',
    faq_q1:     '¿Intentra tiene acceso a mi wallet o claves privadas?',
    faq_a1:     'No. Intentra solo intercepta llamadas JSON-RPC antes de que lleguen a tu wallet. Nunca toca tus claves, frase semilla ni balance.',
    faq_q2:     '¿Mis transacciones pasan por vuestros servidores?',
    faq_a2:     'No. Toda la imposición ocurre localmente en tu navegador. Ningún dato de transacción sale jamás de tu dispositivo.',
    faq_q3:     '¿Funciona con cualquier wallet?',
    faq_a3:     'Funciona con cualquier wallet que use window.ethereum — MetaMask, Rabby, Brave Wallet y otros. No cubre flujos WalletConnect ni transacciones iniciadas directamente desde el popup de la wallet.',
    faq_q4:     '¿Bloquea todas las transacciones o solo las peligrosas?',
    faq_a4:     'Solo las transacciones que violan tu política. Las transacciones normales pasan sin interrupción.',
    faq_q5:     '¿Qué pasa si Intentra bloquea algo que realmente quiero hacer?',
    faq_a5:     'Puedes ajustar tus umbrales, agregar el contrato a tu lista de confianza o cambiar temporalmente al modo Permisivo.',
    faq_q6:     '¿Es gratuito para siempre?',
    faq_a6:     'V1 es completamente gratuito. Sin cuenta, sin suscripción, sin comisiones.',
    faq_q7:     '¿Cómo ganáis dinero entonces?',
    faq_a7:     'Las funciones avanzadas de V2 estarán disponibles como suscripción opcional — nunca un porcentaje de tus transacciones.',
    faq_q8:     '¿Qué redes soporta?',
    faq_a8:     'Ethereum Mainnet y testnet Sepolia. El soporte multi-chain está en el roadmap.',

    footer_threats: 'Amenazas cubiertas',
    footer_comp:    'Comparación',
    footer_road:    'Hoja de ruta',
    footer_install: 'Instalar',
    footer_rights:  'Todos los derechos reservados.',
    footer_build:   'Construido con zero trust.',
  }
};

/* ── State ── */
let currentLang = localStorage.getItem('intentra_lang') || 'en';

/* ── Apply i18n ── */
function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('intentra_lang', lang);
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('data-lang', lang);

  const dict = STRINGS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // Update lang toggle button
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = lang === 'en' ? 'EN / ES' : 'ES / EN';
}

/* ── Language toggle ── */
document.getElementById('langToggle')?.addEventListener('click', () => {
  applyLang(currentLang === 'en' ? 'es' : 'en');
});


/* ── Nav scroll behavior ── */
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 80) {
    nav?.classList.add('nav--scrolled');
  } else {
    nav?.classList.remove('nav--scrolled');
  }
  lastScroll = current;
}, { passive: true });

/* ── Mobile burger ── */
const burger = document.getElementById('navBurger');
const navLinks = document.querySelector('.nav-links');

burger?.addEventListener('click', () => {
  const expanded = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', String(!expanded));
  navLinks?.classList.toggle('nav-links--open');
});

/* ── Smooth scroll for anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      navLinks?.classList.remove('nav-links--open');
    }
  });
});

/* ── Scroll-triggered fade-up animations ── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.pipe-step, .threat-card, .road-item, .mode-card, .stat-item').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

/* ── Live feed simulation ── */
const FEED_EVENTS = [
  { verdict: 'allow',  method: 'swap()',             proto: 'Uniswap V3'  },
  { verdict: 'deny',   method: 'approve(MAX_UINT256)', proto: 'Unknown'  },
  { verdict: 'allow',  method: 'transfer()',          proto: 'USDC'       },
  { verdict: 'review', method: 'setApprovalForAll()', proto: 'Unknown'   },
  { verdict: 'allow',  method: 'deposit()',           proto: 'Aave V3'   },
  { verdict: 'deny',   method: 'execute(bytes)',       proto: 'Unknown'  },
  { verdict: 'allow',  method: 'addLiquidity()',       proto: 'Uniswap'  },
  { verdict: 'review', method: 'permit()',             proto: 'Permit2'  },
  { verdict: 'allow',  method: 'stake()',              proto: 'Lido'     },
  { verdict: 'deny',   method: 'transferFrom()',       proto: '0xdead…'  },
];

let feedIndex = 0;

function addFeedItem() {
  const feedList = document.getElementById('feedList');
  if (!feedList) return;

  const MAX_ITEMS = 3;
  const event = FEED_EVENTS[feedIndex % FEED_EVENTS.length];
  feedIndex++;

  const now = new Date();
  const time = now.toISOString().slice(11, 19);

  // Remove excess BEFORE inserting
  while (feedList.children.length >= MAX_ITEMS) {
    feedList.removeChild(feedList.lastChild);
  }

  const item = document.createElement('div');
  item.className = 'feed-item';
  item.style.opacity = '0';
  item.style.transition = 'opacity 0.4s ease';
  item.innerHTML = `
    <span class="feed-verdict feed-verdict--${event.verdict} font-mono">${event.verdict.toUpperCase()}</span>
    <span class="feed-method font-mono">${event.method}</span>
    <span class="feed-proto font-mono">${event.proto}</span>
    <span class="feed-time font-mono">${time}</span>
  `;

  feedList.insertBefore(item, feedList.firstChild);
  requestAnimationFrame(() => { item.style.opacity = '1'; });
}

// Start feed after 2s, then every 3-5s
setTimeout(() => {
  addFeedItem();
  setInterval(() => {
    addFeedItem();
  }, 3000 + Math.random() * 2000);
}, 2000);

/* ── Mockup cycling animation ── */
const MOCK_SCENARIOS = [
  {
    badge:    'INTERCEPTING',
    badgeColor: 'deny',
    label:   'TRANSACTION INTERCEPTED',
    method:  'approve(address,uint256)',
    methodColor: 'deny',
    contract: '0x1f98…1234 <span class="mock-tag">UNKNOWN</span>',
    spender:  '0xdeadbeef…cafe',
    amount:   'MAX_UINT256 ⚠',
    amountClass: 'text-deny',
    reasons: ['UNLIMITED_APPROVAL detected', 'Contract not in Trusted list', 'Spender unverified'],
    verdict: 'DENY',
    verdictClass: 'deny-pulse',
    verdictColor: 'var(--deny)',
  },
  {
    badge:    'EVALUATING',
    badgeColor: 'review',
    label:   'TRANSACTION INTERCEPTED',
    method:  'setApprovalForAll(address,bool)',
    methodColor: 'review',
    contract: '0x9f8f…abcd <span class="mock-tag">NEW</span>',
    spender:  '0x7fa8…3322',
    amount:   'true (all tokens)',
    amountClass: 'review-color',
    reasons: ['setApprovalForAll detected', 'Contract age < 7 days'],
    verdict: 'REVIEW',
    verdictClass: '',
    verdictColor: 'var(--review)',
  },
  {
    badge:    'CLEARED',
    badgeColor: 'allow',
    label:   'TRANSACTION CLEARED',
    method:  'swap(uint256,address)',
    methodColor: 'accent',
    contract: '0xe592…0000 <span class="mock-tag" style="color:var(--allow);background:rgba(0,214,143,0.1);border-color:rgba(0,214,143,0.2)">TRUSTED</span>',
    spender:  'Uniswap V3 Router',
    amount:   '1,500 USDC',
    amountClass: '',
    reasons: [],
    verdict: 'ALLOW',
    verdictClass: '',
    verdictColor: 'var(--allow)',
  },
];

let scenarioIndex = 0;

function cycleMockup() {
  scenarioIndex = (scenarioIndex + 1) % MOCK_SCENARIOS.length;
  const s = MOCK_SCENARIOS[scenarioIndex];

  const badge    = document.getElementById('mockupBadge');
  const method   = document.getElementById('mockMethod');
  const contract = document.getElementById('mockContract');
  const spender  = document.getElementById('mockSpender');
  const amount   = document.getElementById('mockAmount');
  const verdict  = document.getElementById('mockVerdict');
  const reasons  = document.getElementById('mockReasons');

  if (!badge || !method || !verdict) return;

  badge.textContent = '● ' + s.badge;
  badge.style.color = s.badgeColor === 'deny' ? 'var(--deny)'
                     : s.badgeColor === 'review' ? 'var(--review)'
                     : 'var(--allow)';

  if (method) {
    method.textContent = s.method;
    method.className = 'mock-val font-mono ' + (s.methodColor === 'deny' ? 'text-deny' : s.methodColor === 'review' ? 'review-color' : 'text-accent');
  }
  if (contract) contract.innerHTML = s.contract;
  if (spender) spender.textContent = s.spender;
  if (amount) {
    amount.textContent = s.amount;
    amount.className = 'mock-val font-mono ' + s.amountClass;
  }

  // Update reasons
  if (reasons) {
    reasons.innerHTML = '';
    if (s.reasons.length === 0) {
      const item = document.createElement('div');
      item.className = 'mock-reason mock-reason--active';
      item.innerHTML = '<span class="reason-icon" style="background:rgba(0,214,143,0.1);border-color:rgba(0,214,143,0.2);color:var(--allow)">✓</span><span class="font-mono">All policy checks passed</span>';
      reasons.appendChild(item);
    } else {
      s.reasons.forEach((r, i) => {
        const item = document.createElement('div');
        item.className = 'mock-reason';
        item.innerHTML = `<span class="reason-icon">×</span><span class="font-mono">${r}</span>`;
        reasons.appendChild(item);
        setTimeout(() => item.classList.add('mock-reason--active'), i * 150);
      });
    }
  }

  verdict.textContent = s.verdict;
  verdict.style.color = s.verdictColor;
  verdict.className = 'mock-decision-value font-mono ' + s.verdictClass;
}

// Cycle mockup every 6 seconds
setInterval(cycleMockup, 6000);

/* ── Init ── */
applyLang(currentLang);

/* ══════════════════════════════════════════════
   STAT POPUPS
══════════════════════════════════════════════ */
(function() {
  const backdrop = document.getElementById('statBackdrop');
  let currentPopup = null;

  // Map button id → popup id
  const statMap = {
    'stat-threats': 'popup-threats',
    'stat-servers': 'popup-servers',
    'stat-local':   'popup-local',
    'stat-fee':     'popup-fee',
  };

  function openPopup(popupId, btnEl) {
    // Close any open popup first
    if (currentPopup) closePopup();

    const popup = document.getElementById(popupId);
    if (!popup) return;

    popup.hidden = false;
    // Force reflow before adding class for transition
    popup.offsetHeight;
    popup.classList.add('is-open');
    backdrop.classList.add('is-active');
    backdrop.setAttribute('aria-hidden', 'false');
    btnEl.setAttribute('aria-expanded', 'true');
    currentPopup = { popup, btn: btnEl };

    // Focus close button for accessibility
    const closeBtn = popup.querySelector('.stat-popup-close');
    if (closeBtn) closeBtn.focus();
  }

  function closePopup() {
    if (!currentPopup) return;
    const { popup, btn } = currentPopup;

    popup.classList.remove('is-open');
    backdrop.classList.remove('is-active');
    backdrop.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');

    // Hide after transition
    setTimeout(() => { popup.hidden = true; }, 260);
    btn.focus();
    currentPopup = null;
  }

  // Wire up stat buttons
  Object.entries(statMap).forEach(([btnId, popupId]) => {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (currentPopup && currentPopup.popup.id === popupId) {
        closePopup();
      } else {
        openPopup(popupId, btn);
      }
    });
  });

  // Close buttons inside popups
  document.querySelectorAll('.stat-popup-close').forEach(btn => {
    btn.addEventListener('click', closePopup);
  });

  // Close on backdrop click
  backdrop.addEventListener('click', closePopup);

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && currentPopup) closePopup();
  });
})();

// Thresholds accordion
const thresholdsToggle = document.querySelector('.thresholds-toggle');
const thresholdsPanel = document.getElementById('thresholds-panel');
if (thresholdsToggle && thresholdsPanel) {
  thresholdsToggle.addEventListener('click', () => {
    const expanded =
      thresholdsToggle.getAttribute('aria-expanded') === 'true';
    thresholdsToggle.setAttribute('aria-expanded', String(!expanded));
    thresholdsPanel.hidden = expanded;
  });
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', String(!expanded));
    panel.hidden = expanded;
  });
});

// Stat 2 scroll link
document.getElementById('statScrollLink')?.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('protection-levels')?.scrollIntoView({ behavior: 'smooth' });
});
