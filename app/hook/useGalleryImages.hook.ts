import { useState } from "react";

export const useGalleryImages = ({ url }: { url: string}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  
  const getGalleryImages = async () => {
    setLoading(true);
    try {
      const res = await fetch("api/test", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == 200) {
        const json = await res.json();
        setImages(json);
      }
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  return { images, error, loading, getGalleryImages };
};
