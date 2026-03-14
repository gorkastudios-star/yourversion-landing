/*
    YourVersion Landing Page Interactions
    Features: Luxury Background, Scroll Reveals, Form Handling
*/

document.addEventListener('DOMContentLoaded', () => {
    initHeroEntrance();
    initScrollReveal();
    initSmoothScroll();
    initRepertoireSection();
    initFormHandling();
});

function initHeroEntrance() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            hero.classList.add('is-ready');
        });
    });
}

/**
 * Luxury Diamond Dust Effect
 */
function initLuxuryBackground() {
    const container = document.getElementById('particles');
    const luxuryBg = document.querySelector('.luxury-bg');
    if (!container) return;

    const particleCount = 14;
    const particlePalette = [
        'rgba(255,255,255,0.72)',
        'rgba(232,236,241,0.6)',
        'rgba(212,220,229,0.48)'
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 2.6 + 0.8;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 16;
        const duration = Math.random() * 14 + 10;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animation = `diamondDust ${duration}s ease-in-out infinite`;
        particle.style.animationDelay = `-${delay}s`;
        particle.style.opacity = `${Math.random() * 0.22 + 0.04}`;
        particle.style.background = particlePalette[Math.floor(Math.random() * particlePalette.length)];

        container.appendChild(particle);
    }

    // Add CSS animation dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes diamondDust {
            0%, 100% { transform: scale(0.85); opacity: 0.02; }
            22% { opacity: 0.16; }
            48% { transform: scale(1.2); opacity: 0.34; }
            72% { opacity: 0.12; }
        }
    `;
    document.head.appendChild(style);

    if (!luxuryBg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = null;
    let targetX = 50;
    let targetY = 50;

    const applyMouseGlow = () => {
        luxuryBg.style.setProperty('--mx', `${targetX}%`);
        luxuryBg.style.setProperty('--my', `${targetY}%`);
        rafId = null;
    };

    window.addEventListener('mousemove', (event) => {
        targetX = (event.clientX / window.innerWidth) * 100;
        targetY = (event.clientY / window.innerHeight) * 100;
        if (!rafId) {
            rafId = requestAnimationFrame(applyMouseGlow);
        }
    }, { passive: true });
}

/**
 * Reveal elements as they enter viewport
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 0;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Repertoire section is handled by React app (setlist-app.jsx)
 */
function initRepertoireSection() {
    const root = document.getElementById('celListRoot');
    if (!root) return;
}

/**
 * Form Validation, Success State, and Mailto Fallback
 */
function initFormHandling() {
    const form = document.getElementById('quoteForm');
    if (!form) return;

    const soundToggle = document.getElementById('needsSoundProduction');
    const soundRequirements = document.getElementById('soundRequirements');
    const conditionalFields = soundRequirements
        ? soundRequirements.querySelectorAll('input, select, textarea')
        : [];

    const successState = document.getElementById('successState');
    const summaryBox = document.getElementById('summaryBox');
    const copyBtn = document.getElementById('copyBtn');
    const emailBtn = document.getElementById('emailBtn');

    if (!successState || !summaryBox || !copyBtn || !emailBtn) return;

    const toggleSoundRequirements = () => {
        const isActive = soundToggle?.checked;

        if (!soundRequirements) return;

        soundRequirements.classList.toggle('is-hidden', !isActive);
        soundRequirements.setAttribute('aria-hidden', String(!isActive));

        if (!isActive) {
            conditionalFields.forEach((field) => {
                if (field.tagName === 'SELECT') {
                    field.selectedIndex = 0;
                } else {
                    field.value = '';
                }
            });
        }
    };

    if (soundToggle && soundRequirements) {
        soundToggle.addEventListener('change', toggleSoundRequirements);
        toggleSoundRequirements();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic Honeypot Check
        const honeypot = form.querySelector('input[name="b_website"]').value;
        if (honeypot) return;

        // Collect data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Handle multi-checkbox for "formato"
        const formatos = formData.getAll('formato');
        data.formato = formatos.length > 0 ? formatos.join(' + ') : 'No especificado';
        data.needsSoundProduction = soundToggle?.checked ? 'Sí' : 'No';

        // Generate Summary
        const summaryText = generateSummary(data);
        summaryBox.innerText = summaryText;

        // Setup Mailto
        const subject = encodeURIComponent(`Presupuesto YourVersion - ${data.nombre} - ${data.fecha}`);
        const body = encodeURIComponent(summaryText);
        emailBtn.href = `mailto:hola@yourversion.band?subject=${subject}&body=${body}`;

        // Show Success State
        form.style.display = 'none';
        successState.style.display = 'block';
        successState.scrollIntoView({ behavior: 'smooth' });
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(summaryBox.innerText).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = '¡Copiado!';
            setTimeout(() => copyBtn.innerText = originalText, 2000);
        });
    });
}

function generateSummary(data) {
    const technicalSection = data.needsSoundProduction === 'Sí'
        ? `

