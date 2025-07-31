<script lang="ts">
	import type Color from 'colorjs.io';

	type Props = {
		token: string;
		variant: string;
		color: Color;
	};

	const { token, variant, color }: Props = $props();
	const hex = $derived(color.to('srgb').toString({ format: 'hex' }));
	const { l, c, h } = $derived(color.to('oklch'));
	const fg = $derived(l > 0.5 ? 'black' : 'white');
</script>

<div style={`--bg: ${color.toString()}; --fg: ${fg};`}>
	<div class="left">
		<span>{token}</span>
		<span>{variant}</span>
		<span>{hex}</span>
	</div>
	<div class="right">
		<span>{`L: ${l.toFixed(4)}`}</span>
		<span>{`C: ${c.toFixed(4)}`}</span>
		<span>{`H: ${String(h.toFixed(2)).padStart(6, '0')}`}</span>
	</div>
</div>

<style>
	div {
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--fg);
		background-color: var(--bg);
		height: 4rem;
		width: 14rem;
		border-radius: 0.5rem;
	}

	.left {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}

	.right {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
	}
</style>
