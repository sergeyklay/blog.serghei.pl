import {analyticsCode, respectDoNotTrack} from '@params';

let dataLayer;

/**
 * Check if the Do Not Track setting is enabled.
 *
 * @returns {boolean}
 */
function isDoNotTrackEnabled() {
  if (typeof window === 'undefined') {
    return false;
  }
  const {doNotTrack, navigator} = window;

  // Do Not Track Settings across browsers
  const dnt = (doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack);

  if (!dnt) {
    return false;
  }

  return dnt === true ||
    dnt === 1 ||
    dnt === 'yes' ||
    (typeof dnt === 'string' && dnt.charAt(0) === '1');
}

function gtag() {
  dataLayer.push(arguments);
}

/**
 * Fire an event on Google Analytics.
 *
 * @param {string|Boolean} eventName  The name of the event.
 * @param {Object} eventParams Parameters to send with the event.
 *
 * @returns {void}
 */
function fireEvent(eventName, eventParams = {}) {
  if (window.location.hostname === 'localhost') {
    console.log(`GA Event: ${eventName}`, eventParams);
    return;
  }

  if (typeof gtag === 'function') {
    gtag('event', eventName, eventParams);
  } else {
    console.warn('gtag function is not defined');
  }
}

/**
 * Fire the user timing request to GA.
 *
 * @param {string} name     The name of the timing event
 * @param {number} time     The timing value
 * @param {string} category The category of the timing event
 *
 * @returns {void}
 */
function fireTiming(name, time, category = 'Performance') {
  fireEvent('timing_complete', {
    'name': name,
    'value': time,
    'event_category': category
  });
}

/**
 * Callback function to track performance timing.
 *
 * @returns {void}
 */
function onLoadCallback() {
  const performance = window.performance;

  // Check if the PerformanceNavigationTiming API is supported
  if (performance.getEntriesByType) {
    const navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0) {
      // Get the first entry
      const navigationTiming = navigationEntries[0];

      // Calculate load time using Navigation Timing Level 2 API
      const loadTime = navigationTiming.loadEventEnd - navigationTiming.startTime;

      if (loadTime > 0) {
        fireTiming('load', loadTime);
      }
    }
  }
}

/**
 * Track the scroll depth of the page.
 *
 * @returns {void}
 */
function trackScrollDepth() {
  const scrollThresholds = [25, 50, 75, 100];
  scrollThresholds.forEach(threshold => {
    const handler = () => {
      const scrolled = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;
      if (scrolled > threshold) {
        fireEvent('scroll', { 'percent_scrolled': threshold });
        // Remove listener for this threshold after it's been tracked
        window.removeEventListener('scroll', handler);
      }
    };
    window.addEventListener('scroll', handler);
  });
}

/**
 * Callback function to track click events.
 *
 * @param {Event} event The event object.
 *
 * @returns {void}
 */
function onClickCallback(event) {
  // Find the closest anchor element in case the click is on a child element
  const anchor = event.target.closest('a');
  if (!anchor) {
    return;
  }

  const href = anchor.getAttribute('href');

  // Exclude links without href, JavaScript links, or hash links
  if (!href || href.startsWith('javascript:') || href === '#') {
    return;
  }

  // Determine if the link is internal
  let isInternal = false;
  try {
    const url = new URL(anchor.href, window.location.href);
    isInternal = url.host === window.location.host;
  } catch (e) {
    console.error('Invalid URL in href: ', href);
    return;
  }

  // Proceed only if the link is internal
  if (isInternal) {
    // Prepare event parameters
    const eventParams = {
      'link_classes': anchor.className,
      'link_id': anchor.id,
      'link_text': anchor.textContent.trim(),
      'link_url': href,
      'outbound': false,
    };

    // Send the event to GA4
    fireEvent('click', eventParams);
  }
}

/**
 * Initialize additional tracking features.
 *
 * @returns {void}
 */
function initializeAdditionalTracking() {
  // Outbound link tracking.
  document.addEventListener('click', onClickCallback, false);

  // Track performance timing
  window.addEventListener('load', onLoadCallback, false);

  // Track scroll depth
  trackScrollDepth();
}

if (respectDoNotTrack && isDoNotTrackEnabled()) {
  // Skip analytics for users with Do Not Track enabled
  console.info('[TRACKING]: Respecting DNT with respect to analytics...'); // eslint-disable-line no-console
} else {
  // Known DNT values not set, so we will assume it's off.
  if (analyticsCode) {
    (function () {
      // New Google Site Tag (gtag.js) tagging/analytics framework
      // See: https://developers.google.com/gtagjs
      const baseUrl = 'https://www.googletagmanager.com';
      const params = new URLSearchParams({
        id: analyticsCode
      });

      let script = document.createElement('script');
      script.src = `${baseUrl}/gtag/js?${params.toString()}`;
      script.type = 'text/javascript';
      script.async = true;

      document.getElementsByTagName('head')[0].appendChild(script);
    }());

    dataLayer = window.dataLayer = window.dataLayer || [];
    gtag('js', new Date());

    const month = 30 * 24 * 60 * 60; // 30 days, in seconds

    // Set up the project analytics code and send a pageview
    gtag('config', analyticsCode, {
      'cookie_expires': month,
      'send_page_view': true,
      'allow_ad_personalization_signals': true
    });

    gtag('set', {
      'cookie_flags': 'SameSite=None;Secure'
    });

    // Track additional features
    initializeAdditionalTracking();
  }
}
