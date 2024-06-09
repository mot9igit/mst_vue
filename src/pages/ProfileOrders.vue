<template>
  <TabView class="tab-custom">
      <TabPanel header="Розничные заказы">
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
              @sort="filter"
              @paginate="paginate"
            />
        </div>
      </TabPanel>
      <TabPanel header="Оптовые заказы">
        <div class="products">
          <v-table
            :items_data="optorder.orders"
            :total="optorder.total"
            :pagination_items_per_page="this.pagination_items_per_page_opt"
            :pagination_offset="this.pagination_offset_opt"
            :page="this.page_opt"
            :table_data="this.table_data_opt"
            :filters="this.filters_opt"
            title="Заказы"
            @filter="filter_opt"
            @sort="filter_opt"
            @paginate="paginate_opt"
          />
        </div>
      </TabPanel>
  </TabView>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from '../components/table/v-table'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import router from '@/router'

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
    },
    pagination_items_per_page_opt: {
      type: Number,
      default: 25
    },
    pagination_offset_opt: {
      type: Number,
      default: 0
    },
    page_opt: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      filters: {
        name: {
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text'
        }
      },
      filters_opt: {
        name: {
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text'
        }
      },
      table_data: {
        num: {
          label: 'Номер',
          type: 'link',
          link_to: 'org_order',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id'
          },
          sort: true
        },
        customer: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'org_order',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id'
          }
        },
        createdon: {
          label: 'Дата',
          type: 'link',
          link_to: 'org_order',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id'
          },
          sort: true
        },
        status: {
          label: 'Статус',
          type: 'status'
        },
        cost: {
          label: 'Сумма',
          type: 'link',
          link_to: 'org_order',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id'
          },
          sort: true
        },
        delivery: {
          label: 'Доставка',
          type: 'link',
          link_to: 'org_order',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id'
          }
        },
        payment: {
          label: 'Оплата',
          type: 'link',
          link_to: 'org_order',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id'
          }
        }
      },
      table_data_opt: {
        id: {
          label: 'Номер',
          type: 'link',
          link_to: 'opt_order',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id'
          },
          sort: true
        },
        store_name: {
          label: 'Покупатель',
          type: 'link',
          link_to: 'opt_order',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id'
          }
        },
        createdon: {
          label: 'Дата',
          type: 'link',
          link_to: 'opt_order',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id'
          },
          sort: true
        },
        // status: {
        //   label: 'Статус',
        //   type: 'status'
        // },
        cost: {
          label: 'Сумма',
          type: 'link',
          link_to: 'org_order',
          link_params: {
            id: this.$route.params.id,
            order_id: 'id'
          },
          sort: true
        }
        // delivery: {
        //   label: 'Доставка',
        //   type: 'link',
        //   link_to: 'org_order',
        //   link_params: {
        //     id: this.$route.params.id,
        //     order_id: 'id'
        //   }
        // },
        // payment: {
        //   label: 'Оплата',
        //   type: 'link',
        //   link_to: 'org_order',
        //   link_params: {
        //     id: this.$route.params.id,
        //     order_id: 'id'
        //   }
        // }
      }
    }
  },
  methods: {
    ...mapActions([
      'get_orders_from_api',
      'get_opt_order_api'
    ]),
    filter (data) {
      console.log(data)
      this.get_orders_from_api(data)
    },
    paginate (data) {
      console.log(data)
      this.get_orders_from_api(data)
    },
    filter_opt (data) {
      data.store_id = router.currentRoute._value.params.id
      data.action = 'get/orders/seller'
      this.get_opt_order_api(data)
    },
    paginate_opt (data) {
      data.store_id = router.currentRoute._value.params.id
      data.action = 'get/orders/seller'
      this.get_opt_order_api(data)
    }
  },
  mounted () {
    this.get_orders_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    })
    this.get_opt_order_api({
      action: 'get/orders/seller',
      store_id: router.currentRoute._value.params.id,
      page: this.page_opt,
      perpage: this.pagination_items_per_page_opt
    })
    console.log(this.optorder)
    console.log(Object.assign({}, this.$store.state.orders.orders.statuses))
  },
  components: { vTable, TabView, TabPanel },
  computed: {
    ...mapGetters([
      'orders',
      'optorder'
    ])
  }
}
</script>

<style lang="scss">
</style>
