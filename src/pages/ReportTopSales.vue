<template>
  <div class="profile">
    <v-table
      :items_data="topsales.products"
      :total="topsales.total"
      :pagination_items_per_page="this.pagination_items_per_page"
      :pagination_offset="this.pagination_offset"
      :page="this.page"
      :table_data="this.table_data"
      :filters="this.filters"
      title="Топы продаж"
      @filter="filter"
      @sort="filter"
      @paginate="paginate"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from '../components/table/v-table'

export default {
  name: 'ReportTopSales',
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
      pahe: 1,
      filters: {
        name: {
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text'
        },
        vendor: {
          name: 'Производитель',
          placeholder: 'Выберите производителя',
          type: 'dropdown',
          values: this.getvendors
        },
        range: {
          name: 'Временной промежуток',
          placeholder: 'Выберите даты',
          type: 'range'
        },
        store_type: {
          name: 'Тип организации',
          placeholder: 'Выберите тип организации',
          type: 'dropdown',
          values: [{
            name: 'Розница',
            id: 1
          }, {
            name: 'Опт',
            id: 2
          }]
        },
        region: {
          name: 'Регион',
          placeholder: 'Выберите регион',
          type: 'tree',
          values: this.getregions
        },
        catalog: {
          name: 'Категория товара',
          placeholder: 'Выберите категорию',
          type: 'tree',
          values: this.getcatalog
        },
        stores: {
          name: 'Магазин',
          placeholder: 'Выберите магазин',
          type: 'dropdown',
          values: this.getstores
        },
        warehouses: {
          name: 'Магазин',
          placeholder: 'Выберите оптовую компанию',
          type: 'dropdown',
          values: this.getwarehouses
        }
      },
      table_data: {
        image: {
          label: 'Фото',
          type: 'image'
        },
        vendor_article: {
          label: 'Артикул',
          type: 'text',
          sort: true
        },
        name: {
          label: 'Наименование',
          type: 'text',
          sort: true
        },
        roz_sales: {
          label: 'Продажи',
          type: 'text',
          sort: true
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'get_datatopsales_from_api',
      'get_regions_from_api',
      'get_catalog_from_api',
      'get_vendors_from_api',
      'get_stores_from_api',
      'get_warehouses_from_api'
    ]),
    filter (data) {
      this.loading = true
      this.get_datatopsales_from_api(data).then(
        result => {
          this.loading = false
        },
        error => {
          // alert error
          console.log('Произошла ошибка' + error)
        }
      )
    },
    paginate (data) {
      this.loading = true
      this.get_datatopsales_from_api(data).then(
        result => {
          this.loading = false
        },
        error => {
          // alert error
          console.log('Произошла ошибка ' + error)
        }
      )
    }
  },
  mounted () {
    this.get_datatopsales_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    }).then(
      result => {
        this.loading = false
      },
      error => {
        // alert error
        console.log('Произошла ошибка' + error)
      }
    )
    this.get_regions_from_api().then(
      this.filters.region.values = this.getregions
    )
    this.get_catalog_from_api().then(
      this.filters.catalog.values = this.getcatalog
    )
    this.get_vendors_from_api().then(
      this.filters.vendor.values = this.getvendors
    )
    this.get_stores_from_api().then(
      this.filters.stores.values = this.getstores
    )
    this.get_warehouses_from_api().then(
      this.filters.warehouses.values = this.warehouses
    )
  },
  components: { vTable },
  computed: {
    ...mapGetters([
      'topsales',
      'getregions',
      'getcatalog',
      'getvendors',
      'getstores',
      'getwarehouses'
    ])
  },
  watch: {
    getregions: function (newVal, oldVal) {
      this.filters.region.values = this.getregions
    },
    getcatalog: function (newVal, oldVal) {
      this.filters.catalog.values = this.getcatalog
    },
    getvendors: function (newVal, oldVal) {
      this.filters.vendor.values = this.getvendors
    },
    getstores: function (newVal, oldVal) {
      this.filters.stores.values = this.getstores
    },
    getwarehouses: function (newVal, oldVal) {
      this.filters.warehouses.values = this.getwarehouses
    }
  }
}
</script>

<style lang="scss">
</style>
