// ====== 导航菜单 ======
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
});

// 点击导航链接后关闭菜单（移动端）
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  });
});

// 滚动时高亮当前导航项
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });

  // 回到顶部按钮显隐
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// ====== 滚动动画（Intersection Observer） ======
const animateElements = document.querySelectorAll('.animate-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 给每个元素一点点延迟，制造逐次出现的效果
      const siblings = [...entry.target.parentElement.querySelectorAll('.animate-in')];
      const index = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${index * 0.1}s`;
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

animateElements.forEach(el => observer.observe(el));

// ====== 微信二维码弹窗 ======
const wechatItems = document.querySelectorAll('.contact-item .fa-weixin');
const wechatModal = document.getElementById('wechatModal');
const closeModal = document.querySelector('.close-modal');

wechatItems.forEach(item => {
  item.parentElement.addEventListener('click', () => {
    wechatModal.classList.add('active');
  });
});

closeModal.addEventListener('click', () => {
  wechatModal.classList.remove('active');
});

wechatModal.addEventListener('click', (e) => {
  if (e.target === wechatModal) {
    wechatModal.classList.remove('active');
  }
});

// ====== 修复锚点链接：减去导航栏高度 ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = 70;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ====== 初始化：首屏元素直接可见 ======
window.addEventListener('load', () => {
  const heroElements = document.querySelectorAll('.hero .animate-in');
  heroElements.forEach(el => {
    el.classList.add('visible');
  });
});
