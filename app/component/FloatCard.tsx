import React, { useState,useEffect } from "react";
import styles from "../styles/LightEdge.module.css"
import Link from "next/link";
import { FloatCardProps } from "../Types/FloatCard";

export default function FloatCard({cardType, haveLayout, noBorder, handleClick, children}: FloatCardProps) {
  const [cardTypeCss, setCardTypeCss] = useState<string>(styles.FloatCard);
  const [customBorderCss, setCustomBorderCss] = useState<string>("");
  
  const onButtonClick = (event : any) =>{
    if(handleClick){
      handleClick(event);
    }
  }

  useEffect(() => {
    if (cardType === 'text') {
      setCardTypeCss(styles.TxtCard);
    }
    if (noBorder) {
      setCustomBorderCss(styles.noBorder);
    }
  }, []);

  return (
    <div className={`relative w-full h-full ${cardType === 'text'? styles.FloatCardBackLight : ""}`} onClick={onButtonClick}>
      <div className={`relative w-full h-full p-4 text-white ${cardTypeCss +" "+ customBorderCss}`}>
        {children}
      </div>
      {haveLayout && (
        <div className={`absolute w-max text-white ${styles.layoutBox}`}>{haveLayout}</div>
      )}
    </div>
  );
}
