<template>
  <div class="form-order">
    <p class="title-order">Оформить заказ</p>

    <span class="close-form" @click="closeForm">Закрыть</span>

    <form @submit.prevent>
      <div class="form-element">
        <label for="name">Имя:</label>
        <input type="text" id="name" name="name" placeholder="Введите имя">
      </div>

      <div class="form-element">
        <label for="phone">Телефон:</label>
        <input type="tel" id="phone" name="phone" placeholder="Введите телефон">
      </div>

      <BaseButtonNonColor>Оформить заказ</BaseButtonNonColor>
    </form>
  </div>
</template>

<script>
import BaseButtonNonColor from "@/components/ui-components/Buttons/BaseButtonNonColor";

export default {
  components: {
    BaseButtonNonColor,
  },

  methods: {
    closeForm() {
      this.$emit('closeForm')
    },
  }
}
</script>

<style lang="scss">
$maxWidth: 450px;

.form-order {
  width: 100%;
  max-width: $maxWidth;
  padding: 25px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 54.95px 0 rgba(133, 133, 133, 0.25);
  position: absolute;
  left: calc(50% - 450px / 2);
  z-index: 1;

  .title-order {
    font-size: 36px;
  }

  .close-form {
    color: red;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }

  form {
    margin-top: 10px;

    .form-element {
      display: flex;
      flex-direction: column;
      padding-bottom: 10px;

      &:nth-of-type(2) {
        padding-bottom: 0;
      }

      label {
        padding-bottom: 5px;
      }

      input {
        padding: 10px;
        border-radius: 4px;
        outline: none;
        border: 1px solid #000;
        font-size: 18px;
        letter-spacing: 0.030em;

        &::placeholder {
          font-size: 18px;
        }
      }
    }

    .base-button-non-color {
      max-width: 265px;
      margin-top: 20px;
    }
  }
}
</style>