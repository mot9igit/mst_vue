<template>
    <swiper
        class="homeMinSwiper"
        :slides-per-view="4.2"
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
              <img src="https://mst.tools/assets/cache_image/assets/content/images/slider/18v-50-kombi-776.2.2.79_228x295_1ce.jpg" alt="">
          </router-link>
        </swiper-slide>
        <swiper-slide class="promoSwiper__slide">
          <router-link to="/">
              <img src="https://mst.tools/assets/cache_image/assets/content/images/slider/18v-80-786.4.1.70_228x295_1ce.jpg" alt="">
          </router-link>
        </swiper-slide>
        <swiper-slide class="promoSwiper__slide">
          <router-link to="/">
              <img src="https://mst.tools/assets/cache_image/assets/content/images/slider/350e-25-797.1.0.70_228x295_1ce.jpg" alt="">
          </router-link>
        </swiper-slide>
        <swiper-slide class="promoSwiper__slide">
          <router-link to="/">
              <img src="https://mst.tools/assets/cache_image/assets/content/images/slider/1400m-785.1.0.70_228x295_1ce.jpg" alt="">
          </router-link>
        </swiper-slide>
        <swiper-slide class="promoSwiper__slide">
          <router-link to="/">
              <img src="https://mst.tools/assets/cache_image/assets/content/images/slider/900e-772.0.0.70_228x295_1ce.jpg" alt="">
          </router-link>
        </swiper-slide>
        <swiper-slide class="promoSwiper__slide">
          <router-link to="/">
              <img src="https://mst.tools/assets/cache_image/assets/content/images/slider/350e-50-800.1.0.70_228x295_1ce.jpg" alt="">
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
  name: 'bonusParticipants',
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