PRODUCCIÓN TÉCNICA (SONIDO / LUCES):
- Espacio: ${data.spaceType || 'No especificado'}
- Tamaño del espacio: ${data.spaceSize || 'No especificado'}
- Público esperado: ${data.audienceExpected || 'No especificado'}
- Tamaño del escenario: ${data.stageSize || 'No especificado'}
- Rider / requisitos técnicos: ${data.riderInfo || 'No especificado'}
- Potencia de sonido deseada: ${data.desiredPower || 'No especificado'}
- Distancia a toma de corriente: ${data.powerDistance || 'No especificado'}
- Potencia máxima soportada: ${data.maxPower || 'No especificado'}
- Tipo de iluminación: ${data.lightingType || 'No especificado'}
- Control de luces: ${data.lightingControl || 'No especificado'}`
        : '\n\nPRODUCCIÓN TÉCNICA (SONIDO / LUCES):\n- No necesitan que sonoricemos el evento.';

    return `SOLICITUD DE PRESUPUESTO - YOURVERSION

CLIENTE: ${data.nombre}
EMAIL: ${data.email}
TELÉFONO: ${data.telefono || 'No facilitado'}

DETALLES DEL EVENTO:
- Tipo: ${data.tipo}
- Fecha: ${data.fecha}
- Lugar: ${data.lugar}
- Nº Invitados: ${data.invitados || 'No especificado'}
- Duración: ${data.duracion} min
- Formato: ${data.formato}
- Equipo en el local: ${data.equipo}
- Repertorio solicitado:\n${data.repertorioSeleccionado || 'No especificado'}
- ¿Necesitan sonorización?: ${data.needsSoundProduction}${technicalSection}

COMENTARIOS ADICIONALES:
${data.comentarios || 'Sin comentarios adicionales.'}

