class ScrollListener {

  constructor(threshold, elem) {
    this.threshold = threshold;

    document.addEventListener('DOMContentLoaded', () => {
      this.elemOffset = document.querySelector(elem).offsetTop;
      this.lastKnownScrollPosition = document.documentElement.scrollTop;
    });

    window.addEventListener('scroll', e => {
      const { scrollY } = window;

      let ticking;
      let thresholdReached = false;
      let elemReached = false;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.lastKnownScrollPosition = scrollY;

          console.log(`current scroll position ${this.getLastKnownScrollPosition()}`);

          if (scrollY >= this.threshold && !thresholdReached) {
            // emit treshold reached event
            thresholdReached = true;
            console.log(`threshold of ${this.threshold} reached`);
          }

          if (scrollY >= this.elemOffset && !elemReached) {
            // emit element reached event
            elemReached = true;
            console.log(`element ${elem} at ${this.elemOffset} reached`);
          }

          ticking = false;
        });

        ticking = true;
      }
    });
  }

  getLastKnownScrollPosition() {
    return this.lastKnownScrollPosition;
  }
}

const scrollListenerInstance = new ScrollListener(800, '.scroll-container');
const lastKnownScrollPosition = scrollListenerInstance.getLastKnownScrollPosition();
