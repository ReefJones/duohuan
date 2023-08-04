import { useState } from "react";
import { useSelector } from "./useSelector.hook";
import { useDispatch } from "react-redux";
import { setUrl } from "../redux/Features/Txt2imgState/Txt2imgSlice";

export const useTxt2img = ({ url, port }: { url: string; port: string }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [images, setImages] = useState<any[]>([]);

  const dispatch = useDispatch();
  // 获取共享状态值
  const txt2imgSettings = useSelector((state) => state.txt2img.settings);
  // 获取共享状态方法
  dispatch(setUrl(url));
  // 调用接口
  const txt2img = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("api/txt2img", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sdUrl: url,
          args: txt2imgSettings,
        }),
      });
      // console.log("res in hook", res);
      if (res.status == 200) {
        const json = await res.json();
        setImages(json.images);
        setResult(json);
      } else {
        const json = await res.json();
        setError(json.error);
      }
    } catch (err: any) {
      // console.log("err in hook", err);
      setError(err.message);
    }
    setLoading(false);
  };
  
  return { images, error, loading, result, txt2img };
};
