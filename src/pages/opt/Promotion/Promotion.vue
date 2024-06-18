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
                  <h2 class="header__title">{{actions.name}}</h2>
                </div>
                <p class="header__description">
                  {{actions.description}}
                </p>
              </div>
              <div>
                <img
                  :src="site_url_prefix + actions.image"
                  class="header__img"
                />
              </div>
            </header>
            <main class="promotion__main main">
              <div class="main__card-container">
                <PromotionCard
                  title="Даты проведения"
                  :text="(new Date(actions.date_from).toLocaleString('ru', this.options)) + ' - ' + (new Date(actions.date_to).toLocaleString('ru', this.options))"
                />
                <PromotionCard
                  title="Вознаграждение"
                  :text="actions.award"
                />
                <PromotionCard
                  title="Совместимость скидок"
                  :text="actions.compatibility_discount === 1? 'Совместим со всеми акциями' : actions.compatibility_discount === 2? 'Не совместим со всеми акциями' : actions.compatibility_discount === 3? 'Применяется большая скидка' : 'Складывается с выбранными акциями'"
                />
                <PromotionCard
                  title="Совместимость отсрочек"
                  :text="actions.compatibility_postponement === 1? 'Совместим со всеми отсрочками' : actions.compatibility_postponement === 2? 'Не совместим со всеми отсрочками' : 'Применяется большая отсрочка'"
                />
              </div>

              <!-- <div>
                <p>Доступно для всех товаров</p>
                <button class="a-dart-btn a-dart-btn-primary">
                  Перейти в каталог
                </button>
              </div> -->

              <table class="table-kenost__table">
                    <thead>
                        <tr>
                            <th class="table-kenost__name table-kenost__name-checkbox"><Checkbox @update:modelValue="kenostTableCheckedAll" v-model="this.kenost_table_all" inputId="kenost_table_all" value="1" /></th>
                            <th class="table-kenost__name table-kenost__name-product">Товар</th>
                            <th class="table-kenost__name">РРЦ (₽)</th>
                            <th class="table-kenost__name">Скидка %</th>
                            <th class="table-kenost__name">Цена со скидкой за шт.</th>
                            <th class="table-kenost__name">Кратность</th>
                            <th class="table-kenost__name">Сумма</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in this.selected" :key="item.id">
                      <tr>
                        <td class="table-kenost__checkbox">
                          <Checkbox v-model="this.kenost_table" inputId="kenost_table" :value="item.id" />
                        </td>
                        <td class="table-kenost__product">
                          <img :src="'https://mst.tools' + item.image">
                          <div class="table-kenost__product-text">
                            <p>{{ item.name }}</p>
                            <span>{{item.article}}</span>
                          </div>
                        </td>
                        <td>
                          {{(Number(item.price).toFixed(0)).toLocaleString('ru')}} ₽
                        </td>
                        <td>
                          {{(Number(item.discountInterest).toFixed(2)).toLocaleString('ru')}}
                        </td>
                        <td>
                          {{(Number(item.finalPrice).toFixed(0)).toLocaleString('ru')}} ₽
                          <p class="table-kenost__settings" @click="this.modals.price = true; this.modals.product_id = item.id;">Настроить</p>
                        </td>
                        <td>
                          <Counter class="margin-auto" @ElemCount="ElemCount" :id="item.id" :min="1" :value="item.multiplicity"/>
                        </td>
                        <td>
                          {{(Number(item.finalPrice).toFixed(0)).toLocaleString('ru') * item.multiplicity}} ₽
                        </td>
                      </tr>
                    </tbody>
              </table>
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
import router from '@/router'

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
      perpage: 25,
      options: {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
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
    this.get_sales_to_api({
      id: router.currentRoute._value.params.sales_id,
      actionid: router.currentRoute._value.params.action
    })
  },
  updated () {},
  unmounted () {},
  methods: {
    ...mapActions([
      'get_opt_mainpage_from_api',
      'get_opt_catalog_from_api',
      'get_opt_vendors_from_api',
      'get_opt_products_from_api',
      'get_sales_to_api'
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
    ...mapGetters(['mainpage', 'optcatalog', 'optvendors', 'optproducts', 'actions']),
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
