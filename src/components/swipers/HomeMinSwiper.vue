<template>
    <swiper
        class="homeMinSwiper"
        :slides-per-view="3"
        :space-between="8"
        loop
        navigation
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
    >
      <swiper-slide v-for="item in items" v-bind:key="item.id" class="promoSwiper__slide">
        <router-link :to="{ name: 'promotion', params: { action: item.id } }">
          <img :src="'https://mst.tools/assets/content/' + item.image">
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
    .homeMinSwiper{
        margin-top: 8px;
        position: relative;
    }
</style>
