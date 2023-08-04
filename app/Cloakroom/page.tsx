"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../hook/useSelector.hook";
import { useOptions } from "../hook/useOptions.hook";
import { useTxt2img } from "../hook/useTxt2img.hook";
import { useProgress } from "../hook/useProgress.hook";
import { setSettings as setTxt2imgSettings } from "../redux/Features/Txt2imgState/Txt2imgSlice";
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
  const [sdModel, setSdModel] = useState("Realistic_Vision_V2.0-inpainting");
  const [prompt, setPrompt] = useState("1girl,cute");
  const [negative_prompt, setNegativePrompt] = useState("");
  const [samplingMethod, setSamplingMethod] = useState<string>("Euler a");
  const [steps, setSteps] = useState<number>(20);
  const [restoreFase, setRestoreFase] = useState<boolean>(false);
  const [tiling, setTiling] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(1024);
  const [width, setWidth] = useState<number>(512);
  const [batchCount, setBatchCount] = useState<number>(1);
  const [batchSize, setBatchSize] = useState<number>(1);
  const [seeds, setSeeds] = useState<number>(-1);
  const [BgConfig, setBgConfig] = useState<string>('/bg_girl.png');
  const [result, setResult] = useState<any>(null);
  const [progressNum, setProgressNum] = useState<number>(0);
  const [leftPercentage, setLeftPercentage] = useState<number>(-100);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const settings = useSelector((state) => state.txt2img.settings);
  const setSettings = setTxt2imgSettings;
  const dispatch = useDispatch();

  const {
    result: result2,
    loading: loading2,
    setOptions,
  } = useOptions({
    url: process.env.NEXT_PUBLIC_Url? process.env.NEXT_PUBLIC_Url : "",
    port: "",
  });

  const {
    images: generatedImages,
    loading,
    error,
    txt2img,
  } = useTxt2img({
    url: process.env.NEXT_PUBLIC_Url? process.env.NEXT_PUBLIC_Url : "",
    port: "",
  });

  const { query, result: result4 } = useProgress({
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
    const id = setInterval(() => {
      query();
    }, 1000);
    setIntervalId(id);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [])

  // 初始化SD参数
  useEffect(() => {
    setOptions({
      sd_model_checkpoint: sdModel,
    });
    dispatch(
      setSettings(
        { ...settings, 
          prompt: prompt,
          negative_prompt: negative_prompt,
          sampler_index: samplingMethod,
          steps: steps,
          restore_faces: restoreFase,
          tiling: tiling,
          height: height,
          width: width,
          n_iter: batchCount,
          batch_size: batchSize,
          seed: seeds,
        })
    );
  }, []);

  //监听SD文转图接口返回
  useEffect(() => {
    if (generatedImages.length > 0) {
      setBgConfig(`data:image/png;base64,${generatedImages[0]}`);
      setProgressNum(0);
      setLeftPercentage(-100);
      clearInterval(intervalId!);
    }
  }, [generatedImages]);

  useEffect(() => {
    if (result4) {
      setResult(result4);
    }
  }, [result4]);

  //监听SD进度接口返回
  useEffect(() => {
    if (result) {
      setProgressNum(result.progress.toFixed(2) * 100);
      setLeftPercentage((1-result.progress) * (-100));
    }
  }, [result]);
  
  return (
    <> 
      <div className={`${styles.loaderBg} ${isLoading?"":"opacity-0"}`}>
        <div className={`${styles.svgLoader}`}>
          <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45"></circle>
          </svg>
        </div>
      </div>
      {loading && (
        <div className={`${styles.loaderBg} ${styles.bgMask}`}>
          <div className={`${styles.svgLoader}`}>
            <div className="w-4/5 h-6 relative overflow-hidden mx-auto mt-2" style={{background:"#151515"}}>
              <div className="w-full h-6 absolute overflow-hidden mx-auto bg-slate-50" style={{left:`${leftPercentage}%`}}></div>
              <div className="w-auto h-6 leading-6 absolute overflow-hidden mx-auto right-3 text-white text-sm">
                {progressNum}%
              </div>
            </div>
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
