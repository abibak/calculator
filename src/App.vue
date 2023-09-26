<template>
  <div class="main">
    <p class="title">Рассчитайте стоимость Вашего потолка онлайн!</p>
    <div class="header-room">
      <div class="room-item" v-for="(item) of rooms" :key="item.id" @click="setSelectedRoomId(item.id)"
           :data-room-id="item.id">
        <div>{{ item.name }}</div>
      </div>

      <div class="add-room" @click="addRoom">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
              d="M10.875 7.5H8.5V5.125C8.5 5.05625 8.44375 5 8.375 5H7.625C7.55625 5 7.5 5.05625 7.5 5.125V7.5H5.125C5.05625 7.5 5 7.55625 5 7.625V8.375C5 8.44375 5.05625 8.5 5.125 8.5H7.5V10.875C7.5 10.9437 7.55625 11 7.625 11H8.375C8.44375 11 8.5 10.9437 8.5 10.875V8.5H10.875C10.9437 8.5 11 8.44375 11 8.375V7.625C11 7.55625 10.9437 7.5 10.875 7.5Z"
              fill="black"/>
          <path
              d="M8 1C4.13438 1 1 4.13438 1 8C1 11.8656 4.13438 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13438 11.8656 1 8 1ZM8 13.8125C4.79063 13.8125 2.1875 11.2094 2.1875 8C2.1875 4.79063 4.79063 2.1875 8 2.1875C11.2094 2.1875 13.8125 4.79063 13.8125 8C13.8125 11.2094 11.2094 13.8125 8 13.8125Z"
              fill="black"/>
        </svg>
        <span>Добавить комнату</span>
      </div>
    </div>

    <div class="main-container">
      <Room :room="currentRoom"
            :priceData="priceData"
            :inflected-words="inflectedWords"
            @plusArea="plusArea"
            @plusAngels="plusAngels"
            @minusArea="minusArea"
            @minusAngels="minusAngels"
            @setTexture="changeTexture"
            @setColor="changeColor"
            @removeRoom="removeRoom"
      />
    </div>
  </div>

</template>

<script>
import Room from "@/components/Room";
import FormOrder from "@/components/FormOrder";

export default {
  name: 'App',
  components: {
    Room,
  },

  data() {
    return {
      selectedRoomId: null,
      currentRoom: {},
      rooms: [],
      priceData: {
        "ПВХ Белый": 1390,
        "ПВХ Цветной": 1600,
        "Тканевый Белый": 2250,
        "Тканевый Цветной": null
      },

      initialRoom: {
        id: 1,
        name: 'Комната №1',
        area: 10,
        angels: 4,
        texture: 'ПВХ',
        color: 'Белый'
      },

      inflectedWords: {
        0: 'рублей',
        1: 'рубль',
        2: 'рубля',
        3: 'рубля',
        4: 'рубля',
        5: 'рублей',
        6: 'рублей',
        7: 'рублей',
        8: 'рублей',
        9: 'рублей',
      }
    }
  },

  created() {
    const getDataRooms = localStorage.getItem('data')

    if (getDataRooms) {
      const parseData = JSON.parse(getDataRooms)

      if (typeof parseData === "object" && getDataRooms.length > 1) {
        return this.rooms = parseData
      }
    }
    this.rooms.push(this.initialRoom);
  },

  mounted() {
    this.setSelectedRoomId(1);
  },

  watch: {
    rooms: {
      deep: true,
      handler() {
        localStorage.setItem('data', JSON.stringify(this.rooms));

        if (this.rooms.length === 0) {
          this.currentRoom = {}
        }
      },
    },

    selectedRoomId() {
      this.currentRoom = this.selectedRoom;
    }
  },

  computed: {
    selectedRoom() {
      for (let i = 0; i < this.rooms.length; i++) {
        if (this.rooms[i].id === this.selectedRoomId) {
          return this.rooms[i];
        }
      }
      return {};
    }
  },

  methods: {
    setSelectedRoomId(id) {
      this.selectedRoomId = id;
    },

    addRoom() {
      const nextIdRoom = (this.rooms.length === 0) ? 1 : this.rooms[this.rooms.length - 1].id + 1;
      this.rooms.push({...this.initialRoom, id: nextIdRoom, name: 'Комната №' + nextIdRoom});
      this.setSelectedRoomId(nextIdRoom);
    },

    plusArea() {
      this.currentRoom.area += 1;
    },

    plusAngels() {
      this.currentRoom.angels += 1;
    },

    minusArea() {
      return (this.currentRoom.area === this.initialRoom.area) ? 0 : this.currentRoom.area -= 1
    },

    minusAngels() {
      return (this.currentRoom.angels === 1) ? 0 : this.currentRoom.angels -= 1;
    },

    changeTexture(texture) {
      this.currentRoom.texture = texture;
    },

    changeColor(color) {
      this.currentRoom.color = color;
    },

    removeRoom() {
      this.rooms = this.rooms.filter(room => room.id !== this.selectedRoomId);
      this.setSelectedRoomId(1);
    },
  }
}
</script>

<style lang="scss">
@import "~@/assets/variables.scss";
@import '~@/assets/mixins.scss';

@media (max-width: $large) {
  .main {
    width: 1230px !important;

    .photo-right {
      width: 529px !important;
    }
  }
}

@media (max-width: $aboveMedium) {
  .main {
    width: 967px !important;

    .title {
      font-size: 36px !important;
    }

    .photo-right {
      width: 266px !important;
    }
  }
}

@media (max-width: $medium) {
  .main {
    width: 709px !important;

    .photo-right {
      display: none !important;
    }
  }
}

@media (max-width: $small) {
  #app {
    padding: 0 !important;
  }

  .main {
    width: $small !important;

    .title {
      font-size: 24px !important;
    }

    .room {
      .group-counter {
        margin-bottom: 10px !important;
      }

      .group-counter, .group-select {
        width: 100% !important;
        display: flex;
        flex-direction: column;

        .element {
          max-width: 343px !important;
          width: 100% !important;
          margin-left: 0 !important;
          padding-bottom: 10px;

          &:last-child {
            padding-bottom: 0;
          }
        }
      }

      .block-result {
        p:first-child {
          font-size: 26px !important;
        }

        .base-button-color {
          margin-right: 16px !important;
        }

        .base-button-color, .base-button-non-color {
          max-width: 168px !important;
          max-height: 50px !important;

          button {
            padding: 0 !important;
            width: 168px !important;
            height: 50px !important;
            font-size: 12px !important;
            letter-spacing: 0.6px !important;
          }
        }
      }
    }
  }
}

* {
  margin: 0;
  padding: 0;
  font-family: 'Futura PT', sans-serif;
  box-sizing: border-box;
}

#app {
  display: flex;
  height: 100vh;
  max-width: 1920px;
  max-height: 1080px;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  background-image: url("~@/assets/images/background.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 40px;

  .main {
    width: 100%;
    max-width: 1501px;

    .header-room {
      display: flex;

      .add-room {
        background: rgba(183, 186, 203, 0.20);

        span {
          padding-left: 12px;
        }
      }

      .room-item {
        box-shadow: 0 4px 54px 0 rgba(133, 133, 133, 0.25);
        background-color: #fff;
      }

      .room-item, .add-room {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 18px;
        cursor: pointer;
      }
    }

    .title {
      font-size: 48px;
      font-weight: 500;
      line-height: normal;
      margin-bottom: 38px;
    }

    .main-container {
      background: #FFF;
      box-shadow: 0 4px 54.95px 0 rgba(133, 133, 133, 0.25);
    }
  }
}
</style>
