/**
 * ==========================================================================
 * M-VERSE // DEVELOPER OPERATIONS - JAVASCRIPT ENGINE
 * Features: Cinematic Intro Bootloader, Particle Canvas Background,
 *           Custom HUD Cursor, Real-Time Telemetry Clock, Role Typing,
 *           Mission Intel Modal, Arsenal Observers, Web Audio Synthesizer,
 *           Transmission Form Validation & Theme Switcher
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==================== 1. CINEMATIC INTRO BOOTLOADER ====================
    const introOverlay = document.getElementById('cinematic-intro');
    const introStatus = document.getElementById('intro-status-text');
    const introProgressBar = document.getElementById('intro-progress-bar');
    const introSkipBtn = document.getElementById('intro-skip-btn');

    const introSteps = [
        { text: '> INITIALIZING M-VERSE DEVELOPER CORE...', progress: 20, delay: 400 },
        { text: '> SYSTEM ONLINE // QUANTUM NODES SYNCHRONIZED', progress: 45, delay: 500 },
        { text: '> MISSION DATABASE CONNECTED // TELEMETRY STABLE', progress: 75, delay: 500 },
        { text: '> HUD COMMAND CENTER READY // WELCOME, MOHANESWARAN', progress: 100, delay: 600 }
    ];

    const hasIntroPlayed = sessionStorage.getItem('mverse_intro_completed');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function finishIntro() {
        if (!introOverlay) return;
        introOverlay.classList.add('hidden');
        sessionStorage.setItem('mverse_intro_completed', 'true');
        setTimeout(() => {
            introOverlay.style.display = 'none';
        }, 800);
    }

    if (hasIntroPlayed || prefersReducedMotion) {
        if (introOverlay) introOverlay.style.display = 'none';
    } else if (introOverlay) {
        let stepIdx = 0;
        function runIntroSequence() {
            if (stepIdx < introSteps.length) {
                const current = introSteps[stepIdx];
                if (introStatus) introStatus.textContent = current.text;
                if (introProgressBar) introProgressBar.style.width = `${current.progress}%`;
                stepIdx++;
                setTimeout(runIntroSequence, current.delay);
            } else {
                setTimeout(finishIntro, 500);
            }
        }
        setTimeout(runIntroSequence, 300);

        introSkipBtn?.addEventListener('click', finishIntro);
    }

    // ==================== 2. WEB AUDIO UI SOUND SYNTHESIZER (MUTED BY DEFAULT) ====================
    let audioContext = null;
    let isSoundEnabled = false;
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    const soundIcon = soundToggleBtn ? soundToggleBtn.querySelector('i') : null;

    function initAudio() {
        if (!audioContext) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) audioContext = new AudioCtx();
        }
    }

    function playHudBeep(freq = 800, duration = 0.04, type = 'sine') {
        if (!isSoundEnabled || !audioContext) return;
        try {
            if (audioContext.state === 'suspended') audioContext.resume();
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioContext.currentTime);
            gain.gain.setValueAtTime(0.04, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.start();
            osc.stop(audioContext.currentTime + duration);
        } catch (e) {
            // Audio policy fallback
        }
    }

    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', () => {
            initAudio();
            isSoundEnabled = !isSoundEnabled;
            if (soundIcon) {
                soundIcon.className = isSoundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
            }
            soundToggleBtn.title = isSoundEnabled ? 'Audio Feedback: Active' : 'Audio Feedback: Muted';
            if (isSoundEnabled) playHudBeep(920, 0.08, 'triangle');
        });
    }

    // Attach subtle blip to buttons on hover/click when enabled
    document.querySelectorAll('.btn-hud, .mission-tab, .comms-link-btn, .nav-links-menu a').forEach(el => {
        el.addEventListener('mouseenter', () => playHudBeep(650, 0.03, 'sine'));
        el.addEventListener('click', () => playHudBeep(1050, 0.05, 'triangle'));
    });

    // ==================== 3. CUSTOM HUD CURSOR ====================
    const cursorDot = document.getElementById('hud-cursor-dot');
    const cursorRing = document.getElementById('hud-cursor-ring');

    if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursorRing() {
            ringX += (mouseX - ringX) * 0.18;
            ringY += (mouseY - ringY) * 0.18;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            requestAnimationFrame(animateCursorRing);
        }
        animateCursorRing();

        const interactives = document.querySelectorAll('a, button, input, textarea, .hud-card, .mission-tab');
        interactives.forEach(item => {
            item.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
            item.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
        });
    }

    // ==================== 4. PARTICLES CANVAS BACKGROUND ====================
    const canvas = document.getElementById('hud-canvas-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const particleCount = window.innerWidth < 768 ? 35 : 75;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 1.8 + 0.8,
                alpha: Math.random() * 0.5 + 0.2
            });
        }

        function drawParticles() {
            if (document.hidden) {
                requestAnimationFrame(drawParticles);
                return;
            }

            ctx.clearRect(0, 0, width, height);

            const isLight = document.body.classList.contains('light-mode');
            const dotColor = isLight ? 'rgba(79, 70, 229, ' : 'rgba(0, 240, 255, ';
            const lineColor = isLight ? 'rgba(79, 70, 229, 0.05)' : 'rgba(0, 240, 255, 0.04)';

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${dotColor}${p.alpha})`;
                ctx.fill();

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = lineColor;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(drawParticles);
        }
        drawParticles();

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    }

    // ==================== 5. REAL-TIME TELEMETRY CLOCK ====================
    const telemetryClock = document.getElementById('telemetry-clock');
    function updateTelemetryClock() {
        if (!telemetryClock) return;
        const now = new Date();
        const utcHours = String(now.getUTCHours()).padStart(2, '0');
        const utcMinutes = String(now.getUTCMinutes()).padStart(2, '0');
        const utcSeconds = String(now.getUTCSeconds()).padStart(2, '0');
        telemetryClock.textContent = `UTC ${utcHours}:${utcMinutes}:${utcSeconds}`;
    }
    updateTelemetryClock();
    setInterval(updateTelemetryClock, 1000);

    // ==================== 6. TYPING ROLE EFFECT ====================
    const typedRoleElement = document.getElementById('typed-role-text');
    const operationalRoles = [
        'Data Analytics Specialist',
        'Business Intelligence & AI Engineer',
        'Machine Learning & Predictive Modeler',
        'SQL & Python Pipeline Architect',
        'Full-Stack Data Solutions Developer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const holdTime = 1800;

    function runRoleTyping() {
        if (!typedRoleElement) return;

        const currentRole = operationalRoles[roleIndex];

        if (isDeleting) {
            typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            delay = holdTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % operationalRoles.length;
            delay = 300;
        }

        setTimeout(runRoleTyping, delay);
    }
    runRoleTyping();

    // ==================== 7. LIGHT / DARK THEME SWITCHER ====================
    const modeToggleBtn = document.getElementById('mode-toggle-btn');
    const modeIcon = modeToggleBtn ? modeToggleBtn.querySelector('i') : null;

    const savedMode = localStorage.getItem('mverse_mode') || 'dark';
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
            localStorage.setItem('mverse_mode', isLight ? 'light' : 'dark');

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

    // ==================== 8. SCROLLSPY & BACK TO TOP ====================
    const backToTopBtn = document.getElementById('hud-back-top');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links-menu a');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollY > 150) {
            backToTopBtn?.classList.add('visible');
        } else {
            backToTopBtn?.classList.remove('visible');
        }

        let currentSection = '';
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 190;
            const secHeight = sec.offsetHeight;
            if (scrollY >= secTop && scrollY < secTop + secHeight) {
                currentSection = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==================== 9. MOBILE HAMBURGER MENU ====================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navLinksMenu = document.getElementById('nav-links-menu');

    if (hamburgerBtn && navLinksMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navLinksMenu.classList.toggle('active');
            document.body.style.overflow = navLinksMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navLinksMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==================== 10. MISSION FILTER TABS ====================
    const missionTabs = document.querySelectorAll('.mission-tab');
    const missionCards = document.querySelectorAll('.mission-card');

    missionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            missionTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterCat = tab.getAttribute('data-filter');

            missionCards.forEach(card => {
                const cardCat = card.getAttribute('data-mission-cat') || '';
                if (filterCat === 'all' || cardCat.includes(filterCat)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.94)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // ==================== 11. MISSION INTEL MODAL DATA ====================
    const missionIntelData = {
        'collabsphere': {
            title: 'MISSION 01 // CollabSphere — Collaborative Workspace & Telemetry',
            image: './assets/project1.png',
            tags: ['Python', 'SQL', 'Data Analytics', 'FastAPI / Node.js', 'Chart.js', 'Real-time WebSocket'],
            description: 'CollabSphere is an enterprise-grade collaborative workspace and operational telemetry platform. It unifies project task flows with automated productivity analytics, tracking developer velocity, task dependencies, and workload distribution in real time.',
            features: [
                'Real-time multi-user task synchronization and collaborative boards',
                'Sprint velocity telemetry with automated burn-down and burn-up trajectory charts',
                'SQL-driven analytics query engine for historical team performance metrics',
                'Interactive workload balance heatmaps to detect and prevent team bottlenecks',
                'Customizable KPI summary reports for engineering and project leadership'
            ],
            githubUrl: 'https://github.com/Mohan5047/',
            liveUrl: '#'
        },
        'ecova': {
            title: 'MISSION 02 // Ecova — Smart Sustainability & Carbon Analytics',
            image: './assets/project2.png',
            tags: ['Python', 'Data Science', 'Pandas & NumPy', 'Machine Learning', 'ESG Compliance', 'Time Series'],
            description: 'Ecova is an environmental data intelligence platform engineered to quantify, forecast, and optimize facility carbon emissions and power consumption. It ingests multi-source sensor and utility datasets to deliver actionable decarbonization insights.',
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
            title: 'MISSION 03 // AI Interview Agent — Candidate Evaluation & Speech Analytics',
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
            tags: ['Generative AI', 'LLMs', 'NLP', 'Speech Analytics', 'Python', 'Sentiment Analysis'],
            description: 'An AI-powered candidate interview assessment system. The agent conducts dynamic, context-aware technical interviews, evaluates candidate response depth, analyzes speech cadence and sentiment, and compiles structured analytical scorecards.',
            features: [
                'Dynamic question generation tailored to role requirements and candidate answers',
                'Audio speech-to-text processing with sentiment, tone, and confidence analytics',
                'Automated answer benchmarking against comprehensive technical rubrics',
                'Instant candidate hiring scorecard generation with radar charts and competency breakdowns',
                'Objective, bias-mitigated evaluation algorithms ensuring data-backed talent acquisition'
            ],
            githubUrl: 'https://github.com/Mohan5047/',
            liveUrl: '#'
        }
    };

    const modalOverlay = document.getElementById('hud-modal-overlay');
    const modalCloseBtn = document.getElementById('modal-exit-btn');
    const modalImg = document.getElementById('modal-intel-img');
    const modalHeadline = document.getElementById('modal-mission-headline');
    const modalTagCluster = document.getElementById('modal-tag-cluster');
    const modalOverview = document.getElementById('modal-overview-text');
    const modalFeaturesList = document.getElementById('modal-features-checklist');
    const modalGithubBtn = document.getElementById('modal-github-btn');
    const modalLiveBtn = document.getElementById('modal-live-btn');

    function openMissionModal(key) {
        const intel = missionIntelData[key];
        if (!intel || !modalOverlay) return;

        if (modalImg) modalImg.src = intel.image;
        if (modalHeadline) modalHeadline.textContent = intel.title;
        if (modalOverview) modalOverview.textContent = intel.description;
        if (modalGithubBtn) modalGithubBtn.href = intel.githubUrl;
        if (modalLiveBtn) modalLiveBtn.href = intel.liveUrl;

        if (modalTagCluster) {
            modalTagCluster.innerHTML = '';
            intel.tags.forEach(tag => {
                const chip = document.createElement('span');
                chip.className = 'stack-chip';
                chip.textContent = tag;
                modalTagCluster.appendChild(chip);
            });
        }

        if (modalFeaturesList) {
            modalFeaturesList.innerHTML = '';
            intel.features.forEach(feat => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${feat}</span>`;
                modalFeaturesList.appendChild(li);
            });
        }

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMissionModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-open-mission]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const missionKey = btn.getAttribute('data-open-mission');
            openMissionModal(missionKey);
        });
    });

    modalCloseBtn?.addEventListener('click', closeMissionModal);
    modalOverlay?.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeMissionModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
            closeMissionModal();
        }
    });

    // ==================== 12. ANIMATED RECORD STATS & ARSENAL OBSERVERS ====================
    const statCounters = document.querySelectorAll('.stat-counter-val');
    let statsAnimated = false;

    function runStatsCounter() {
        statCounters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target') || counter.textContent, 10);
            let current = 0;
            const duration = 1500;
            const stepMs = Math.max(15, Math.floor(duration / target));

            counter.textContent = '0';
            const interval = setInterval(() => {
                current += Math.ceil(target / (duration / stepMs));
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(interval);
                } else {
                    counter.textContent = current;
                }
            }, stepMs);
        });
    }

    const recordsGrid = document.querySelector('.records-stats-grid');
    if (recordsGrid) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    runStatsCounter();
                }
            });
        }, { threshold: 0.25 });
        observer.observe(recordsGrid);
    }

    // Skills progress bars observer
    const techFills = document.querySelectorAll('.tech-bar-fill');
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const pct = bar.getAttribute('data-tech-pct') || '85%';
                bar.style.width = pct;
                techObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });
    techFills.forEach(fill => techObserver.observe(fill));

    // ==================== 13. OPEN CHANNEL TRANSMISSION FORM ====================
    const transmissionForm = document.getElementById('open-channel-form');
    const transmissionToast = document.getElementById('transmission-toast');

    if (transmissionForm) {
        transmissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('sender-name')?.value.trim();
            const email = document.getElementById('sender-email')?.value.trim();
            const msg = document.getElementById('transmission-msg')?.value.trim();

            if (!name || !email || !msg) {
                alert('All transmission parameters are required.');
                return;
            }

            if (transmissionToast) {
                transmissionToast.style.display = 'block';
                transmissionForm.reset();
                setTimeout(() => {
                    transmissionToast.style.display = 'none';
                }, 6000);
            }
        });
    }
});
