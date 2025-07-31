import { variants } from '$lib/rosepine';
import Color from 'colorjs.io';

const original = variants.dawn.colors;

type ColorPalette<Token extends string, Variant extends string> = Record<
	Token,
	Partial<Record<Variant, Color>>
>;

type RosePineTokens =
	| 'white'
	| 'grey'
	| 'black'
	| 'love'
	| 'gold'
	| 'rose'
	| 'pine'
	| 'foam'
	| 'iris';
type RosePineVariants = 'med' | 'lighten' | 'darken';

export const originalPalette: ColorPalette<RosePineTokens, RosePineVariants> = {
	white: {
		lighten: new Color(`#${original.surface.hex}`),
		med: new Color(`#${original.base.hex}`),
		darken: new Color(`#${original.overlay.hex}`),
	},
	grey: {
		lighten: new Color(`#${original.highlightLow.hex}`),
		med: new Color(`#${original.highlightMed.hex}`),
		darken: new Color(`#${original.highlightHigh.hex}`),
	},
	black: {
		lighten: new Color(`#${original.muted.hex}`),
		med: new Color(`#${original.subtle.hex}`),
		darken: new Color(`#${original.text.hex}`),
	},
	love: {
		med: new Color(`#${original.love.hex}`),
	},
	gold: {
		med: new Color(`#${original.gold.hex}`),
	},
	rose: {
		med: new Color(`#${original.rose.hex}`),
	},
	pine: {
		med: new Color(`#${original.pine.hex}`),
	},
	foam: {
		med: new Color(`#${original.foam.hex}`),
	},
	iris: {
		med: new Color(`#${original.iris.hex}`),
	},
};

type AdjustedTokens = 'bg' | 'fg' | 'rose' | 'gold' | 'love' | 'pine' | 'foam' | 'iris';
type AdjustedVariants = 'light2' | 'light1' | 'mid' | 'dark1' | 'dark2';
const midValue: Record<AdjustedTokens, [number, number, number]> = {
	bg: [0.9, 0.0115, 72],
	fg: [0.55, 0.0629, 290],
	love: [0.6, 0.1071, 2.66],
	gold: [0.6, 0.1459, 69.74],
	rose: [0.6, 0.1058, 23.03],
	pine: [0.6, 0.077, 228.0],
	foam: [0.6, 0.0661, 210.12],
	iris: [0.6, 0.0738, 305.7],
};
const lightnessSteps: Record<AdjustedTokens, number> = {
	bg: 0.05,
	fg: 0.1,
	love: 0.15,
	gold: 0.15,
	rose: 0.15,
	pine: 0.15,
	foam: 0.15,
	iris: 0.15,
};
const override: Partial<Record<AdjustedTokens, Partial<Record<AdjustedVariants, number>>>> = {
	bg: { light2: 0.985, light1: 0.96 },
};

export const adjustedPalette = (function buildAdjustedPalette() {
	const tokens = ['bg', 'fg', 'love', 'gold', 'rose', 'pine', 'foam', 'iris'] as AdjustedTokens[];
	const variants = ['light2', 'light1', 'mid', 'dark1', 'dark2'] as AdjustedVariants[];
	const palette: Partial<ColorPalette<AdjustedTokens, AdjustedVariants>> = {};
	const setColor = (
		token: AdjustedTokens,
		variant: AdjustedVariants,
		color: [number, number, number],
	) => {
		if (!palette[token]) {
			palette[token] = {};
		}
		palette[token]![variant] = new Color('oklch', color);
	};
	for (const token of tokens) {
		for (const variant of variants) {
			const [l, c, h] = midValue[token];
			const overrileLightness = override[token]?.[variant];
			if (overrileLightness) {
				setColor(token, variant, [overrileLightness, c, h]);
			} else {
				let lightness = l;
				switch (variant) {
					case 'light2':
						lightness += lightnessSteps[token] * 2;
						break;
					case 'light1':
						lightness += lightnessSteps[token];
						break;
					case 'dark1':
						lightness -= lightnessSteps[token];
						break;
					case 'dark2':
						lightness -= lightnessSteps[token] * 2;
						break;
				}
				setColor(token, variant, [lightness, c, h]);
			}
		}
	}
	return palette;
})();
