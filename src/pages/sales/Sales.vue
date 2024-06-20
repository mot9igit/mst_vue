<template>
  <TabView class="tab-custom">
      <TabPanel header="Акции">
        <v-table
          :items_data="actions.items"
          :total="actions.total"
          :pagination_items_per_page="this.pagination_items_per_page"
          :pagination_offset="this.pagination_offset"
          :page="this.page"
          :table_data="this.table_data"
          :filters="this.filters"
          :title="'Мои акции'"
          @filter="filter"
          @sort="filter"
          @paginate="paginate"
          @editElem="editElem"
          @approveElem="approveElem"
          @deleteElem="deleteElem"
        >
          <template v-slot:button>
            <RouterLink :to="{ name: 'org_sales_add', params: { id: $route.params.id }}" class="dart-btn dart-btn-primary">Создать акцию</RouterLink>
          </template>
        </v-table>
      </TabPanel>
      <TabPanel header="Комплекты">
        <v-table
          :items_data="optcomplects.complects"
          :total="optcomplects.total"
          :pagination_items_per_page="this.pagination_items_per_page_complects"
          :pagination_offset="this.pagination_offset_complects"
          :page="this.page_complects"
          :table_data="this.table_data_complects"
          :filters="this.filters_complects"
          :title="'Мои комплекты'"
          @filter="filterComplects"
          @sort="filterComplects"
          @paginate="paginateComplects"
          @editElem="editComplects"
          @approveElem="approveComplects"
          @deleteElem="deleteComplects"
        >
          <template v-slot:button>
            <RouterLink :to="{ name: 'complect_add', params: { id: $route.params.id }}" class="dart-btn dart-btn-primary">Создать комлект</RouterLink>
          </template>
        </v-table>
      </TabPanel>
  </TabView>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from '../../components/table/v-table'
import { RouterLink } from 'vue-router'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import router from '@/router'

export default {
  name: 'ProfileSales',
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25
    },
    pagination_offset: {
      type: Number,
      default: 0
    },
    pagination_items_per_page_complects: {
      type: Number,
      default: 25
    },
    pagination_offset_complects: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      page: 1,
      page_complects: 1,
      filters: {
        name: {
          name: 'Название, бренд или артикул',
          placeholder: 'Название, бренд или артикул',
          type: 'text'
        }
      },
      filters_complects: {
        name: {
          name: 'Название, бренд или артикул',
          placeholder: 'Название, бренд или артикул',
          type: 'text'
        }
      },
      table_data: {
        image_inner: {
          label: 'Баннер',
          type: 'image',
          baseurl: false
        },
        name: {
          label: 'Наименование',
          type: 'link',
          link_to: 'promotion',
          link_params: {
            id: this.$route.params.id,
            action: 'id'
          },
          sort: true
        },
        date_from: {
          label: 'Действует с',
          type: 'text',
          sort: true
        },
        date_to: {
          label: 'Действует до',
          type: 'text',
          sort: true
        },
        active: {
          label: 'Активно',
          type: 'boolean'
        },
        actions: {
          label: 'Действия',
          type: 'actions',
          sort: false,
          available: {
            edit: {
              icon: 'pi pi-pencil',
              label: 'Редактировать'
            },
            approve: {
              icon: 'pi pi-power-off',
              label: 'Включить'
            },
            delete: {
              icon: 'pi pi-trash',
              label: 'Удалить'
            }
          }
        }
      },
      table_data_complects: {
        name: {
          label: 'Наименование',
          type: 'link',
          link_to: 'complect_edit',
          link_params: {
            id: this.$route.params.id,
            complect_id: 'id'
          },
          sort: true
        },
        active: {
          label: 'Активно',
          type: 'boolean'
        },
        actions: {
          label: 'Действия',
          type: 'actions',
          sort: false,
          available: {
            edit: {
              icon: 'pi pi-pencil',
              label: 'Редактировать'
            },
            approve: {
              icon: 'pi pi-power-off',
              label: 'Включить'
            },
            delete: {
              icon: 'pi pi-trash',
              label: 'Удалить'
            }
          }
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'get_sales_to_api',
      'set_sales_to_api',
      'opt_get_complects',
      'opt_api'
    ]),
    filter (data) {
      data.type = 'b2b'
      this.get_sales_to_api(data)
    },
    filterComplects (data) {
      data.action = 'complects/get'
      data.store_id = router.currentRoute._value.params.id
      this.opt_get_complects(data)
    },
    paginate (data) {
      this.page = data.page
      data.type = 'b2b'
      this.get_sales_to_api(data)
    },
    paginateComplects (data) {
      this.page_complects = data.page
      data.action = 'complects/get'
      data.store_id = router.currentRoute._value.params.id
      this.opt_get_complects(data)
    },
    editElem (value) {
      router.push({ name: 'org_sales_edit', params: { id: this.$route.params.id, sales_id: value.id } })
    },
    editComplects (value) {
      router.push({ name: 'complect_edit', params: { id: this.$route.params.id, complect_id: value.id } })
    },
    approveElem (value) {
      this.$load(async () => {
        await this.set_sales_to_api({
          action: 'off/on',
          store_id: router.currentRoute._value.params.id,
          action_id: value.id
        })
          .then((result) => {
            this.get_sales_to_api({
              page: this.page,
              perpage: this.pagination_items_per_page,
              type: 'b2b'
            })
          })
          .catch((result) => {
            console.log(result)
          })
      })
    },
    deleteElem (value) {
      this.$load(async () => {
        await this.set_sales_to_api({
          action: 'delete',
          store_id: router.currentRoute._value.params.id,
          action_id: value.id
        })
          .then((result) => {
            this.get_sales_to_api({
              page: this.page,
              perpage: this.pagination_items_per_page,
              type: 'b2b'
            })
          })
          .catch((result) => {
            console.log(result)
          })
      })
    },
    deleteComplects (value) {
      this.$load(async () => {
        await this.opt_api({
          action: 'complect/delete',
          store_id: router.currentRoute._value.params.id,
          complect_id: value.id
        })
          .then((result) => {
            this.page_complects = 1
            this.opt_get_complects({
              action: 'complects/get',
              page: this.page_complects,
              perpage: this.pagination_items_per_page_complects,
              store_id: router.currentRoute._value.params.id
            })
          })
          .catch((result) => {
            console.log(result)
          })
      })
    }
  },
  mounted () {
    this.get_sales_to_api({
      page: this.page,
      perpage: this.pagination_items_per_page,
      type: 'b2b'
    })
    this.opt_get_complects({
      action: 'complects/get',
      page: this.page_complects,
      perpage: this.pagination_items_per_page_complects,
      store_id: router.currentRoute._value.params.id
    })
  },
  components: { vTable, RouterLink, TabView, TabPanel },
  computed: {
    ...mapGetters([
      'actions',
      'optcomplects'
    ])
  }
}
</script>

<style lang="scss">

.tab-custom{
  .p-tabview-nav{
    margin: 0 !important;
    border: 0 !important;
  }

  .p-tabview-header{
    padding: 0 !important;
  }

  .p-tabview-nav-link{
    border-color: #282828 !important;
    color: #282828 !important;
    text-decoration: none !important;
  }

  .p-tabview-ink-bar{
    height: 3px;
    padding: 0;
    background: #282828 !important;
  }
}
</style>
