import { variants } from '$lib/rosepine';
import Color from 'colorjs.io';

const original = variants.dawn.colors;

type ColorPalette<Token extends string, Variant extends string> = Record<
	Token,
	Partial<Record<Variant, Color>>
>;

type RosePineTokens =
	| 'white'
	| 'black'
	| 'love'
	| 'gold'
	| 'rose'
	| 'pine'
	| 'foam'
	| 'iris'
	| 'grey';
type RosePineVariants = 'med' | 'lighten' | 'darken';

export const originalPalette: ColorPalette<RosePineTokens, RosePineVariants> = {
	white: {
		lighten: new Color(`#${original.surface.hex}`),
		med: new Color(`#${original.base.hex}`),
		darken: new Color(`#${original.overlay.hex}`)
	},
	black: {
		lighten: new Color(`#${original.muted.hex}`),
		med: new Color(`#${original.subtle.hex}`),
		darken: new Color(`#${original.text.hex}`)
	},
	love: {
		med: new Color(`#${original.love.hex}`)
	},
	gold: {
		med: new Color(`#${original.gold.hex}`)
	},
	rose: {
		med: new Color(`#${original.rose.hex}`)
	},
	pine: {
		med: new Color(`#${original.pine.hex}`)
	},
	foam: {
		med: new Color(`#${original.foam.hex}`)
	},
	iris: {
		med: new Color(`#${original.iris.hex}`)
	},
	grey: {
		lighten: new Color(`#${original.highlightLow.hex}`),
		med: new Color(`#${original.highlightMed.hex}`),
		darken: new Color(`#${original.highlightHigh.hex}`)
	}
};

function adjustPalette(
	palette: ColorPalette<RosePineTokens, RosePineVariants>
): ColorPalette<RosePineTokens, RosePineVariants> {
	const adjusted: Partial<ColorPalette<RosePineTokens, RosePineVariants>> = {};
	for (const token in palette) {
		const tok = token as RosePineTokens;
		const org = palette[tok]!;
		adjusted[tok] = {};
		switch (tok) {
			case 'white':
				adjusted[tok] = {
					lighten: new Color('oklch', [0.98, 0.0115, 72]),
					med: new Color('oklch', [0.96, 0.0115, 72]),
					darken: new Color('oklch', [0.94, 0.0115, 72])
				};
				break;
			case 'black':
				adjusted[tok] = {
					lighten: new Color('oklch', [0.65, 0.0629, 290]),
					med: new Color('oklch', [0.55, 0.0629, 290]),
					darken: new Color('oklch', [0.45, 0.0629, 290])
				};
				break;
			case 'grey':
				adjusted[tok] = {
					lighten: new Color('oklch', [0.95, 0.0101, 60]),
					med: new Color('oklch', [0.9, 0.0101, 60]),
					darken: new Color('oklch', [0.85, 0.0101, 60])
				};
				break;
			default:
				adjusted[tok] = {
					lighten: new Color('oklch', [0.75, org.med!.oklch.c, org.med!.oklch.h]),
					med: new Color('oklch', [0.6, org.med!.oklch.c, org.med!.oklch.h]),
					darken: new Color('oklch', [0.45, org.med!.oklch.c, org.med!.oklch.h])
				};
		}
	}
	return adjusted as ColorPalette<RosePineTokens, RosePineVariants>;
}

export const adjustedPalette = adjustPalette(originalPalette);
