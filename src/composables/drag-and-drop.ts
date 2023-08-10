import type { UnwrapRef } from 'vue';
import { ref } from 'vue';

interface DragStartParams<I> {
  event: DragEvent,
  item: UnwrapRef<I>,
  fromElemSelector: string,
}

//I - item,
//D - dataset,
//O - draggedOverParams
export function useDragAndDrop<I, D extends DOMStringMap, O>(
  parseDatasetCb: (dataset: D) => O,
  moveItemCb: () => void,
) {
  const isDragValid = ref(true);
  const draggedItem = ref<I | undefined>(undefined);
  const dragError = ref('');
  const draggedOverParams = ref<O | undefined>(undefined);
  const draggedFromElem = ref<HTMLDivElement | undefined>(undefined);
  const draggedFromElemSelector = ref('');
  
  const onDragStart = ({event, item, fromElemSelector}: DragStartParams<I>) => {
    if (event === null || event.dataTransfer === null) return;
    draggedFromElemSelector.value = fromElemSelector;
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.effectAllowed = 'move';
    draggedItem.value = item;
    const target = getElemFromEvent(event);
    if (!target) return;
    draggedFromElem.value = target;
  };
  
  /**
   * Gets data about the dragged over elem from its dataset.
   * Can be used To indicate with styles the dragged over elem
   */
  const onDragOver = (event: DragEvent) => {
    const params = getDataFromEvent(event);
    if (!params) return;
    
    draggedOverParams.value = params;
  };
  
  const onDrop = (event: DragEvent) => {
    draggedOverParams.value = undefined;
    
    const isValid = checkIsDragValid(event);
    if (!isValid) return;
    
    if (!draggedItem.value) return;
    const params = getDataFromEvent(event);
    if (!params) return;
    draggedItem.value = {...draggedItem.value, ...params};
    moveItemCb();
    
    const target = getElemFromEvent(event);
    if (!target) return;
    target.dataset.isBusy = 'true';
    
    draggedItem.value = undefined;
    
    if (draggedFromElem.value) {
      // * clear previous place, mark as free
      draggedFromElem.value.dataset.isBusy = 'false';
    }
  };
  
  function getDataFromEvent(event: DragEvent): O | void {
    const target = getElemFromEvent(event);
    if (!target) return;
    
    const dataset = target.dataset as D;
    return parseDatasetCb(dataset);
  }
  
  //todo: call this check after init with saved data from LC
  /**
   * Check if the place is already busy or not
   */
  const checkIsDragValid = (event: DragEvent): boolean => {
    const target = getElemFromEvent(event);
    if (!target) return false;
    
    const condition = target.dataset.isBusy === 'true';
    if (condition) {
      draggedItem.value = undefined;
      isDragValid.value = false;
      dragError.value = 'Drag is invalid - the field is already busy';
      console.error('Error in onDrop: drag is invalid!');
      return false;
    }
    
    isDragValid.value = true;
    dragError.value = '';
    
    return true;
  };
  
  const getElemFromEvent = (event: DragEvent): HTMLDivElement | void => {
    if (!event || !event.target) return;
    const target = (event.target as HTMLElement).closest(draggedFromElemSelector.value);
    if (!target || !(target as HTMLDivElement).dataset) return;
    return target as HTMLDivElement;
  };
  
  return {
    dragError,
    draggedItem,
    draggedOverParams,
    onDragStart,
    onDragOver,
    onDrop,
  };
}
