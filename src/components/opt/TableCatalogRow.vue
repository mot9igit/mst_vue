<template>
    <tr @click="this.active = !this.active" :class="{'active-el' : this.active, 'no-active-el' : !this.active}">
        <td><i class="pi pi-angle-up"></i></td>
        <td><span class="k-table__article">{{items.article}}</span></td>
        <td><img class="k-table__image" :src="items.image" alt=""></td>
        <td class="k-table__title"><p>{{items.pagetitle}}</p></td>
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
    <!-- <tr v-for="item in items.stores" v-bind:key="item.id" :class="{'active' : this.active, 'no-active' : !this.active}">
        <td></td>
        <td><span class="k-table__article">{{items.article}}</span></td>
        <td><img class="k-table__image" :src="items.image" alt=""></td>
        <td class="k-table__title" @click="openActions(item)"><p>{{item.name}}</p></td>
        <td class="k-table__busket">
          <form class="k-table__form" action="">
            <Counter @ElemCount="ElemCount" :min="1" :max="item.remains" :value="this.value"/>
            <div @click="addBasket(item.remain_id, this.value, item.store_id)" class="dart-btn dart-btn-primary"><i class="d_icon d_icon-busket"></i></div>
          </form>
        </td>
        <td>{{item.store_name}}</td>
        <td>{{Math.round(item.price).toLocaleString('ru')}} ₽</td>
        <td>{{Math.round(item.price).toLocaleString('ru')}} ₽ / {{Math.round(item.old_price - item.price).toLocaleString('ru')}} ₽</td>
        <td>{{item.action?.delay ? Number(item.action?.delay).toFixed(1) + ' дн' : 'Нет'}}</td>
        <td>{{item.action?.payer === '1' ? 'Поставщик' : 'Покупатель'}} </td>
        <td>от {{item.delivery}} дн ({{new Date(item.delivery_day).toLocaleString("ru", {month: 'long', day: 'numeric'})}})</td>
        <td>
          <div class="k-order__actions center">
            <div @click="openActions(item)" class="k-actions" v-for="(action, index) in item.actions" v-bind:key="action.id">
              <img :style="index > 2 ? { display: 'none' } : false" class="k-order__actions-el" :src="site_url_prefix + action.icon" >
              <div v-if="action.conflicts.items[action.action_id]?.length" :style="index > 2 ? { display: 'none' } : false" class="k-err-icon"><i class="pi pi-info"></i></div>
            </div>
            <div v-if="item.actions.length > 3" class="k-order__actions-el last">+{{ item.actions.length - 3 }}</div>
          </div>
          <span v-if="item?.actions[0]?.conflicts?.global" class="kenost-err-compatibility">* Несовместимость акций</span>
        </td>
        <td>{{item.remains}} шт</td>
    </tr> -->
    <tr class="kenost-table-background" v-for="item in items.stores" v-bind:key="item.id" :class="{'active' : this.active, 'no-active' : !this.active}">
        <td></td>
        <td><span class="k-table__article">{{items.article}}</span></td>
        <td><img class="k-table__image" :src="items.image" alt=""></td>
        <td class="k-table__title" @click="openActions(item)"><p>{{item.name}}</p></td>
        <td class="k-table__busket">
          <form class="k-table__form" action="">
            <Counter @ElemCount="ElemCount" :min="1" :max="item.remains" :value="this.value"/>
            <div @click="addBasket(item.remain_id, this.value, item.store_id)" class="dart-btn dart-btn-primary"><i class="d_icon d_icon-busket"></i></div>
          </form>
        </td>
        <td>{{item.store_name}}</td>
        <td>{{Math.round(item.price).toLocaleString('ru')}} ₽</td>
        <td>{{Math.round(item.price).toLocaleString('ru')}} ₽ / {{Math.round(item.old_price - item.price).toLocaleString('ru')}} ₽</td>
        <td>{{item.action?.delay ? Number(item.action?.delay).toFixed(1) + ' дн' : 'Нет'}}</td>
        <td>{{item.action?.payer === '1' ? 'Поставщик' : 'Покупатель'}} </td>
        <td>от {{item.delivery}} дн ({{new Date(item.delivery_day).toLocaleString("ru", {month: 'long', day: 'numeric'})}})</td>
        <td>
          <div class="k-order__actions center">
            <div @click="openActions(item)" class="k-actions" v-for="(action, index) in item.actions" v-bind:key="action.id">
              <img :style="index > 2 ? { display: 'none' } : false" class="k-order__actions-el" :src="site_url_prefix + action.icon" >
              <div v-if="action.conflicts.items[action.action_id]?.length" :style="index > 2 ? { display: 'none' } : false" class="k-err-icon"><i class="pi pi-info"></i></div>
            </div>
            <div v-if="item.actions.length > 3" class="k-order__actions-el last">+{{ item.actions.length - 3 }}</div>
          </div>
          <span v-if="item?.actions[0]?.conflicts?.global" class="kenost-err-compatibility">* Несовместимость акций</span>
        </td>
        <td>{{item.remains}} шт</td>
    </tr>
    <tbody class="complect-button kenost-table-background" v-for="complect in items.complects" v-bind:key="complect.id" :class="{'active' : this.active, 'no-active' : !this.active}">
      <tr v-for="(item, index) in complect" v-bind:key="item.id" :class="{'active' : this.active, 'no-active' : !this.active}">
        <td></td>
        <td><span class="k-table__article">{{item.article}}</span></td>
        <td><img class="k-table__image" :src="item.image" alt=""></td>
        <td class="k-table__title" @click="openActions(item)"><p>{{item.pagetitle}}</p></td>
        <td class="k-table__busket complect-button__td">
          <form class="k-table__form complect-button__form" action="" v-if="index === 0">
            <Counter @ElemCount="ElemCount" :min="1" :max="item.remains" :value="this.value"/>
            <div @click="addBasket(item.remain_id, this.value, item.store_id)" class="dart-btn dart-btn-primary"><i class="d_icon d_icon-busket"></i></div>
          </form>
        </td>
        <td><span v-if="index === 0">{{item.store_name}}</span></td>
        <td>{{Math.round(Number(item.new_price)).toLocaleString('ru')}}₽ x {{ item.multiplicity }} шт.</td>
        <td>{{Math.round(Number(item.price) * Number(item.multiplicity)).toLocaleString('ru')}} ₽ / {{Math.round(Number(item.price) * Number(item.multiplicity) - Number(item.new_price) * Number(item.multiplicity)).toLocaleString('ru')}} ₽</td>
        <td><span v-if="index === 0">{{item.action?.delay ? Number(item.action?.delay).toFixed(1) + ' дн' : 'Нет'}}</span></td>
        <td><span v-if="index === 0">{{item.action?.payer === '1' ? 'Поставщик' : 'Покупатель'}}</span></td>
        <td><span v-if="index === 0">от {{item.delivery}} дн ({{new Date(item.delivery_day).toLocaleString("ru", {month: 'long', day: 'numeric'})}})</span></td>
        <td>
          <!-- <div class="k-order__actions center">
            <div @click="openActions(item)" class="k-actions" v-for="(action, index) in item.actions" v-bind:key="action.id">
              <img :style="index > 2 ? { display: 'none' } : false" class="k-order__actions-el" :src="site_url_prefix + action.icon" >
              <div v-if="action.conflicts.items[action.action_id]?.length" :style="index > 2 ? { display: 'none' } : false" class="k-err-icon"><i class="pi pi-info"></i></div>
            </div>
            <div v-if="item.actions.length > 3" class="k-order__actions-el last">+{{ item.actions.length - 3 }}</div>
          </div>
          <span v-if="item?.actions[0]?.conflicts?.global" class="kenost-err-compatibility">* Несовместимость акций</span> -->
        </td>
        <td>{{item.remains}} шт</td>
      </tr>
    </tbody>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Counter from './Counter.vue'
