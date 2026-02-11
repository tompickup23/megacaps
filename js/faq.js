// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const faqToggles = document.querySelectorAll('.faq-item__toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    });

    // Close other FAQs when one opens (optional accordion behavior)
    // Uncomment below if you want only one FAQ open at a time
    /*
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.setAttribute('aria-expanded', 'false');
                }
            });
            const isExpanded = this.getAttribute('aria-expanded') === 'false';
            this.setAttribute('aria-expanded', isExpanded);
        });
    });
    */
});

// Size Guide Modal
const sizeGuideModal = document.getElementById('sizeGuideModal');
const sizeGuideOpenButtons = document.querySelectorAll('.open-size-guide');
const sizeGuideCloseButton = document.querySelector('.modal-close');

function openSizeGuide() {
    if (sizeGuideModal) {
        sizeGuideModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSizeGuide() {
    if (sizeGuideModal) {
        sizeGuideModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Open modal from size guide links
sizeGuideOpenButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        openSizeGuide();
    });
});

// Close modal from close button
if (sizeGuideCloseButton) {
    sizeGuideCloseButton.addEventListener('click', closeSizeGuide);
}

// Close modal when clicking outside content
if (sizeGuideModal) {
    sizeGuideModal.addEventListener('click', function(e) {
        if (e.target === sizeGuideModal) {
            closeSizeGuide();
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sizeGuideModal && sizeGuideModal.classList.contains('active')) {
        closeSizeGuide();
    }
});
