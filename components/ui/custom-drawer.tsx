"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  createContext,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

// ── Context ──────────────────────────────────────────────────────────
interface DrawerContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const DrawerContext = createContext<DrawerContextValue>({
  open: false,
  setOpen: () => {},
});

// ── Drawer (root) ────────────────────────────────────────────────────
interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Drawer({ open: controlledOpen, onOpenChange, children }: DrawerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (v: boolean) => {
      if (isControlled) {
        onOpenChange?.(v);
      } else {
        setInternalOpen(v);
        onOpenChange?.(v);
      }
    },
    [isControlled, onOpenChange],
  );

  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}

// ── DrawerTrigger ────────────────────────────────────────────────────
interface DrawerTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

function DrawerTrigger({ asChild, children }: DrawerTriggerProps) {
  const { setOpen } = useContext(DrawerContext);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        (children as React.ReactElement<any>).props.onClick?.(e);
        setOpen(true);
      },
    });
  }

  return (
    <button type="button" onClick={() => setOpen(true)}>
      {children}
    </button>
  );
}

// ── DrawerContent ────────────────────────────────────────────────────
interface DrawerContentProps {
  side?: "right" | "left";
  className?: string;
  children: React.ReactNode;
}

function DrawerContent({
  side = "right",
  className,
  children,
}: DrawerContentProps) {
  const { open, setOpen } = useContext(DrawerContext);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Mount in DOM first, then trigger animation
  useEffect(() => {
    if (open) {
      setMounted(true);
      // Small delay so the browser paints the off-screen state first
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 300); // match transition duration
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  // Focus trap – focus the panel when it opens
  useEffect(() => {
    if (visible && panelRef.current) {
      panelRef.current.focus();
    }
  }, [visible]);

  if (!mounted) return null;

  const slideClass =
    side === "right"
      ? visible
        ? "translate-x-0"
        : "translate-x-full"
      : visible
        ? "translate-x-0"
        : "-translate-x-full";

  return createPortal(
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity duration-300",
          visible ? "opacity-100" : "opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        data-lenis-prevent
        className={cn(
          "absolute inset-y-0 flex flex-col overflow-hidden bg-white shadow-lg outline-none transition-transform duration-300 ease-in-out",
          side === "right" ? "right-0 border-l" : "left-0 border-r",
          slideClass,
          className,
        )}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

// ── DrawerHeader ─────────────────────────────────────────────────────
function DrawerHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

// ── DrawerFooter ─────────────────────────────────────────────────────
function DrawerFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

// ── DrawerTitle ──────────────────────────────────────────────────────
function DrawerTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-foreground font-semibold", className)}
      {...props}
    />
  );
}

// ── DrawerDescription ────────────────────────────────────────────────
function DrawerDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
