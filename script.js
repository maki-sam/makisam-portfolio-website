// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Initialize EmailJS
(function() {
    emailjs.init('bUXnGHMWwaVrSezLZ'); // Replace with your EmailJS public key
})();

// Contact form submission with EmailJS
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const successMessage = document.getElementById('successMessage');

    emailjs.sendForm('service_3m56jkr', 'template_tpk4i5r', this)
        .then(function() {
            successMessage.style.display = 'block';
            document.getElementById('contactForm').reset();
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }, function(error) {
            alert('Failed to send message. Please try again later.');
            console.error('EmailJS error:', error);
        });
});

// // Download resume function
// function downloadResume() {
//     // In a real implementation, this would link to your actual PDF file
//     alert('Resume download would start here. Please upload your PDF resume to your S3 bucket and update this link.');
//     // Example: window.open('https://your-s3-bucket.s3.amazonaws.com/alex-morgan-resume.pdf', '_blank');
// }

// Download resume function
function downloadResume() {
    // Link to your actual resume file in the makisam-resume folder
    window.open('/makisam-resume/Min_Htet_San_Resume.pdf', '_blank');
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Intersection Observer for animations
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

// Observe all sections except home
document.querySelectorAll('.content-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');

// Set initial state from localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
