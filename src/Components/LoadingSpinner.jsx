export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin"></div>
        <div className="text-xl text-gray-600">{message}</div>// to be dynamic for each page to show it's message 
      </div>
    </div>
  );
}