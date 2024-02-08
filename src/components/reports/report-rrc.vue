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
    @filter="filter"
    @sort="filter"
    @paginate="paginate"
  >
    <template v-slot:desc>
      <span class="desc__text">Тип отчета: Соблюдение РРЦ</span>
      <span class="desc__text">Период:  с  {{ getreport.date_from }} по {{ getreport.date_to }}</span>
    </template>
  </v-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from '@/components/table/v-table.vue'

export default {
  name: 'ReportRrc',
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
      loading: false,
      page: 1,
      filters: {
        name: {
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text'
        }
      },
      table_data: {
        store_name: {
          label: 'Наименование магазина',
          type: 'link',
          link_to: 'org_reports_elems_page',
          link_params: {
            id: this.$route.params.id,
            report_id: this.$route.params.report_id,
            elem_id: 'id'
          },
          sort: true
        },
        avg_delta_percent: {
          label: 'Среднее отклонение, %',
          type: 'text',
          sort: true
        },
        avg_delta_middle_percent: {
          label: 'Отклонение средневз. цены, %',
          type: 'text',
          sort: true
        },
        avg_days_count: {
          label: 'Среднее кол-во дней не в РРЦ, %',
          type: 'text',
          sort: true
        },
        violation: {
          label: 'Нарушение РРЦ',
          type: 'boolean',
          calc: 'negative',
          sort: true
        }
      }
    }
  },
  components: { vTable },
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
  watch: {}
}
</script>

<style lang="scss">
</style>
