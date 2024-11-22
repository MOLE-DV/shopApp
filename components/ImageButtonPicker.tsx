import { Image, TouchableOpacity, Text, ScrollView, View } from "react-native";
import { useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import ImageButtonPickerStyles from "@/styles/ImageButtonPicker/ImageButtonPickerStyles";

const ImageButtonPicker = (props: any) => {
  const scrollViewRef = useRef(null);
  const [images, setImages] = useState<string[] | null>(null);
  const [currentScrollOffset, setCurrentScrollOffset] = useState(0);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"] as unknown as ImagePicker.MediaType,
      selectionLimit: 5,
      aspect: [4, 4],
      allowsMultipleSelection: true,
      quality: 0.75,
    });

    if (!result.canceled) {
      setImages(result.assets?.map((a) => a.uri));
    }
  };

  const scrollManager = (e: any) => {
    setCurrentScrollOffset(Math.round(e.nativeEvent.contentOffset.x));
  };

  const imageScrollSelectorHandler = (index: number) => {
    if (!scrollViewRef) {
      console.log("no scroll");
      return;
    }
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
        {images.map((item, index) => (
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
        snapToOffsets={images.map((el, index) => 300 * index)}
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
        {images.map((item, index) => {
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
