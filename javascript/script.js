const navEl = document.querySelector('nav');
const hamburgerEl = document.querySelector('.hamburger');

hamburgerEl.addEventListener('click', () => {
navEl.classList.toggle('nav--open');
hamburgerEl.classList.toggle('hamburger--open');
});

// Back to Top – smooth scroll
document.querySelector('.back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const thumbs      = document.querySelectorAll('.gallery-thumb');
    const allImages   = document.querySelectorAll('.lightbox-images img'); // ← all full-size images
    const lightbox    = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const closeBtn    = lightbox.querySelector('.lightbox-close');
    const prevBtn     = lightbox.querySelector('.lightbox-prev');
    const nextBtn     = lightbox.querySelector('.lightbox-next');
    const viewBtn     = document.querySelector('.view-gallery-btn');

    let currentIndex = 0;

    // Build the master array from the hidden full-size images
    const images = Array.from(allImages).map(img => ({
        src: img.src,
        alt: img.alt
    }));

    function openLightbox(index) {
        currentIndex = index;
        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxImg.src = '';
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex].src;
    }

    // Click on a visible thumbnail → open lightbox at that exact image
    thumbs.forEach(thumb => {
        thumb.style.cursor = 'pointer';
        thumb.addEventListener('click', () => {
            const fullSrc = thumb.dataset.full || thumb.src;
            const index = images.findIndex(img => img.src === fullSrc);
            openLightbox(index !== -1 ? index : 0);
        });
    });

    // VIEW GALLERY button → start from first image
    if (viewBtn) {
        viewBtn.addEventListener('click', () => openLightbox(0));
    }

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    // Keyboard + click-outside
    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });
});

// MORE BUTTON ON NAV BAR
const moreToggle = document.querySelector('.dropdown-toggle');

if (moreToggle) {
    moreToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = moreToggle.parentElement;
        dropdown.classList.toggle('open');

        const expanded = dropdown.classList.contains('open');
        moreToggle.setAttribute('aria-expanded', expanded);
    });
}

