import axios from "axios";
import { API_KEY, PER_PAGE } from "../constants";

const axiosInstance = axios.create({
	baseURL: "https://api.shutterstock.com/v2",
	headers: {
		Authorization: `Bearer ${API_KEY}`,
	},
});

export const searchImages = async (query, page = 1) => {
	const response = await axiosInstance.get("/images/search", {
		params: {
			query,
			page,
			per_page: PER_PAGE,
		},
	});

	return response.data;
};
