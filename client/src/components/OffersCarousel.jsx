import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useAllOffers } from '../utils/Api/OfferEndPoint';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const OffersCarousel = () => {
  const { data: apiResponse, isLoading, error } = useAllOffers();
  
  // Safely extract offers from different possible response structures
  const offers = Array.isArray(apiResponse) 
    ? apiResponse 
    : apiResponse?.data || apiResponse?.offers || [];

  if (isLoading) return (
    <div className="h-[388px] flex items-center justify-center">
      <div className="animate-pulse bg-gray-200 rounded-3xl w-full h-full"></div>
    </div>
  );

  if (error) return (
    <div className="h-[388px] flex items-center justify-center text-red-500">
      خطأ في تحميل العروض
    </div>
  );

  if (offers.length === 0) return (
    <div className="h-[388px] flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-inner p-6 text-center">
      <div className="w-32 h-32 mb-6 relative">
        <svg className="w-full h-full text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-medium text-gray-600 mb-2">لا توجد عروض متاحة حالياً</h3>
      <p className="text-gray-500 mb-6 max-w-md">سنقوم بإضافة عروض جديدة قريباً، تابعنا للحصول على أفضل الصفقات</p>
      <button 
        onClick={() => window.location.reload()} 
        className="px-6 py-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full transition-colors flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        تحديث الصفحة
      </button>
    </div>
  );

  return (
    <div className="relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          nextEl: ".offer-swiper-button-next",
          prevEl: ".offer-swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet bg-white opacity-50',
          bulletActiveClass: 'swiper-pagination-bullet-active !opacity-100'
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        className="rounded-3xl shadow-xl overflow-hidden h-[175px] md:h-[300px] lg:h-[388px]"
      >
        {offers.map((offer) => (
          <SwiperSlide key={offer._id}>
            <div className="relative h-full w-full">
              <img 
                src={offer.image} 
                alt={offer.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "/default-offer-image.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2">{offer.title}</h3>
                  {offer.description && (
                    <p className="text-sm md:text-base line-clamp-2">{offer.description}</p>
                  )}
                  <div className="flex items-center mt-2">
                    <span className={`text-xs px-2 py-1 rounded-md ${
                      offer.isActive ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {offer.isActive ? 'عرض نشط' : 'عرض منتهي'}
                    </span>
                    {offer.endDate && (
                      <span className="text-xs mr-2 text-gray-300">
                        ينتهي في: {new Date(offer.endDate).toLocaleDateString('ar-EG')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="offer-swiper-button-next absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100">
        <FaChevronRight className="w-5 h-5" />
      </button>
      <button className="offer-swiper-button-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100">
        <FaChevronLeft className="w-5 h-5" />
      </button>
    </div>
  );
};

export default OffersCarousel;