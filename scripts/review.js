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
      // Fallback: simple substring check
      return document.referrer.indexOf('form.html') !== -1;
    }
  }

  function urlHasSubmittedParam() {
    try {
      const params = new URLSearchParams(window.location.search);
      const val = params.get('submitted');
      return val === '1' || val === 'true';
    } catch (e) {
      return false;
    }
  }

  // Increment the persistent counter only when appropriate:
  // - when we detect the user came from form.html (via document.referrer)
  // - OR when the session submit flag was set (sessionStorage)
  // - OR when the URL contains ?submitted=1
  // We also set a sessionStorage flag so a refresh does not increment again.
  function incrementIfFromForm() {
    try {
      if (sessionStorage.getItem(SESSION_INCREMENTED) === 'true') {
        console.debug('Review: already incremented this session, skipping.');
        return;
      }

      const cameFromForm = referrerLooksLikeForm();
      const wasSubmitted = sessionStorage.getItem(SESSION_SUBMIT_FLAG) === 'true';
      const urlSubmitted = urlHasSubmittedParam();

      console.debug('Review: cameFromForm=', cameFromForm, 'wasSubmitted=', wasSubmitted, 'urlSubmitted=', urlSubmitted);

      if (cameFromForm || wasSubmitted || urlSubmitted) {
        const current = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
        localStorage.setItem(STORAGE_KEY, String(current + 1));
        // Mark incremented for this session so refresh doesn't increase again
        sessionStorage.setItem(SESSION_INCREMENTED, 'true');
        // Clear the submit flag if present
        sessionStorage.removeItem(SESSION_SUBMIT_FLAG);
        console.debug('Review: incremented count to', current + 1);
      } else {
        console.debug('Review: not incrementing (no evidence of form submission)');
      }
    } catch (err) {
      // Storage may be disabled; fail silently
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