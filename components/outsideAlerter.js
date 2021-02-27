import React, { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, onClick) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick && onClick();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClick]);
}

/**
 * Component that alerts if you click outside of it
 */
export default function OutsideAlerter({ children, onClick }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onClick);

  return <div ref={wrapperRef}>{children}</div>;
}
