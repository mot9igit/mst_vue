<template>
  <header class="dart_header dart_header_analytics">
      <div class="dart_container wrap">
        <router-link
          :to="{ name: 'home' }"
          class="logo"
        >
          МСТ Аналитика
        </router-link>
        <a href="#" class="logout" @click="onAuthBtnClick">
          <i class="fa fa-sign-out"></i>
          <span>Выйти</span>
        </a>
      </div>
    </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainHeader',
  computed: {
    ...mapGetters({
      getUser: 'user/getUser'
    })
  },
  created () {
    this.setUser(JSON.parse(localStorage.getItem('user')))
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser',
      deleteUser: 'user/deleteUser'
    }),
    onAuthBtnClick () {
      if (this.getUser) {
        this.$api.auth.logout()
        localStorage.removeItem('user')
        this.deleteUser()
        this.$router.push({ name: 'home' })
      } else {
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dart_header{
  z-index: 101;
}
</style>
