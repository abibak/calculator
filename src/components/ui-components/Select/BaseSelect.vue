<template>
  <div class="select">
    <span>{{ data.name }}</span>
    <div class="btn-toggle" @click="isOptions = !isOptions">
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 16.0417L6.25 9.79168L7.70833 8.33334L12.5 13.125L17.2917 8.33334L18.75 9.79168L12.5 16.0417Z"
              fill="white"/>
      </svg>
    </div>

    <div class="options" v-if="isOptions">
      <span class="option"
            @click="selectOption(option.name), isOptions = false"
            v-for="(option) of options"
            :key="option.value">
        {{ option.name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },

    options: {
      type: Array,
      default: [],
    }
  },

  data() {
    return {
      isOptions: false,
    }
  },

  methods: {
    selectOption(texture) {
      this.$emit('changeTexture', texture)
    }
  }
}
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(183, 186, 203, 0.20);
  padding: 10px 10px;
  cursor: pointer;
  position: relative;
  left: 0;
  top: 0;

  .options {
    background: rgba(183, 186, 203, 1);
  }

  .options {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    z-index: 1;

    .option {
      line-height: 60px;
      height: 59px;
      border-bottom: 1px solid #000;
      padding: 0 10px;
    }
  }

  .btn-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background: #BF3266;
  }
}
</style>