/**
 * Thin wrapper around the GA4 tag installed in index.html.
 *
 * `gtag` is defined synchronously by the inline snippet in <head>, so calls made
 * before gtag.js finishes downloading still queue into dataLayer. That means the
 * click listener below can be attached immediately -- no need to wait for idle.
 */

/**
 * Send an event to GA4. No-ops when the tag is absent (static generation, dev,
 * ad blockers) so callers never need to guard.
 */
export function trackEvent(name, params = {}) {
  try {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    window.gtag('event', name, params);
  } catch {
    // Analytics must never break a user-facing flow.
  }
}

/**
 * Lead-generation conversion. GA4 treats `generate_lead` as a recommended event,
 * so it can be flagged as a key event in the property without custom setup.
 *
 * Only non-identifying fields are passed -- never the visitor's name, email or
 * phone number. Project type and city are what make the report useful (which
 * city landing page produces work) and neither identifies a person.
 */
export function trackLead({ projectType, city, source }) {
  trackEvent('generate_lead', {
    project_type: projectType || '(not set)',
    city: city || '(not set)',
    form_source: source || 'contact_form'
  });
}

/**
 * Attach one delegated listener for tel:/mailto: clicks.
 *
 * Delegation rather than per-link handlers: there are 20+ phone links spread
 * across pages and components, written in several formats (tel:9166071972,
 * tel:+19166071972, tel:${CONTACT_INFO.PHONE}). A single listener covers them
 * all, including any added later.
 *
 * Returns a cleanup function.
 */
export function initConversionTracking() {
  if (typeof document === 'undefined') return () => {};

  const onClick = (event) => {
    const link = event.target?.closest?.('a[href^="tel:"], a[href^="mailto:"]');
    if (!link) return;

    const href = link.getAttribute('href') || '';
    const isPhone = href.startsWith('tel:');

    trackEvent(isPhone ? 'phone_call_click' : 'email_click', {
      link_url: href,
      // Which page drove the contact -- the whole point of tracking this.
      page_path: window.location.pathname,
      link_text: (link.textContent || '').trim().slice(0, 100)
    });
  };

  // Capture phase so the event is recorded even if a handler stops propagation.
  document.addEventListener('click', onClick, { capture: true });
  return () => document.removeEventListener('click', onClick, { capture: true });
}
