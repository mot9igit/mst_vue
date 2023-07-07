<template>
  <div>
    <div class="dart-row">
      <div class="d-col-md-12">
        <v-table
          :items_data="getakbsettlements.items"
          :total="getakbsettlements.total"
          :pagination_items_per_page="this.pagination_items_per_page"
          :pagination_offset="this.pagination_offset"
          :page="this.page"
          :table_data="this.table_data"
          title="Сводка торговых точек по месяцам"
          @sort="filter"
          @paginate="paginate"
        >
        </v-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import vTable from '@/components/table/v-table'

export default {
  name: 'ReportAkbPunkts',
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
      coords: [58.006627, 56.227724],
      settings: {
        apiKey: '8a4240ba-5a98-49e5-8880-20d75fa3f9b9',
        lang: 'ru_RU',
        coordorder: 'latlong',
        enterprise: false,
        version: '2.1'
      },
      reloading: false,
      filters: { }
    }
  },
  components: { vTable },
  computed: {
    ...mapGetters([
      'getakbsettlements'
    ]),
    table_data () {
      const months = {
        '01': 'Январь',
        '02': 'Февраль',
        '03': 'Март',
        '04': 'Апрель',
        '05': 'Май',
        '06': 'Июнь',
        '07': 'Июль',
        '08': 'Август',
        '09': 'Сентябрь',
        10: 'Октябрь',
        11: 'Ноябрь',
        12: 'Декабрь'
      }
      const coloumns = {
        city: {
          label: 'Наименование населенного пункта',
          type: 'text',
          sort: false
        }
      }
      moment().locale('ru')
      const m = moment()
      m.subtract(11, 'months')
      for (let i = 0; i < 12; i++) {
        const name = 'month_' + m.format('MM')
        const mm = {}
        mm[name] = {
          label: months[m.format('MM')] + m.format(', YYYY'),
          type: 'text',
          sort: false
        }
        Object.assign(coloumns, mm)
        m.add(1, 'months')
      }
      return coloumns
    }
  },
  mounted () {
    this.get_akbsettlements_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    })
  },
  unmounted () {
    this.unset_akbsettlements_data()
  },
  methods: {
    ...mapActions([
      'get_akbsettlements_from_api',
      'unset_akbsettlements_data'
    ]),
    filter () {

    },
    paginate (data) {
      this.unset_akbsettlements_data()
      this.get_akbsettlements_from_api(data).then(
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
  .ymap{
    min-height: 100%;
    position: relative;
    & > div{
      position: relative;
      height: 450px;
    }
    .yandex-balloon{
      min-height: 150px;
      min-width: 150px;
      .title{
        display: block;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 106%;
        text-align: left;
        letter-spacing: 0.25px;
        color: #282828;
        & + p{
          margin-top: 10px;
        }
      }
      p{
        display: block;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 106%;
        text-align: left;
        letter-spacing: 0.25px;
        color: #282828;
      }
    }
  }
</style>
