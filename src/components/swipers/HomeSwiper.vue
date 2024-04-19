<template>
    <swiper
        :slides-per-view="1"
        :space-between="50"
        loop
        autoplay="true"
        navigation
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
    >
        <swiper-slide class="promoSwiper__slide">
            <router-link to="/">
                <img src="https://mst.tools/assets/cache_image/assets/content/images/sales/interskol/professionalnaya-besshhetochnaya-drel-shurupovert-s-4-nasadkami_1480x443_c26.jpg" alt="">
            </router-link>
        </swiper-slide>
        <swiper-slide class="promoSwiper__slide">
            <router-link to="/">
                <img src="https://dev.mst.tools/assets/content/images/sales/interskol/260ccb21-4208-4ce9-ab88-b9d993c74c53.jpg" alt="">
            </router-link>
        </swiper-slide>
    </swiper>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'

export default {
  name: 'homeSwiper',
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
      loading: true
    }
  },
  methods: {
    ...mapActions([
    ])
  },
  mounted () {
  },
  components: { Swiper, SwiperSlide },
  setup () {
    return {
      modules: [Navigation, Pagination, Scrollbar, A11y]
    }
  },
  computed: {
    ...mapGetters([
    ])
  }
}
</script>
<style lang="scss">
    .promoSwiper{
        // max-height: 350px;
        //height: 400px;
        width: 100%;
        border-radius: 5px;

        &__slide{
            position: relative;

            img{
                width: 100% !important;
                border-radius: 5px;
                // max-height: 350px;
                object-fit: contain;
            }

            p{
                padding: 32px;
                position: absolute;
                color: #FFF;
                font-size: 40px;
                font-style: normal;
                font-weight: 500;
                line-height: 40px;
            }
        }
    }
</style>
