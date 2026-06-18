import { useContext, useEffect, useMemo, useRef } from "react"
import { ShopContext } from "../context/ShopContext"
import Title from "./Title"
import ProductItem from "./ProductItem"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const BestSeller = () => {
    const { products } = useContext(ShopContext)
    const swiperRef = useRef(null);

    const bestSeller = useMemo(() => {
        const bestProduct = products.filter((product) => (product.bestseller))
        return [...bestProduct].sort(() => Math.random() - 0.5);
    }, [products])

    return (
        <div className="my-10">
            <div className="text-center text-3xl py-8">
                <Title text1={"BEST"} text2={"SELLERS"} />
                <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base --footer-text">Our best sellers—customer favorites loved for their quality, style, and unbeatable value.</p>
            </div>
            <div className="flex gap-3 items-center">
                <button
                    onClick={() => swiperRef.current.slidePrev()}
                    className="hidden sm:block w-50 h-8 rounded-full border hover:bg-black hover:text-white transition"
                >
                    ←
                </button>
                <Swiper
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    modules={[Autoplay, Navigation]}
                    autoplay={{ delay: 5000 }}
                    spaceBetween={20}
                    loop={true}
                    grabCursor={true}
                    breakpoints={{
                        320: { slidesPerView: 2 },
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                    }}
                >

                    {bestSeller.map((item) => (
                        <SwiperSlide key={item._id}>
                            <ProductItem
                                id={item._id}
                                name={item.name}
                                image={item.image}
                                price={item.price}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <button
                    onClick={() => swiperRef.current.slideNext()}
                    className="hidden sm:block w-50 h-8 rounded-full border hover:bg-black hover:text-white transition"
                >
                    →
                </button>
            </div>
        </div>
    )
}

export default BestSeller