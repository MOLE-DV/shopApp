import { Image, TouchableOpacity, Text, ScrollView, View } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import ImageButtonPickerStyles from "@/styles/ImageButtonPicker/ImageButtonPickerStyles";

const ImageButtonPicker = (props: any) => {
  const [images, setImages] = useState<string[] | null>(null);
  let left = 0;
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"] as unknown as ImagePicker.MediaType,
      aspect: [4, 4],
      allowsMultipleSelection: true,
      quality: 0.5,
    });
    console.log(result.assets?.map((a) => a.uri));

    if (!result.canceled) {
      setImages(result.assets?.map((a) => a.uri));
    }
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
    <ScrollView
      style={{ ...ImageButtonPickerStyles.imagesScroll }}
      contentContainerStyle={{ ...ImageButtonPickerStyles.imageContainerStyle }}
    >
      {images.map((item, index) => {
        return (
          <Image
            source={{ uri: item }}
            key={index}
            style={{
              ...ImageButtonPickerStyles.image,
              left: 250 * index - left,
            }}
          />
        );
      })}
      <TouchableOpacity
        onPress={pickImage}
        style={{
          ...ImageButtonPickerStyles.importButton,
          position: "absolute",
          left: images.length * 250 - left,
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
      <View style={{ ...ImageButtonPickerStyles.slider }}>
        {images.map((item, index) => (
          <View style={{ ...ImageButtonPickerStyles.dot }} key={index} />
        ))}
      </View>
    </ScrollView>
  );
};

export default ImageButtonPicker;
