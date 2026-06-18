import { assets } from "../assets/assets"

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-(--text3-color)">
        {/* Hero Left */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
            <div className="--text3-color">
                <div className="flex items-center gap-2">
                    <p className="w-8 md:w-11 h-0.5 bg-(--text3-color)"></p>
                    <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
                </div>
                <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed ">Latest Arrivals</h1>
                <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
                    <p className="w-8 md:w-11 h-px bg-(--text3-color)"></p>
                </div>
            </div>
        </div>
        {/* Hero Right */}
        <img className="w-full sm:w-1/2 " src={assets.hero_img} alt="Hero Image" />
    </div>
  )
}

export default Hero