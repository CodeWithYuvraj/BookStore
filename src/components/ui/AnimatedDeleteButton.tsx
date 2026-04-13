import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface AnimatedDeleteButtonProps {
  itemRef: React.RefObject<HTMLElement>;
  onDelete: () => void;
  className?: string;
  onBeforeDelete?: () => void; // Called immediately on click to hidden original
}

// Cubic bezier for slightly upward arc before diving
const flightEasing = [0.4, 0, 0.2, 1];

export function AnimatedDeleteButton({ itemRef, onDelete, onBeforeDelete, className = "" }: AnimatedDeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [flightData, setFlightData] = useState<{
    html: string;
    start: DOMRect;
    end: DOMRect;
  } | null>(null);
  
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDeleting || !buttonRef.current || !itemRef.current) return;

    if (onBeforeDelete) onBeforeDelete();
    setIsDeleting(true);

    const startRect = itemRef.current.getBoundingClientRect();
    const endRect = buttonRef.current.getBoundingClientRect();

    // Capture the current visual state of the item to clone it
    const html = itemRef.current.outerHTML;

    setFlightData({ html, start: startRect, end: endRect });

    setTimeout(() => {
      if (isMounted.current) {
        onDelete();
        
        // Final cleanup after animation timeframe
        setTimeout(() => {
          if (isMounted.current) {
            setIsDeleting(false);
            setFlightData(null);
          }
        }, 3000); 
      } else {
        onDelete();
      }
    }, 50);
  };

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`relative flex items-center justify-center p-2 rounded-lg transition-colors text-muted-foreground hover:text-destructive hover:bg-destructive/10 ${className}`}
        disabled={isDeleting}
        aria-label="Delete"
      >
        <motion.div
          animate={
            isDeleting
              ? { x: [0, -2, 2, -2, 2, 0] } 
          : { x: 0 }
          }
          transition={{ delay: 2.0, duration: 0.5 }}
          className="relative w-5 h-5 flex flex-col items-center"
        >
          {/* Lid */}
          <motion.div
            className="w-full flex justify-center origin-left"
            initial={{ rotate: 0 }}
            animate={{ rotate: isDeleting ? -80 : 0 }}
            transition={
              isDeleting
                ? {
                    duration: 0.5,
                    ease: "easeOut",
                  }
                : {
                    duration: 0.6,
                    type: "spring",
                    stiffness: 150,
                    damping: 12,
                    delay: 1.8,
                  }
            }
          >
            <svg
              width="16"
              height="6"
              viewBox="0 0 16 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5"
            >
              <path d="M1 5h14M5 5V2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </motion.div>

          {/* Bin Base */}
          <div className="flex justify-center -mt-[1px]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1.5 0v11.5a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V0" />
            </svg>
          </div>
        </motion.div>
      </button>

      {/* Flight Animation Portal */}
      {flightData &&
        createPortal(
          <motion.div
            initial={{
              x: flightData.start.x,
              y: flightData.start.y,
              width: flightData.start.width,
              height: flightData.start.height,
              opacity: 1,
              scale: 1,
              boxShadow: "0px 0px 0px rgba(0,0,0,0)",
            }}
            animate={{
              x: flightData.end.x + flightData.end.width / 2 - flightData.start.width / 2,
              y: flightData.end.y - 40, // Much higher arc for slow motion visibility
              opacity: [1, 1, 0.5, 0],
              scale: [1, 1.15, 0.4, 0.1],
              boxShadow: [
                "0px 0px 0px rgba(0,0,0,0)",
                "0px 25px 50px rgba(0,0,0,0.4)",
                "0px 5px 10px rgba(0,0,0,0.2)",
                "0px 0px 0px rgba(0,0,0,0)",
              ],
            }}
            transition={{
              duration: 2.0,
              ease: flightEasing,
              opacity: { times: [0, 0.8, 0.95, 1] },
              scale: { times: [0, 0.2, 0.8, 1] },
            }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 9999,
              pointerEvents: "none",
            }}
            className="flex items-center justify-center filter drop-shadow-xl saturate-150"
            dangerouslySetInnerHTML={{ __html: flightData.html }}
          />,
          document.body
        )}
    </>
  );
}
