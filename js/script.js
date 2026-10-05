/**
 * ==========================================================================
 * MOHANESWARAN — DEVELOPER MULTIVERSE ENGINE
 * Connected 3D Spatial Universe, Three.js Camera Controller,
 * Branching Spline Lines, Particle Constellations, Contextual Cursor,
 * Dynamic Role Typing, Project Universes, and Spatial Navigation
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // ==================== 1. CINEMATIC MULTIVERSE INTRO ====================
    const introOverlay = document.getElementById('multiverse-intro');
    const introStatus = document.getElementById('intro-stream-message');
    const introProgressBar = document.getElementById('intro-timeline-fill');
    const introSkipBtn = document.getElementById('intro-skip-button');

    const introSteps = [
        { text: '> DETECTING MULTIVERSE SINGULARITY POINT...', progress: 25, delay: 400 },
        { text: '> EXPANDING CONNECTED TIMELINES & NEURAL PATHS...', progress: 50, delay: 500 },
        { text: '> SYNCHRONIZING ARSENAL & MISSION REPOSITORIES...', progress: 80, delay: 500 },
        { text: '> MULTIVERSE READY // WELCOME TO MOHANESWARAN\'S REALM', progress: 100, delay: 600 }
    ];

    const hasIntroPlayed = sessionStorage.getItem('multiverse_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function finishIntro() {
        if (!introOverlay) return;
        introOverlay.classList.add('hidden');
        sessionStorage.setItem('multiverse_intro_seen', 'true');
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

    // ==================== 2. WEB AUDIO UI SOUND SYNTHESIZER ====================
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

    function playSpatialBeep(freq = 800, duration = 0.04, type = 'sine') {
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
        } catch (e) {}
    }

    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', () => {
            initAudio();
            isSoundEnabled = !isSoundEnabled;
            if (soundIcon) {
                soundIcon.className = isSoundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
            }
            soundToggleBtn.title = isSoundEnabled ? 'Audio Feedback: Active' : 'Audio Feedback: Muted';
            if (isSoundEnabled) playSpatialBeep(920, 0.08, 'triangle');
        });
    }

    // ==================== 3. THREE.JS 3D MULTIVERSE SPATIAL ENGINE ====================
    const canvasContainer = document.getElementById('multiverse-canvas');
    let scene, camera, renderer;
    let starField, nodeMeshGroup, splineCurves = [], energyPhotons = [];
    let targetCameraY = 0;
    let targetCameraX = 0;
    let mouseNormX = 0;
    let mouseNormY = 0;

    const spatialWaypoints = [
        { name: 'origin', x: 0, y: 0, z: 25 },
        { name: 'about', x: 6, y: -25, z: 22 },
        { name: 'projects', x: -8, y: -55, z: 24 },
        { name: 'skills', x: 8, y: -85, z: 20 },
        { name: 'experience', x: -6, y: -115, z: 22 },
        { name: 'intel', x: 6, y: -145, z: 22 },
        { name: 'contact', x: 0, y: -175, z: 20 }
    ];

    function initThreeMultiverse() {
        if (!canvasContainer || typeof THREE === 'undefined') return;

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 25);

        renderer = new THREE.WebGLRenderer({
            canvas: canvasContainer,
            alpha: true,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // 1. 3D Particle Starfield
        const particleCount = window.innerWidth < 768 ? 400 : 900;
        const particleGeo = new THREE.BufferGeometry();
        const particlePos = new Float32Array(particleCount * 3);
        const particleColors = new Float32Array(particleCount * 3);

        const color1 = new THREE.Color(0x6366f1);
        const color2 = new THREE.Color(0x00f0ff);
        const color3 = new THREE.Color(0x8b5cf6);

        for (let i = 0; i < particleCount; i++) {
            particlePos[i * 3] = (Math.random() - 0.5) * 140;
            particlePos[i * 3 + 1] = (Math.random() - 0.5) * 220 - 70;
            particlePos[i * 3 + 2] = (Math.random() - 0.5) * 80;

            const mixedColor = Math.random() > 0.5 ? color1.clone().lerp(color2, Math.random()) : color3;
            particleColors[i * 3] = mixedColor.r;
            particleColors[i * 3 + 1] = mixedColor.g;
            particleColors[i * 3 + 2] = mixedColor.b;
        }

        particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
        particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

        const particleMat = new THREE.PointsMaterial({
            size: 1.5,
            vertexColors: true,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending
        });

        starField = new THREE.Points(particleGeo, particleMat);
        scene.add(starField);

        // 2. Multiverse Nodes & Connecting Bezier Splines
        nodeMeshGroup = new THREE.Group();
        scene.add(nodeMeshGroup);

        const sphereGeo = new THREE.SphereGeometry(1.2, 24, 24);
        const nodeMat = new THREE.MeshBasicMaterial({
            color: 0x00f0ff,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });

        const points = [];
        spatialWaypoints.forEach((wp) => {
            const nodeMesh = new THREE.Mesh(sphereGeo, nodeMat);
            nodeMesh.position.set(wp.x, wp.y, -5);
            nodeMeshGroup.add(nodeMesh);
            points.push(new THREE.Vector3(wp.x, wp.y, -5));
        });

        // Generate smooth connecting spline curve between nodes
        const spline = new THREE.CatmullRomCurve3(points);
        const splineGeo = new THREE.BufferGeometry().setFromPoints(spline.getPoints(200));
        const splineMat = new THREE.LineBasicMaterial({
            color: 0x6366f1,
            transparent: true,
            opacity: 0.35,
            linewidth: 2
        });
        const splineLine = new THREE.Line(splineGeo, splineMat);
        scene.add(splineLine);

        // 3. Energy Photons traveling along spline
        const photonGeo = new THREE.SphereGeometry(0.35, 12, 12);
        const photonMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });

        for (let i = 0; i < 8; i++) {
            const photon = new THREE.Mesh(photonGeo, photonMat);
            photon.userData = { progress: i * 0.125, speed: 0.0015 + Math.random() * 0.001 };
            scene.add(photon);
            energyPhotons.push({ mesh: photon, spline: spline });
        }

        animateThreeScene();
    }

    function animateThreeScene() {
        requestAnimationFrame(animateThreeScene);

        if (document.hidden) return;

        // Rotate starfield slowly
        if (starField) {
            starField.rotation.y += 0.0004;
        }

        // Animate nodes pulsation
        if (nodeMeshGroup) {
            nodeMeshGroup.children.forEach((child, i) => {
                child.rotation.y += 0.01;
                child.rotation.x += 0.005;
                const scale = 1 + Math.sin(Date.now() * 0.002 + i) * 0.15;
                child.scale.set(scale, scale, scale);
            });
        }

        // Animate traveling energy photons
        energyPhotons.forEach(item => {
            item.mesh.userData.progress += item.mesh.userData.speed;
            if (item.mesh.userData.progress > 1) item.mesh.userData.progress = 0;
            const pos = item.spline.getPoint(item.mesh.userData.progress);
            if (pos) item.mesh.position.copy(pos);
        });

        // Camera Smooth Interpolation to scroll target + mouse parallax
        camera.position.y += (targetCameraY - camera.position.y) * 0.06;
        camera.position.x += ((targetCameraX + mouseNormX * 3) - camera.position.x) * 0.06;
        camera.lookAt(camera.position.x * 0.2, camera.position.y, 0);

        renderer.render(scene, camera);
    }

    initThreeMultiverse();

    window.addEventListener('resize', () => {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('mousemove', (e) => {
        mouseNormX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseNormY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // ==================== 4. CONTEXTUAL MULTIVERSE CURSOR ====================
    const cursorDot = document.getElementById('multiverse-cursor-dot');
    const cursorOrb = document.getElementById('multiverse-cursor-orb');
    const cursorTag = document.getElementById('cursor-action-tag');

    if (cursorDot && cursorOrb && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let orbX = mouseX;
        let orbY = mouseY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        function animateCursorOrb() {
            orbX += (mouseX - orbX) * 0.16;
            orbY += (mouseY - orbY) * 0.16;
            cursorOrb.style.left = `${orbX}px`;
            cursorOrb.style.top = `${orbY}px`;
            requestAnimationFrame(animateCursorOrb);
        }
        animateCursorOrb();

        function bindCursorInteraction(selector, tagText) {
            document.querySelectorAll(selector).forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorOrb.classList.add('active');
                    if (cursorTag) cursorTag.textContent = tagText;
                    playSpatialBeep(620, 0.03, 'sine');
                });
                el.addEventListener('mouseleave', () => {
                    cursorOrb.classList.remove('active');
                    if (cursorTag) cursorTag.textContent = '';
                });
            });
        }

        bindCursorInteraction('.dock-nav-item', 'TRAVEL');
        bindCursorInteraction('.btn-multiverse, button', 'ENTER');
        bindCursorInteraction('.project-universe-card', 'EXPLORE');
        bindCursorInteraction('.frequency-node-card', 'COMMS');
    }

    // ==================== 5. SPATIAL SCROLL & CAMERA NAVIGATION ====================
    const stations = document.querySelectorAll('.spatial-station');
    const dockItems = document.querySelectorAll('.dock-nav-item');

    function updateSpatialJourney() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPct = totalHeight > 0 ? scrollY / totalHeight : 0;

        // Map scroll to 3D camera travel
        targetCameraY = -scrollPct * 175;
        targetCameraX = Math.sin(scrollPct * Math.PI * 3) * 6;

        let activeStation = 'origin';
        stations.forEach((station) => {
            const rect = station.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.2) {
                activeStation = station.getAttribute('id') || 'origin';
            }
        });

        dockItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${activeStation}`) {
                item.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateSpatialJourney, { passive: true });
    updateSpatialJourney();

    dockItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
                playSpatialBeep(1080, 0.06, 'triangle');
            }
        });
    });

    // ==================== 6. DYNAMIC ROLE TYPING ====================
    const typedRoleElement = document.getElementById('typed-multiverse-role');
    const multiverseRoles = [
        'Data Analytics Specialist',
        'Business Intelligence & AI Engineer',
        'Predictive Modeling & Statistical Architect',
        'SQL & Python Pipeline Specialist',
        'Full-Stack Data Solutions Developer'
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function runMultiverseTyping() {
        if (!typedRoleElement) return;
        const current = multiverseRoles[roleIdx];

        if (isDeleting) {
            typedRoleElement.textContent = current.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typedRoleElement.textContent = current.substring(0, charIdx + 1);
            charIdx++;
        }

        let delay = isDeleting ? 40 : 80;

        if (!isDeleting && charIdx === current.length) {
            delay = 1800;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % multiverseRoles.length;
            delay = 300;
        }

        setTimeout(runMultiverseTyping, delay);
    }
    runMultiverseTyping();

    // ==================== 7. LIGHT / DARK WORKSTATION THEME SWITCHER ====================
    const modeToggleBtn = document.getElementById('mode-toggle-btn');
    const modeIcon = modeToggleBtn ? modeToggleBtn.querySelector('i') : null;

    const savedMode = localStorage.getItem('multiverse_theme') || 'dark';
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
            localStorage.setItem('multiverse_theme', isLight ? 'light' : 'dark');

            if (modeIcon) {
                if (isLight) {
                    modeIcon.classList.remove('fa-moon');
                    modeIcon.classList.add('fa-sun');
                } else {
                    modeIcon.classList.remove('fa-sun');
                    modeIcon.classList.add('fa-moon');
                }
            }
            playSpatialBeep(850, 0.05, 'triangle');
        });
    }

    // ==================== 8. PROJECT MULTIVERSE DATA & MODAL ====================
    const projectUniverseStore = {
        'collabsphere': {
            title: 'CollabSphere — Collaborative Workspace & Team Telemetry',
            image: './assets/project1.png',
            tags: ['Python', 'SQL', 'Data Analytics', 'FastAPI / Node.js', 'Chart.js', 'WebSockets'],
            description: 'CollabSphere is an enterprise-grade collaborative workspace and operational telemetry platform. It unifies project task flows with automated productivity analytics, tracking developer velocity, task dependencies, and workload distribution in real time.',
            features: [
                'Real-time multi-user task synchronization and collaborative kanban boards',
                'Sprint velocity telemetry with automated burn-down and burn-up trajectory charts',
                'SQL-driven analytics query engine for historical team performance metrics',
                'Interactive workload balance heatmaps to detect and prevent team bottlenecks',
                'Customizable KPI summary reports for engineering and project leadership'
            ],
            githubUrl: 'https://github.com/Mohan5047/',
            liveUrl: '#'
        },
        'ecova': {
            title: 'Ecova — Smart Sustainability & Carbon Data Analytics',
            image: './assets/project2.png',
            tags: ['Python', 'Data Science', 'Pandas & NumPy', 'Machine Learning', 'Time Series', 'ESG Compliance'],
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
            title: 'AI Interview Agent — Candidate Evaluation & Speech Analytics',
            image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
            tags: ['Generative AI', 'LLMs', 'NLP', 'Speech Analytics', 'Python', 'Sentiment Scoring'],
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

    const modalOverlay = document.getElementById('multiverse-modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-trigger');
    const modalImg = document.getElementById('modal-portal-img');
    const modalTitle = document.getElementById('modal-project-title');
    const modalTagGalaxy = document.getElementById('modal-tag-galaxy');
    const modalNarrative = document.getElementById('modal-narrative-text');
    const modalFeaturesList = document.getElementById('modal-features-list');
    const modalGithubBtn = document.getElementById('modal-github-btn');
    const modalLiveBtn = document.getElementById('modal-live-btn');

    function openProjectModal(key) {
        const intel = projectUniverseStore[key];
        if (!intel || !modalOverlay) return;

        if (modalImg) modalImg.src = intel.image;
        if (modalTitle) modalTitle.textContent = intel.title;
        if (modalNarrative) modalNarrative.textContent = intel.description;
        if (modalGithubBtn) modalGithubBtn.href = intel.githubUrl;
        if (modalLiveBtn) modalLiveBtn.href = intel.liveUrl;

        if (modalTagGalaxy) {
            modalTagGalaxy.innerHTML = '';
            intel.tags.forEach(tag => {
                const chip = document.createElement('span');
                chip.className = 'universe-chip';
                chip.textContent = tag;
                modalTagGalaxy.appendChild(chip);
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
        playSpatialBeep(1150, 0.08, 'triangle');
    }

    function closeProjectModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('[data-open-universe]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const universeKey = btn.getAttribute('data-open-universe');
            openProjectModal(universeKey);
        });
    });

    modalCloseBtn?.addEventListener('click', closeProjectModal);
    modalOverlay?.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeProjectModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // ==================== 9. MULTIVERSE FILTER TABS ====================
    const filterPills = document.querySelectorAll('.multiverse-filter-pill');
    const projectCards = document.querySelectorAll('.project-universe-card');

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filterVal = pill.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-universe-cat') || '';
                if (filterVal === 'all' || cardCat.includes(filterVal)) {
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
            playSpatialBeep(780, 0.04, 'sine');
        });
    });

    // ==================== 10. ANIMATED STATS & SKILL BARS OBSERVERS ====================
    const statCounters = document.querySelectorAll('.stat-counter-num');
    let statsDone = false;

    function runCounterAnimation() {
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

    const recordsGrid = document.querySelector('.multiverse-records-grid');
    if (recordsGrid) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsDone) {
                    statsDone = true;
                    runCounterAnimation();
                }
            });
        }, { threshold: 0.25 });
        observer.observe(recordsGrid);
    }

    const nodeFills = document.querySelectorAll('.node-bar-fill');
    const nodeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const pct = bar.getAttribute('data-node-pct') || '85%';
                bar.style.width = pct;
                nodeObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });
    nodeFills.forEach(fill => nodeObserver.observe(fill));

    // ==================== 11. TRANSMISSION FORM SUBMISSION ====================
    const transmissionForm = document.getElementById('convergence-transmission-form');
    const toast = document.getElementById('transmission-feedback-toast');

    if (transmissionForm) {
        transmissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('sender-identity')?.value.trim();
            const email = document.getElementById('sender-frequency')?.value.trim();
            const msg = document.getElementById('transmission-payload')?.value.trim();

            if (!name || !email || !msg) {
                alert('All transmission parameters are required.');
                return;
            }

            if (toast) {
                toast.style.display = 'block';
                transmissionForm.reset();
                playSpatialBeep(1200, 0.1, 'triangle');
                setTimeout(() => {
                    toast.style.display = 'none';
                }, 6000);
            }
        });
    }
});
