/* ============================================
   PROFESSIONAL PORTFOLIO - JAVASCRIPT
   Performance-Optimized Interactions & Animations
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // INITIALIZATION
    // ============================================
    
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initNavigation();
        initScrollAnimations();
        initSkillsAnimation();
        initContactForm();
        initBackToTop();
        initSmoothScroll();
        initNavbarScroll();
    });

    // ============================================
    // NAVIGATION
    // ============================================
    
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        // Update active link on scroll
        function updateActiveLink() {
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        // Throttle scroll event for performance
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateActiveLink();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: true
                    });
                }
            });
        });
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    
    function initNavbarScroll() {
        const navbar = document.getElementById('mainNav');
        
        function handleNavbarScroll() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Throttle scroll event
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    handleNavbarScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Check if target exists
                if (targetId === '#' || targetId === '#!') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Calculate offset for fixed navbar
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
    // ============================================
    
    function initScrollAnimations() {
        // Check if Intersection Observer is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: Show all elements
            const revealElements = document.querySelectorAll('.reveal-text, .reveal-left, .reveal-right, .reveal-up');
            revealElements.forEach(el => el.classList.add('revealed'));
            return;
        }
        
        // Create observer with options
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };
        
        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optionally unobserve after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all reveal elements
        const revealElements = document.querySelectorAll('.reveal-text, .reveal-left, .reveal-right, .reveal-up');
        revealElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // SKILLS PROGRESS BAR ANIMATION
    // ============================================
    
    function initSkillsAnimation() {
        const skillsSection = document.getElementById('skills');
        const progressBars = document.querySelectorAll('.progress-bar');
        
        if (!skillsSection || progressBars.length === 0) return;
        
        let animated = false;
        
        // Check if Intersection Observer is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: Animate immediately
            animateProgressBars();
            return;
        }
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        observer.observe(skillsSection);
        
        function animateProgressBars() {
            progressBars.forEach((bar, index) => {
                const progress = bar.getAttribute('data-progress');
                
                setTimeout(() => {
                    bar.style.width = progress + '%';
                    bar.classList.add('animated');
                }, index * 100);
            });
        }
    }

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    
    function initContactForm() {
        const form = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Validate form
            if (!validateForm(data)) {
                showMessage('Please fill in all fields correctly.', 'error');
                return;
            }
            
            // Disable submit button
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Reset form
                form.reset();
                
                // Show success message
                showMessage('Thank you! Your message has been sent successfully.', 'success');
                
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    hideMessage();
                }, 5000);
            }, 1500);
            
            /* 
            // Example: Actual API call using Fetch
            fetch('your-api-endpoint.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    form.reset();
                    showMessage('Thank you! Your message has been sent successfully.', 'success');
                } else {
                    showMessage('Oops! Something went wrong. Please try again.', 'error');
                }
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            })
            .catch(error => {
                showMessage('Oops! Something went wrong. Please try again.', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
            */
        });
        
        function validateForm(data) {
            // Check if all fields are filled
            if (!data.name || !data.email || !data.subject || !data.message) {
                return false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                return false;
            }
            
            return true;
        }
        
        function showMessage(message, type) {
            formMessage.textContent = message;
            formMessage.className = 'form-message ' + type;
            formMessage.style.display = 'block';
        }
        
        function hideMessage() {
            formMessage.style.display = 'none';
        }
        
        // Add focus/blur effects to form inputs
        const formInputs = form.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    
    function initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (!backToTopBtn) return;
        
        // Show/hide button based on scroll position
        function toggleBackToTop() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
        
        // Throttle scroll event
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    toggleBackToTop();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Scroll to top on click
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    // Debounce function for performance optimization
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
    
    // Throttle function for performance optimization
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ============================================
    // PRELOADER (Optional)
    // ============================================
    
    /*
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }
    });
    */

    // ============================================
    // PERFORMANCE MONITORING (Optional)
    // ============================================
    
    /*
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log('Performance:', entry.name, entry.duration);
            }
        });
        observer.observe({ entryTypes: ['measure', 'navigation'] });
    }
    */

    // ============================================
    // ADDITIONAL ENHANCEMENTS
    // ============================================
    
    // Add loading animation for images
    function initImageLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback: Load all images immediately
            images.forEach(img => {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
            });
        }
    }
    
    // Initialize lazy loading if needed
    // initImageLoading();
    
    // Add typing effect for hero title (Optional)
    function initTypingEffect() {
        const typingElement = document.querySelector('[data-typing]');
        if (!typingElement) return;
        
        const text = typingElement.textContent;
        const speed = 100; // milliseconds
        let index = 0;
        
        typingElement.textContent = '';
        typingElement.style.borderRight = '2px solid';
        typingElement.style.paddingRight = '5px';
        
        function type() {
            if (index < text.length) {
                typingElement.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    typingElement.style.borderRight = 'none';
                }, 500);
            }
        }
        
        type();
    }
    
    // Initialize typing effect if element exists
    // initTypingEffect();
    
    // Add parallax effect to hero section (Optional)
    function initParallax() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        window.addEventListener('scroll', throttle(function() {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }, 10));
    }
    
    // Initialize parallax if needed
    // initParallax();
    
    // Add cursor animation (Optional - for advanced portfolios)
    function initCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        document.body.appendChild(cursorFollower);
        
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animate() {
            // Smooth cursor movement
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }
    
    // Initialize custom cursor only on desktop
    // if (window.innerWidth > 768) {
    //     initCustomCursor();
    // }

})();

// ============================================
// GOOGLE ANALYTICS (Optional)
// ============================================
/*
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'YOUR-GA-ID');
*/

// ============================================
// SERVICE WORKER (Optional - for PWA)
// ============================================
/*
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}
*/
