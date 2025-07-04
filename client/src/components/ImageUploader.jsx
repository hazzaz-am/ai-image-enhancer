
export default function ImageUploader({ onImageUpload }) {
    const handleImageFile = (e) => {
        const imageFile = e.target.files[0];
        onImageUpload(imageFile)
    }
    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
            <label htmlFor="fileInput" className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-all">
                <input type="file" name="fileInput" id="fileInput" className="hidden" onChange={handleImageFile} />
                <span className="text-lg font-medium text-gray-600">Click and drag to upload your image</span>
            </label>
        </div>
    );
}