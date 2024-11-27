import * as ImageManipulator from "expo-image-manipulator";
import { useEffect, useRef, useState } from "react";
import { View, Image, Dimensions, GestureResponderEvent } from "react-native";
import ImageModifierStyles from "@/styles/ImageModifier/ImageModifierStyles";
import { useHeader } from "@/contexts/HeaderContext";
import ImageButton from "./ImageButton";
import MaskedView from "@react-native-masked-view/masked-view";
import { useImagesContext } from "@/contexts/ImagesContext";

const ImageModifier = () => {
  const { hidden, setHidden } = useHeader();
  const [windowOpen, setWindowOpen] = useState(false);

  const { images, setImages } = useImagesContext();
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
  } | null>(null);

  const [cropElementPos, setCropElemetPos] = useState({ x: 0, y: 0 });
  const cropElementRef: React.RefObject<View> = useRef(null);
  const imageElementRef: React.RefObject<Image> = useRef(null);

  async function rotateHandler(direction: string) {
    try {
      if (currentEditedImage === null) return;

      const rotation = direction === "left" ? -90 : 90;

      const result = await ImageManipulator.manipulateAsync(
        currentEditedImage.uri,
        [{ rotate: rotation }],
        { format: ImageManipulator.SaveFormat.JPEG }
      );

      setCurrentEditedImage({
        ...currentEditedImage,
        uri: result.uri,
        rotation: currentEditedImage.rotation + rotation,
      });
    } catch (ex) {
      console.error("Error rotating image: ", ex);
    }
  }

  const cropMovingHandler = (e: GestureResponderEvent) => {
    if (
      !currentEditedImage ||
      !cropElementRef.current ||
      !imageElementRef.current
    )
      return;

    let Position = 0;

    cropElementRef.current.measure((x, y, cropWidth, cropHeight) => {
      imageElementRef.current?.measure((x, y, imageWidth, imageHeight) => {
        let [width, height] = [imageWidth, imageHeight];
        if (!currentEditedImage?.horizontal) {
          Position = e.nativeEvent.locationY;
        } else {
          const tempWidth = width;
          width = height;
          height = tempWidth;
          Position = e.nativeEvent.locationX;
        }
        const rotatedHeight =
          (currentEditedImage.rotation / 4) % 1 == 0 ? height : width;
        if (Position > rotatedHeight - cropHeight / 2) {
          Position = rotatedHeight - cropHeight / 2;
        } else if (Position < cropHeight / 2) {
          Position = cropHeight / 2;
        }

        const elementCenterPosition = Position - cropWidth / 2;

        setCropElemetPos(
          currentEditedImage.horizontal
            ? { x: elementCenterPosition, y: 0 }
            : { x: 0, y: elementCenterPosition }
        );
      });
    });
  };

  const applyCrop = async () => {
    try {
      if (currentEditedImage === null) return;

      console.log("Applying crop...");
      const cropSize = currentEditedImage.horizontal
        ? currentEditedImage.height
        : currentEditedImage.width;

      const result = await ImageManipulator.manipulateAsync(
        currentEditedImage?.uri,
        [
          {
            crop: {
              height: cropSize,
              width: cropSize,
              originX: cropElementPos.x,
              originY: cropElementPos.y,
            },
          },
        ],
        { format: ImageManipulator.SaveFormat.JPEG }
      );

      setEditedImages([...(editedImages as string[]), result.uri]);
      console.log("Succesfuly applied crop");
      return true;
    } catch (ex) {
      console.error("Error while cropping image: ", ex);
      return false;
    }
  };

  const applyHandler = async () => {
    //FIXME:when appling only first image passes over
    let result = await applyCrop();

    if (!result || !images) return;

    switch (currentEditedImage?.index === images!.uris.length - 1) {
      case true:
        setWindowOpen(false);
        setHidden(false);
        setImages({
          edited: true,
          uris: editedImages,
        });
        console.log("[Image modifier.tsx] Succesfully modified images");
        break;
      case false:
        editImage(currentEditedImage!.index + 1);
        break;
    }
  };

  const editImage = (index: number) => {
    if (!images || images.uris.length === 0) return;

    Image.getSize(
      images.uris[index],
      (width, height) => {
        const aspectRatio = width / height;
        setCurrentEditedImage({
          index: index,
          orgUri: images.uris[index],
          uri: images.uris[index],
          aspectRatio,
          rotation: 0,
          height: height,
          width: width,
          horizontal: height < width,
        });
      },
      (ex) => {
        console.error("Failed to load image dimensionss: ", ex);
      }
    );

    setCropElemetPos({ x: 0, y: 0 });
  };

  useEffect(() => {
    const getImages = async () => {
      if (!images || images.uris.length === 0 || images.edited) return;

      console.log("[imageModifier.tsx] Loading images...");
      setWindowOpen(true);
      setHidden(true);
      editImage(0);
    };

    getImages();
  }, [images]);

  return (
    <View
      style={
        windowOpen ? { ...ImageModifierStyles.container } : { display: "none" }
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
            uri: currentEditedImage !== null ? currentEditedImage.orgUri : "",
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
                ref={cropElementRef}
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
            ref={imageElementRef}
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
              uri: currentEditedImage !== null ? currentEditedImage.orgUri : "",
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
