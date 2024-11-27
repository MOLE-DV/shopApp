import { createContext, ReactNode, useContext, useState } from "react";

interface imageI {
  edited: boolean;
  uris: string[];
}

interface imagesI {
  images: imageI;
  setImages: (images: imageI) => void;
}

const imagesContext = createContext<imagesI>({
  images: { edited: false, uris: [] },
  setImages: () => undefined,
});

export const ImagesProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<imageI>({
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
