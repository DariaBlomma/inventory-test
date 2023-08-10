<template>
	<div class="game-view">
		<DragErrorMessage />
		<FreeInventoryList />
		<LeftSidebar />
		<div class="field">
			<InventoryFeild />
			<InventoryDetailModal />
		</div>
		<BottomSidebar />
	</div>
</template>

<script
		setup
		lang="ts"
>
import { onBeforeMount } from 'vue';
import LeftSidebar from '@/components/LeftSidebar.vue';
import BottomSidebar from '@/components/BottomSidebar.vue';
import InventoryFeild from '@/components/InventoryField.vue';
import InventoryDetailModal from '@/components/InventoryDetailModal.vue';
import FreeInventoryList from '@/components/FreeInventoryList.vue';
import DragErrorMessage from '@/components/DragErrorMessage.vue';
import { useInventoryStore } from '@/stores';

const inventoryStore = useInventoryStore();

onBeforeMount(() => {
	inventoryStore.getLists();
});
</script>

<style
		scoped
		lang="scss"
>
.game-view {
	padding: 32px;
	display: grid;
	grid-template-areas:
    "error error"
    "freeList freeList"
    "leftSidebar field"
    "bottomSidebar bottomSidebar";
	grid-template-columns: 1fr 2fr;
	grid-template-rows: 1fr 1fr 500px 72px;
	grid-gap: 24px;
}

.field {
	grid-area: field;
	position: relative;
}

@media (min-width: 1024px) {
	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}
}
</style>
