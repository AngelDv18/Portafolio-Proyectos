   // Loading Screen
      window.addEventListener('load', function() {
        const loadingScreen = document.getElementById('loading-screen');
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          document.body.classList.add('loaded');
        }, 500);
      });

      // Smooth scroll para navegación
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

      // Navbar scroll effect
      window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });

      // Back to top button
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

      // Typing animation
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
          if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
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
          if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
          typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(erase, erasingDelay);
        } else {
          cursorSpan.classList.remove("typing");
          textArrayIndex++;
          if (textArrayIndex >= textArray.length) textArrayIndex = 0;
          setTimeout(type, typingDelay + 1100);
        }
      }

      // Start typing animation when page loads
      document.addEventListener("DOMContentLoaded", function() {
        if (textArray.length) setTimeout(type, newTextDelay + 250);
      });

      // Counter Animation
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

      // Intersection Observer for animations
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

      // Skill bars animation
      function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
          const level = bar.getAttribute('data-level');
          setTimeout(() => {
            bar.style.width = level + '%';
          }, Math.random() * 500);
        });
      }

      // Projects filter
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

      // Contact form
      const contactForm = document.getElementById('contactForm');
      
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link
        const mailtoLink = `mailto:angeldavidg879@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Gracias por tu mensaje. Tu cliente de email se abrirá para enviar el mensaje.');
        
        // Reset form
        contactForm.reset();
      });

      // Particle animation for hero background
      function createParticles() {
        const particlesContainer = document.querySelector('.hero-particles');
        const particleCount = 50;
        
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
      createParticles();

      // Download CV function
      function descargarCV() {
        const element = document.querySelector('.main');
        const options = {
          margin: 10,
          filename: 'CV_Angel_David_Garcia.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().from(element).set(options).save();
      }

      // Mobile menu close on link click
      document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse.classList.contains('show')) {
            const navbarToggler = document.querySelector('.navbar-toggler');
            navbarToggler.click();
          }
        });
      });