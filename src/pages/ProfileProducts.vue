<template>
  <div class="copo">
    <div class="dart-back-link">
      <router-link :to="{ name: 'organizations' }">
        <mdicon name="arrow-left" />
        <span>Назад к товарам</span>
      </router-link>
    </div>
    <h1 class="h1-mini">Сопоставление товаров</h1>
    <p class="info-text mb-3">Для работы вам необходимо достигнуть и поддерживать уровень сопоставления товаров по стоимости не менее 80%.</p>
    <div class="analitics-widget">
      <div class="organization" >
        <div class="dart-row">
          <div class="d-col-md-6" v-if="prods.all">
            <div class="panel-widget panel-widget-remains">
                <div class="panel-widget-remains__graph">
                  <Chart type="doughnut" :data="chartDataMoney" :options="chartOptions" class="w-full md:w-5rem graph-main" />
                  <span class="count">{{ $filters.round(prods.copo_money_percent) }}%</span>
                  <span>сопоставленных<br/> товаров по стоимости</span>
                </div>
                <div class="panel-widget-remains__stat">
                  <div class="panel-widget-remains__stat-item">
                    <div class="data">
                      <span>Товаров на сумму</span>
                      <span>{{ prods.summ }}</span>
                    </div>
                    <div class="line">
                      <span style="width: 100%;"></span>
                    </div>
                  </div>
                  <div class="panel-widget-remains__stat-item">
                    <div class="data">
                      <span>Товаров сопоставлено на сумму</span>
                      <span>{{ prods.summ_copo }}</span>
                    </div>
                    <div class="line">
                      <span :style="'width: ' + prods.copo_money_percent + '%;'"></span>
                    </div>
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
          <div class="d-col-md-6" v-if="prods.all">
            <div class="panel-widget panel-widget-remains">
              <div class="panel-widget-remains__graph">
                <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-5rem graph-main" />
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
              </div>
              <div class="products_href">
                  <router-link :to="{ name: 'report_copo', params: { id: $route.params.id } }">
                    Отчет по сопоставлению
                    <mdicon name="arrow-right" />
                  </router-link>
                </div>
            </div>
          </div>

          <div class="d-col-xxl-3 d-col-lg-6" v-if="products.status">
            <div class="dart-helper dart-helper-1">
              <div class="dart-helper__nav">
                <div class="dart-helper__left">
                  <p>Укажите цену</p>
                  <span>{{ (products.status[5].count).toLocaleString('ru') }}</span>
                </div>
                <div class="dart-helper__right">
                </div>
              </div>
              <div class="dart-helper__body">
                <Chart type="doughnut" :data="chartDataHelpOne" :options="chartOptions" class="w-full md:w-5rem dart-helper__graph" />
                <div class="dart-helper__info">
                  <b>{{(this.products.status[5].count / (this.products.status.total / 100)).toFixed(2)}} %</b>
                  <p>от общего сопоставления</p>
                </div>
              </div>
              <div class="dart-helper-footer" v-bind:class="{ show: helpers[0][0] }">
                <div class="dart-helper-footer__text">
                  <p>Укажите цену в карточке</p>
                </div>
                <div class="dart-helper-footer__icon">
                  <i class="d_icon d_icon-arrow" @click="helpers[0][0] = !helpers[0][0]"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="d-col-xxl-3 d-col-lg-6" v-if="products.status">
            <div class="dart-helper dart-helper-2">
              <div class="dart-helper__nav">
                <div class="dart-helper__left">
                  <p>Нет бренда</p>
                  <span>{{ (products.status[1].count).toLocaleString('ru') }}</span>
                </div>
                <div class="dart-helper__right">
                  <p>На сумму</p>
                  <span>{{ Number((products.status[1].sum)).toLocaleString('ru') }} ₽</span>
                </div>
              </div>
              <div class="dart-helper__body">
                <Chart type="doughnut" :data="chartDataHelpTwo" :options="chartOptions" class="w-full md:w-5rem dart-helper__graph" />
                <div class="dart-helper__info">
                  <b>{{(this.products.status[1].count / (this.products.status.total / 100)).toFixed(2)}} %</b>
                  <p>от общего сопоставления</p>
                </div>
              </div>
              <div class="dart-helper-footer" v-bind:class="{ show: helpers[0][1] }">
                <div class="dart-helper-footer__text">
                  <p>Укажите актикул в карточке</p>
                </div>
                <div class="dart-helper-footer__icon">
                  <i class="d_icon d_icon-arrow" @click="helpers[0][1] = !helpers[0][1]"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="d-col-xxl-3 d-col-lg-6" v-if="products.status">
            <div class="dart-helper dart-helper-3">
              <div class="dart-helper__nav">
                <div class="dart-helper__left">
                  <p>Нет артикула</p>
                  <span>{{ (products.status[2].count).toLocaleString('ru') }}</span>
                </div>
                <div class="dart-helper__right">
                  <p>На сумму</p>
                  <span>{{ Number((products.status[2].sum)).toLocaleString('ru') }} ₽</span>
                </div>
              </div>
              <div class="dart-helper__body">
                <Chart type="doughnut" :data="chartDataHelpThee" :options="chartOptions" class="w-full md:w-5rem dart-helper__graph" />
                <div class="dart-helper__info">
                  <b>{{(this.products.status[2].count / (this.products.status.total / 100)).toFixed(2)}} %</b>
                  <p>от общего сопоставления</p>
                </div>
              </div>
              <div class="dart-helper-footer" v-bind:class="{ show: helpers[0][2] }">
                <div class="dart-helper-footer__text">
                  <p>Укажите бренд в карточке</p>
                </div>
                <div class="dart-helper-footer__icon">
                  <i class="d_icon d_icon-arrow" @click="helpers[0][2] = !helpers[0][2]"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="d-col-xxl-3 d-col-lg-6" v-if="products.status">
            <div class="dart-helper dart-helper-4">
              <div class="dart-helper__nav">
                <div class="dart-helper__left">
                  <p>Нет карточки</p>
                  <span>{{ (products.status[4].count).toLocaleString('ru') }}</span>
                </div>
                <div class="dart-helper__right">
                  <p>На сумму</p>
                  <span>{{ Number((products.status[4].sum)).toLocaleString('ru') }} ₽</span>
                </div>
              </div>
              <div class="dart-helper__body">
                <Chart type="doughnut" :data="chartDataHelpFour" :options="chartOptions" class="w-full md:w-5rem dart-helper__graph" />
                <div class="dart-helper__info">
                  <b>{{(this.products.status[4].count / (this.products.status.total / 100)).toFixed(2)}} %</b>
                  <p>от общего сопоставления</p>
                </div>
              </div>
              <div class="dart-helper-footer" v-bind:class="{ show: helpers[0][3] }">
                <div class="dart-helper-footer__text">
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                  <p>Запросите добавление карточек бренда</p>
                  <p>Запросите добавление карточки товара</p>
                </div>
                <div class="dart-helper-footer__icon">
                  <i class="d_icon d_icon-arrow" @click="helpers[0][3] = !helpers[0][3]"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="products">
      <TabView class="tab-custom">
          <TabPanel header="По брендам">
              <v-table
                :items_data="report_copo.items"
                :total="report_copo.total"
                :pagination_items_per_page="this.pagination_items_per_page"
                :pagination_offset="this.pagination_offset"
                :page="this.page_brand"
                :table_data="this.table_data_brand"
                :filters="this.filtersbrand"
                @filter="filterbrand"
                @sort="filterbrand"
                @paginate="paginatebrand"
              >
              </v-table>
          </TabPanel>
          <TabPanel header="По товарам">
            <v-table
              :items_data="products.products"
              :total="products.total"
              :pagination_items_per_page="this.pagination_items_per_page"
              :pagination_offset="this.pagination_offset"
              :page="this.page"
              :table_data="this.table_data"
              :filters="this.filters"
              title="Сопоставление по товарам"
              @filter="filter"
              @sort="filter"
              @paginate="paginate"
            >
              <template v-slot:button>
                <button class="dart-btn dart-btn-primary" @click="modalToggle"><i class="d_icon d_icon-search"></i> Поиск по каталогу</button>
              </template>
            </v-table>
          </TabPanel>
      </TabView>
    </div>
    <div class="search-for-catalog" v-bind:class="{ active: isModal }" @click="modalToggle">
        <div class="search-for-catalog__content" @click.stop="">
            <div class="search-for-catalog__title">
              <h2>Поиск по каталогу карточек</h2>
              <i @click="this.isModal = !this.isModal" class="d_icon d_icon-close"></i>
            </div>
            <div class="search-for-catalog__table">
              <v-table
                :items_data="products.products"
                :total="products.total"
                :pagination_items_per_page="this.pagination_items_per_page"
                :pagination_offset="this.pagination_offset"
                :page="this.page"
                :table_data="this.table_modal"
                :filters="this.filters_modal"
                title=""
                @filter="filter"
                @sort="filter"
                @paginate="paginate"
              ></v-table>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from '../components/table/v-table'
