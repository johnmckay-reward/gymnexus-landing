// GymNexus Landing Page - Main JavaScript

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS with custom settings
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
    delay: 50
  });

  // Initialize Lucide Icons
  lucide.createIcons();
});

// Sticky Header with scroll effect
const nav = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('shadow-md', 'bg-white/95');
  } else {
    nav.classList.remove('shadow-md', 'bg-white/95');
  }
});

// Mobile Menu Toggle
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIconOpen = document.getElementById('menu-icon-open');
const menuIconClose = document.getElementById('menu-icon-close');

// Function to close menu
const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.add('hidden');
  menuIconOpen.classList.remove('hidden');
  menuIconClose.classList.add('hidden');
};

// Toggle menu on button click
menuButton.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  if (isExpanded) {
    closeMenu();
  } else {
    menuButton.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.remove('hidden');
    menuIconOpen.classList.add('hidden');
    menuIconClose.classList.remove('hidden');
  }
});

// Close menu when a link is clicked
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

// Tab Interface Logic with smooth transitions
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.dataset.tab;

    // Update button styles
    tabButtons.forEach(btn => {
      btn.classList.remove('text-secondary', 'border-secondary', 'active');
      btn.classList.add('text-slate-500', 'border-transparent', 'hover:text-slate-800', 'hover:border-slate-300');
    });
    button.classList.add('text-secondary', 'border-secondary', 'active');
    button.classList.remove('text-slate-500', 'border-transparent', 'hover:text-slate-800', 'hover:border-slate-300');

    // Fade out current content
    tabContents.forEach(content => {
      if (!content.classList.contains('hidden')) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
          content.classList.add('hidden');
          
          // Fade in new content
          const newContent = document.getElementById(`${tabId}-content`);
          if (newContent) {
            newContent.classList.remove('hidden');
            // Force reflow
            newContent.offsetHeight;
            newContent.style.opacity = '1';
            newContent.style.transform = 'translateY(0)';
          }
        }, 300);
      }
    });

    // If the target is already visible, just ensure it's shown
    const targetContent = document.getElementById(`${tabId}-content`);
    if (targetContent && targetContent.classList.contains('hidden')) {
      // Already handled in the fade logic above
    } else if (targetContent) {
      // Make sure it's visible
      targetContent.style.opacity = '1';
      targetContent.style.transform = 'translateY(0)';
    }
  });
});

// Initialize tab content styles
tabContents.forEach(content => {
  content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  if (!content.classList.contains('hidden')) {
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
  }
});

// Form Submission
const form = document.getElementById('interest-form');
const statusMessage = document.getElementById('status-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // In production, send this data to your API
  // For demo purposes, show a success message
  
  // Fade out form
  form.style.opacity = '0';
  form.style.transform = 'translateY(-20px)';
  
  setTimeout(() => {
    form.style.display = 'none';
    
    statusMessage.innerHTML = `
      <div class="rounded-md bg-green-50 p-4" style="opacity: 0; transform: translateY(20px); transition: all 0.5s ease;">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-green-800">Thank you!</h3>
            <div class="mt-2 text-sm text-green-700">
              <p>We've received your request. Our team will be in touch shortly to schedule your demo.</p>
            </div>
          </div>
        </div>
      </div>
    `;
    statusMessage.style.display = 'block';
    
    // Trigger animation
    setTimeout(() => {
      const successMsg = statusMessage.querySelector('.rounded-md');
      if (successMsg) {
        successMsg.style.opacity = '1';
        successMsg.style.transform = 'translateY(0)';
      }
    }, 50);
  }, 300);
});

// Add form transition
form.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
