<template>
    <v-table
        :items_data="returns_product"
        :total="this.returns_product.length"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.forecast_data"
        title="Возвраты"
        >
    </v-table>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from '@/components/table/v-table'

export default {
  name: 'ProfileReturns',
  props: {},
  data () {
    return {
      showFormModal: false,
      forecast_data: {
        image: {
          label: '',
          type: 'image',
          sort: false
        },
        pagetitle: {
          label: 'Товар',
          type: 'link',
          link_to: 'returns_catalog',
          link_params: {
            id: this.$route.params.id,
            returns_id: 'id'
          },
          sort: true
        },
        date: {
          label: 'Дата создания',
          type: 'text',
          sort: true
        },
        date_order: {
          label: 'Дата покупки',
          type: 'text',
          sort: true
        },
        number_order: {
          label: 'Номер заказа',
          type: 'text',
          sort: true
        },
        status_name: {
          label: 'Статус',
          type: 'text',
          sort: true
        },
        decision: {
          label: 'Решение',
          type: 'text',
          sort: true
        },
        full_name: {
          label: 'Данные покупателя',
          type: 'text',
          sort: true
        }
      },
      returns_product: []
    }
  },
  methods: {
    ...mapActions([
      'get_returns_products_from_api'
    ])
  },
  mounted () {
    this.get_returns_products_from_api().then(
      this.returns_product = this.returnsproduct
    )
  },
  components: { vTable },
  computed: {
    ...mapGetters([
      'returnsproduct'
    ])
  },
  watch: {
    returnsproduct: function (newVal, oldVal) {
      this.returns_product = newVal
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
