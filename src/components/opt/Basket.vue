<template>
    <div className="d-col-basket">
        <span class="d-col-basket__title">Корзина</span>
        <div className="basket-empty">
            <div className="basket-empty__content">
            <img src="../../assets/img/icons/basket-empty.svg" alt="" />
            <h3>В вашей корзине пока пусто</h3>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'

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
    ])
  },
  mounted () {
    const data = { action: 'basket/get', id: router.currentRoute._value.params.id }
    this.busket_from_api(data).then(
      this.basket = this.optbasket
    )
  },
  components: { },
  computed: {
    ...mapGetters([
      'basket'
    ])
  }
}
</script>
<style lang="scss">
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
                }

                p{
                    font-size: 14px;
                    width: auto;
                    width: calc(100% - 24px);
                    font-style: normal;
                    font-weight: 400;
                    line-height: 18px;
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
                width: 108px;
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
