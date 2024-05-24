<template>
    <div className="d-col-basket">
        <p class="d-col-basket__title"><span>Корзина</span> <span v-if="this.basket" @click="clearBasket" class="basketClear">Очистить</span></p>
        <div className="basket-empty" v-if="!this.basket">
            <div className="basket-empty__content">
            <img src="../../../public/img/opt/basket.svg" alt="" />
            <h3>В вашей корзине пока пусто</h3>
            </div>
        </div>
        <div class="basket-container">
            <div v-for="store in this.basket?.stores" v-bind:key="store.id">
                <div class="basket-container__adres" :style="{'background': store.color}">
                    {{store.name}}
                </div>
                <div v-for="product in store.products" v-bind:key="product.id" class="basket-container__card">
                    <img
                        class="basket-container__img"
                        :src="product.image"
                        :alt="product.name"
                    />
                    <div class="basket-container__info">
                        <div class="basket-container__title">
                            <p>
                                {{product.name}}
                            </p>
                            <div @click="clearBasketProduct(product.store_id, product.id)" class="btn-close link-no-style"
                                ><i class="d_icon d_icon-close"></i
                            ></div>
                        </div>
                        <p class="basket-container__article">{{product.article}}</p>
                        <!-- <div class="basket-container__count">
                            <p>В наличии <span>50 шт.</span></p>
                            <p>На складе <span>100 шт.</span></p>
                        </div> -->
                        <div class="basket-container__price">
                            <Counter @ElemCount="ElemCount" :min="1" :max="product.remains" :value="product.quantity" :id="product.id" :store_id="product.store_id"/>
                            <b>{{(product.quantity * product.price).toLocaleString('ru')}} ₽</b>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <a class="a-dart-btn a-dart-btn-primary btn-arrange button-basket"
            >Оформить заказ <span>{{ this.basket?.cost?.toLocaleString('ru') }} ₽</span></a
        >
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
import Counter from './Counter.vue'

export default {
  name: 'Basket',
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25
    },
    pagination_offset: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      loading: true,
      basket: {}
    }
  },
  methods: {
    ...mapActions([
      'busket_from_api'
    ]),
    updateBasket () {
    //   const data = { action: 'basket/get', id: router.currentRoute._value.params.id }
    //   this.busket_from_api(data).then(
    //     this.basket = this.optbasket
    //   )
    },
    ElemCount (object) {
      const data = { action: 'basket/update', id: router.currentRoute._value.params.id, id_product: object.id, value: object.value, store_id: object.store_id }
      this.busket_from_api(data).then()
    },
    clearBasket () {
      const data = { action: 'basket/clear', id: router.currentRoute._value.params.id }
      this.busket_from_api(data).then()
    },
    clearBasketProduct (storeid, productid) {
      const data = { action: 'basket/clear', id: router.currentRoute._value.params.id, store_id: storeid, id_product: productid }
      this.busket_from_api(data).then()
    }
  },
  mounted () {
    const data = { action: 'basket/get', id: router.currentRoute._value.params.id }
    this.busket_from_api(data).then(
      this.basket = this.optbasket
    )
  },
  components: { Counter },
  computed: {
    ...mapGetters([
      'optbasket'
    ])
  },
  watch: {
    optbasket: function (newVal, oldVal) {
      this.basket = newVal
    }
  }
}
</script>
<style lang="scss">

    .basketClear{
        color: #ACABAB;
        font-size: 14px;
        font-weight: 400;
        cursor: pointer;
    }

    .button-basket{
        width: 100%;
        margin-top: 16px;
    }

    .d-col-basket{
        overflow: hidden;
        padding: 20px;
        // background: #a6fff0;
        border-radius: 5px;
        box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.06);
        max-height: 700px;
        height: 70vh;
        background: #FFF;

        .basket-empty{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;

            &__content{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                img{
                    width: 130px;
                    height: 130px !important;
                    object-fit: cover;
                }

                h3{
                    margin-top: 24px;
                    max-width: 200px;
                    text-align: center;
                    margin: 0;
                }
            }
        }

        &__title{
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 24px;
            color: #282828;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        h3{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            span{
                font-size: 14px;
                font-weight: 400;
                color: var(--text-color-dop);
                cursor: pointer;
            }
        }

        .basket-container{
            height: calc(100% - 100px);
            overflow-y: auto;
            padding-bottom: 6px;

            &::-webkit-scrollbar {
                width: 0px;
                background-color: #f9f9fd;
            }

            &__adres{
                padding: 4px 8px;
                color: #fff;
                font-size: 14px;
                border-radius: 5px;
                width: fit-content;
                margin-bottom: 8px;
            }

            &__title{
                display: flex;
                align-items: center;
                justify-content: space-around;

                a{
                    text-decoration: none;
                    line-height: 1.1;
                    width: calc(100% - 24px);
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 18px;
                    margin: 0;
                }

                p{
                    font-size: 14px;
                    width: auto;
                    width: calc(100% - 24px);
                    font-style: normal;
                    font-weight: 400;
                    line-height: 18px;
                    margin: 0;
                }
            }

            &__article{
                font-size: 14px;
                font-style: normal;
                font-weight: 400;
                line-height: 18px;
                margin: 8px 0 12px 0;
                color: var(--text-color-dop);
            }

            &__card{
                display: flex;
                gap: 8px;
                margin-bottom: 20px;
            }

            &__img{
                width: 40px;
                height: 40px !important;
                object-fit: contain;
            }

            &__count{
                display: flex;
                gap: 8px;

                p{
                    font-size: 12px;
                    font-style: normal;
                    font-weight: 400;
                    line-height: 16px;
                    color: var(--text-color-dop);

                    span{
                        color: var(--secondary-color);
                    }
                }
            }

            &__price{
                margin-top: 8px;
                display: flex;
                align-items: center;
                justify-content: space-between
            }

            &__info{
                width: calc(100% - 60px);
            }
        }
    }
</style>
