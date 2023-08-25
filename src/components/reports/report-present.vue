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
    :title="getreport.name"
    @clickElem="clickElem"
    @filter="filter"
    @sort="filter"
    @paginate="paginate"
  >
    <template v-slot:widgets v-if="getreports.summary">
      <div class="plan_values">
        <span class="plan_values__title">{{ getreports.summary.plan_field }}</span>
        <div class="plan_values__content">
          <div class="plan_values__chart">
            <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-5rem" />
          </div>
          <div class="plan_values__val">
            <span class="label">Значение показателя (факт):</span>
            <span class="value">{{ getreports.summary.fact }}</span>
          </div>
          <div class="plan_values__val">
            <span class="label">Значение показателя (план):</span>
            <span class="value">{{ getreports.summary.plan }}</span>
          </div>
        </div>
      </div>
    </template>
    <template v-slot:desc>
      <span class="desc__text">Тип отчета: Первичная представленность</span>
      <span class="desc__text">Период:  с  {{ getreport.date_from }} по {{ getreport.date_to }}</span>
    </template>
  </v-table>
  <teleport to="body">
    <custom-modal v-model="showPlanModal" @cancel="closePlanModal" class="plan-modal">
      <template v-slot:title>Выполнение по магазину</template>
      <v-table
        :items_data="getstoredata.items"
        :total="getstoredata.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_modal_data"
        :title="getstoredata.name + ' с ' + getreport.date_from + ' по ' + getreport.date_to"
        @paginate="paginateModal"
      />
    </custom-modal>
  </teleport>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import customModal from '@/components/popup/CustomModal'
import Chart from 'primevue/chart'
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
      showPlanModal: false,
      chartData: {},
      chartOptions: {},
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
      table_modal_data: {
        name: {
          label: 'Наименование товара',
          type: 'text',
          sort: true
        },
        plan: {
          label: 'План',
          type: 'text',
          sort: true
        },
        fact: {
          label: 'Факт',
          type: 'text',
          sort: true
        },
        percent: {
          label: 'Выполнение, %',
          type: 'text',
          sort: true
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
  components: { vTable, Chart, customModal },
  computed: {
    ...mapGetters([
      'getregions',
      'getreports',
      'getreport',
      'getstoredata',
      'unset_storedata_data',
      'get_storedata_from_api'
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
    clickElem (data) {
      console.log(data)
      this.showPlanModal = true
    },
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
    },
    paginateModal (data) {
      this.unset_products_remains_data()
      this.loading = true
      this.get_products_remains_from_api(data).then(
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
