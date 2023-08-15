import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import styles from "../styles/LightEdge.module.css"
import { GallerySwiperProps } from "../Types/GallerySwiper";

export default function GallerySwiper({imageArry}: GallerySwiperProps){
    return (
        <div className={`${styles.GalleryBox}`}>
            <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination]}
            className={`${styles.Gallery}`}
            >
                {imageArry.map((image, index) => (
                    <SwiperSlide key={index} className={`${styles.reflection}`} style={{backgroundImage: `url(data:image/png;base64,` + image + `)`}}></SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}