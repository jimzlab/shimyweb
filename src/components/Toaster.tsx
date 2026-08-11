import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type ToastVariant = "success" | "error";
type Toast = { id: number; title: string; description?: string | undefined; variant: ToastVariant };

const ToastContext = createContext<{
  toast: (t: { title: string; description?: string; variant?: ToastVariant }) => void;
}>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({
      title,
      description,
      variant = "success",
    }: {
      title: string;
      description?: string;
      variant?: ToastVariant;
    }) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, title, description, variant }]);
      setTimeout(() => dismiss(id), 4500);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        role="status"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-[100] flex flex-col items-center gap-3 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto w-full max-w-sm rounded-md border border-border bg-card/95 px-4 py-3 backdrop-blur"
            style={{
              animation: "toast-in 0.4s cubic-bezier(0.22,1,0.36,1)",
              boxShadow: "var(--shadow-elegant)",
              borderLeft: `3px solid ${t.variant === "error" ? "var(--destructive)" : "var(--primary)"}`,
            }}
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className={`mt-1.5 size-2 shrink-0 rounded-full ${
                  t.variant === "error" ? "bg-destructive" : "bg-primary"
                }`}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-card-foreground">{t.title}</p>
                {t.description ? (
                  <p className="mt-1 text-sm text-muted-foreground">{t.description}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={() => dismiss(t.id)}
                aria-label="Zavřít notifikaci"
                className="-m-2 flex size-11 items-center justify-center text-muted-foreground transition-colors hover:text-primary"
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  ×
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
