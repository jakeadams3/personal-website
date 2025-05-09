// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Make project images clickable
    const projectCards = document.querySelectorAll('.companies-grid .project-card, .products-grid .project-card, .projects-grid .project-card');
    
    projectCards.forEach(card => {
        const image = card.querySelector('.project-image img');
        const link = card.querySelector('.project-links a');
        
        if (image && link) {
            const imageContainer = card.querySelector('.project-image');
            const linkHref = link.getAttribute('href');
            const linkTarget = link.getAttribute('target');
            
            // Create anchor element
            const anchor = document.createElement('a');
            anchor.href = linkHref;
            if (linkTarget) {
                anchor.target = linkTarget;
            }
            
            // Replace the image with the wrapped version
            const imageClone = image.cloneNode(true);
            imageContainer.innerHTML = '';
            anchor.appendChild(imageClone);
            imageContainer.appendChild(anchor);
        }
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        nav.classList.toggle('show');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('show');
        });
    });
    
    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    function highlightNav() {
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    function toggleBackToTopButton() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }
    
    // Add scroll event listeners
    window.addEventListener('scroll', function() {
        highlightNav();
        toggleBackToTopButton();
    });
    
    // Initial calls on page load
    highlightNav();
    toggleBackToTopButton();
});