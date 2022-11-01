<template>
	<v-input v-if="disabled" :model-value="formattedValue" disabled />
	<div v-else>
		<v-input
			:model-value="value"
			:type="inputType"
			@update:model-value="handleChange($event)"
		/>
		<div class="formatted-currency">{{ formattedValue }}</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
	props: {
		value: {
			type: [String, Number],
			default: null,
		},
		type: {
			type: String,
			default: null,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['input'],
	setup(props, { emit }) {
		const formatter = new Intl.NumberFormat();
		const formattedValue = computed(() => {
			let value = props.value;
			if (typeof value === 'string') {
				value = parseFloat(value);
				if (isNaN(value)) return null;
			}
			return formatter.format(value);
		});

		const inputType = computed(() => {
			if (['bigInteger', 'integer', 'float', 'decimal'].includes(props.type)) return 'number';
			return 'text';
		});

		return { formattedValue, inputType, handleChange };

		function handleChange(value: string): void {
			emit('input', value);
		}
	},
});
</script>

<style scoped>
.formatted-currency {
	padding: 4px 0 0 18px;
	font-size: 0.8em;
	color: var(--foreground-subdued);
}
</style>
