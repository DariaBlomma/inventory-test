<template>
	<span class="msg">{{ inventoryStore.dragError }}</span>
</template>

<script
		setup
		lang="ts"
>
import { useInventoryStore } from '@/stores';

const inventoryStore = useInventoryStore();
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
