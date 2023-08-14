import { useState } from "react";
import { useSelector } from "./useSelector.hook";
import { useDispatch } from "react-redux";
import { setUrl } from "../redux/Features/ExtrasSingleImage/ExtrasSingleImageslice";

export const useExtrasSingleImage = ({ url, port }: { url: string; port: string }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [images, setImages] = useState<string>("");

  const dispatch = useDispatch();

  const ExtrasSingleImageSettings = useSelector((state) => state.extrasSingleImage.settings);

  dispatch(setUrl(url));

  const ExtrasSingleImage = async () => {
    setLoading(true);
    setError(null);
    try {
      // console.log("ExtrasSingleImageSettings", ExtrasSingleImageSettings);
      const res = await fetch("api/extrasSingleImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sdUrl: url,
          args: ExtrasSingleImageSettings,
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

  return { images, error, loading, result, ExtrasSingleImage };
};
