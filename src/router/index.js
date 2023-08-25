import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../pages/MainPage'
import ProfileLoyout from '../pages/Loyouts/ProfileLoyout'
import OrganizationsLoyout from '../pages/Loyouts/OrganizationsLoyout'
// import ProfilePage from '../pages/ProfilePage'
import ProfileOrganizations from '../pages/ProfileOrganizations'
import ProfileOrganization from '../pages/ProfileOrganization'
import ProfileProducts from '../pages/ProfileProducts'
import ProfileProduct from '../pages/ProfileProduct'
import ProfileDilers from '../pages/ProfileDilers'
import ProfileDilersOpts from '../pages/ProfileDilersOpts'
import ProfileProfile from '../pages/ProfileProfile'
import ProfileOrders from '../pages/ProfileOrders'
import ProfileOrder from '../pages/ProfileOrder'
import ProfileShipping from '../pages/ProfileShipping'
import ProfileMatrix from '../pages/ProfileMatrix'
import ProfileMatrixAdd from '../pages/ProfileMatrixAdd'
import ProfileMatrixEdit from '../pages/ProfileMatrixEdit'
import ProfileDocs from '../pages/ProfileDocs'
import BonusMain from '../pages/BonusMain'
import BonusAdd from '../pages/bonuses/add'
import BonusEdit from '../pages/bonuses/edit'
import BonusPlan from '../pages/bonuses/plan'
import BonusOutofstock from '../pages/BonusOutofstock'
import BonusRemains from '../pages/BonusRemains'
import BonusPersonal from '../pages/BonusPersonal'
import BonusPos from '../pages/BonusPos'
import BonusActions from '../pages/BonusActions'
import BonusQuality from '../pages/BonusQuality'
import BonusAkbpunkts from '../pages/BonusAkbpunkts'
import BonusAkbcity from '../pages/BonusAkbcity'
import ReportMain from '../pages/reports/ReportMain'
import ReportPage from '../pages/reports/ReportPage'
import ReportElemsPage from '../pages/reports/ReportElemsPage'
import ReportsAkb from '../pages/reports/ReportAkb'
import ReportAverage from '../pages/ReportAverage'
import ReportSpeedSales from '../pages/ReportSpeedSales'
import ReportTopSales from '../pages/ReportTopSales'
import ReportAvailable from '../pages/ReportAvailable'
import ReportAvailableStores from '../pages/ReportAvailableStores'
import ReportPresent from '../pages/ReportPresent'
import ProductsAssortmentMain from '../pages/products/main'
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
        path: ':id',
        children: [{
          path: '',
          name: 'organization',
          props: true,
          label: 'Организация',
          component: ProfileOrganization
        }, {
          path: 'products',
          component: OrganizationsLoyout,
          children: [{
            path: '',
            name: 'org_products',
            props: true,
            label: 'Товары',
            component: ProfileProducts
          },
          {
            path: ':product_id',
            name: 'org_product',
            label: 'Товар',
            component: ProfileProduct
          }]
        }, {
          path: 'assortment',
          component: OrganizationsLoyout,
          children: [{
            path: '',
            name: 'org_assortment',
            props: true,
            label: 'Ассортимент',
            component: ProductsAssortmentMain
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
          path: 'opts',
          name: 'org_opts',
          component: ProfileDilersOpts
        }, {
          path: 'docs',
          name: 'org_docs',
          component: ProfileDocs
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
            component: ProfileOrder
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
            path: ':report_id',
            name: 'org_reps',
            children: [{
              path: '',
              name: 'org_reports_page',
              props: true,
              label: 'Страница отчета',
              component: ReportPage
            }, {
              path: ':elem_id',
              name: 'org_reports_elems_page',
              props: true,
              label: 'Страница элемента отчета',
              component: ReportElemsPage
            }]
          }, {
            path: '',
            name: 'org_reports_average',
            component: ReportAverage
          }, {
            path: 'speedsales',
            name: 'org_reports_speed',
            component: ReportSpeedSales
          }, {
            path: 'topsales',
            name: 'org_reports_topsales',
            component: ReportTopSales
          }, {
            path: 'present',
            name: 'org_reports_present',
            component: ReportPresent
          }]
        }, {
          path: 'available',
          children: [{
            path: '',
            name: 'org_reports_available',
            component: ReportAvailable
          }, {
            path: ':region_id',
            name: 'org_reports_available_stores',
            props: true,
            label: 'Страница региона',
            component: ReportAvailableStores
          }]
        }, {
          path: 'akb',
          children: [{
            path: '',
            name: 'org_akb',
            component: ReportsAkb
          }]
        }, {
          path: 'bonuses',
          children: [{
            path: '',
            name: 'org_bonuses',
            component: BonusMain
          }, {
            path: 'add',
            name: 'org_bonuses_add',
            component: BonusAdd
          }, {
            path: ':bonus_id',
            label: 'Редактирование ретро-бонуса',
            children: [{
              path: '',
              name: 'org_bonus_edit',
              component: BonusEdit
            }, {
              path: ':plan_id',
              name: 'org_bonus_plans',
              props: true,
              label: 'Страница плана',
              component: BonusPlan
            }]
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
        }, {
          path: 'matrix',
          children: [{
            path: '',
            name: 'org_matrix',
            props: true,
            label: 'Ключевые матрицы',
            component: ProfileMatrix
          }, {
            path: 'add',
            name: 'org_matrix_add',
            props: true,
            label: 'Добавление ключевой матрицы',
            component: ProfileMatrixAdd
          }, {
            path: ':matrix_id',
            name: 'org_matrix_edit',
            props: true,
            label: 'Редактирование матрицы',
            component: ProfileMatrixEdit
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
