document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('header nav');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Cambiar el texto del botón para accesibilidad (opcional)
            if (navMenu.classList.contains('active')) {
                navToggle.setAttribute('aria-label', 'Cerrar menú');
                navToggle.textContent = '✕'; // O un icono de cerrar
            } else {
                navToggle.setAttribute('aria-label', 'Abrir menú');
                navToggle.textContent = '☰';
            }
        });
    }

    // Smooth scroll for anchor links (opcional)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Evitar el scroll si el enlace es solo para una acción JS (ej. toggle)
            // o si es un enlace a otra página que casualmente tiene un #
            if (this.pathname === window.location.pathname && this.hash !== "") {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Set current year in footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    // For other pages if they have different IDs (as in the example HTMLs)
    const yearSpanAbout = document.getElementById('currentYearAbout');
    if (yearSpanAbout) {
        yearSpanAbout.textContent = new Date().getFullYear();
    }
    const yearSpanContact = document.getElementById('currentYearContact');
    if (yearSpanContact) {
        yearSpanContact.textContent = new Date().getFullYear();
    }


    // Active navigation link based on current page
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split("/").pop() || "index.html";
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
        // Special case for "Servicios" link which points to a section on index.html
        if (currentPage === "index.html" && link.getAttribute('href') === '#services') {
           // Keep default behavior, active state handled by scroll or other logic if needed
        } else if (link.getAttribute('href').startsWith('#') && linkPage !== currentPage) {
            link.classList.remove('active');
        }
    });

    // Mock form submission for subscribe and contact (replace with actual logic)
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert(`Gracias por suscribirte, ${email}! (Esto es una demostración)`);
                this.reset();
            }
        });
    }
    // El formulario de contacto ya tiene un action a Formspree, no necesita JS aquí para el envío básico.
    // Puedes añadir validación JS si lo deseas antes de enviar a Formspree.
});