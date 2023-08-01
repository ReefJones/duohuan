import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'
import styles from "../styles/LightEdge.module.css"
import 'swiper/css';

const messages = [
    {
        name: "Kate Marasisa",
        position: "Illustrator",
        text: "Proin sagittis elementum odio, sed blandit sapien mattis sed. Mauris ut scelerisque risus. Donec pretium nulla ullamcorper sem maximus, et vulputate sem malesuada.",
        photo: "/testimonial1.png",
    },
    {
        name: "Kate Marasisa1",
        position: "Illustrator",
        text: "Proin sagittis elementum odio, sed blandit sapien mattis sed. Mauris ut scelerisque risus. Donec pretium nulla ullamcorper sem maximus, et vulputate sem malesuada.",
        photo: "/testimonial2.png",
    },
    {
        name: "Kate Marasisa2",
        position: "Illustrator",
        text: "Proin sagittis elementum odio, sed blandit sapien mattis sed. Mauris ut scelerisque risus. Donec pretium nulla ullamcorper sem maximus, et vulputate sem malesuada.",
        photo: "/testimonial3.png",
    },
    {
        name: "Kate Marasisa3",
        position: "Illustrator",
        text: "Proin sagittis elementum odio, sed blandit sapien mattis sed. Mauris ut scelerisque risus. Donec pretium nulla ullamcorper sem maximus, et vulputate sem malesuada.",
        photo: "/testimonial2.png",
    },
    {
        name: "Kate Marasisa4",
        position: "Illustrator",
        text: "Proin sagittis elementum odio, sed blandit sapien mattis sed. Mauris ut scelerisque risus. Donec pretium nulla ullamcorper sem maximus, et vulputate sem malesuada.",
        photo: "/testimonial3.png",
    },
    {
        name: "Kate Marasisa5",
        position: "Illustrator",
        text: "Proin sagittis elementum odio, sed blandit sapien mattis sed. Mauris ut scelerisque risus. Donec pretium nulla ullamcorper sem maximus, et vulputate sem malesuada.",
        photo: "/testimonial1.png",
    },
]

export default function MessageSwiper(){
    const [activeIndex, setActiveIndex] = useState<number>(1);

    return (
    <Swiper
        spaceBetween={5}
        slidesPerView={3}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex + 1)}
        onSwiper={(swiper) => console.log(swiper)}
    >
        {messages.map((message, index) => (
            <SwiperSlide key={index}>
                <div className={`${styles.SwiperItem} ${activeIndex == index? styles.ActiveItem : ""}`}>
                    <div className={`${styles.testimonialBox}`}>
                        <div className={`${styles.quoteBox}`}>
                            <ChatBubbleLeftRightIcon
                                className="pointer-events-none w-12 h-12 text-white"
                                aria-hidden="true"
                            />
                        </div>
                        <p className={`${styles.infotMargin}`}>{message.text}</p>
                        <div className={`flex justify-center items-center ${styles.testimonialImg}`}>
                            <img src={message.photo} alt="testimonial picture"/>
                        </div>
                        <div className={`${styles.userInfo}`}>
                            <p className={`${styles.testimonialName}`}>{message.name}</p>
                            <p className={`${styles.info}`}>{message.position}</p>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
    );
}