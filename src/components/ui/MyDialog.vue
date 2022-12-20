<template>
  <div 
    v-if="modalStore.isDialogOpen"
    class="dialog" 
    :class="inner.dialogClass"
    >
    <MyInput 
      :inner="{
        type: inner.input.type,
        placeholder: inner.input.placeholder,
        validation: {
          min: inner.input.validation?.min,
          max: inner.input.validation?.max,
        },
        onInput: onInput,
      }"
      class="dialog__input"
      :class="inner.input.customClass"
    />
    <div class="dialog__footer">
      <MyButton 
        class="dialog__btn dialog__cancel-btn"
        name="Cancel"
        :class="[
          `${inner.dialogClass}__btn`,
          `${inner.dialogClass}__cancel-btn`
          ]"
        :is-disabled="false"
        @click="inner.onCancel"
      />
      <MyButton 
        class="dialog__btn dialog__confirm-btn"
        name="Confirm"
        :class="[
          `${inner.dialogClass}__btn`,
          `${inner.dialogClass}__confirm-btn`]
          "
        :is-disabled="!isInputValid"
        @click="inner.onConfirm({ value: inputNumberValue })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
import MyInput from '@/components/ui/MyInput.vue';
import MyButton from '@/components/ui/MyButton.vue';
import type { IInputEventParams, IMyDialogProps } from '@/types';
import { useModalStore } from '@/stores';

interface IProps { 
  inner: IMyDialogProps,
}

const props = defineProps<IProps>();
const { inner } = toRefs(props);
const modalStore = useModalStore();

const isInputValid = ref(false);
const inputNumberValue = ref(0);

const onInput = ({ valueNumber, isValid } : IInputEventParams) => {
  isInputValid.value = isValid;
  if (isValid && valueNumber !== undefined) {
      inputNumberValue.value = valueNumber;
  }
} 
</script>

<style scoped lang="scss">
@import '@/styles';
.dialog {
  border: 1px solid $black_600;
  padding: 20px 21px;
  width: 100%;
  background-color: $black_800;

  &__input {
    margin-bottom: 20px;
  }

  &__footer {
    display: flex;
    justify-content:space-between;
    gap: 10px;
  }

  &__btn {
    padding: 8px;
    width: 100%;
    box-shadow: -1px 2px 19px 3px $red_opacity;
  }

  &__confirm-btn {
    background-color: $red;
    color: white;
  }
}
</style>