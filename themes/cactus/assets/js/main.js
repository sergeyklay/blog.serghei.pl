/**
 * Sets up a click event listener on the specified icon that toggles
 * a class on a target element when the icon is clicked.
 *
 * @param {string} iconSelector - The CSS selector for the icon element.
 * @param {string} targetSelector - The CSS selector for the target element.
 * @param {string} toggleClassName - The CSS class to toggle.
 */
function setupMenuToggle(iconSelector, targetSelector, toggleClassName) {
  const icon = document.querySelector(iconSelector);
  const target = document.querySelector(targetSelector);

  if (icon && target) {
    icon.addEventListener('click', function () {
      target.classList.toggle(toggleClassName);
    });
  }
}

/**
 * Toggles the visibility of an element.
 *
 * @param {Element} element - The DOM element to toggle visibility.
 */
function toggleVisibility(element) {
  if (element.style.display === 'none' || element.style.display === '') {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
}

/**
 * Shows or hides the menu depending on the screen width.
 *
 * @param {Element} menu - The DOM element representing the menu.
 * @param {NodeListOf<Element>} menuIcons - The DOM element(s) representing the menu icon(s).
 * @param {number} width - The screen width at which the menu should be visible.
 */
function showMenu(menu, menuIcons, width) {
  if (!menuIcons || menuIcons.length === 0) {
    return;
  }

  if (document.documentElement.clientWidth >= width) {
    menu.style.visibility = 'visible';
    menuIcons.forEach(icon => icon.classList.add('active'));
  }
}

/**
 * Toggles the visibility of the menu and updates the icon's active state.
 *
 * @param {Element} menu - The DOM element representing the menu.
 * @param {NodeListOf<Element>} menuIcons - A collection of menu icon elements.
 */
function toggleMenu(menu, menuIcons) {
  if (menu.style.visibility === 'hidden' || menu.style.visibility === '') {
    menu.style.visibility = 'visible';
    menuIcons.forEach(icon => icon.classList.add('active'));
  } else {
    menu.style.visibility = 'hidden';
    menuIcons.forEach(icon => icon.classList.remove('active'));
  }
}

/**
 * Controls the different versions of the menu in blog post articles
 * for Desktop, tablet, and mobile devices.
 */
function setupArticleMenu() {
  const posts = document.querySelectorAll('.post');
  if (posts.length === 0) {
    return
  }

  const menu = document.querySelector('#menu');
  const menuIcons = document.querySelectorAll(
    '#menu-icon, #menu-icon-tablet'
  );

  if (!menu || menuIcons.length === 0) {
    return;
  }

  // Display the menu on hi-res laptops and desktops.
  showMenu(menu, menuIcons, 1440);
  const toggleHandler = (event) => {
    event.preventDefault();
    toggleMenu(menu, menuIcons);
  };

  // Display the menu if the menu icon is clicked.
  menuIcons.forEach(icon => {
    icon.addEventListener('click', toggleHandler);
  });
}

/**
 * Sets up a click event listener to scroll the page to the top.
 *
 * @param {string} selector - The CSS selector for the element.
 */
function setupScrollToTop(selector) {
  const topIcon = document.querySelector(selector);
  if (topIcon) {
    topIcon.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * Sets up hover event listeners to toggle visibility of a target element.
 *
 * @param {string} triggerSelector - The CSS selector for the element that triggers the hover.
 * @param {string} targetSelector - The CSS selector for the element to toggle.
 */
function setupHoverToggle(triggerSelector, targetSelector) {
  const triggerElement = document.querySelector(triggerSelector);
  const targetElement = document.querySelector(targetSelector);

  if (triggerElement && targetElement) {
    triggerElement.addEventListener('mouseover', function () {
      toggleVisibility(targetElement);
    }, false);

    triggerElement.addEventListener('mouseout', function () {
      toggleVisibility(targetElement);
    }, false);
  }
}

/**
 * Sets up a click event listener for an element to toggle the visibility of a social share block.
 *
 * @param {Element} triggerElement - The DOM element that triggers the click.
 * @param {Element} targetElement - The DOM element to toggle visibility.
 */
function setupShareToggle(triggerElement, targetElement) {
  if (triggerElement && targetElement) {
    triggerElement.addEventListener('click', function (event) {
      event.preventDefault();
      toggleVisibility(targetElement);
    });
  }
}

/**
 * Handles the visibility of the menu and toggles the display of
 * tablet-specific menu and "scroll to top" icons based on scroll direction and position.
 *
 * @param {Element} menu - The DOM element representing the menu.
 * @param {Element} menuIconTablet - The DOM element for the tablet menu icon.
 * @param {Element} topIconTablet - The DOM element for the "scroll to top" icon on tablet.
 * @param {Element} footerPost - The DOM element representing the footer post.
 */
function handleMenuVisibilityOnScroll(menu, menuIconTablet, topIconTablet, footerPost) {
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    const topDistance = window.scrollY || document.documentElement.scrollTop;

    // Hide footer post on scroll down, show on scroll up
    if (footerPost) {
      if (topDistance > lastScrollTop) {
        footerPost.style.display = 'none'; // downscroll
      } else {
        footerPost.style.display = 'block'; // upscroll
      }
    }

    lastScrollTop = topDistance;

    // Show or hide menu and icons based on scroll position
    if (menu && topDistance < 50) {
      menu.style.visibility = 'visible';
      menuIconTablet.style.display = 'block';
      topIconTablet.style.display = 'none';
    } else if (menu && topDistance > 100) {
      menu.style.visibility = 'hidden';
      menuIconTablet.style.display = 'none';
      topIconTablet.style.display = 'block';
    }
  });
}

/**
 * Sets up a scroll event listener that hides all submenus when the user scrolls.
 *
 * @param {Element} navFooter - The DOM element representing the navigation footer.
 * @param {Element} tocFooter - The DOM element representing the table of contents footer.
 * @param {Element} shareFooter - The DOM element representing the share footer.
 */
function hideSubMenusOnScroll(navFooter, tocFooter, shareFooter) {
  window.addEventListener('scroll', () => {
    if (navFooter) navFooter.style.display = 'none';
    if (tocFooter) tocFooter.style.display = 'none';
    if (shareFooter) shareFooter.style.display = 'none';
  });
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
  // Shows the responsive navigation menu on mobile
  setupMenuToggle(
    '#header > #nav > ul > .icon',
    '#header > #nav > ul',
    'responsive'
  );

  setupArticleMenu();

  setupScrollToTop('#top-icon');
  setupScrollToTop('#top-icon-tablet');

  handleMenuVisibilityOnScroll(
    document.querySelector('#menu'),
    document.querySelector('#menu-icon-tablet'),
    document.querySelector('#top-icon-tablet'),
    document.querySelector('#footer-post')
  );

  hideSubMenusOnScroll(
    document.querySelector('#nav-footer'),
    document.querySelector('#toc-footer'),
    document.querySelector('#share-footer')
  );

  setupShareToggle(
    document.querySelector('.fas.fa-share-alt'),
    document.querySelector('#share')
  );

  setupHoverToggle('.fas.fa-chevron-left', '#i-prev');
  setupHoverToggle('.fas.fa-chevron-right', '#i-next');
  setupHoverToggle('#fa-chevron-up-desktop', '#i-top');
  setupHoverToggle('.fas.fa-share-alt', '#i-share');
});
