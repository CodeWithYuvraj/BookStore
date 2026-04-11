import { motion } from "motion/react";
import useMeasure from "react-use-measure";

interface InfiniteSliderProps {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}

export function InfiniteSlider({
  children,
  duration = 20,
  reverse = false,
  className = "",
}: InfiniteSliderProps) {
  const [ref, { width }] = useMeasure();
  
  return (
    <div className={`overflow-hidden relative flex w-full ${className}`}>
      <motion.div
        className="flex min-w-fit"
        animate={{
          x: reverse ? [0, width / 2] : [-width / 2, 0],
        }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <div className="flex shrink-0 min-w-fit" ref={ref}>
          {children}
        </div>
        <div className="flex shrink-0 min-w-fit" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
