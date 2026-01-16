export default function GlobalLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--background)">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-white/20 border-t-blue-400 rounded-full animate-spin" />
        <p className="text-sm text-white/60 tracking-wide">
          Loading...
        </p>
      </div>
    </div>
  );
}
