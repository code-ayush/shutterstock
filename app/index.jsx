import React, { useState, useEffect, useCallback } from "react";
import {
	SafeAreaView,
	StyleSheet,
	TextInput,
	Button,
	View,
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import ImageGrid from "../components/ImageGrid";
import { searchImages } from "../api";
import useDebounce from "../hooks/useDebounce";
import { PER_PAGE } from "../constants";

const App = () => {
	const [query, setQuery] = useState("nature");
	const [images, setImages] = useState([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [loading, setLoading] = useState(false);
	const [refreshing, setRefreshing] = useState(false);
	const debouncedQuery = useDebounce(query, 500);

	const loadImages = useCallback(async () => {
		if (loading || !hasMore) return;

		setLoading(true);
		try {
			const data = await searchImages(debouncedQuery, page);

			if (data?.data)
				setImages((prevImages) =>
					page === 1 ? data.data : [...prevImages, ...data.data]
				);
			const totalPages = Math.ceil(data.total_count / PER_PAGE);
			if (page >= totalPages) {
				setHasMore(false);
			}
		} catch (error) {
			console.error("Error fetching images:", error);
		} finally {
			setLoading(false);
		}
	}, [debouncedQuery, page, loading]);

	useEffect(() => {
		loadImages();
	}, [page]);

	useEffect(() => {
		setPage(1);
		setHasMore(true);
	}, [debouncedQuery]);

	const handleSearch = () => {
		setImages([]);
		setPage(1);
		setHasMore(true);
		loadImages();
	};

	const handleRefresh = () => {
		setRefreshing(true);
		setPage(1);
		setHasMore(true);
		loadImages().finally(() => setRefreshing(false));
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<SafeAreaView style={styles.container}>
				<View style={styles.searchContainer}>
					<TextInput
						style={styles.searchInput}
						placeholder="Search images..."
						value={query}
						onChangeText={setQuery}
						returnKeyType="search"
						onSubmitEditing={handleSearch}
					/>
					<Button title="Search" onPress={handleSearch} />
				</View>
				<ImageGrid
					images={images}
					onEndReached={() => setPage((prevPage) => prevPage + 1)}
					refreshing={refreshing}
					onRefresh={handleRefresh}
				/>
				{loading && (
					<ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
				)}
			</SafeAreaView>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	searchContainer: {
		flexDirection: "row",
		padding: 10,
		alignItems: "center",
		justifyContent: "space-between",
	},
	searchInput: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 10,
		marginRight: 10,
		borderRadius: 5,
	},
	loading: {
		position: "absolute",
		bottom: 0,
		height: 60,
		left: 0,
		right: 0,
		backgroundColor: "rgba(255, 255, 255, 0.5)",
	},
	fullPageLoading: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		top: 0,
	},
});

export default App;
