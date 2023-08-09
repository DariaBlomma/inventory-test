<template>
	<div class="container">
		<input
				:value="value"
				:type="props.type"
				:placeholder="props.placeholder"
				class="input"
				:class="props.customClass"
				@input="onInput"
		>
		<MyErrorMessage
				:error="error"
		/>
	</div>
</template>

<script
		setup
		lang="ts"
>
import { ref } from 'vue';
import MyErrorMessage from '@/components/ui/MyErrorMessage.vue';
import type { InputEventParams } from '@/types';

interface Props {
	type: string,
	placeholder?: string,
	customClass?: string,
	validation?: {
		min?: number,
		max?: number,
	}
	onInput: ({event, valueString, valueNumber, isValid}: InputEventParams) => void;
}

const props = defineProps<Props>();

const value = ref('');
const isValid = ref(false);
const error = ref('');

const validateNumbers = (value: number | undefined) => {
	if (!props.validation ||
			props.validation.min === undefined ||
			props.validation.max === undefined) return;

	const min = props.validation.min;
	const max = props.validation.max;

	if (value === undefined || value < min) {
		isValid.value = false;
		error.value = `Min ${min}`;
		return;
	}

	if (value > max) {
		isValid.value = false;
		error.value = `Max ${max}`;
		return;
	}

	isValid.value = true;
	error.value = '';
};

const onInput = (event: Event) => {
	if (!event || !event.target) return;
	value.value = (event.target as HTMLInputElement).value;

	if (props.type === 'number') {
		const emitVal: number | undefined = value.value ? Number(value.value) : undefined;

		validateNumbers(emitVal);
		props.onInput({
			event,
			valueNumber: emitVal,
			isValid: isValid.value,
		});
	}
	if (props.type === 'text') {
		props.onInput({
			event,
			valueString: value.value.trim(),
			isValid: isValid.value,
		});
	}
};
</script>

<style
		scoped
		lang="scss"
>
.container {
	position: relative;
}
</style>
