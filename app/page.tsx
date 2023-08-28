"use client";

import styles from "./styles/LightEdge.module.css"
import Image from 'next/image';
import Link from 'next/link';

const product = {
  images: [
    {
      url: '/title_1.jpg',
      altText: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      url: '/title_2.jpg',
      altText: 'Model wearing plain black basic tee.',
    },
    {
      url: '/title_3.jpg',  
      altText: 'Model wearing plain gray basic tee.',
    },
  ],
}

export default function Home() {
  return (
    <div className={`relative w-4/5 h-3/5 flex justify-center items-center ${styles.card}`}>
      <div className={`absolute top-0 left-0 w-30 h-30 flex justify-center items-center ${styles.circle}`}>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className={`${styles.logo}`}
          width={30}
          height={30}
          priority
        />
      </div>
      <div className={`${styles.content}`}>
        <h2>多焕衣帽间</h2>
        <p>The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming limited release.</p>
        <div className="w-64 h-28 mt-5 flex justify-center items-center overflow-hidden">
          <Link href={"/Cloakroom"} className={`relative px-8 py-6 text-3xl overflow-hidden ${styles.LightEdgeBtn_w}`} >
            进入试衣间
          </Link>
        </div> 
      </div>
      <div>
        {product.images.map((image,index) => (
          <Image
            key={index} 
            src={image.url}
            alt={image.altText}   
            className={`${styles.productImg}`}
            width={200}
            height={200}
            priority
          />
        ))}
      </div>
    </div>
  )
}
