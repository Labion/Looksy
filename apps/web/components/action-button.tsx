import type { ReactNode } from "react";

type ActionButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
};

export function ActionButton({
  children,
  href,
  variant = "primary"
}: ActionButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-ink text-white shadow-soft hover:bg-moss focus-visible:outline-ink"
      : "border border-ink/15 bg-white/70 text-ink hover:border-moss hover:text-moss focus-visible:outline-moss";

  return (
    <a
      className={`flex min-h-12 w-full items-center justify-center rounded-lg px-5 py-3 text-center text-base font-semibold transition ${styles} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
      href={href}
    >
      {children}
    </a>
  );
}
