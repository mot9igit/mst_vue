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
          <!-- <div class="d-col-md-4" v-if="prods.all">
            <div class="panel-widget panel-widget-summ">
              <span>Остатки</span>
              <span class="sum">{{ prods.summ }} ₽</span>
              <span class="num">{{ prods.count_all }} шт.</span>
            </div>
          </div> -->
          <div class="d-col-md-6" v-if="prods.all">
            <div class="panel-widget panel-widget-remains">
                <div class="panel-widget-remains__graph">
                  <Chart type="doughnut" :data="chartDataMoney" :options="chartOptions" class="w-full md:w-5rem" />
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

          <div class="d-col-md-3">
            <div class="dart-helper dart-helper-1">
              <div class="dart-helper__nav">
                <div class="dart-helper__left">
                  <p>Укажите цену</p>
                  <span>10</span>
                </div>
                <div class="dart-helper__right">
                  <p>На сумму</p>
                  <span>500 000 ₽</span>
                </div>
              </div>
              <div class="dart-helper__body">
                <Chart type="doughnut" :data="chartDataMoney" :options="chartOptions" class="w-full md:w-5rem dart-helper__graph" />
                <div class="dart-helper__info">
                  <b>50%</b>
                  <p>от общего сопоставления</p>
                </div>
              </div>
              <div class="dart-helper-footer show">
                <div class="dart-helper-footer__text">
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                </div>
                <div class="dart-helper-footer__icon">
                  <i class="d_icon d_icon-arrow"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="d-col-md-3">
            <div class="dart-helper dart-helper-2">
              <div class="dart-helper__nav">
                <div class="dart-helper__left">
                  <p>Нет бренда</p>
                  <span>10</span>
                </div>
                <div class="dart-helper__right">
                  <p>На сумму</p>
                  <span>500 000 ₽</span>
                </div>
              </div>
              <div class="dart-helper__body">
                <Chart type="doughnut" :data="chartDataMoney" :options="chartOptions" class="w-full md:w-5rem dart-helper__graph" />
                <div class="dart-helper__info">
                  <b>50%</b>
                  <p>от общего сопоставления</p>
                </div>
              </div>
              <div class="dart-helper-footer show">
                <div class="dart-helper-footer__text">
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                </div>
                <div class="dart-helper-footer__icon">
                  <i class="d_icon d_icon-arrow"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="d-col-md-3">
            <div class="dart-helper dart-helper-3">
              <div class="dart-helper__nav">
                <div class="dart-helper__left">
                  <p>Нет артикула</p>
                  <span>10</span>
                </div>
                <div class="dart-helper__right">
                  <p>На сумму</p>
                  <span>500 000 ₽</span>
                </div>
              </div>
              <div class="dart-helper__body">
                <Chart type="doughnut" :data="chartDataMoney" :options="chartOptions" class="w-full md:w-5rem dart-helper__graph" />
                <div class="dart-helper__info">
                  <b>50%</b>
                  <p>от общего сопоставления</p>
                </div>
              </div>
              <div class="dart-helper-footer show">
                <div class="dart-helper-footer__text">
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                </div>
                <div class="dart-helper-footer__icon">
                  <i class="d_icon d_icon-arrow"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="d-col-md-3">
            <div class="dart-helper dart-helper-4">
              <div class="dart-helper__nav">
                <div class="dart-helper__left">
                  <p>Нет карточки</p>
                  <span>10</span>
                </div>
                <div class="dart-helper__right">
                  <p>На сумму</p>
                  <span>500 000 ₽</span>
                </div>
              </div>
              <div class="dart-helper__body">
                <Chart type="doughnut" :data="chartDataMoney" :options="chartOptions" class="w-full md:w-5rem dart-helper__graph" />
                <div class="dart-helper__info">
                  <b>50%</b>
                  <p>от общего сопоставления</p>
                </div>
              </div>
              <div class="dart-helper-footer show">
                <div class="dart-helper-footer__text">
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                  <p>Проверьте правильность вашего артикула в нашем каталоге карточек</p>
                </div>
                <div class="dart-helper-footer__icon">
                  <i class="d_icon d_icon-arrow"></i>
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
      chartDataMoney: null,
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
    filter (data) {
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
      this.chartDataMoney = this.setChartDataMoney()
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
      width: 25px;
      height: 25px;
      border-radius: 50%;
      color: #FFF;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__right{
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
    }
  }
  &.show{
    .dart-helper-footer{
      &__text{
        max-height: 400px;
        transition: all 0.4s;
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
    padding: 0;
    transition: all 0.4s;
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
</style>
