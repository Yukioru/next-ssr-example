import { useEffect, useMemo, useState } from 'react';

function useHeader(options = {}) {
  const [triggerTransparent, setTriggerTransparent] = useState(false);

  const state = useMemo(() => {
    return !options.transparent || (options.transparent && triggerTransparent)
      ? false
      : true;
  }, [triggerTransparent, options]);

  useEffect(() => {
    function eventScroll() {
      const newTriggerTransparent = window.scrollY > options.trigger;
      if (newTriggerTransparent !== triggerTransparent) {
        setTriggerTransparent(newTriggerTransparent);
      }
    }

    const eventOptions = { passive: true };

    if (options.transparent) {
      window.addEventListener('scroll', eventScroll, eventOptions);
    }

    return () => {
      if (options.transparent) {
        window.removeEventListener('scroll', eventScroll, eventOptions);
      }
    };
  }, [options, triggerTransparent]);

  return state;
}

export default useHeader;
