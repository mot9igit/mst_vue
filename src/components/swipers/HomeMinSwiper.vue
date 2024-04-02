<template>
    <swiper
        class="homeMinSwiper"
        :slides-per-view="3"
        :space-between="8"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        loop
        navigation
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
    >
        <swiper-slide class="promoSwiper__slide">
            <router-link to="/">
                <img src="https://mst.tools/assets/cache_image/assets/content/images/sales/interskol/czepnaya-akkumulyatornaya-pila-favourite-vsego-za-3-777-rublej_364x181_7e2.jpg" alt="">
            </router-link>
        </swiper-slide>
        <swiper-slide class="promoSwiper__slide">
            <router-link to="/">
                <img src="https://mst.tools/assets/cache_image/assets/content/images/sales/interskol/drel-shurupovert-akkumulyatornaya-favourite-vsego-za-2-299-rublej_364x181_7e2.jpg" alt="">
            </router-link>
        </swiper-slide>
        <swiper-slide class="promoSwiper__slide">
            <router-link to="/">
                <img src="https://mst.tools/assets/cache_image/assets/content/images/sales/interskol/shlifmashina-uglovaya-interskol-vsego-za-2-299-rublej_364x181_7e2.jpg" alt="">
            </router-link>
        </swiper-slide>
        <swiper-slide class="promoSwiper__slide">
            <router-link to="/">
                <img src="https://mst.tools/assets/cache_image/assets/content/images/sales/interskol/luchshaya-czena-na-svarochnyie-apparatyi-interskol-ms_364x181_7e2.jpg" alt="">
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
  name: 'homeMinSwiper',
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
    const onSwiper = (swiper) => {
      console.log(swiper)
    }
    const onSlideChange = () => {
      console.log('slide change')
    }
    return {
      onSwiper,
      onSlideChange,
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
    .homeMinSwiper{
        margin-top: 8px;
        position: relative;
    }
</style>
