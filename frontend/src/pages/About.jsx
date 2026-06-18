import { assets } from "../assets/assets"
import NewsLetterBox from "../components/NewsLetterBox"
import Title from "../components/Title"

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col lg:flex-row gap-16">
        <img className="w-full md:max-w-180" src={assets.about_img} alt="About Image" />
        <div className="flex flex-col justify-center gap-6 lg:w-2/4 text-(--footer-text)">
          <p>Wearix is built on the idea that fashion should be accessible, expressive, and effortlessly stylish. We bring together the latest trends and timeless essentials to create collections that fit seamlessly into your everyday life. Every piece is carefully selected to balance comfort, quality, and modern design. Our goal is to make sure you look good and feel confident, no matter the occasion.</p>
          <p>At Wearix, we believe style is a reflection of individuality. That’s why we focus on offering versatile pieces that let you create your own unique look without compromising on affordability. From casual wear to statement outfits, our collections are designed to keep up with your lifestyle. We’re more than just a brand—we’re a part of your journey to discovering your personal style.</p>
          <b className="text-(--news-color)">Our Mission</b>
          <p>Our mission is to make fashion accessible, stylish, and affordable for everyone.
            We aim to deliver quality-driven collections that blend comfort with the latest trends.
            At Wearix, we strive to inspire confidence and individuality through every outfit.</p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"}/>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-8 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance : </b>
          <p className="text-(--footer-text)">We ensure every product meets high standards of durability, comfort, and design. Each piece is carefully selected to deliver consistent quality you can trust.</p>
        </div>
        <div className="border px-10 md:px-8 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience : </b>
          <p className="text-(--footer-text)">Enjoy a seamless shopping experience with an easy-to-use platform and smooth navigation. From browsing to checkout, everything is designed to save you time and effort.</p>
        </div>
        <div className="border px-10 md:px-8 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service : </b>
          <p className="text-(--footer-text)">Our support team is always ready to assist you with quick and reliable solutions. We prioritize your satisfaction to make every shopping experience hassle-free.</p>
        </div>
      </div>

      <NewsLetterBox/>

    </div>
  )
}

export default About