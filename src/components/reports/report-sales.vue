<template>
  <div class="to__up">
    <router-link :to="{ name: 'org_reports', params: { id: $route.params.id } }">
      <mdicon name="arrow-left" />
      <span>Назад к отчетам</span>
    </router-link>
  </div>
  <div class="profile-content__title">
    <span class="title">{{ getreport.name }} c {{ getreport.date_from }} по {{ getreport.date_to }}</span>
    <a :href="getreport.file" class="dart-btn dart-btn-text" v-if="getreport.file" download>
      <img src="/img/xslx.svg" alt="">
      <span>Скачать файл</span>
    </a>
</div>
  <div class="dart-alert dart-alert-info">Пока Вы видите суммарную информацию за период. Более подробный отчет в сформированном файле. </div>
  <TreeTable :value="getreports.items" :loading="loading">
    <Column field="name" header="" expander></Column>
    <Column field="remain_avg" header="Средний остаток"></Column>
    <Column field="sales" header="Продаж"></Column>
    <Column field="sales_speed" header="Средняя скорость продаж"></Column>
    <Column field="remain" header="Средний остаток на конец недели"></Column>
    <Column field="days_out_of_stock" header="Дней Out Of Stock"></Column>
  </TreeTable>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TreeTable from 'primevue/treetable'
import Column from 'primevue/column'

export default {
  name: 'ReportSales',
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
      reloading: false,
      filters: { },
      table_data: {
        name: {
          label: '',
          type: 'text',
          sort: false
        },
        remain_avg: {
          label: 'Средний остаток на конец недели',
          type: 'text',
          sort: false
        },
        sales: {
          label: 'Сумма продаж',
          type: 'text',
          sort: false
        },
        sales_speed: {
          label: 'Средняя скорость продаж',
          type: 'text',
          sort: false
        },
        remain: {
          label: 'Остаток на конец периода',
          type: 'text',
          sort: false
        },
        days_out_of_stock: {
          label: 'Сумма дней out of stock',
          type: 'text',
          sort: false
        }
      }
    }
  },
  components: { TreeTable, Column },
  computed: {
    ...mapGetters([
      'getreports',
      'getreport'
    ])
  },
  mounted () {
    this.get_report_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    })
    this.get_report_data_from_api({
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
  },
  unmounted () {
    this.unset_reports_data()
  },
  methods: {
    ...mapActions([
      'get_report_from_api',
      'get_report_data_from_api',
      'unset_reports_data'
    ]),
    filter (data) {
      this.true = false
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
      this.loading = true
      this.unset_reports_data()
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
  watch: { }
}
</script>

<style lang="scss">
</style>
