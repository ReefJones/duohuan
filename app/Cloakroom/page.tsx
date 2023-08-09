"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../hook/useSelector.hook";
import { useTxt2img } from "../hook/useTxt2img.hook";
import { useImg2img } from "../hook/useImg2img.hook";
import { setSettings as setImg2imgSettings } from "../redux/Features/Img2imgState/Img2imgSlice";
import { FaceSmileIcon, HeartIcon, ClipboardIcon, UserIcon, UsersIcon } from '@heroicons/react/24/outline'
import MenuButtonList from "../component/MenuButtonList";
import FloatCard from "../component/FloatCard";
import MessageSwiper from "../component/MessageSwiper";
import styles from "../styles/LightEdge.module.css"
import Link from "next/link";


const product = {
  cards:[
    {
      title: "Trending Design",
      details: "Lorem ipsum dolor amet, consectetur adipiscing elit augue diam, accumsan  ipsum dolor sit amet, consectetur adipiscing."
    },
    {
      title: "Smart Applications",
      details: "Lorem ipsum dolor amet, consectetur adipiscing elit augue diam, accumsan  ipsum dolor sit amet, consectetur adipiscing."
    },
    {
      title: "Easy Installation",
      details: "Lorem ipsum dolor amet, consectetur adipiscing elit augue diam, accumsan  ipsum dolor sit amet, consectetur adipiscing."
    },
  ]
}

