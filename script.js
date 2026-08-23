document.addEventListener('DOMContentLoaded', function () {

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Typewriter effect
  var roles = ['Aspiring Software Developer', 'MCA Student', 'Problem Solver', 'Team Player'];
  var el = document.getElementById('typewriterText');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    el.textContent = roles[0];
  } else {
    var roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      var current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 70);
    }
    tick();
  }

  // Skill cards — staggered reveal + dot fill
  var skillCards = document.querySelectorAll('.skill-card');
  var skillsRevealed = false;

  function revealSkills() {
    if (skillsRevealed) return;
    skillsRevealed = true;
    skillCards.forEach(function (card, i) {
      setTimeout(function () {
        card.classList.add('in-view');
        var level = parseInt(card.getAttribute('data-level'), 10) || 0;
        var dots = card.querySelectorAll('.skill-dots span');
        dots.forEach(function (dot, d) {
          if (d < level) {
            setTimeout(function () { dot.classList.add('filled'); }, 200 + d * 80);
          }
        });
      }, i * 90);
    });
  }

  var skillsSection = document.getElementById('skills');
  var skillsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        revealSkills();
        skillsObserver.disconnect();
      }
    });
  }, { threshold: 0.25 });
  skillsObserver.observe(skillsSection);

  // Active nav link on scroll
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    var scrollPos = window.scrollY + 140;
    sections.forEach(function (sec) {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + sec.id);
        });
      }
    });
  }
  window.addEventListener('scroll', onScroll);

  // Collapse mobile nav on link click
  var navMenu = document.getElementById('navMenu');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navMenu.classList.contains('show')) {
        new bootstrap.Collapse(navMenu).hide();
      }
    });
  });

  // Contact form (static — no backend, opens a mail draft)
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('nameInput').value;
    var email = document.getElementById('emailInput').value;
    var msg = document.getElementById('msgInput').value;
    var subject = encodeURIComponent('Portfolio contact from ' + name);
    var body = encodeURIComponent(msg + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = 'mailto:sidharthkumarnanda363@gmail.com?subject=' + subject + '&body=' + body;
    note.textContent = 'Opening your email app…';
  });

});