import Chart from 'primevue/chart'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'

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
      chartDataMoney: null,
      chartDataHelpOne: null,
      chartDataHelpTwo: null,
      chartDataHelpThee: null,
      chartDataHelpFour: null,
      isModal: false,
      chartOptions: {
        cutout: '60%'
      },
      helpers: [{
        0: false,
        1: false,
        2: false,
        3: false
      }],
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
      page_brand: 1,
      filters: {
        name: {
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text'
        },
        status: {
          name: 'Статус',
          placeholder: 'Статус',
          type: 'dropdown',
          values: this.getcardstatus
        }
      },
      filters_modal: {
        name: {
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text'
        }
      },
      filtersbrand: {
        name: {
          name: 'Наименование товара, артикул',
          placeholder: 'Наименование товара, артикул',
          type: 'text'
        },
        instock: {
          name: 'В наличии',
          placeholder: 'В наличии',
          type: 'checkbox',
          values: 1
        }
      },
      table_data_brand: {
        name: {
          label: 'Наименование',
          type: 'link',
          link_to: 'report_copo_details',
          link_params: {
            id: this.$route.params.id,
            brand_id: 'id'
          },
          sort: true
        },
        find: {
          label: 'Найдено',
          type: 'text',
          sort: true
        },
        identified: {
          label: 'Сопоставлено',
          type: 'text',
          sort: true
        },
        cards: {
          label: 'Карточек создано',
          type: 'text',
          sort: true
        },
        percent_identified: {
          label: '% сопоставления',
          type: 'text',
          sort: true
        }
      },
      table_modal: {
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
        catalog: {
          label: 'Категория',
          type: 'text',
          sort: true
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
          description: {
            type: 'field',
            key: 'catalog'
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
      'get_organization_from_api',
      'get_report_copo_from_api',
      'get_cardstatus_from_api'
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
    setChartDataMoney () {
      return {
        datasets: [
          {
            data: [this.organization.products.copo_money_percent, this.organization.products.no_copo_money_percent],
            backgroundColor: ['#008FFF', '#EEEEEE'],
            hoverBackgroundColor: ['#008FFF', '#EEEEEE']
          }
        ]
      }
    },
    setChartDataHelpOne () {
      return {
        datasets: [
          {
            data: this.products?.status ? [(this.products?.status[5]?.count / (this.products.status.total / 100)).toFixed(2), 100 - (this.products?.status[5]?.count / (this.products.status.total / 100)).toFixed(2)] : [0, 0],
            backgroundColor: ['#008FFF', '#EEEEEE'],
            hoverBackgroundColor: ['#008FFF', '#EEEEEE']
          }
        ]
      }
    },
    setChartDataHelpTwo () {
      return {
        datasets: [
          {
            data: this.products?.status ? [(this.products?.status[1]?.count / (this.products.status.total / 100)).toFixed(2), 100 - (this.products?.status[1]?.count / (this.products.status.total / 100)).toFixed(2)] : [0, 0],
            backgroundColor: ['#F363E6', '#EEEEEE'],
            hoverBackgroundColor: ['#F363E6', '#EEEEEE']
          }
        ]
      }
    },
    setChartDataHelpTree () {
      return {
        datasets: [
          {
            data: this.products?.status ? [(this.products?.status[2]?.count / (this.products.status.total / 100)).toFixed(2), 100 - (this.products?.status[2]?.count / (this.products.status.total / 100)).toFixed(2)] : [0, 0],
            backgroundColor: ['#FF6221', '#EEEEEE'],
            hoverBackgroundColor: ['#FF6221', '#EEEEEE']
          }
        ]
      }
    },
    setChartDataHelpFour () {
      return {
        datasets: [
          {
            data: this.products?.status ? [(this.products?.status[4]?.count / (this.products.status.total / 100)).toFixed(2), 100 - (this.products?.status[4]?.count / (this.products.status.total / 100)).toFixed(2)] : [0, 0],
            backgroundColor: ['#FFD02C', '#EEEEEE'],
            hoverBackgroundColor: ['#FFD02C', '#EEEEEE']
          }
        ]
      }
    },
    modalToggle () {
      this.isModal = !this.isModal
    },
    filter (data) {
      this.products.total = -1
      this.get_data_from_api(data)
    },
    filterbrand (data) {
      this.report_copo.total = -1
      this.get_report_copo_from_api(data)
    },
    paginate (data) {
      this.products.total = -1
      this.page = data.page
      this.get_data_from_api(data)
    },
    paginatebrand (data) {
      this.report_copo.total = -1
      this.page_brand = data.page
      this.get_report_copo_from_api(data)
    }
  },
  mounted () {
    this.get_data_from_api({
      page: this.page,
      page_brand: this.page_brand,
      perpage: this.pagination_items_per_page
    })
    this.get_report_copo_from_api({
      tabledata: this.table_data,
      page: this.page,
      perpage: this.pagination_items_per_page
    })
    this.get_organization_from_api().then(() => {
      this.chartData = this.setChartData()
      this.chartDataMoney = this.setChartDataMoney()
      this.chartDataHelpOne = this.setChartDataHelpOne()
      this.chartDataHelpTwo = this.setChartDataHelpTwo()
      this.chartDataHelpThee = this.setChartDataHelpTree()
      this.chartDataHelpFour = this.setChartDataHelpFour()
      const num = this.organization.products.copo_percent
      this.prods.copo_percent = num
      this.prods.all = this.organization.products.count
      this.prods.copo = this.organization.products.copo_count
      this.prods.count_all = this.organization.products.count_all
      this.prods.summ = this.organization.products.summ
      this.prods.copo_money_percent = this.organization.products.copo_money_percent
      this.prods.no_copo_money_percent = this.organization.products.no_copo_money_percent
      this.prods.summ_copo = this.organization.products.summ_copo
      // orders.summ && orders.count
      this.dilers.summ = this.organization.dilers.summ
      this.dilers.count = this.organization.dilers.count
      this.distr.summ = this.organization.distr.summ
      this.distr.count = this.organization.distr.count
      this.shipment.total = this.organization.shipment.total
      this.shipment.items = this.organization.shipment.items
      this.get_cardstatus_from_api()
    })
  },
  components: { vTable, Chart, TabView, TabPanel },
  computed: {
    ...mapGetters([
      'products',
      'organization',
      'report_copo',
      'getcardstatus'
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
  },
  watch: {
    getcardstatus: function (newVal, oldVal) {
      this.filters.status.values = newVal
    },
    report_copo_details: function (newVal, oldVal) {
      this.vendor = newVal.vendor
    }
  }
}
</script>

<style lang="scss">

.search-for-catalog{
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  pointer-events: none;
  z-index: 1;

  &__title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;

    h2{
      margin: 0;
      font-size: 20px;
      font-weight: 500;
    }

    .d_icon{
      color: #C8C8C8;
      font-size: 14px;
      cursor: pointer;
    }
  }

  &__content{
    width: 570px;
    padding: 60px 40px;
    height: 100dvh;
    background: #FFF;
    position: fixed;
    right: 0;
    top: 0;
    pointer-events: all;
    transform: translateX(100%);
    transition: all 0.4s;
    border-left: 1px solid #E2E2E2;
  }

  &.active{
    pointer-events: all !important;
    .search-for-catalog{
      &__content{
        transform: translateX(0);
      }
    }
  }

  &__table{
    overflow: auto;
    height: calc(100% - 30px);
    padding-right: 8px;

    .d-col-md-3{
      width: 100% !important;
    }

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: #e0e0e0; /* blue */
      border-radius: 9em;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #b4b4b4; /* green */
        border-radius: 9em;
    }
  }
}

.analitics-widget{
  margin-bottom: 30px;
}

.dart-back-link{
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 1.25px;
}

.dart-back-link a{
  color: #ADADAD !important;
}

.h1-mini{
  font-size: 24px;
  font-weight: 400;
  margin-top: 16px;
  margin-bottom: 8px;
}

.info-text{
  color: #ADADAD;
  font-size: 14px;
  font-weight: 400;
}

.dart-helper{
  margin-bottom: 12px;
  border-radius: 8px;
  background: #FFF;
  border: 1px solid #0000001F;

  &__nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 24px;
    border-bottom: 1px solid #0000001F;
  }

  p{
    margin: 0;
  }

  &__left{
    display: flex;
    align-items: center;
    p{
      color: #676767;
      font-size: 14px;
      margin-right: 16px;
    }

    span{
      padding: 0 5px;
      min-width: 25px;
      height: 25px;
      border-radius: 5px;
      color: #FFF;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__right{
    min-height: 39px;
    p{
      color: #676767;
      font-size: 11px;
    }

    span{
      font-size: 16px;
      font-weight: 500;
    }
  }

  &__body{
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 24px;
  }

  &__graph{
    max-height: 60px;
    max-width: 60px;
  }

  &__info{
    b{
      font-size: 28px;
      font-weight: 500;
    }

    p{
      color: #676767;
      font-size: 14px;
      font-weight: 400;
    }
  }
}

.dart-helper-footer{
  padding-bottom: 12px;
  &__icon{
    display: flex;
    justify-content: center;
    align-items: center;
    .d_icon{
      transform: rotate(0deg);
      font-size: 8px;
      cursor: pointer;
    }
  }
  &.show{
    .dart-helper-footer{
      &__text{
        max-height: 400px;
        transition: all 0.6s;
        padding: 16px 24px;
      }

      &__icon{
        .d_icon{
          transform: rotate(180deg);
        }
      }
    }
  }
  &__text{
    padding: 0 24px;
    transition: all 0.6s;
    max-height: 0;
    overflow: hidden;
    p{
      font-size: 12px;
      line-height: 1.1;
      font-weight: 400;
    }

    p + p{
      margin-top: 8px;
    }
  }
}

.dart-helper-1{
  border-top: 3px solid #008FFF;

  .dart-helper{
    &__left{
      span{
        background: #008FFF;
      }
    }
  }
}

.dart-helper-2{
  border-top: 3px solid #F363E6;
  .dart-helper{
    &__left{
      span{
        background: #F363E6;
      }
    }
  }
}

.dart-helper-3{
  border-top: 3px solid #FF6221;
  .dart-helper{
    &__left{
      span{
        background: #FF6221;
      }
    }
  }
}

.dart-helper-4{
  border-top: 3px solid #FFD02C;
  .dart-helper{
    &__left{
      span{
        background: #FFD02C;
      }
    }
  }
}

.tab-custom{
  .p-tabview-nav{
    margin: 0 !important;
    border: 0 !important;
  }

  .p-tabview-header{
    padding: 0 !important;
  }

  .p-tabview-nav-link{
    border-color: #282828 !important;
    color: #282828 !important;
    text-decoration: none !important;
  }

  .p-tabview-ink-bar{
    height: 3px;
    padding: 0;
    background: #282828 !important;
  }
}

.graph-main{
  max-width: 90px;
}

@media (max-width: 600px) {
  .search-for-catalog__content{
    width: 100%;
    padding: 30px 20px;
  }
}

</style>
