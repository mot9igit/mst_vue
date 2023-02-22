<template>
  <router-view></router-view>
</template>

<script>

export default {
  name: 'OrganizationsLoyout',
  data () {
    return {
    }
  },
  created () {
    this.auth = localStorage.getItem('user') !== null
  },
  components: { },
  computed: { }
}
</script>

<style lang="scss">
</style>
