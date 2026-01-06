// Main JavaScript for Ranya Ouni Portfolio
// Author: Portfolio Builder
// Description: Handles all interactive features and animations

document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // NAVIGATION & SCROLL MANAGEMENT
  // ============================================

  const navbar = document.getElementById("navbar");
  const scrollTopBtn = document.getElementById("scroll-top");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Show/hide scroll to top button
    if (currentScroll > 300) {
      scrollTopBtn.classList.add("visible");
      scrollTopBtn.classList.remove("opacity-0", "invisible");
    } else {
      scrollTopBtn.classList.remove("visible");
      scrollTopBtn.classList.add("opacity-0", "invisible");
    }

    lastScroll = currentScroll;
  });

  // Scroll to top functionality
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");

      // Toggle icon
      const icon = mobileMenuBtn.querySelector("i");
      if (mobileMenu.classList.contains("hidden")) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      } else {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      }
    });
  }

  // Close mobile menu when clicking on a link
  const mobileNavLinks = mobileMenu.querySelectorAll("a");
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("hidden");
      const icon = mobileMenuBtn.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  });

  // Active navigation link based on scroll position
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);
  updateActiveNavLink(); // Call on page load

  // ============================================
  // SMOOTH SCROLLING FOR ANCHOR LINKS
  // ============================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // ============================================
  // SCROLL REVEAL ANIMATION
  // ============================================

  function revealOnScroll() {
    const reveals = document.querySelectorAll(
      ".skill-card, .project-card, .contact-card"
    );

    reveals.forEach((element) => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("reveal");
        setTimeout(() => {
          element.classList.add("active");
        }, 100);
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Call on page load

  // ============================================
  // PROJECT CARDS - READ MORE FUNCTIONALITY
  // ============================================

  const readMoreButtons = document.querySelectorAll(".read-more-btn");

  readMoreButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const projectCard = this.closest(".project-card");
      const description = projectCard.querySelector("p");
      const t = translations[currentLang];

      // Toggle line clamp
      if (description.classList.contains("line-clamp-3")) {
        description.classList.remove("line-clamp-3");
        const readLessText = t['project.readLess'];
        this.innerHTML = readLessText + ' <i class="fas fa-arrow-up"></i>';
      } else {
        description.classList.add("line-clamp-3");
        const readMoreText = t['project.readMore'];
        this.innerHTML = readMoreText + ' <i class="fas fa-arrow-right"></i>';
      }
    });
  });

  // ============================================
  // SKILL CARDS ANIMATION
  // ============================================

  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card, index) => {
    // Add staggered animation delay
    card.style.animationDelay = `${index * 0.05}s`;

    // Add hover effect
    card.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) rotate(2deg)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  // ============================================
  // PARTICLES BACKGROUND EFFECT
  // ============================================

  function createParticles() {
    const heroSection = document.querySelector("#home");
    if (!heroSection) return;

    const particlesContainer = document.createElement("div");
    particlesContainer.classList.add("particles");

    // Create 20 particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      // Random position
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";

      // Random animation delay
      particle.style.animationDelay = Math.random() * 10 + "s";

      // Random size
      const size = Math.random() * 4 + 2;
      particle.style.width = size + "px";
      particle.style.height = size + "px";

      particlesContainer.appendChild(particle);
    }

    heroSection.appendChild(particlesContainer);
  }

  createParticles();

  // ============================================
  // FORM VALIDATION (if contact form exists)
  // ============================================

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // Basic validation
      if (!name || !email || !message) {
        showNotification("Veuillez remplir tous les champs", "error");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification("Veuillez entrer une adresse email valide", "error");
        return;
      }

      // Success message
      showNotification("Message envoyé avec succès!", "success");
      contactForm.reset();
    });
  }

  // ============================================
  // NOTIFICATION SYSTEM
  // ============================================

  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `fixed top-20 right-6 px-6 py-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
      type === "success"
        ? "bg-green-500"
        : type === "error"
        ? "bg-red-500"
        : "bg-blue-500"
    } text-white`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
      notification.style.opacity = "1";
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // ============================================
  // LAZY LOADING IMAGES (if any)
  // ============================================

  const lazyImages = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));

  // ============================================
  // PROFILE IMAGE LOADING WITH FALLBACK
  // ============================================

  const profileImage = document.querySelector('img[alt*="Ranya Ouni"]');
  if (profileImage) {
    // Add loading state
    profileImage.addEventListener("load", function () {
      this.style.opacity = "0";
      setTimeout(() => {
        this.style.transition = "opacity 0.5s ease";
        this.style.opacity = "1";
      }, 100);
    });

    // Handle image load error gracefully
    profileImage.addEventListener("error", function () {
      console.log("Profile image not found, using fallback");
    });
  }

  // ============================================
  // PRELOADER (Optional)
  // ============================================

  window.addEventListener("load", function () {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      // Fade out preloader
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 0.5s ease";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }

    // Trigger initial animations after page load
    setTimeout(() => {
      document
        .querySelectorAll(".animate-fade-in-up, .animate-fade-in-down")
        .forEach((el, index) => {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, index * 100);
        });
    }, 100);
  });

  // ============================================
  // KEYBOARD NAVIGATION ACCESSIBILITY
  // ============================================

  document.addEventListener("keydown", function (e) {
    // ESC key to close mobile menu
    if (
      e.key === "Escape" &&
      mobileMenu &&
      !mobileMenu.classList.contains("hidden")
    ) {
      mobileMenu.classList.add("hidden");
      const icon = mobileMenuBtn.querySelector("i");
      if (icon) {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }
  });

  // ============================================
  // PERFORMANCE OPTIMIZATION
  // ============================================

  // Throttle scroll events
  function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply throttling to scroll-heavy functions
  const throttledReveal = throttle(revealOnScroll, 100);
  const throttledNavUpdate = throttle(updateActiveNavLink, 100);

  window.addEventListener("scroll", throttledReveal);
  window.addEventListener("scroll", throttledNavUpdate);

  // ============================================
  // CONSOLE MESSAGE
  // ============================================

  console.log(
    "%c👋 Bienvenue sur mon portfolio!",
    "color: #6366f1; font-size: 20px; font-weight: bold;"
  );
  console.log(
    "%cRanya Ouni - Junior Data Scientist",
    "color: #8b5cf6; font-size: 16px;"
  );
  console.log(
    "%cIntéressé par mon profil? Contactez-moi!",
    "color: #ec4899; font-size: 14px;"
  );

  // ============================================
  // ANALYTICS (Optional - add your tracking code)
  // ============================================

  // Track page views
  function trackPageView(page) {
    console.log("Page view:", page);
    // Add your analytics code here
  }

  trackPageView(window.location.pathname);

  // Track button clicks
  document.querySelectorAll(".btn-primary, .btn-secondary").forEach((btn) => {
    btn.addEventListener("click", function () {
      const buttonText = this.textContent.trim();
      console.log("Button clicked:", buttonText);
      // Add your analytics code here
    });
  });
});

