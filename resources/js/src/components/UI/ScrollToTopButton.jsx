import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        // Customize scroll height here
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to the top with a smooth animation
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="scroll-to-top">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="text-dark2 cursor-pointer text-4xl fixed bottom-2 bg-cream right-2  w-10 h-10 border border-cream rounded-full flex justify-center items-center"
        >
          <IoIosArrowUp className="text-[24px]" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
