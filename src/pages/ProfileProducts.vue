<template>
  <div class="profile-content b-wrap">
    <div class="products">
      <v-table
        :items_data="products.products"
        :total="products.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        title="Остатки товаров"
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
  name: 'ProfileProducts',
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
        image: {
          label: 'Фото',
          type: 'image'
        },
        article: {
          label: 'Артикул',
          type: 'text'
        },
        name: {
          label: 'Наименование',
          type: 'link',
          link_to: 'org_product',
          link_params: {
            type: this.$route.params.type,
            id: this.$route.params.id,
            product_id: 'id'
          }
        },
        price: {
          label: 'Розничная цена',
          type: 'text'
        },
        remains: {
          label: 'Фактическое наличие',
          type: 'text'
        },
        reserved: {
          label: 'Резерв',
          type: 'text'
        },
        available: {
          label: 'Доступно для продажи',
          type: 'text'
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'get_data_from_api'
    ]),
    filter (data) {
      console.log(data)
      this.get_data_from_api(data)
    },
    paginate (data) {
      console.log(data)
      this.get_data_from_api(data)
    }
  },
  mounted () {
    console.log(this.$breadcrumbs.value)
    this.get_data_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    })
  },
  components: { vTable },
  computed: {
    ...mapGetters([
      'products'
    ])
  }
}
</script>

<style lang="scss">
</style>
