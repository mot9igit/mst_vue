<template>
  <div class="profile">
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div v-if="organization.type === 3">
      <v-table
        :items_data="getbonuses.items"
        :total="getbonuses.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        :filters="this.filters"
        title="Мои программы"
        @filter="filter"
        @sort="filter"
        @paginate="paginate"
        @deleteElem="deleteBonus"
      >
        <template v-slot:button>
          <RouterLink :to="{ name: 'org_bonuses_add', params: { id: $route.params.id }}" class="dart-btn dart-btn-primary">Добавить бонус</RouterLink>
        </template>
      </v-table>
    </div>
    <div v-else>
      <v-bonus
        :items_data="getbonuses.items"
        :total="getbonuses.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        :filters="this.filters"
        title="Программы производителей"
        @filter="filter"
        @sort="filter"
        @paginate="paginate"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Axios from 'axios'
import router from '@/router'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import vTable from '@/components/table/v-table'
import vBonus from '@/components/table/v-bonus'

export default {
  name: 'BonusMain',
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25
    },
    pagination_offset: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      loading: false,
      reloading: false,
      filters: {
        name: {
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text'
        },
        type: {
          name: 'Бренд',
          placeholder: 'Бренд',
          type: 'dropdown',
          values: this.getbrands
        }
      },
      table_data: {
        banner: {
          label: 'Баннер',
          type: 'image'
        },
        name: {
          label: 'Наименование бонуса',
          type: 'link',
          link_to: 'org_bonus_edit',
          link_params: {
            id: this.$route.params.id,
            bonus_id: 'id'
          },
          sort: true
        },
        brand: {
          label: 'Бренд',
          type: 'text',
          sort: true
        },
        customer: {
          label: 'Поставщик бонуса',
          type: 'text',
          sort: true
        },
        date_from: {
          label: 'Дата от',
          type: 'text',
          sort: true
        },
        date_to: {
          label: 'Дата до',
          type: 'text',
          sort: true
        },
        actions: {
          label: 'Действия',
          type: 'actions',
          sort: false,
          available: {
            delete: {
              icon: 'pi pi-trash',
              label: 'Удалить'
            }
          }
        }
      }
    }
  },
  components: { vBonus, vTable, ConfirmDialog, Toast },
  computed: {
    ...mapGetters([
      'organization',
      'getbrands',
      'getbonuses'
    ])
  },
  mounted () {
    this.get_organization_from_api().then(() => {
      this.get_bonuses_from_api({
        page: this.page,
        perpage: this.pagination_items_per_page
      })
    })
  },
  unmounted () {
    // очищаем бонусы
    this.unset_bonuses_data()
  },
  methods: {
    ...mapActions([
      'get_organization_from_api',
      'get_bonuses_from_api',
      'get_brands_from_api',
      'unset_bonuses_data'
    ]),
    deleteBonus (data) {
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить ретро-бонус ' + data.name + '?',
        header: 'Подтверждение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.unset_bonuses_data()
          // отправление AJAX
          return Axios('/rest/front_deleteobject', {
            method: 'POST',
            data: {
              id: router.currentRoute._value.params.id,
              type: 'bonus',
              bonus_id: data
            },
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
            .then((response) => {
              this.$toast.add({ severity: 'info', summary: 'Удаление', detail: 'Ретро-бонус ' + data.name + ' успешно удален', life: 3000 })
              this.get_bonuses_from_api({
                page: this.page,
                perpage: this.pagination_items_per_page
              })
            })
            .catch(error => {
              if (error.response.status === 403) {
                this.$toast.add({ severity: 'error', summary: 'Вы не авторизованы', detail: 'Вы будете перенаправлены на страницу авторизации', life: 3000 })
                localStorage.removeItem('user')
                router.push({ name: 'home' })
              } else {
                this.$toast.add({ severity: 'error', summary: 'Произошла ошибка', detail: 'Мы скоро это поправим', life: 3000 })
              }
            })
        },
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Удаление', detail: 'Удаление отклонено', life: 3000 })
        }
      })
    },
    filter (data) {
      this.unset_bonuses_data()
      this.get_bonuses_from_api(data).then(
        result => {
          this.loading = false
        },
        error => {
          // alert error
          console.log('Произошла ошибка' + error)
        }
      )
    },
    paginate (data) {
      this.unset_bonuses_data()
      this.get_bonuses_from_api(data).then(
        result => {
          this.loading = false
        },
        error => {
          // alert error
          console.log('Произошла ошибка ' + error)
        }
      )
    }
  },
  watch: {
    getbrands: function (newVal, oldVal) {
      // TODO: add
    }
  }
}
</script>

<style lang="scss">
</style>
