<template>
	<div
			v-if="modalStore.isDialogOpen"
			class="dialog"
			:class="props.dialogClass"
	>
		<MyInput
				:type="props.type"
				:placeholder="props.placeholder"
				:validation="{
          min: props.validation?.min,
          max: props.validation?.max,
        }"
				:on-input="onInput"
				class="dialog__input"
				:class="props.customClass"
		/>
		<div class="dialog__footer">
			<MyButton
					class="dialog__btn dialog__cancel-btn"
					name="Cancel"
					:class="[
          `${props.dialogClass}__btn`,
          `${props.dialogClass}__cancel-btn`
          ]"
					:is-disabled="false"
					@click="props.onCancel"
			/>
			<MyButton
					class="dialog__btn dialog__confirm-btn"
					name="Confirm"
					:class="[
          `${props.dialogClass}__btn`,
          `${props.dialogClass}__confirm-btn`]
          "
					:is-disabled="!isInputValid"
					@click="props.onConfirm({ value: inputNumberValue })"
			/>
		</div>
	</div>
</template>

<script
		setup
		lang="ts"
>
import { ref } from 'vue';
import MyInput from '@/components/ui/MyInput.vue';
import MyButton from '@/components/ui/MyButton.vue';
import type {
	InputEventParams,
	OnDialogConfirm,
} from '@/types';
import { useModalStore } from '@/stores';

interface Props {
	type: string,
	placeholder?: string,
	customClass?: string,
	validation?: {
		min?: number,
		max?: number,
	},
	dialogClass?: string;
	onConfirm: ({value}: OnDialogConfirm) => void,
	onCancel: () => void,
}

// todo - add visual reaction to OnConfirm
const props = defineProps<Props>();
const modalStore = useModalStore();

const isInputValid = ref(false);
const inputNumberValue = ref(0);

const onInput = ({valueNumber, isValid}: InputEventParams) => {
	isInputValid.value = isValid;
	if (isValid && valueNumber !== undefined) {
		inputNumberValue.value = valueNumber;
	}
};
</script>

<style
		scoped
		lang="scss"
>
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
		justify-content: space-between;
		gap: 10px;
	}

	&__btn {
		padding: 8px;
		width: 100%;
		box-shadow: -1px 2px 19px 3px rgba($red_300, 0.41);
	}

	&__confirm-btn {
		background-color: $red_300;
		color: #fff;
	}
}
</style>
