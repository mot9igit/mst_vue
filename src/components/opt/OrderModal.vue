<template>
    <div class="k-order">

    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'

export default {
  name: 'Basket',
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25
    },
    pagination_offset: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      loading: true,
      basket: {}
    }
  },
  methods: {
    ...mapActions([
      'busket_from_api'
    ]),
    ElemCount (object) {
      const data = { action: 'basket/update', id: router.currentRoute._value.params.id, id_product: object.id, value: object.value, store_id: object.store_id }
      this.busket_from_api(data).then()
    },
    clearBasket () {
      const data = { action: 'basket/clear', id: router.currentRoute._value.params.id }
      this.busket_from_api(data).then()
    },
    clearBasketProduct (storeid, productid) {
      const data = { action: 'basket/clear', id: router.currentRoute._value.params.id, store_id: storeid, id_product: productid }
      this.busket_from_api(data).then()
    }
  },
  mounted () {
    const data = { action: 'basket/get', id: router.currentRoute._value.params.id }
    this.busket_from_api(data).then(
      this.basket = this.optbasket
    )
  },
  components: { },
  computed: {
    ...mapGetters([
      'optbasket'
    ])
  },
  watch: {
    optbasket: function (newVal, oldVal) {
      this.basket = newVal
    }
  }
}
</script>
<style lang="scss">

</style>
