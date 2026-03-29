const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80,
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
  if (nearBottom) {
    removeActive();
    const contactLink = document.querySelector('.ul-list li a[href="#contact"]');
    if (contactLink) contactLink.parentElement.classList.add('active');
  } else {
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        removeActive();
        const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
        if (activeLink) activeLink.parentElement.classList.add('active');
      }
    });
  }

  if (window.scrollY > 500) {
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active-reveal');
    }
  });
});

const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content');
revealElements.forEach(el => {
  el.classList.add('reveal');
  el.classList.add('active-reveal');
});


const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #e87e7a;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});


// ce qui permet d'avoir la phrase qui défile sous le Lorene Goarant
const typingElement = document.querySelector('.info-home h3');
const words = ["Je suis étudiante", "en BTS SIO", "option SLAM", "en 1ere année"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
  const currentWord = words[wordIndex];
  let displayedText = currentWord.substring(0, charIndex);

  typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

  if (!isDeleting && charIndex < currentWord.length) {
    charIndex++;
    setTimeout(type, typingSpeed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, typingSpeed / 2);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(type, 1000);
  }
}

// ce qui permet d'afficher le h3 avec les info qui défile sous Lorene Goarant
document.addEventListener('DOMContentLoaded', type);

// le modale pour la petite page des démo des projets qui s'affiche

function openDemo() {
    document.getElementById('demo-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDemoBtn() {
    document.getElementById('demo-modal').classList.remove('active');
    document.body.style.overflow = '';
}

function closeDemo(event) {
    if (event.target === document.getElementById('demo-modal')) {
        closeDemoBtn();
    }
}

// le modale pour la petite page des pdf des certifications obtenu

// 1er format d'ouverture de pdf certif
function openCertif(pdfPath) {
  document.getElementById('certif-iframe').src = pdfPath;
  document.getElementById('certif-modal').classList.add('active');
  document.body.style.overflow = 'hidden'; // bloque le scroll derrière
}
// OU ALORS 2eme format d'ouverture de pdf certif
// function openCertif(pdfPath) {
//   const fullUrl = 'https://goarant-l.github.io/portfolio/' + pdfPath;
//   document.getElementById('certif-iframe').src = 
//     'https://mozilla.github.io/pdf.js/web/viewer.html?file=' + encodeURIComponent(fullUrl);
//   document.getElementById('certif-modal').classList.add('active');
//   document.body.style.overflow = 'hidden';
// }

function closeCertifBtn() {
  document.getElementById('certif-modal').classList.remove('active');
  document.getElementById('certif-iframe').src = '';
  document.body.style.overflow = '';
}

function closeCertif(event) {
  // ferme seulement si on clique sur le fond sombre (pas sur la boîte)
  if (event.target === document.getElementById('certif-modal')) {
    closeCertifBtn();
  }
}
