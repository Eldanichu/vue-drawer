<template>
  <div
      id="drawer"
      :class="[drawerPosition,drawerDisplay]"
      :style="drawerStyles">
    <div class="content-slot h-full bg-opacity-60 bg-gray-500 rounded-l-lg">
      <slot/>
      <slot name="content"/>
      <div v-if="drawerSwitch" class="btns">
        <div class="btn-display" @click="ondisplay">
          <div class="bg-opacity-60 bg-gray-500" :class="['btn--icon']">
            <i class="el-icon-d-arrow-left icon text-white" :style="iconRotation"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DrawerNew",
  props: {
    /**
     * 显示隐藏
     */
    disp: {
      type: Boolean,
      default: false,
    },
    /**
     * 宽度
     */
    width: {
      type: String,
      default: '300px'
    },
    margin: {
      type: String,
      default: ''
    },
    /**
     * 高度
     */
    height: {
      type: [Number, String],
      default: 100
    },
    top: {
      type: [Number, String],
      default: 0
    },
    position: {
      type: String,
      default: 'left'
    },
    drawerSwitch: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      b: true,
      drawerWidth: 0,
      style: {
        drawer: {
          'bottom': 0,
          height: 0,
          top: 0
        }
      }
    }
  },
  computed: {
    isLeft() {
      return this.position === 'left';
    },
    isRight() {
      return this.position === 'right';
    },
    drawerDisplay() {
      return this.b ? 'show' : ''
    },
    drawerPosition() {
      return this.isLeft ? 'drawer-left' : 'drawer-right'
    },
    drawerStyles() {
      let _styles = {}

      let _isPercentHeight = typeof this.height !== 'number' && this.height.split('').includes('%')
      if (this.height === 'auto') {
        _styles.bottom = '0';
        _styles.height = this.height
      } else if (this.height === 'fill') {
        _styles.bottom = 0;
        _styles.height = '100%'
      } else if (_isPercentHeight) {
        _styles.height = this.height + '%'
      } else {
        _styles.height = this.height + 'px'
      }

      if (this.top === 'auto') {
        _styles.top = 'unset';
      } else if (this.top === 'fill') {
        _styles.top = this.top + '%'
      } else {
        _styles.top = this.top + 'px'
      }

      _styles.width = this.getValue(this.width)

      this.setMargin(_styles)

      return _styles
    },
    iconRotation() {
      return this.left ?
          {'transform': 'rotate(' + (this.b ? 0 : 180) + 'deg)'} :
          {'transform': 'rotate(' + (this.b ? 180 : 0) + 'deg)'}
    }
  },
  watch: {
    disp: {
      immediate: true,
      handler(value) {
        this.b = value
      }
    }
  },
  mounted() {
    this.$nextTick(() => {

    })
  },
  methods: {
    getUnitMatcher() {
      return /%|px|rem|em/i
    },
    getUnit(unit) {
      let reg = this.getUnitMatcher()
      return reg.test(unit) && reg.exec(unit);
    },
    getValue(value) {
      let unit = this.getUnit(value)
      return value.replace(unit, unit)
    },
    ondisplay() {
      this.b = !this.b;
    },
    marginMatcher() {
      return /x-|y-/i
    },
    setMargin(styles) {
      if (!this.margin) {
        return;
      }
      let regex = this.marginMatcher();
      let regvalue = regex.test(this.margin) && regex.exec(this.margin)

      if (regvalue.includes('x-')) {
        styles['margin-right'] = this.getMarginValue()
        styles['margin-left'] = this.getMarginValue()
      } else if (regvalue.includes('y-')) {
        styles['margin-top'] = this.getMarginValue()
        styles['margin-bottom'] = this.getMarginValue()
      }
    },
    getMarginValue() {
      return this.margin.replace(this.marginMatcher(), '') + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>

#drawer {
  z-index: 1;
  position: absolute;

  &.drawer-left {
    @apply left-0 transform translate-x-full transition-all duration-200;

    &.show {
      @apply transform translate-x-0;
    }

    .btns {
      left: 100%;

      .btn--icon {
        @apply rounded-r-2xl;
      }
    }
  }

  &.drawer-right {
    @apply right-0 transform translate-x-full transition-all duration-200;

    &.show {
      @apply transform translate-x-0;
    }

    .btns {
      right: 100%;

      .btn--icon {
        @apply rounded-l-2xl;
      }
    }
  }

  .content-slot {
    border-radius: 4px;
    position: relative;

    .btns {
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);

      .btn-display {
        height: 28px;

        .btn--icon {
          opacity: .85;
          padding: 10px 3px;

          &:hover {
            opacity: 1;
          }

          .icon {
            @apply transition-all duration-200 ;
            transform: rotate(90deg);
          }
        }
      }
    }
  }
}
</style>
