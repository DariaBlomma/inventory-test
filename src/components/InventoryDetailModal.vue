<template>
  <MyModal>
      <div class="block inventory-detail">
        <div class="flex-centered inventory-detail__upper-block">
            <img 
              :src="`/inventoryImages/${inventoryStore.clickedItem?.image}.png`"
              class="inventory-detail__img"
            >
        </div>
        <div 
        class="empty-content"
      >
        <div 
          v-for="(item, index) in 6"
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
          :inner="{
            input: {
              type: 'number',
              placeholder: 'Enter amount',
              validation: {
                min: 0,
                max: inventoryStore.clickedItem?.amount,
              },
            },
            onCancel: cancelClick,
            onConfirm: submitInventoryDelete,
          }"
        />
      </div>
      </div>
  </MyModal>
</template>

<script setup lang="ts">
import MyButton from '@/components/ui/MyButton.vue';
import MyModal from '@/components/ui/MyModal.vue';
import MyDialog from '@/components/ui/MyDialog.vue';
import type { IOnDialogConfirm } from '@/types';
import { useModalStore, useInventoryStore } from '@/stores';

const modalStore = useModalStore();
const inventoryStore = useInventoryStore();

const cancelClick = () => {
  modalStore.closeDialog();
};

const submitInventoryDelete = ({ value } : IOnDialogConfirm) => {
  console.log('value: ', value);

};

</script>

<style scoped lang="scss">
@import '@/styles';

.inventory-detail {
  padding: 15px 15px 18px;
  height: 100%;
  background-color: $black_800_opacity;
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
    background-color: $red;
    color: white;
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