---
Solicitud generada desde yourversion.band`;
}

function initCrmPopup() {
    const triggers = Array.from(document.querySelectorAll('.crmFooterTrigger'));
    if (!triggers.length) return;

        const CRM_USER = 'yvadmin';
        const CRM_PASS = 'cigarrito';
        const STORAGE_KEY = 'yv_crm_leads';

        const style = document.createElement('style');
        style.textContent = `
            .crm-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.72); backdrop-filter: blur(6px); z-index: 9999; display: none; align-items: center; justify-content: center; padding: 20px; }
            .crm-modal { width: min(980px, 100%); max-height: 88vh; background: #0b0b0d; border: 1px solid rgba(197,160,89,0.25); box-shadow: 0 20px 60px rgba(0,0,0,0.6); color: #e8e8ea; font-family: 'Outfit', sans-serif; overflow: hidden; display: grid; grid-template-rows: auto 1fr; }
            .crm-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); }
            .crm-title { font-size: 11px; letter-spacing: .28em; text-transform: uppercase; color: #c5a059; font-weight: 700; }
            .crm-close { border: none; background: transparent; color: #777; font-size: 18px; cursor: pointer; }
            .crm-body { overflow: auto; }
            .crm-login, .crm-dashboard { padding: 22px; }
            .crm-login { max-width: 420px; margin: 0 auto; }
            .crm-field { display: grid; gap: 8px; margin-bottom: 14px; }
            .crm-label { font-size: 10px; letter-spacing: .16em; text-transform: uppercase; color: #888; font-weight: 700; }
            .crm-input { width: 100%; padding: 11px 12px; border: 1px solid rgba(255,255,255,0.12); background: #121216; color: #fff; outline: none; }
            .crm-btn { border: none; background: #c5a059; color: #111; padding: 11px 16px; font-size: 11px; letter-spacing: .12em; text-transform: uppercase; font-weight: 700; cursor: pointer; }
            .crm-error { color: #ff7373; font-size: 12px; min-height: 16px; }
            .crm-toolbar { display: flex; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 14px; }
            .crm-secondary { border: 1px solid rgba(255,255,255,0.18); background: transparent; color: #ddd; padding: 8px 10px; font-size: 11px; cursor: pointer; }
            .crm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
            .crm-list { border: 1px solid rgba(255,255,255,0.08); min-height: 280px; max-height: 58vh; overflow: auto; }
            .crm-row { width: 100%; text-align: left; border: none; border-bottom: 1px solid rgba(255,255,255,0.06); background: transparent; color: #d8d8da; padding: 10px; cursor: pointer; }
            .crm-row:hover { background: rgba(255,255,255,0.03); }
            .crm-row strong { display: block; font-size: 12px; color: #fff; }
            .crm-row small { display: block; font-size: 11px; color: #888; }
            .crm-detail { border: 1px solid rgba(255,255,255,0.08); padding: 12px; white-space: pre-wrap; font-size: 12px; line-height: 1.55; min-height: 280px; max-height: 58vh; overflow: auto; }
            @media (max-width: 820px){ .crm-grid { grid-template-columns: 1fr; } }
        `;
        document.head.appendChild(style);

        const backdrop = document.createElement('div');
        backdrop.className = 'crm-backdrop';
        backdrop.innerHTML = `
            <div class="crm-modal" role="dialog" aria-modal="true" aria-label="CRM YourVersion">
                <div class="crm-header">
                    <div class="crm-title">CRM interno YourVersion</div>
                    <button class="crm-close" aria-label="Cerrar">x</button>
                </div>
                <div class="crm-body">
                    <section class="crm-login">
                        <div class="crm-field">
                            <label class="crm-label">Usuario</label>
                            <input class="crm-input" type="text" id="crmUserInput" autocomplete="username" />
                        </div>
                        <div class="crm-field">
                            <label class="crm-label">Contrasena</label>
                            <input class="crm-input" type="password" id="crmPassInput" autocomplete="current-password" />
                        </div>
                        <button class="crm-btn" id="crmLoginBtn" type="button">Entrar</button>
                        <p class="crm-error" id="crmErrorText"></p>
                    </section>
                    <section class="crm-dashboard" style="display:none;">
                        <div class="crm-toolbar">
                            <strong id="crmCountText">Solicitudes: 0</strong>
                            <div>
                                <button class="crm-secondary" id="crmRefreshBtn" type="button">Actualizar</button>
                                <button class="crm-secondary" id="crmLogoutBtn" type="button">Salir</button>
                            </div>
                        </div>
                        <div class="crm-grid">
                            <div class="crm-list" id="crmList"></div>
                            <div class="crm-detail" id="crmDetail">Selecciona una solicitud para ver detalle.</div>
                        </div>
                    </section>
                </div>
            </div>
        `;
        document.body.appendChild(backdrop);

        const closeBtn = backdrop.querySelector('.crm-close');
        const loginSection = backdrop.querySelector('.crm-login');
        const dashboardSection = backdrop.querySelector('.crm-dashboard');
        const userInput = backdrop.querySelector('#crmUserInput');
        const passInput = backdrop.querySelector('#crmPassInput');
        const loginBtn = backdrop.querySelector('#crmLoginBtn');
        const errorText = backdrop.querySelector('#crmErrorText');
        const listNode = backdrop.querySelector('#crmList');
        const detailNode = backdrop.querySelector('#crmDetail');
        const countNode = backdrop.querySelector('#crmCountText');
        const refreshBtn = backdrop.querySelector('#crmRefreshBtn');
        const logoutBtn = backdrop.querySelector('#crmLogoutBtn');

        const formatDetail = (lead) => {
            if (!lead) return 'Selecciona una solicitud para ver detalle.';
            const date = lead.createdAt ? new Date(lead.createdAt).toLocaleString('es-ES') : 'No disponible';
            return [
                `Fecha de entrada: ${date}`,
                `Nombre: ${lead.name || ''}`,
                `Email: ${lead.email || ''}`,
                `Telefono: ${lead.phone || 'No indicado'}`,
                `Fecha y hora evento: ${lead.dateTime || ''}`,
                `Tipo de evento: ${lead.eventType || ''}`,
                `Lugar: ${lead.location || ''}`,
                `Asistentes: ${lead.guests || ''}`,
                `Necesidad equipo: ${lead.needsEquipment || ''}`,
                `Tipo de espacio: ${lead.spaceType || ''}`,
                '',
                'Repertorio:',
                lead.setlist || 'No seleccionado',
                '',
                'Comentarios:',
                lead.comments || 'Sin comentarios'
            ].join('\n');
        };

        const loadLeads = () => {
            let leads = [];
            try {
                leads = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            } catch (e) {
                leads = [];
            }

            countNode.textContent = `Solicitudes: ${leads.length}`;
            listNode.innerHTML = '';
            if (!leads.length) {
                detailNode.textContent = 'No hay solicitudes guardadas todavia.';
                return;
            }

            leads.forEach((lead) => {
                const row = document.createElement('button');
                row.type = 'button';
                row.className = 'crm-row';
                const d = lead.createdAt ? new Date(lead.createdAt).toLocaleString('es-ES') : 'sin fecha';
                row.innerHTML = `<strong>${lead.name || 'Sin nombre'}</strong><small>${lead.eventType || ''} · ${lead.location || ''}</small><small>${d}</small>`;
                row.addEventListener('click', () => {
                    detailNode.textContent = formatDetail(lead);
                });
                listNode.appendChild(row);
            });

            detailNode.textContent = formatDetail(leads[0]);
        };

        const resetAndOpen = () => {
            errorText.textContent = '';
            userInput.value = '';
            passInput.value = '';
            loginSection.style.display = '';
            dashboardSection.style.display = 'none';
            backdrop.style.display = 'flex';
            userInput.focus();
        };

        triggers.forEach((trigger) => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                resetAndOpen();
            });
        });

        closeBtn.addEventListener('click', () => {
            backdrop.style.display = 'none';
        });

        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) backdrop.style.display = 'none';
        });

        loginBtn.addEventListener('click', () => {
            const user = userInput.value.trim();
            const pass = passInput.value;
            if (user === CRM_USER && pass === CRM_PASS) {
                errorText.textContent = '';
                loginSection.style.display = 'none';
                dashboardSection.style.display = '';
                loadLeads();
            } else {
                errorText.textContent = 'Credenciales incorrectas.';
            }
        });

        passInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') loginBtn.click();
        });

        refreshBtn.addEventListener('click', loadLeads);
        logoutBtn.addEventListener('click', () => {
            loginSection.style.display = '';
            dashboardSection.style.display = 'none';
            userInput.focus();
        });
}
