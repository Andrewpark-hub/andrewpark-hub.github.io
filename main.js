// 1. 언어 버튼: html 에 en 클래스를 붙였다 뗐다 한다
const root = document.documentElement;

document.getElementById("langBtn").addEventListener("click", () => {
  root.classList.toggle("en");
  const lang = root.classList.contains("en") ? "en" : "ko";
  root.lang = lang;
  try { localStorage.setItem("lang", lang); } catch (e) {}
});

// 2. 테마 버튼: 지금 보이는 테마의 반대로 바꾼다
document.getElementById("themeBtn").addEventListener("click", () => {
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const now = root.dataset.theme || (systemDark ? "dark" : "light");
  const next = now === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// 3. 프로젝트 필터
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".card");

filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("on"));
    btn.classList.add("on");
    const pick = btn.dataset.filter;
    cards.forEach((card) => {
      card.classList.toggle("hide", pick !== "all" && card.dataset.cat !== pick);
    });
  });
});

// 4. 카드 위 마우스 위치를 CSS 변수로 넘겨서 빛이 따라오게 한다
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const box = card.getBoundingClientRect();
    card.style.setProperty("--x", e.clientX - box.left + "px");
    card.style.setProperty("--y", e.clientY - box.top + "px");
  });
});

// 5. 화면에 들어온 요소를 하나씩 나타나게 한다
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("shown");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

if (root.classList.contains("en")) root.lang = "en";
