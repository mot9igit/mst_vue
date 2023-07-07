<template>
  <div class="profile" v-if="getreport.type == 3">
    <report-rrc/>
  </div>
  <div class="profile" v-if="getreport.type == 2">
    <report-present/>
  </div>
  <div class="profile" v-if="getreport.type == 1">
    <report-tops/>
  </div>
  <div class="profile" v-if="getreport.type == 4">
    <report-sales/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
import reportRrc from '@/components/reports/report-rrc.vue'
import reportTops from '@/components/reports/report-tops.vue'
import reportPresent from '@/components/reports/report-present.vue'
import reportSales from '@/components/reports/report-sales.vue'

export default {
  name: 'ReportsPage',
  props: { },
  data () {
    return {
      loading: false
    }
  },
  components: { reportRrc, reportTops, reportPresent, reportSales },
  computed: {
    ...mapGetters([
      'getreport'
    ])
  },
  mounted () {
    this.get_report_from_api({
      filter: [],
      report_id: router.currentRoute._value.params.report_id
    })
  },
  methods: {
    ...mapActions([
      'get_report_from_api'
    ])
  },
  watch: {}
}
</script>

<style lang="scss">
</style>
