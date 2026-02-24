/* ── PORTFOLIO script.js ──────────────────────────────────
   What this file does:
   1. Hamburger menu (open/close on mobile)
   2. Smooth scroll when clicking nav links
   3. Scroll reveal (fade-in elements as you scroll down)
   4. Project modal (open/close popup when you click a project)
   5. Certificate modal (open/close popup when you click a cert)
   6. Contact form basic validation
──────────────────────────────────────────────────────── */


/* ── 1. HAMBURGER MENU ───────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

// Toggle the menu open or closed when the button is clicked
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close the menu when any nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});


/* ── 2. SMOOTH SCROLL ────────────────────────────────── */
// When clicking a link like #about, scroll there smoothly instead of jumping
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


/* ── 3. SCROLL REVEAL ────────────────────────────────── */
// Elements with class "reveal" will fade in when they enter the screen
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // add the visible class to show it
            observer.unobserve(entry.target);       // stop watching once it's shown
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


/* ── 4. PROJECT MODAL ────────────────────────────────── */
const modal = document.getElementById('project-modal');
const modalClose = document.getElementById('modal-close');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalTags = document.getElementById('modal-tags');
const modalDesc = document.getElementById('modal-desc');
const modalGithub = document.getElementById('modal-github');

// Open the modal and fill it with the project's info
function openModal(btn) {
    modalImg.src = btn.dataset.img;
    modalImg.alt = btn.dataset.title;
    modalTitle.textContent = btn.dataset.title;
    modalDesc.textContent = btn.dataset.desc;
    modalGithub.href = btn.dataset.github || '#';
    modalTags.innerHTML = btn.dataset.tags.split(',').map(t => `<span>${t.trim()}</span>`).join('');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // stop page scrolling while modal is open
}

function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn));
});
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });


/* ── 5. CERTIFICATE MODAL ────────────────────────────── */
const certModal = document.getElementById('cert-modal');
const certModalClose = document.getElementById('cert-modal-close');
const certModalImg = document.getElementById('cert-modal-img');
const certModalLabel = document.getElementById('cert-modal-label');

function openCertModal(card) {
    certModalImg.src = card.dataset.certImg;
    certModalImg.alt = card.dataset.certTitle;
    certModalLabel.textContent = card.dataset.certTitle;
    certModal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    certModal.classList.remove('open');
    document.body.style.overflow = '';
}

document.querySelectorAll('.cert-card[data-cert-img]').forEach(card => {
    card.addEventListener('click', () => openCertModal(card));
});
certModalClose.addEventListener('click', closeCertModal);
certModal.addEventListener('click', (e) => { if (e.target === certModal) closeCertModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCertModal(); });


/* ── 6. CONTACT FORM VALIDATION ──────────────────────── */
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // stop the page from reloading

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Check all fields are filled and email looks valid
        if (!name || !email || !message || !email.includes('@')) {
            alert('Please fill in all fields with a valid email.');
            return;
        }

        // Show a simple thank-you message
        contactForm.innerHTML = `
            <div style="text-align:center; padding: 40px 0;">
                <p style="font-size:1.2rem; font-weight:600;">✅ Thank you, ${name}!</p>
                <p style="margin-top:8px; color:#555;">I'll get back to you soon.</p>
            </div>`;
    });
}
