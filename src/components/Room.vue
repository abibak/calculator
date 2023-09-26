<template>
  <div class="room">
    <div class="background-form" v-if="showFormOrder || showFormRoomEdit"></div>
    <FormOrder v-if="showFormOrder" @closeForm="setShowFormOrder(false)"/>
    <FormRoomEdit :old-name="room.name" v-if="showFormRoomEdit" @closeForm="setShowFormRoomEdit(false)" @changeRoomName="changeRoomName"/>

    <div class="container-room">
      <div class="form-group">

        <span class="change-room-name" @click="setShowFormRoomEdit(true)">Изменить название</span>
        <span class="remove-room" @click="removeRoom" v-if="room.id !== 1">Удалить комнату</span>

        <div class="elements">
          <div class="group-counter">
            <div class="element">
              <span class="title-element-group">Площадь помещения:</span>
              <InputCounter @plus="plusArea" @minus="minusArea" :options="{type: 'area', counter: room.area}"/>
            </div>

            <div class="element">
              <span class="title-element-group">Количество углов:</span>
              <InputCounter @plus="plusAngels" @minus="minusAngels" :options="{type: 'angles', counter: room.angels}"/>
            </div>
          </div>

          <div class="group-select">
            <div class="element">
              <span class="title-select title-element-group">Фактура потолка:</span>
              <BaseSelect :data="{name: room.texture}" :options="optionsTexture" @changeTexture="changeTexture"/>
            </div>

            <div class="element">
              <span class="title-select title-element-group">Цвет потолка:</span>
              <BaseSelect :data="{name: room.color}" :options="optionsColors" @changeTexture="changeColor"/>
            </div>
          </div>
        </div>

        <div class="block-result">
          <p>Итого: <span style="color: #BF3266;">{{ totalPrice }}</span>  {{ inflectedWord }}. <span
              style="font-size: 18px; font-weight: 400;">(Ориентировочная стоимость)</span></p>
          <div class="buttons">
            <BaseButtonColor @click="setShowFormOrder(true)">Оформить заказ</BaseButtonColor>
            <BaseButtonNonColor>Скачать смету</BaseButtonNonColor>
          </div>
        </div>
      </div>

      <div class="photo-right">
        <div class="background"></div>
      </div>
    </div>
  </div>
</template>

<script>

import BaseSelect from "@/components/ui-components/Select/BaseSelect";
import BaseButtonColor from "@/components/ui-components/Buttons/BaseButtonColor";
import BaseButtonNonColor from "@/components/ui-components/Buttons/BaseButtonNonColor";
import InputCounter from "@/components/ui-components/Counter/InputCounter";
import FormOrder from "@/components/FormOrder";
import FormRoomEdit from "@/components/FormRoomEdit";

export default {
  name: "Room",
  components: {BaseSelect, InputCounter, BaseButtonColor, BaseButtonNonColor, FormOrder, FormRoomEdit},

  props: {
    room: {
      type: Object,
      required: true,
    },

    priceData: {
      type: Object,
      required: true,
      default: {}
    },

    inflectedWords: {
      type: Object,
      default: {},
    }
  },

  data() {
    return {
      showFormRoomEdit: false,
      showFormOrder: false,
      inflectedWord: '',

      optionsTexture: [
        {name: 'ПВХ', value: '1'},
        {name: 'Тканевый', value: '2'},
      ],

      optionsColors: [
        {name: 'Белый', value: '1'},
        {name: 'Цветной', value: '2'},
      ]
    }
  },

  watch: {
    totalPrice() {
      const lastNum = String(this.totalPrice).charAt(String(this.totalPrice).length - 1);
      this.inflectedWord = this.inflectedWords[lastNum];
    }
  },

  computed: {
    textureColor() {
      return this.room.texture + ' ' + this.room.color;
    },

    totalPrice() {
      if (this.textureColor in this.priceData) {
        if (this.priceData[this.textureColor] === null) {
          return 0;
        }
        return (this.priceData[this.textureColor] * this.room.area) + (100 * this.room.angels);
      }
    }
  },

  methods: {
    plusArea() {
      this.$emit('plusArea');
    },

    plusAngels() {
      this.$emit('plusAngels');
    },

    minusArea() {
      this.$emit('minusArea');
    },

    minusAngels() {
      this.$emit('minusAngels');
    },

    changeTexture(texture) {
      this.$emit('setTexture', texture);
    },

    changeColor(color) {
      this.$emit('setColor', color);
    },

    removeRoom() {
      this.$emit('removeRoom');
    },

    setShowFormOrder(value) {
      this.showFormOrder = value;
    },

    setShowFormRoomEdit(value) {
      this.showFormRoomEdit = value;
    },

    changeRoomName(value) {
      this.$emit('changeRoomName', value)
    },
  },
}
</script>

<style lang="scss" scoped>
.room {
  width: 100%;

  .background-form {
    width: 100%;
    height: 100%;
    background: rgba(183, 186, 203, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .container-room {
    display: flex;

    .form-group {
      position: relative;
      width: 100%;
      max-width: 701px;
      padding: 40px;

      .remove-room {
        @include control;
        color: red;
        right: 10px;
        bottom: 10px;

      }

      .change-room-name {
        @include control;
        color: green;
        right: 5px;
        top: 5px;
      }
    }

    .elements {
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;

      .element {
        width: 100%;
        max-width: 295px;

        &:nth-of-type(2) {
          margin-left: 30px;
        }

        .select, .counter {
          margin-top: 12px;
        }
      }

      .group-counter {
        margin-bottom: 35px
      }

      .group-select, .group-counter {
        display: flex;
      }
    }

    .block-result {
      margin-top: 35px;
      font-size: 36px;
      font-weight: 500;
    }

    .buttons {
      display: flex;
      margin-top: 35px;

      .base-button-color, .base-button-non-color {
        width: 100%;
        height: 100%;
      }
      .base-button-color {
        margin-right: 35px;
      }
    }

    .photo-right {
      width: 100%;
      max-width: 800px;
      max-height: 481px;
      min-height: 481px;

      .background {
        width: 100%;
        height: 100%;
        background-image: url("~@/assets/images/photo.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: 50% 50%;
      }
    }
  }
}
</style>