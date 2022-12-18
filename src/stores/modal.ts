import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false);
  const isDialogOpen = ref(false);

  const open = () => {
    isOpen.value = true;
  };

  const openDialog = () => {
    isDialogOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  const closeDialog = () => {
    isDialogOpen.value = false;
  };

  return { isOpen, isDialogOpen, open, openDialog, close, closeDialog }
})
