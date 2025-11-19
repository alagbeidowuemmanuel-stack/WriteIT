// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileNavigation();
    initStickyHeader();
    initSmoothScrolling();
    initContactForm();
    initFAQAccordion();
    initTestimonialSlider();
    initPricingTabs();
    initFaqCategories();
    initFileUpload();
    
    console.log('WriteIT Website - All components initialized');
});

// ===== MOBILE NAVIGATION =====
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ===== STICKY HEADER =====
function initStickyHeader() {
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== CONTACT FORM VALIDATION =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
            
            // Reset previous error states
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));
            
            // Name validation
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            // Email validation
            if (!email.value.trim()) {
                showError(email, 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Message validation
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message
                showFormSuccess(contactForm);
                
                // In a real application, you would send the form data to a server here
                console.log('Form submitted successfully!');
                console.log('Name:', name.value);
                console.log('Email:', email.value);
                console.log('Message:', message.value);
                
                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    removeFormSuccess();
                }, 5000);
            }
        });
    }
}

function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = 'color: #dc3545; font-size: 0.875rem; margin-top: 5px;';
    formGroup.appendChild(errorElement);
}

function showFormSuccess(form) {
    // Remove any existing success messages
    removeFormSuccess();
    
    const successElement = document.createElement('div');
    successElement.className = 'form-success';
    successElement.innerHTML = `
        <div style="background: #d4edda; color: #155724; padding: 12px; border-radius: 4px; margin-bottom: 20px; border: 1px solid #c3e6cb;">
            <i class="fas fa-check-circle"></i> Thank you for your message! We will get back to you soon.
        </div>
    `;
    form.insertBefore(successElement, form.firstChild);
}

function removeFormSuccess() {
    const existingSuccess = document.querySelector('.form-success');
    if (existingSuccess) {
        existingSuccess.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== FAQ ACCORDION =====
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        console.log('Initializing FAQ accordion with', faqItems.length, 'items');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', function() {
                    console.log('FAQ item clicked');
                    
                    // Toggle current item
                    const isActive = item.classList.contains('active');
                    
                    // Close all items
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                    });
                    
                    // Open current item if it wasn't active
                    if (!isActive) {
                        item.classList.add('active');
                    }
                });
            }
        });
        
        // Open first FAQ item by default
        if (faqItems.length > 0) {
            faqItems[0].classList.add('active');
        }
    } else {
        console.log('No FAQ items found');
    }
}

// ===== TESTIMONIAL SLIDER =====
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) {
        console.log('No testimonial slides found');
        return;
    }
    
    console.log('Initializing testimonial slider with', slides.length, 'slides');
    
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(index) {
        // Validate index
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide
        slides[index].classList.add('active');
        
        // Activate corresponding dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
        console.log('Showing slide', currentSlide + 1);
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // Event listeners for buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            resetAutoAdvance();
            prevSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            resetAutoAdvance();
            nextSlide();
        });
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            resetAutoAdvance();
            showSlide(index);
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            resetAutoAdvance();
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            resetAutoAdvance();
            nextSlide();
        }
    });
    
    // Auto-advance slides
    function startAutoAdvance() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoAdvance() {
        clearInterval(slideInterval);
        startAutoAdvance();
    }
    
    // Pause auto-advance on hover
    if (slider) {
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            startAutoAdvance();
        });
    }
    
    // Initialize
    showSlide(currentSlide);
    startAutoAdvance();
}

// ===== PRICING TABS =====
function initPricingTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
        console.log('Initializing pricing tabs with', tabBtns.length, 'tabs');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding content
                const tabId = this.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            });
        });
        
        // Activate first tab by default
        if (tabBtns.length > 0) {
            tabBtns[0].click();
        }
    }
}

// ===== FAQ CATEGORIES =====
function initFaqCategories() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const faqCategories = document.querySelectorAll('.faq-category');
    
    if (categoryBtns.length > 0) {
        console.log('Initializing FAQ categories with', categoryBtns.length, 'categories');
        
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and categories
                categoryBtns.forEach(b => b.classList.remove('active'));
                faqCategories.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show corresponding category
                const categoryId = this.getAttribute('data-category');
                const category = document.getElementById(categoryId);
                if (category) {
                    category.classList.add('active');
                }
            });
        });
        
        // Activate first category by default
        if (categoryBtns.length > 0) {
            categoryBtns[0].click();
        }
    }
}

// ===== FILE UPLOAD =====
function initFileUpload() {
    const fileInput = document.getElementById('file');
    
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const fileName = this.files[0]?.name;
            if (fileName) {
                // Create or update file name display
                let fileNameDisplay = this.parentNode.querySelector('.file-name');
                
                if (!fileNameDisplay) {
                    fileNameDisplay = document.createElement('div');
                    fileNameDisplay.className = 'file-name';
                    fileNameDisplay.style.cssText = 'font-size: 0.875rem; color: #495057; margin-top: 5px;';
                    this.parentNode.appendChild(fileNameDisplay);
                }
                
                fileNameDisplay.textContent = `Selected file: ${fileName}`;
                fileNameDisplay.style.color = '#28a745';
            }
        });
    }
}

// ===== ADDITIONAL STYLES FOR DYNAMIC ELEMENTS =====
function injectDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* FAQ Accordion Styles */
        .faq-item .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: all 0.3s ease;
        }
        
        .faq-item.active .faq-answer {
            max-height: 500px;
        }
        
        .faq-question i {
            transition: transform 0.3s ease;
        }
        
        .faq-item.active .faq-question i {
            transform: rotate(180deg);
        }
        
        /* Testimonial Slider Styles */
        .testimonial-slide {
            display: none;
            animation: fadeIn 0.5s ease;
        }
        
        .testimonial-slide.active {
            display: block;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Form Error Styles */
        .form-group.error input,
        .form-group.error textarea,
        .form-group.error select {
            border-color: #dc3545 !important;
        }
        
        .error-message {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 5px;
        }
        
        /* Loading States */
        .btn.loading {
            position: relative;
            color: transparent;
        }
        
        .btn.loading:after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            top: 50%;
            left: 50%;
            margin: -10px 0 0 -10px;
            border: 2px solid #ffffff;
            border-radius: 50%;
            border-right-color: transparent;
            animation: spin 0.8s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        /* File Upload Styles */
        .file-name {
            font-size: 0.875rem;
            color: #495057;
            margin-top: 5px;
        }
    `;
    document.head.appendChild(style);
}

// Inject dynamic styles when DOM is loaded
document.addEventListener('DOMContentLoaded', injectDynamicStyles);

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized scroll event
window.addEventListener('scroll', throttle(function() {
    // Any scroll-based animations can go here
}, 100));

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== PROGRESSIVE ENHANCEMENT =====
// Check if JavaScript is enabled
document.documentElement.classList.add('js-enabled');

// Add loading state to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn') || e.target.closest('.btn')) {
        const btn = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
        
        // Only add loading for forms or actions that require processing
        if (btn.type === 'submit' || btn.getAttribute('type') === 'submit') {
            btn.classList.add('loading');
            
            // Remove loading state after processing (simulated)
            setTimeout(() => {
                btn.classList.remove('loading');
            }, 2000);
        }
    }
});