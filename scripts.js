/* ═══════════════════════════════════════════════════
   MMI JAMMU – SCRIPTS
═══════════════════════════════════════════════════ */

/* ─────────────────────────────────────────
   DEMO CREDENTIALS
   Username : student1
   Password : mmi@1234
───────────────────────────────────────── */
const DEMO_USERS = {
  student1:  { pass: 'mmi@1234', name: 'Aarav Sharma', role: 'student' },
  parent1:   { pass: 'parent@1234', name: 'Rohit Sharma', role: 'parent' },
  teacher1:  { pass: 'teacher@1234', name: 'Ms. Priya Sharma', role: 'staff' }
};

/* ─────────────────────────────────────────
   MOBILE NAV TOGGLE
───────────────────────────────────────── */
const navToggle  = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
if (navToggle && primaryNav) {
  navToggle.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
  });
  primaryNav.querySelectorAll('a:not(.has-sub > a)').forEach(l =>
    l.addEventListener('click', () => primaryNav.classList.remove('open'))
  );
}

/* ─────────────────────────────────────────
   STICKY HEADER on scroll
───────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const h = document.getElementById('siteHeader');
  if (h) h.style.boxShadow = window.scrollY > 10
    ? '0 3px 14px rgba(0,0,0,0.12)'
    : '0 1px 6px rgba(0,0,0,0.07)';
});

/* ─────────────────────────────────────────
   HERO SLIDER
───────────────────────────────────────── */
(function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const lines  = document.querySelectorAll('.slide-line');
  if (!slides.length) return;
  let cur = 0, timer;

  function goTo(n) {
    slides[cur].classList.remove('active');
    lines[cur] && lines[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    lines[cur] && lines[cur].classList.add('active');
  }

  function startAuto() { timer = setInterval(() => goTo(cur + 1), 4500); }
  function resetAuto()  { clearInterval(timer); startAuto(); }

  document.getElementById('heroPrev') && document.getElementById('heroPrev').addEventListener('click', () => { goTo(cur - 1); resetAuto(); });
  document.getElementById('heroNext') && document.getElementById('heroNext').addEventListener('click', () => { goTo(cur + 1); resetAuto(); });

  lines.forEach(l => l.addEventListener('click', () => { goTo(parseInt(l.dataset.index)); resetAuto(); }));

  startAuto();
})();

/* ─────────────────────────────────────────
   TESTIMONIALS SLIDER
───────────────────────────────────────── */
(function initTestiSlider() {
  const slides = document.querySelectorAll('.testi-slide');
  const dots   = document.querySelectorAll('.testi-dot');
  if (!slides.length) return;
  let cur = 0, timer;

  function goTo(n) {
    slides[cur].classList.remove('active');
    dots[cur] && dots[cur].classList.remove('active');
    cur = (n + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur] && dots[cur].classList.add('active');
  }
  function startAuto() { timer = setInterval(() => goTo(cur + 1), 5500); }
  function resetAuto() { clearInterval(timer); startAuto(); }

  document.getElementById('testiPrev') && document.getElementById('testiPrev').addEventListener('click', () => { goTo(cur - 1); resetAuto(); });
  document.getElementById('testiNext') && document.getElementById('testiNext').addEventListener('click', () => { goTo(cur + 1); resetAuto(); });
  dots.forEach(d => d.addEventListener('click', () => { goTo(parseInt(d.dataset.index)); resetAuto(); }));

  startAuto();
})();

/* ─────────────────────────────────────────
   ADMISSION POPUP
───────────────────────────────────────── */
function openPopup() {
  const p = document.getElementById('admissionPopup');
  if (p) p.classList.add('open');
}
function closePopup() {
  const p = document.getElementById('admissionPopup');
  if (p) p.classList.remove('open');
}

['admissionBtn','admissionStripBtn','stickyAdmission','ttEnrolBtn'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', e => { e.preventDefault(); openPopup(); });
});
const popupClose = document.getElementById('popupClose');
if (popupClose) popupClose.addEventListener('click', closePopup);
const admPop = document.getElementById('admissionPopup');
if (admPop) admPop.addEventListener('click', e => { if (e.target === admPop) closePopup(); });

