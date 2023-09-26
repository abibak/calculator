<template>
  <div class="base-button-color">
    <div class="question">?</div>
    <button><slot></slot></button>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>
.base-button-color {
  max-width: 232px;
  max-height: 60px;
  position: relative;

  .question {
    width: 25px;
    height: 25px;
    background-color: #000;
    color: #fff;
    font-family: 'Arial', sans-serif;
    font-variant: small-caps;
    font-size: 18px;
    text-align: center;
    line-height: 25px;

    position: absolute;
    right: 0;
    top: 0;
  }

  button {
    @include style-button;

    background: #BF3266;
    color: #FFF;
    border: none;
  }
}
</style>