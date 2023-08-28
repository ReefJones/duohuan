"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../hook/useSelector.hook";
import { useTxt2img } from "../hook/useTxt2img.hook";
import { useImg2img } from "../hook/useImg2img.hook";
import { useRembg } from "../hook/useRembg.hook";
import { useExtrasSingleImage } from "../hook/useExtrasSingleImage.hook"
import { setSettings as setImg2imgSettings } from "../redux/Features/Img2imgState/Img2imgSlice";
import { setSettings as setRembgSettings } from "../redux/Features/rembg/rembgSlice";
import { setSettings as setExtrasSingleImageSettings } from "../redux/Features/ExtrasSingleImage/ExtrasSingleImageslice";
import { FaceSmileIcon, HeartIcon, ClipboardIcon, UserIcon, UsersIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import MenuButtonList from "../component/MenuButtonList";
import FloatCard from "../component/FloatCard";
import MessageSwiper from "../component/MessageSwiper";
import styles from "../styles/LightEdge.module.css"
import Link from "next/link";
import Image from 'next/image';

const product = {
  cards: [
    {
      title: "Trending Design",
      details: "Exploring the latest design trends and innovative approaches in the industry."
    },
    {
      title: "Smart Applications",
      details: "Discovering intelligent applications that leverage cutting-edge technologies and enhance user experiences."
    },
    {
      title: "Frontier science and technology",
      details: "Exploring cutting-edge AI advancements that reshape industries"
    }
  ]
}

export default function Cloakroom() {
  const [menuTxt, setMenuTxt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBuyBtnShow, setIsBuyBtnShow] = useState(false);
  const [BgConfig, setBgConfig] = useState<string>("");
  // const settings = useSelector((state) => state.img2img.settings);
  // const setSettings = setImg2imgSettings;
  const settings = useSelector((state) => state.extrasSingleImage.settings);
  const setSettings = setExtrasSingleImageSettings;
  const rembg_settings = useSelector((state) => state.rembg.settings);
  const rembg_setSettings = setRembgSettings;
  const dispatch = useDispatch();

  const {
    images: txt2imgBackImages,
    loading: txt2imgBackLoading,
    txt2img
  } = useTxt2img({
    url: process.env.NEXT_PUBLIC_Url? process.env.NEXT_PUBLIC_Url : "",
    port: "",
  });

  // const {
  //   images: img2imgBackImages,
  //   loading: img2imgBackLoading,
  //   img2img,
  // } = useImg2img({
  //   url: process.env.NEXT_PUBLIC_Url? process.env.NEXT_PUBLIC_Url : "",
  //   port: "",
  // });

  const {
    images: ExtrasBackImages,
    loading: ExtrasBackLoading,
    ExtrasSingleImage
  } = useExtrasSingleImage({
    url: process.env.NEXT_PUBLIC_Url? process.env.NEXT_PUBLIC_Url : "",
    port: "",
  });

  const {
    images: rembgBackImages,
    loading: rembgBackLoading,
    rembg
  } = useRembg({
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
    txt2img();
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, [])

  //监听SD文转图接口返回
  useEffect(() => {
    if (txt2imgBackImages.length > 0) {
      dispatch(
        setSettings(
          { ...settings, 
            image: txt2imgBackImages[0],
          })
      );
    }
  }, [txt2imgBackImages]);

  //监听图片传入成功后调用放大图片接口
  useEffect(() => {
    if (settings.image.length > 0 && settings.image[0] !== "") {
      ExtrasSingleImage();
    }
  }, [settings]);

  //监听SD放大图片接口返回
  useEffect(() => {
    if (ExtrasBackImages.length > 0) {
      dispatch(
        rembg_setSettings(
          { ...rembg_settings, 
            input_image: ExtrasBackImages,
          })
      );
    }
  }, [ExtrasBackImages]);

  //监听图片传入成功后调用去除背景
  useEffect(() => {
    if (rembg_settings.input_image.length > 0 && rembg_settings.input_image[0] !== "") {
      rembg();
    }
  }, [rembg_settings]);

  //监听rembg插件接口返回
  useEffect(() => {
    if (rembgBackImages) {
      setBgConfig(`data:image/png;base64,${rembgBackImages}`);
      setIsBuyBtnShow(true);
    }
  }, [rembgBackImages]);

      //监听图片传入成功后调用图生图
  // useEffect(() => {
  //   if (settings.init_images.length > 0 && settings.init_images[0] !== "") {
  //     img2img();
  //   }
  // }, [settings]);

  // //监听SD图生图接口返回
  // useEffect(() => {
  //   if (generatedImages2.length > 0) {
  //     dispatch(
  //       rembg_setSettings(
  //         { ...rembg_settings, 
  //           input_image: generatedImages2[0],
  //         })
  //     );
  //   }
  // }, [generatedImages2]);

      //监听图片传入成功后调用图生图
  // useEffect(() => {
  //   if (settings.init_images.length > 0 && settings.init_images[0] !== "") {
  //     img2img();
  //   }
  // }, [settings]);

  // //监听SD图生图接口返回
  // useEffect(() => {
  //   if (generatedImages2.length > 0) {
  //     dispatch(
  //       rembg_setSettings(
  //         { ...rembg_settings, 
  //           input_image: generatedImages2[0],
  //         })
  //     );
  //   }
  // }, [generatedImages2]);

  return (
    <> 
      <div className={`${styles.loaderBg} ${isLoading?"":"opacity-0"}`}>
        <div className={`${styles.svgLoader}`}>
          <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45"></circle>
          </svg>
        </div>
      </div>
      {(txt2imgBackLoading || ExtrasBackLoading || rembgBackLoading) && (
        <div className={`${styles.loaderBg} ${styles.bgMask}`}>
          <div className={`${styles.svgLoader}`}>
            <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45"></circle>
            </svg>
          </div>
        </div>
      )}
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
            <FloatCard>
              <Link href={"/Gallery"} >
                <UserIcon
                  className="pointer-events-none w-12 h-12"
                  aria-hidden="true"
                />
              </Link>
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
            <FloatCard>
              <Link href={"/product/1"} >
                <ShoppingCartIcon
                  className="pointer-events-none w-12 h-12"
                  aria-hidden="true"
                />
              </Link>
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
            <Image
              src="/video-bg.jpg"
              alt="video"
              style={{width: `100%`}}
              width={1920}
              height={666}
              priority
            />
            <div className="relative py-16">
              <div className="flex justify-center items-center">
                <div className={`text-left w-3/5 py-2 pl-2 pr-8 ${menuTxt==="volume"?styles.slideInLeft:""}`}>
                  <h3 className={`${styles.glassCardTitle}`}>Stats & Features</h3>
                  <p className={`${styles.glassCardDetail}`}>This is Photoshop version  of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum, nec sagittis sem nibh id elit.</p>
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
                  <Image
                    src="/contact-product.png"
                    alt="video"
                    style={{width: `100%`}}
                    width={364}
                    height={530}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className={`absolute bottom-1/4 right-0 w-full h-28 mt-5 flex justify-center items-center overflow-hidden duration-1000 ${isBuyBtnShow?"":"opacity-0 invisible"}`}>
          <Link href={"/product/1"} className={`relative px-8 py-6 text-3xl overflow-hidden ${styles.LightEdgeBtn_w}`} >
            Buy Now
          </Link>
        </div>  */}
        <div className={`absolute inset-x-0 inset-y-0 ${styles.bgMask} ${menuTxt===""?styles.modaleHidden:""}`} onClick={bgMaskClick}></div>
      </div>
    </>
  );
}

