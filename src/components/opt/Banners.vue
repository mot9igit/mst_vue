<template>
    <div class="kenost-banner">
        <div class="kenost-banner__container">
            <router-link :to="{ name: 'promotion', params: { action: '111' } }" class="kenost-banner__image">
                <img class="kenost-banner__image-big" src="https://mst.tools/assets/content/banners/666c57edb29a2.jpg" alt="">
            </router-link>
        </div>

        <div class="kenost-banner__container">
            <router-link :to="{ name: 'promotion', params: { action: '111' } }" class="kenost-banner__image">
                <img class="kenost-banner__image-big" src="https://mst.tools/assets/content/banners/666c57f1dc2ea.jpg" alt="">
            </router-link>

            <router-link :to="{ name: 'promotion', params: { action: '111' } }" class="kenost-banner__image">
                <img class="kenost-banner__image-big" src="https://mst.tools/assets/content/banners/666c57f1dc2ea.jpg" alt="">
            </router-link>

            <router-link :to="{ name: 'promotion', params: { action: '111' } }" class="kenost-banner__image">
                <img class="kenost-banner__image-big" src="https://mst.tools/assets/content/banners/666c57f1dc2ea.jpg" alt="">
            </router-link>
        </div>

        <div class="kenost-banner__container">
            <router-link :to="{ name: 'promotion', params: { action: '111' } }" class="kenost-banner__image">
                <img class="kenost-banner__image-big" src="https://mst.tools/assets/content/banners/666c57f1dc2ea.jpg" alt="">
            </router-link>

            <router-link :to="{ name: 'promotion', params: { action: '111' } }" class="kenost-banner__image">
                <img class="kenost-banner__image-big" src="https://mst.tools/assets/content/banners/666c57f1dc2ea.jpg" alt="">
            </router-link>
        </div>

        <div class="kenost-banner__container">
            <router-link :to="{ name: 'promotion', params: { action: '111' } }" class="kenost-banner__image">
                <img class="kenost-banner__image-big" src="https://mst.tools/assets/content/banners/666c57f1dc2ea.jpg" alt="">
            </router-link>

            <router-link :to="{ name: 'promotion', params: { action: '111' } }" class="kenost-banner__image">
                <img class="kenost-banner__image-big" src="https://mst.tools/assets/content/banners/666c57f1dc2ea.jpg" alt="">
            </router-link>

            <router-link :to="{ name: 'promotion', params: { action: '111' } }" class="kenost-banner__image">
                <img class="kenost-banner__image-big" src="https://mst.tools/assets/content/banners/666c57f1dc2ea.jpg" alt="">
            </router-link>

            <router-link :to="{ name: 'promotion', params: { action: '111' } }" class="kenost-banner__image">
                <img class="kenost-banner__image-big" src="https://mst.tools/assets/content/banners/666c57f1dc2ea.jpg" alt="">
            </router-link>
        </div>
    </div>

     <!-- https://mst.tools/assets/content/banners/666c57edb29a2.jpg -->
    <!-- https://mst.tools/assets/content/banners/666c57f1dc2ea.jpg -->
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
// import router from '@/router'

export default {
  name: 'Banners',
  props: {
  },
  data () {
    return {
    }
  },
  methods: {
    ...mapActions([
    ])
  },
  mounted () {
  },
  components: {
  },
  computed: {
    ...mapGetters([
    ])
  },
  watch: {
  }
}
</script>
<style lang="scss">
    .kenost-banner{
        display: flex;
        flex-direction: column;
        gap: 8px;

        &__container{
            width: 100%;
            display: flex;
            gap: 8px;
        }

        &__image{
            width: 100%;

            img{
                width: 100%;
                border-radius: 5px;

                &-big{
                    height: 100%;
                }
            }
        }
    }
</style>
