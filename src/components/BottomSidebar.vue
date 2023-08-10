<template>
	<div class="block sidebar">
		<img
				src="@/assets/icons/cross.svg"
				class="sidebar__cross"
		>
		<div class="sidebar__inner"></div>
	</div>
</template>

<script
		setup
		lang="ts"
>
</script>

<style
		scoped
		lang="scss"
>
.sidebar {
	position: relative;
	grid-area: bottomSidebar;
	padding: 18px;
	padding-right: 68px;

	&__cross {
		position: absolute;
		top: 14px;
		right: 14px;
	}

	&__inner {
		min-height: 36px;
		background: $gradient-bg;
		border-radius: $block-border-radius;
	}
}
</style>
