import { useNavigate } from 'react-router-dom';

export default function BestSellerCard({ image, title, description, price }) {
  const navigate = useNavigate();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border-2 border-slate-200 shadow-[8px_8px_0px_0px_#E2E8F0] hover:shadow-[12px_12px_0px_0px_#CBD5E1] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200">
      <div className="h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 right-4 bg-yellow-400 text-slate-800 text-xs font-bold px-3 py-1 rounded-full border border-slate-800 shadow-[2px_2px_0px_0px_#1E293B]">
          Best Seller
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 mb-4 text-sm">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-purple-600">{price}</span>
          <button 
            onClick={() => navigate('/products')}
            className="bg-slate-800 hover:bg-purple-600 text-white px-5 py-2 rounded-full border-2 border-slate-800 shadow-[2px_2px_0px_0px_#1E293B] hover:shadow-[4px_4px_0px_0px_#1E293B] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 font-medium text-sm"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}