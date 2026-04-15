
// BLOG WEBSITE - MAIN JAVASCRIPT

document.addEventListener('DOMContentLoaded', function () {

  // ---- HAMBURGER MENU ----
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('open');
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
      }
    });
  }

  // ---- AUTO DISMISS ALERTS ----
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(function (alert) {
    setTimeout(function () {
      alert.style.transition = 'opacity 0.5s, transform 0.5s';
      alert.style.opacity = '0';
      alert.style.transform = 'translateY(-10px)';
      setTimeout(function () { alert.remove(); }, 500);
    }, 4000);
  });

  // ---- LIKE BUTTON ----
  const likeBtn = document.getElementById('likeBtn');
  if (likeBtn) {
    likeBtn.addEventListener('click', function () {
      const postId = this.dataset.postId;
      const likeCount = document.getElementById('likeCount');

      fetch('/post/' + postId + '/like/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
          'Content-Type': 'application/json',
        },
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.liked) {
            likeBtn.classList.add('liked');
            likeBtn.querySelector('.heart').textContent = '❤️';
          } else {
            likeBtn.classList.remove('liked');
            likeBtn.querySelector('.heart').textContent = '🤍';
          }
          if (likeCount) likeCount.textContent = data.total_likes;
        })
        .catch(function (err) { console.error('Like error:', err); });
    });
  }

  // ---- IMAGE PREVIEW ----
  const imageInput = document.getElementById('id_image');
  const imagePreview = document.getElementById('imagePreview');

  if (imageInput && imagePreview) {
    imageInput.addEventListener('change', function () {
      const file = this.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
          imagePreview.src = e.target.result;
          imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      } else {
        imagePreview.style.display = 'none';
      }
    });
  }

  // ---- CSRF Cookie helper ----
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

});
