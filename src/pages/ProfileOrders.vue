<template>
  <TabView class="tab-custom">
      <TabPanel header="Розничные заказы" v-if="organization.type != 1">
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
      <TabPanel header="Оптовые заказы" v-if="organization.type != 1">
        <div class="products">
          <v-table
            :items_data="optorder.orders"
            :total="optorder.total"
            :pagination_items_per_page="this.pagination_items_per_page"
            :pagination_offset="this.pagination_offset"
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
      <TabPanel header="Мои заказы">
        <div class="products">
          <v-table
            :items_data="my_orders.orders"
            :total="my_orders.total"
            :pagination_items_per_page="this.pagination_items_per_page"
            :pagination_offset="this.pagination_offset"
            :page="this.page_opt"
            :table_data="this.table_data_opt_my"
            :filters="this.filters_opt_my"
            title="Заказы"
            @filter="filter_opt_my"
            @sort="filter_opt_my"
            @paginate="paginate_opt_my"
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
    }
  },
  data () {
    return {
      page: 1,
      page_opt: 1,
      page_our: 1,
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
      filters_opt_my: {
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
        status_name: {
          label: 'Статус',
          type: 'status'
        }
      },
      table_data_opt_my: {
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
        status_name: {
          label: 'Статус',
          type: 'status'
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'get_organization_from_api',
      'get_orders_from_api',
      'get_opt_order_api',
      'get_opt_my_order_api'
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
      data.id = router.currentRoute._value.params.id
      data.action = 'get/orders/seller'
      this.get_opt_order_api(data)
    },
    paginate_opt (data) {
      data.id = router.currentRoute._value.params.id
      data.action = 'get/orders/seller'
      this.get_opt_order_api(data)
    },
    filter_opt_my (data) {
      data.id = router.currentRoute._value.params.id
      data.action = 'get/orders/buyer'
      this.get_opt_my_order_api(data)
    },
    paginate_opt_my (data) {
      data.id = router.currentRoute._value.params.id
      data.action = 'get/orders/buyer'
      this.get_opt_my_order_api(data)
    }
  },
  mounted () {
    this.get_organization_from_api().then(() => {
      this.get_orders_from_api({
        page: this.page,
        perpage: this.pagination_items_per_page
      })
      this.get_opt_order_api({
        action: 'get/orders/seller',
        id: router.currentRoute._value.params.id,
        page: this.page_opt,
        perpage: this.pagination_items_per_page_opt
      })
      this.get_opt_my_order_api({
        action: 'get/orders/buyer',
        id: router.currentRoute._value.params.id,
        page: this.page_opt,
        perpage: this.pagination_items_per_page_opt
      })
    })
  },
  components: { vTable, TabView, TabPanel },
  computed: {
    ...mapGetters([
      'orders',
      'optorder',
      'organization',
      'my_orders'
    ])
  }
}
</script>

<style lang="scss">
</style>
