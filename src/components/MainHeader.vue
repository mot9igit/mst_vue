<template>
  <div class="dart_header_mst">
    <div class="wrap">
      <a href="#" class="menu" @click="clickMenu">
        <mdicon name="menu" />
      </a>
      <a href="#" class="logo">
        <img src="/img/logo_dark.svg" alt="">
      </a>
      <a href="#" class="logout" @click="onAuthBtnClick">
        <span>Выйти</span>
        <mdicon name="logout" />
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainHeader',
  emits: ['clickMenu'],
  props: {
    active: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
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
    },
    clickMenu () {
      this.$emit('clickMenu')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dart_header_mst{
  flex: 0 0 auto;
  width: 100%;
  padding: 0;
  background: #F3F3F3;
  .wrap{
    min-height: 55px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .menu{
    display: none;
    padding: 0 15px;
  }
  .logo{
    display: none;
    padding: 0 15px;
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
@media (max-width: 991px) {
  .dart_header_mst{
    .wrap{
      justify-content: space-between;
      .menu,
      .logo{
        display: block;
        img{
          max-height: 40px;
        }
      }
      .logout{
        span:first-child{
          display: none;
        }
      }
    }
  }
}
</style>
