import { assets } from "../assets/assets"
import NewsLetterBox from "../components/NewsLetterBox"
import Title from "../components/Title"

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img className="w-full md:max-w-120" src={assets.contact_img} alt="Contact Image" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-(--footer-text)">Our Store</p>
          <p className="text-(--text1-color)">Building 4A, Mindspace IT Park <br />Goregaon East <br/>
            Mumbai, Maharashtra 400063 <br/>
            INDIA</p>
          <p className="text-(--text1-color)">Tel : +91 9058931071 <br />Email : admin@wearix.com</p>
          <p className="font-semibold text-xl text-(--footer-text)">Careers at Wearix</p>
          <p className="text-(--text1-color)">Learn more about our teams and job openings</p>
          <button className="border px-8 py-4 text-sm hover:bg-black hover:text-white cursor-pointer transition-all duration-500">Explore Jobs</button>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default Contact