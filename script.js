// --- Button sound effect ---
const buttonSound = new Audio("buttton.wav");

// Add sound to all button clicks
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" || e.target.closest("button")) {
    buttonSound.currentTime = 0; // Reset to start for rapid clicks
    buttonSound.play().catch(() => {}); // Catch any autoplay errors
  }
});

// --- your original code (kept intact) ---
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const dashboard = document.getElementById("dashboard");
const authContainer = document.getElementById("authContainer");
const homePage = document.getElementById("homePage");
const getStartedBtn = document.getElementById("getStartedBtn");
const displayUser = document.getElementById("displayUser");

const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");
const navAvatar = document.getElementById("navAvatar");

hamburger.addEventListener("click", () => sideMenu.classList.add("active"));
closeMenu.addEventListener("click", () => sideMenu.classList.remove("active"));

document.getElementById("toSignup").addEventListener("click", e => {
  e.preventDefault();
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
});
document.getElementById("toLogin").addEventListener("click", e => {
  e.preventDefault();
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
});

signupForm.addEventListener("submit", e => {
  e.preventDefault();
  const u = document.getElementById("newUser").value;
  const p = document.getElementById("newPass").value;
  if (u && p) {
    localStorage.setItem("username", u);
    localStorage.setItem("password", p);
    alert("Account created! Please log in.");
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  } else alert("Please fill all fields!");
});

loginForm.addEventListener("submit", e => {
  e.preventDefault();
  const u = document.getElementById("username").value;
  const p = document.getElementById("password").value;
  if (u === localStorage.getItem("username") && p === localStorage.getItem("password")) {
    authContainer.classList.add("hidden");
    dashboard.classList.remove("hidden");
    displayUser.textContent = u;
  } else alert("Invalid credentials.");
});

getStartedBtn.addEventListener("click", () => {
  dashboard.classList.add("hidden");
  homePage.classList.remove("hidden");
  const savedAvatar = localStorage.getItem("avatar");
  if (savedAvatar) navAvatar.src = savedAvatar;
});

function logout() {
  homePage.classList.add("hidden");
  profilePage.classList.add("hidden");
  sideMenu.classList.remove("active");
  authContainer.classList.remove("hidden");
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
}
document.getElementById("logoutSide").addEventListener("click", logout);

const accountSide = document.getElementById("accountSide");
const profilePage = document.getElementById("profilePage");
const profileUsername = document.getElementById("profileUsername");
const profileHomeBtn = document.getElementById("profileHomeBtn");
const homeSideBtn = document.getElementById("homeSideBtn");
const profilePic = document.getElementById("profilePic");
const avatarInput = document.getElementById("avatarInput");

accountSide.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  homePage.classList.add("hidden");
  profilePage.classList.remove("hidden");
  profileUsername.textContent = localStorage.getItem("username") || "Unknown";

  const savedAvatar = localStorage.getItem("avatar");
  if (savedAvatar) {
    profilePic.src = savedAvatar;
    navAvatar.src = savedAvatar;
  }
});

profileHomeBtn.addEventListener("click", () => {
  profilePage.classList.add("hidden");
  homePage.classList.remove("hidden");
  const savedAvatar = localStorage.getItem("avatar");
  if (savedAvatar) navAvatar.src = savedAvatar;
});
homeSideBtn.addEventListener("click", () => {
  profilePage.classList.add("hidden");
  homePage.classList.remove("hidden");
  sideMenu.classList.remove("active");
});

avatarInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    profilePic.src = reader.result;
    navAvatar.src = reader.result;
    localStorage.setItem("avatar", reader.result);
  };
  reader.readAsDataURL(file);
});

window.addEventListener("load", () => {
  const savedAvatar = localStorage.getItem("avatar");
  if (savedAvatar) navAvatar.src = savedAvatar;
});

// --- added SETTINGS PAGE ---
const settingsSide = document.getElementById("settingsSide");
const settingsPage = document.getElementById("settingsPage");
const settingsHomeBtn = document.getElementById("settingsHomeBtn");
const bgMusic = document.getElementById("bgMusic");
const themeToggle = document.getElementById("themeToggle");
const accentPicker = document.getElementById("accentPicker");

settingsSide.addEventListener("click", () => {
  homePage.classList.add("hidden");
  settingsPage.classList.remove("hidden");
  sideMenu.classList.remove("active");
});

settingsHomeBtn.addEventListener("click", () => {
  settingsPage.classList.add("hidden");
  homePage.classList.remove("hidden");
});

document.getElementById("musicToggle").addEventListener("click", () => {
  if (bgMusic.paused) bgMusic.play();
  else bgMusic.pause();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") document.body.classList.add("light-mode");

accentPicker.addEventListener("input", e => {
  document.documentElement.style.setProperty("--accent", e.target.value);
  localStorage.setItem("accent", e.target.value);
});

if (localStorage.getItem("accent")) {
  document.documentElement.style.setProperty("--accent", localStorage.getItem("accent"));
  accentPicker.value = localStorage.getItem("accent");
}

document.getElementById("resetSettings").addEventListener("click", () => {
  localStorage.removeItem("accent");
  localStorage.removeItem("theme");
  document.body.classList.remove("light-mode");
  document.documentElement.style.setProperty("--accent", "#00b4d8");
  bgMusic.pause();
  alert("Settings reset to default!");
});
