<template>
	<div class="container">
		<input
				:value="value"
				:type="props.inner.type"
				:placeholder="props.inner.placeholder"
				class="input"
				:class="props.inner.customClass"
				@input="onInput"
		>
		<MyErrorMessage
				:inner="{error}"
		/>
	</div>
</template>

<script
		setup
		lang="ts"
>
import { ref } from 'vue';
import MyErrorMessage from '@/components/ui/MyErrorMessage.vue';
import type { IMyInputProps } from '@/types';

interface IProps {
	inner: IMyInputProps,
}

const props = defineProps<IProps>();

const value = ref('');
const isValid = ref(false);
const error = ref('');

const validateNumbers = (value: number | undefined) => {
	if (!props.inner.validation ||
			props.inner.validation.min === undefined ||
			props.inner.validation.max === undefined) return;

	const min = props.inner.validation.min;
	const max = props.inner.validation.max;

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

	if (props.inner.type === 'number') {
		const emitVal: number | undefined = value.value ? Number(value.value) : undefined;

		validateNumbers(emitVal);
		props.inner.onInput({
			event,
			valueNumber: emitVal,
			isValid: isValid.value,
		});
	}
	if (props.inner.type === 'text') {
		props.inner.onInput({
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
