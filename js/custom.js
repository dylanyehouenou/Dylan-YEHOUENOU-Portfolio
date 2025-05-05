// Animation des jauges au scroll
document.addEventListener('DOMContentLoaded', function() {
    const competences = document.querySelectorAll('.competence-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.progress');
          progressBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          });
        }
      });
    }, {threshold: 0.1});
    
    competences.forEach(competence => {
      observer.observe(competence);
    });
  });