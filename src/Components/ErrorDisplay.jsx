export default function ErrorDisplay({ error, onRetry, message = "Failed to load data" }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-xl text-red-500 mb-4">{error || message}</div>// as if error not showed
        {onRetry && (
          <button 
            onClick={onRetry}
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}