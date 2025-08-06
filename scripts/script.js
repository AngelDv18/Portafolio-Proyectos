// ===== LOADING SCREEN =====
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loading-screen');
  loadingScreen.style.opacity = '0';
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    document.body.classList.add('loaded');
  }, 500);
});

// ===== SMOOTH SCROLL NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== TYPING ANIMATION =====
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = [
  "Desarrollador Frontend", 
  "Estudiante de Ingeniería", 
  "Creador de Soluciones Web",
  "Apasionado por la Tecnología"
];

const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing")) {
      cursorSpan.classList.add("typing");
    }
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing")) {
      cursorSpan.classList.add("typing");
    }
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) {
      textArrayIndex = 0;
    }
    setTimeout(type, typingDelay + 1100);
  }
}

// Start typing animation when page loads
document.addEventListener("DOMContentLoaded", function() {
  if (textArray.length) {
    setTimeout(type, newTextDelay + 250);
  }
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const increment = target / 200;
    
    function updateCounter() {
      const current = +counter.innerText;
      
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(updateCounter, 10);
      } else {
        counter.innerText = target;
      }
    }
    
    updateCounter();
  });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      
      // Animate counters when hero section is visible
      if (entry.target.classList.contains('hero-section')) {
        setTimeout(animateCounters, 500);
      }
      
      // Animate skill progress bars
      if (entry.target.classList.contains('skills-grid')) {
        animateSkillBars();
      }
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.scroll-reveal, .hero-section, .skills-grid').forEach(el => {
  observer.observe(el);
});

// ===== SKILL BARS ANIMATION =====
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  skillBars.forEach(bar => {
    const level = bar.getAttribute('data-level');
    setTimeout(() => {
      bar.style.width = level + '%';
    }, Math.random() * 500);
  });
}

// ===== PROJECTS FILTER =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(button => button.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');
  
  // Validate form
  if (!validateForm(name, email, subject, message)) {
    return;
  }
  
  // Create mailto link
  const mailtoLink = `mailto:angeldavidg879@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`)}`;
  
  // Open email client
  window.location.href = mailtoLink;
  
  // Show success message
  showNotification('Gracias por tu mensaje. Tu cliente de email se abrirá para enviar el mensaje.', 'success');
  
  // Reset form
  contactForm.reset();
});

// ===== FORM VALIDATION =====
function validateForm(name, email, subject, message) {
  const errors = [];
  
  if (!name.trim()) {
    errors.push('El nombre es requerido');
  }
  
  if (!email.trim()) {
    errors.push('El email es requerido');
  } else if (!isValidEmail(email)) {
    errors.push('El email no es válido');
  }
  
  if (!subject.trim()) {
    errors.push('El asunto es requerido');
  }
  
  if (!message.trim()) {
    errors.push('El mensaje es requerido');
  }
  
  if (errors.length > 0) {
    showNotification(errors.join('. '), 'error');
    return false;
  }
  
  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => {
    notification.remove();
  });
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="bi bi-${getNotificationIcon(type)} me-2"></i>
      <span>${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <i class="bi bi-x"></i>
      </button>
    </div>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${getNotificationColor(type)};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 15px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    max-width: 400px;
    animation: slideIn 0.3s ease-out;
  `;
  
  // Add notification to DOM
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 5000);
}

function getNotificationIcon(type) {
  const icons = {
    'success': 'check-circle-fill',
    'error': 'exclamation-triangle-fill',
    'info': 'info-circle-fill',
    'warning': 'exclamation-circle-fill'
  };
  return icons[type] || icons.info;
}

function getNotificationColor(type) {
  const colors = {
    'success': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'error': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'info': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'warning': 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)'
  };
  return colors[type] || colors.info;
}

// ===== PARTICLE ANIMATION FOR HERO BACKGROUND =====
function createParticles() {
  const particlesContainer = document.querySelector('.hero-particles');
  if (!particlesContainer) return;
  
  const particleCount = window.innerWidth < 768 ? 30 : 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// ===== MOBILE MENU CLOSE ON LINK CLICK =====
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      const navbarToggler = document.querySelector('.navbar-toggler');
      navbarToggler.click();
    }
  });
});

