<script setup lang="ts">
defineProps({
	/**
	 * Whether the switch is required or not.
	 *
	 * @defaultValue false
	 */
	required: {
		type: Boolean,
		default: false,
	},

	/**
	 * Whether the switch is disabled or not.
	 *
	 * @defaultValue false
	 */
	disabled: {
		type: Boolean,
		default: false,
	},

	/**
	 * The name of the switch.
	 *
	 * @defaultValue ''
	 */
	name: {
		type: String,
		default: "",
	},

	/**
	 * The value of the switch.
	 *
	 * @defaultValue ''
	 */
	value: {
		type: String,
		default: "",
	},

	/**
	 * The id of the switch.
	 *
	 * @defaultValue ''
	 */
	id: {
		type: String,
		default: "",
	},

	/**
	 * Change the shape of the switch to square.
	 *
	 * @defaultValue false
	 */
	square: {
		type: Boolean,
		default: false,
	},

	/**
	 * Make the switch scale on interaction
	 *
	 * @defaultValue true
	 */
	scale: {
		type: Boolean,
		default: true,
	},

	/**
	 * Passthrough to allowed custom classes to be added to the switch.
	 */
	pt: {
		type: Object,
		default: () => ({
			/**
		 	* The root class of the switch.
		 	*/
			root: "",
			/**
		 	* The class of the circle.
		 	*/
			circle: "",
			/**
		 	* The class of the on text.
		 	*/
			on: "",
			/**
		 	* The class of the off text.
		 	*/
			off: "",
			/**
		 	* The class of the background.
		 	*/
			background: "",
		}),
	},
})


const checked = defineModel<boolean>("checked", { required: false, default: false })
</script>

<template>
	<button
		:aria-checked="checked"
		:aria-required="required"
		class="switch"
		role="switch"
		tabindex="0"
		type="button"
		:disabled
		:class="[
			{
				disable: disabled,
				square: square,
				scalable: scale,
			},
			pt.root,
		]"
		@click="() => (checked = !checked)">
		<input
			:id
			v-model="checked"
			aria-hidden="true"
			tabindex="-1"
			type="checkbox"
			hidden
			:disabled
			:name
			:required
			:value />

		<div class="circle" :class="pt.circle">
			<slot name="icon" />
		</div>

		<div :aria-hidden="!checked" class="text_area on" :class="pt.on">
			<slot name="on" />
		</div>

		<div :aria-hidden="checked" class="text_area off" :class="pt.off">
			<slot name="off" />
		</div>

		<div class="background" :class="pt.background" />
	</button>
</template>

<style scoped>
.disable {
	cursor: not-allowed !important;

	opacity: var(--switch-disabled-opacity, 0.5);
}

.scalable {
	&:active {
		scale: 0.9;
	}

	&:focus-visible {
		scale: 0.9;
	}
}

.switch {
	background: var(--vs--switch-bg-off, #6b7280);

	display: flex;

	user-select: none;

	overflow: hidden;

	position: relative;

	align-items: center;

	padding: 0.3125rem;

	border-radius: 1.5rem;

	cursor: pointer;

	height: 1.75rem;

	min-width: var(--vs--switch-min-width, 3rem);

	border: 0;

	transition: all 0.25s ease;

	&:focus-visible {
		outline: var(--vs--switch-outline-width, 4px) var(--vs--switch-outline-style, solid)
			var(--vs--switch-outline-color, var(--vs--switch-bg-on, rgba(25, 91, 255, 0.5)));

		outline-offset: var(--vs--switch-outline-offset, 2px);

		border-radius: var(--vs--switch-outline-radius, 0.5rem);
	}

	&.square {
		border-radius: 0.375rem;
	}

	&.square .background {
		border-radius: 0.375rem !important;
	}

	&.square .circle {
		border-radius: 0.375rem !important;
	}
}

.background {
	background-color: var(--vs--switch-bg-on, #195bff);

	height: auto;

	position: absolute;

	width: 100%;

	padding-bottom: 100%;

	transition: all 0.85s ease-out;

	left: -100%;
}

.text_area {
	padding-top: 0.3125rem;

	padding-bottom: 0.3125rem;

	padding-right: 0.3125rem;

	padding-left: 1.5625rem;

	transition: all 0.65s ease 50ms;

	font-size: 0.7rem;

	z-index: 9;

	white-space: nowrap;

	&.on {
		transform: translate(-100%);

		position: absolute !important;
	}
}

.circle {
	background: var(--vs-switch-circle-bg, white);

	border-radius: 0.75rem;

	position: absolute;

	display: flex;

	height: 1.25rem;

	left: 0.25rem;

	width: 1.25rem;

	z-index: 10;

	align-items: center;

	justify-content: center;

	transition: all 0.85s ease;
}

input {
	&:checked ~ .background {
		transform: scale(1);

		scale: 1;

		left: 0;
	}

	&:checked ~ .circle {
		left: calc(100% - 24px);

		box-shadow: -5px 0 25px 0 var(--vs-switch-circle-shadow-bg, rgba(255, 255, 255, 0.6));
	}

	&:checked ~ .text_area {
		padding-left: 0.3125rem !important;

		padding-right: 1.5625rem !important;

		&.on {
			position: relative !important;

			transform: translate(0) !important;
		}

		&.off {
			position: absolute !important;

			transform: translate(100%);
		}
	}
}

/* RTL */
:dir(rtl) {
	input {
		&:checked ~ .text_area {
			&.on {
				transform: translate(32%) !important;
			}

			&.off {
				transform: translate(-100%) !important;
			}
		}

		&:checked ~ .circle {
			right: calc(100% - 24px);
		}

		&:checked ~ .background {
			right: 0;
		}
	}

	.text_area {
		&.on {
			transform: translate(100%);
		}

		&.off {
			transform: translate(-32%);
		}
	}

	.background {
		right: -100%;
	}

	.circle {
		right: 4px;
	}
}
</style>
