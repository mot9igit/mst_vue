<template>
  <div class="profile-content b-wrap">
    <div class="products">
      <v-table
        :items_data="orders.orders"
        :total="orders.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        :filters="this.filters"
        title="Заказы"
        @filter="filter"
        @paginate="paginate"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from '../components/table/v-table'

export default {
  name: 'ProfileOrders',
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25
    },
    pagination_offset: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      table_data: {
        num: {
          label: 'Номер',
          type: 'link',
          link_to: 'org_order',
          link_params: {
            type: this.$route.params.type,
            id: this.$route.params.id,
            order_id: 'id'
          }
        },
        customer: {
          label: 'Покупатель',
          type: 'text'
        },
        createdon: {
          label: 'Дата',
          type: 'text'
        },
        status: {
          label: 'Статус',
          type: 'text'
        },
        cost: {
          label: 'Сумма',
          type: 'text'
        }
      },
      filters: {
        filter: {
          label: 'Поиск по полям заказа',
          type: 'text'
        },
        status: {
          label: 'Статус',
          type: 'select',
          data: this.$store.state.orders.orders.statuses
        },
        from: {
          label: 'От',
          type: 'date'
        },
        to: {
          label: 'До',
          type: 'date'
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'get_orders_from_api'
    ]),
    filter (data) {
      console.log(data)
      this.get_orders_from_api(data)
    },
    paginate (data) {
      console.log(data)
      this.get_orders_from_api(data)
    }
  },
  mounted () {
    console.log(this.$breadcrumbs.value)
    this.get_orders_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    })
    console.log(Object.assign({}, this.$store.state.orders.orders.statuses))
  },
  components: { vTable },
  computed: {
    ...mapGetters([
      'orders'
    ])
  }
}
</script>

<style lang="scss">
</style>
