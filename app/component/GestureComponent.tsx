import React, { useState,useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useGesture } from '@use-gesture/react';

export default function GestureComponent({
  children
}: {
  children: React.ReactNode,
}) {
  const [maxTouchPoints, setMaxTouchPoints] = useState<Number | null>(null);

  const router = useRouter();

  useEffect(() => {
    if ('maxTouchPoints' in navigator){
      setMaxTouchPoints(navigator.maxTouchPoints);
    }
  }, []);

  const gestureHandlers = useGesture({
    // 定义手势处理逻辑
    // useDrag	处理拖动手势
    // useMove	处理鼠标移动事件
    // useHover	处理鼠标进入和鼠标离开事件
    // useScroll	处理滚动事件
    // useWheel	处理滚轮事件
    // usePinch	处理捏合手势
    // useGesture	在一个钩子中处理多个手势
    onDrag: ({ down, movement }) => {
      // 在拖动过程中的处理逻辑
      console.log('Drag:', down, movement);
    },
    onPinch: ({movement}) => {
      // 返回上一页
      if(movement[0] != 1 && movement[1] != 0){
        router.back();
      };
    },
  });

  return (
    <div {...gestureHandlers()} >
      {children}
    </div>
  );
}
