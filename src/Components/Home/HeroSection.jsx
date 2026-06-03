export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:16px_16px] -z-10 opacity-50"></div>

      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-transparent flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                Discover Amazing <br />
                <span className="bg-gradient-to-r from-pink-300 via-purple-500 to-orange-500 bg-clip-text text-transparent">Sparkling Deals</span>
              </h1>
              <p className="text-xl text-white/90 max-w-lg leading-relaxed">
                Your one-stop destination for dazzling deals and sparkling surprises.
              </p>
              <a 
                href="/products" 
                className="inline-block bg-purple-600 text-white font-bold py-4 px-8 rounded-full border-2 border-slate-800 shadow-[4px_4px_0px_0px_#1E293B] hover:shadow-[6px_6px_0px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
              >
                Shop now →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}