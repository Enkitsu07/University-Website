function showTab(tab) {
  document.getElementById('aboutSection').classList.add('hidden');
  document.getElementById('programSection').classList.add('hidden');
  document.getElementById('enrollSection').classList.add('hidden');
  document.getElementById('loginSection').classList.add('hidden');
  document.getElementById('personalInfo').classList.add('hidden');

  document.getElementById('aboutTab').classList.remove('active');
  document.getElementById('programTab').classList.remove('active');
  document.getElementById('enrollTab').classList.remove('active');
  document.getElementById('loginTab').classList.remove('active');

  if (tab === 'about') {
    document.getElementById('aboutSection').classList.remove('hidden');
    document.getElementById('aboutTab').classList.add('active');
  } else if (tab === 'program') {
    document.getElementById('programSection').classList.remove('hidden');
    document.getElementById('programTab').classList.add('active');
  } else if (tab === 'enroll') {
    document.getElementById('enrollSection').classList.remove('hidden');
    document.getElementById('enrollTab').classList.add('active');
  } else if (tab === 'login') {
    document.getElementById('loginSection').classList.remove('hidden');
    document.getElementById('loginTab').classList.add('active');
  }
}

function getUsers() {
  return JSON.parse(localStorage.getItem('uni_users') || '{}');
}

function saveUser(username, user) {
  let users = getUsers();
  users[username] = user;
  localStorage.setItem('uni_users', JSON.stringify(users));
}

function getUser(username) {
  let users = getUsers();
  return users[username];
}

const enrollForm = document.getElementById('enrollForm');
const enrollSuccess = document.getElementById('enrollSuccess');
const loginSection = document.getElementById('loginSection');
const loginForm = document.getElementById('loginForm');
const personalInfo = document.getElementById('personalInfo');

enrollForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let username = document.getElementById('enroll-username').value.trim();
  let password = document.getElementById('enroll-password').value;
  let fullname = document.getElementById('enroll-fullname').value;
  let email = document.getElementById('enroll-email').value;
  let dob = document.getElementById('enroll-dob').value;
  let program = document.getElementById('enroll-program').value;

  if (getUser(username)) {
    alert('Username already exists. Please choose another.');
    return;
  }
  saveUser(username, { password, fullname, email, dob, program });
  enrollSuccess.classList.remove('hidden');
  setTimeout(() => {
    enrollSuccess.classList.add('hidden');
    enrollForm.reset();
    showTab('login');
  }, 1400);
});

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let username = document.getElementById('login-username').value.trim();
  let password = document.getElementById('login-password').value;
  let user = getUser(username);
  if (user && user.password === password) {
    document.getElementById('displayName').textContent = user.fullname;
    document.getElementById('displayEmail').textContent = user.email;
    document.getElementById('displayDOB').textContent = user.dob;
    document.getElementById('displayProgram').textContent = user.program;
    loginSection.classList.add('hidden');
    personalInfo.classList.remove('hidden');
    loginForm.reset();

    document.getElementById('aboutTab').classList.remove('active');
    document.getElementById('programTab').classList.remove('active');
    document.getElementById('enrollTab').classList.remove('active');
    document.getElementById('loginTab').classList.remove('active');
  } else {
    alert('Invalid username or password.');
  }
});

function logout() {
  showTab('login');
  personalInfo.classList.add('hidden');
}

showTab('about');
