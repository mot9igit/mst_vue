<template>
    <tr @click="this.active = !this.active" :class="{'active-el' : this.active, 'no-active-el' : !this.active}">
        <td><i class="pi pi-angle-up"></i></td>
        <td><span class="k-table__article">{{items.article}}</span></td>
        <td><img class="k-table__image" :src="items.image" alt=""></td>
        <td class="k-table__title">{{items.pagetitle}}</td>
        <td class="k-table__busket">
          <form class="k-table__form event-none" action="">
            <Counter :min="0" :max="100" :value="0"/>
            <button class="dart-btn dart-btn-primary"><i class="d_icon d_icon-busket"></i></button>
          </form>
        </td>
        <td>{{items.total_stores}}</td>
        <td>от {{Math.round(getMinPrice(items.stores)).toLocaleString('ru')}} ₽</td>
        <td></td>
        <td></td>
        <td></td>
        <td>от {{getMinDelivery(items.stores).delivery}} дн ({{new Date(getMinDelivery(items.stores).delivery_day).toLocaleString("ru", {month: 'long', day: 'numeric'})}})</td>
        <td></td>
        <td></td>
    </tr>
    <tr v-for="item in items.stores" v-bind:key="item.id" :class="{'active' : this.active, 'no-active' : !this.active}">
        <td></td>
        <td><span class="k-table__article">440107010</span></td>
        <td><img class="k-table__image" :src="items.image" alt=""></td>
        <td class="k-table__title">{{item.name}}</td>
        <td class="k-table__busket">
          <form class="k-table__form" action="">
            <Counter @ElemCount="ElemCount" :min="1" :max="item.remains" :value="this.value"/>
            <div @click="addBasket(item.product_id, this.value, item.store_id)" class="dart-btn dart-btn-primary"><i class="d_icon d_icon-busket"></i></div>
          </form>
        </td>
        <td>{{item.store_name}}</td>
        <td>{{Math.round(item.price).toLocaleString('ru')}} ₽</td>
        <td>{{Math.round(item.price).toLocaleString('ru')}} ₽ + {{Math.round(item.old_price - item.price).toLocaleString('ru')}} ₽</td>
        <td>{{item.action.delay ? Number(item.action.delay).toFixed(1) + ' дн' : 'Нет'}}</td>
        <td>{{ item.action.payer === '0' ? 'Покупатель' : 'Поставщик' }} </td>
        <td>от {{item.delivery}} дн ({{new Date(item.delivery_day).toLocaleString("ru", {month: 'long', day: 'numeric'})}})</td>
        <td>
          <div class="k-order__actions center">
            <img :style="index > 2 ? { display: 'none' } : false" v-for="(action, index) in item.actions" v-bind:key="action.id" class="k-order__actions-el" :src="site_url_prefix + action.icon">
            <div v-if="item.actions.length > 3" class="k-order__actions-el last">+{{ item.actions.length - 3 }}</div>
          </div>
        </td>
        <td>{{item.remains}} шт</td>
    </tr>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Counter from './Counter.vue'
import router from '@/router'

export default {
  name: 'TableCatalogRow',
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
      active: false,
      value: 1
    }
  },
  methods: {
    ...mapActions([
      'busket_from_api'
    ]),
    getMinPrice (stores) {
      let minPrice

      for (let i = 0; i < stores.length; i++) {
        if (i === 0) {
          // eslint-disable-next-line no-unused-vars
          minPrice = stores[i].price
        } else if (stores[i].price < minPrice) {
          minPrice = stores[i].price
        }
      }

      return minPrice
    },

    getMinDelivery (stores) {
      let minDelivery
      let minDeliveryDate

      for (let i = 0; i < stores.length; i++) {
        if (i === 0) {
          // eslint-disable-next-line no-unused-vars
          minDelivery = stores[i].delivery
          minDeliveryDate = stores[i].delivery_day
        } else if (stores[i].delivery < minDelivery) {
          minDelivery = stores[i].delivery
          minDeliveryDate = stores[i].delivery_day
        }
      }

      return {
        delivery: minDelivery,
        delivery_day: minDeliveryDate
      }
    },
    addBasket (id, value, storeid) {
      const data = { action: 'basket/add', id: router.currentRoute._value.params.id, id_product: id, value, store_id: storeid }
      this.busket_from_api(data).then()
      this.$emit('updateBasket')
    },
    ElemCount (object) {
      this.value = object.value
    }
  },
  mounted () {

  },
  components: { Counter },
  computed: {
    ...mapGetters([
      'basket'
    ])
  }
}
</script>
<style lang="scss">
</style>
