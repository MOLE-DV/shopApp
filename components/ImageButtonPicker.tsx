import { Image, TouchableOpacity, Text, ScrollView, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import ImageButtonPickerStyles from "@/styles/ImageButtonPicker/ImageButtonPickerStyles";
import { useImagesContext } from "@/contexts/ImagesContext";

const ImageButtonPicker = (props: any) => {
  const scrollViewRef = useRef(null);
  const { images, setImages } = useImagesContext();
  const [currentScrollOffset, setCurrentScrollOffset] = useState(0);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"] as unknown as ImagePicker.MediaType,
      selectionLimit: 5,
      quality: 0.75,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages({
        edited: false,
        uris: result.assets?.map((a) => a.uri) as string[],
      });
    }
  };

  const scrollManager = (e: any) => {
    setCurrentScrollOffset(Math.round(e.nativeEvent.contentOffset.x));
  };

  const imageScrollSelectorHandler = (index: number) => {
    if (!scrollViewRef) return;

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
        source={props.image}
        style={{ ...ImageButtonPickerStyles.importButtonImage }}
      />
      <Text
        style={{
          position: "absolute",
          ...ImageButtonPickerStyles.importButtonText,
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  ) : (
    <View style={{ ...ImageButtonPickerStyles.imageScrollUpperContainer }}>
      <View style={{ ...ImageButtonPickerStyles.slider }}>
        {images.uris.map((item, index) => (
          <View
            key={index}
            onTouchEnd={() => imageScrollSelectorHandler(index)}
            style={
              index * 300 === currentScrollOffset
                ? { ...ImageButtonPickerStyles.SelectedDot }
                : { ...ImageButtonPickerStyles.dot }
            }
          />
        ))}
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToOffsets={images.uris.map((el, index) => 300 * index)}
        contentOffset={{ x: 0, y: 0 }}
        style={{ ...ImageButtonPickerStyles.imagesScroll }}
        contentContainerStyle={{
          ...ImageButtonPickerStyles.imageContainerStyle,
        }}
        disableIntervalMomentum
        snapToEnd
        snapToStart
        onMomentumScrollEnd={scrollManager}
      >
        {images.uris.map((item, index) => {
          return (
            <View key={index}>
              <Image
                source={{ uri: item }}
                key={index}
                style={{
                  ...ImageButtonPickerStyles.image,
                }}
              />
            </View>
          );
        })}
        <TouchableOpacity
          onPress={pickImage}
          style={{
            ...ImageButtonPickerStyles.importButton,
            alignItems: "center",
          }}
        >
          <Image
            source={props.image}
            style={{ ...ImageButtonPickerStyles.importButtonImage }}
          />
          <Text
            style={{
              position: "absolute",
              ...ImageButtonPickerStyles.importButtonText,
            }}
          >
            {props.text}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ImageButtonPicker;
