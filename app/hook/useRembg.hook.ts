import { useState } from "react";
import { useSelector } from "./useSelector.hook";
import { useDispatch } from "react-redux";
import { setUrl } from "../redux/Features/rembg/rembgSlice";

export const useRembg = ({ url, port }: { url: string; port: string }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [images, setImages] = useState<string>("");

  const dispatch = useDispatch();

  const rembgSettings = useSelector((state) => state.rembg.settings);

  dispatch(setUrl(url));

  const rembg = async () => {
    setLoading(true);
    setError(null);
    try {
      // console.log("rembgSettings", rembgSettings);
      const res = await fetch("api/rembg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sdUrl: url,
          args: rembgSettings,
        }),
      });
      // console.log("res in hook", res);
      if (res.status == 200) {
        const json = await res.json();
        setImages(json.image);
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

  return { images, error, loading, result, rembg };
};
