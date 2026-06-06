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

// ====== 表单提交 ======
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = contactForm.querySelector('input[type="text"]').value;
  const phone = contactForm.querySelector('input[type="tel"]').value;
  
  if (!name || !phone) {
    alert('请填写姓名和联系电话');
    return;
  }
  
  // 目前只是演示，实际需要后端接收入库
  // 可以改成跳转到微信或直接显示联系方式
  alert('感谢您的咨询！\n我们将尽快与您联系。\n\n如急需，请直接拨打：\n18175158812');
  contactForm.reset();
});

// ====== 初始化：首屏元素直接可见 ======
window.addEventListener('load', () => {
  const heroElements = document.querySelectorAll('.hero .animate-in');
  heroElements.forEach(el => {
    el.classList.add('visible');
  });
});
