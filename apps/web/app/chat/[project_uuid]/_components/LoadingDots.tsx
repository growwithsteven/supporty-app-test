export function LoadingDots() {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1">
      <div
        className="animate-bigbounce animate-infinite size-2 rounded-full bg-gray-500"
        style={{
          animationDelay: "0s",
        }}
      ></div>
      <div
        className="animate-bigbounce size-2 rounded-full bg-gray-500"
        style={{
          animationDelay: "0.1s",
        }}
      ></div>
      <div
        className="animate-bigbounce size-2 rounded-full bg-gray-500"
        style={{
          animationDelay: "0.2s",
        }}
      ></div>
    </div>
  );
}
