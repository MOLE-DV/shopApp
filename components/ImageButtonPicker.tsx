import {
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  ScrollView,
  View,
  ImageSourcePropType,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import ImageButtonPickerStyles from "@/styles/ImageButtonPicker/ImageButtonPickerStyles";
import { useImagesContext } from "@/contexts/ImagesContext";
import { useApp } from "@/contexts/AppContext";
import imagesI from "@/interfaces/imagesInterface";

interface propsI {
  OnSelected?: (images: string[]) => void;
  Text?: string;
  Image?: ImageSourcePropType;
  FetchImages?: (images: string[]) => void;
}

const ImageButtonPicker = (props: propsI) => {
  const scrollViewRef = useRef(null);
  const { setHidden, setLoading } = useApp();
  const { images, setImages } = useImagesContext() as imagesI;
  const [currentScrollOffset, setCurrentScrollOffset] = useState(0);

  const pickImage = async () => {
    setLoading(true);
    setHidden(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"] as unknown as ImagePicker.MediaType,
      selectionLimit: 5 - (images ? images.uris.length : 0),
      quality: 0.8,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages({
        edited: false,
        uris: result.assets?.map((a) => a.uri) as string[],
      });
    } else {
      setLoading(false);
      setHidden(false);
    }
  };

  useEffect(() => {
    if (!images?.edited || !props.OnSelected) return;
    props.OnSelected(images.uris);
  }, [images?.edited]);

  const scrollManager = (e: any) => {
    setCurrentScrollOffset(Math.round(e.nativeEvent.contentOffset.x));
  };

  const imageScrollSelectorHandler = (index: number) => {
    if (!scrollViewRef.current) return;

    setCurrentScrollOffset(index * 300);
    scrollViewRef.current.scrollTo({ y: 0, x: index * 300 });
  };

  return images === null ? (
    <TouchableOpacity
      onPress={pickImage}
      style={{
        ...ImageButtonPickerStyles.importButton,
        marginTop: 80,
      }}
    >
      <Image
        source={props.Image}
        style={{ ...ImageButtonPickerStyles.importButtonImage }}
      />
      <Text
        style={{
          position: "absolute",
          ...ImageButtonPickerStyles.importButtonText,
        }}
      >
        {props.Text}
      </Text>
    </TouchableOpacity>
  ) : (
    <View style={{ ...ImageButtonPickerStyles.imageScrollUpperContainer }}>
      <View style={{ ...ImageButtonPickerStyles.slider }}>
        {images
          ? images.uris.map((item, index) => (
              <View
                key={index}
                onTouchEnd={() => imageScrollSelectorHandler(index)}
                style={
                  index * 300 === currentScrollOffset
                    ? { ...ImageButtonPickerStyles.SelectedDot }
                    : { ...ImageButtonPickerStyles.dot }
                }
              />
            ))
          : null}
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToOffsets={
          images ? images.uris.map((el, index) => 300 * index) : undefined
        }
        contentOffset={{ x: 0, y: 0 }}
        style={{ ...ImageButtonPickerStyles.imagesScroll }}
        contentContainerStyle={{
          ...ImageButtonPickerStyles.imageContainerStyle,
        }}
        snapToEnd
        snapToStart
        onMomentumScrollEnd={scrollManager}
      >
        {images
          ? images.edited
            ? images.uris.map((item, index) => {
                return (
                  <TouchableHighlight key={index}>
                    <Image
                      source={{ uri: item !== "" ? item : undefined }}
                      key={index}
                      style={{
                        ...ImageButtonPickerStyles.image,
                      }}
                    />
                  </TouchableHighlight>
                );
              })
            : null
          : null}
        {images ? (
          images.uris.length < 5 ? (
            <TouchableOpacity
              onPress={pickImage}
              style={{
                ...ImageButtonPickerStyles.importButton,
                alignItems: "center",
              }}
            >
              <Image
                source={props.Image}
                style={{ ...ImageButtonPickerStyles.importButtonImage }}
              />
              <Text
                style={{
                  position: "absolute",
                  ...ImageButtonPickerStyles.importButtonText,
                }}
              >
                {props.Text}
              </Text>
            </TouchableOpacity>
          ) : null
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ImageButtonPicker;
