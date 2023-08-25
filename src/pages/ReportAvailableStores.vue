<template>
  <div class="profile">
    <div class="to__up">
      <router-link :to="{ name: 'org_reports_available', params: { id: $route.params.id } }">
        <mdicon name="arrow-left" />
        <span>Назад к регионам</span>
      </router-link>
    </div>
    <v-table
      :items_data="available_store.regions_data"
      :total="available_store.total"
      :pagination_items_per_page="this.pagination_items_per_page"
      :pagination_offset="this.pagination_offset"
      :page="this.page"
      :table_data="this.table_data"
      :filters="this.filters"
      :title="get_title"
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
  name: 'ReportAvailableStores',
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
        catalog: {
          name: 'Категория товара',
          placeholder: 'Выберите категорию',
          type: 'tree',
          values: this.getcatalog
        }
      },
      table_data: {
        name: {
          label: 'Наименование',
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
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'get_dataavailablestores_from_api',
      'get_catalog_from_api',
      'get_vendors_from_api',
      'unset_dataavailable'
    ]),
    filter (data) {
      this.unset_dataavailable()
      this.loading = true
      this.get_dataavailablestores_from_api(data).then(
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
      this.get_dataavailablestores_from_api(data).then(
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
    this.get_dataavailablestores_from_api({
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
    this.get_catalog_from_api().then(
      this.filters.catalog.values = this.getcatalog
    )
    this.get_vendors_from_api().then(
      this.filters.vendor.values = this.getvendors
    )
  },
  unmounted () {
    // очищаем репорт
    this.unset_dataavailable()
  },
  components: { vTable },
  computed: {
    ...mapGetters([
      'available_store',
      'getcatalog',
      'getvendors'
    ]),
    get_title: function () {
      if (this.available_store.region) {
        return 'Наличие товара в регионе: ' + this.available_store.region
      } else {
        return 'Наличие товара в регионе: ...'
      }
    }
  },
  watch: {
    getcatalog: function (newVal, oldVal) {
      this.filters.catalog.values = this.getcatalog
    },
    getvendors: function (newVal, oldVal) {
      this.filters.vendor.values = this.getvendors
    }
  }
}
</script>

<style lang="scss">
</style>