// ===== LAZY LOADING FOR IMAGES =====
function setupLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => {
      img.classList.add('lazy');
      imageObserver.observe(img);
    });
  }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize scroll events
const debouncedScrollHandler = debounce(() => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Back to top button
  if (window.scrollY > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Keyboard navigation for interactive elements
document.addEventListener('keydown', function(e) {
  // Skip to main content
  if (e.key === 'Tab' && e.shiftKey && document.activeElement === document.body) {
    e.preventDefault();
    const skipLink = document.querySelector('#skip-to-main');
    if (skipLink) {
      skipLink.focus();
    }
  }
  
  // Close modals with Escape key
  if (e.key === 'Escape') {
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => {
      notification.remove();
    });
  }
});

// ===== REDUCED MOTION SUPPORT =====
function respectReducedMotion() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
    
    // Stop particle animation
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
      particle.style.animation = 'none';
    });
    
    // Disable typing animation
    if (typedTextSpan) {
      typedTextSpan.textContent = textArray[0];
      cursorSpan.style.display = 'none';
    }
  }
}

// ===== THEME DETECTION =====
function detectTheme() {
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (prefersDarkMode) {
    document.body.classList.add('dark-theme');
  }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
  console.error('Error occurred:', e.error);
  // You can implement error reporting here
});

// ===== PERFORMANCE MONITORING =====
function logPerformance() {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        console.log('DOM content loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
      }, 0);
    });
  }
}

// ===== SERVICE WORKER REGISTRATION (FOR PWA SUPPORT) =====
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

// ===== ANIMATION UTILS =====
function animateOnScroll() {
  const animateElements = document.querySelectorAll('[data-animate]');
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationType = element.getAttribute('data-animate');
        const delay = element.getAttribute('data-delay') || '0';
        
        setTimeout(() => {
          element.classList.add(`animate-${animationType}`);
        }, parseInt(delay));
        
        animationObserver.unobserve(element);
      }
    });
  }, { threshold: 0.1 });
  
  animateElements.forEach(element => {
    animationObserver.observe(element);
  });
}

// ===== COPY TO CLIPBOARD FUNCTIONALITY =====
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showNotification('Texto copiado al portapapeles', 'success');
    }).catch(err => {
      console.error('Error al copiar: ', err);
      fallbackCopyTextToClipboard(text);
    });
  } else {
    fallbackCopyTextToClipboard(text);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      showNotification('Texto copiado al portapapeles', 'success');
    } else {
      showNotification('Error al copiar el texto', 'error');
    }
  } catch (err) {
    console.error('Error al copiar: ', err);
    showNotification('Error al copiar el texto', 'error');
  }
  
  document.body.removeChild(textArea);
}

// ===== SOCIAL SHARING =====
function shareProject(title, url) {
  if (navigator.share) {
    navigator.share({
      title: title,
      url: url
    }).then(() => {
      showNotification('Proyecto compartido exitosamente', 'success');
    }).catch((error) => {
      console.error('Error sharing:', error);
    });
  } else {
    // Fallback: copy URL to clipboard
    copyToClipboard(url);
  }
}

// ===== DARK/LIGHT MODE TOGGLE =====
// ===== DARK/LIGHT MODE TOGGLE - CORRECCIÓN =====

// Variables para el tema
let currentTheme = localStorage.getItem('theme') || 'light';

