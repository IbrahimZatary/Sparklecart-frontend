export default function FeatureCard({ icon, title, description, bgColor }) {
  const getIcon = () => {
    switch(icon) {
      case 'quality':
        return (
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'delivery':
        return (
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'price':
        return (
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="group bg-white rounded-2xl p-8 text-center border-2 border-slate-200 shadow-[6px_6px_0px_0px_#E2E8F0] hover:shadow-[10px_10px_0px_0px_#CBD5E1] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
      <div className={`w-20 h-20 ${bgColor} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-[3px_3px_0px_0px_#1E293B]`}>
        {getIcon()}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}