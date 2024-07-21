document.addEventListener('DOMContentLoaded', function () {
  const loginBtn = document.getElementById('loginBtn');
  const loginLink = document.getElementById('loginLink');
  const logoutBtn = document.getElementById('logoutBtn');
  const logoutLink = document.getElementById('logoutLink');
  const adminLink = document.getElementById('adminLink');
  const adminLinkDivider = document.getElementById('adminLinkDivider');
  const loginStatus = document.getElementById('loginStatus');

  // Check if user is logged in
  if (localStorage.getItem('loggedIn') === 'true') {
    adminLink.classList.remove('hidden');
    adminLinkDivider.classList.remove('hidden');
    loginLink.classList.add('hidden');
    logoutLink.classList.remove('hidden');
  }

  if (loginBtn) {
    loginBtn.addEventListener('click', function (e) {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      if (username === 'admin' && password === 'password') {
        localStorage.setItem('loggedIn', 'true');
        adminLink.classList.remove('hidden');
        adminLinkDivider.classList.remove('hidden');
        loginLink.classList.add('hidden');
        logoutLink.classList.remove('hidden');
        showToast("Logged in successfully.", "success", "fa-circle-check");

        window.location.href = 'http://127.0.0.1:5500/page/admin/reservation-list.html';
      } else {
        showToast("Invalid credentials.", "warning", "fa-circle-exclamation");
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();

      localStorage.removeItem('loggedIn');
      adminLink.classList.add('hidden');
      adminLinkDivider.classList.add('hidden');
      loginLink.classList.remove('hidden');
      logoutLink.classList.add('hidden');
      if (loginStatus) {
        showToast("Logged out successfully.", "success", "fa-circle-check");

        window.location.reload();
      }
    });
  }

  // Redirect to login page if not logged in and trying to access admin page
  if (window.location.pathname.includes('admin/reservation-list.html') && localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'http://127.0.0.1:5500/page/home.html';

    setTimeout(() => {
      showToast("You must be logged in to access the admin page.", "danger", "fa-circle-xmark");
    }, 3000);
  }

  function showToast(message, type, icon) {
    loginStatus.innerHTML = `<div role="alert" class="alert alert-${type}"><i class="fa-solid ${icon}"></i><span>${message}</span></div>`;;

    // Automatically remove the toast after 3 seconds
    setTimeout(() => {
      loginStatus.innerHTML = "";
    }, 3000);
  }
});
