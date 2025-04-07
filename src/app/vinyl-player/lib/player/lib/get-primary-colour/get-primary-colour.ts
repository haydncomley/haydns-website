const rgbToHsl = (r: number, g: number, b: number) => {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0,
		s = 0,
		l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return { h: h * 360, s: s * 100, l: l * 100 };
};

export const getPrimaryColour = (img: HTMLImageElement) =>
	new Promise<string>((resolve, reject) => {
		img.onerror = reject;

		img.onload = () => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);

			const imageData = ctx.getImageData(
				0,
				0,
				canvas.width,
				canvas.height,
			).data;
			const colors: {
				rgb: string;
				hsl: { h: number; s: number; l: number };
			}[] = [];

			// Sample every 4th pixel for performance
			for (let i = 0; i < imageData.length; i += 16) {
				const r = imageData[i];
				const g = imageData[i + 1];
				const b = imageData[i + 2];
				const hsl = rgbToHsl(r, g, b);

				// Filter for vibrant colors: high saturation (>30%), moderate lightness (between 25% and 75%)
				if (hsl.s > 30 && hsl.l > 25 && hsl.l < 75) {
					colors.push({
						rgb: `rgb(${r},${g},${b})`,
						hsl,
					});
				}
			}

			// Sort by saturation and pick the most saturated color
			const vibrantColor =
				colors.sort((a, b) => b.hsl.s - a.hsl.s)[0]?.rgb || 'rgb(0,0,0)';
			const rbgToHex = (rgb: string) => {
				const [r, g, b] = rgb
					.replace('rgb(', '')
					.replace(')', '')
					.split(',')
					.map(Number);
				return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
			};

			resolve(rbgToHex(vibrantColor));
		};
	});
