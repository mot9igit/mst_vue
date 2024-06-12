<template>
    <div class="k-container">
        <div class="scrollLegt" @mouseenter="leftScroll('start')" @mouseleave="leftScroll('stop')"></div>
        <div class="scrollRight" @mouseenter="rigthScroll('start')" @mouseleave="rigthScroll('stop')"></div>
        <table class="k-table" :style="{ marginLeft: this.marginValue + 'px' }">
            <thead>
                <tr>
                    <th class="k-table__name"></th>
                    <th class="k-table__name">Артикул</th>
                    <th class="k-table__name">Фото</th>
                    <th class="k-table__name k-table__th-title">Название</th>
                    <th class="k-table__name"></th>
                    <th class="k-table__name">Поставщик</th>
                    <th class="k-table__name">Цена</th>
                    <th class="k-table__name">РРЦ / Наценка</th>
                    <th class="k-table__name">Отсрочка</th>
                    <th class="k-table__name">Оплата доставки</th>
                    <th class="k-table__name">Срок доставки</th>
                    <th class="k-table__name k-table__th-actions">Акции</th>
                    <th class="k-table__name">Остатки на складе</th>
                </tr>
            </thead>
            <tbody>
                <TableCatalogRow @updateBasket="updateBasket" v-for="item in items.items" v-bind:key="item.id" :items="item"/>
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import TableCatalogRow from './TableCatalogRow.vue'

export default {
  name: 'TableCatalog',
  emits: ['updateBasket'],
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25
    },
    pagination_offset: {
      type: Number,
      default: 0
    },
    items: {
      type: Array
    }
  },
  data () {
    return {
      loading: true,
      interval: null,
      marginValue: 1
    }
  },
  methods: {
    ...mapActions([
    ]),
    updateBasket () {
      this.$emit('updateBasket')
    },
    leftScroll (event) {
      clearInterval(this.interval)
      if (event === 'start') {
        this.interval = window.setInterval(() => {
          if (this.marginValue < 0) {
            this.marginValue = this.marginValue + 50
          }
        }, 50)
      }
    },
    rigthScroll (event) {
      clearInterval(this.interval)
      if (event === 'start') {
        const widthTable = document.querySelector('.k-container').offsetWidth
        this.interval = window.setInterval(() => {
          if ((1500 - widthTable) * -1 < this.marginValue) {
            this.marginValue = this.marginValue - 50
          } else {
            this.marginValue = (1500 - widthTable) * -1
          }
        }, 50)
      }
    }
  },
  mounted () {
  },
  components: { TableCatalogRow },
  computed: {
    ...mapGetters([
    ])
  }
}
</script>
<style lang="scss">

.scrollLegt{
    height: 100%;
    width: 70px;
    background: transparent;
    position: absolute;
    pointer-events: visiblefill;
}

.scrollRight{
    height: 100%;
    width: 70px;
    background: transparent;
    position: absolute;
    right: 0;
    pointer-events: visiblefill;
}

.k-container{
    width: 100%;
    overflow-x: auto;
    position: relative;

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: #e0e0e0; /* blue */
      border-radius: 9em;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #b4b4b4; /* green */
        border-radius: 9em;
    }
}

.event-none{
    pointer-events: none;
}

.k-table{
    width: 1500px;
    transition: all 0.5s;

    td{
        text-align: center;
        padding: 16px 0;
        color: #282828;
        font-size: 14px;
    }

    tbody tr{
        padding: 0 20px;
    }

    tbody tr:not(.active){
        border-bottom: 1px solid #0000001F;
        transition: border-bottom 0.4s;
        cursor: pointer;
    }

    tbody tr.active-el{
        box-shadow: 0px 4px 12.5px 0px #0000001F;
    }

    tbody tr.active-el{
        border-bottom: 1px solid #FF000073
    }

    tbody .active:nth-child(2n){
        background: #F4F4F4 !important;
    }

    tr.no-active{
        display: none;
    }

    tr.no-active-el{
        .pi-angle-up{
            transform: rotate(180deg);
            transition: all 0.4s;
        }
    }

    tr.active-el{
        .pi-angle-up{
            transform: rotate(0deg);
            transition: all 0.4s;
        }
    }

    // td + td{
    //     border-top: 1px solid #0000001F;
    // }

    tr.active:hover{
        .k-table__form{
            opacity: 1;
        }
    }

    &__form{
        align-items: center;
        display: flex;
        gap: 12px;
        opacity: 0;
        transition: all 0.4s;
        width: 100%;
        justify-content: center;
    }

    &__header{
        display: flex;
        justify-content: space-between;
    }

    &__name{
        text-align: center;
        color: #282828;
        font-size: 14px;
        font-weight: 500px;
        padding: 8px 0 24px 0;
        border-bottom: 1px solid #0000001F;
    }

    &__article{
        font-size: 14px;
        color: #ADADAD;
        font-weight: 400;
        text-align: center;
    }

    &__image{
        width: 38px;
        height: 38px !important;
        border-radius: 5px;
        object-fit: contain;
        background: #FFF;
    }

    &__title{
        color: #282828;
        text-decoration: underline;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        cursor: pointer;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        padding: 16px 0 0 0 !important;
    }

    &__th{
        &-title{
            width: 260px;
        }

        &-actions{
            width: 150px;

        }
    }
}
</style>
