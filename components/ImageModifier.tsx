import * as ImageManipulator from "expo-image-manipulator";
import { useEffect, useRef, useState } from "react";
import { View, Image, Dimensions, GestureResponderEvent } from "react-native";
import ImageModifierStyles from "@/styles/ImageModifier/ImageModifierStyles";
import { useApp } from "@/contexts/AppContext";
import ImageButton from "./ImageButton";
import MaskedView from "@react-native-masked-view/masked-view";
import { useImagesContext } from "@/contexts/ImagesContext";
import imagesI from "@/interfaces/imagesInterface";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ImageModifier = () => {
  const { setHidden, setLoading } = useApp();
  const [windowOpen, setWindowOpen] = useState(false);

  const { images, setImages } = useImagesContext() as imagesI;
  const [editedImages, setEditedImages] = useState<string[]>([]);
  const [currentEditedImage, setCurrentEditedImage] = useState<{
    index: number;
    orgUri: string;
    uri: string;
    aspectRatio: number;
    rotation: number;
    height: number;
    width: number;
    horizontal: boolean;
    cropPos: { x: number; y: number };
  } | null>(null);

  const [cropElementPos, setCropElemetPos] = useState({ x: 0, y: 0 });
  const [imageComponentSize, setImageComponentSize] = useState({
    width: 0,
    height: 0,
  });
  const [cropElementSize, setCropElementSize] = useState({
    width: 0,
    height: 0,
  });

  //obracanie obrazu
  async function rotateHandler(direction: string) {
    try {
      //sprawdź czy załadowano zdjęcie do edycji
      if (currentEditedImage === null) return;

      //obróć zdjęcie o 90 stopni
      const rotation = direction === "left" ? -90 : 90;

      //zapisz obrócone zdjęcie
      const result = await ImageManipulator.manipulateAsync(
        currentEditedImage.uri,
        [{ rotate: rotation }],
        { format: ImageManipulator.SaveFormat.JPEG }
      );

      //podmień url aktualnego edytowanego zdjęcia na url tego obróconego oraz zapisz z jaką rotacją zostało obrócone

      if (result.uri === "") throw new Error("Result is an empty source");

      setCurrentEditedImage({
        ...currentEditedImage,
        uri: result.uri,
        rotation: currentEditedImage.rotation + rotation,
      });
    } catch (ex) {
      console.error("Error rotating image: ", ex);
    }
  }

  const cropMovingHandler = async (e: GestureResponderEvent) => {
    //sprawdź czy załadowano zdjęcie do edycji, narzędzie wycinania oraz element przechowujący zdjęcie
    if (!currentEditedImage) return;

    let Position = 0;
    const { width: cropWidth, height: cropHeight } = cropElementSize;

    let [impComponentWidth, impComponentHeight] = [
      imageComponentSize.width,
      imageComponentSize.height,
    ];

    if (currentEditedImage.horizontal) {
      Position = e.nativeEvent.locationX;
    } else {
      Position = e.nativeEvent.locationY;
    }

    let size = currentEditedImage.horizontal
      ? impComponentWidth
      : impComponentHeight;
    if (Position > size - cropHeight / 2) {
      Position = size - cropHeight / 2;
    } else if (Position < cropHeight / 2) {
      Position = cropHeight / 2;
    }

    const elementCenterPosition = Position - cropWidth / 2;

    const cropSize = currentEditedImage.horizontal
      ? currentEditedImage.height
      : currentEditedImage.width;

    const cropElementSizeDiff = cropSize / cropElementSize.width;

    const isRotated = (currentEditedImage.rotation / 4) % 1 === 0.5;
    let [cropX, cropY] = [
      isRotated
        ? currentEditedImage.cropPos.y * cropElementSizeDiff
        : currentEditedImage.cropPos.x * cropElementSizeDiff,
      isRotated
        ? currentEditedImage.cropPos.x * cropElementSizeDiff
        : currentEditedImage.cropPos.y * cropElementSizeDiff,
    ];

    const ImageComponentCropCords = currentEditedImage.horizontal
      ? { x: elementCenterPosition, y: 0 }
      : { x: 0, y: elementCenterPosition };

    setCropElemetPos(ImageComponentCropCords);

    setCurrentEditedImage({
      ...currentEditedImage,
      cropPos: ImageComponentCropCords,
    });
  };

  const resizeImage = async (
    index: number
  ): Promise<{ height: number; width: number; uri: string } | false> => {
    try {
      if (!images) throw new Error("Images are undefined");

      const image = images.uris[index];
      if (!image) return false;

      const { width, height } = await new Promise<{
        width: number;
        height: number;
      }>((resolve, reject) => {
        Image.getSize(
          image,
          (width, height) => resolve({ width, height }),
          (error) => reject(error)
        );
      });

      const horizontal = currentEditedImage?.horizontal;

      const aspectRatio = horizontal ? width / height : height / width;

      const imageHeight = horizontal ? 1000 : 1000 * aspectRatio;
      const imageWidth = !horizontal ? 1000 : 1000 * aspectRatio;

      const result = await ImageManipulator.manipulateAsync(image, [
        {
          resize: {
            height: imageHeight,
            width: imageWidth,
          },
        },
      ]);

      return result;
    } catch (ex) {
      console.error("Error while resizing image: ", ex);
      return false;
    }
  };

  const applyCrop = async (): Promise<string | false> => {
    try {
      if (currentEditedImage === null || cropElementSize.width === 0) {
        return false;
      }

      const cropSize = currentEditedImage.horizontal
        ? currentEditedImage.height
        : currentEditedImage.width;

      const cropElementSizeDiff = cropSize / cropElementSize.width;

      const isRotated = Math.abs((currentEditedImage.rotation / 4) % 1) === 0.5;
      let [cropX, cropY] = [
        isRotated
          ? currentEditedImage.cropPos.y * cropElementSizeDiff
          : currentEditedImage.cropPos.x * cropElementSizeDiff,
        isRotated
          ? currentEditedImage.cropPos.x * cropElementSizeDiff
          : currentEditedImage.cropPos.y * cropElementSizeDiff,
      ];

      const rotNum = (currentEditedImage.rotation / 180) % 2;
      if (currentEditedImage.horizontal) {
        //sprawdzan jeżeli obraz jest obrócony o 180 lub 270 to odwraca X;

        if (Math.abs(rotNum) === 1) {
          cropX = currentEditedImage.width - cropSize - cropX;
        } else if (rotNum === 1.5 || rotNum === -0.5) {
          cropY = currentEditedImage.width - cropSize - cropY;
          cropX = 0;
        }
      } else {
        if (rotNum === 0.5 || rotNum === -1.5) {
          cropX = currentEditedImage.height - cropSize - cropX;
          cropY = 0;
        } else if (Math.abs(rotNum) === 1) {
          cropY = currentEditedImage.height - cropSize - cropY;
          cropX = 0;
        }
      }

      const result = await ImageManipulator.manipulateAsync(
        currentEditedImage?.uri,
        [
          {
            crop: {
              height:
                cropSize > currentEditedImage.height
                  ? currentEditedImage.height
                  : cropSize,
              width:
                cropSize > currentEditedImage.width
                  ? currentEditedImage.width
                  : cropSize,
              originX: cropX,
              originY: cropY,
            },
          },
        ],
        { format: ImageManipulator.SaveFormat.JPEG }
      );

      return result.uri;
    } catch (ex) {
      console.error("Error while cropping image: ", ex);
      return false;
    }
  };

  const applyHandler = async () => {
    try {
      if (!images || !currentEditedImage) return;

      const croppedUri = await applyCrop();

      const croppedUris: string[] = [...editedImages];

      if (croppedUri) {
        setEditedImages((prev) => [...prev, croppedUri]);
      }

      if (currentEditedImage?.index === images.uris.length - 1) {
        if (!croppedUri) {
          throw new Error("no cropped image source found");
        }

        setWindowOpen(false);
        setHidden(false);
        setImages({
          edited: true,
          uris: [...croppedUris, croppedUri],
        });
      } else {
        editImage(currentEditedImage.index + 1);
      }
    } catch (ex) {
      console.error("Couldn't apply chanes to image: ", ex);
      return;
    }
  };

  const editImage = async (index: number) => {
    const resizedImage = (await resizeImage(index)) as
      | { height: number; width: number; uri: string }
      | false;

    if (
      resizedImage &&
      typeof resizedImage !== "boolean" &&
      images &&
      resizedImage.uri !== ""
    ) {
      const aspectRatio = resizedImage.width / resizedImage.height;

      setCurrentEditedImage({
        index: index,
        orgUri: images.uris[index],
        uri: resizedImage.uri,
        aspectRatio,
        rotation: 0,
        height: resizedImage.height,
        width: resizedImage.width,
        horizontal: resizedImage.height < resizedImage.width,
        cropPos: { x: 0, y: 0 },
      });

      setCropElemetPos({ x: 0, y: 0 });
    } else {
      console.error("Image resizing failed or returned false.");
      setWindowOpen(false);
      setHidden(false);
      return;
    }
  };

  useEffect(() => {
    const getImages = async () => {
      if (!images || images.uris.length === 0 || images.edited) return;

      setWindowOpen(true);
      setHidden(true);
      editImage(0);
      setLoading(false);
    };

    getImages();
  }, [images]);

  return (
    <View
      style={
        windowOpen
          ? [
              ImageModifierStyles.container,
              {
                height:
                  Dimensions.get("window").height + useSafeAreaInsets().top,
              },
            ]
          : { display: "none" }
      }
    >
      <View>
        <Image
          style={{
            ...ImageModifierStyles.imageBackground,
            aspectRatio: currentEditedImage?.aspectRatio,
            transform: [
              {
                rotate: `${
                  currentEditedImage ? currentEditedImage?.rotation : 0
                }deg`,
              },
            ],
            height:
              currentEditedImage && !currentEditedImage?.horizontal
                ? Dimensions.get("window").width
                : "auto",
            width:
              currentEditedImage && currentEditedImage?.horizontal
                ? Dimensions.get("window").width
                : "auto",
          }}
          source={{
            uri:
              currentEditedImage !== null && currentEditedImage.orgUri !== ""
                ? currentEditedImage.orgUri
                : undefined,
          }}
        />
        <MaskedView
          onTouchMove={(e) => cropMovingHandler(e)}
          style={{
            ...ImageModifierStyles.imageMaskStyle,
            transform: [
              {
                rotate: `${
                  currentEditedImage ? currentEditedImage?.rotation : 0
                }deg`,
              },
            ],
          }}
          maskElement={
            <View style={ImageModifierStyles.mask}>
              <View
                onLayout={(e) => {
                  setCropElementSize(e.nativeEvent.layout);
                }}
                style={{
                  ...ImageModifierStyles.cropPicker,
                  height: currentEditedImage?.horizontal ? "100%" : "auto",
                  width: !currentEditedImage?.horizontal ? "100%" : "auto",
                  top: cropElementPos.y,
                  left: cropElementPos.x,
                }}
              ></View>
            </View>
          }
        >
          <Image
            onLayout={(e) => {
              setImageComponentSize(e.nativeEvent.layout);
            }}
            style={{
              ...ImageModifierStyles.image,
              aspectRatio: currentEditedImage?.aspectRatio,
              height: !currentEditedImage?.horizontal
                ? Dimensions.get("window").width
                : "auto",
              width: currentEditedImage?.horizontal
                ? Dimensions.get("window").width
                : "auto",
            }}
            source={{
              uri:
                currentEditedImage !== null && currentEditedImage.orgUri !== ""
                  ? currentEditedImage.orgUri
                  : undefined,
            }}
          />
        </MaskedView>
      </View>
      <View style={ImageModifierStyles.toolbar}>
        <ImageButton
          text="Rotate left"
          image={require("../assets/icons/png/rotateLeft.png")}
          buttonStyle={ImageModifierStyles.buttonStyle}
          style={ImageModifierStyles.buttonImage}
          textStyle={ImageModifierStyles.buttonTextStyle}
          onPress={() => rotateHandler("left")}
        />
        <ImageButton
          text="Rotate right"
          image={require("../assets/icons/png/rotateRight.png")}
          buttonStyle={ImageModifierStyles.buttonStyle}
          style={ImageModifierStyles.buttonImage}
          textStyle={ImageModifierStyles.buttonTextStyle}
          onPress={() => rotateHandler("right")}
        />
        <ImageButton
          text="Apply"
          image={require("../assets/icons/png/check.png")}
          buttonStyle={ImageModifierStyles.buttonStyle}
          style={{
            ...ImageModifierStyles.buttonImage,
            tintColor: "rgb(105, 64, 255)",
          }}
          textStyle={ImageModifierStyles.buttonTextStyle}
          onPress={applyHandler}
        />
      </View>
    </View>
  );
};

export default ImageModifier;
