/**
 * ==========================================================================
 * MOHANESWARAN M - DATA ANALYTICS & AI PORTFOLIO JAVASCRIPT
 * Features: Analytics Typing Engine, KPI Telemetry, Project Modal Store,
 *           Filter Tabs, Stats Observers & Validations
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==================== 1. DATA ANALYTICS TYPING ANIMATION ====================
    const typedTextElement = document.getElementById('typed-text');
    const roleList = [
        'Data Analytics Specialist',
        'Business Intelligence & Insights Analyst',
        'AI & Machine Learning Practitioner',
        'Predictive Modeling & Statistical Analyst',
        'SQL & Python Data Engineer'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 85;
    const deleteSpeed = 40;
    const pauseTime = 1800;

    function runTypingLoop() {
        if (!typedTextElement) return;

        const currentWord = roleList[roleIdx];

        if (isDeleting) {
            typedTextElement.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typedTextElement.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
        }

        let delay = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIdx === currentWord.length) {
            delay = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roleList.length;
            delay = 350;
        }

        setTimeout(runTypingLoop, delay);
    }
    runTypingLoop();

    // ==================== 2. DARK / LIGHT MODE SWITCHER ====================
    const modeToggleBtn = document.getElementById('mode-toggle-btn');
    const modeIcon = modeToggleBtn ? modeToggleBtn.querySelector('i') : null;

    const savedMode = localStorage.getItem('mohan_analytics_mode') || 'dark';
    if (savedMode === 'light') {
        document.body.classList.add('light-mode');
        if (modeIcon) {
            modeIcon.classList.remove('fa-moon');
            modeIcon.classList.add('fa-sun');
        }
    }

    if (modeToggleBtn) {
        modeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            localStorage.setItem('mohan_analytics_mode', isLight ? 'light' : 'dark');

            if (modeIcon) {
                if (isLight) {
                    modeIcon.classList.remove('fa-moon');
                    modeIcon.classList.add('fa-sun');
                } else {
                    modeIcon.classList.remove('fa-sun');
                    modeIcon.classList.add('fa-moon');
                }
            }
        });
    }

    // ==================== 3. SCROLL BEHAVIOR & SCROLLSPY ====================
    const header = document.getElementById('header');
    const floatTopBtn = document.getElementById('float-top-btn');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function onScrollHandler() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollY > 60) {
            floatTopBtn?.classList.add('visible');
        } else {
            floatTopBtn?.classList.remove('visible');
        }

        let currentSecId = '';
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 190;
            const secHeight = sec.offsetHeight;
            if (scrollY >= secTop && scrollY < secTop + secHeight) {
                currentSecId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSecId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScrollHandler, { passive: true });
    onScrollHandler();

    if (floatTopBtn) {
        floatTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==================== 4. MOBILE HAMBURGER ====================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        document.addEventListener('click', (e) => {
            if (!header.contains(e.target) && navMenu.classList.contains('active')) {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ==================== 5. STATS ANIMATED COUNTERS ====================
    const statElements = document.querySelectorAll('.stat-num');
    let hasCounted = false;

    function countUpStats() {
        statElements.forEach(el => {
            const targetVal = parseInt(el.getAttribute('data-target') || el.textContent, 10);
            let current = 0;
            const totalDuration = 1500;
            const stepMs = Math.max(15, Math.floor(totalDuration / targetVal));

            el.textContent = '0';
            const timer = setInterval(() => {
                current += Math.ceil(targetVal / (totalDuration / stepMs));
                if (current >= targetVal) {
                    el.textContent = targetVal;
                    clearInterval(timer);
                } else {
                    el.textContent = current;
                }
            }, stepMs);
        });
    }

    const bentoStatsBox = document.querySelector('.bento-stats');
    if (bentoStatsBox) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasCounted) {
                    hasCounted = true;
                    countUpStats();
                }
            });
        }, { threshold: 0.3 });
        statsObserver.observe(bentoStatsBox);
    }

    // ==================== 6. SKILL BARS OBSERVER ====================
    const progressFills = document.querySelectorAll('.progress-fill');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const targetPercent = fill.getAttribute('data-pct') || '85%';
                fill.style.width = targetPercent;
                skillsObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.2 });

    progressFills.forEach(fill => skillsObserver.observe(fill));

    // ==================== 7. PROJECT FILTER TABS ====================
    const tabPills = document.querySelectorAll('.tab-pill');
    const showcaseCards = document.querySelectorAll('.showcase-card');

    tabPills.forEach(tab => {
        tab.addEventListener('click', () => {
            tabPills.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterCategory = tab.getAttribute('data-filter');

            showcaseCards.forEach(card => {
                const category = card.getAttribute('data-cat') || '';
                if (filterCategory === 'all' || category.includes(filterCategory)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.92)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ==================== 8. ACTUAL PROJECT MODAL DATA ====================
    const projectStore = {
        'collabsphere': {
            title: 'CollabSphere — Collaborative Workspace & Team Analytics',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
            tags: ['Python', 'Data Analytics', 'SQL', 'FastAPI / Node.js', 'Chart.js', 'Workload Metrics'],
            description: 'CollabSphere is an intelligent collaborative workspace and team productivity platform. It unifies project task flows with automated analytics dashboards, tracking developer velocity, task dependencies, and workload distribution in real time.',
            features: [
                'Real-time task synchronization and team collaboration boards',
                'Sprint velocity telemetry and automated burn-down charts',
                'SQL-driven analytics query engine for historical team performance metrics',
                'Interactive workload balance heatmaps to prevent resource bottlenecks',
                'Customizable KPI summary reports for technical project leads'
            ],
            githubUrl: 'https://github.com/Mohan5047/',
            liveUrl: '#'
        },
        'ecova': {
            title: 'Ecova — Smart Sustainability & Carbon Analytics Platform',
            image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop',
            tags: ['Python', 'Data Science', 'Pandas & NumPy', 'Machine Learning', 'ESG Compliance', 'Time Series'],
            description: 'Ecova is an environmental data analytics platform engineered to measure, forecast, and optimize organizational carbon emissions and energy consumption. It ingests multi-source sensor and utility data to deliver actionable decarbonization insights.',
            features: [
                'Time-series predictive modeling forecasting facility energy demand and peak loads',
                'Automated carbon emission metric conversions across Scope 1, 2, and 3 activities',
                'Anomaly detection algorithms identifying irregular power consumption spikes',
                'Dynamic ESG compliance dashboards with interactive data visualization',
                'High-performance data cleaning and statistical modeling pipelines in Python'
            ],
            githubUrl: 'https://github.com/Mohan5047/',
            liveUrl: '#'
        },
        'aiinterview': {
            title: 'AI Interview Agent — Automated Candidate Evaluation & Speech Analytics',
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
            tags: ['Generative AI', 'LLMs', 'NLP', 'Speech Analytics', 'Python', 'Sentiment Analysis'],
            description: 'An AI-powered candidate interview assessment system. The agent conducts dynamic, context-aware technical interviews, evaluates candidate response depth, analyzes speech cadence and sentiment, and compiles structured analytical scorecards.',
            features: [
                'Dynamic question generation tailored to role requirements and real-time candidate answers',
                'Audio speech-to-text processing with sentiment, tone, and confidence analytics',
                'Automated answer benchmarking against comprehensive technical rubrics',
                'Instant candidate hiring scorecard generation with radar charts and competency breakdowns',
                'Objective, bias-mitigated evaluation algorithms ensuring data-backed talent acquisition'
            ],
            githubUrl: 'https://github.com/Mohan5047/',
            liveUrl: '#'
        }
    };

    const modalOverlay = document.getElementById('project-modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalHeroImg = document.getElementById('modal-hero-img');
    const modalHeading = document.getElementById('modal-heading');
    const modalTagRow = document.getElementById('modal-tag-row');
    const modalParagraph = document.getElementById('modal-paragraph');
    const modalFeatureItems = document.getElementById('modal-feature-items');
    const modalGithubBtn = document.getElementById('modal-github-btn');
    const modalLiveBtn = document.getElementById('modal-live-btn');

    function openProjectModal(key) {
        const proj = projectStore[key];
        if (!proj || !modalOverlay) return;

        if (modalHeroImg) modalHeroImg.src = proj.image;
        if (modalHeading) modalHeading.textContent = proj.title;
        if (modalParagraph) modalParagraph.textContent = proj.description;
        if (modalGithubBtn) modalGithubBtn.href = proj.githubUrl;
        if (modalLiveBtn) modalLiveBtn.href = proj.liveUrl;

        if (modalTagRow) {
            modalTagRow.innerHTML = '';
            proj.tags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'chip-tag';
                span.textContent = tag;
                modalTagRow.appendChild(span);
            });
        }

        if (modalFeatureItems) {
            modalFeatureItems.innerHTML = '';
            proj.features.forEach(feat => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${feat}</span>`;
                modalFeatureItems.appendChild(li);
            });
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    const modalTriggers = document.querySelectorAll('[data-open-modal]');
    modalTriggers.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectKey = btn.getAttribute('data-open-modal');
            openProjectModal(projectKey);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProjectModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeProjectModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // ==================== 9. CONTACT FORM ====================
    const contactForm = document.getElementById('cyber-contact-form');
    const contactToast = document.getElementById('contact-toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('c-name')?.value.trim();
            const email = document.getElementById('c-email')?.value.trim();
            const msg = document.getElementById('c-msg')?.value.trim();

            if (!name || !email || !msg) {
                alert('Please fill out all required fields.');
                return;
            }

            if (contactToast) {
                contactToast.style.display = 'block';
                contactForm.reset();
                setTimeout(() => {
                    contactToast.style.display = 'none';
                }, 6000);
            }
        });
    }
});