// Crear el botón de toggle de tema
function createThemeToggle() {
  // Verificar si ya existe el botón
  if (document.querySelector('.theme-toggle')) {
    return;
  }

  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.setAttribute('aria-label', 'Cambiar tema oscuro/claro');
  themeToggle.setAttribute('title', 'Cambiar tema');
  
  // Establecer el icono inicial basado en el tema actual
  const icon = currentTheme === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill';
  themeToggle.innerHTML = `<i class="bi ${icon}"></i>`;
  
  themeToggle.style.cssText = `
    position: fixed;
    top: 100px;
    left: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: none;
    background: var(--gradient-primary);
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: var(--shadow-lg);
    transition: all var(--transition-normal);
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  // Agregar eventos
  themeToggle.addEventListener('click', toggleTheme);
  themeToggle.addEventListener('mouseenter', () => {
    themeToggle.style.transform = 'scale(1.1)';
    themeToggle.style.boxShadow = 'var(--shadow-xl)';
  });
  themeToggle.addEventListener('mouseleave', () => {
    themeToggle.style.transform = 'scale(1)';
    themeToggle.style.boxShadow = 'var(--shadow-lg)';
  });
  
  document.body.appendChild(themeToggle);
  
  // Mostrar solo en desktop
  updateThemeToggleVisibility();
}

// Función para toggle del tema
function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  applyTheme(currentTheme);
  updateThemeToggleIcon();
  
  // Guardar preferencia
  localStorage.setItem('theme', currentTheme);
  
  // Mostrar notificación
  const themeText = currentTheme === 'dark' ? 'oscuro' : 'claro';
  showNotification(`Tema ${themeText} activado`, 'info');
}

// Aplicar el tema
function applyTheme(theme) {
  const root = document.documentElement;
  
  if (theme === 'dark') {
    // Variables para tema oscuro
    root.style.setProperty('--bg-light', '#1a1a2e');
    root.style.setProperty('--bg-white', '#16213e');
    root.style.setProperty('--bg-card', 'rgba(22, 33, 62, 0.95)');
    root.style.setProperty('--text-dark', '#ffffff');
    root.style.setProperty('--text-light', '#e2e8f0');
    root.style.setProperty('--text-muted', '#a0aec0');
    
    document.body.classList.add('dark-theme');
  } else {
    // Variables para tema claro (valores originales)
    root.style.setProperty('--bg-light', '#f8fafc');
    root.style.setProperty('--bg-white', '#ffffff');
    root.style.setProperty('--bg-card', 'rgba(255, 255, 255, 0.95)');
    root.style.setProperty('--text-dark', '#2d3748');
    root.style.setProperty('--text-light', '#718096');
    root.style.setProperty('--text-muted', '#a0aec0');
    
    document.body.classList.remove('dark-theme');
  }
}

// Actualizar el icono del botón
function updateThemeToggleIcon() {
  const themeToggle = document.querySelector('.theme-toggle i');
  
  if (themeToggle) {
    const iconClass = currentTheme === 'dark' ? 'bi-sun-fill' : 'bi-moon-fill';
    themeToggle.className = `bi ${iconClass}`;
  }
}

// Actualizar visibilidad del botón según el tamaño de pantalla
function updateThemeToggleVisibility() {
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.style.display = window.innerWidth >= 768 ? 'flex' : 'none';
  }
}

// Cargar preferencia de tema al iniciar
function loadThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    currentTheme = savedTheme;
    applyTheme(currentTheme);
  }
}

// Detectar preferencia del sistema
function detectSystemTheme() {
  if (!localStorage.getItem('theme')) {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    currentTheme = prefersDarkMode ? 'dark' : 'light';
    applyTheme(currentTheme);
  }
}

// Escuchar cambios en la preferencia del sistema
function setupSystemThemeListener() {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      currentTheme = e.matches ? 'dark' : 'light';
      applyTheme(currentTheme);
      updateThemeToggleIcon();
    }
  });
}

// ===== INTEGRACIÓN CON EL CÓDIGO PRINCIPAL =====

// Reemplazar las funciones existentes en el DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  // Cargar tema antes que nada
  detectSystemTheme();
  loadThemePreference();
  
  // Crear el botón de tema
  createThemeToggle();
  
  // Setup del listener del sistema
  setupSystemThemeListener();
  
  // ... resto del código de inicialización
});

// Reemplazar el resize handler existente
window.addEventListener('resize', debounce(() => {
  // ... otro código de resize
  
  // Actualizar visibilidad del botón de tema
  updateThemeToggleVisibility();
}, 250));

// ===== CSS ADICIONAL REQUERIDO =====
// Agregar estos estilos al CSS principal o como <style> en el HTML

const additionalCSS = `
/* Tema oscuro */
.dark-theme {
  --bg-light: #1a1a2e !important;
  --bg-white: #16213e !important;
  --bg-card: rgba(22, 33, 62, 0.95) !important;
  --text-dark: #ffffff !important;
  --text-light: #e2e8f0 !important;
}

.dark-theme .navbar {
  background: rgba(22, 33, 62, 0.95) !important;
}

.dark-theme .skill-category,
.dark-theme .contact-form-wrapper,
.dark-theme .contact-item,
.dark-theme .timeline-content {
  background: var(--bg-card) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.dark-theme .form-control {
  background: rgba(255, 255, 255, 0.1) !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
  color: var(--text-dark) !important;
}

.dark-theme .form-control:focus {
  background: rgba(255, 255, 255, 0.15) !important;
  color: var(--text-dark) !important;
}

.dark-theme .project-card {
  background: var(--bg-card) !important;
}

.theme-toggle {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
  }
}

/* Responsive */
@media (max-width: 767px) {
  .theme-toggle {
    display: none !important;
  }
}
`;

// Función para agregar el CSS adicional
function addThemeCSS() {
  const style = document.createElement('style');
  style.textContent = additionalCSS;
  document.head.appendChild(style);
}

// Llamar esta función al cargar
addThemeCSS();
// ===== SCROLL PROGRESS INDICATOR =====
function createScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--gradient-primary);
    z-index: 10000;
    transition: width 0.1s ease;
  `;
  
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = Math.min(scrollPercent, 100) + '%';
  });
}

