import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'currency',
	name: 'Currency',
	icon: 'paid',
	description: 'Interface for currency',
	component: InterfaceComponent,
	options: [
		{
			field: 'prefix',
			name: 'Prefix',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'system-input-translated-string',
				options: {
					trim: false,
				},
			},
		},
		{
			field: 'suffix',
			name: 'Suffix',
			type: 'string',
			meta: {
				width: 'half',
				interface: 'system-input-translated-string',
				options: {
					trim: false,
				},
			},
		},
	],
	types: ['integer', 'bigInteger', 'float', 'decimal', 'string'],
});
