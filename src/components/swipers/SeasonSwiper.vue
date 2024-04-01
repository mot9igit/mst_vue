<template>
    <swiper
        class="homeMinSwiper"
        :slides-per-view="4"
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
              <img src="https://mst.tools/assets/cache_image/assets/content/images/slider/season/gotovimsya-k-sezonu-cadovyie-izmelchiteli_747x972_c79.jpg" alt="">
          </router-link>
        </swiper-slide>
        <swiper-slide class="promoSwiper__slide">
          <router-link to="/">
              <img src="https://mst.tools/assets/cache_image/assets/content/images/slider/season/gotovimsya-k-sezonu-motobloki_747x972_c79.jpg" alt="">
          </router-link>
        </swiper-slide>
        <swiper-slide class="promoSwiper__slide">
          <router-link to="/">
              <img src="https://mst.tools/assets/cache_image/assets/content/images/slider/season/gotovimsya-k-sezonu-trimmeryi_747x972_c79.jpg" alt="">
          </router-link>
        </swiper-slide>
        <swiper-slide class="promoSwiper__slide">
          <router-link to="/">
              <img src="https://mst.tools/assets/cache_image/assets/content/images/slider/season/gotovimsya-k-sezonu-pilyi_747x972_c79.jpg" alt="">
          </router-link>
        </swiper-slide>
        <swiper-slide class="promoSwiper__slide">
          <router-link to="/">
              <img src="https://mst.tools/assets/cache_image/assets/content/images/slider/season/gotovimsya-k-sezonu-tachki_747x972_c79.jpg" alt="">
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