// ============================================
// MULTILINGUAL SUPPORT - GLOBAL TRANSLATION SYSTEM
// ============================================

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.skills': 'Compétences',
    'nav.experience': 'Expérience',
    'nav.projects': 'Projets',
    'nav.education': 'Formation',
    'nav.cv': 'CV',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.subtitle': 'Junior Data Scientist',
    'hero.location': 'Basée en Tunisie',
    'hero.viewProjects': 'Voir mes projets',
    'hero.contact': 'Me contacter',
    
    // Sections
    'about.title': 'À propos de moi',
    'about.paragraph1': 'Passionnée par l\'extraction d\'informations précieuses à partir de volumes de données étendus pour éclairer les décisions commerciales critiques.',
    'about.paragraph2': 'En tant que Junior Data Scientist, je combine une solide formation académique avec une expérience pratique dans le développement de solutions basées sur les données. Je suis spécialisée dans le Machine Learning, l\'analyse statistique et la visualisation de données pour transformer des données brutes en insights actionnables.',
    'skills.title': 'Compétences',
    'experience.title': 'Expérience Professionnelle',
    'experience.1.company': 'Syndic Tunisie Pro',
    'experience.1.position': 'Assistant aux Données, Front Office',
    'experience.1.description': 'De septembre à décembre 2025, j\'ai occupé le poste d\'assistant aux données où j\'étais responsable de l\'intégrité du cycle de vie des données clients et contractuelles. Mon rôle consistait à implémenter des protocoles pour la collecte et la vérification rigoureuse des informations, réduisant ainsi les erreurs de saisie. J\'ai conçu et structuré des bases de données pour le suivi des transactions et des clients, ce qui a permis de générer des rapports de performance plus précis. De plus, j\'ai mis en place un système d\'organisation pour les documents juridiques et comptables, garantissant la cohérence et la traçabilité des données à des fins d\'audit et de conformité.',
    'experience.2.company': 'Wafacash',
    'experience.2.position': 'Assistant Opérationnel et Données, Temps partiel',
    'experience.2.description': 'Au cours de ma mission à temps partiel, de juillet à septembre 2025, j\'ai contribué à l\'optimisation des opérations de l\'agence par une gestion rigoureuse des données. J\'ai assuré le contrôle de la qualité et de l\'exactitude des données transactionnelles et des dossiers clients, ce qui était essentiel pour la conformité réglementaire. J\'ai également participé à l\'analyse des données opérationnelles pour identifier des axes d\'amélioration dans la qualité de service et l\'efficacité des procédures internes.',
    'projects.title': 'Mes Projets',
    'education.title': 'Formation',
    'education.degree1.title': 'Ingénierie en Data Science',
    'education.degree1.university': 'Université TEK-UP',
    'education.degree2.title': 'Master Professionnel',
    'education.degree2.field': 'Systèmes d\'Information & Data Science',
    'education.degree2.university': 'Faculté d\'Économie et de Gestion de Tunis',
    'education.degree3.title': 'Licence Business Intelligence',
    'education.degree3.university': 'Faculté d\'Économie et de Gestion de Tunis',
    'contact.title': 'Contact',
    'contact.description': 'Intéressé par une collaboration ? N\'hésitez pas à me contacter !',
    
    // CV Section
    'cv.title': 'Télécharger mon CV',
    'cv.description': 'Vous pouvez télécharger mon CV au format PDF pour en savoir plus sur mon parcours et mes compétences.',
    'cv.button': 'Télécharger le CV',
    'cv.ariaLabel': 'Télécharger le CV',
    
    // Projects Descriptions
    'project.readMore': 'En savoir plus',
    'project.readLess': 'Voir moins',
    'project.1.description': 'Développement d\'un chatbot juridique alimenté par l\'IA pour l\'assistance au droit tunisien utilisant la génération augmentée par récupération (RAG) pour des réponses contextuelles. Conception et déploiement d\'une API REST avec FastAPI et une interface React.',
    'project.2.description': 'Développement d\'un système OCR pour l\'extraction automatisée de données de factures et conception d\'un chatbot pour assister les utilisateurs finaux. Optimisation des performances du système et validation des résultats.',
    'project.3.description': 'Prévision des prix des actions en utilisant des modèles statistiques et hybrides de séries temporelles (ARIMA, LSTM, etc.). Amélioration de la précision des prédictions grâce à des approches d\'ensemble.',
    'project.4.description': 'Construction d\'un détecteur de spam email utilisant des techniques de machine learning pour identifier et catégoriser efficacement les emails spam et non-spam, améliorant la gestion et la sécurité des emails.',
    'project.5.description': 'Détermination des critères clés pour sélectionner une maison de qualité à un prix abordable. Développement d\'un modèle d\'analyse de données et ML pour identifier les facteurs influençant les prix immobiliers.',
    'project.6.description': 'Nettoyage et analyse des données de ventes. Analyse de sentiment sur les avis clients pour découvrir des insights sur la performance d\'Amazon et le sentiment des clients.',
    'project.7.description': 'Modèle de prédiction de prix automobiles pour Geely Auto. Identification des variables significatives et compréhension des facteurs influençant les prix des voitures sur le marché américain.',
    'project.8.description': 'Utilisation de la classification hiérarchique pour créer un dendrogramme visualisant les similitudes entre fromages. Application de K-means pour catégoriser les fromages en groupes homogènes.',
    'project.9.description': 'Analyse, nettoyage et préparation de données manufacturières. Développement de dashboards révélant des patterns et application de techniques avancées de résolution de problèmes avec rapports pour la prise de décision data-driven.'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.education': 'Education',
    'nav.cv': 'CV',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.subtitle': 'Junior Data Scientist',
    'hero.location': 'Based in Tunisia',
    'hero.viewProjects': 'View my projects',
    'hero.contact': 'Contact me',
    
    // Sections
    'about.title': 'About me',
    'about.paragraph1': 'Passionate about extracting valuable insights from extensive data volumes to inform critical business decisions.',
    'about.paragraph2': 'As a Junior Data Scientist, I combine strong academic training with hands-on experience in developing data-driven solutions. I specialize in Machine Learning, statistical analysis, and data visualization to transform raw data into actionable insights.',
    'skills.title': 'Skills',
    'experience.title': 'Professional Experience',
    'experience.1.company': 'Syndic Tunisie Pro',
    'experience.1.position': 'Data Assistant, Front Office',
    'experience.1.description': 'From September to December 2025, I held the position of data assistant where I was responsible for the integrity of the client and contractual data lifecycle. My role involved implementing protocols for rigorous collection and verification of information, thereby reducing data entry errors. I designed and structured databases for tracking transactions and clients, which enabled the generation of more accurate performance reports. Additionally, I established an organizational system for legal and accounting documents, ensuring data consistency and traceability for audit and compliance purposes.',
    'experience.2.company': 'Wafacash',
    'experience.2.position': 'Operations & Data Assistant, Part-time',
    'experience.2.description': 'During my part-time assignment from July to September 2025, I contributed to optimizing branch operations through rigorous data management. I ensured quality control and accuracy of transactional data and client records, which was essential for regulatory compliance. I also participated in analyzing operational data to identify areas for improvement in service quality and internal procedure efficiency.',
    'projects.title': 'My Projects',
    'education.title': 'Education',
    'education.degree1.title': 'Data Science Engineering',
    'education.degree1.university': 'TEK-UP University',
    'education.degree2.title': 'Professional Master\'s Degree',
    'education.degree2.field': 'Information Systems & Data Science',
    'education.degree2.university': 'Faculty of Economics and Management of Tunis',
    'education.degree3.title': 'Bachelor\'s Degree in Business Intelligence',
    'education.degree3.university': 'Faculty of Economics and Management of Tunis',
    'contact.title': 'Contact',
    'contact.description': 'Interested in collaboration? Don\'t hesitate to contact me!',
    
    // CV Section
    'cv.title': 'Download my CV',
    'cv.description': 'You can download my CV in PDF format to learn more about my background and skills.',
    'cv.button': 'Download CV',
    'cv.ariaLabel': 'Download CV',
    
    // Projects Descriptions
    'project.readMore': 'Read more',
    'project.readLess': 'Read less',
    'project.1.description': 'Development of an AI-powered legal chatbot for Tunisian law assistance using Retrieval-Augmented Generation (RAG) for contextual responses. Design and deployment of a REST API with FastAPI and a React frontend.',
    'project.2.description': 'Development of an OCR-based system for automated invoice data extraction and design of a chatbot to assist end users. System performance optimization and results validation.',
    'project.3.description': 'Stock price forecasting using statistical and hybrid time-series models (ARIMA, LSTM, etc.). Improved prediction accuracy through ensemble approaches.',
    'project.4.description': 'Building an email spam detector using machine learning techniques to effectively identify and categorize spam and non-spam emails, improving email management and security.',
    'project.5.description': 'Determining key criteria for selecting a quality house at an affordable price. Development of a data analysis and ML model to identify factors influencing real estate prices.',
    'project.6.description': 'Cleaning and analysis of sales data. Sentiment analysis on customer reviews to discover insights about Amazon\'s performance and customer sentiment.',
    'project.7.description': 'Car price prediction model for Geely Auto. Identification of significant variables and understanding factors influencing car prices in the American market.',
    'project.8.description': 'Using hierarchical classification to create a dendrogram visualizing similarities between cheeses. Application of K-means to categorize cheeses into homogeneous groups.',
    'project.9.description': 'Analysis, cleaning and preparation of manufacturing data. Development of dashboards revealing patterns and application of advanced problem-solving techniques with reports for data-driven decision making.'
  }
};

