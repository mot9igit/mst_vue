<template>
  <div class="dart_wrapper">
    <main-header />
    <div class="dart_container">
      <nav class="sidebars">
        <div class="sidebar-sticky">
          <div class="sidebar_widget dart_diler_widget" v-if="$route.params.type == 'slStores' && this.showBalance != false">
              <div class="dart_diler_widget__info-text">
                  <div class="item">
                      <div class="label">Баланс</div>
                      <div class="value">1 000 000 ₽</div>
                  </div>
              </div>
              <div class="dart_diler_widget__btn-container">
                  <a href="#" class="dart-btn dart-btn-primary dart-btn-block">Вывести средства</a>
              </div>
          </div>
          <div class="dart_side_menu">
            <ul>
              <li>
                <router-link :to="{ name: 'organizations' }">
                  <mdicon name="store" />
                  <span>Организации</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main role="main">
        <div class="main_content">
          <AmBreadcrumbs/>
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import AmBreadcrumbs from 'vue-3-breadcrumbs'
import MainHeader from '../../components/MainHeader'

export default {
  name: 'ProfilePage',
  data () {
    return {
      user: {
      },
      route: {
        type: null,
        id: null
      }
    }
  },
  props: {
    showBalance: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  mounted () {
    console.log(this.$breadcrumbs.value)
  },
  created () {
    this.auth = localStorage.getItem('user') !== null
  },
  components: { MainHeader, AmBreadcrumbs },
  computed: {
    getYear () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
.main_content{
  padding: 30px 0;
}
main{
  margin-left: 370px;
}
.sidebars {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background: #fff;
  min-width: 350px;
  z-index: 100;
  padding: 85px 0 0;
  .sidebar-heading {
    font-size: .75rem;
    text-transform: uppercase;
  }
}
.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 85px);
  padding: .5rem 15px;
  overflow-x: hidden;
  overflow-y: auto;
}

.dart_side_menu ul li a .mdi {
  position: absolute;
  left: 20px;
  top: 50%;
  -webkit-transform: translate(0, -50%);
      -ms-transform: translate(0, -50%);
          transform: translate(0, -50%);
  font-size: 24px;
  color: #282828;
  width: 30px;
  background-position: center center;
  & + span {
    padding-left: 51px;
  }
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: sticky;
  }
}
</style>
