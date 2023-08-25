<template>
  <div class="profile">
    <v-table
      :items_data="available.regions_data"
      :total="available.total"
      :pagination_items_per_page="this.pagination_items_per_page"
      :pagination_offset="this.pagination_offset"
      :page="this.page"
      :table_data="this.table_data"
      :filters="this.filters"
      title="Наличие товара"
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
  name: 'ReportAvaiblable',
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
      loading: true,
      filters: {
        vendor: {
          name: 'Производитель',
          placeholder: 'Выберите производителя',
          type: 'dropdown',
          values: this.getvendors
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
        name: {
          label: 'Наименование',
          type: 'link',
          link_to: 'org_reports_available_stores',
          link_params: {
            id: this.$route.params.id,
            region_id: 'id'
          },
          sort: true
        },
        population: {
          label: 'Население, чел',
          type: 'text',
          sort: true
        },
        count: {
          label: 'Кол-во товара, шт',
          type: 'text',
          sort: true
        },
        price: {
          label: 'Кол-во товара, ₽',
          type: 'text',
          sort: true
        },
        available_dots: {
          label: 'Торговых точек, шт',
          type: 'text',
          sort: true
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'get_dataavailable_from_api',
      'get_regions_from_api',
      'get_catalog_from_api',
      'get_vendors_from_api',
      'get_stores_from_api',
      'get_warehouses_from_api',
      'unset_dataavailable'
    ]),
    filter (data) {
      this.unset_dataavailable()
      this.loading = true
      this.get_dataavailable_from_api(data).then(
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
      this.unset_dataavailable()
      this.loading = true
      this.get_dataavailable_from_api(data).then(
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
    this.get_dataavailable_from_api({
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
      'available',
      'getregions',
      'getcatalog',
      'getvendors',
      'getstores',
      'getwarehouses'
    ]),
    organization_type: function () {
      return [{
        name: 'Розница',
        value: 1
      }, {
        name: 'Опт',
        value: 2
      }]
    }
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
