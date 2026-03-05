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
