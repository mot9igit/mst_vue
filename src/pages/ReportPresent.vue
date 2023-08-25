<template>
  <div class="profile">
    <v-table
      :items_data="present.items"
      :total="present.total"
      :pagination_items_per_page="this.pagination_items_per_page"
      :pagination_offset="this.pagination_offset"
      :page="this.page"
      :table_data="this.table_data"
      :filters="this.filters"
      title="План по первичной представленности"
      @clickElem="clickElem"
      @filter="filter"
      @sort="filter"
      @paginate="paginate"
    >
      <template v-slot:widgets>
        <div class="plan_values">
          <span class="plan_values__title">{{ present.summary.plan_field }}</span>
          <div class="plan_values__content">
            <div class="plan_values__chart">
              <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-5rem" />
            </div>
            <div class="plan_values__val">
              <span class="label">Значение показателя (факт):</span>
              <span class="value">{{ present.summary.fact }}</span>
            </div>
            <div class="plan_values__val">
              <span class="label">Значение показателя (план):</span>
              <span class="value">{{ present.summary.plan }}</span>
            </div>
          </div>
        </div>
      </template>
    </v-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Chart from 'primevue/chart'
import vTable from '../components/table/v-table'

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
      loading: true,
      filters: {
        range: {
          name: 'Период',
          placeholder: 'Выберите период',
          type: 'months_range'
        },
        region: {
          name: 'Регион',
          placeholder: 'Выберите регион',
          type: 'tree',
          values: this.getregions
        },
        matrix: {
          name: 'Матрица',
          placeholder: 'Выберите матрицу товаров',
          type: 'dropdown',
          values: this.getmatrix
        }
      },
      table_data: {
        name: {
          label: 'Наименование торговой точки',
          type: 'clickevent',
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
          sort: false
        },
        percent_delta: {
          label: 'Отклонение от целевого значения, %',
          type: 'text',
          sort: false
        },
        complete: {
          label: 'Целевой показатель выполнен',
          type: 'text',
          sort: false
        },
        date_from: {
          label: 'Дата подключения',
          type: 'text',
          sort: true
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'get_datapresent_from_api',
      'get_regions_from_api',
      'get_matrixes_from_api',
      'unset_storedata_data',
      'get_storedata_from_api'
    ]),
    clickElem (data) {
      console.log(data)
    },
    filter (data) {
      this.loading = true
      this.get_datapresent_from_api(data).then(
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
      this.get_datapresent_from_api(data).then(
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
    this.get_datapresent_from_api({
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
    this.get_matrixes_from_api().then(
      this.filters.matrix.values = this.getmatrixes
    )
  },
  components: { vTable, Chart },
  computed: {
    ...mapGetters([
      'getregions',
      'getmatrixes',
      'present',
      'getstoredata'
    ])
  },
  watch: {
    getmatrixes: function (newVal, oldVal) {
      this.filters.matrix.values = this.getmatrixes
    },
    getregions: function (newVal, oldVal) {
      this.filters.region.values = this.getregions
    }
  }
}
</script>

<style lang="scss">
</style>
