const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 750);
});

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initNavigation();
    initTypingEffect();
    initRotatingTitles();
    initParticles();
    initParallax();
    initScrollAnimations();
    initSkillProgress();
    initProjectFilters();
    initProjectModals();
    initContactForm();
    initBackToTop();
    setCurrentYear();
});

function initThemeToggle() {
    const body = document.body;
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    const storedTheme = localStorage.getItem('hs-theme');
    if (storedTheme === 'light') {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
        toggle.setAttribute('aria-pressed', 'false');
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.add('dark-theme');
        toggle.setAttribute('aria-pressed', 'true');
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    toggle.addEventListener('click', () => {
        const isLight = body.classList.toggle('light-theme');
        body.classList.toggle('dark-theme', !isLight);
        toggle.setAttribute('aria-pressed', String(!isLight));
        toggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('hs-theme', isLight ? 'light' : 'dark');
    });
}

function initNavigation() {
    const header = document.querySelector('.site-header');
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.primary-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section[id]');

    if (navToggle && nav) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            nav.classList.toggle('open');
        });

        navLinks.forEach(link =>
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            })
        );
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                if (header) {
                    header.classList.toggle('scrolled', window.scrollY > 10);
                }
                ticking = false;
            });
            ticking = true;
        }
    });

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    const id = entry.target.getAttribute('id');
                    if (!id) return;
                    const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                    if (activeLink) {
                        if (entry.isIntersecting) {
                            navLinks.forEach(link => link.classList.remove('active'));
                            activeLink.classList.add('active');
                        }
                    }
                });
            },
            { rootMargin: '-45% 0px -50% 0px', threshold: 0.1 }
        );

        sections.forEach(section => observer.observe(section));
    }
}

function initTypingEffect() {
    const nameElement = document.getElementById('typed-name');
    if (!nameElement || prefersReducedMotion) return;

    const text = 'Harsh Shah';
    let index = 0;
    nameElement.textContent = '';

    const type = () => {
        if (index <= text.length) {
            nameElement.textContent = text.slice(0, index);
            index += 1;
            setTimeout(type, 140);
        }
    };

    type();
}

function initRotatingTitles() {
    const titleElement = document.getElementById('rotating-title');
    if (!titleElement) return;

    const titles = [
        'Full Stack Developer & AI Enthusiast',
        'Chatbot Engineer',
        'Data Analytics Practitioner',
        'Problem-Solving Aficionado'
    ];

    if (prefersReducedMotion) return;

    let idx = 0;
    const swapTitle = () => {
        idx = (idx + 1) % titles.length;
        titleElement.classList.add('fade-out');
        setTimeout(() => {
            titleElement.textContent = titles[idx];
            titleElement.classList.remove('fade-out');
        }, 250);
    };

    setInterval(swapTitle, 3800);
}

