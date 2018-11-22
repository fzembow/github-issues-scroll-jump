/**
 * Polls for URL changes that either do or don't match a pattern.
 */
class NavigationChangeNotifier {
  constructor(opts) {
    this.URL_CHANGE_POLL_MS = 250;
    this.LOADED_POLL_MS = 250;

    this.urlPattern = opts.urlPattern;
    this.onNavigateToMatch = opts.onNavigateToMatch;
    this.onNavigateElsewhere = opts.onNavigateElsewhere;
    // A CSS selector that we poll after a route change to the desired URL pattern to 
    // detect when we've actually loaded the content.
    this.loadDetectionSelector = opts.loadDetectionSelector;
    this.knownLocationHref = window.location.href;
    window.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
    this.onVisibilityChange();
  }

  checkUrlChanged() {
    if (window.location.href !== this.knownLocationHref) {
      this.knownLocationHref = window.location.href;
      if (window.location.href.match(this.urlPattern)) {
        this.pollLoadedTimeout = setTimeout(this.checkContentLoaded.bind(this), this.LOADED_POLL_MS);
      } else {
        clearTimeout(this.pollLoadedTimeout);
        this.onNavigateElsewhere();
      }
    }
  }

  checkContentLoaded() {
    const testElements = document.querySelectorAll(this.loadDetectionSelector);
    if (testElements.length) {
      this.onNavigateToMatch();
      return;
    }

    if (window.location.href.match(this.urlPattern)) {
      this.pollLoadedTimeout = setTimeout(this.checkContentLoaded.bind(this), this.LOADED_POLL_MS);
    }
  }

  onVisibilityChange() {
    if (document.hidden) {
      clearInterval(this.checkHrefInterval);
    } else {
      this.checkHrefInterval = setInterval(this.checkUrlChanged.bind(this), this.URL_CHANGE_POLL_MS);
    }
  }
}

export default NavigationChangeNotifier;