import router from '@/router'

export default {
  name: 'TableCatalogRow',
  emits: ['updateBasket', 'ElemAction'],
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
    openActions (item) {
      this.$emit('ElemAction', item)
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
      const data = { action: 'basket/add', id: router.currentRoute._value.params.id, id_remain: id, value, store_id: storeid }
      this.busket_from_api(data).then()
      this.$emit('updateBasket')
    },
    ElemCount (object) {
      this.value = object.value
    }
  },
  mounted () {

  },
  components: {
    Counter
  },
  computed: {
    ...mapGetters([
      'basket'
    ])
  }
}
</script>
<style lang="scss">

.complect-button{
  &:hover{
    .complect-button__form{
      opacity: 1;
      pointer-events: all;
    }
  }

  &__td{
    position: relative;
  }

  &__form{
    position: absolute;
    top: 100%;
    transform: translate(0, -50%);
  }
}

.kenost-table-background:nth-child(2n){
  background: #F4F4F4 !important;
}

.k-actions{
  position: relative;
  &:not(:first-child) {
    margin-left: -10px;
  }
}

.kenost-err-compatibility{
  color: #FB203A;
  font-size: 10px;
}

.k-err-icon{
  width: 12px;
  height: 12px;
  background: #FB203A;
  rotate: 45deg;
  position: absolute;
  top: 0;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  i{
    color: #FFF;
    font-size: 8px;
    rotate: 135deg;
    position: relative;

    &::before{
      position: relative;
      top: 1px;
    }
  }
}
</style>
