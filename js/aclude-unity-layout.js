// Aclude Foundation - Unity in Action Layout JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initProgressBars();
    initMobileMenu();
    initSmoothScroll();
    initTypewriterEffect();
    initPieChart();
    initButtonEffects();
    initCardEffects();
    initFormHandling();
    initPerformanceOptimizations();
    initAccessibilityEnhancements();
});

// Navigation scroll effects
function initNavigation() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
}

// Scroll animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.service-card, .campaign-card, .blog-card, .about-text');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Initialize animations
function initAnimations() {
    // Count up animation for statistics
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// Counter animation
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
    const increment = target / 60; // 60 frames
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 50);
}

// Progress bar animations
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => progressObserver.observe(bar));
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking on links
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typewriter Effect for Hero Text
function initTypewriterEffect() {
    const heroText = document.querySelector('.hero h1');
    if (!heroText) return;
    
    const originalText = "Making Places Accessible for Everyone";
    const alternativeText = "Creating Inclusive Environments Together";
    
    // Clear the original text and prepare for typewriter
    heroText.textContent = '';
    heroText.style.borderRight = '3px solid #007A5C';
    heroText.style.animation = 'blink-caret 1s step-end infinite';
    
    let currentIndex = 0;
    let currentText = '';
    
    function typeWriter(text, callback) {
            if (currentIndex < text.length) {
                currentText += text.charAt(currentIndex);
                heroText.textContent = currentText;
                currentIndex++;
                setTimeout(() => typeWriter(text, callback), 80);
            } else {
                if (callback) callback();
            }
        }
        
        function deleteText(callback) {
            if (currentIndex > 0) {
                currentText = currentText.slice(0, -1);
                heroText.textContent = currentText;
                currentIndex--;
                setTimeout(() => deleteText(callback), 40);
            } else {
                if (callback) callback();
            }
        }
        
        function typewriterLoop() {
            // Type out the main text
            typeWriter(originalText, () => {
                // Pause, then delete
                setTimeout(() => {
                    deleteText(() => {
                        // Pause, then type alternative text
                        setTimeout(() => {
                            typeWriter(alternativeText, () => {
                                // Pause, then delete and repeat
                                setTimeout(() => {
                                    deleteText(() => {
                                        setTimeout(typewriterLoop, 500);
                                    });
                                }, 1000);
                            });
                        }, 500);
                    });
                }, 1000);
            });
        }
        
        // Start typewriter effect after initial fade-in
        setTimeout(typewriterLoop, 2000);
}

// Pie chart animation
function initPieChart() {
    const chart = document.querySelector('.pie-chart');
    if (!chart) return;

    const data = [
        { percentage: 37, color: '#007A5C', label: 'Accessibility Audits' },
        { percentage: 20, color: '#F4B03E', label: 'Design Consulting' },
        { percentage: 17, color: '#FF6B35', label: 'Construction Services' },
        { percentage: 13, color: '#4ECDC4', label: 'Training Programs' },
        { percentage: 12, color: '#45B7D1', label: 'CSR Initiatives' }
    ];

    const svg = chart.querySelector('.pie-chart-svg');
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    let currentProgress = 0;

    function createSlice(startAngle, endAngle, color, index) {
        const start = polarToCartesian(centerX, centerY, radius, endAngle);
        const end = polarToCartesian(centerX, centerY, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        const d = [
            "M", centerX, centerY,
            "L", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
            "Z"
        ].join(" ");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        path.setAttribute("fill", color);
        path.classList.add('pie-slice');
        path.style.strokeDasharray = `${radius * Math.PI * 2} ${radius * Math.PI * 2}`;
        path.style.strokeDashoffset = `${radius * Math.PI * 2}`;
        path.style.transitionDelay = `${index * 0.1}s`;
        return path;
    }

    function polarToCartesian(cx, cy, r, angleInDegrees) {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: cx + (r * Math.cos(angleInRadians)),
            y: cy + (r * Math.sin(angleInRadians))
        };
    }

    function animateChart() {
        currentProgress = Math.min(currentProgress + 0.02, 1);
        
        svg.innerHTML = '';
        
        let cumulativeAngle = 0;
        data.forEach((segment, index) => {
            const segmentAngle = (segment.percentage / 100) * 360 * currentProgress;
            
            if (segmentAngle > 0) {
                const slice = createSlice(
                    cumulativeAngle,
                    cumulativeAngle + segmentAngle,
                    segment.color,
                    index
                );
                svg.appendChild(slice);
                
                // Animate the slice
                setTimeout(() => {
                    slice.style.strokeDashoffset = '0';
                }, 50 + (index * 100));
            }
            
            cumulativeAngle += segmentAngle;
        });

        if (currentProgress < 1) {
            requestAnimationFrame(animateChart);
        }
    }

    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateChart();
                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    chartObserver.observe(chart);
}

// Button hover effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-donate, .campaign-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Card hover effects
function initCardEffects() {
    const cards = document.querySelectorAll('.service-card, .campaign-card, .blog-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Form handling (for future use)
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle form submission
            console.log('Form submitted');
        });
    });
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Accessibility enhancements
//function initAccessibilityEnhancements() {
    // Skip to main content link
    //const skipLink = document.createElement('a');
    //skipLink.href = '#main-content';
    ///skipLink.textContent = 'Skip to main content';
    //skipLink.className = 'skip-link';
    //skipLink.style.cssText = `
      //  position: absolute;
        //top: -40px;
        //left: 6px;
        //background: #007A5C;
        //color: white;
        //padding: 8px 16px;
        //text-decoration: none;
        //border-radius: 4px;
        //z-index: 9999;
        //transition: top 0.3s;
    //`;
    
    //skipLink.addEventListener('focus', function() {
      //  this.style.top = '6px';
    //});
    
    //skipLink.addEventListener('blur', function() {
      //  this.style.top = '-40px';
    //});
    
    //document.body.insertBefore(skipLink, document.body.firstChild);

    // Focus management
    //const focusableElements = document.querySelectorAll(
      //  'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    //);
    
    //focusableElements.forEach(element => {
       // element.addEventListener('focus', function() {
            //this.style.outline = '2px solid #007A5C';
          //  this.style.outlineOffset = '2px';
        //});
        
        //element.addEventListener('blur', function() {
         //   this.style.outline = '';
       //     this.style.outlineOffset = '';
     //   });
  ///  });
//}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Add CSS for mobile menu and animations
const style = document.createElement('style');
style.textContent = `
    .mobile-toggle {
        display: none;
        flex-direction: column;
        cursor: pointer;
        padding: 8px;
    }
    
    .mobile-toggle span {
        width: 25px;
        height: 3px;
        background: #1A1A1A;
        margin: 3px 0;
        transition: 0.3s;
    }
    
    .mobile-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .mobile-toggle {
            display: flex;
        }
        
        .nav-links {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
            z-index: 999;
        }
        
        .nav-links.active {
            left: 0;
        }
        
        .nav-links li {
            margin: 1rem 0;
        }
        
        .nav-links a {
            font-size: 1.2rem;
            padding: 1rem;
        }
        
        .pie-chart {
            width: 250px;
            height: 250px;
        }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    @keyframes blink-caret {
        from, to {
            border-color: transparent;
        }
        50% {
            border-color: #007A5C;
        }
    }
    
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(style);

console.log('Aclude Foundation - Unity Layout JavaScript Loaded');