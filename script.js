// Enhanced Modern JavaScript with Premium Interactions
class AndoraWebsite {
    constructor() {
        this.isLoaded = false;
        this.scrollY = 0;
        this.ticking = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupScrollAnimations();
        this.setupParallax();
        this.setupTypewriter();
        this.setupParticles();
        this.markAsLoaded();
    }

    bindEvents() {
        // Mobile Navigation
        this.setupMobileNav();

        // Smooth scrolling
        this.setupSmoothScroll();

        // Header effects
        this.setupHeaderEffects();

        // Form handling
        this.setupFormHandling();

        // Performance optimized scroll
        this.setupOptimizedScroll();
    }

    setupMobileNav() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            // Toggle mobile menu
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('nav-open');

                // Update aria-expanded for accessibility
                const isExpanded = hamburger.classList.contains('active');
                hamburger.setAttribute('aria-expanded', isExpanded);
            });

            // Close on link click
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                    hamburger.setAttribute('aria-expanded', false);
                });
            });

            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                    hamburger.setAttribute('aria-expanded', false);
                    hamburger.focus(); // Return focus to hamburger
                }
            });

            // Close on outside click
            document.addEventListener('click', (e) => {
                if (navMenu.classList.contains('active') &&
                    !navMenu.contains(e.target) &&
                    !hamburger.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('nav-open');
                    hamburger.setAttribute('aria-expanded', false);
                }
            });

            // Set initial aria attributes
            hamburger.setAttribute('aria-expanded', false);
            hamburger.setAttribute('aria-label', '메뉴 열기');
        }
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupHeaderEffects() {
        let lastScrollY = 0;
        const header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    // Add/remove scrolled class
                    if (currentScrollY > 50) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }

                    // Hide/show header on scroll direction
                    if (currentScrollY > lastScrollY && currentScrollY > 200) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }

                    lastScrollY = currentScrollY;
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    }

    setupFormHandling() {
        const form = document.querySelector('.contact-form form');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;

                // Loading state
                submitBtn.textContent = '전송 중...';
                submitBtn.disabled = true;

                // Simulate API call
                try {
                    await this.simulateFormSubmission();
                    this.showNotification('메시지가 성공적으로 전송되었습니다!', 'success');
                    form.reset();
                } catch (error) {
                    this.showNotification('전송 중 오류가 발생했습니다. 다시 시도해주세요.', 'error');
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        }
    }

    async simulateFormSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 1500);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1',
            color: 'white',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontWeight: '500'
        });

        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-reveal-active');

                    // Special animations for specific elements
                    if (entry.target.classList.contains('service-card')) {
                        this.animateServiceCard(entry.target);
                    }

                    if (entry.target.classList.contains('feature')) {
                        this.animateFeature(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Add scroll reveal class and observe elements
        const elementsToAnimate = [
            '.service-card',
            '.feature',
            '.team-member',
            '.contact-item',
            '.about-stats'
        ];

        elementsToAnimate.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('scroll-reveal');
                observer.observe(el);
            });
        });

        // Animate stats on scroll
        this.setupStatsAnimation();
    }

    animateServiceCard(card) {
        const delay = Array.from(card.parentNode.children).indexOf(card) * 100;
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }, delay);
    }

    animateFeature(feature) {
        const icon = feature.querySelector('.feature-icon');
        if (icon) {
            icon.style.animation = 'pulse 0.6s ease-out';
        }
    }

    setupStatsAnimation() {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStats(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat, .stat-item').forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    animateStats(container) {
        const statNumbers = container.querySelectorAll('.stat h3, .stat-number');

        statNumbers.forEach(stat => {
            const text = stat.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            const hasPlus = text.includes('+');
            const hasSymbol = text.includes('₩') || text.includes('↗');

            if (number && !hasSymbol) {
                this.animateCounter(stat, number, hasPlus);
            }
        });
    }

    animateCounter(element, target, hasPlus = false, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            start = target * this.easeOutCubic(progress);
            element.textContent = Math.floor(start) + (hasPlus ? '+' : '');

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (hasPlus ? '+' : '');
            }
        };

        requestAnimationFrame(updateCounter);
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    setupParallax() {
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');

        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;

                    parallaxElements.forEach((el, index) => {
                        const speed = 0.5 + (index * 0.1);
                        el.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
                    });

                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    }

    setupTypewriter() {
        const titleLines = document.querySelectorAll('.title-line');

        titleLines.forEach((line, index) => {
            line.style.animationDelay = `${index * 0.2 + 0.5}s`;
        });
    }

    setupParticles() {
        // Create subtle floating particles in hero section
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            Object.assign(particle.style, {
                position: 'absolute',
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
                animationDelay: Math.random() * 2 + 's',
                pointerEvents: 'none'
            });

            hero.appendChild(particle);
        }
    }

    setupOptimizedScroll() {
        let lastKnownScrollPosition = 0;
        let ticking = false;

        const updateScrollEffects = (scrollPos) => {
            // Update any scroll-dependent effects here
            this.updateProgressBar(scrollPos);
        };

        window.addEventListener('scroll', () => {
            lastKnownScrollPosition = window.scrollY;

            if (!ticking) {
                requestAnimationFrame(() => {
                    updateScrollEffects(lastKnownScrollPosition);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateProgressBar(scrollPos) {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollPos / docHeight) * 100;

        // Create progress bar if it doesn't exist
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            Object.assign(progressBar.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '0%',
                height: '3px',
                background: 'linear-gradient(90deg, #6366f1, #ec4899)',
                zIndex: '10001',
                transition: 'width 0.1s ease-out'
            });
            document.body.appendChild(progressBar);
        }

        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    markAsLoaded() {
        this.isLoaded = true;
        document.body.classList.add('loaded');

        // Add CSS for loaded state
        const style = document.createElement('style');
        style.textContent = `
            .loaded .scroll-reveal {
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .scroll-reveal-active {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }

            .nav-open {
                overflow: hidden;
            }

            .notification {
                font-family: 'Inter', sans-serif;
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced cursor effects for premium feel
class CursorEffects {
    constructor() {
        this.cursor = null;
        this.followers = [];
        this.init();
    }

    init() {
        if (window.innerWidth > 768) {
            this.createCursor();
            this.bindEvents();
        }
    }

    createCursor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';

        Object.assign(this.cursor.style, {
            position: 'fixed',
            width: '20px',
            height: '20px',
            background: 'rgba(99, 102, 241, 0.8)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '9999',
            transition: 'transform 0.1s ease-out',
            mixBlendMode: 'difference'
        });

        document.body.appendChild(this.cursor);
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            if (this.cursor) {
                this.cursor.style.left = e.clientX - 10 + 'px';
                this.cursor.style.top = e.clientY - 10 + 'px';
            }
        });

        // Scale cursor on hover
        document.querySelectorAll('a, button, .btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (this.cursor) this.cursor.style.transform = 'scale(2)';
            });

            el.addEventListener('mouseleave', () => {
                if (this.cursor) this.cursor.style.transform = 'scale(1)';
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AndoraWebsite();
    new CursorEffects();
});

// Add some loading animation
window.addEventListener('load', () => {
    const loadingScreen = document.createElement('div');
    loadingScreen.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 1;
            transition: opacity 0.5s ease-out;
        ">
            <div style="
                color: white;
                font-family: 'Playfair Display', serif;
                font-size: 3rem;
                font-weight: 700;
                text-align: center;
                animation: pulse 1.5s ease-in-out infinite;
            ">
                Andora
            </div>
        </div>
    `;

    document.body.appendChild(loadingScreen);

    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => loadingScreen.remove(), 500);
    }, 1000);
});