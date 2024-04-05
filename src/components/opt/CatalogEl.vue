<template>
    <li @click="setActive($event)" class="dart-catalog-menu__category" :class="{'active' : this.active}">
        <div class="dart-catalog-menu__el">
            <img :src="items.menu_image" :alt="items.pagetitle"/>
            <span>{{ items.pagetitle }}</span>
        </div>
        <ul class="dart-catalog-menu__list">
            <a v-for="item in items.children" v-bind:key="item.id" :href="'purchases/'+item.id" class="dart-catalog-menu__el"><li>{{item.pagetitle}}</li></a>
        </ul>
        </li>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CatalogMenuEl',
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
      loading: true,
      active: false
    }
  },
  methods: {
    ...mapActions([
    ]),
    setActive (e) {
      this.active = !this.active

      if (e.target.parentNode.querySelector('.dart-catalog-menu__list')) {
        if (e.target.parentNode.querySelector('.dart-catalog-menu__list').style.maxHeight) {
          e.target.parentNode.querySelector('.dart-catalog-menu__list').style.maxHeight = null
        } else {
          e.target.parentNode.querySelector('.dart-catalog-menu__list').style.maxHeight = e.target.parentNode.querySelector('.dart-catalog-menu__list').scrollHeight + 'px'
        }
      }
    }
  },
  mounted () {
  },
  components: { },
  computed: {
    ...mapGetters([
    ])
  }
}
</script>
<style lang="scss">

</style>
