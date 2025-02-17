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

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
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
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Handle mobile navigation (if needed)
    const handleMobileNav = () => {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.nav-toggle') || document.createElement('button');
    
        if (!hamburger.classList.contains('nav-toggle')) {
            hamburger.classList.add('nav-toggle');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            document.querySelector('nav').appendChild(hamburger);
        }
    
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    
        // Close menu on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    };

    window.addEventListener('resize', handleMobileNav);
    handleMobileNav();
});