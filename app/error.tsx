"use client";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-black px-6 text-center text-primary">
      <h2 className="font-display text-2xl font-bold tracking-tight">Something went wrong</h2>
      <p className="max-w-md text-sm text-white/80">
        We could not load the page. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className="border-2 border-primary px-4 py-2 text-sm font-semibold tracking-wide transition-colors hover:border-black hover:bg-white hover:text-black"
      >
        Try again
      </button>
    </div>
  );
}
