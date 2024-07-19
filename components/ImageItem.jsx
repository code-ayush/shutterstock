import React from "react";
import { View, Image, StyleSheet, Dimensions, Pressable } from "react-native";

const { width } = Dimensions.get("window");
const itemSize = width / 2;

const ImageItem = ({ item }) => (
	<Pressable onPress={() => console.log("Image Pressed")}>
		<View style={styles.container}>
			<Image source={{ uri: item.assets.preview.url }} style={styles.image} />
		</View>
	</Pressable>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 5,
		backgroundColor: "#f0f0f0",
		borderRadius: 10,
		overflow: "hidden",
	},
	image: {
		width: itemSize - 10,
		height: itemSize - 10,
		borderRadius: 10,
	},
});

export default React.memo(ImageItem);
