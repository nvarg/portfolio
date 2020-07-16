import { DirectiveOptions } from 'vue';

const OnView: DirectiveOptions = {
  inserted(el, binding) {
    function handleObserver(entries: IntersectionObserverEntry[],
      observer: IntersectionObserver) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          binding.value.callback(el);
          observer.unobserve(el);
        }
      });
    }

    if (window.IntersectionObserver) {
      const options = {
        root: binding.value.root || null,
        threshold: binding.value.threshold || 0,
      };

      const observer = new IntersectionObserver(handleObserver, options);
      observer.observe(el);
    } else {
      binding.value.callback(el);
    }
  },
};

export default OnView;
