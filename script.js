// Project filtering functionality
document.addEventListener('DOMContentLoaded', () => {
    // Update footer year
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectLinks = document.querySelectorAll('.project-link');

    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default button behavior
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'none';
                    card.style.visibility = 'visible';
                    card.style.height = 'auto';
                    card.style.marginBottom = '2rem';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    card.style.visibility = 'hidden';
                    card.style.height = '0';
                    card.style.marginBottom = '0';
                }
            });
        });
    });

    // Add click event listeners to project links
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const url = link.getAttribute('href');
            if (url) {
                e.preventDefault();
                window.open(url, '_blank');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Special handling for logo
            if(this.getAttribute('href') === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            // Original smooth scrolling logic for other links
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add explicit handling for logo click
    document.querySelector('.logo').addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        history.pushState(null, null, ' ');
    });

    // View Work button scroll functionality
    document.querySelector('.view-work').addEventListener('click', () => {
        const projectsSection = document.querySelector('#projects');
        const headerHeight = document.querySelector('header').offsetHeight;
        const scrollPosition = projectsSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    });

    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fadeInUp';
                const staggerItems = element.querySelectorAll('[data-stagger] > *');
                
                // Mobile optimization
                if (window.innerWidth <= 768) {
                    element.style.opacity = '1';
                    element.style.transform = 'none';
                    if (staggerItems.length > 0) {
                        staggerItems.forEach(item => {
                            item.style.opacity = '1';
                            item.style.transform = 'none';
                        });
                    }
                    return;
                }
                
                // Desktop animations
                setTimeout(() => {
                    element.classList.add(`animate-${animationType}`);
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
                
                if (staggerItems.length > 0) {
                    staggerItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.setProperty('--index', index);
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0) scale(1)';
                            item.style.transitionDelay = `calc(${index} * 0.15s)`;
                        }, 200 + (index * 100));
                    });
                }

                // Add hover effect for interactive elements
                const interactiveElements = element.querySelectorAll('.project-card, .skill-category, .education-item');
                interactiveElements.forEach(item => {
                    item.addEventListener('mouseenter', () => {
                        item.style.transform = 'translateY(-5px)';
                        item.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                    });
                    item.addEventListener('mouseleave', () => {
                        item.style.transform = 'translateY(0)';
                    });
                });
            }
        });
    }, observerOptions);
    
    // Apply to elements
    document.querySelectorAll('[data-animation]').forEach(el => {
        animationObserver.observe(el);
    });
    
    // Apply to section headings
    document.querySelectorAll('section').forEach(section => {
        animationObserver.observe(section);
        section.setAttribute('data-animation', 'fadeInUp');
    });

    // Handle mobile navigation
    const handleMobileNav = () => {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.nav-toggle') || document.createElement('button');
        let isAnimating = false;
    
        if (!hamburger.classList.contains('nav-toggle')) {
            hamburger.classList.add('nav-toggle');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            document.querySelector('nav').appendChild(hamburger);
        }
    
        const toggleMenu = (show) => {
            if (isAnimating) return;
            isAnimating = true;
    
            const icon = hamburger.querySelector('i');
            if (show) {
                navLinks.classList.add('active');
                hamburger.classList.add('active');
                icon.className = 'fas fa-times';
                document.body.style.overflow = 'hidden';
            } else {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                icon.className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
    
            setTimeout(() => {
                isAnimating = false;
            }, 300);
        };
    
        hamburger.addEventListener('click', () => {
            const isActive = navLinks.classList.contains('active');
            toggleMenu(!isActive);
        });
    
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && window.innerWidth <= 768) {
                toggleMenu(false);
            }
        });
    
        // Close menu on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                toggleMenu(false);
            }
        });
    
        // Close menu when clicking nav links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    toggleMenu(false);
                }
            });
        });
    };

    window.addEventListener('resize', handleMobileNav);
    handleMobileNav();

    // Force visibility on mobile
    const forceMobileVisibility = () => {
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.project-card').forEach(card => {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'none';
                card.style.visibility = 'visible';
                card.style.height = 'auto';
                card.style.marginBottom = '2rem';
            });

            // Ensure filter buttons are clickable
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.style.pointerEvents = 'auto';
                btn.style.cursor = 'pointer';
                btn.style.opacity = '1';
            });
        }
    };

    // Call on load and resize
    forceMobileVisibility();
    window.addEventListener('resize', forceMobileVisibility);
    // Also call when orientation changes
    window.addEventListener('orientationchange', forceMobileVisibility);
});
