import imageI from "./imageInterface";

export default interface imagesI {
  images: imageI | undefined;
  setImages: React.Dispatch<React.SetStateAction<imageI | undefined>>;
}
