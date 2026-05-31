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
      <div className="bg-white min-h-screen">
        
        {/* Photo Section */}
<div className="relative h-125 overflow-hidden">
  <img 
    src={boxAlone} 
    alt="Box Alone"
    className="w-full object-cover"
  />
  <div className="absolute inset-0 bg-black/40 flex items-center justify-start">
    <div className="text-left text-white ml-12 md:ml-20 min">
      <style>
        {`
          @keyframes text3-animation {
            0%, 10%, 100% {
              width: 0;
            }
            10%, 20%, 30%, 40%, 50%, 60%, 70%, 80%, 90%, 100% {
              border-right-color: transparent;
            }
            11%, 21%, 31%, 41%, 51%, 61%, 71%, 81%, 91% {
              border-right-color: #956afa;
            }
            60%, 80% {
              width: 100%;
            }
          }
          
          .animated-title {
            color: transparent;
            font-size: 48px;
            font-weight: bold;
            position: relative;
            overflow: hidden;
            display: inline-block;
          }
          
          .animated-title span {
            position: relative;
            display: inline-block;
            white-space: nowrap;
          }
          
          .animated-title span::before {
            content: "Welcome to SparkleCart";
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            border-right: 3px solid #956afa;
            overflow: hidden;
            color: white;
            animation: text3-animation 4s linear infinite;
          }
        `}
      </style>
      <div className="animated-title mb-4">
        <span>Welcome to SparkleCart </span>
      </div>
      <p className="text-xl">Discover amazing products at sparkling prices</p>
    </div>
  </div>
</div>
        {/* Content Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              SparkleCart is your one-stop destination for all your shopping needs. 
              We bring you the best products at unbeatable prices with fast delivery 
              and excellent customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Products</h3>
              <p className="text-gray-600">Curated selection of high-quality items</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick shipping to your doorstep</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Best Prices</h3>
              <p className="text-gray-600">Affordable prices guaranteed</p>
            </div>
          </div>
        </div>

        {/*  Three Sellers  */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Best Sellers</h2>
              <p className="text-gray-600">Our most popular products this month</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img 
                    src={head} 
                    alt="head Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">headphones BEATS</h3>
                  <p className="text-gray-600 mb-4">High-quality Sound with isoloation from the world</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-black">$49.99</span>
                    <button className="bg-black hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img 
                    src={iphone} 
                    alt="iPhone"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">IPhone 15 Pro</h3>
                  <p className="text-gray-600 mb-4">Latest technology at your fingertips</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-black">$89.99</span>
                    <button className="bg-black hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img 
                    src={laptop} 
                    alt="Laptop"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">ASUX 4060 RTX </h3>
                  <p className="text-gray-600 mb-4">Powerful performance for Gaming and Editing</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-black">$59.99</span>
                    <button className="bg-black hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Clients Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Happy Clients</h2>
            <p className="text-gray-600">What our customers say about us</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Ibrahim</h3>
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-sm">
                "Amazing products and excellent service! Highly recommended!"
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Mohammed</h3>
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-sm">
                "Fast delivery and great quality. Will shop again!"
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Tamer</h3>
              <div className="flex justify-center mb-3">
                {[...Array(4)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <p className="text-gray-600 text-sm">
                "Good products but delivery took a bit longer than expected."
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}