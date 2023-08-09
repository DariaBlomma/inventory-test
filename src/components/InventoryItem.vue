<template>
	<div
			class="item"
			@click="onClick"
	>
		<img
				:src="`/inventoryImages/${item.image}.png`"
				class="item__image"
		>
		<div class="item__amount">
			<span class="item__amount--text">{{ item.amount }}</span>
		</div>
	</div>
</template>

<script
		setup
		lang="ts"
>
import { reactive } from 'vue';
import type { InventoryDetail } from '@/types';

interface Props {
	item: InventoryDetail,
	onClick?: () => void;
}

const props = defineProps<Props>();
const {item, onClick} = reactive(props);
</script>

<style
		scoped
		lang="scss"
>
.item {
	position: relative;

	&__amount {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 16px;
		height: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 1px solid $black_600;
		border-top-left-radius: 6px;


		&--text {
			color: white;
			font-family: "Inter";
			font-style: normal;
			font-weight: 500;
			font-size: 10px;
			line-height: 12px;
			opacity: 0.4;
		}
	}
}

</style>
