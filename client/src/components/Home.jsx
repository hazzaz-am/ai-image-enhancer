import { useState } from "react";
import ImagePreview from "./ImagePreview";
import ImageUploader from "./ImageUploader";
import { enhancedImageAPI } from "../utils/enhancedImageAPI";
import { handleDownload } from "../utils/downloadImage";

export default function Home() {
	const [uploadedImage, setUploadedImage] = useState(null);
	const [enhancedImage, setEnhancedImage] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleImageUpload = async (file) => {
		setUploadedImage(URL.createObjectURL(file));
		setLoading(true);

		try {
			const enhancedUrl = await enhancedImageAPI(file);
			setEnhancedImage(enhancedUrl);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setUploadedImage(null);
			setLoading(false);
		}
	};

	return (
		<>
			<ImageUploader onImageUpload={handleImageUpload} />
			<ImagePreview
				uploaded={uploadedImage}
				enhanced={enhancedImage?.image}
				loading={loading}
			/>
			{enhancedImage?.image && (
				<div className="text-center">
					<button
						onClick={() => handleDownload(enhancedImage.image)}
						className="bg-blue-800 text-white px-4 py-2 rounded-md cursor-pointer mt-10"
					>
						Download
					</button>
				</div>
			)}
		</>
	);
}
