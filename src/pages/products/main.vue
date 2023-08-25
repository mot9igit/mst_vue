<template>
  <div class="profile">
    <h2>Ассортимент товаров</h2>
    <div class="dart-alert dart-alert-info">На данной странице Вы можете подгрузить весь свой ассортимент товаров для аналитики. Система принимает выгрузку в формате <a href="https://yandex.ru/support/marketplace/assortment/auto/yml.html" target="_blank">YML</a>.</div>
    <v-table
        :items_data="feeds.items"
        :total="feeds.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        :filters="this.filters"
        title="Файлы фидов"
        @filter="setFilter"
        @sort="setFilter"
        @paginate="paginate"
        @deleteElem="deleteFeed"
        @editElem="updateFeed"
      >
        <template v-slot:button>
          <button class="dart-btn dart-btn-simple" @click.prevent="showFeedModal = true">Добавить файл</button>
          <teleport to="body">
            <custom-modal v-model="showFeedModal" @close="cancelFeed" class="plan-modal">
              <template v-slot:title>{{ mode[m].header }}</template>
              <form @submit.prevent="onSubmitFeed">
                <div class="plans-form-group">
                  <div class="dart-row">
                    <div class="d-col-md-6">
                      <div class="dart-form-group">
                        <label for="name">Наименование фида</label>
                        <InputText v-model="feed.form.name" placeholder="" />
                      </div>
                    </div>
                    <div class="d-col-md-6">
                      <div class="dart-form-group">
                        <label for="name">Ссылка</label>
                        <InputText v-model="feed.form.file" placeholder="" />
                      </div>
                    </div>
                    <div class="d-col-md-12">
                      <div class="dart-form-group">
                        <label for="">Описание</label>
                        <Textarea v-model="feed.form.description" rows="3" cols="30" />
                      </div>
                    </div>
                  </div>
                </div>
                <button class="dart-btn dart-btn-primary dart-btn-block dart-mt-1" type="submit" :class="{ 'dart-btn-loading': loadingFeed }" :disabled="loadingFeed">{{ mode[m].button }}</button>
              </form>
            </custom-modal>
          </teleport>
        </template>
      </v-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Axios from 'axios'
import router from '@/router'
import vTable from '@/components/table/v-table'
import customModal from '@/components/popup/CustomModal'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'

export default {
  name: 'ProductsAssortmentMain',
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25
    },
    pagination_offset: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      mode: {
        new: {
          header: 'Добавление файла фида',
          button: 'Добавить'
        },
        edit: {
          header: 'Изменение файла фида',
          button: 'Сохранить'
        }
      },
      m: 'new',
      feed: {
        form: {
          id: 0,
          name: '',
          file: '',
          description: '',
          params: { }
        }
      },
      page: 1,
      filter: '',
      filters: { },
      loadingFeed: false,
      showFeedModal: false,
      table_data: {
        name: {
          label: 'Наименование',
          type: 'clickevent',
          sort: true
        },
        file: {
          label: 'Файл',
          type: 'text',
          sort: true
        },
        categories: {
          label: 'Кол-во категорий',
          type: 'text',
          sort: true
        },
        products: {
          label: 'Кол-во предложений',
          type: 'text',
          sort: true
        },
        status_name: {
          label: 'Статус',
          type: 'text',
          sort: true
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
      'get_feeds_from_api',
      'set_object_to_api',
      'unset_feeds'
    ]),
    setFilter (data) {
      this.loading = true
      this.unset_feeds()
      this.get_feeds_from_api(data).then(
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
      this.loading = true
      this.page = data.page
      this.unset_feeds()
      this.get_feeds_from_api(data).then(
        result => {
          this.loading = false
        },
        error => {
          // alert error
          console.log('Произошла ошибка ' + error)
        }
      )
    },
    onSubmitFeed () {
      this.loadingFeed = true
      this.$load(async () => {
        await this.set_object_to_api({
          action: 'set',
          type: 'feed',
          id: router.currentRoute._value.params.id,
          data: this.feed.form
        })
          .then((result) => {
            this.loadingFeed = false
            this.showFeedModal = false
            this.m = 'new'
            this.get_feeds_from_api({
              page: this.page,
              perpage: this.pagination_items_per_page
            })
          })
          .catch((result) => {
            console.log(result)
          })
      })
    },
    cancelFeed () {
      this.m = 'new'
    },
    updateFeed (data) {
      this.m = 'edit'
      this.feed.form.name = data.name
      this.feed.form.file = data.file
      this.feed.form.description = data.description
      this.feed.form.id = data.id
      this.showFeedModal = true
    },
    deleteFeed (data) {
      console.log(data)
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить фид ' + data.name + '?',
        header: 'Подтверждение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.unset_feeds()
          // отправление AJAX
          return Axios('/rest/front_deleteobject', {
            method: 'POST',
            data: {
              id: router.currentRoute._value.params.id,
              type: 'feed',
              plan_id: data
            },
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
            .then((response) => {
              this.$toast.add({ severity: 'info', summary: 'Удаление', detail: 'Фид ' + data.name + ' успешно удален', life: 3000 })
              this.get_feeds_from_api({
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
    }
  },
  mounted () {
    this.get_feeds_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    })
  },
  components: { vTable, customModal, InputText, Textarea },
  computed: {
    ...mapGetters([
      'feeds'
    ])
  },
  watch: {}
}
</script>

<style lang="scss">
</style>
