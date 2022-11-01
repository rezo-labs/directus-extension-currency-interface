import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'currency',
	name: 'Currency',
	icon: 'paid',
	description: 'Interface for currency',
	component: InterfaceComponent,
	options: null,
	types: ['integer', 'bigInteger', 'float', 'decimal', 'string'],
});
