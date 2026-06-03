export default function TestimonialCard({ name, initial, rating, text }) {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-[6px_6px_0px_0px_#E2E8F0] hover:shadow-[8px_8px_0px_0px_#CBD5E1] transition-all duration-200">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-[3px_3px_0px_0px_#1E293B]">
          {initial}
        </div>
        <div>
          <h3 className="font-bold text-slate-800">{name}</h3>
          <div className="flex gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed">"{text}"</p>
    </div>
  );
}