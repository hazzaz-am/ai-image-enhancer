import { useState } from "react";
import ImagePreview from "./ImagePreview";
import ImageUploader from "./ImageUploader";
import { enhancedImageAPI } from "../utils/enhancedImageAPI";

export default function Home() {
	const [uploadedImage, setUploadedImage] = useState(null)
	const [enhancedImage, setEnhancedImage] = useState(null)
	const [loading, setLoading] = useState(false)

	const handleImageUpload = async (file) => {
		setUploadedImage(URL.createObjectURL(file))
		setLoading(true)

		try {
			const enhancedUrl = await enhancedImageAPI(file)
			setEnhancedImage(enhancedUrl)
			setLoading(false)
		} catch (error) {
			console.log(error);
			setUploadedImage(null)
			setLoading(false)
		}
	}

	return (
		<>
			<ImageUploader onImageUpload={handleImageUpload} />
			<ImagePreview uploaded={uploadedImage} enhanced={enhancedImage} loading={loading} />
		</>
	);
}
