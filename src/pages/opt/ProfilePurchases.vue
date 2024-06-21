<template>
  <ChangeVendorsModal :items="this.opt_vendors"/>
  <div class="dart-custom-grid">
    <CatalogMenu :items="opt_catalog" />
    <div class="d-col-content">
      <div class="dart-home dart-window">
        <span class="h2">Акции</span>
        <HomeSwiper :items="this.mainpage.main_slider_big"/>
        <HomeMinSwiper :items="this.mainpage.main_slider_small"/>
        <!--
        <span class="h2 mb-3 mt-5">Готовимся к сезону</span>
        <SeasonSwiper :items="this.mainpage.season_slider"/>
        <span class="h2 mb-3 mt-5">Новинки</span>
        <NewSwiper :items="this.mainpage.new_slider"/>
        -->
      </div>
    </div>
    <div class="d-col-map">
      <Vendors :items="this.opt_vendors" />
      <Basket ref="childComponent" @toOrder="toOrder"/>
    </div>
  </div>
  <OrderModal :show="show_order" @fromOrder="fromOrder"/>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import HomeSwiper from '../../components/swipers/HomeSwiper.vue'
import CatalogMenu from '../../components/opt/CatalogMenu.vue'
import HomeMinSwiper from '../../components/swipers/HomeMinSwiper.vue'
// import SeasonSwiper from '../../components/swipers/SeasonSwiper.vue'
// import NewSwiper from '../../components/swipers/NewSwiper.vue'
import Basket from '../../components/opt/Basket.vue'
import Vendors from '../../components/opt/Vendors.vue'
import ChangeVendorsModal from '../../components/opt/ChangeVendorsModal.vue'
import OrderModal from '../../components/opt/OrderModal.vue'

export default {
  name: 'OptsMain',
  props: {
  },
  data () {
    return {
      show_order: false,
      loading: false,
      reloading: false,
      opt_mainpage: {},
      opt_catalog: {},
      opt_vendors: {}
    }
  },
  components: {
    HomeSwiper,
    CatalogMenu,
    HomeMinSwiper,
    // SeasonSwiper,
    // NewSwiper,
    Basket,
    Vendors,
    ChangeVendorsModal,
    OrderModal
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
    ]),
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

  .dart-window{
    background: #FFF;
    padding: 24px;
    border-radius: 5px;
  }

  .dart-home{
    &__title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .dart-link-all{
        margin: 0;
      }
    }
  }

  .dart-custom-grid{
    display: flex;
  }

  .d-col-content{
    max-width: calc(100% - calc(287px + 350px));
    min-width: calc(100% - calc(287px + 350px));
    padding: 0 24px;
    transition: all 0.4s;
  }

  .d-col-map{
    width: 350px;
    height: 100%;
    top: 8px;
    position: sticky;
  }

  .main_content.white{
    background: #F5F5F5;
  }

  h1, .h1{
    display: block;
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 1.3;
    color: #282828;
    margin-bottom: 32px;
  }

  .h1-mini{
    font-size: 28px;
    font-weight: 500;
    line-height: 1;
    margin-bottom: 20px;
    margin-top: 0
  }

  h2, .h2{
    display: block;
    color: #282828;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px;
  }

  h3, .h3{
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    color: #282828;

    & + *{
      margin-top: 8px;
    }
  }

  h4, .h4{
    color: #282828;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;

    & + *{
      margin-top: 8px;
    }
  }
</style>
