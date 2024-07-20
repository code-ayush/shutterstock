import React from "react";
import { FlatList, ActivityIndicator } from "react-native";
import ImageItem from "./ImageItem";

const ImageGrid = ({ images, onEndReached, refreshing, onRefresh }) => (
	<FlatList
		data={images}
		renderItem={({ item }) => <ImageItem item={item} />}
		keyExtractor={(item) => item.id}
		numColumns={2}
		onEndReached={onEndReached}
		onEndReachedThreshold={0.5}
		refreshing={refreshing}
		onRefresh={onRefresh}
		ListFooterComponent={
			refreshing ? <ActivityIndicator size="large" color="#0000ff" /> : null
		}
	/>
);

export default React.memo(ImageGrid);
