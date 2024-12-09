import { createContext, ReactNode, useContext, useState } from "react";
import imagesI from "@/interfaces/imagesInterface";
import imageI from "@/interfaces/imageInterface";

const imagesContext = createContext<imagesI | undefined>(undefined);
export const ImagesProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<imageI | undefined>({
    edited: false,
    uris: [],
  });

  return (
    <imagesContext.Provider value={{ images, setImages }}>
      {children}
    </imagesContext.Provider>
  );
};

export const useImagesContext = () => {
  return useContext(imagesContext);
};
