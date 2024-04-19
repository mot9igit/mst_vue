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
        <td>от 37 020 ₽</td>
        <td></td>
        <td></td>
        <td></td>
        <td>от 5 дн (5 апреля)</td>
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
            <Counter :min="0" :max="100" :value="0"/>
            <button class="dart-btn dart-btn-primary"><i class="d_icon d_icon-busket"></i></button>
          </form>
        </td>
        <td></td>
        <td>{{item.price}} ₽</td>
        <td>44 395 ₽ + 1 000 ₽</td>
        <td>50 дн</td>
        <td>Поставщик</td>
        <td>от 5 дн (5 апреля)</td>
        <td></td>
        <td>{{item.remains}} шт</td>
    </tr>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Counter from './Counter.vue'

export default {
  name: 'TableCatalogRow',
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
      active: false
    }
  },
  methods: {
    ...mapActions([
    ])
  },
  mounted () {
  },
  components: { Counter },
  computed: {
    ...mapGetters([
    ])
  }
}
</script>
<style lang="scss">
</style>
