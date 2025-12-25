// src/components/AnimatedText.jsx

import React, { useRef, useEffect, useState } from 'react';

const AnimatedText = () => {
  // 1. useRef is used to create a reference to the DOM element we want to observe.
  const triggerRef = useRef(null);
  // 2. useState is used to track whether the element is currently visible in the viewport.
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 3. Create a new Intersection Observer instance.
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 'entry.isIntersecting' is true when the element enters the viewport.
        setIsVisible(entry.isIntersecting);
      },
      // Configuration object: 0.1 means 10% of the element must be visible to trigger.
      { threshold: 0.1 } 
    );

    // 4. Start observing the referenced element if it exists.
    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    // 5. Cleanup function: Runs when the component unmounts to stop observing.
    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current);
      }
    };
  }, []); // Empty dependency array means this effect runs once after the initial render (like componentDidMount).

  return (
    <>
      <div className="spacer"></div>
      <div className="container">
        <div className="line"></div>
        {/* 6. Attach the ref to the element (text-wrapper) and apply the 'show' class based on state. */}
        <div className={`text-wrapper ${isVisible ? 'show' : ''}`} ref={triggerRef}>
          <p className="animated-text">This sentence comes out.</p>
        </div>
      </div>
      <div className="spacer"></div>
    </>
  );
};

export default AnimatedText;