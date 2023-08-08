<template>
	<div
			class="error"
	>
		<div
				class="error__message"
				:class="{ visible: props.inner.error }"
		>
			{{ props.inner.error }}
		</div>
	</div>
</template>

<script
		setup
		lang="ts"
>
import type { IMyErrorMessage } from '@/types';

interface IProps {
	inner: IMyErrorMessage,
}

const props = defineProps<IProps>();
</script>


<style
		scoped
		lang="scss"
>
.error {
	position: absolute;
	z-index: 1;
	bottom: -30px;

	&__message {
		padding: 7px;
		width: fit-content;
		background-color: $red_300;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 8px;
		font-weight: 700;
		font-size: 12px;
		line-height: 14px;
		color: white;
		position: relative;
		opacity: 0;
		transition: opacity 0.5s ease;

		&::after {
			content: "";
			position: absolute;
			left: 45%;
			top: -20px;
			border: 10px solid transparent;
			border-bottom-color: $red_300;
		}

		&.visible {
			opacity: 0.9;
		}
	}
}

</style>
