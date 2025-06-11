import axios from "axios";

export const enhancedImageAPI = async (file) => {
	try {
		const task_id = await uploadImage(file);
		const enhancedImageData = await pollForEnhancedImage(task_id);

		return enhancedImageData;
	} catch (error) {
		console.log(error);
	}
};

const uploadImage = async (file) => {
	const formData = new FormData();
	formData.append("image_file", file);
	const { data } = await axios.post(
		`${import.meta.env.VITE_BASE_URL}/api/tasks/visual/scale`,
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
				"X-API-KEY": import.meta.env.VITE_API_KEY,
			},
		}
	);

	if (!data?.data?.task_id) {
		throw new Error("Image upload failed");
	}
	return data.data.task_id;
};

const pollForEnhancedImage = async (task_id, retries = 0) => {
	const result = await fetchEnhanceImage(task_id)

	if (result.state === 4) {
		if (retries >= 20) {
			throw new Error("Max retries reached, failed to fetch enhanced image")
		}

		await new Promise((resolve) => setTimeout(resolve, 2000))

		return pollForEnhancedImage(task_id, retries + 1)
	}

	return result
}

const fetchEnhanceImage = async (task_id) => {
	const { data } = await axios.get(
		`${import.meta.env.VITE_BASE_URL}/api/tasks/visual/scale/${task_id}`,
		{
			headers: {
				"X-API-KEY": import.meta.env.VITE_API_KEY,
			},
		}
	);

	if (!data?.data) {
		throw new Error("Failed to fetch enhanced image");
	}

	return data.data;
};
