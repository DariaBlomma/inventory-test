<template>
	<button
			type="button"
			class="btn"
			:disabled="isDisabled"
	>
		{{ name }}
	</button>
</template>

<script
		setup
		lang="ts"
>
defineProps<{
	name: string,
	isDisabled: boolean,
}>();
</script>

<style
		scoped
		lang="scss"
>
.btn {
	background-color: #fff;
	border-radius: 8px;
	color: #000;
	padding: 11px;
	transition: opacity 0.5s ease;

	&:hover {
		opacity: 0.5;
	}

	&:active {
		opacity: 0.8;
	}

	&:disabled {
		opacity: 0.5;
	}
}
</style>
