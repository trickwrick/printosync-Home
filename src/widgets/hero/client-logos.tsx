"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { clientLogos as fallbackNames } from "@/shared/config/navigation";

interface ClientItem {
  _id?: string;
  name: string;
  logoUrl?: string;
}

export function ClientLogos({
  initialClients,
}: {
  initialClients?: ClientItem[];
}) {
  const reduceMotion = useReducedMotion();
  const [clients, setClients] = useState<ClientItem[]>(
    initialClients && initialClients.length > 0
      ? initialClients
      : fallbackNames.map((name) => ({ name, logoUrl: "" }))
  );

  useEffect(() => {
    fetch("/api/admin/clients")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.clients) && data.clients.length > 0) {
          const activeOnly = data.clients.filter((c: { isActive?: boolean }) => c.isActive !== false);
          if (activeOnly.length > 0) {
            setClients(activeOnly);
          }
        }
      })
      .catch(() => {
        // Silently use defaults if fetch fails
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.6 }}
      className="mt-12 border-t border-border pt-8"
    >
      <p className="mb-5 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
        Trusted by leading print shops
      </p>

      <div className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <motion.div
          className="flex w-max"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 25, ease: "linear", repeat: Infinity }
          }
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center gap-4 pr-4"
              aria-hidden={copy === 1}
            >
              {clients.map((client, i) => (
                <motion.div
                  key={`${copy}-${client._id || client.name}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 + i * 0.05 }}
                  className={`flex h-14 items-center justify-center gap-3 rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold tracking-tight text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:text-brand hover:shadow-premium ${
                    client.name ? "min-w-44" : "min-w-28 px-4"
                  }`}
                >
                  {client.logoUrl ? (
                    <div
                      className={`relative shrink-0 overflow-hidden rounded-lg flex items-center justify-center ${
                        client.name ? "size-9 bg-surface p-1" : "h-10 w-28 p-1"
                      }`}
                    >
                      <Image
                        src={client.logoUrl}
                        alt={client.name || "Client logo"}
                        width={client.name ? 36 : 100}
                        height={36}
                        className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all opacity-85 hover:opacity-100"
                        unoptimized
                      />
                    </div>
                  ) : null}
                  {client.name ? <span className="truncate">{client.name}</span> : null}
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
