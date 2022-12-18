<template>
  <div 
    class="stubs"
  >
    <div 
      v-for="(item, index) in props.amount"
      :key="index"
      class="stubs__elem"
      :class="[props.baseClass, `${props.baseClass}--${index}`]"
    ></div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  amount?: number,
  baseClass?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  amount: 7,
});
</script>
<style scoped lang="scss">
@import '@/styles';

.stubs {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  &__elem {
    background: $gradient-bg;
    border-radius: 8px;
    margin-bottom: 16px;
    height: 10px;
    width: 140px;

    &:first-child {
      width: 190px;
      height: 26px;
      margin-bottom: 24px;
    }

    &--1 {
      width: 155px;
    }

    &--2 {
      width: 190px;
    }

    &--3 {
      width: 170px;
    }

    &--4 {
      width: 160px;
    }

    &:last-child {
      margin-top: 24px;
      width: 80px;
    }
  }
}

</style>