// ===== CURSOR EFFECTS (DESKTOP ONLY) =====
function createCursorEffects() {
  if (window.innerWidth < 768 || 'ontouchstart' in window) return;
  
  const cursor = document.createElement('div');
  const cursorDot = document.createElement('div');
  
  cursor.className = 'custom-cursor';
  cursorDot.className = 'custom-cursor-dot';
  
  cursor.style.cssText = `
    position: fixed;
    width: 40px;
    height: 40px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
    transform: translate(-50%, -50%);
    opacity: 0;
  `;
  
  cursorDot.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background: var(--primary-color);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transform: translate(-50%, -50%);
    opacity: 0;
  `;
  
  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.opacity = '1';
    
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    cursorDot.style.opacity = '1';
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorDot.style.opacity = '1';
  });
  
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorDot.style.opacity = '0';
  });
  
  // Hover effects for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-item');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.borderColor = 'var(--accent-color)';
      cursorDot.style.background = 'var(--accent-color)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.borderColor = 'var(--primary-color)';
      cursorDot.style.background = 'var(--primary-color)';
    });
  });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  // Core functionality
  setupLazyLoading();
  animateOnScroll();
  respectReducedMotion();
  detectTheme();
  loadThemePreference();
  
  // UI enhancements
  createScrollProgress();
  createThemeToggle();
  createCursorEffects();
  
  // Performance monitoring (development only)
  if (window.location.hostname === 'localhost') {
    logPerformance();
  }
  
  // PWA support (if service worker exists)
  if (typeof registerServiceWorker !== 'undefined') {
    registerServiceWorker();
  }
  
  // Add loading class removal
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
  
  console.log('🚀 Portafolio cargado exitosamente!');
});

// ===== RESIZE HANDLER =====
window.addEventListener('resize', debounce(() => {
  // Recreate particles with appropriate count for screen size
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    particlesContainer.innerHTML = '';
    createParticles();
  }
  
  // Toggle theme button visibility
  const themeToggle = document.querySelector('.theme-toggle');
  if (themeToggle) {
    themeToggle.style.display = window.innerWidth >= 768 ? 'block' : 'none';
  }
}, 250));

// ===== EXPORT FUNCTIONS FOR EXTERNAL USE =====
window.PortfolioJS = {
  showNotification,
  copyToClipboard,
  shareProject,
  toggleTheme
};