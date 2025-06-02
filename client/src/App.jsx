import Home from "./components/Home";

export const App = () => {
	return (
		<main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-8 px-4">
			<div className="text-center mb-8">
				<h1>AI Image Enhancer</h1>
			</div>
			<Home />
			<div className="text-lg text-gray-500">
				Upload your image and let AI enhance in a seconds
			</div>
		</main>
	);
};
