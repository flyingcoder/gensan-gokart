(function () {
  'use strict';

  // Optional countdown: set target date (e.g. end of opening month)
  var countdownEl = document.getElementById('countdown');
  var countdownDays = document.getElementById('countdown-days');
  var countdownHrs = document.getElementById('countdown-hrs');
  var countdownMins = document.getElementById('countdown-mins');

  function updateCountdown() {
    if (!countdownEl || !countdownDays) return;
    var target = new Date(new Date().getFullYear(), 2, 31, 23, 59, 59); // March 31
    var now = new Date();
    if (now >= target) {
      countdownEl.textContent = 'Opening soon';
      return;
    }
    var d = Math.max(0, Math.floor((target - now) / 86400000));
    var h = Math.max(0, Math.floor(((target - now) % 86400000) / 3600000));
    var m = Math.max(0, Math.floor(((target - now) % 3600000) / 60000));
    countdownDays.textContent = d;
    countdownHrs.textContent = String(h).padStart(2, '0');
    countdownMins.textContent = String(m).padStart(2, '0');
  }

  if (countdownEl) {
    updateCountdown();
    setInterval(updateCountdown, 60000);
  }

  // Racing month label
  var monthEl = document.getElementById('racing-month');
  if (monthEl) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    monthEl.textContent = months[new Date().getMonth()] || 'Soon';
  }

  // Gallery: dots and scroll sync
  var track = document.getElementById('gallery-track');
  var dotsContainer = document.getElementById('gallery-dots');
  if (track && dotsContainer) {
    var slides = track.querySelectorAll('.gallery-slide');
    slides.forEach(function (_, i) {
      var dot = document.createElement('span');
      dot.setAttribute('data-index', i);
      if (i === 0) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    });
    var dots = dotsContainer.querySelectorAll('span');

    function setActive(i) {
      dots.forEach(function (d, j) {
        d.classList.toggle('active', j === i);
      });
    }

    track.addEventListener('scroll', function () {
      var index = Math.round(track.scrollLeft / (track.scrollWidth / slides.length));
      setActive(Math.min(index, slides.length - 1));
    });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        var slideWidth = track.querySelector('.gallery-slide').offsetWidth;
        track.scrollTo({ left: i * (slideWidth + 16), behavior: 'smooth' });
        setActive(i);
      });
    });
  }

  // Notify form: no backend – show confirmation
  var form = document.getElementById('notify-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value.trim();
      var phone = form.querySelector('[name="phone"]').value.trim();
      if (!name || !phone) return;
      var btn = form.querySelector('button[type="submit"]');
      var oldText = btn.textContent;
      btn.textContent = 'Got it! We’ll notify you.';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = oldText;
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }
})();
