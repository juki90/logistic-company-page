const navIcon = document.querySelector(".navicon"),
  navLinks = document.querySelectorAll(".header a");
let timeout = 0,
  timeout2 = 0;

const handleClickOutside = (e) => {
  e.stopPropagation();
  const navList = document.querySelector(".nav-item-list");
  const navIcon = document.querySelector(".navicon");
  if (!navList.contains(e.target) || navIcon.contains(e.target)) {
    navList.classList.remove("active");
    navIcon.classList.remove("active");
    document.removeEventListener("click", handleClickOutside);
  }
};

const handleClickNavicon = (e) => {
  const s =
      window.scrollY ||
      window.scrollTop ||
      document.querySelector("#html").scrollTop,
    el = document.querySelector(".header");

  if (document.body.clientWidth >= 1024 && s <= 100) {
    return;
  }

  if (document.body.clientWidth >= 1024 && s > 100) {
    const nav = document.querySelector(".nav");
    const navIcon = document.querySelector(".navicon");
    if (!nav.classList.contains("active")) {
      nav.classList.add("activating");
      nav.classList.add("active");
      navIcon.classList.add("activating");
      navIcon.classList.add("active");
      setTimeout(() => {
        navIcon.classList.remove("activating");
        nav.classList.remove("activating");
      }, 500);
      return;
    }
    if (
      nav.classList.contains("active") &&
      !nav.classList.contains("activating")
    ) {
      nav.classList.add("deactivating");
      navIcon.classList.add("deactivating");
      setTimeout(() => {
        nav.classList.remove("deactivating");
        navIcon.classList.remove("deactivating");
        nav.classList.remove("active");
        navIcon.classList.remove("active");
      }, 500);
    }
  }

  if (document.body.clientWidth < 1024) {
    e.stopPropagation();

    const navList = document.querySelector(".nav-item-list");
    const navIcon = document.querySelector(".navicon");

    if (
      !navIcon.classList.contains("active") &&
      !navIcon.classList.contains("deactivating")
    ) {
      navIcon.classList.add("activating");
      navList.classList.add("active");
      navIcon.classList.add("active");
      setTimeout(() => {
        navIcon.classList.remove("activating");
      }, 500);
      document.addEventListener("click", handleClickOutside);
      return;
    }
    if (
      navIcon.classList.contains("active") &&
      !navIcon.classList.contains("activating")
    ) {
      navList.classList.add("deactivating");
      navIcon.classList.add("deactivating");
      navList.classList.remove("active");
      navIcon.classList.remove("active");
      setTimeout(() => {
        navList.classList.remove("deactivating");
        navIcon.classList.remove("deactivating");
      }, 300);
      document.removeEventListener("click", handleClickOutside);
    }
  }
};

const handleResizeThrottled = (e) => {
  if (timeout) {
    return;
  }
  timeout = setTimeout(() => {
    console.log("FIRED");
    const w = document.body.clientWidth;
    const navList = document.querySelector(".nav-item-list");
    const navIcon = document.querySelector(".navicon");
    const nav = document.querySelector(".nav");
    if (w >= 1024) {
      navList.classList.remove("active");
      navIcon.classList.remove("active");
      document.removeEventListener("click", handleClickOutside);
    }
    if (w < 1024) {
      nav.classList.remove("active");
      navIcon.classList.remove("active");
    }
    timeout = 0;
  }, 100);
};

const handleScroll = (e) => {
  if (timeout2) {
    return;
  }

  timeout2 = setTimeout(() => {
    const s =
        window.scrollY ||
        window.scrollTop ||
        document.querySelector("#html").scrollTop,
      el = document.querySelector(".header"),
      elNav = document.querySelector(".nav"),
      navIcon = document.querySelector(".navicon");
    navList = document.querySelector(".nav-item-list");
    if (s > 100) {
      el.classList.add("scrolled");
      timeout2 = 0;
      return;
    }
    if (s <= 100) {
      el.classList.remove("scrolled");
      elNav.classList.remove("active");
      navIcon.classList.remove("active");
      navList.classList.remove("active");
      timeout2 = 0;
    }
  }, 50);
};

const handleClickLink = (e) => {
  const navList = document.querySelector(".nav-item-list");
  const navIcon = document.querySelector(".navicon");
  const nav = document.querySelector(".nav");
  navList.classList.remove("active");
  navIcon.classList.remove("active");
  nav.classList.remove("active");
};

navIcon.addEventListener("click", handleClickNavicon);
window.addEventListener("resize", handleResizeThrottled);
window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);
navLinks.forEach((link) => {
  link.addEventListener("click", handleClickLink);
});
