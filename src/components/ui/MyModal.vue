<template>
	<div
			class="modal"
			v-if="modalStore.isOpen"
	>
		<div class="modal__content">
			<img
					src="@/assets/icons/cross.svg"
					class="modal__cross"
					@click="modalStore.close"
			>
			<slot></slot>
		</div>
	</div>
</template>

<script
		setup
		lang="ts"
>
import { useModalStore } from '@/stores/modal';

const modalStore = useModalStore();
</script>

<style
		scoped
		lang="scss"
>
.modal {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;

	&__content {
		position: relative;
		height: 100%;
	}

	&__cross {
		position: absolute;
		top: 14px;
		right: 14px;
		z-index: 1;
		transition: opacity 0.5s ease;

		&:hover {
			opacity: 0.5;
		}

		&:active {
			opacity: 0.8;
		}
	}
}

</style>
