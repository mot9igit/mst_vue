<template>
  <div>
    <div class="analitics-widget">
      <h2 class="title">{{ organization.name }}</h2>
      <div class="organization" >
        <div class="dart-row">
          <div class="d-col-md-3">
            <div class="panel-widget panel-widget-date">
                <span class="date">{{ date }}</span>
                <span class="month">{{ month }}</span>
                <span class="day">{{ day }}</span>
            </div>
          </div>
          <div class="d-col-md-4" v-if="over_products.all">
            <div class="panel-widget panel-widget-summ">
              <span>Остатки</span>
              <span class="sum">{{ over_products.summ }} ₽</span>
              <span class="num">{{ over_products.count_all }} шт.</span>
            </div>
          </div>
          <div class="d-col-md-4">
            <div class="panel-widget panel-widget-summ">
              <span>Заказы за неделю</span>
              <span class="sum">{{ orders.summ }} ₽</span>
              <span class="num">{{ orders.count }} шт.</span>
            </div>
          </div>
          <div class="d-col-md-6" v-if="over_products.all">
            <div class="panel-widget panel-widget-remains">
                <div class="panel-widget-remains__graph">
                  <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-5rem" />
                  <span class="count">{{ $filters.round(over_products.copo_percent) }}%</span>
                  <span>сопоставленных<br/> товаров</span>
                </div>
                <div class="panel-widget-remains__stat">
                  <div class="panel-widget-remains__stat-item">
                    <div class="data">
                      <span>Товаров всего</span>
                      <span>{{ over_products.all }}</span>
                    </div>
                    <div class="line">
                      <span style="width: 100%;"></span>
                    </div>
                  </div>
                  <div class="panel-widget-remains__stat-item">
                    <div class="data">
                      <span>Товаров сопоставлено</span>
                      <span>{{ over_products.copo }}</span>
                    </div>
                    <div class="line">
                      <span :style="'width: ' + over_products.copo_percent + '%;'"></span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div class="d-col-md-4">
            <div class="operating-mode">
                <div class="operating-mode__title"><p>Режим работы</p><i class="d_icon d_icon-edit" @click="this.showOperatingModeModal = !this.showOperatingModeModal"></i></div>
                <div class="operating-mode__container">
                  <div class="operating-mode__el">
                    <p>Понедельник</p>
                    <p>09:00 - 21:00 </p>
                  </div>
                  <div class="operating-mode__el">
                    <p>Вторник</p>
                    <p>09:00 - 21:00 </p>
                  </div>
                  <div class="operating-mode__el">
                    <p>Среда</p>
                    <p>09:00 - 21:00 </p>
                  </div>
                  <div class="operating-mode__el">
                    <p>Четверг</p>
                    <p>09:00 - 21:00 </p>
                  </div>
                  <div class="operating-mode__el">
                    <p>Пятница</p>
                    <p>09:00 - 21:00 </p>
                  </div>
                  <div class="operating-mode__el off">
                    <p>Суббота</p>
                    <p>Выходной</p>
                  </div>
                  <div class="operating-mode__el off">
                    <p>Воскресенье</p>
                    <p>Выходной</p>
                  </div>
                </div>
            </div>
          </div>
          <div class="d-col-md-4">
            <div class="operating-mode-calend">
              <div class="operating-mode-calend__title"><p>Выходные и короткие дни</p><i class="d_icon d_icon-edit" @click="this.showOperatingModeCalendarModal = !this.showOperatingModeCalendarModal"></i></div>
              <Calendar
              is-expanded
              title-position="left"
              :attributes="attributes"
              :masks="{ weekdays: 'WW' }"/>
            </div>
          </div>
          <custom-modal class="operating-mode-modal" v-model="showOperatingModeModal" @confirm="confirm" @cancel="cancel" >
            <template v-slot:title>Режим работы</template>
            <form class="operating-mode-change" action="">
                <div class="operating-mode-change__el">
                  <div class="flex align-items-center">
                    <Checkbox v-model="work.days[1].active" :binary="true" inputId="workday_1"/>
                    <label for="workday_1" class="ml-2">Понедельник</label>
                  </div>
                  <div class="operating-mode-change__values" v-if="work.days[1].active">
                    <div class="form_input_group input_pl input-parent required">
                      <primeCalendar id="calendar-timeonly" v-model="work.days[1].start" timeOnly stepMinute="15"/>
                    </div>
                    <div class="operating-mode-change__line"></div>
                    <div class="form_input_group input_pl input-parent required">
                      <primeCalendar id="calendar-timeonly" v-model="work.days[1].end" timeOnly stepMinute="15"/>
                    </div>
                  </div>
                  <div class="operating-mode-change__values off" v-else>
                    <p>Выходной</p>
                  </div>
                </div>
                <div class="operating-mode-change__el">
                  <div class="flex align-items-center">
                    <Checkbox v-model="work.days[2].active" :binary="true" inputId="workday_2"/>
                    <label for="workday_2" class="ml-2">Вторник</label>
                  </div>
                  <div class="operating-mode-change__values" v-if="work.days[2].active">
                    <div class="form_input_group input_pl input-parent required">
                      <primeCalendar id="calendar-timeonly" v-model="work.days[2].start" timeOnly stepMinute="15"/>
                    </div>
                    <div class="operating-mode-change__line"></div>
                    <div class="form_input_group input_pl input-parent required">
                      <primeCalendar id="calendar-timeonly" v-model="work.days[2].end" timeOnly stepMinute="15"/>
                    </div>
                  </div>
                  <div class="operating-mode-change__values off" v-else>
                    <p>Выходной</p>
                  </div>
                </div>
                <div class="operating-mode-change__el">
                  <div class="flex align-items-center">
                    <Checkbox v-model="work.days[3].active" :binary="true" inputId="workday_3"/>
                    <label for="workday_3" class="ml-2">Среда</label>
                  </div>
                  <div class="operating-mode-change__values" v-if="work.days[3].active">
                    <div class="form_input_group input_pl input-parent required">
                      <primeCalendar id="calendar-timeonly" v-model="work.days[3].start" timeOnly stepMinute="15"/>
                    </div>
                    <div class="operating-mode-change__line"></div>
                    <div class="form_input_group input_pl input-parent required">
                      <primeCalendar id="calendar-timeonly" v-model="work.days[3].end" timeOnly stepMinute="15"/>
                    </div>
                  </div>
                  <div class="operating-mode-change__values off" v-else>
                    <p>Выходной</p>
                  </div>
                </div>
                <div class="operating-mode-change__el">
                  <div class="flex align-items-center">
                    <Checkbox v-model="work.days[4].active" :binary="true" inputId="workday_4"/>
                    <label for="workday_4" class="ml-2">Четверг</label>
                  </div>
                  <div class="operating-mode-change__values" v-if="work.days[4].active">
                    <div class="form_input_group input_pl input-parent required">
                      <primeCalendar id="calendar-timeonly" v-model="work.days[4].start" timeOnly stepMinute="15"/>
                    </div>
                    <div class="operating-mode-change__line"></div>
                    <div class="form_input_group input_pl input-parent required">
                      <primeCalendar id="calendar-timeonly" v-model="work.days[4].end" timeOnly stepMinute="15"/>
                    </div>
                  </div>
                  <div class="operating-mode-change__values off" v-else>
                    <p>Выходной</p>
                  </div>
                </div>
                <div class="operating-mode-change__el">
                  <div class="flex align-items-center">
                    <Checkbox v-model="work.days[5].active" :binary="true" inputId="workday_5"/>
                    <label for="workday_5" class="ml-2">Пятница</label>
                  </div>
                  <div class="operating-mode-change__values" v-if="work.days[5].active">
                    <div class="form_input_group input_pl input-parent required">
                      <primeCalendar id="calendar-timeonly" v-model="work.days[5].start" timeOnly stepMinute="15"/>
                    </div>
                    <div class="operating-mode-change__line"></div>
                    <div class="form_input_group input_pl input-parent required">
                      <primeCalendar id="calendar-timeonly" v-model="work.days[5].end" timeOnly stepMinute="15"/>
                    </div>
                  </div>
                  <div class="operating-mode-change__values off" v-else>
                    <p>Выходной</p>
                </div>
                </div>
                <div class="operating-mode-change__el">
                  <div class="flex align-items-center">
                    <Checkbox v-model="work.days[6].active" :binary="true" inputId="workday_6"/>
                    <label for="workday_6" class="ml-2">Суббота</label>
                  </div>
                  <div class="operating-mode-change__values" v-if="work.days[6].active">
                    <div class="form_input_group input_pl input-parent required">
                      <primeCalendar id="calendar-timeonly" v-model="work.days[6].start" timeOnly stepMinute="15"/>
                    </div>
                    <div class="operating-mode-change__line"></div>
                    <div class="form_input_group input_pl input-parent required">
                      <primeCalendar id="calendar-timeonly" v-model="work.days[6].end" timeOnly stepMinute="15"/>
                    </div>
                  </div>
                  <div class="operating-mode-change__values off" v-else>
                    <p>Выходной</p>
                </div>
                </div>
                <div class="operating-mode-change__el">
                  <div class="flex align-items-center">
                    <Checkbox v-model="work.days[7].active" :binary="true" inputId="workday_7"/>
                    <label for="workday_7" class="ml-2">Воскресенье</label>
                  </div>
                  <div class="operating-mode-change__values" v-if="work.days[7].active">
                    <div class="form_input_group input_pl input-parent required">
                      <primeCalendar id="calendar-timeonly" v-model="work.days[7].start" timeOnly stepMinute="15"/>
                    </div>
                    <div class="operating-mode-change__line"></div>
                    <div class="form_input_group input_pl input-parent required">
                      <primeCalendar id="calendar-timeonly" v-model="work.days[7].end" timeOnly stepMinute="15"/>
                    </div>
                  </div>
                  <div class="operating-mode-change__values off" v-else>
                      <p>Выходной</p>
                  </div>
                </div>
                <div class="operating-mode-change__buttons">
                  <button class="dart-btn dart-btn-secondary alert_change_btn" type="button"><span>Сбросить</span></button>
                  <button class="dart-btn dart-btn-primary">Добавить</button>
                </div>
            </form>
          </custom-modal>

          <custom-modal class="operating-mode-calend-modal" v-model="showOperatingModeCalendarModal" @confirm="confirm" @cancel="cancel" >
            <template v-slot:title>Выходные и короткие дни</template>
            <div>
              <Calendar
              :attributes="attributes"
              is-expanded
              :masks="{ weekdays: 'WW' }"/>

              <div class="operating-mode-calend-modal__radio">
                <div class="flex align-items-center">
                  <div class="p-radiobutton p-component" data-pc-name="radiobutton" data-p-highlight="false">
                    <input id="ingredient1" type="radio" class="p-radiobutton-input" name="brand_connection" data-pc-section="input" value="1">
                    <div class="p-radiobutton-box" data-pc-section="box">
                      <div class="p-radiobutton-icon" data-pc-section="icon"></div>
                    </div>
                  </div>
                  <label for="ingredient1" class="ml-2">Выходной</label>
                </div>
                <div class="flex align-items-center">
                  <div class="p-radiobutton p-component" data-pc-name="radiobutton" data-p-highlight="false">
                    <input id="ingredient1" type="radio" class="p-radiobutton-input" name="brand_connection" data-pc-section="input" value="1">
                    <div class="p-radiobutton-box" data-pc-section="box">
                      <div class="p-radiobutton-icon" data-pc-section="icon"></div>
                    </div>
                  </div>
                  <label for="ingredient1" class="ml-2">Короткий день</label>
                </div>
              </div>

              <div class="operating-mode-calend-modal__values">
                <div class="form_input_group input_pl input-parent required">
                  <input type="text" id="filter_name" placeholder="09:00" name="name" class="dart-form-control">
                </div>
                <div class="operating-mode-calend-modal__line"></div>
                <div class="form_input_group input_pl input-parent required">
                  <input type="text" id="filter_name" placeholder="21:00" name="name" class="dart-form-control">
                </div>
              </div>
              <div class="operating-mode-calend-modal__buttons">
                <button class="dart-btn dart-btn-secondary alert_change_btn" type="button"><span>Удалить</span></button>
                <button class="dart-btn dart-btn-primary">Сохранить</button>
              </div>
            </div>
          </custom-modal>

          <div class="d-col-md-2" v-for="item in organization.brands" :key="item.id">
            <div class="panel-widget panel-widget-summ">
              <span> {{ item.name }} </span>
              <span class="sum">{{ item.count }} шт.</span>
              <span class="num">Кол-во сопоставленных товаров по бренду {{ item.name }}</span>
            </div>
          </div>
          <div class="d-col-md-3" v-if="organization.type != 1">
            <div class="panel-widget panel-widget-dilers">
              <span class="title">Дилеры</span>
              <div class="numbers">
                <div class="item">
                  <span class="labels">Кол-во</span>
                  <div class="info">
                    <i class="d_icon d_icon-account-circle"></i>
                    <span>{{ dilers.count }} шт.</span>
                  </div>
                </div>
                <div class="item">
                  <span class="labels">Сумма заказов за 7 дн.</span>
                  <div class="info">
                    <i class="d_icon">
                      <span>₽</span>
                    </i>
                    <span>{{ dilers.summ }} ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-col-md-3" v-if="organization.type == 3">
            <div class="panel-widget panel-widget-dilers">
              <span class="title">Дистрибьюторы</span>
              <div class="numbers">
                <div class="item">
                  <span class="labels">Кол-во</span>
                  <div class="info">
                    <i class="d_icon d_icon-account-circle"></i>
                    <span>{{ distr.count }} шт.</span>
                  </div>
                </div>
                <div class="item">
                  <span class="labels">Сумма заказов за 7 дн.</span>
                  <div class="info">
                    <i class="d_icon">
                      <span>₽</span>
                    </i>
                    <span>{{ distr.summ }} ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-col-md-8" v-if="shipment.total">
            <div class="panel-widget panel-widget-shipping">
              <span class="title">Ближайшие отгрузки</span>
              <div class="shippings">
                <div class="item" v-for="ship in shipment.items" v-bind:key="ship.id">
                  <div class="date">
                    <span class="day">{{ ship.day }}</span>
                    <span class="month">{{ ship.month }}</span>
                  </div>
                  <div class="info">
                    <span>{{ ship.dilers }}</span>
                  </div>
                  <a href="#" class="more">Подробнее</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dart-row">
          <div class="d-col-md-6" v-if="no_money.top">
            <div class="panel-widget panel-widget-top-nomoney">
              <v-table
                :items_data="no_money.top"
                :total="5"
                :pagination_items_per_page="this.pagination_items_per_page"
                :pagination_offset="this.pagination_offset"
                :page="this.page"
                :table_data="this.top_data"
                title="ТОП-5 товаров по прогнозу упущенной выручки"
                class="widget_table"
              >
              </v-table>
            </div>
          </div>
          <div class="d-col-md-6" v-if="forecast.top">
            <div class="panel-widget panel-widget-top-nomoney">
              <v-table
                :items_data="forecast.top"
                :total="5"
                :pagination_items_per_page="this.pagination_items_per_page"
                :pagination_offset="this.pagination_offset"
                :page="this.page"
                :table_data="this.forecast_data"
                title="ТОП-5 товаров по прогнозу меньшего кол-ва остатков"
                class="widget_table"
              >
              </v-table>
            </div>
          </div>
          <div class="d-col-md-12">
            <div class="panel-widget panel-widget-top-nomoney">
              <v-table
                :items_data="products.products"
                :total="products.total"
                :pagination_items_per_page="this.pagination_items_per_page"
                :pagination_offset="this.pagination_offset"
                :page="this.page"
                :table_data="this.product_table_data"
                :filters="this.products_filters"
                @filter="filter"
                @sort="filter"
                @paginate="paginate"
                title="Статистика"
                class="widget_table"
              >
                <template v-slot:desc>
                  <div class="dart-alert dart-alert-info">Параметр <b>"Дней с Out Of Stock"</b> расчитывается за последний календарный месяц.<br/>Фильтры <b>"Категория товара"</b> и <b>"Производитель"</b> работает только с теми остатками, с которыми произошло сопоставление с карточками товаров из нашего справочника.</div>
                </template>
                <template v-slot:widgets>
                  <div class="dart-row">
                    <div class="d-col-md-3" v-if="avg_info?.remains">
                      <div class="panel-widget panel-widget-summ panel-widget-blue">
                        <span>Остатков всего</span>
                        <span class="sum">{{ avg_info?.remains }} шт</span>
                        <span class="num">шт</span>
                      </div>
                    </div>
                    <div class="d-col-md-3" v-if="avg_info.no_money">
                      <div class="panel-widget panel-widget-summ panel-widget-red">
                        <span>Упущенная выручка</span>
                        <span class="sum">{{ avg_info.no_money }}</span>
                        <span class="num">₽</span>
                      </div>
                    </div>
                    <div class="d-col-md-3" v-if="avg_info.sales_speed">
                      <div class="panel-widget panel-widget-summ  panel-widget-green">
                        <span>Средняя скорость продаж</span>
                        <span class="sum">{{ avg_info.sales_speed }}</span>
                        <span class="num">шт/день</span>
                      </div>
                    </div>
                  </div>
                </template>
              </v-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Chart from 'primevue/chart'
