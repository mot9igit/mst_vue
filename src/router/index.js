import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../pages/MainPage'
import ProfileLoyout from '../pages/Loyouts/ProfileLoyout'
import OrganizationsLoyout from '../pages/Loyouts/OrganizationsLoyout'
import ProfilePage from '../pages/ProfilePage'
import ProfileOrganizations from '../pages/ProfileOrganizations'
import ProfileOrganization from '../pages/ProfileOrganization'
import ProfileProducts from '../pages/ProfileProducts'
import ProfileProduct from '../pages/ProfileProduct'
import ProfileDilers from '../pages/ProfileDilers'
import ProfileProfile from '../pages/ProfileProfile'
import ProfileOrders from '../pages/ProfileOrders'
import ProfileOrder from '../pages/ProfileOrder'
import ProfileShipping from '../pages/ProfileShipping'
import BonusMain from '../pages/BonusMain'
import BonusOutofstock from '../pages/BonusOutofstock'
import BonusRemains from '../pages/BonusRemains'
import BonusPersonal from '../pages/BonusPersonal'
import BonusPos from '../pages/BonusPos'
import BonusActions from '../pages/BonusActions'
import BonusQuality from '../pages/BonusQuality'
import BonusAkbpunkts from '../pages/BonusAkbpunkts'
import BonusAkbcity from '../pages/BonusAkbcity'
import ReportMain from '../pages/ReportMain'
import ReportAverage from '../pages/ReportAverage'
import ReportSpeedSales from '../pages/ReportSpeedSales'
import notFound from '../pages/NotFound'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileLoyout,
    props: true,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('user')) {
        next()
      } else {
        next({ name: 'home' })
      }
    },
    children: [{
      path: '',
      name: 'profile',
      meta: {
        breadcrumb: {
          label: 'Профиль'
        }
      },
      props: true,
      label: 'Профиль',
      component: ProfilePage
    }, {
      path: 'organizations',
      children: [{
        path: '',
        name: 'organizations',
        meta: {
          breadcrumb: {
            label: 'Организации'
          }
        },
        props: true,
        label: 'Организации',
        component: ProfileOrganizations
      }, {
        path: ':type/:id',
        children: [{
          path: '',
          name: 'organization',
          meta: {
            breadcrumb: {
              breadcrumb (route, app) {
                return `Item ${route.params.id}`
              }
            }
          },
          props: true,
          label: 'Организация',
          component: ProfileOrganization
        }, {
          path: 'products',
          component: OrganizationsLoyout,
          children: [{
            path: '',
            name: 'org_products',
            meta: {
              breadcrumb: {
                label: 'Товары'
              }
            },
            props: true,
            label: 'Товары',
            component: ProfileProducts
          },
          {
            path: ':product_id',
            name: 'org_product',
            label: 'Товар',
            meta: {
              breadcrumb: {
                breadcrumb (route, app) {
                  return `Item ${route.params.product_id}`
                }
              }
            },
            component: ProfileProduct
          }]
        }, {
          path: 'profile',
          name: 'org_profile',
          component: ProfileProfile
        }, {
          path: 'dilers',
          name: 'org_dilers',
          component: ProfileDilers
        }, {
          path: 'orders',
          children: [{
            path: '',
            name: 'org_orders',
            meta: {
              breadcrumb: {
                label: 'Заказы'
              }
            },
            props: true,
            component: ProfileOrders
          }, {
            path: ':order_id',
            name: 'org_order',
            component: ProfileOrder,
            meta: {
              breadcrumb: {
                breadcrumb (route, app) {
                  return `Item ${route.params.order_id}`
                }
              }
            }
          }]
        }, {
          path: 'shipping',
          name: 'org_shipping',
          component: ProfileShipping
        }, {
          path: 'reports',
          children: [{
            path: '',
            name: 'org_reports',
            component: ReportMain
          }, {
            path: '',
            name: 'org_reports_average',
            component: ReportAverage
          }, {
            path: '',
            name: 'org_reports_speed',
            component: ReportSpeedSales
          }]
        }, {
          path: 'bonuses',
          children: [{
            path: '',
            name: 'org_bonuses',
            component: BonusMain
          }, {
            path: 'outofstock',
            name: 'org_outofstock',
            component: BonusOutofstock
          }, {
            path: 'remains',
            name: 'org_remains',
            component: BonusRemains
          }, {
            path: 'personal',
            name: 'org_personal',
            component: BonusPersonal
          }, {
            path: 'actions',
            name: 'org_actions',
            component: BonusActions
          }, {
            path: 'quality',
            name: 'org_quality',
            component: BonusQuality
          }, {
            path: 'akb_punkts',
            name: 'org_akb_punkts',
            component: BonusAkbpunkts
          }, {
            path: 'akb_city',
            name: 'org_akb_city',
            component: BonusAkbcity
          }, {
            path: 'pos',
            name: 'org_pos',
            component: BonusPos
          }]
        }]
      }]
    }, {
      path: ':pathMatch(.*)*',
      redirect: { name: 'profile' }
    }]
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: notFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
