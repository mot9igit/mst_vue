<template>
    <div class="dart-custom-grid">
      <div class="d-col-menu menuShow">
        <CatalogMenu :items="opt_catalog" />
      </div>
      <div class="d-col-content">
        <div class="dart-home dart-window">
            <Breadcrumbs/>
            <h1 class="h1-mini">Дрели / Шуруповерты</h1>
            <TableCatalog />
        </div>
      </div>
      <div class="d-col-map">
        <Vendors :items="this.opt_vendors" />
        <Basket />
      </div>
    </div>
  </template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CatalogMenu from '../../components/opt/CatalogMenu.vue'
import Basket from '../../components/opt/Basket.vue'
import Vendors from '../../components/opt/Vendors.vue'
import Breadcrumbs from '../../components/opt/Breadcrumbs.vue'
import TableCatalog from '../../components/opt/TableCatalog.vue'

export default {
  name: 'OptsCatalog',
  props: {
  },
  data () {
    return {
      loading: false,
      reloading: false,
      opt_mainpage: {},
      opt_catalog: {},
      opt_vendors: {}
    }
  },
  components: {
    CatalogMenu,
    Basket,
    Vendors,
    Breadcrumbs,
    TableCatalog
  },
  mounted () {
    this.get_opt_mainpage_from_api().then(
      this.opt_mainpage = this.mainpage
    )
    this.get_opt_catalog_from_api().then(
      this.opt_catalog = this.optcatalog
    )
    this.get_opt_vendors_from_api().then(
      this.opt_vendors = this.optvendors
    )
  },
  unmounted () {
  },
  methods: {
    ...mapActions([
      'get_opt_mainpage_from_api',
      'get_opt_catalog_from_api',
      'get_opt_vendors_from_api'
    ])
  },
  computed: {
    ...mapGetters([
      'mainpage',
      'optcatalog',
      'optvendors'
    ])
  },
  watch: {
    mainpage: function (newVal, oldVal) {
      this.opt_mainpage = newVal
    },
    optcatalog: function (newVal, oldVal) {
      this.opt_catalog = newVal
    },
    optvendors: function (newVal, oldVal) {
      this.opt_vendors = newVal
    }
  }
}
</script>
<style lang="scss">

</style>