import vTable from '@/components/table/v-table'
import { Calendar } from 'v-calendar'
import primeCalendar from 'primevue/calendar'
import 'v-calendar/dist/style.css'
import customModal from '@/components/popup/CustomModal.vue'
import Checkbox from 'primevue/checkbox'

export default {
  name: 'ProfileOrganization',
  props: {
    org: {
      type: Array,
      default: () => {
        return []
      }
    },
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
      showOperatingModeModal: false,
      showOperatingModeCalendarModal: false,
      chartData: null,
      work: {
        days: {
          1: {
            active: 0,
            start: '',
            end: ''
          },
          2: {
            active: 0,
            start: '',
            end: ''
          },
          3: {
            active: 0,
            start: '',
            end: ''
          },
          4: {
            active: 0,
            start: '',
            end: ''
          },
          5: {
            active: 0,
            start: '',
            end: ''
          },
          6: {
            active: 0,
            start: '',
            end: ''
          },
          7: {
            active: 0,
            start: '',
            end: ''
          }
        }
      },
      page: 1,
      attributes: [{
        dot: 'red',
        dates: [
          '2024-03-27',
          '2024-03-17',
          '2024-03-23'
        ]
      },
      {
        dot: 'blue',
        dates: [
          '2024-03-21',
          '2024-03-3',
          '2024-03-7'
        ]
      }],
      chartOptions: {
        cutout: '60%'
      },
      avg_info: {
        remains: 0,
        no_money: 0,
        sales_speed: 0
      },
      over_products: {
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
      no_money: {

      },
      forecast: {

      },
      products_filters: {
        name: {
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text'
        },
        vendor: {
          name: 'Производитель',
          placeholder: 'Выберите производителя',
          type: 'dropdown',
          values: this.getvendors
        },
        catalog: {
          name: 'Категория товара',
          placeholder: 'Выберите категорию',
          type: 'tree',
          values: this.getcatalog
        },
        minuses: {
          name: 'Только отрицательные значения',
          placeholder: 'Только отрицательные значения',
          type: 'checkbox'
        }
      },
      product_table_data: {
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
          type: 'text',
          sort: true
        },
        price: {
          label: 'Цена товара',
          type: 'text',
          sort: true
        },
        remains: {
          label: 'Остаток сейчас',
          type: 'text',
          sort: true
        },
        sales_30: {
          label: 'Продаж за 30 дней',
          type: 'text',
          sort: true
        },
        purchase_speed: {
          label: 'Скорость продажи шт/день',
          type: 'text',
          sort: true
        },
        out_of_stock_days: {
          label: 'Дней с Out Of Stock',
          type: 'text',
          sort: true
        },
        no_money: {
          label: 'Упущенная выручка',
          type: 'text',
          sort: true
        },
        forecast_all: {
          label: 'Прогноз остатков на завтра / 7 дней',
          type: 'text',
          sort: true
        }
      },
      top_data: {
        name: {
          label: 'Наименование',
          type: 'text',
          sort: false
        },
        article: {
          label: 'Артикул',
          type: 'text',
          sort: false
        },
        out_of_stock_days: {
          label: 'Дней с Out Of Stock',
          type: 'text',
          sort: false
        },
        no_money: {
          label: 'Упущенная выручка',
          type: 'text',
          sort: false
        }
      },
      forecast_data: {
        name: {
          label: 'Наименование',
          type: 'text',
          sort: false
        },
        article: {
          label: 'Артикул',
          type: 'text',
          sort: false
        },
        remains: {
          label: 'Остаток сейчас',
          type: 'text',
          sort: false
        },
        forecast_all: {
          label: 'Прогноз остатков на завтра/7 дней',
          type: 'text',
          sort: false
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'get_organization_from_api',
      'get_data_from_api',
      'get_catalog_from_api',
      'get_vendors_from_api'
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
      this.get_data_from_api(data).then(() => {
        this.avg_info.remains = this.products.avg_info?.remains
        this.avg_info.no_money = this.products.avg_info.no_money
        this.avg_info.sales_speed = this.products.avg_info.sales_speed
      })
    },
    paginate (data) {
      this.page = data.page
      this.get_data_from_api(data).then(() => {
        this.avg_info.remains = this.products.avg_info?.remains
        this.avg_info.no_money = this.products.avg_info.no_money
        this.avg_info.sales_speed = this.products.avg_info.sales_speed
      })
    }
  },
  mounted () {
    this.get_catalog_from_api().then(
      this.products_filters.catalog.values = this.getcatalog
    )
    this.get_vendors_from_api().then(
      this.products_filters.vendor.values = this.getvendors
    )
    this.get_organization_from_api().then(() => {
      this.chartData = this.setChartData()
      const num = this.organization.products.copo_percent
      this.over_products.copo_percent = num
      this.over_products.all = this.organization.products.count
      this.over_products.copo = this.organization.products.copo_count
      this.over_products.count_all = this.organization.products.count_all
      this.over_products.summ = this.organization.products.summ
      // orders.summ && orders.count
      this.dilers.summ = this.organization.dilers.summ
      this.dilers.count = this.organization.dilers.count
      this.distr.summ = this.organization.distr.summ
      this.distr.count = this.organization.distr.count
      this.orders.summ = this.organization.orders.summ
      this.orders.count = this.organization.orders.count
      this.shipment.total = this.organization.shipment.total
      this.shipment.items = this.organization.shipment.items
      this.no_money = this.organization.no_money
      this.forecast = this.organization.forecast
      this.get_data_from_api({
        page: this.page,
        perpage: this.pagination_items_per_page
      }).then(() => {
        this.avg_info.remains = this.products.avg_info?.remains
        this.avg_info.no_money = this.products.avg_info.no_money
        this.avg_info.sales_speed = this.products.avg_info.sales_speed
      })
    })
  },
  components: { Chart, vTable, Calendar, customModal, Checkbox, primeCalendar },
  computed: {
    ...mapGetters([
      'organization',
      'products',
      'getcatalog',
      'getvendors'
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
  .panel-widget-shipping{
    position: relative;
    .shippings{
      margin-top: 40px;
      .item{
        position: relative;
        min-height: 60px;
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 16px;
        & + .item{
          margin-top: 22px;
        }
        .date{
          position: relative;
          span{
            display: block;
            &.day{
              color: #282828;
              text-align: center;
              font-size: 30px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }
            &.month{
              color: #282828;
              text-align: center;
              font-size: 11px;
              font-style: normal;
              font-weight: 500;
              line-height: 106%; /* 11.66px */
              letter-spacing: 0.134px;
            }
          }
        }
        .info{
          display: flex;
          align-items: center;
          margin-left: 22px;
          padding-left: 22px;
          border-left: 1px solid #A8A8A8;
          span{
            color: #282828;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 1.3;
            letter-spacing: 0.25px;
          }
        }
        .more{
          display: block;
          position: absolute;
          bottom: 0;
          left: 80px;
          color: #828282;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 106%; /* 12.72px */
          letter-spacing: 0.25px;
          text-decoration: underline;
          &:hover{
            text-decoration: none;
          }
        }
      }
    }
  }
  .panel-widget-dilers{
    position: relative;
    .numbers{
      .item{
        & + .item{
          margin-top: 20px;
        }
        .labels{
          display: block;
          color: #A0A0A0;
          font-family: Roboto;
          font-size: 11px;
          font-style: normal;
          font-weight: 400;
          line-height: 1.3;
          letter-spacing: 0.25px;
          margin-bottom: 12px;
        }
        .info{
          display: flex;
          align-items: center;
          .d_icon-account-circle{
            color: #008FFF;
            font-size: 26px
          }
          .d_icon{
            span{
              width: 24px;
              height: 24px;
              border-radius: 50%;
              background: #FFD4C2;
              color: #FF6221;
              font-size: 18px;
              line-height: 1;
              display: flex;
              align-items: center;
              justify-content: center;
              font-style: normal;
            }
          }
          & > span{
            padding-left: 15px;
            color: #282828;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 1.3;
            letter-spacing: 0.496px;
          }
        }
      }
    }
  }
  .panel-widget-summ{
    position: relative;
    span{
      display: block;
      color: #676767;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 1.3;
      letter-spacing: 0.25px;
      &.sum{
        color: #282828;
        font-size: 28px;
        font-style: normal;
        font-weight: 500;
        line-height: 1.3;
        letter-spacing: 0.496px;
        margin: 31px 0 16px;
      }
      &.num{
        color: #A0A0A0;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 1.3;
        letter-spacing: 0.25px;
      }
    }
  }
  .panel-widget-remains{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .panel-widget-remains__graph{
      width: 33.3333333%;
      span{
        display: block;
        color: #676767;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 1.3;
        letter-spacing: 0.25px;
        &.count{
          color: #282828;
          font-size: 28px;
          font-style: normal;
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: 0.496px;
          margin-bottom: 5px;
          margin-top: 15px;
        }
      }
    }
    .panel-widget-remains__stat{
      width: 66.6666666%;
      .panel-widget-remains__stat-item{
        position: relative;
        & + *{
          margin-top: 15px;
        }
        &:last-child .line span{
          background: #008FFF;
        }
        .data{
          display: flex;
          justify-content: space-between;
          span{
            color: #282828;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 1.3;
            letter-spacing: 0.25px;
            &:last-child{
              color: #ADADAD;
              text-align: right;
              font-size: 14px;
              font-style: normal;
              font-weight: 500;
              line-height: 1.3;
              letter-spacing: 0.25px;
            }
          }
        }
        .line{
          height: 8px;
          margin-top: 5px;
          border-radius: 4px;
          background: #EEE;
          position: relative;
          span{
            position: absolute;
            left: 0;
            top: 0;
            display: inline-block;
            height: 8px;
            border-radius: 4px;
            background: #FF6221;
          }
        }
      }
    }
  }
  .panel-widget{
    padding: 16px 16px;
    border-radius: 5px;
    margin-bottom: 24px;
    position: relative;
    height: calc(100% - 24px);
    border: 1px solid rgba(0, 0, 0, 0.12);
    &.panel-widget-blue{
      background: linear-gradient(90deg, #008FFF 0.12%, #00A3FF 99.85%);
      &.panel-widget-summ span{
        color: #fff;
      }
    }
    &.panel-widget-red{
      background: linear-gradient(90deg, #FF6221 0.12%, #FF3C21 99.85%);
      &.panel-widget-summ span{
        color: #fff;
      }
    }
    &.panel-widget-green{
      background: #0EB39A;
      &.panel-widget-summ span{
        color: #fff;
      }
    }
    .title{
      display: block;
      color: #676767;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 1.3;
      letter-spacing: 0.25px;
      margin-bottom: 18px;
    }
    &.panel-widget-date{
      .date{
        display: block;
        text-align: center;
        color: #282828;
        font-family: Roboto;
        font-size: 55px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
      .month{
        display: block;
        color: #282828;
        text-align: center;
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: 1.3;
        letter-spacing: 0.25px;
      }
      .day{
        display: block;
        padding-top: 9px;
        text-align: center;
        color: #A0A0A0;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 1.3;
        letter-spacing: 0.25px;
        text-transform: uppercase;
      }
    }
  }

  .operating-mode-calend-modal{
    .vc-container{
      width: 100%;
      border: none;
    }
    .dart-form-control{
      text-align: center;
    }
    .vc-title-wrapper button{
      background-color: #FFF;
    }

    &__radio{
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 0 16px;
    }

    &__values{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: 100%;
      padding: 0 16px;
      margin-top: 16px;
    }

    &__line{
      width: 12px;
      background: #000000;
      height: 1px;
    }

    &__buttons{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      padding: 0 16px;
      margin-top: 24px;
      button{
        width: calc(50% - 6px);
      }
    }

    .form_input_group{
      margin: 0;
      width: calc(50% - 14px);
    }
  }

  .operating-mode-calend-modal,
  .operating-mode-modal{
    .form_input_group.input_pl .dart-form-control:not(:placeholder-shown){
      padding: 10px 15px;
    }

    .modal-content{
      max-width: 500px;
    }

    .modal__title{
      color: #282828;
      font-size: 20px;
      font-weight: 500;
    }
  }

  .operating-mode-change{
    display: flex;
    flex-direction: column;
    gap: 16px;
    &__buttons{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 8px;
      button{
        width: calc(50% - 6px);
      }
    }
    &__el{
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 39px;

      label{
        font-size: 14px;
      }
    }
    &__values{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      max-width: 250px;
      width: 100%;

      p{
        margin: 0;
        color: #A0A0A0;
        font-size: 14px;
      }
    }
    &__line{
      width: 12px;
      background: #000000;
      height: 1px;
    }

    .form_input_group{
      margin: 0;
      max-width: 115px
    }
  }

  .operating-mode-calend{
    background: #FFF;
    border-radius: 5px;
    border: 1px solid #0000001F;
    .vc-container{
      width: 100%;
      border: none;
    }
    .vc-title-wrapper button{
      background-color: #FFF;
    }
    &__title{
      padding: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      p{
        margin: 0;
        color: #676767;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.25px;
      }
      .d_icon{
        color: #a0a0a0;
        font-size: 24px;
        cursor: pointer;
      }
    }
  }

  .operating-mode{
    padding: 24px;
    background: #FFF;
    border-radius: 5px;
    border: 1px solid #0000001F;

    &__title{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
      p{
        margin: 0;
        color: #676767;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.25px;
      }
      .d_icon{
        color: #a0a0a0;
        font-size: 24px;
        cursor: pointer;
      }
    }
    &__container{
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    &__el{
      display: flex;
      align-items: center;
      justify-content: space-between;

      p{
        margin: 0;
        color: #282828;
        font-size: 14px;
        font-weight: 400px;
      }

      &.off{
        p{
          color: #A0A0A0;
        }
      }
    }
  }
</style>
