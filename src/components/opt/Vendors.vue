<template>
    <div className="d-col-shop mb-2">
        <div className="d-col-shop__left">
            <span className="d-col-shop__span">Выбранные поставщики</span>
            <span className="h3 btnActiveChangeshopOn">0 из {{ this.items.count }}<i className="pi pi-angle-down"></i></span>
        </div>
        <div className="vendors">
            <VendorsSwiper :items="this.items.items"/>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import VendorsSwiper from '../swipers/VendorsSwiper.vue'

export default {
  name: 'Vendors',
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25
    },
    pagination_offset: {
      type: Number,
      default: 0
    },
    items: {
      type: Array
    }
  },
  data () {
    return {
      loading: true
    }
  },
  methods: {
    ...mapActions([
    ])
  },
  mounted () {
  },
  components: { VendorsSwiper },
  computed: {
    ...mapGetters([
    ])
  }
}
</script>
<style lang="scss">

    .d-col-shop{
        padding: 20px;
        background: var(--main-background-windows);
        // background: #a6fff0;
        border-radius: 5px;
        box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.06);

        &__left{
            display: flex;
            flex-direction: column;
            .h3{
                cursor: pointer;
                margin: 0;
            }

            span{
                display: flex;
                align-items: center;
            }

            i{
                margin-left: 4px;
            }
        }

        &__span{
            color: var(--text-color-dop);
            font-size: 12px;
        }

        &__info{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;

            img{
                width: 54px;
                height: 54px !important;
                border-radius: 50%;
                border: 1px solid var(--border-color);
                object-fit: cover;
                margin-top: 20px;
            }
        }

        &__chart{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__status{
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
            color: var(--text-color-dop);
        }
    }
</style>
