import React, { useState, useEffect, useRef } from "react";

const LazyImage = ({ src, alt, placeholder, style }) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState(null);
  const [loaded, setLoaded] = useState(false); // New state to track loading

  const onLoad = () => {
    setImageSrc(src);
    setLoaded(true); // Set loaded to true when the image is loaded
  };

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
                setImageSrc(src);
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: "75%",
          }
        );
        observer.observe(imageRef);
      } else {
        // Old browsers fallback
        onLoad();
      }
    }
    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      style={{ ...style, opacity: loaded ? 1 : 0.5, transition: 'opacity 0.5s ease-in-out' }}
      onError={(e) => {
        setLoaded(false);
        e.target.src = placeholder;
      }}
      onLoad={onLoad}
    />
  );
};

export default LazyImage;
