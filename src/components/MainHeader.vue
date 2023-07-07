<template>
  <header class="dart_header_mst">
      <div class="wrap">
        <router-link
          :to="{ name: 'home' }"
          class="logo"
        >
          МСТ Аналитика
        </router-link>
        <a href="#" class="logout" @click="onAuthBtnClick">
          <span>Выйти</span>
          <mdicon name="logout" />
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
.dart_header_mst{
  z-index: 101;
  flex: 0 0 auto;
  position: relative;
  padding: 0;
  background: #F3F3F3;
  .wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo{
    display: inline-block;
    min-width: 350px;
    padding: 10px 15px;
    background: #282828;
    font-size: 1.25rem;
    text-decoration: none;
    white-space: nowrap;
    display: block;
    color: #fff;
  }
  .logout{
    display: inline-block;
    color: #B5B5B5;
    text-decoration: none;
    padding: 0 15px;
    span{
      display: inline-block;
      margin-right: 10px;
    }
  }
}
</style>
