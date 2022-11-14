<template>
	<v-input v-if="disabled" :model-value="formattedValue" disabled />
	<div v-else>
		<div class="currency-interface" :class="{ focus }">
			<v-input
				:model-value="value"
				:type="inputType"
				@focus="focus = true"
				@blur="focus = false"
				@update:model-value="handleChange($event)"
			/>
			<div class="formatted-currency">{{ formattedValue }}</div>
		</div>
		<div class="currency-interface-footer"></div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';

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
		prefix: {
			type: String,
			default: '',
		},
		suffix: {
			type: String,
			default: '',
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
			return (props.prefix ?? '') + formatter.format(value) + (props.suffix ?? '');
		});

		const focus = ref(false);

		const inputType = computed(() => {
			if (['bigInteger', 'integer', 'float', 'decimal'].includes(props.type)) return 'number';
			return 'text';
		});

		return {
			formattedValue,
			focus,
			inputType,
			handleChange,
		};

		function handleChange(value: string): void {
			emit('input', value);
		}
	},
});
</script>

<style scoped>
.currency-interface {
	position: relative;
}

.currency-interface:not(.focus) .v-input {
	--v-input-color: transparent;
}

.formatted-currency {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	padding-left: 18px;
	cursor: text;
	pointer-events: none;
	transition: 0.2s ease-in-out;
}

.currency-interface.focus .formatted-currency {
	top: 100%;
	transform: translateY(0%);
	margin-top: 4px;
	font-size: 0.8em;
	color: var(--foreground-subdued);
}

.currency-interface-footer {
	height: 28px;
}
</style>
