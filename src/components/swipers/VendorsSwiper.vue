<template>
    <swiper
        class="homeMinSwiper"
        :slides-per-view="6"
        :space-between="0"
        :slides-per-group="3"
        loop
        navigation
        :pagination="{ clickable: true }"
        :scrollbar="{ draggable: true }"
    >

      <swiper-slide v-for="item, index in items" v-bind:key="index" class="promoSwiper__slide">
        <div class="vendors__el">
          <img :src="item.image">
        </div>
      </swiper-slide>
    </swiper>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import 'swiper/css'

export default {
  name: 'VendorsSwiper',
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
    .vendors{
      &__el {
        position: relative;
        min-width: 60px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 1px solid #E8E8E8;
        overflow: hidden;
      }

      &__el:not(:first-child) {
        margin-left: -10px;
      }

      &__el img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
  }
</style>
