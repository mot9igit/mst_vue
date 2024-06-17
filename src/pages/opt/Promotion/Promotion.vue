<template>
  <div class="dart-custom-grid" :class="{ loading: loading }">
    <CatalogMenu :items="opt_catalog" />
    <div class="d-col-content">
      <div class="dart-home dart-window">
        <!-- <Breadcrumbs/> -->
        <div>
          <section class="promotion">
            <header class="promotion__header header">
              <div class="header__content">
                <div class="header__title-container">
                  <img
                    src="../../../assets/img/icons/arrow.svg"
                    class="header__arrow"
                  />
                  <h2 class="header__title">Название акции</h2>
                </div>
                <p class="header__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
              <div>
                <img
                  src="../../../assets/img/slider/1.jpg"
                  class="header__img"
                />
              </div>
            </header>
            <main class="promotion__main main">
              <div class="main__card-container">
                <PromotionCard
                  title="Даты проведения"
                  text="15.02.2024 - 28.02.2024"
                />
                <PromotionCard
                  title="Вознаграждение"
                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit"
                />
                <PromotionCard
                  title="Совместимость скидок"
                  text="Применяется большая скидка"
                  :images="[
                    '../../../assets/img/gallery/1.jpg',
                    '../../../assets/img/gallery/1.jpg',
                    '../../../assets/img/gallery/1.jpg',
                    '../../../assets/img/gallery/1.jpg',
                    '../../../assets/img/gallery/1.jpg',
                  ]"
                />
                <PromotionCard
                  title="Совместимость отсрочек"
                  text="Применяется большая отсрочка"
                />
              </div>

              <div>
                <p>Доступно для всех товаров</p>
                <button class="a-dart-btn a-dart-btn-primary">
                  Перейти в каталог
                </button>
              </div>
            </main>
          </section>
        </div>
      </div>
    </div>
    <div class="d-col-map">
      <Vendors :items="this.opt_vendors" />
      <Basket ref="childComponent" @toOrder="toOrder" />
    </div>
  </div>
  <OrderModal :show="show_order" @fromOrder="fromOrder" />
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import CatalogMenu from '../../../components/opt/CatalogMenu.vue'
import Basket from '../../../components/opt/Basket.vue'
import Vendors from '../../../components/opt/Vendors.vue'
import OrderModal from '../../../components/opt/OrderModal.vue'
import PromotionCard from './PromotionCard.vue'

export default {
  name: 'Promotion',
  props: {},
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
    OrderModal,
    PromotionCard
  },
  mounted () {
    this.get_opt_catalog_from_api().then((this.opt_catalog = this.optcatalog))
    this.get_opt_vendors_from_api().then((this.opt_vendors = this.optvendors))
    this.get_opt_products_from_api({
      page: this.page,
      perpage: this.perpage
    }).then((this.opt_products = this.optproducts))
  },
  updated () {},
  unmounted () {},
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
      }).then((this.opt_products = this.optproducts))
    },
    updatePage (categoryId) {
      this.loading = true
      this.get_opt_catalog_from_api().then(
        (this.opt_catalog = this.optcatalog)
      )
      this.get_opt_vendors_from_api().then(
        (this.opt_vendors = this.optvendors)
      )
      this.get_opt_products_from_api({
        page: this.page,
        perpage: this.perpage
      }).then(() => {
        this.opt_products = this.optproducts
        this.loading = false
      })
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
    ...mapGetters(['mainpage', 'optcatalog', 'optvendors', 'optproducts']),
    pageCount () {
      return Math.ceil(this.opt_products.total / this.perpage)
    }
  },
  watch: {
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
.promotion {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 40px;
  padding: 24px;

  &__header,
  .header {
    display: flex;
    justify-content: space-between;
    gap: 10px;

    &__content {
      display: flex;
      flex-direction: column;
      gap: 16px;

      width: 50%;
    }

    &__title-container {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &__title {
      margin: 0;
    }

    &__img {
      border-radius: 5px;
      height: 160px;
      width: 286px;
      object-fit: cover;
    }
  }
  &__main,
  .main {
    display: flex;
    flex-direction: column;
    gap: 40px;

    &__card-container {
      display: grid;
      grid-template: auto / repeat(2, 1fr);
      gap: 13px;
    }
  }
}
</style>
