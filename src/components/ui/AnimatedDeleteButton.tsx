import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

interface AnimatedDeleteButtonProps {
  itemRef: React.RefObject<any>;
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
    e.preventDefault();
    e.stopPropagation();
    
    if (isDeleting || !itemRef.current || !buttonRef.current) return;
    
    setIsDeleting(true);
    if (onBeforeDelete) onBeforeDelete();

    const startRect = itemRef.current.getBoundingClientRect();
    const endRect = buttonRef.current.getBoundingClientRect();
    const html = itemRef.current.outerHTML;

    setFlightData({ html, start: startRect, end: endRect });

    // Slowed down timing:
    // Flight takes 1000ms.
    // Let's call onDelete after flight completes (e.g., 1100ms).

    setTimeout(() => {
      if (isMounted.current) {
        onDelete();
        setTimeout(() => {
          if (isMounted.current) {
            setIsDeleting(false);
            setFlightData(null);
          }
        }, 500);
      } else {
        onDelete();
      }
    }, 1100);
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
          transition={{ delay: 1.0, duration: 0.4 }}
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
                    duration: 0.3,
                    ease: "easeOut",
                  }
                : {
                    duration: 0.4,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.8,
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
              y: flightData.end.y - 20, // Higher arc for slow motion
              opacity: [1, 1, 0],
              scale: [1, 1.1, 0.15],
              boxShadow: [
                "0px 0px 0px rgba(0,0,0,0)",
                "0px 15px 30px rgba(0,0,0,0.3)",
                "0px 0px 0px rgba(0,0,0,0)",
              ],
            }}
            transition={{
              duration: 1.0,
              ease: flightEasing,
              opacity: { times: [0, 0.9, 1] },
              scale: { times: [0, 0.2, 1] },
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
