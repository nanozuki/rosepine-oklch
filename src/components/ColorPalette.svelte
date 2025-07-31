<script lang="ts">
	import ColorBlock from '$components/ColorBlock.svelte';
	import Color from 'colorjs.io';

	type ColorPalette<Token extends string, Variant extends string> = Record<
		Token,
		Partial<Record<Variant, Color>>
	>;

	const { palette }: { palette: ColorPalette<any, any> } = $props();
	const [tokens, variants] = $derived.by(() => {
		const tokens: string[] = [];
		const variants: string[] = [];
		for (const [token, value] of Object.entries(palette)) {
			if (!tokens.includes(token)) {
				tokens.push(token);
			}
			for (const [variant, color] of Object.entries(value)) {
				if (!variants.includes(variant)) {
					variants.push(variant);
				}
			}
		}
		return [tokens, variants];
	});
</script>

<div class="grid" style={`--col-count: ${tokens.length}; --row-count: ${variants.length}`}>
	{#each variants as variant}
		{#each tokens as token}
			{#if palette[token]?.[variant]}
				<ColorBlock {token} {variant} color={palette[token][variant]} />
			{:else}
				<div></div>
			{/if}
		{/each}
	{/each}
</div>

<style>
	.grid {
		display: grid;
		gap: 0.5rem;
		grid-template-columns: repeat(var(--col-count), 1fr);
		grid-template-rows: repeat(var(--row-count), 1fr);
	}
</style>
