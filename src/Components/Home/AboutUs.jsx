import FeatureCard from "./FeatureCard "
const AboutUs = () => {
  return (
    <>
      
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
            <FeatureCard icon="quality" title="Quality Products" description="Curated selection of high-quality items" bgColor="bg-purple-600" />
            <FeatureCard icon="delivery" title="Fast Delivery" description="Quick shipping to your doorstep" bgColor="bg-pink-500" />
            <FeatureCard icon="price" title="Best Prices" description="Affordable prices guaranteed" bgColor="bg-yellow-500" />
          </div>
        </div>


    </>
  )
}

export default AboutUs
