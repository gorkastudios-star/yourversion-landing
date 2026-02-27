/*
    YourVersion Landing Page Interactions
    Features: Sticky Header, Mobile Menu, Scroll Reveals, Form Handling
*/

document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
    initFormHandling();
});

/**
 * Sticky Header with blur/shadow on scroll
 */
function initStickyHeader() {
    const header = document.getElementById('header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });
}

/**
 * Mobile sidebar menu
 */
function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('navMobile');
    const links = nav.querySelectorAll('a');

    const toggleMenu = () => {
        nav.classList.toggle('nav-mobile--active');
        document.body.style.overflow = nav.classList.contains('nav-mobile--active') ? 'hidden' : '';
    };

    toggle.addEventListener('click', toggleMenu);

    links.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
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
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Special case for CTA button "Ver vídeo"
    const heroVideoBtn = document.getElementById('heroVideoBtn');
    if (heroVideoBtn) {
        heroVideoBtn.addEventListener('click', () => {
            const videoSection = document.getElementById('video');
            if (videoSection) {
                videoSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

/**
 * Form Validation, Success State, and Mailto Fallback
 */
function initFormHandling() {
    const form = document.getElementById('quoteForm');
    const successState = document.getElementById('successState');
    const summaryBox = document.getElementById('summaryBox');
    const copyBtn = document.getElementById('copyBtn');
    const emailBtn = document.getElementById('emailBtn');

    if (!form) return;

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

COMENTARIOS ADICIONALES:
${data.comentarios || 'Sin comentarios adicionales.'}

---
Solicitud generada desde yourversion.band`;
}
