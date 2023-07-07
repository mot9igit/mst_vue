<template>
  <div class="to__up">
    <router-link :to="{ name: 'org_reports_page', params: { id: $route.params.id, report_id: $route.params.report_id} }">
      <mdicon name="arrow-left" />
      <span>Назад к магазинам</span>
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
    :title="'Отчет соблюдения РРЦ ' + getreport.name + ' с ' + getreport.date_from + ' по ' + getreport.date_to"
    @filter="filter"
    @sort="filter"
    @paginate="paginate"
  />
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
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text'
        }
      },
      table_data: {
        product_image: {
          label: 'Фото',
          type: 'image'
        },
        product_vendor_article: {
          label: 'Артикул',
          type: 'text',
          sort: true
        },
        product_name: {
          label: 'Наименование товара',
          type: 'text',
          sort: true
        },
        price_now: {
          label: 'Цена на полке в данный момент, ₽',
          type: 'text',
          sort: true
        },
        price_rrc: {
          label: 'РРЦ, ₽',
          type: 'text',
          sort: true
        },
        avg_price: {
          label: 'Средняя цена, ₽',
          type: 'text',
          sort: true
        },
        avg_variation_percent: {
          label: 'Среднее отклонение, %',
          type: 'text',
          sort: true
        },
        avg_variation_money: {
          label: 'Среднее отклонение, ₽',
          type: 'text',
          sort: true
        },
        avg_weighted_price: {
          label: 'Средневзв. цена, ₽',
          type: 'text',
          sort: true
        },
        /* avg_weighted_price_variation_percent: {
          label: 'Среднее отклонение средневзв., %',
          type: 'text',
          sort: true
        },
        avg_weighted_price_variation_money: {
          label: 'Среднее отклонение средневзв., ₽',
          type: 'text',
          sort: true
        }, */
        not_rrc_days: {
          label: 'Кол-во дней не в РРЦ',
          type: 'text',
          sort: true
        },
        max_price: {
          label: 'Макс. цена, ₽',
          type: 'text',
          sort: true
        },
        min_price: {
          label: 'Мин. цена, ₽',
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
