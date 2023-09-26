<template>
  <div class="base-button-non-color">
    <button>
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.base-button-non-color {
  max-width: 232px;
  max-height: 60px;
  cursor: pointer;

  button {
    @include style-button;

    color: #BF3266;
    border: 1px solid #BF3266;
    background: #FFF;
  }
}
</style>