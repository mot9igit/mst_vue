<template>
  <div class="docs">
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <v-docs
      :items_data="getdocs.items"
      :total="getdocs.total"
      :pagination_items_per_page="this.pagination_items_per_page"
      :pagination_offset="this.pagination_offset"
      :page="this.page"
      :table_data="this.table_data"
      :filters="this.filters"
      title="Документы"
      @submit="submit"
      @filter="filter"
      @sort="filter"
      @paginate="paginate"
    >
    <template v-slot:button>
      <a href="#" class="dart-btn dart-btn-primary" v-if="getdocs.submitted" @click="submit('all')">Подтвердить все изменения ({{ getdocs.submitted }})</a>
    </template>
  </v-docs>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Axios from 'axios'
import router from '@/router'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import vDocs from '@/components/table/v-docs'

export default {
  name: 'DocsMain',
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
        filter: {
          name: 'Наименование документа',
          placeholder: 'Наименование документа',
          type: 'text'
        },
        status: {
          name: 'Статус',
          placeholder: 'Статус',
          type: 'dropdown',
          values: this.getdocsstatus
        }
      },
      table_data: {}
    }
  },
  components: { vDocs, ConfirmDialog, Toast },
  computed: {
    ...mapGetters([
      'getdocs',
      'getdocsstatus'
    ])
  },
  mounted () {
    this.get_organization_from_api().then(() => {
      this.get_docs_from_api({
        page: this.page,
        perpage: this.pagination_items_per_page
      })
      this.get_docsstatus_from_api()
    })
  },
  unmounted () {
    // очищаем бонусы
    this.unset_docs_data()
  },
  methods: {
    ...mapActions([
      'get_docs_from_api',
      'get_docsstatus_from_api',
      'get_organization_from_api',
      'unset_docs_data'
    ]),
    filter (data) {
      this.unset_docs_data()
      this.get_docs_from_api(data).then(
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
      this.unset_docs_data()
      this.get_docs_from_api(data).then(
        result => {
          this.loading = false
        },
        error => {
          // alert error
          console.log('Произошла ошибка ' + error)
        }
      )
    },
    submit (type) {
      this.$confirm.require({
        message: 'Вы уверены, что хотите подтвердить изменения?',
        header: 'Подтверждение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.unset_docs_data()
          // отправление AJAX
          return Axios('/rest/front_changeobject', {
            method: 'POST',
            data: {
              id: router.currentRoute._value.params.id,
              type: 'docs',
              doc_id: type
            },
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
            .then((response) => {
              this.$toast.add({ severity: 'info', summary: 'Подтверждение изменений', detail: 'Изменения в документах успешно подтверждены.', life: 3000 })
              this.get_docs_from_api({
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
          this.$toast.add({ severity: 'error', summary: 'Подтверждение изменений', detail: 'Подтверждение отклонено', life: 3000 })
        }
      })
    }
  },
  watch: {
    getdocsstatus: function (newVal, oldVal) {
      this.filters.status.values = newVal
    }
  }
}
</script>