let currentLang = 'fr';

// Function to translate all elements with data-i18n attribute
function translatePage() {
  const t = translations[currentLang];
  
  // Translate all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (t[key]) {
      // For buttons with icons, preserve the icon
      if (element.classList.contains('read-more-btn')) {
        const icon = element.querySelector('i');
        if (icon) {
          element.innerHTML = t[key] + ' <i class="' + icon.className + '"></i>';
        } else {
          element.textContent = t[key];
        }
      } else {
        element.textContent = t[key];
      }
    }
  });
  
  // Translate aria-labels
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const key = element.getAttribute('data-i18n-aria');
    if (t[key]) {
      element.setAttribute('aria-label', t[key]);
    }
  });
  
  // Update language toggle buttons
  const langDisplayNav = document.getElementById('lang-display-nav');
  const langDisplayMobile = document.getElementById('lang-display-mobile');
  const langText = currentLang === 'fr' ? 'EN' : 'FR';
  
  if (langDisplayNav) langDisplayNav.textContent = langText;
  if (langDisplayMobile) langDisplayMobile.textContent = langText;
}

// Toggle language function
function toggleLanguage() {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  translatePage();
  
  // Save language preference
  localStorage.setItem('preferredLanguage', currentLang);
}

// Load saved language preference on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
    currentLang = savedLang;
  }
  translatePage();
});

function handleDownload() {
  const link = document.createElement('a');
  link.href = 'RanyaOuni_cv.pdf';
  link.download = 'RanyaOuni_cv.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Track download
  console.log('CV downloaded');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Get scroll percentage
function getScrollPercentage() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  return (scrollTop / scrollHeight) * 100;
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================
// EXPORT FOR MODULE USAGE (if needed)
// ============================================

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    isInViewport,
    getScrollPercentage,
    debounce,
    throttle,
  };
}
