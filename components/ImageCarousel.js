import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { images, violentIds } from "../utils/sortedImages";
import { Platform } from "react-native";
const { width: screenWidth } = Dimensions.get("window");

export default function ImageCarousel({ currentIndex, onClose }) {
  const onScrollToIndexFailed = (info) => {
    // Fallback in case scrolling fails
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: false,
      });
    }, 100);
  };

  let displayImages = [];

  function removeViolentImages(array, targetIds) {
    return array.filter((arr) => !targetIds.includes(arr.id));
  }

  if (Platform.OS === "android") {
    displayImages = removeViolentImages(images, violentIds);
  } else {
    displayImages = images;
  }

  function renderItem({ item }) {
    return (
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        snapToInterval={screenWidth}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
        initialScrollIndex={currentIndex}
        onScrollToIndexFailed={onScrollToIndexFailed}
        windowSize={5}
      />

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  imageContainer: {
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: screenWidth,
    height: screenWidth,
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
