<script lang="ts">
	import './app.css';
	import ColorPalette from '$components/ColorPalette.svelte';
	import { originalPalette, adjustedPalette } from '$lib/colors';
</script>

<div>
	<h3>Original Palette</h3>
	<ColorPalette palette={originalPalette} />
	<h3>Adjusted Palette</h3>
	<ColorPalette palette={adjustedPalette} />
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	}
</style>