function handleEnquiry(e) {
  e.preventDefault();
  closePopup();
  showToast('Thank you! We will contact you shortly.', 'green');
  e.target.reset();
}

/* ─────────────────────────────────────────
   LOGIN PAGE TABS
───────────────────────────────────────── */
function switchLoginTab(name, btn) {
  document.querySelectorAll('.login-tab-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.ltab').forEach(b => b.classList.remove('active'));
  const pane = document.getElementById('ltab-' + name);
  if (pane) pane.classList.add('active');
  if (btn)  btn.classList.add('active');
}

/* ─────────────────────────────────────────
   LOGIN FORM
───────────────────────────────────────── */
function doLogin(e, role) {
  e.preventDefault();
  const userEl = document.getElementById('st-user');
  const passEl = document.getElementById('st-pass');

  if (role === 'student' && userEl && passEl) {
    const u = userEl.value.trim();
    const p = passEl.value.trim();
    const demo = DEMO_USERS[u];

    if (demo && demo.pass === p && demo.role === 'student') {
      localStorage.setItem('mmi_user', u);
      localStorage.setItem('mmi_name', demo.name);
      showToast('Login successful! Loading your portal…', 'green');
      setTimeout(() => window.location.href = 'dashboard.html', 1200);
    } else if (u && p) {
      // Allow any non-empty credentials to proceed in demo mode
      localStorage.setItem('mmi_user', u);
      localStorage.setItem('mmi_name', u.charAt(0).toUpperCase() + u.slice(1));
      showToast('Login successful! Loading your portal…', 'green');
      setTimeout(() => window.location.href = 'dashboard.html', 1200);
    } else {
      showToast('Please enter your username and password.', 'red');
    }
  } else {
    // Parent / Staff — demo redirect
    showToast('Login successful! Redirecting…', 'green');
    setTimeout(() => window.location.href = 'dashboard.html', 1200);
  }
}

/* ─────────────────────────────────────────
   PASSWORD TOGGLE
───────────────────────────────────────── */
function togglePw(inputId, iconId) {
  const inp  = document.getElementById(inputId);
  const icon = document.getElementById(iconId);
  if (!inp) return;
  inp.type = inp.type === 'password' ? 'text' : 'password';
  if (icon) icon.className = inp.type === 'password' ? 'fa fa-eye' : 'fa fa-eye-slash';
}

/* ─────────────────────────────────────────
   DASHBOARD NAV
───────────────────────────────────────── */
const SECTION_TITLES = {
  home: 'Dashboard', attendance: 'Attendance', timetable: 'Timetable',
  results: 'Results', assignments: 'Assignments', syllabus: 'Syllabus',
  notices: 'Notices', fees: 'Fee Details', profile: 'My Profile'
};

function gotoSection(name, linkEl) {
  document.querySelectorAll('.dsec').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.dsb-link').forEach(l => l.classList.remove('active'));

  const sec = document.getElementById('sec-' + name);
  if (sec) sec.classList.add('active');
  if (linkEl) linkEl.classList.add('active');

  const crumb = document.getElementById('dtbCrumb');
  if (crumb) crumb.textContent = SECTION_TITLES[name] || 'Dashboard';

  // Close sidebar on mobile
  if (window.innerWidth <= 900) closeDsbSidebar();

  return false;
}

/* ─────────────────────────────────────────
   DASHBOARD SIDEBAR (mobile)
───────────────────────────────────────── */
const dsbSidebar = document.getElementById('dashSidebar');
const dsbOverlay = document.getElementById('dsbOverlay');
const dsbToggle  = document.getElementById('dsbToggle');
const dsbClose   = document.getElementById('dsbClose');

