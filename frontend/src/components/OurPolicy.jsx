import {assets} from "../assets/assets"
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import { LuHeadset } from "react-icons/lu";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const OurPolicy = () => {
    const{theme}=useContext(ShopContext)

  return (
    <div className={`flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-2 text-xs sm:text-sm md:text-base ${theme==="light"?"text-gray-700":"text-white"}`}>
        <div>
            <RiExchangeFundsLine className="w-12 h-12 m-auto mb-5" alt="Exchange Icon" />
            <p className="font-semibold">Easy Exchange Policy</p>
            <p className="--text3-color">We offer hassle free exchange policy</p>
        </div>
        <div>
            <TbTruckReturn className="w-12 h-12 m-auto mb-5" alt="Exchange Icon" />
            <p className="font-semibold">7 Days Return Policy</p>
            <p className="--text3-color">We provide 7 days free return policy</p>
        </div>
        <div>
            <LuHeadset className="w-12 h-12 m-auto mb-5" alt="Exchange Icon" />
            <p className="font-semibold">Best Customer Support</p>
            <p className="--text3-color">We provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default OurPolicy