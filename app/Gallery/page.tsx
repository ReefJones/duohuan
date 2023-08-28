"use client";

import React, { useEffect, useState } from "react";
import { useGalleryImages } from "../hook/useGalleryImages.hook"
import GallerySwiper from "../component/GallerySwiper";
import GestureComponent from "../component/GestureComponent";

export default function Gallery() {
  const {
    images,
    getGalleryImages,
  } = useGalleryImages({
    url: process.env.NEXT_PUBLIC_Url? process.env.NEXT_PUBLIC_Url : "",
  });
  
  useEffect(() => {
    getGalleryImages();
  }, [])

  return (
    <>
      <GestureComponent>
        <GallerySwiper imageArry={images}></GallerySwiper>
      </GestureComponent>
    </>
  )
}
