<template>
  <div class="dart-custom-grid">
    <div class="d-col-menu menuShow">
      <CatalogMenu />
    </div>
    <div class="d-col-content">
      <div class="dart-home dart-window">
        <span class="h2">Акции</span>
        <HomeSwiper/>
        <HomeMinSwiper />

        <span class="h2 mb-3 mt-5">Готовимся к сезону</span>
        <SeasonSwiper />

        <span class="h2 mb-3 mt-5">Новинки</span>
        <NewSwiper />
      </div>
    </div>
    <div class="d-col-map">
      <!-- <RightMenu /> -->
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import HomeSwiper from '../components/swipers/HomeSwiper.vue'
import CatalogMenu from '../components/CatalogMenu.vue'
import HomeMinSwiper from '../components/swipers/HomeMinSwiper.vue'
import SeasonSwiper from '../components/swipers/SeasonSwiper.vue'
import NewSwiper from '../components/swipers/NewSwiper.vue'

export default {
  name: 'DocsMain',
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25
    },
    pagination_offset: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      loading: false,
      reloading: false
    }
  },
  components: { HomeSwiper, CatalogMenu, HomeMinSwiper, SeasonSwiper, NewSwiper },
  computed: {
    ...mapGetters([])
  },
  mounted () {
  },
  unmounted () {
  },
  methods: {
    ...mapActions([
    ])
  },
  watch: {
  }
}
</script>
<style lang="scss">

  .dart-window{
    background: #FFF;
    padding: 24px;
    border-radius: 5px;
  }

  .dart-home{
    &__title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .dart-link-all{
        margin: 0;
      }
    }
  }

  .dart-custom-grid{
    display: flex;
  }

  .d-col-menu{
    width: 287px;
    height: 100%;
    position: sticky;
    top: 8px;
  }

  .d-col-content{
    width: calc(100% - calc(287px + 350px));
    padding: 0 24px;
  }

  .d-col-map{
    width: 350px;
    height: 100%;
    top: 8px;
    position: sticky;
  }

  .main_content{
    background: #F5F5F5;
  }

  h1, .h1{
    display: block;
    font-style: normal;
    font-weight: 400;
    font-size: 48px;
    line-height: 1.3;
    color: #282828;
    margin-bottom: 32px;
  }

  .h1-mini{
    font-size: 28px;
    font-weight: 500;
    line-height: 1;
    margin-bottom: 20px;
  }

  h2, .h2{
    display: block;
    color: #282828;
    font-size: 28px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px;
  }

  h3, .h3{
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    color: #282828;

    & + *{
      margin-top: 8px;
    }
  }

  h4, .h4{
    color: #282828;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;

    & + *{
      margin-top: 8px;
    }
  }
</style>
