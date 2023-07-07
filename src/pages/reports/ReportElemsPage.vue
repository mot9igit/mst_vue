<template>
  <div class="profile" v-if="getreport.type == 3">
    <report-rrc-items/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
import reportRrcItems from '@/components/reports/report-rrc-items'

export default {
  name: 'ReportsElemsPage',
  props: { },
  data () {
    return {
      loading: false
    }
  },
  components: { reportRrcItems },
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
