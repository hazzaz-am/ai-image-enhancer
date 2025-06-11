import { Slide, toast } from "react-toastify";

export const handleDownload = async (imageUrl) => {
	try {
		const response = await fetch(imageUrl);
		const blob = await response.blob();
		const fileName = `${new Date().getTime()}.png`;

		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		a.remove();
		URL.revokeObjectURL(url);
	} catch (err) {
		const settings = {
			position: "top-center",
			autoClose: 2000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
			transition: Slide,
		};
		if (err instanceof Error) {
			toast.error(err.message, settings);
		} else {
			toast.error("Something Wrong", settings);
		}
	}
};
