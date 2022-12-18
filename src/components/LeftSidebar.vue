<template>
    <div class="block sidebar">
      <img src="@/assets/leftSidebar/imgBlur.png" class="detail__img"> 
      <div 
        class="empty-content"
      >
        <div 
          v-for="(item, index) in 7"
          :key="index"
          class="empty-content__elem"
          :class="`empty-content__elem--${index}`"
        ></div>
      </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@import '@/styles';
.sidebar {
  padding: 18px 14px 24px;
  width: fit-content;
  grid-area: leftSidebar;

  &__img {
    margin-bottom: 20px;
  }
}
</style>