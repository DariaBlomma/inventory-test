<template>
	<div class="list">
		<InventoryItem
				v-for="item in freeList"
				:key="item.type"
				class="list__item"
				:item="item"
				draggable="true"
				@dragstart="onDragItemStart({ event: $event, item })"
		/>
	</div>
</template>

<script
		setup
		lang="ts"
>
import { storeToRefs } from 'pinia';
import { useInventoryStore } from '@/stores';
import InventoryItem from './InventoryItem.vue';

const inventoryStore = useInventoryStore();
const {freeList} = storeToRefs(inventoryStore);
const {onDragItemStart} = inventoryStore;
</script>

<style
		scoped
		lang="scss"
>
.list {
	display: flex;
	gap: 15px;
	grid-area: freeList;

	&__item {
		height: min-content;
	}
}
</style>
