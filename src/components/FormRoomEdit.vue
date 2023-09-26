<template>
  <div class="form-order">
    <p class="title-order">Изменить название комнаты</p>

    <span class="close-form" @click="closeForm">Закрыть</span>

    <form @submit.prevent>
      <div class="form-element">
        <label for="name">Новое имя:</label>
        <input type="text" id="name" name="name" placeholder="Введите имя" v-model="newName">
      </div>

      <BaseButtonNonColor @click="changeName">Изменить</BaseButtonNonColor>
    </form>
  </div>
</template>

<script>
import BaseButtonNonColor from "@/components/ui-components/Buttons/BaseButtonNonColor";

export default {
  components: {BaseButtonNonColor},

  props: ['oldName'],

  data() {
    return {
      newName: '',
    }
  },

  methods: {
    closeForm() {
      this.$emit('closeForm')
    },

    changeName() {
      return (this.newName.length > 1) ? this.$emit('changeRoomName', this.newName) : this.oldName;
    },
  }
}
</script>

<style lang="scss" scoped>

.form-order {
  @include form;

  max-width: 520px;
}

</style>