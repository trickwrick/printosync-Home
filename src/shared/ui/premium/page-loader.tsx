"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/shared/config/site";

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          aria-hidden="true"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden rounded-2xl shadow-glow"
          >
            <Image
              src={siteConfig.logo}
              alt=""
              width={56}
              height={56}
              className="size-14 object-cover"
              priority
            />
          </motion.div>
          <div className="mt-6 h-0.5 w-32 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-full animate-[loader-bar_0.9s_ease-in-out_forwards] bg-brand" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