export default function Cloakroom() {
  const [menuTxt, setMenuTxt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [BgConfig, setBgConfig] = useState<string>('/bg_girl.png');
  const settings = useSelector((state) => state.img2img.settings);
  const setSettings = setImg2imgSettings;
  const dispatch = useDispatch();

  const {
    images: generatedImages,
    txt2img,
  } = useTxt2img({
    url: process.env.NEXT_PUBLIC_Url? process.env.NEXT_PUBLIC_Url : "",
    port: "",
  });

  const {
    images: generatedImages2,
    img2img,
  } = useImg2img({
    url: process.env.NEXT_PUBLIC_Url? process.env.NEXT_PUBLIC_Url : "",
    port: "",
  });
  
  const handleMenuClick = (itemTxt:any) => {
    setMenuTxt(itemTxt);
  };

  const bgMaskClick = () => {
    setMenuTxt("");
  };

  const handleTxt2imgClick = () => {
    setIsLoading(true);
    txt2img();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [])

  //监听SD文转图接口返回
  useEffect(() => {
    if (generatedImages.length > 0) {
      dispatch(
        setSettings(
          { ...settings, 
            init_images: generatedImages,
          })
      );
    }
  }, [generatedImages]);

  //监听图片传入成功后调用图生图
  useEffect(() => {
    if (settings.init_images.length > 0 && settings.init_images[0] !== "") {
      img2img();
    }
  }, [settings]);

  //监听SD文转图接口返回
  useEffect(() => {
    if (generatedImages2.length > 0) {
      setBgConfig(`data:image/png;base64,${generatedImages2[0]}`);
      setIsLoading(false);
    }
  }, [generatedImages2]);

  return (
    <> 
      <div className={`${styles.loaderBg} ${isLoading?"":"opacity-0"}`}>
        <div className={`${styles.svgLoader}`}>
          <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45"></circle>
          </svg>
        </div>
      </div>
      <div className={`bg-cover bg-no-repeat duration-500 ${styles.bgContainer} ${isLoading?"opacity-0":""}`} style={{backgroundImage: `url(${BgConfig})`}}>
        <div>
          <div className={`fixed w-20 h-20 ${isLoading?"":styles.slideInLeft}`}>
            <FloatCard handleClick={handleTxt2imgClick}>
              <UsersIcon
                className="pointer-events-none w-12 h-12"
                aria-hidden="true"
              />
            </FloatCard>
          </div>
          <div className={`fixed w-20 h-20 ${isLoading?"":styles.slideInLeft}`}>
            <FloatCard haveLayout="odel wearing plain">
              <UserIcon
                className="pointer-events-none w-12 h-12"
                aria-hidden="true"
              />
            </FloatCard>
          </div>
          <div className={`fixed w-20 h-20 ${isLoading?"":styles.slideInLeft}`}>
            <FloatCard haveLayout="odel wearing plain">
              <UsersIcon
                className="pointer-events-none w-12 h-12"
                aria-hidden="true"
              />
            </FloatCard>
          </div>
        </div>
        <div>
          <div className={`fixed w-20 h-20 ${isLoading?"":styles.slideInRight}`}>
            <FloatCard haveLayout="odel wearing plain">
              <UserIcon
                className="pointer-events-none w-12 h-12"
                aria-hidden="true"
              />
            </FloatCard>
          </div>
          <div className={`fixed w-20 h-20 ${isLoading?"":styles.slideInRight}`}>
            <FloatCard haveLayout="odel wearing plain">
              <UsersIcon
                className="pointer-events-none w-12 h-12"
                aria-hidden="true"
              />
            </FloatCard>
          </div>
          <div className={`fixed w-20 h-20 ${isLoading?"":styles.slideInRight}`}>
            <FloatCard haveLayout="odel wearing plain">
              <UserIcon
                className="pointer-events-none w-12 h-12"
                aria-hidden="true"
              />
            </FloatCard>
          </div>
        </div>
        {/* <div className="fixed inset-x-0 bottom-48 z-10">
          <MenuButtonList handleClick={handleMenuClick}></MenuButtonList>
        </div> */}
        <div className={`absolute inset-x-0 inset-y-0 rounded-3xl overflow-hidden flex-wrap content-start pt-24 ${styles.modal} ${menuTxt==="detail"?"":styles.modaleHidden}`}>
          {product.cards.map((card, index) => (
            <div key={index} className={`relative flex justify-center items-center ${styles.glassCard}`}>
              <div className={`text-center ${styles.glassCardContent}`}>
                <h2 className={`absolute ${styles.glassCardIndex}`}>{"0" + (index + 1)}</h2>
                <h3 className={`${styles.glassCardTitle}`}>{card.title}</h3>
                <p className={`${styles.glassCardDetail}`}>{card.details}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={`absolute inset-x-0 inset-y-0 rounded-3xl overflow-hidden ${styles.modal} ${menuTxt==="volume"?"":styles.modaleHidden}`}>
          <div className={`relative ${styles.glassModal}`}>
            <img src="/video-bg.jpg" alt="video" width={"100%"}/>
            <div className="relative py-16">
              <div className="flex justify-center items-center">
                <div className={`text-left w-3/5 py-2 pl-2 pr-8 ${menuTxt==="volume"?styles.slideInLeft:""}`}>
                  <h3 className={`${styles.glassCardTitle}`}>Stats & Features</h3>
                  <p className={`${styles.glassCardDetail}`}>This is Photoshop's version  of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.</p>
                </div>
                <div className={`text-center w-2/5 grid grid-cols-3 gap-x-6 ${menuTxt==="volume"?styles.slideInRight:""}`}>
                  <div className={`col-span-1 ${styles.parallaxBox}`}>
                    <HeartIcon className="pointer-events-none w-12 h-12 inline-block" aria-hidden="true"/>
                    <h2 className={`${styles.countNum}`}>4500</h2>
                    <h5 className={`${styles.countTxt}`}>Sold Out</h5>
                  </div>
                  <div className={`col-span-1 ${styles.parallaxBox}`}>
                    <FaceSmileIcon className="pointer-events-none w-12 h-12 inline-block" aria-hidden="true"/>
                    <h2 className={`${styles.countNum}`}>9500</h2>
                    <h5 className={`${styles.countTxt}`}>Satisfied Customers</h5>
                  </div>
                  <div className={`col-span-1 ${styles.parallaxBox}`}>
                    <ClipboardIcon className="pointer-events-none w-12 h-12 inline-block" aria-hidden="true"/>
                    <h2 className={`${styles.countNum}`}>6000</h2>
                    <h5 className={`${styles.countTxt}`}>Main Features</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`absolute inset-x-0 inset-y-0 rounded-3xl overflow-hidden ${styles.modal} ${menuTxt==="message"?"":styles.modaleHidden}`}>
          <div className={`relative ${styles.glassModal}`}>
            <div className="flex justify-center items-center">
              <div className="text-center">
                <span className="block text-3xl font-normal" style={{color:"#FFFFF0"}}>Awesome Reviews</span>
                <h2 className="inline-block font-extralight uppercase text-4xl mt-8 mb-12 text-white">Customers Loves It</h2>
              </div>
            </div>
            <MessageSwiper></MessageSwiper>
          </div>
        </div>
        <div className={`absolute inset-x-0 inset-y-0 rounded-3xl overflow-hidden ${styles.modal} ${menuTxt==="shopping"?"":styles.modaleHidden}`}>
          <div className={`relative ${styles.glassModal}`}>
            <div className="relative py-16">
              <div className="flex justify-center items-center">
                <div className={`text-left w-3/5 py-2 pl-2 pr-8 ${menuTxt==="shopping"?styles.slideInLeft:""}`}>
                  <div className="text-left">
                    <span className="block text-3xl font-normal" style={{color:"#FFFFF0"}}>Pre-book Your Watch</span>
                    <h2 className="inline-block font-extralight uppercase text-4xl mt-8 mb-12 text-white">Buy Our Product</h2>
                  </div>
                  <div className={`${styles.contactForm}`}>
                      <input type="text" name="userName" placeholder="Name" className={`${styles.formControl}`}/>
                      <input type="text" name="userPhone" placeholder="Contact No" className={`${styles.formControl}`}/>
                      <input type="email" name="userEmail" placeholder="Email" className={`${styles.formControl}`}/>
                      <textarea className={`${styles.formControl}`} name="userMessage" rows={6} placeholder="Type Your Message Here"></textarea>
                      <a href="#" className={`${styles.formBtnMedium}`}>Submit Booking Information</a>
                  </div>
                </div>
                <div className={`text-center w-2/5 ${menuTxt==="shopping"?styles.slideInRight:""}`}>
                  <img src="/contact-product.png" alt="video" width={"100%"}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-6 right-6 w-64 h-28 mt-5 flex justify-center items-center overflow-hidden">
          <Link href={"/product/1"} className={`relative px-8 py-6 text-3xl overflow-hidden ${styles.LightEdgeBtn_w}`} >
            Buy Now
          </Link>
        </div> 
        <div className={`absolute inset-x-0 inset-y-0 ${styles.bgMask} ${menuTxt===""?styles.modaleHidden:""}`} onClick={bgMaskClick}></div>
      </div>
    </>
  );
}
