(function () {
  // Keys used in storage
  const STORAGE_KEY = 'wdd131_review_count';
  const SESSION_INCREMENTED = 'wdd131_review_incremented';
  const SESSION_SUBMIT_FLAG = 'submittedReview';

  function referrerLooksLikeForm() {
    if (!document.referrer) return false;
    try {
      const ref = new URL(document.referrer);
      return ref.pathname.endsWith('/form.html') || ref.pathname.endsWith('form.html');
    } catch (e) {
      return document.referrer.indexOf('form.html') !== -1;
    }
  }

  function incrementIfFromForm() {
    try {
      if (sessionStorage.getItem(SESSION_INCREMENTED) === 'true') {
        return;
      }

      const cameFromForm = referrerLooksLikeForm();
      const wasSubmitted = sessionStorage.getItem(SESSION_SUBMIT_FLAG) === 'true';

      if (cameFromForm || wasSubmitted) {
        const current = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
        localStorage.setItem(STORAGE_KEY, String(current + 1));
        sessionStorage.setItem(SESSION_INCREMENTED, 'true');
        sessionStorage.removeItem(SESSION_SUBMIT_FLAG);
      }
    } catch (err) {
      console.warn('Could not update review count in storage:', err);
    }
  }

  function updateDisplay() {
    const count = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    const countSpan = document.getElementById('count');
    const messageEl = document.getElementById('review-message');

    if (countSpan) {
      countSpan.textContent = String(count);
    }

    if (messageEl) {
      messageEl.textContent = `Your form has been submitted successfully. This site has recorded ${count} review${count === 1 ? '' : 's'}.`;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    incrementIfFromForm();
    updateDisplay();
  });
})();
