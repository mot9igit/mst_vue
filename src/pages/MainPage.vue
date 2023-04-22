<template>
  <div class="dart_wrapper analytics_auth">
    <main class="dart_main office-auth-form">
      <auth-form
      />
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import authForm from '../components/auth/v-auth'

export default {
  name: 'MainPage',
  data () {
    return {
      user: {
        login: '',
        pass: ''
      }
    }
  },
  components: { authForm },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser'
    })
  },
  mounted () {
    this.setUser(JSON.parse(localStorage.getItem('user')))
    if (this.getUser) {
      this.$router.push({ name: 'organizations' })
    }
  },
  methods: {
    ...mapActions({
      setUser: 'user/setUser',
      deleteUser: 'user/deleteUser'
    })
  }
}
</script>

<style lang="scss">
  .analytics_auth{
    background: #282828;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    .logo{
      margin-bottom: 24px;
    }
  }
</style>
