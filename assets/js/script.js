document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Copyright Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Sticky Header
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Update active state
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Form submission handling using jQuery (since jQuery is requested)
    // Wait for jQuery to load
    const initJQueryScripts = () => {
        if (typeof jQuery == 'undefined') {
            setTimeout(initJQueryScripts, 100);
            return;
        }
        
        $('#contactForm').on('submit', function(e) {
            e.preventDefault();
            
            const btn = $(this).find('button[type="submit"]');
            const originalText = btn.text();
            
            btn.text('Sending...').prop('disabled', true);
            
            $.ajax({
                type: 'POST',
                url: 'https://api.web3forms.com/submit',
                data: $(this).serialize(),
                dataType: 'json',
                success: function(response) {
                    if (response.success) {
                        btn.text('Message Sent!').css('background', '#28a745');
                        $('#contactForm')[0].reset();
                    } else {
                        btn.text('Error. Try Again.').css('background', '#dc3545');
                    }
                    
                    setTimeout(() => {
                        btn.text(originalText).css('background', '').prop('disabled', false);
                    }, 3000);
                },
                error: function() {
                    btn.text('Error. Try Again.').css('background', '#dc3545');
                    
                    setTimeout(() => {
                        btn.text(originalText).css('background', '').prop('disabled', false);
                    }, 3000);
                }
            });
        });
        
        // Typing Effect simulation
        const typeTarget = $('.typing-effect');
        if(typeTarget.length) {
            const text = typeTarget.data('text');
            let i = 0;
            typeTarget.text('');
            
            const typeWriter = () => {
                if (i < text.length) {
                    typeTarget.append(text.charAt(i));
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            // Start typing after a short delay
            setTimeout(typeWriter, 1000);
        }
    };
    
    initJQueryScripts();
});
