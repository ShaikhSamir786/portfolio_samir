document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  // Theme toggle
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");

  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem("theme");
  if (
    savedTheme === "dark" ||
    (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("dark-mode");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      localStorage.setItem("theme", "light");
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav");

  mobileMenuBtn.addEventListener("click", function () {
    mainNav.classList.toggle("show");
  });

  // Skills progress animation
  const progressBars = document.querySelectorAll(".progress");

  const animateProgressBars = () => {
    progressBars.forEach((bar) => {
      const width = bar.getAttribute("data-width");
      bar.style.width = width + "%";
    });
  };

  // Animate on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateProgressBars();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  const skillsProgress = document.getElementById("skills-progress");
  if (skillsProgress) {
    observer.observe(skillsProgress);
  }

  // Tech stack categories
  const techData = {
    Frontend: [
      {
        name: "HTML/CSS/JS",
        description:
          "Core web technologies for structure, styling, and interactivity",
        level: 95,
        icon: "fa-code",
      },
      {
        name: "jQuery",
        description: "Fast, small, and feature-rich JavaScript library",
        level: 90,
        icon: "fa-js",
      },
      {
        name: "React.js",
        description:
          "Comprehensive UI component library for professional web applications",
        level: 45,
        icon: "fa-window-restore",
      },
    ],
    Backend: [
      {
        name: "Express.js",
        description:
          "Node.js Framework for building web applications and APIs",
        level: 92,
        icon: "fa-server",
      },
     
      {
        name: "GraphQL",
        description:
          "Query language for APIs and a runtime for fulfilling those queries with your existing data",
        level: 40,
        icon: "fa-code",
      }
    ],
    Database: [
      {
        name: "MongoDB",
        description: "NoSQL database for modern applications",
        level: 65,
        icon: "fa-database",
      },
      {
        name: "MYSQL",
        description:
          "Standard language for storing, manipulating and retrieving data in databases",
        level: 65,
        icon: "fa-table",
      },
      {
        name: "PostgreSQL",
        description: "Powerful, open source object-relational database system",
        level: 10,
        icon: "fa-database",
      },
     
    ],
    Integration: [
      {
        name: "Cors",
        description:
          "Cross-Origin Resource Sharing - a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.",
        level: 80,
        icon: "fa-network-wired",
      },
    ],
  };

  const techGrid = document.getElementById("tech-grid");
  const categoryButtons = document.querySelectorAll(".category-btn");
  const techSearch = document.getElementById("tech-search");

  // Initial render
  renderTechCards("Frontend");

  // Category button click
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-category");

      // Update active button
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Clear search
      techSearch.value = "";

      // Render cards
      renderTechCards(category);
    });
  });

  // Search functionality
  techSearch.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase();

    if (searchTerm) {
      // Search across all categories
      const results = [];

      for (const category in techData) {
        techData[category].forEach((tech) => {
          if (
            tech.name.toLowerCase().includes(searchTerm) ||
            tech.description.toLowerCase().includes(searchTerm)
          ) {
            results.push({ ...tech, category });
          }
        });
      }

      renderSearchResults(results);

      // Remove active state from category buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
    } else {
      // If search is cleared, show the active category
      const activeCategory = document.querySelector(".category-btn.active");
      if (activeCategory) {
        renderTechCards(activeCategory.getAttribute("data-category"));
      } else {
        renderTechCards("Frontend");
        document
          .querySelector('[data-category="Frontend"]')
          .classList.add("active");
      }
    }
  });

  function renderTechCards(category) {
    techGrid.innerHTML = "";

    techData[category].forEach((tech) => {
      const card = createTechCard(tech);
      techGrid.appendChild(card);
    });
  }

  function renderSearchResults(results) {
    techGrid.innerHTML = "";

    if (results.length === 0) {
      techGrid.innerHTML =
        '<div class="no-results">No technologies found matching your search.</div>';
      return;
    }

    results.forEach((tech) => {
      const card = createTechCard(tech);
      techGrid.appendChild(card);
    });
  }

  function createTechCard(tech) {
    const card = document.createElement("div");
    card.className = "tech-card";

    card.innerHTML = `
            <div class="tech-icon">
                <i class="fas ${tech.icon}"></i>
            </div>
            <h3>${tech.name}</h3>
            <p>${tech.description}</p>
            <div class="tech-level">
                <div class="tech-level-info">
                    <span>Proficiency</span>
                    <span>${tech.level}%</span>
                </div>
                <div class="tech-level-bar">
                    <div class="tech-level-progress" style="width: ${tech.level}%"></div>
                </div>
            </div>
        `;

    return card;
  }

  // Contact form submission
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      // Simulate form submission
      const submitButton = contactForm.querySelector(".btn-submit");
      const originalButtonText = submitButton.innerHTML;

      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.disabled = true;

      setTimeout(() => {
        // Show success message
        formMessage.classList.add("success");
        formMessage.textContent =
          "Thank you! Your message has been sent successfully.";
        formMessage.style.display = "block";

        // Reset form
        contactForm.reset();

        // Reset button
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;

        // Hide message after 5 seconds
        setTimeout(() => {
          formMessage.style.display = "none";
        }, 5000);
      }, 1500);
    });
  }
});