function openDsbSidebar()  { dsbSidebar && dsbSidebar.classList.add('open'); dsbOverlay && dsbOverlay.classList.add('on'); }
function closeDsbSidebar() { dsbSidebar && dsbSidebar.classList.remove('open'); dsbOverlay && dsbOverlay.classList.remove('on'); }
if (dsbToggle)  dsbToggle.addEventListener('click', openDsbSidebar);
if (dsbClose)   dsbClose.addEventListener('click', closeDsbSidebar);
if (dsbOverlay) dsbOverlay.addEventListener('click', closeDsbSidebar);

/* ─────────────────────────────────────────
   DASHBOARD INIT (date + name)
───────────────────────────────────────── */
function initDashboard() {
  const dateEl = document.getElementById('dtbDate');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('en-IN', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  const stored = localStorage.getItem('mmi_name') || 'Student';
  ['wbName','dtb-name','sb-fullname'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = stored;
  });
}

/* ─────────────────────────────────────────
   RESULT TABS
───────────────────────────────────────── */
function selectRT(btn) {
  document.querySelectorAll('.rt').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
}

/* ─────────────────────────────────────────
   TOAST
───────────────────────────────────────── */
function showToast(msg, type = 'green') {
  let t = document.getElementById('mmi-toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'mmi-toast';
    Object.assign(t.style, {
      position: 'fixed', bottom: '28px', left: '50%',
      transform: 'translateX(-50%) translateY(16px)',
      padding: '12px 28px', borderRadius: '50px',
      fontSize: '0.88rem', fontWeight: '700',
      color: '#fff', zIndex: '9999', opacity: '0',
      transition: 'all 0.3s ease', fontFamily: 'Open Sans, sans-serif',
      boxShadow: '0 6px 24px rgba(0,0,0,0.2)', pointerEvents: 'none'
    });
    document.body.appendChild(t);
  }
  t.style.background = type === 'green' ? '#126b36' : '#e50001';
  t.textContent = msg;
  t.style.opacity = '1';
  t.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(16px)';
  }, 3200);
}

/* ─────────────────────────────────────────
   SCROLL FADE-IN ANIMATION
───────────────────────────────────────── */
function initFadeIn() {
  const els = document.querySelectorAll(
    '.pillar-card, .facility-card, .centre-card, .testi-card, .event-item, .news-item, .qs-card, .dash-card'
  );
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    io.observe(el);
  });
}

/* ─────────────────────────────────────────
   INIT
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
  initFadeIn();
  initGalleryLightbox();
});

/* ─────────────────────────────────────────
   GALLERY LIGHTBOX
───────────────────────────────────────── */
let lbImages = [];
let lbIndex  = 0;

function initGalleryLightbox() {
  const items = document.querySelectorAll('.gallery-item img');
  if (!items.length) return;

  lbImages = Array.from(items).map(img => ({ src: img.src, alt: img.alt }));

  items.forEach((img, i) => {
    img.parentElement.addEventListener('click', () => openLightbox(i));
  });

  document.addEventListener('keydown', e => {
    const lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightboxBtn();
    if (e.key === 'ArrowLeft')   lbNav(-1);
    if (e.key === 'ArrowRight')  lbNav(1);
  });
}

function openLightbox(index) {
  lbIndex = index;
  const lb    = document.getElementById('lightbox');
  const img   = document.getElementById('lbImg');
  const cap   = document.getElementById('lbCaption');
  if (!lb || !img) return;
  img.src    = lbImages[lbIndex].src;
  img.alt    = lbImages[lbIndex].alt;
  cap.textContent = lbImages[lbIndex].alt || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (e && e.target !== document.getElementById('lightbox')) return;
  closeLightboxBtn();
}

function closeLightboxBtn() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}

function lbNav(dir, e) {
  if (e) e.stopPropagation();
  lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
  const img = document.getElementById('lbImg');
  const cap = document.getElementById('lbCaption');
  if (img) { img.src = lbImages[lbIndex].src; img.alt = lbImages[lbIndex].alt; }
  if (cap) cap.textContent = lbImages[lbIndex].alt || '';
}
