<template>
    <div class="dart-custom-grid" :class="{ loading: loading }">
      <CatalogMenu :items="opt_catalog" />
      <div class="d-col-content">
        <div class="dart-home dart-window">
            <Breadcrumbs :items="this.$breadcrumbs"/>
            <div v-if="$route.params.category_id == 'all'">
              <h1 class="h1-mini">Все товары</h1>
              <div class="dart-alert dart-alert-info">В данном разделе перечислены все товары поставщиков, в том числе и не сопоставленные со справочником системы.</div>
            </div>
            <h1 class="h1-mini" v-else>{{opt_products?.page?.pagetitle}}</h1>
            <div v-if="opt_products.total == 0 && opt_products.categories" class="categories">
              <div class="category" :key="cat.id" v-for="(cat) in opt_products.categories">
                <RouterLink :to="{ name: 'purchases_catalog', params: { category_id: cat.id}}">
                  <span class="title">{{ cat.pagetitle }}</span>
                  <img :src="cat.image" :alt="cat.pagetitle">
                </RouterLink>
              </div>
            </div>
            <TableCatalog @updateBasket="updateBasket" v-if="opt_products.total !== 0" :items="opt_products"/>
            <paginate
                v-if="opt_products.total !== 0"
                :page-count="pageCount"
                :click-handler="pagClickCallback"
                :prev-text="'Пред'"
                :next-text="'След'"
                :container-class="'pagination justify-content-center'"
                :initialPage="this.page"
                :forcePage="this.page"
              >
            </paginate>
        </div>
      </div>
      <div class="d-col-map">
        <Vendors :items="this.opt_vendors" @vendorCheck="vendorCheck"/>
        <Basket ref="childComponent" @toOrder="toOrder"/>
      </div>
    </div>
    <OrderModal :show="show_order" @fromOrder="fromOrder"/>
  </template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CatalogMenu from '../../components/opt/CatalogMenu.vue'
import Basket from '../../components/opt/Basket.vue'
import Vendors from '../../components/opt/Vendors.vue'
import Breadcrumbs from '../../components/opt/Breadcrumbs.vue'
import Paginate from 'vuejs-paginate-next'
import TableCatalog from '../../components/opt/TableCatalog.vue'
import OrderModal from '../../components/opt/OrderModal.vue'
// import AmBreadcrumbs from 'vue-3-breadcrumbs'

export default {
  name: 'OptsCatalog',
  props: {
  },
  data () {
    return {
      show_order: false,
      loading: false,
      reloading: false,
      opt_mainpage: {},
      opt_catalog: {},
      opt_vendors: {},
      opt_products: {},
      page: 1,
      perpage: 25
    }
  },
  components: {
    CatalogMenu,
    Basket,
    Vendors,
    // Breadcrumbs,
    TableCatalog,
    Paginate,
    OrderModal,
    Breadcrumbs
  },
  mounted () {
    this.get_opt_catalog_from_api().then(
      this.opt_catalog = this.optcatalog
    )
    this.get_opt_vendors_from_api().then(
      this.opt_vendors = this.optvendors
    )
    this.get_opt_products_from_api({
      page: this.page,
      perpage: this.perpage
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
    pagClickCallback (pageNum) {
      this.page = pageNum
      this.get_opt_products_from_api({
        page: this.page,
        perpage: this.perpage
      }).then(
        this.opt_products = this.optproducts
      )
    },
    updatePage (categoryId) {
      this.loading = true
      this.get_opt_catalog_from_api().then(
        this.opt_catalog = this.optcatalog
      )
      this.get_opt_vendors_from_api().then(
        this.opt_vendors = this.optvendors
      )
      this.get_opt_products_from_api({
        page: this.page,
        perpage: this.perpage
      }).then(() => {
        this.opt_products = this.optproducts
        this.loading = false
      }
      )
    },
    vendorCheck () {
      this.updatePage(this.$route.params.category_id)
    },
    updateBasket () {
      this.$refs.childComponent.updateBasket()
    },
    toOrder () {
      this.show_order = true
    },
    fromOrder () {
      this.show_order = false
    }
  },
  computed: {
    ...mapGetters([
      'mainpage',
      'optcatalog',
      'optvendors',
      'optproducts'
    ]),
    pageCount () {
      return Math.ceil(this.opt_products.total / this.perpage)
    }
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
  .categories{
    display: -ms-grid;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: row;
    gap: 8px;
    margin-bottom: 35px;
    width: 100%;
    .category{
      width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      background: #F8F7F5;
      -webkit-transition: all 0.4s;
      transition: all 0.4s;
      -webkit-box-align: start;
      -ms-flex-align: start;
      align-items: flex-start;
      border-radius: 5px;
      a{
        text-decoration: none;
        display: block;
        width: 100%;
      }
      .title{
        padding: 16px 12px 0 12px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      img{
        width: auto;
        max-width: 100%;
        height: auto !important;
        margin-left: auto;
        max-height: 97px !important;
        -o-object-fit: contain;
        object-fit: contain;
        float: right;
        padding: 0 4px 8px 0;
      }
    }
  }
</style>
