import React, { useState, useEffect, useRef } from "react";

const LazyImage = ({ src, alt, placeholder, style }) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState(null);

  const onLoad = () => {
    setImageSrc(src);
  };

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // When the image is visible in the viewport + rootMargin, load the image.
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
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
      // Make sure to cleanup the observer if the component unmounts
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
      style={style}
      onError={(e) => (e.target.src = placeholder)}
      onLoad={() => imageSrc === placeholder && onLoad()}
    />
  );
};

export default LazyImage;
