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
      <swiper-slide v-for="item in items" v-bind:key="item.id" class="promoSwiper__slide">
        <router-link to="/">
          <img :src="item.image">
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
  name: 'newSwiper',
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
