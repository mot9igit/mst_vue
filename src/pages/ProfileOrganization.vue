<template>
  <div>
    <router-view></router-view>
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
          <div class="d-col-md-4" v-if="products.all">
            <div class="panel-widget panel-widget-summ">
              <span>Остатки</span>
              <span class="sum">{{ products.summ }} ₽</span>
              <span class="num">{{ products.count_all }} шт.</span>
            </div>
          </div>
          <div class="d-col-md-4">
            <div class="panel-widget panel-widget-summ">
              <span>Заказы за неделю</span>
              <span class="sum">{{ orders.summ }} ₽</span>
              <span class="num">{{ orders.count }} шт.</span>
            </div>
          </div>
          <div class="d-col-md-8" v-if="products.all">
            <div class="panel-widget panel-widget-remains">
                <div class="panel-widget-remains__graph">
                  <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-5rem" />
                  <span class="count">{{ $filters.round(products.copo_percent) }}%</span>
                  <span>сопоставленных<br/> товаров</span>
                </div>
                <div class="panel-widget-remains__stat">
                  <div class="panel-widget-remains__stat-item">
                    <div class="data">
                      <span>Товаров всего</span>
                      <span>{{ products.all }}</span>
                    </div>
                    <div class="line">
                      <span style="width: 100%;"></span>
                    </div>
                  </div>
                  <div class="panel-widget-remains__stat-item">
                    <div class="data">
                      <span>Товаров сопоставлено</span>
                      <span>{{ products.copo }}</span>
                    </div>
                    <div class="line">
                      <span :style="'width: ' + products.copo_percent + '%;'"></span>
                    </div>
                  </div>
                </div>
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
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Chart from 'primevue/chart'

export default {
  name: 'ProfileOrganization',
  props: {
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
      products: {
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
      }
    }
  },
  methods: {
    ...mapActions([
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
    }
  },
  mounted () {
    this.get_organization_from_api().then(() => {
      this.chartData = this.setChartData()
      const num = this.organization.products.copo_percent
      this.products.copo_percent = num
      this.products.all = this.organization.products.count
      this.products.copo = this.organization.products.copo_count
      this.products.count_all = this.organization.products.count_all
      this.products.summ = this.organization.products.summ
      // orders.summ && orders.count
      this.dilers.summ = this.organization.dilers.summ
      this.dilers.count = this.organization.dilers.count
      this.distr.summ = this.organization.distr.summ
      this.distr.count = this.organization.distr.count
      this.shipment.total = this.organization.shipment.total
      this.shipment.items = this.organization.shipment.items
    })
  },
  components: { Chart },
  computed: {
    ...mapGetters([
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
    border: 1px solid rgba(0, 0, 0, 0.12);
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
</style>
