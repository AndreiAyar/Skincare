import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Animated,
  SafeAreaView,
} from "react-native";
import {
  Grayscale,
  Sepia,
  Tint,
  ColorMatrix,
  concatColorMatrices,
  invert,
  contrast,
  saturate,
} from "react-native-color-matrix-image-filters";
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import calculateRead from "../controllers/CalculateRead";

const BlogPost = (props) => {
  const [pos, setPos] = useState(0);
  console.log(props.route.params);
  const { title, src, entire_post, tags } = props.route.params.item;
  const IMAGE_HEIGHT = 300;
  let now;
  let scrollAnimatedValue = new Animated.Value(0);
  const navigation = useNavigation();
  const handleScroll = (event) => {
    //setScrollY(event.nativeEvent.contentOffset.y)
    now = event.nativeEvent.contentOffset.y;
    if (now < -70) {
      setPos(now);
    }
    // console.log(event.nativeEvent.contentOffset.y);
  };
  useEffect(() => {
    if (pos < -70) {
      navigation.navigate("Discover");
    }
  }, [pos]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View
            style={{
              justifyContent: "center",
              marginTop: Platform.OS == "ios" ? 20 : 10,
              marginBottom: 10,
              marginLeft: 10,
              zIndex: 10,
              backgroundColor: "rgba(226, 226, 226,0.3)",
              width: 40,
              borderRadius: 100,
              height: 40,
            }}
          >
            <Image
              style={{
                alignSelf: "center",

                transform: [
                  {
                    rotateZ: "-90deg",
                  },
                ],
                width: 20,
                height: 20,
                zIndex: 10,
              }}
              source={require("../../src/resources/back_white.png")}
            />
            <Animated.Text
              style={[
                {
                  position: "absolute",
                  width: screenWidth,
                  left: 50,
                  fontSize: 24,
                  top: 0,
                  textAlignVertical: "center",
                },
                {
                  transform: [
                    {
                      translateY: scrollAnimatedValue.interpolate({
                        inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT / 1.2],
                        outputRange: [-IMAGE_HEIGHT, -IMAGE_HEIGHT * 3, 10],
                        extrapolateRight: "clamp",
                      }),
                    },
                  ],
                },
                {
                  opacity: scrollAnimatedValue.interpolate({
                    inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
                    outputRange: [0, 0, 1],
                    extrapolateRight: "clamp",
                  }),
                },
              ]}
            >
              {(" ", title)}
              <Text>{"  "}</Text>
            </Animated.Text>
          </View>
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            { zIndex: 999 },
            {
              transform: [
                {
                  translateY: scrollAnimatedValue.interpolate({
                    inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
                    outputRange: [IMAGE_HEIGHT / 2, 0, -IMAGE_HEIGHT / 1.2],
                    extrapolateRight: "clamp",
                  }),
                },
              ],
            },
          ]}
        >
          <View
            style={{
              flex: 1,
              top: 30,
              zIndex: 50,
              flexDirection: "row",
              width: 300,
              flexWrap: "wrap",
            }}
          >
            {tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={{ color: "white", alignSelf: "center" }}>
                  {tag.name}
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>
        <Animated.Image
          source={{
            uri: "http://homesev.tplinkdns.com:4000/static/discover/" + src,
          }}
          style={[
            styles.header_image,
            {
              transform: [
                {
                  translateY: scrollAnimatedValue.interpolate({
                    inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
                    outputRange: [IMAGE_HEIGHT / 2, 0, -IMAGE_HEIGHT * 1.2],
                    extrapolateRight: "clamp",
                  }),
                },
                {
                  scale: scrollAnimatedValue.interpolate({
                    inputRange: [-IMAGE_HEIGHT / 2, 0, IMAGE_HEIGHT],
                    outputRange: [2, 1.2, 1],
                    extrapolateRight: "clamp",
                  }),
                },
              ],
            },
          ]}
        />
      </View>

      <Animated.ScrollView
        onScroll={Animated.event(
          // scrollX = e.nativeEvent.contentOffset.x
          [{ nativeEvent: { contentOffset: { y: scrollAnimatedValue } } }],
          { useNativeDriver: true, listener: (event) => handleScroll(event) }
        )}
        scrollEventThrottle={8}
      >
        <View style={styles.post}>
          <View style={styles.title}>
            <Text style={{ fontSize: 25 }}>{title}</Text>
          </View>

          <View
            style={{
              backgroundColor: "rgba(226, 226, 226,0.5)",
              borderRadius: 30,
              paddingLeft: 10,
              paddingRight: 10,
              alignSelf: "center",
              justifyContent:'center',
              textAlignVertical: "bottom",
              height: 20,
 
            }}
          >
            <Text style={{fontSize:15, fontWeight:'500'}}> Read Time: {calculateRead(entire_post)}</Text>
          </View>
          <View style={styles.description}>
            <Text
              style={{
                lineHeight: 20,
              }}
            >
              {entire_post.replace("\\n", "\n \n")}
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    margin: 20,
  },
  description: {
    margin: 20,
    marginBottom: 100,
  },
  post: {
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: screenWidth,
    marginTop: 200,
  },
  tag: {
    margin: 5,
    left: 10,
    justifyContent: "center",
    zIndex: 30,
    backgroundColor: "rgba(226, 226, 226,0.5)",
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 20,
    textAlignVertical: "center",
  },
  header_image: {
    position: "absolute",
    alignSelf: "center",
    width: screenWidth,
    height: 300,
    zIndex: -2,
    opacity: 0.8,
    resizeMode: "cover",
  },
});
export default BlogPost;
