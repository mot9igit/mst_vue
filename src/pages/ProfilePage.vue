<template>
  <div class="profile">
    <p>Профиль</p>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data () {
    return {
      user: {
        login: '',
        pass: ''
      }
    }
  },
  components: { },
  computed: {
    getYear () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss">
</style>
