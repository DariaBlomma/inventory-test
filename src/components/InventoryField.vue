<template>
	<div class="block field">
		<div
				v-for="(row, rowIndex) in rows"
				:key="rowIndex"
				class="field__row"
		>
			<div
					v-for="(column, colIndex) in columns"
					:key="colIndex"
					class="field__cell"
					:class="{
          'field__cell--isDraggedOver':
          draggedOverCell?.colId === colIndex &&
          draggedOverCell?.rowId === rowIndex
          }"
					:data-row-id="rowIndex"
					:data-col-id="colIndex"
					:data-is-busy="false"
					@dragover.prevent="onDragOverCell"
					@drop="onDropItem"
			>
				<div
						v-for="item in slotsList"
						:key="item.type"
				>
					<InventoryItem
							class="item-in-slot"
							v-if="item.rowId === rowIndex &&
              item.colId === colIndex"
							:item="item"
							@click="onItemClick(item)"
							draggable="true"
							@dragstart="onDragItemStart({ event: $event, item })"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script
		setup
		lang="ts"
>
import { storeToRefs } from 'pinia';
import type { InventoryDetail } from '@/types';
import InventoryItem from './InventoryItem.vue';
import {
	useInventoryStore,
	useModalStore,
} from '@/stores';

const rows: number = 5;
const columns: number = 5;

const modalStore = useModalStore();
const inventoryStore = useInventoryStore();
const {
	slotsList,
	draggedOverCell,
} = storeToRefs(inventoryStore);
const {
	onDragItemStart,
	setClickedItem,
	onDropItem,
	onDragOverCell,
} = inventoryStore;

const onItemClick = (item: InventoryDetail) => {
	setClickedItem(item);
	modalStore.open();
};
</script>

<style
		scoped
		lang="scss"
>
.field {
	display: grid;
	grid-template-rows: repeat(5, 1fr);
	width: max-content;
	height: 100%;
	overflow: hidden; //hide corners of cells

	&__row {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		width: 100%;
	}

	&__cell {
		position: relative;
		min-width: 105px;
		min-height: 98px;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: background-color 0.3s ease;
		border: 1px solid $black_600;

		&:hover {
			background-color: $black_700;
		}

		&--isDraggedOver {
			background-color: $black_700;
		}
	}
}

.item-in-slot {
	position: static;
}
</style>
