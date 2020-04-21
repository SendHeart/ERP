<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
	  default: ''
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
	
	styleExternalIcon() {
		return {
			mask: `url(${this.iconClass}) no-repeat 50% 50%`,
			'-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
		}
	}
  }
}
</script>

<style>
.svg-icon {
      width: 1.2em;
      height: 1.2em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
  }
</style>
