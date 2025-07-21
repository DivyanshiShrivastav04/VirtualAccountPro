// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Service Modal Functionality
const serviceDetails = {
    bookkeeping: {
        title: "Virtual Bookkeeping",
        icon: "📊",
        description: "Complete bookkeeping services including transaction recording, reconciliation, and monthly financial statements.",
        features: [
            "Daily transaction recording and categorization",
            "Bank and credit card reconciliation",
            "Accounts payable and receivable management",
            "Monthly financial statements (P&L, Balance Sheet)",
            "Cash flow tracking and management",
            "Expense tracking and reporting",
            "Invoice generation and management",
            "Integration with popular accounting software"
        ],
        benefits: [
            "Save 10-15 hours per week on bookkeeping tasks",
            "Accurate and up-to-date financial records",
            "Better cash flow management",
            "Compliance with accounting standards",
            "Real-time access to financial data"
        ],
        pricing: "Starting from ₹15,000/month"
    },
    tax: {
        title: "Tax Preparation & Filing",
        icon: "📋",
        description: "Expert tax preparation and filing services for individuals and businesses, ensuring compliance and maximizing deductions.",
        features: [
            "Income tax return preparation and filing",
            "GST return filing (GSTR-1, GSTR-3B, GSTR-9)",
            "TDS return filing and compliance",
            "Professional tax and other statutory filings",
            "Tax planning and advisory services",
            "Audit support and representation",
            "Notice handling and responses",
            "Year-round tax consultation"
        ],
        benefits: [
            "Maximize tax savings and deductions",
            "Ensure 100% compliance with tax laws",
            "Avoid penalties and interest charges",
            "Expert guidance on tax planning",
            "Peace of mind during tax season"
        ],
        pricing: "Starting from ₹5,000 per return"
    },
    payroll: {
        title: "Payroll Management",
        icon: "💼",
        description: "Complete payroll processing including salary calculations, tax deductions, and compliance with labor laws.",
        features: [
            "Monthly salary processing and calculations",
            "PF, ESI, and other statutory deductions",
            "Payslip generation and distribution",
            "Form 16 preparation and issuance",
            "Compliance with labor laws",
            "Leave and attendance management",
            "Bonus and incentive calculations",
            "Payroll reporting and analytics"
        ],
        benefits: [
            "Error-free salary calculations",
            "Timely statutory compliance",
            "Reduced administrative burden",
            "Employee self-service portal",
            "Detailed payroll reports and insights"
        ],
        pricing: "Starting from ₹500 per employee per month"
    },
    reporting: {
        title: "Financial Reporting",
        icon: "📈",
        description: "Comprehensive financial reports including P&L statements, balance sheets, and cash flow analysis.",
        features: [
            "Monthly profit & loss statements",
            "Balance sheet preparation",
            "Cash flow statements",
            "Budget vs actual analysis",
            "Key performance indicators (KPIs)",
            "Custom business reports",
            "Management information systems",
            "Board presentation materials"
        ],
        benefits: [
            "Clear visibility into business performance",
            "Data-driven decision making",
            "Investor-ready financial statements",
            "Trend analysis and insights",
            "Customized reporting as per requirements"
        ],
        pricing: "Starting from ₹8,000/month"
    },
    budgeting: {
        title: "Budgeting & Forecasting",
        icon: "🎯",
        description: "Strategic financial planning with detailed budgets and forecasts to guide your business decisions.",
        features: [
            "Annual budget preparation",
            "Monthly budget monitoring",
            "Cash flow forecasting",
            "Scenario planning and analysis",
            "Variance analysis and reporting",
            "Financial modeling",
            "Strategic planning support",
            "Performance benchmarking"
        ],
        benefits: [
            "Better financial planning and control",
            "Improved cash flow management",
            "Strategic decision support",
            "Risk identification and mitigation",
            "Performance tracking against goals"
        ],
        pricing: "Starting from ₹12,000/month"
    },
    software: {
        title: "QuickBooks/Xero Setup & Support",
        icon: "⚙️",
        description: "Professional setup and ongoing support for QuickBooks, Xero, and other accounting software platforms.",
        features: [
            "Software selection and recommendation",
            "Complete setup and configuration",
            "Chart of accounts customization",
            "Data migration from existing systems",
            "User training and support",
            "Integration with banking and payment systems",
            "Custom reporting setup",
            "Ongoing technical support"
        ],
        benefits: [
            "Optimized software configuration",
            "Seamless data migration",
            "Reduced learning curve",
            "Improved efficiency and productivity",
            "Expert ongoing support"
        ],
        pricing: "Setup: ₹25,000 | Support: ₹5,000/month"
    }
};

