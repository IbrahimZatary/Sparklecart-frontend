import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";
import HeroSection from "../Components/Home/HeroSection";

import AboutUS from "../Components/Home/AboutUs"


import BestSellerCard from "../Components/Home/BestSellerCard";

import TestimonialCard from "../Components/Home/TestimonialCard";
import head from "../assets/head.png";
import iphone from "../assets/iphone.png";
import laptop from "../assets/laptop.png";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-white">
        <HeroSection />

        {/* About Us Section */}
        <AboutUS/>

        {/* Best Sellers Section */}
        <div className="bg-gray-100 py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-purple-50/30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full mb-4">
                <span className="text-yellow-700 font-semibold text-sm uppercase tracking-wide">Best Sellers</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Most Popular Products</h2>
              <p className="text-slate-600 text-lg">Join thousands of happy customers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <BestSellerCard image={head} title="Headphones BEATS" description="High-quality Sound with isolation from the world" price="$49.99" />
              <BestSellerCard image={iphone} title="iPhone 15 Pro" description="Latest technology at your fingertips" price="$89.99" />
              <BestSellerCard image={laptop} title="ASUS 4060 RTX" description="Powerful performance for Gaming and Editing" price="$59.99" />
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-pink-100 px-4 py-2 rounded-full mb-4">
              <span className="text-pink-600 font-semibold text-sm uppercase tracking-wide">Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Our Happy Clients</h2>
            <p className="text-slate-600 text-lg">What our customers say about us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard name="Ibrahim" initial="I" rating={5} text="Amazing products and excellent service! Highly recommended!" />
            <TestimonialCard name="Mohammed" initial="M" rating={5} text="Fast delivery and great quality. Will shop again!" />
            <TestimonialCard name="Tamer" initial="T" rating={4} text="Good products but delivery took a bit longer than expected." />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
};