import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import boxAlone from "../assets/boxALone4.jpg";
import head from "../assets/head.png";
import iphone from "../assets/iphone.png";
import laptop from "../assets/laptop.png";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white">

      
        <div className="relative overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:16px_16px] -z-10 opacity-50"></div>

          <div className="relative h-[600px] overflow-hidden">
            <img src={boxAlone} alt="SparkleCart Hero" className="w-full h-full object-cover scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/50 to-transparent flex items-center">
              <div className="container mx-auto px-6 md:px-12">
                <div className="max-w-2xl space-y-6">
                  
                  <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
                    Discover Amazing <br />
                    <span className="bg-gradient-to-r from-pink-300 via-purple-500 to-orange-500 bg-clip-text text-transparent">Sparkling Deals</span>
                  </h1>
                  <p className="text-xl text-white/90 max-w-lg leading-relaxed">Your one-stop destination for dazzling deals and sparkling surprises.</p>
                  <button className="group bg-purple-600 text-white font-bold py-4 px-8 rounded-full border-2 border-slate-800 shadow-[4px_4px_0px_0px_#1E293B] hover:shadow-[6px_6px_0px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 text-lg">
                    <a href="/Products">Shop now </a>
                    <svg className="w-5 h-5 bg-white text-slate-800 rounded-full p-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-24 relative">

          <div className="absolute -top-10 left-10 w-24 h-24 bg-pink-300/20 rounded-full blur-2xl"></div>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full mb-4">
              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              <span className="text-purple-600 font-semibold text-sm uppercase tracking-wide">About Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Who We Are</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
              SparkleCart is your one-stop destination for all your shopping needs. We bring you the best products at unbeatable prices with fast delivery and excellent customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">

            <div className="group bg-white rounded-2xl p-8 text-center border-2 border-slate-200 shadow-[6px_6px_0px_0px_#E2E8F0] hover:shadow-[10px_10px_0px_0px_#CBD5E1] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
              <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-[3px_3px_0px_0px_#1E293B]">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Quality Products</h3>
              <p className="text-slate-600">Curated selection of high-quality items</p>
            </div>

            <div className="group bg-white rounded-2xl p-8 text-center border-2 border-slate-200 shadow-[6px_6px_0px_0px_#E2E8F0] hover:shadow-[10px_10px_0px_0px_#CBD5E1] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
              <div className="w-20 h-20 bg-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-[3px_3px_0px_0px_#1E293B]">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Fast Delivery</h3>
              <p className="text-slate-600">Quick shipping to your doorstep</p>
            </div>

            <div className="group bg-white rounded-2xl p-8 text-center border-2 border-slate-200 shadow-[6px_6px_0px_0px_#E2E8F0] hover:shadow-[10px_10px_0px_0px_#CBD5E1] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
              <div className="w-20 h-20 bg-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-[3px_3px_0px_0px_#1E293B]">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Best Prices</h3>
              <p className="text-slate-600">Affordable prices guaranteed</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-purple-50/30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full mb-4">
                <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                <span className="text-yellow-700 font-semibold text-sm uppercase tracking-wide">🔥 Best Sellers</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Most Popular Products</h2>
              <p className="text-slate-600 text-lg">Join thousands of happy customers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-white rounded-2xl overflow-hidden border-2 border-slate-200 shadow-[8px_8px_0px_0px_#E2E8F0] hover:shadow-[12px_12px_0px_0px_#CBD5E1] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
                <div className="h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <img src={head} alt="Headphones" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-slate-800 text-xs font-bold px-3 py-1 rounded-full border border-slate-800 shadow-[2px_2px_0px_0px_#1E293B]">Best Seller</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Headphones BEATS</h3>
                  <p className="text-slate-600 mb-4 text-sm">High-quality Sound with isolation from the world</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-600">$49.99</span>
                    <button className="bg-slate-800 hover:bg-purple-600 text-white px-5 py-2 rounded-full border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1E293B] hover:shadow-[4px_4px_0px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm">Shop Now</button>
                  </div>
                </div>
              </div>

              <div className="group bg-white rounded-2xl overflow-hidden border-2 border-slate-200 shadow-[8px_8px_0px_0px_#E2E8F0] hover:shadow-[12px_12px_0px_0px_#CBD5E1] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
                <div className="h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <img src={iphone} alt="iPhone" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-slate-800 text-xs font-bold px-3 py-1 rounded-full border border-slate-800 shadow-[2px_2px_0px_0px_#1E293B]">Best Seller</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">iPhone 15 Pro</h3>
                  <p className="text-slate-600 mb-4 text-sm">Latest technology at your fingertips</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-600">$89.99</span>
                    <button className="bg-slate-800 hover:bg-purple-600 text-white px-5 py-2 rounded-full border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1E293B] hover:shadow-[4px_4px_0px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm">Shop Now</button>
                  </div>
                </div>
              </div>

              <div className="group bg-white rounded-2xl overflow-hidden border-2 border-slate-200 shadow-[8px_8px_0px_0px_#E2E8F0] hover:shadow-[12px_12px_0px_0px_#CBD5E1] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
                <div className="h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  <img src={laptop} alt="Laptop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-yellow-400 text-slate-800 text-xs font-bold px-3 py-1 rounded-full border border-slate-800 shadow-[2px_2px_0px_0px_#1E293B]">Best Seller</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">ASUS 4060 RTX</h3>
                  <p className="text-slate-600 mb-4 text-sm">Powerful performance for Gaming and Editing</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-purple-600">$59.99</span>
                    <button className="bg-slate-800 hover:bg-purple-600 text-white px-5 py-2 rounded-full border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1E293B] hover:shadow-[4px_4px_0px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm">Shop Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full mb-4">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>

              <span className="text-pink-600 font-semibold text-sm uppercase tracking-wide">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Happy Clients</h2>
            <p className="text-slate-600 text-lg">What our customers say about us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-[6px_6px_0px_0px_#E2E8F0] hover:shadow-[8px_8px_0px_0px_#CBD5E1] transition-all duration-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-[3px_3px_0px_0px_#1E293B]">I</div>
                <div>
                  <h3 className="font-bold text-slate-800">Ibrahim</h3>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">"Amazing products and excellent service! Highly recommended!"</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-[6px_6px_0px_0px_#E2E8F0] hover:shadow-[8px_8px_0px_0px_#CBD5E1] transition-all duration-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-[3px_3px_0px_0px_#1E293B]">M</div>
                <div>
                  <h3 className="font-bold text-slate-800">Mohammed</h3>
                  <div className="flex gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">"Fast delivery and great quality. Will shop again!"</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border-2 border-slate-200 shadow-[6px_6px_0px_0px_#E2E8F0] hover:shadow-[8px_8px_0px_0px_#CBD5E1] transition-all duration-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-[3px_3px_0px_0px_#1E293B]">T</div>
                <div>
                  <h3 className="font-bold text-slate-800">Tamer</h3>
                  <div className="flex gap-1 mt-1">
                    {[...Array(4)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                    <svg className="w-4 h-4 text-gray-300" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">"Good products but delivery took a bit longer than expected."</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}