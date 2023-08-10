<template>
	<span class="msg">{{ dragError }}</span>
</template>

<script
		setup
		lang="ts"
>
import { useInventoryStore } from '@/stores';
import { storeToRefs } from 'pinia';

const inventoryStore = useInventoryStore();
const {dragError} = storeToRefs(inventoryStore);
</script>

<style
		scoped
		lang="scss"
>
.msg {
	color: $red_300;
	grid-area: error;
}
</style>
