// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateIcons();
    }

    updateIcons() {
        const icons = document.querySelectorAll('#theme-icon, #mobile-theme-icon');
        icons.forEach(icon => {
            icon.className = this.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    bindEvents() {
        const toggleButtons = document.querySelectorAll('#theme-toggle, #mobile-theme-toggle');
        toggleButtons.forEach(button => {
            button.addEventListener('click', () => this.toggleTheme());
        });
    }
}

// Navigation Manager
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateActiveLink();
    }

    bindEvents() {
        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => this.toggleMobileMenu());

        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.closeMobileMenu();
            });
        });

        // Update active link on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveLink();
            this.updateNavbarBackground();
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    updateNavbarBackground() {
        const scrolled = window.scrollY > 50;
        this.navbar.style.background = scrolled 
            ? 'var(--nav-bg)' 
            : 'rgba(255, 255, 255, 0.95)';
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe cards and sections
        const elementsToObserve = document.querySelectorAll('.card, .project-card, .info-card, .skill-category');
        elementsToObserve.forEach(el => observer.observe(el));
    }
}

// Form Manager
class FormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name').trim(),
            email: formData.get('email').trim(),
            message: formData.get('message').trim()
        };

        // Validate all fields
        const isValid = this.validateForm(data);

        if (isValid) {
            this.submitForm(data);
        }
    }

    validateForm(data) {
        let isValid = true;

        // Validate name
        if (!data.name) {
            this.showError('name', 'Name is required');
            isValid = false;
        } else if (data.name.length < 2) {
            this.showError('name', 'Name must be at least 2 characters');
            isValid = false;
        }

        // Validate email
        if (!data.email) {
            this.showError('email', 'Email is required');
            isValid = false;
        } else if (!this.isValidEmail(data.email)) {
            this.showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate message
        if (!data.message) {
            this.showError('message', 'Message is required');
            isValid = false;
        } else if (data.message.length < 10) {
            this.showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }

        return isValid;
    }

    validateField(input) {
        const value = input.value.trim();
        const name = input.name;

        switch (name) {
            case 'name':
                if (!value) {
                    this.showError(name, 'Name is required');
                } else if (value.length < 2) {
                    this.showError(name, 'Name must be at least 2 characters');
                } else {
                    this.clearError(input);
                }
                break;
            case 'email':
                if (!value) {
                    this.showError(name, 'Email is required');
                } else if (!this.isValidEmail(value)) {
                    this.showError(name, 'Please enter a valid email address');
                } else {
                    this.clearError(input);
                }
                break;
            case 'message':
                if (!value) {
                    this.showError(name, 'Message is required');
                } else if (value.length < 10) {
                    this.showError(name, 'Message must be at least 10 characters');
                } else {
                    this.clearError(input);
                }
                break;
        }
    }

    showError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const inputElement = document.getElementById(fieldName);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        
        if (inputElement) {
            inputElement.style.borderColor = '#ef4444';
        }
    }

    clearError(input) {
        const fieldName = input.name;
        const errorElement = document.getElementById(`${fieldName}-error`);
        
        if (errorElement) {
            errorElement.classList.remove('show');
        }
        
        input.style.borderColor = 'var(--border-color)';
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    submitForm(data) {
        // Simulate form submission
        this.showSuccessMessage();
        this.form.reset();
        
        // Clear any remaining errors
        const errorElements = this.form.querySelectorAll('.error-message');
        errorElements.forEach(el => el.classList.remove('show'));
        
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.style.borderColor = 'var(--border-color)';
        });

        console.log('Form submitted with data:', data);
    }

    showSuccessMessage() {
        // Create and show success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="
                background: #10b981;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                text-align: center;
            ">
                <i class="fas fa-check-circle"></i>
                Message sent successfully! I'll get back to you soon.
            </div>
        `;

        this.form.parentNode.insertBefore(successDiv, this.form);

        // Remove success message after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function downloadResume() {
    // Simulate resume download
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume file path
    link.download = 'Bhavya_Resume.pdf';
    
    // Show download message
    const message = document.createElement('div');
    message.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1001;
            animation: slideInRight 0.3s ease;
        ">
            <i class="fas fa-download"></i>
            Resume download would start here. Please add your actual resume file.
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        message.remove();
    }, 3000);
    
    console.log('Resume download triggered');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize managers
    new ThemeManager();
    new NavigationManager();
    new AnimationManager();
    new FormManager();

    // Bind resume download button
    const resumeButton = document.getElementById('download-resume');
    if (resumeButton) {
        resumeButton.addEventListener('click', downloadResume);
    }

    // Add loading animation to elements
    const elementsToAnimate = document.querySelectorAll('.card, .project-card, .skill-tag');
    elementsToAnimate.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });

    console.log('Portfolio website initialized successfully!');
});

// Add some extra animations and effects
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Smooth hover effects for skill tags
document.addEventListener('DOMContentLoaded', function() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});