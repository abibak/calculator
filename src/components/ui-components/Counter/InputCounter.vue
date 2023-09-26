<template>
  <div class="counter">
    <div class="minus" @click="minus">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
            d="M0.5 7.5C0.5 6.94772 0.947715 6.5 1.5 6.5H14.5C15.0523 6.5 15.5 6.94772 15.5 7.5V8.5C15.5 9.05228 15.0523 9.5 14.5 9.5H1.5C0.947715 9.5 0.5 9.05228 0.5 8.5V7.5Z"
            fill="black"/>
      </svg>
    </div>

    <span v-if="options.type === 'area'">{{ options.counter }} м<sup><small>2</small></sup></span>
    <span v-else>{{ options.counter }} шт.</span>

    <div class="plus" @click="plus">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <g clip-path="url(#clip0_2_180)">
          <path
              d="M16 8C16 8.73733 15.936 9.33333 15.1987 9.33333H9.33333V15.1987C9.33333 15.9347 8.73733 16 8 16C7.26267 16 6.66667 15.9347 6.66667 15.1987V9.33333H0.801333C0.0653331 9.33333 0 8.73733 0 8C0 7.26267 0.0653331 6.66667 0.801333 6.66667H6.66667V0.801333C6.66667 0.0639998 7.26267 0 8 0C8.73733 0 9.33333 0.0639998 9.33333 0.801333V6.66667H15.1987C15.936 6.66667 16 7.26267 16 8Z"
              fill="black"/>
        </g>
        <defs>
          <clipPath id="clip0_2_180">
            <rect width="16" height="16" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputCounter',

  props: {
    options: {
      type: Object,
      required: true,
      default: {}
    }
  },

  methods: {
    plus() {
      this.$emit('plus')
    },

    minus() {
      this.$emit('minus')
    },
  }
}
</script>

<style lang="scss" scoped>
.counter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(183, 186, 203, 0.20);
  padding: 10px;

  .plus, .minus {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 46px;
    background: rgba(183, 186, 203, 0.40);
    cursor: pointer;
  }
}
</style>