import React from "react";
import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";
import ScrollRevealAnimation from "../Animation/ScrollRevealAnimation";
const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex items-center justify-between gap-[50px] lg:gap-[130px] xl:gap-[0px] flex-col lg:flex-row">
          {/* About img */}
          {/* About img wrapped with ScrollRevealAnimation */}
          <ScrollRevealAnimation targetClass="about-img">
            <div className="about-img relative w-3/4 lg:w-1/2 xl-w[770px] z-10 order:2 lg:order-1">
              <img src={aboutImg} alt="" />
              <div className="about-img absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[-2%]">
                <img src={aboutCardImg} alt="" />
              </div>
            </div>
          </ScrollRevealAnimation>
          {/* Rest of your component code */}
          {/* About Content */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">Proud to be one of the Best</h2>
            <p className="text__para">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              asperiores rerum sequi et itaque porro, quam nisi ex praesentium
              quasi, minima, nemo alias! Necessitatibus iure illo vitae, ullam
              quasi ratione.
            </p>
            <p className="text__para mt-30px">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
              perferendis assumenda laudantium labore animi accusantium dolorem
              dolor atque, totam reiciendis in esse! Dignissimos, pariatur
              omnis.
            </p>
            <Link to="/">
              <button className="btn">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
