document.addEventListener("DOMContentLoaded", () => {
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.body.classList.add("dark-mode");
    document.getElementById("themeButton").textContent = "🔆";
  } else {
    document.body.classList.remove("dark-mode");
    document.getElementById("themeButton").textContent = "🌙";
  }

  setupScrollAnimations();
  setupActiveNavbar();
});

function toggleDarkMode() {
  const body = document.body;
  const themeButton = document.getElementById("themeButton");

  body.classList.toggle("dark-mode");

  const isDark = body.classList.contains("dark-mode");
  themeButton.textContent = isDark ? "🔆" : "🌙";

  localStorage.setItem("theme", isDark ? "dark" : "light");
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


function setupActiveNavbar() {
  const sections = document.querySelectorAll("section, .container");
  const navLinks = document.querySelectorAll(".navbar a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}


function setupScrollAnimations() {
  const cards = document.querySelectorAll(".project-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, {
    threshold: 0.2
  });

  cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.6s ease";

    observer.observe(card);
  });
}
