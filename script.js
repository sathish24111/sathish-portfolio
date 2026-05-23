/* ==========================================================================
   PORTFOLIO INTERACTIONS & CONTROLLERS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. THEME TOGGLER (DARK / LIGHT MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage for persistent preference
    const activeTheme = localStorage.getItem('sathish-portfolio-theme') || 'dark';
    
    if (activeTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        themeIcon.className = 'fa-solid fa-moon';
    }
    
    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('sathish-portfolio-theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('sathish-portfolio-theme', 'dark');
        }
    });

    /* ==========================================================================
       2. MOBILE HAMBURGER MENU NAVIGATION
       ========================================================================== */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const toggleIcon = navToggle.querySelector('i');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
        if (navMenu.classList.contains('show-menu')) {
            toggleIcon.className = 'fa-solid fa-xmark';
        } else {
            toggleIcon.className = 'fa-solid fa-bars-staggered';
        }
    });
    
    // Close menu when a navigation item is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            toggleIcon.className = 'fa-solid fa-bars-staggered';
        });
    });

    /* ==========================================================================
       3. STICKY GLASSMorphic HEADER SCROLL EVENT
       ========================================================================== */
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       4. ANIMATED TERMINAL TYPING HERO HEADER
       ========================================================================== */
    const typingElement = document.getElementById('typing-text');
    const roles = [
        "Full Stack Java Developer",
        "Spring Boot Enthusiast",
        "Competitive Programmer",
        "B.Sc. IT Graduate"
    ];
    let currentRoleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const fullWord = roles[currentRoleIndex];
        
        if (isDeleting) {
            // Deleting state
            typingElement.textContent = fullWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Typing state
            typingElement.textContent = fullWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typingSpeed = isDeleting ? 40 : 80;
        
        if (!isDeleting && charIndex === fullWord.length) {
            // Hold word when typed out fully
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Go to next word
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    if (typingElement) {
        setTimeout(typeEffect, 1000);
    }

    /* ==========================================================================
       5. INTERACTIVE MINI-ATS RESUME SCANNER SIMULATOR
       ========================================================================== */
    // Resume skillset keywords for Sathish G
    const sathishSkills = {
        languages: ['java', 'c', 'c++', 'javascript', 'js'],
        frontend: ['html', 'html5', 'css', 'css3', 'react', 'react.js', 'responsive', 'web design'],
        backend: ['spring boot', 'spring', 'rest api', 'rest', 'apis', 'backend'],
        database: ['mongodb', 'mysql', 'jdbc', 'sql'],
        core: ['oops', 'data structures', 'algorithms', 'problem solving', 'dsa'],
        tools: ['github', 'git', 'vs code', 'eclipse', 'intellij']
    };
    
    // Prefill Job description roles
    const prefillRoles = {
        java: "We are seeking a Backend Java Developer Intern. Essential technical skills include Core Java, object-oriented concepts (OOPs), and Spring Boot. Experience with SQL/MySQL databases and JDBC layers is mandatory. Familiarity with GIT/GitHub and IDEs like IntelliJ or Eclipse is highly preferred. Good problem-solving skills and data structures knowledge are required.",
        react: "Looking for an Associate Frontend Developer to construct highly responsive UI dashboards. Must be highly skilled in HTML5, CSS3, and modern JavaScript (ES6+). Hands-on training or portfolio project exposure in React.js is critical. You will collaborate using Git and standard design systems to build neat web applications.",
        fullstack: "Seeking a Full Stack Software Developer in Training. Candidates must have expertise in backend technologies (Java, Spring Boot REST APIs) and frontend ecosystems (HTML, CSS, ReactJS). Database experience with MySQL and MongoDB is vital. Strong DSA (Data Structures and Algorithms) skills and active problem-solving records on coding platforms are preferred."
    };
    
    const jobDescTextarea = document.getElementById('ats-job-desc');
    const prefillBtns = document.querySelectorAll('.prefill-btn');
    const analyzeBtn = document.getElementById('analyze-btn');
    const placeholderState = document.getElementById('ats-placeholder');
    const activeReportState = document.getElementById('ats-report');
    
    const scoreNumber = document.getElementById('score-number');
    const scoreRating = document.getElementById('score-rating');
    const scoreRing = document.getElementById('score-ring');
    const metricKeywords = document.getElementById('metric-keywords');
    const feedbackText = document.getElementById('report-feedback-text');
    
    // Setup Ring SVG properties
    const ringRadius = 50;
    const ringCircumference = 2 * Math.PI * ringRadius; // 314.159
    
    // Prefill button click handler
    prefillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const role = btn.dataset.role;
            if (prefillRoles[role]) {
                jobDescTextarea.value = prefillRoles[role];
            }
        });
    });
    
    // Analyzer trigger function
    analyzeBtn.addEventListener('click', () => {
        const text = jobDescTextarea.value.trim().toLowerCase();
        
        if (text === '') {
            alert('Please paste a job description or click one of our prefilled quick-loads first!');
            return;
        }
        
        // Match statistics
        let totalSkillKeywords = 0;
        let matchedKeywords = 0;
        const matchedList = [];
        
        // Scan for keywords
        Object.values(sathishSkills).forEach(category => {
            category.forEach(skill => {
                totalSkillKeywords++;
                if (text.includes(skill)) {
                    matchedKeywords++;
                    matchedList.push(skill);
                }
            });
        });
        
        // Simple client-side NLP ATS match scoring calculation
        // Baseline 35% score (for structure layout passes) + keywords matching boost
        const keywordsRatio = matchedKeywords / 15; // Cap ratio calculation divider
        const percentageBoost = Math.min(keywordsRatio * 60, 60); // Maximum 60% boost
        const rawScore = Math.round(35 + percentageBoost);
        const finalScore = Math.min(rawScore, 95); // Simulated real ATS limit is 95%
        
        // Show report panel
        placeholderState.classList.add('hidden');
        activeReportState.classList.remove('hidden');
        
        // Animating the score display
        let currentAnimScore = 0;
        const duration = 800; // ms
        const stepTime = Math.max(Math.floor(duration / finalScore), 6);
        
        const timer = setInterval(() => {
            currentAnimScore++;
            scoreNumber.textContent = currentAnimScore;
            
            // Set circle progress offset
            const offset = ringCircumference - (currentAnimScore / 100) * ringCircumference;
            scoreRing.style.strokeDashoffset = offset;
            
            if (currentAnimScore >= finalScore) {
                clearInterval(timer);
            }
        }, stepTime);
        
        // Keyword percentage matching display
        const keywordMatchPct = Math.round(Math.min((matchedKeywords / 10) * 100, 100));
        metricKeywords.textContent = `${keywordMatchPct}%`;
        
        // Set match rating visual badges
        if (finalScore >= 80) {
            scoreRating.textContent = "Excellent Match";
            scoreRating.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
            scoreRating.style.color = "#10b981";
            scoreRating.style.borderColor = "rgba(16, 185, 129, 0.3)";
            
            feedbackText.innerHTML = `<strong>ATS Report:</strong> Exceptional alignment. Sathish G has highly overlapping matching coordinates for this role. Key overlaps: <em>${matchedList.slice(0, 5).join(', ')}</em>. Suggest scheduling technical interview directly.`;
        } else if (finalScore >= 60) {
            scoreRating.textContent = "Strong Match";
            scoreRating.style.backgroundColor = "rgba(6, 182, 212, 0.15)";
            scoreRating.style.color = "#06b6d4";
            scoreRating.style.borderColor = "rgba(6, 182, 212, 0.3)";
            
            feedbackText.innerHTML = `<strong>ATS Report:</strong> Solid candidacy. Strong presence of core skills required like <em>${matchedList.slice(0, 4).join(', ')}</em>. Sathish's Spring Boot & Full Stack background bridges this role perfectly.`;
        } else if (finalScore >= 45) {
            scoreRating.textContent = "Moderate Match";
            scoreRating.style.backgroundColor = "rgba(245, 158, 11, 0.15)";
            scoreRating.style.color = "#f59e0b";
            scoreRating.style.borderColor = "rgba(245, 158, 11, 0.3)";
            
            feedbackText.innerHTML = `<strong>ATS Report:</strong> Fair match. Overlaps are present but some keyword parameters are missing. Found skills: <em>${matchedList.slice(0, 3).join(', ')}</em>. Ideal for training into this specialized domain.`;
        } else {
            scoreRating.textContent = "Low Overlap";
            scoreRating.style.backgroundColor = "rgba(239, 68, 68, 0.15)";
            scoreRating.style.color = "#ef4444";
            scoreRating.style.borderColor = "rgba(239, 68, 68, 0.3)";
            
            feedbackText.innerHTML = `<strong>ATS Report:</strong> Low keyword alignment with Sathish's core B.Sc. IT and Full Stack Java stack. However, his strong foundations in DSA (250+ solved) make him highly adaptive to learn these skills quickly!`;
        }
    });

    /* ==========================================================================
       6. ACTIVE SCROLL LINK HIGHLIGHT SPY
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    function scrollActiveSpy() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // offset navbar height
            const sectionId = current.getAttribute('id');
            const navLinkElement = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (navLinkElement) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinkElement.classList.add('active-link');
                } else {
                    navLinkElement.classList.remove('active-link');
                }
            }
        });
    }
    
    window.addEventListener('scroll', scrollActiveSpy);

    /* ==========================================================================
       7. HIGH-PERFORMANCE IntersectionObserver SCROLL REVEALS
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // stop observing once active class is injected
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       8. CONTACT FORM VALIDATOR & SUCCESS CONTROLLER
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const successOverlay = document.getElementById('form-success');
    const successCloseBtn = document.getElementById('success-close-btn');
    const submitBtn = document.getElementById('form-submit-btn');
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function setGroupError(inputElement, show) {
        const parent = inputElement.closest('.form-group');
        if (show) {
            parent.classList.add('error');
        } else {
            parent.classList.remove('error');
        }
    }
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const subjectInput = document.getElementById('form-subject');
        const messageInput = document.getElementById('form-message');
        
        // Name Validation
        if (nameInput.value.trim() === '') {
            setGroupError(nameInput, true);
            isValid = false;
        } else {
            setGroupError(nameInput, false);
        }
        
        // Email Validation
        if (emailInput.value.trim() === '' || !validateEmail(emailInput.value.trim())) {
            setGroupError(emailInput, true);
            isValid = false;
        } else {
            setGroupError(emailInput, false);
        }
        
        // Subject Validation
        if (subjectInput.value.trim() === '') {
            setGroupError(subjectInput, true);
            isValid = false;
        } else {
            setGroupError(subjectInput, false);
        }
        
        // Message Validation
        if (messageInput.value.trim() === '') {
            setGroupError(messageInput, true);
            isValid = false;
        } else {
            setGroupError(messageInput, false);
        }
        
        if (isValid) {
            // Animate submission state in button
            submitBtn.disabled = true;
            submitBtn.style.opacity = 0.7;
            submitBtn.querySelector('span').textContent = "Scanning credentials...";
            submitBtn.querySelector('i').className = "fa-solid fa-spinner fa-spin";
            
            // Simulate standard REST API contact validation
            setTimeout(() => {
                // Prefill user details in success dialog
                const userName = nameInput.value.trim();
                successOverlay.querySelector('h3').textContent = `Thank you, ${userName}!`;
                
                // Show Success modal overlay
                successOverlay.classList.remove('hidden');
                
                // Reset form values
                contactForm.reset();
                
                // Reset submit button state
                submitBtn.disabled = false;
                submitBtn.style.opacity = 1;
                submitBtn.querySelector('span').textContent = "Send Message";
                submitBtn.querySelector('i').className = "fa-regular fa-paper-plane";
            }, 1200);
        }
    });
    
    // Close success overlay to reset state
    successCloseBtn.addEventListener('click', () => {
        successOverlay.classList.add('hidden');
    });
});
