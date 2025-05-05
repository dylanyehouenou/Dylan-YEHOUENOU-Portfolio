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