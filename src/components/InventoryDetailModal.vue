<template>
	<MyModal>
		<div class="block inventory-detail">
			<div class="flex-centered inventory-detail__upper-block">
				<img
						:src="`/inventoryImages/${clickedItem?.image}.png`"
						class="inventory-detail__img"
				>
			</div>
			<div
					class="empty-content"
			>
				<div
						v-for="(item, index) in emptyPreloderLines"
						:key="index"
						class="empty-content__elem inventory-detail__stub"
						:class="[`empty-content__elem--${index}`, `inventory-detail__stub--${index}`]"
				></div>
			</div>

			<div class="inventory-detail__footer">
				<MyButton
						class="inventory-detail__delete-btn"
						name="Delete inventory"
						:isDisabled="false"
						@click="modalStore.openDialog"
				/>
			</div>
			<div class="inventory-detail__dialog">
				<MyDialog
						type="number"
						placeholder="Enter amount"
						:validation="{
                min: 0,
                max: clickedItem?.amount,
              }"
						:onCancel="cancelClick"
						:onConfirm="submitInventoryDelete"
				/>
			</div>
		</div>
	</MyModal>
</template>

<script
		setup
		lang="ts"
>
import { storeToRefs } from 'pinia';
import MyButton from '@/components/ui/MyButton.vue';
import MyModal from '@/components/ui/MyModal.vue';
import MyDialog from '@/components/ui/MyDialog.vue';
import type { OnDialogConfirm } from '@/types';
import {
	useInventoryStore,
	useModalStore,
} from '@/stores';

const emptyPreloderLines = 6;
const modalStore = useModalStore();
const inventoryStore = useInventoryStore();
const {clickedItem} = storeToRefs(inventoryStore);
const {decreaseItemAmount} = inventoryStore;

const cancelClick = () => {
	modalStore.closeDialog();
};

const submitInventoryDelete = ({value}: OnDialogConfirm) => {
	if (typeof value !== 'number') return;
	decreaseItemAmount(value);
	if (clickedItem === undefined) {
		modalStore.close();
	}
};

</script>

<style
		scoped
		lang="scss"
>
.inventory-detail {
	padding: 15px 15px 18px;
	height: 100%;
	background-color: rgba($black_800, 0.5);
	backdrop-filter: blur(8px);

	&__upper-block {
		padding: 30px;
		border-bottom: 1px solid $black_600;
		margin-bottom: 16px;
	}

	&__img {
		width: 130px;
	}

	&__stub {
		width: 211px;

		&:first-child {
			width: 211px;
			height: 30px;
		}

		&--4 {
			width: 180px;
		}

		&:last-child {
			margin-top: 0;
			margin-bottom: 24px;
		}
	}

	&__footer {
		border-top: 1px solid $black_600;
		padding-top: 18px;
	}

	&__delete-btn {
		background-color: $red_300;
		color: #fff;
		width: 100%;
	}

	&__dialog {
		position: absolute;
		bottom: 0;
		right: 0;
		left: 0;
		border-bottom-right-radius: 12px;
		overflow: hidden;
	}
}
</style>
