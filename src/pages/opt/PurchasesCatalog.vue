<template>
    <div class="dart-custom-grid" :class="{ loading: loading }">
      <CatalogMenu :items="opt_catalog" />
      <div class="d-col-content">
        <div class="dart-home dart-window">
            <Breadcrumbs/>
            <h1 class="h1-mini">{{opt_products?.page?.pagetitle}}</h1>
            <TableCatalog v-if="opt_products.total !== 0" :items="opt_products"/>
        </div>
      </div>
      <div class="d-col-map">
        <Vendors :items="this.opt_vendors"/>
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
      opt_vendors: {},
      opt_products: {}
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
    this.get_opt_catalog_from_api().then(
      this.opt_catalog = this.optcatalog
    )
    this.get_opt_vendors_from_api().then(
      this.opt_vendors = this.optvendors
    )
    this.get_opt_products_from_api({
      page: 1,
      perpage: 25
    }).then(
      this.opt_products = this.optproducts
    )
  },
  updated () { },
  unmounted () {
  },
  methods: {
    ...mapActions([
      'get_opt_mainpage_from_api',
      'get_opt_catalog_from_api',
      'get_opt_vendors_from_api',
      'get_opt_products_from_api'
    ]),
    updatePage (categoryId) {
      this.loading = true
      this.get_opt_catalog_from_api().then(
        this.opt_catalog = this.optcatalog
      )
      this.get_opt_vendors_from_api().then(
        this.opt_vendors = this.optvendors
      )
      this.get_opt_products_from_api({
        page: 1,
        perpage: 25
      }).then(() => {
        this.opt_products = this.optproducts
        this.loading = false
      }
      )
    }
  },
  computed: {
    ...mapGetters([
      'mainpage',
      'optcatalog',
      'optvendors',
      'optproducts'
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
    },
    optproducts: function (newVal, oldVal) {
      this.opt_products = newVal
    },
    $route () {
      this.updatePage(this.$route.params.category_id)
    }
  }
}
</script>
<style lang="scss">

</style>
