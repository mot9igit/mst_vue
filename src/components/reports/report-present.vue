<template>
  <div class="to__up">
    <router-link :to="{ name: 'org_reports', params: { id: $route.params.id } }">
      <mdicon name="arrow-left" />
      <span>Назад к отчетам</span>
    </router-link>
  </div>
  <v-table
    :items_data="getreports.items"
    :total="getreports.total"
    :pagination_items_per_page="this.pagination_items_per_page"
    :pagination_offset="this.pagination_offset"
    :page="this.page"
    :table_data="this.table_data"
    :filters="this.filters"
    :title="'Отчет Первичной представленности ' + getreport.name + ' с ' + getreport.date_from + ' по ' + getreport.date_to"
    @filter="filter"
    @sort="filter"
    @paginate="paginate"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from '@/components/table/v-table.vue'

export default {
  name: 'ReportPresent',
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
      loading: false,
      filters: {
        name: {
          name: 'Наименование торговой точки',
          placeholder: 'Наименование торговой точки',
          type: 'text'
        },
        region: {
          name: 'Регион',
          placeholder: 'Выберите регион',
          type: 'tree',
          values: this.getregions
        }
      },
      table_data: {
        name: {
          label: 'Наименование торговой точки',
          type: 'text',
          sort: true
        },
        region: {
          label: 'Регион',
          type: 'text',
          sort: true
        },
        city: {
          label: 'Населенный пункт',
          type: 'text',
          sort: true
        },
        percent: {
          label: '% от ключевой матрицы',
          type: 'text',
          sort: true
        },
        percent_delta: {
          label: 'Отклонение от целевого значения, %',
          type: 'text',
          sort: true
        },
        success: {
          label: 'Целевой показатель выполнен',
          type: 'boolean',
          calc: 'positive',
          sort: true
        },
        date_from: {
          label: 'Дата подключения',
          type: 'text',
          sort: true
        }
      }
    }
  },
  components: { vTable },
  computed: {
    ...mapGetters([
      'getregions',
      'getreports',
      'getreport'
    ])
  },
  mounted () {
    this.get_regions_from_api().then(
      this.filters.region.values = this.getregions
    )
    this.get_report_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    })
    this.get_report_data_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    })
  },
  unmounted () {
    // очищаем репорт
    this.unset_reports_data()
  },
  methods: {
    ...mapActions([
      'get_report_from_api',
      'get_report_data_from_api',
      'get_regions_from_api',
      'unset_reports_data'
    ]),
    filter (data) {
      this.unset_reports_data()
      this.get_report_data_from_api(data).then(
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
      this.unset_reports_data()
      this.loading = true
      this.get_report_data_from_api(data).then(
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
  watch: {
    getregions: function (newVal, oldVal) {
      this.filters.region.values = this.getregions
    }
  }
}
</script>

<style lang="scss">
</style>