function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    let width = 0;
    let height = 0;

    const config = {
        maxParticles: 120,
        minSpeed: 0.1,
        maxSpeed: 0.6,
        linkDistance: 120,
        size: { min: 0.7, max: 2.4 }
    };

    const heroSection = document.getElementById('hero');

    const resizeCanvas = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = heroSection ? Math.max(heroSection.offsetHeight, window.innerHeight) : window.innerHeight;
        particles = generateParticles();
    };

    const generateParticles = () => {
        const count = Math.min(config.maxParticles, Math.floor(width / 12));
        return Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * config.maxSpeed,
            vy: (Math.random() - 0.5) * config.maxSpeed,
            size: Math.random() * (config.size.max - config.size.min) + config.size.min
        }));
    };

    const draw = () => {
        ctx.clearRect(0, 0, width, height);
        particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > height) particle.vy *= -1;

            ctx.beginPath();
            const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 2);
            gradient.addColorStop(0, 'rgba(111, 128, 255, 0.8)');
            gradient.addColorStop(1, 'rgba(111, 128, 255, 0)');
            ctx.fillStyle = gradient;
            ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
            ctx.fill();

            for (let j = index + 1; j < particles.length; j++) {
                const other = particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < config.linkDistance) {
                    ctx.strokeStyle = `rgba(111, 128, 255, ${1 - distance / config.linkDistance})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    requestAnimationFrame(draw);
}

function initParallax() {
    if (prefersReducedMotion) return;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (!parallaxElements.length) return;

    let lastScroll = 0;
    const update = () => {
        const scrollY = window.scrollY;
        if (Math.abs(scrollY - lastScroll) < 1) {
            requestAnimationFrame(update);
            return;
        }
        lastScroll = scrollY;
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.1;
            element.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
        });
        requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
}

function initScrollAnimations() {
    const animated = document.querySelectorAll('[data-animate]');
    if (!animated.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        animated.forEach(el => el.setAttribute('data-animate-state', 'visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-animate-state', 'visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    animated.forEach(el => observer.observe(el));
}

function initSkillProgress() {
    const skillItems = document.querySelectorAll('.skill-item');
    if (!skillItems.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        skillItems.forEach(item => {
            const fill = item.querySelector('.skill-fill');
            const value = item.dataset.progress;
            if (fill && value) {
                fill.style.width = `${value}%`;
            }
        });
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.skill-fill');
                const value = entry.target.dataset.progress;
                if (fill && value) {
                    fill.style.width = `${value}%`;
                    fill.parentElement.setAttribute('aria-valuenow', value);
                }
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillItems.forEach(item => observer.observe(item));
}

function initProjectFilters() {
    const buttons = document.querySelectorAll('.filter-button');
    const cards = document.querySelectorAll('.project-card');
    if (!buttons.length) return;

    const applyFilter = (filter) => {
        cards.forEach(card => {
            const category = card.dataset.category;
            const matches = filter === 'all' || category === filter;
            card.style.display = matches ? 'flex' : 'none';
            card.setAttribute('tabindex', matches ? '0' : '-1');
            card.setAttribute('aria-hidden', matches ? 'false' : 'true');
        });
    };

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const current = document.querySelector('.filter-button.active');
            if (current) {
                current.classList.remove('active');
                current.setAttribute('aria-selected', 'false');
            }
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            applyFilter(button.dataset.filter || 'all');
        });
    });

    const defaultButton = document.querySelector('.filter-button.active');
    if (defaultButton) {
        applyFilter(defaultButton.dataset.filter || 'all');
    }
}

function initProjectModals() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    const projectData = {
        rainfall: {
            title: 'Rainfall Prediction System',
            description: 'A predictive analytics pipeline that forecasts rainfall by training machine learning models on historical climatic datasets to support proactive agricultural decision-making.',
            highlights: [
                'Implemented data preprocessing workflows with Pandas & NumPy',
                'Optimised Random Forest & XGBoost models for improved accuracy',
                'Visualised feature importance to highlight climatic influence'
            ],
            demo: '',
            repo: ''
        },
        chatbot: {
            title: 'ChatBot AI',
            description: 'An intelligent virtual assistant designed to automate customer support, delivering context-aware responses and reducing manual intervention.',
            highlights: [
                'Architected intent classification using TensorFlow & Keras',
                'Integrated contextual memory for multi-turn conversations',
                'Deployed monitoring dashboard to analyse user satisfaction'
            ],
            demo: '',
            repo: ''
        },
        mediaware: {
            title: 'MediAware',
            description: 'An AI-driven public health chatbot that educates users about diseases through conversational interfaces and curated medical insights.',
            highlights: [
                'Crafted responsive frontend with HTML, CSS, and JavaScript',
                'Developed Flask backend to orchestrate AI assistant responses',
                'Embedded analytics to reveal usage patterns and FAQs'
            ],
            demo: '',
            repo: ''
        },
        fitnesspal: {
            title: 'FitnessPal',
            description: 'A React Native workout companion that builds personalised routines based on user goals, habits, and progress tracking metrics.',
            highlights: [
                'Designed adaptive workout generator for multiple fitness levels',
                'Implemented offline-first architecture for seamless usage',
                'Introduced social challenges to sustain user motivation'
            ],
            demo: '',
            repo: ''
        },
        bookclub: {
            title: 'BookClub',
            description: 'A community-driven platform enabling readers to discover, review, and discuss books through curated clubs and thematic collections.',
            highlights: [
                'Built scalable backend using Django & PostgreSQL',
                'Implemented recommendation engine powered by user preferences',
                'Secured role-based moderation for club leaders'
            ],
            demo: '',
            repo: ''
        },
        weathernow: {
            title: 'WeatherNow',
            description: 'A real-time weather dashboard that aggregates multi-source APIs to present forecasts, alerts, and interactive data visualisations.',
            highlights: [
                'Integrates RESTful weather services with graceful error handling',
                'Features modular UI components for insights and trends',
                'Implements offline caching strategies for last-known forecasts'
            ],
            demo: '',
            repo: ''
        }
    };

    const title = document.getElementById('modal-title');
    const description = document.getElementById('modal-description');
    const highlights = document.getElementById('modal-highlights');
    const demoLink = document.getElementById('modal-demo');
    const repoLink = document.getElementById('modal-repo');

    const openModal = (data) => {
        if (!data) return;
        title.textContent = data.title;
        description.textContent = data.description;
        highlights.innerHTML = '';
        data.highlights.forEach(point => {
            const li = document.createElement('li');
            li.textContent = point;
            highlights.appendChild(li);
        });

        if (data.demo) {
            demoLink.href = data.demo;
            demoLink.hidden = false;
        } else {
            demoLink.hidden = true;
        }

        if (data.repo) {
            repoLink.href = data.repo;
            repoLink.hidden = false;
        } else {
            repoLink.hidden = true;
        }

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    modal.addEventListener('click', (event) => {
        if (event.target.matches('[data-close="modal"], .modal-backdrop')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    const triggers = document.querySelectorAll('.project-detail');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const key = trigger.dataset.project;
            openModal(projectData[key]);
        });
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const status = form.querySelector('.form-status');
    const fields = Array.from(form.querySelectorAll('input, textarea'));

    const validators = {
        name: value => value.trim().length >= 2 ? '' : 'Please enter your name.',
        email: value => /\S+@\S+\.\S+/.test(value) ? '' : 'Enter a valid email address.',
        subject: value => value.trim().length >= 3 ? '' : 'Subject should be at least 3 characters.',
        message: value => value.trim().length >= 10 ? '' : 'Message should contain at least 10 characters.'
    };

    const showError = (field, message) => {
        const errorEl = field.parentElement.querySelector('.input-error');
        if (errorEl) {
            errorEl.textContent = message;
        }
        field.classList.toggle('input-invalid', Boolean(message));
    };

    fields.forEach(field => {
        field.addEventListener('input', () => {
            const validator = validators[field.name];
            if (validator) {
                const message = validator(field.value);
                showError(field, message);
            }
        });
    });

    form.addEventListener('submit', event => {
        event.preventDefault();
        let hasError = false;

        fields.forEach(field => {
            const validator = validators[field.name];
            if (validator) {
                const message = validator(field.value);
                showError(field, message);
                if (message) {
                    hasError = true;
                }
            }
        });

        if (hasError) {
            status.textContent = 'Please correct the highlighted fields.';
            status.style.color = 'var(--danger)';
            return;
        }

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();

        const body = `Hi Harsh,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0ARegards,%0D%0A${encodeURIComponent(name)}%0D%0A${encodeURIComponent(email)}`;
        const mailtoLink = `mailto:harsh.shah.dev@example.com?subject=${encodeURIComponent(subject)}&body=${body}`;

        status.textContent = 'Great! Opening your email client...';
        status.style.color = 'var(--success)';

        setTimeout(() => {
            window.location.href = mailtoLink;
        }, 200);

        form.reset();
        fields.forEach(field => showError(field, ''));
    });
}

function initBackToTop() {
    const button = document.querySelector('.back-to-top');
    if (!button) return;

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
}

function setCurrentYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}
