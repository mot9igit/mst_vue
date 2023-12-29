<template>
  <div class="copo">
    <div class="analitics-widget">
      <div class="organization" >
        <div class="dart-row">
          <div class="d-col-md-4" v-if="prods.all">
            <div class="panel-widget panel-widget-summ">
              <span>Остатки</span>
              <span class="sum">{{ prods.summ }} ₽</span>
              <span class="num">{{ prods.count_all }} шт.</span>
            </div>
          </div>
          <div class="d-col-md-8" v-if="prods.all">
            <div class="panel-widget panel-widget-remains">
              <div class="panel-widget-remains__graph">
                <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-5rem" />
                <span class="count">{{ $filters.round(prods.copo_percent) }}%</span>
                <span>сопоставленных<br/> товаров</span>
              </div>
              <div class="panel-widget-remains__stat">
                <div class="panel-widget-remains__stat-item">
                  <div class="data">
                    <span>Товаров всего</span>
                    <span>{{ prods.all }}</span>
                  </div>
                  <div class="line">
                    <span style="width: 100%;"></span>
                  </div>
                </div>
                <div class="panel-widget-remains__stat-item">
                  <div class="data">
                    <span>Товаров сопоставлено</span>
                    <span>{{ prods.copo }}</span>
                  </div>
                  <div class="line">
                    <span :style="'width: ' + prods.copo_percent + '%;'"></span>
                  </div>
                </div>
                <div class="products_href">
                  <router-link :to="{ name: 'report_copo', params: { id: $route.params.id } }">
                    Отчет по сопоставлению
                    <mdicon name="arrow-right" />
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="products">
      <v-table
        :items_data="products.products"
        :total="products.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        :filters="this.filters"
        title="Склад"
        @filter="filter"
        @sort="filter"
        @paginate="paginate"
      >
        <template v-slot:desc>
          <div v-if="organization.yml_file" class="dart-alert dart-alert-info dart-mt-1">
            <span>Вы можете посмотреть ваш каталог в формате <a :href="organization.yml_file" target="_blank">YML</a>.</span>
          </div>
        </template>
      </v-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from '../components/table/v-table'
import Chart from 'primevue/chart'

export default {
  name: 'ProfileProducts',
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25
    },
    pagination_offset: {
      type: Number,
      default: 0
    },
    org: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      chartData: null,
      chartOptions: {
        cutout: '60%'
      },
      prods: {
        copo_percent: 0,
        all: 0,
        copo: 0,
        count_all: 0,
        summ: 0
      },
      orders: {
        summ: 0,
        count: 0
      },
      dilers: {
        summ: 0,
        count: 0
      },
      distr: {
        summ: 0,
        count: 0
      },
      shipment: {
        total: 0,
        items: []
      },
      page: 1,
      filters: {
        name: {
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text'
        },
        product_id: {
          name: 'Привязанный товар',
          type: 'select',
          values: {
            'Все товары': '',
            'С привязанным товаром': 1,
            'С не привязанным товаром': 0
          }
        }
      },
      table_data: {
        image: {
          label: 'Фото',
          type: 'image'
        },
        article: {
          label: 'Артикул',
          type: 'text',
          sort: true
        },
        name: {
          label: 'Наименование',
          type: 'link',
          link_to: 'org_product',
          link_params: {
            id: this.$route.params.id,
            product_id: 'id'
          },
          sort: true
        },
        price: {
          label: 'Розничная цена',
          type: 'text',
          sort: true
        },
        remains: {
          label: 'Фактическое наличие',
          type: 'text',
          sort: true
        },
        reserved: {
          label: 'Резерв',
          type: 'text',
          sort: true
        },
        available: {
          label: 'Доступно для продажи',
          type: 'text',
          sort: true
        },
        sales: {
          label: 'Продаж за все время',
          type: 'text',
          sort: true
        },
        price_rrc: {
          label: 'Цена, РРЦ',
          type: 'text',
          sort: true
        },
        price_rrc_delta: {
          label: 'РРЦ дельта',
          type: 'text',
          sort: true
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'get_data_from_api',
      'get_organization_from_api'
    ]),
    setChartData () {
      return {
        datasets: [
          {
            data: [this.organization.products.copo_percent, this.organization.products.no_copo_percent],
            backgroundColor: ['#008FFF', '#EEEEEE'],
            hoverBackgroundColor: ['#008FFF', '#EEEEEE']
          }
        ]
      }
    },
    filter (data) {
      console.log(data)
      this.get_data_from_api(data)
    },
    paginate (data) {
      this.page = data.page
      this.get_data_from_api(data)
    }
  },
  mounted () {
    this.get_data_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    })
    this.get_organization_from_api().then(() => {
      this.chartData = this.setChartData()
      const num = this.organization.products.copo_percent
      this.prods.copo_percent = num
      this.prods.all = this.organization.products.count
      this.prods.copo = this.organization.products.copo_count
      this.prods.count_all = this.organization.products.count_all
      this.prods.summ = this.organization.products.summ
      // orders.summ && orders.count
      this.dilers.summ = this.organization.dilers.summ
      this.dilers.count = this.organization.dilers.count
      this.distr.summ = this.organization.distr.summ
      this.distr.count = this.organization.distr.count
      this.shipment.total = this.organization.shipment.total
      this.shipment.items = this.organization.shipment.items
    })
  },
  components: { vTable, Chart },
  computed: {
    ...mapGetters([
      'products',
      'organization'
    ]),
    date () {
      const today = new Date()
      return today.getDate()
    },
    month () {
      const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ]
      const today = new Date()
      return monthNames[today.getMonth()]
    },
    day () {
      const dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
      const today = new Date()
      return dayNames[today.getDay()]
    }
  }
}
</script>

<style lang="scss">
.analitics-widget{
  margin-bottom: 30px;
}
</style>
