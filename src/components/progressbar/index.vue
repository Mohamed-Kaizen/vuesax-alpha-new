<script setup lang="ts">
defineProps({
	/**
	 * The progress of the progressbar.
	 *
	 * @defaultValue 0
	 */
	progress: {
		type: Number,
		default: 0,
	},

	/**
	 * Whether the progressbar is infinite or not.
	 *
	 * @defaultValue false
	 */
	infinite: {
		type: Boolean,
		default: false,
	},

	/**
	 * The text to display on the progressbar.
	 *
	 * @defaultValue ""
	 */
	text: {
		type: [String, Number],
		default: "",
	},

	/**
	 * Passthrough to allowed custom classes to be added to the progressbar.
	 */
	pt: {
		type: Object,
		default: () => ({
			/**
			 * The root class of the progressbar.
			 */
			root: "",

			/**
			 * The bar class of the progressbar.
			 */
			bar: "",
		}),
	},
})
</script>

<template>
	<div
		role="progressbar"
		class="progress"
		:class="[{ infinite }, pt.root]"
		:aria-valuenow="infinite ? undefined : progress">
		<span role="presentation" class="bar" :class="pt.bar" :style="'width: ' + progress + '%'">
			{{ text }}
		</span>
	</div>
</template>

<style scoped>
.progress {
	width: 100%;

	height: var(--vs--progress-height, 0.5em);

	border-radius: var(--vs--progress-radius, 0.25em);

	position: relative;

	display: inline-block;

	overflow: hidden;

	background-color: var(--vs--progress-bg, #dde7ff);

	.bar {
		height: 100%;

		background-color: var(--vs--progress-color, #195bff);

		text-align: center;

		display: flex;

		align-items: center;

		justify-content: center;

		transition: all 0.5s;
	}

	&.infinite .bar {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		animation: infinite-progress var(--vs--progress-duration, 1.5s)
			var(--vs--progress-animation, linear infinite);

		&:dir(rtl) {
			animation: rtl-infinite-progress var(--vs--progress-duration, 1.5s)
				var(--vs--progress-animation, linear infinite);
		}
	}
}

@keyframes infinite-progress {
	0% {
		left: 0%;
		right: 100%;
		width: 0%;
	}
	10% {
		left: 0%;
		right: 75%;
		width: 35%;
	}
	90% {
		left: 75%;
		right: 0%;
		width: 35%;
	}
	100% {
		left: 100%;
		right: 0%;
		width: 0%;
	}
}

@keyframes rtl-infinite-progress {
	0% {
		left: 100%;
		right: 0%;
		width: 0%;
	}
	10% {
		left: 75%;
		right: 0%;
		width: 35%;
	}
	90% {
		left: 0%;
		right: 75%;
		width: 35%;
	}
	100% {
		left: 0%;
		right: 100%;
		width: 0%;
	}
}
</style>
