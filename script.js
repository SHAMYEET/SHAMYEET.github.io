/* ---------------- DARK MODE ---------------- */
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

  setupTypingEffect();
  setupScrollAnimations();
  setupActiveNavbar();
});

/* ---------------- TOGGLE THEME ---------------- */
function toggleDarkMode() {
  const body = document.body;
  const themeButton = document.getElementById("themeButton");

  body.classList.toggle("dark-mode");

  const isDark = body.classList.contains("dark-mode");
  themeButton.textContent = isDark ? "🔆" : "🌙";

  localStorage.setItem("theme", isDark ? "dark" : "light");
}

/* ---------------- CURSOR MOVE ---------------- */
function moveCursor() {
  const cursor = document.getElementById("cursor");
  const container = document.getElementById("typing-container");
  container.appendChild(cursor); // always keep cursor at end
}

/* ---------------- TYPING EFFECT ---------------- */
function setupTypingEffect() {
  const headingText = "Hi, I'm Shamit";

  const paragraphText = [
    "I'm a third-year engineering student with a strong interest in web development and building practical, user-friendly applications.",
    "I enjoy turning ideas into real projects, focusing on clean design, efficient code, and creating experiences that are both functional and visually appealing.",
    "Constant learning and improvement drive me, and I’m always looking for new challenges to grow as a developer."
  ];

  const headingEl = document.getElementById("typing-heading");
  const paraEl = document.getElementById("typing-paragraph");

  let hIndex = 0;
  let pIndex = 0;
  let charIndex = 0;

  function randomSpeed(min, max) {
    return Math.random() * (max - min) + min;
  }

  /* ---- TYPE HEADING ---- */
  function typeHeading() {
    if (hIndex < headingText.length) {
      headingEl.textContent += headingText.charAt(hIndex);
      hIndex++;
      moveCursor();
      setTimeout(typeHeading, randomSpeed(40, 80));
    } else {
      setTimeout(typeParagraph, 200);
    }
  }

  /* ---- TYPE PARAGRAPH ---- */
  function typeParagraph() {
    if (pIndex < paragraphText.length) {

      // create paragraph if not exists
      if (!paraEl.children[pIndex]) {
        const p = document.createElement("p");
        paraEl.appendChild(p);
      }

      const currentP = paraEl.children[pIndex];

      if (charIndex < paragraphText[pIndex].length) {
        currentP.textContent += paragraphText[pIndex].charAt(charIndex);
        charIndex++;
        moveCursor();
        setTimeout(typeParagraph, 12); // fast typing
      } else {
        pIndex++;
        charIndex = 0;
        setTimeout(typeParagraph, 120);
      }
    }
  }

  typeHeading();
}

/* ---------------- SMOOTH SCROLL ---------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId === "#home") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return;
    }

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

/* ---------------- ACTIVE NAVBAR ---------------- */
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

/* ---------------- SCROLL ANIMATION ---------------- */
function setupScrollAnimations() {
  const cards = document.querySelectorAll(".project-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.2 });

  cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.6s ease";
    observer.observe(card);
  });
}
