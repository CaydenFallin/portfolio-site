document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.tab-section');

    function switchTab(target) {
        tabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        const btn = document.querySelector(`.tab-btn[data-tab="${target}"]`);
        const sec = document.getElementById(`tab-${target}`);

        if (btn) btn.classList.add('active');
        if (sec) sec.classList.add('active');

        history.replaceState(null, '', `#${target}`);
    }

    tabs.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    const hash = window.location.hash.replace('#', '');
    const validTabs = ['resume', 'portfolio', 'contact'];
    switchTab(validTabs.includes(hash) ? hash : 'resume');

});

/* --- Portfolio Modal Logic --- */

let currentImages = [];
let currentImageIndex = 0;

function openProject(id) {
    const p = projectData[id];
    if (!p) return;

    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalDesc').textContent = p.longDesc || p.desc;

    currentImages = p.images;
    currentImageIndex = 0;
    updateGallery();

    const linksEl = document.getElementById('modalLinks');
    linksEl.innerHTML = p.links.map(l =>
        `<a class="modal-link" href="${l.url}" target="_blank">${l.label}</a>`
    ).join('');

    document.getElementById('projectModal').classList.add('open');
}

function closeModal() {
    document.getElementById('projectModal').classList.remove('open');
}

function closeProject(e) {
    // Closes modal if user clicks the dark background overlay
    if (e.target === document.getElementById('projectModal')) closeModal();
}

function updateGallery() {
    const img = document.getElementById('modalImg');
    const counter = document.getElementById('galleryCounter');
    const prev = document.getElementById('galleryPrev');
    const next = document.getElementById('galleryNext');

    if (currentImages.length === 0) {
        img.src = '';
        img.style.display = 'none';
        counter.textContent = '0 / 0';
    } else {
        img.style.display = 'block';
        img.src = currentImages[currentImageIndex];
        counter.textContent = `${currentImageIndex + 1} / ${currentImages.length}`;
    }

    // Adjust button visibility/opacity based on index
    prev.style.opacity = currentImageIndex === 0 ? '0.3' : '1';
    next.style.opacity = currentImageIndex === currentImages.length - 1 ? '0.3' : '1';
}

document.getElementById('modalImg').addEventListener('click', () => {
    const img = document.getElementById('modalImg');
    if (img.src) openFullscreen(img.src);
});

function openFullscreen(src) {
    const overlay = document.createElement('div');
    overlay.id = 'fullscreenOverlay';
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 99999;
        background: rgba(0,0,0,0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: zoom-out;
    `;
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = `
        max-width: 95vw;
        max-height: 95vh;
        object-fit: contain;
        filter: saturate(0.75);
    `;
    overlay.appendChild(img);
    overlay.addEventListener('click', () => overlay.remove());
    document.addEventListener('keydown', function esc(e) {
        if (e.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
    });
    document.body.appendChild(overlay);
}

function changeImage(dir) {
    const newIndex = currentImageIndex + dir;
    if (newIndex >= 0 && newIndex < currentImages.length) {
        currentImageIndex = newIndex;
        updateGallery();
    }
}