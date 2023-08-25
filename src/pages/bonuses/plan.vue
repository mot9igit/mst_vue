<template>
  <div>
    <div class="to__up">
      <router-link :to="{ name: 'org_bonus_edit', params: { id: $route.params.id, bonus_id: $route.params.bonus_id } }">
        <mdicon name="arrow-left" />
        <span>Назад к программе</span>
      </router-link>
    </div>
    <div v-if="getplan.store_name">
      <h2>План {{ getplan.store_name }} за {{ getplan.period_date }}</h2>
      <div class="plan_values">
        <span class="plan_values__title">{{ getplan.summary.plan_field }}</span>
        <div class="plan_values__content">
          <div class="plan_values__chart">
            <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-5rem" />
          </div>
          <div class="plan_values__val">
            <span class="label">Значение показателя (факт):</span>
            <span class="value">{{ getplan.summary.fact }}</span>
          </div>
          <div class="plan_values__val">
            <span class="label">Значение показателя (план):</span>
            <span class="value">{{ getplan.summary.plan }}</span>
          </div>
        </div>
      </div>
      <div v-if="getplan.report_id == 2">
        <div class="dart-mt-3">
          <report-akb-dots :store_id="getplan.store_id"/>
        </div>
        <div class="dart-mt-3">
          <report-akb-punkts :store_id="getplan.store_id"/>
        </div>
      </div>
      <div v-if="getplan.report_id == 3">
        <div class="dart-mt-3">
          <report-akb-settlements :store_id="getplan.store_id"/>
        </div>
      </div>
      <div v-if="getplan.report_id == 4">
        <div class="dart-mt-3">
          <ReportRRC :store_id="getplan.store_id"/>
        </div>
      </div>
    </div>
    <div v-else>
      <Skeleton width="30rem" height="4rem"></Skeleton>
      <div class="dart-row dart-mt-4">
        <div class="d-col-md-6">
          <Skeleton class="mb-2"></Skeleton>
          <Skeleton class="mb-2"></Skeleton>
          <Skeleton class="mb-2"></Skeleton>
          <Skeleton class="mb-2"></Skeleton>
          <Skeleton class="mb-2"></Skeleton>
          <Skeleton class="mb-2"></Skeleton>
          <Skeleton class="mb-2"></Skeleton>
        </div>
        <div class="d-col-md-6">
          <Skeleton class="mb-2"></Skeleton>
          <Skeleton class="mb-2"></Skeleton>
          <Skeleton class="mb-2"></Skeleton>
          <Skeleton class="mb-2"></Skeleton>
          <Skeleton class="mb-2"></Skeleton>
          <Skeleton class="mb-2"></Skeleton>
          <Skeleton class="mb-2"></Skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Chart from 'primevue/chart'
import Skeleton from 'primevue/skeleton'
import ReportAkbDots from '@/components/reports/report-akb-dots.vue'
import ReportAkbSettlements from '@/components/reports/report-akb-settlements.vue'
import ReportAkbPunkts from '@/components/reports/report-akb-punkts.vue'
import ReportRRC from '@/components/reports/ReportRRC.vue'

export default {
  name: 'bonusPlan',
  data () {
    return {
      chartData: null,
      chartOptions: {
        cutout: '60%'
      }
    }
  },
  mounted () {
    this.get_plan_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    }).then(() => {
      this.chartData = this.setChartData()
    })
  },
  unmounted () {
    this.unset_plan_data()
  },
  components: { Skeleton, Chart, ReportAkbDots, ReportAkbPunkts, ReportAkbSettlements, ReportRRC },
  computed: {
    ...mapGetters([
      'getakbdotsplan',
      'getakbpunktsplan',
      'getplan'
    ])
  },
  methods: {
    ...mapActions([
      'get_akbdotsplan_from_api',
      'get_akbpunktsplan_from_api',
      'get_plan_from_api',
      'unset_plan_data'
    ]),
    setChartData () {
      return {
        datasets: [
          {
            data: [this.getplan.field_value.percent, this.getplan.field_value.no_percent],
            backgroundColor: ['#008FFF', '#EEEEEE'],
            hoverBackgroundColor: ['#008FFF', '#EEEEEE']
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
  .plan_values{
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: #FFF;
    padding: 24px 24px;
    max-width: 700px;
    &__title{
      display: block;
      margin-bottom: 15px;
      color: #282828;
      text-align: left;
      font-size: 20px;
      font-style: normal;
    }
    &__content{
      display: flex;
      align-items: center;
    }
    &__val{
      display: flex;
      padding: 5px 12px;
      .label{
        display: inline-block;
        color: #A0A0A0;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 1.3;
        letter-spacing: 0.25px;
        padding-right: 24px;
      }
      .value{
        color: #282828;
        text-align: center;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 1.3;
        letter-spacing: 0.25px;
      }
    }
  }
</style>
