"use client";

import React, { useEffect, useState } from "react";
import { useGalleryImages } from "../hook/useGalleryImages.hook"
import GallerySwiper from "../component/GallerySwiper";

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
      <GallerySwiper imageArry={images}></GallerySwiper>
    </>
  )
}