// Service cards click handlers
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.classList.contains('learn-more-btn')) {
            const serviceType = card.getAttribute('data-service');
            openServiceModal(serviceType);
        }
    });
});

document.querySelectorAll('.learn-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const serviceType = btn.closest('.service-card').getAttribute('data-service');
        openServiceModal(serviceType);
    });
});

function openServiceModal(serviceType) {
    const service = serviceDetails[serviceType];
    const modal = document.getElementById('serviceModal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <div class="service-detail">
            <div class="service-header">
                <span class="service-icon-large">${service.icon}</span>
                <h2>${service.title}</h2>
            </div>
            <p class="service-description">${service.description}</p>
            
            <div class="service-content">
                <div class="service-section">
                    <h3>What's Included:</h3>
                    <ul class="feature-list">
                        ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="service-section">
                    <h3>Key Benefits:</h3>
                    <ul class="benefit-list">
                        ${service.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="service-pricing">
                    <h3>Pricing:</h3>
                    <p class="pricing-text">${service.pricing}</p>
                    <p class="pricing-note">*Pricing may vary based on business size and complexity. Contact us for a customized quote.</p>
                </div>
                
                <div class="service-cta">
                    <a href="#contact" class="cta-button" onclick="closeModal()">Get Started Today</a>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('serviceModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Modal close handlers
document.querySelector('.close').addEventListener('click', closeModal);
document.getElementById('serviceModal').addEventListener('click', (e) => {
    if (e.target.id === 'serviceModal') {
        closeModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const business = formData.get('business');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        this.reset();
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <strong>Thank you, ${name}!</strong><br>
            Your message has been sent successfully. We'll get back to you within 24 hours.
        `;
        
        this.appendChild(successMessage);
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            if (successMessage.parentNode) {
                successMessage.parentNode.removeChild(successMessage);
            }
        }, 5000);
        
    }, 1500);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loading');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to hero section immediately
    document.querySelector('.hero').classList.add('loading');
    
    // Smooth loading of images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// Add CSS for modal content
const modalStyles = `
<style>
.service-detail {
    max-width: 100%;
}

.service-header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--border-color);
}

.service-icon-large {
    font-size: 4rem;
    display: block;
    margin-bottom: 1rem;
}

.service-header h2 {
    color: var(--primary-color);
    margin: 0;
    font-size: 2rem;
}

.service-description {
    font-size: 1.1rem;
    color: var(--text-light);
    margin-bottom: 2rem;
    text-align: center;
    line-height: 1.6;
}

.service-section {
    margin-bottom: 2rem;
}

.service-section h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-size: 1.3rem;
}

.feature-list,
.benefit-list {
    list-style: none;
    padding: 0;
}

.feature-list li,
.benefit-list li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
    color: var(--text-light);
}

.feature-list li::before {
    content: "✓";
    color: var(--secondary-color);
    font-weight: bold;
    position: absolute;
    left: 0;
}

.benefit-list li::before {
    content: "★";
    color: var(--warning-color);
    font-weight: bold;
    position: absolute;
    left: 0;
}

.service-pricing {
    background: var(--bg-light);
    padding: 1.5rem;
    border-radius: 10px;
    margin-bottom: 2rem;
    text-align: center;
}

.pricing-text {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.pricing-note {
    font-size: 0.9rem;
    color: var(--text-light);
    font-style: italic;
}

.service-cta {
    text-align: center;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', modalStyles);