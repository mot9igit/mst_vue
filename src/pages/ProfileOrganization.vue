<template>
  <router-view></router-view>
  <div class="analitics-widget">
    <span class="title">{{ organization.name }}</span>
    <div class="organization" >
      <router-link :to="{ name: 'org_products'}">Товары</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProfileOrganization',
  props: {
    org: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions([
      'get_organization_from_api'
    ])
  },
  mounted () {
    this.get_organization_from_api()
  },
  components: { },
  computed: {
    ...mapGetters([
      'organization'
    ])
  }
}
</script>

<style lang="scss">
</style>
