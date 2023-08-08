<template>
	<div class="colors">
		<div class="color-ex black-900">900</div>
		<div class="color-ex black-800">800</div>
		<div class="color-ex black-700">700</div>
		<div class="color-ex black-600">600</div>
		<div class="color-ex gradient">Gradient</div>
	</div>
</template>

<style
		scoped
		lang="scss"
>
.colors {
	display: flex;
}

.color-ex {
	padding: 50px;
	color: white;
}

.black-900 {
	background-color: $black_900;
}

.black-800 {
	background-color: $black_800;
}

.black-700 {
	background-color: $black_700;
}

.black-600 {
	background-color: $black_600;
}

.gradient {
	background: $gradient-bg;
}
</style>
