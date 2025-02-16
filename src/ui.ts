console.log("Hello World!");
document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("shorten-form");
	if (!form) {
		console.error("Could not find form element");
		return;
	}

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		handleFormSubmit();
	});

	const copyButton = document.querySelector(".copy-button");
	if (!copyButton) {
		console.error("Could not find copy button element");
		return;
	}
	copyButton.addEventListener("click", copyToClipboard);
});

function handleFormSubmit() {
	const urlInput = document.getElementById("url") as HTMLInputElement;
	const url = urlInput.value;
	urlInput.value = "";
	console.log(encodeURIComponent(url));
	const response = fetch(
		`https://url-shortener-deno-api.deno.dev/shorten/${encodeURIComponent(url)}`,
	);
	response.then(async (response) => {
		const json = await response.json();
		const text: string = json.url;
		console.log(text);
		const shortenedUrl = document.querySelector(
			".shortened-url-field",
		) as HTMLElement;
		if (!shortenedUrl) {
			console.error("Could not find shortened-url element");
			return;
		}
		shortenedUrl.appendChild(document.createTextNode(`https://${text}`));
	});
}

function copyToClipboard() {
	const shortenedUrl = document.querySelector(
		".shortened-url-field",
	) as HTMLElement;
	if (!shortenedUrl) {
		console.error("Could not find shortened-url element");
		return;
	}
	const url = shortenedUrl.textContent;
	if (!url) {
		console.error("Could not find url in shortened-url element");
		return;
	}
	navigator.clipboard.writeText(url);
}
