// Animation au scroll pour les éléments
document.addEventListener('DOMContentLoaded', function() {
    const animateOnScroll = function() {
      const elements = document.querySelectorAll('.competence-item, .service_container .box, .blog_section .box');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          element.classList.add('visible');
        }
      });
    };
    
    // Déclencheur initial
    animateOnScroll();
    
    // Écouteur de scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scroll pour les liens
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  });


  /*
      ========== ANIMATIONS JS ==========
      Gère les effets dynamiques du site
    */
    
    // Effet de scroll sur le header
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('.header_section').addClass('scrolled');
      } else {
        $('.header_section').removeClass('scrolled');
      }
    });
    
    // Smooth scrolling pour les ancres
    $('a[href*="#"]').on('click', function(e) {
      e.preventDefault();
      $('html, body').animate(
        {
          scrollTop: $($(this).attr('href')).offset().top - 70,
        },
        500,
        'linear'
      );
    });



  // Animation for skill circles
  document.addEventListener('DOMContentLoaded', function() {
    const circles = document.querySelectorAll('.skill-circle');
    
    circles.forEach(circle => {
      // Get the percentage from the style attribute
      const style = circle.getAttribute('style');
      const percentageMatch = style.match(/--percentage:\s*(\d+)/);
      const percentage = percentageMatch ? percentageMatch[1] : 0;
      
      // Reset to 0 for animation
      circle.style.setProperty('--percentage', '0');
      
      // Animate to the actual percentage
      setTimeout(() => {
        circle.style.setProperty('--percentage', percentage);
      }, 100);
    });
});