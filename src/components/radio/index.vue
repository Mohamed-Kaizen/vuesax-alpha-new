<script setup lang="ts">
import { watch } from 'vue';

interface RadioPT {
		/**
		 * The root class of the radio.
		 */
		root?: string

		/**
		 * The label class of the radio.
		 */
		label?: string

		/**
		 * The radio class of the radio.
		 */
		radio?: string

		/**
		 * The box class of the radio.
		 */
		box?: string
}

const props = defineProps({
	/**
	 * Whether the radio is required or not.
	 *
	 * @defaultValue false
	 */
	required: {
		type: Boolean,
		default: false,
	},

	/**
	 * Whether the radio is disabled or not.
	 *
	 * @defaultValue false
	 */
	disabled: {
		type: Boolean,
		default: false,
	},

	/**
	 * The name of the radio.
	 *
	 * @defaultValue ''
	 */
	name: {
		type: String,
		default: "",
	},

	/**
	 * The value of the radio.
	 *
	 * @defaultValue ''
	 */
	value: {
		type: String,
		default: "",
	},

	/**
	 * The id of the radio.
	 *
	 * @defaultValue ''
	 */
	id: {
		type: String,
		default: "",
	},

	/**
	 * Make the radio scale on interaction
	 *
	 * @defaultValue true
	 */
	scale: {
		type: Boolean,
		default: true,
	},

	/**
	 * Passthrough to allowed custom classes to be added to the radio.
	 */
	pt: {
		type: Object,
		default: () => ({} as RadioPT),
	},
})

const checked = defineModel<boolean>("checked", { required: false, default: undefined })

const group = defineModel<unknown>("group", { required: false, default: undefined })

watch(
	() => group.value,
	(_value) => {
		checked.value = _value === props.value
	},
)
</script>

<template>
	<button
		:aria-checked="group === value"
		:aria-disabled="disabled"
		class="wrapper"
		role="radio"
		:disabled
		:class="[
			{
				disable: disabled,
				scalable: scale,
			},
			pt.root,
		]"
		@click="() => (group = value)">
		<div :class="pt.radio" class="radio">
			<input
				:id
				v-model="group"
				:aria-disabled="disabled"
				tabindex="-1"
				type="radio"
				:checked
				:disabled
				:name
				:required
				:value />
			<span :class="pt.box" class="box"></span>
		</div>

		<label :class="pt.label" :disabled class="label" :for="id">
			<slot />
		</label>
	</button>
</template>

<style scoped>
.label {
	cursor: pointer;
	color: var(--vs--radio-label-color, black);
}

.disable {
	cursor: not-allowed !important;

	opacity: var(--radio-disabled-opacity, 0.5);

	.label {
		cursor: not-allowed !important;
	}

	input {
		cursor: not-allowed !important;
	}
}

.wrapper {
	background: transparent;

	display: flex;

	align-items: center;

	position: relative;

	gap: var(--vs--radio-gap, 0.5rem);

	border: 0;

	&:focus-visible {
		outline: var(--vs--radio-outline-width, 4px) var(--vs--radio-outline-style, solid)
			var(--vs--radio-outline-color, var(--vs--radio-color, rgba(25, 91, 255, 0.5)));

		outline-offset: var(--vs--radio-outline-offset, 2px);

		border-radius: var(--vs--radio-outline-radius, 0.5rem);
	}

	&:not([disabled]).scalable:active .radio input ~ .box:after {
		transform: scale(0.8);
	}
}

.radio {
	width: var(--vs--radio-width, 20px);

	height: var(--vs--radio-height, 20px);

	border-radius: var(--vs--radio-radius, 50%);

	position: relative;

	z-index: 10;

	input {
		margin: 0;

		padding: 0;

		width: 100%;

		height: 100%;

		position: relative;

		z-index: 100;

		opacity: 0;

		cursor: pointer;

		&:checked ~ .box:after {
			border: var(--vs--radio-border-width, 7px) solid var(--vs--radio-color, #195bff);

			box-shadow: 0 3px 10px 0 var(--vs--radio-show-shadow, var(--vs--radio-color, #195bff));
		}
	}
}

.box {
	position: absolute;

	width: 100%;

	height: 100%;

	border-radius: inherit;

	left: 0;

	top: 0;

	transition: all 0.15s ease;

	z-index: 10;

	&:after {
		content: "";

		height: inherit;

		border-radius: inherit;

		border: 2px solid var(--vs--radio-border-color, rgba(44, 62, 80, 0.5));

		box-sizing: border-box;

		transition: all 0.15s ease;

		display: block;
	}
}
</style>
