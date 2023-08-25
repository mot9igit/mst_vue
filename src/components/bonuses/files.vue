<template>
  <div class="program-files">
    <v-table
        :items_data="programfiles.items"
        :total="programfiles.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        :filters="this.filters"
        title="Файлы программы"
        @filter="setFilter"
        @sort="setFilter"
        @paginate="paginate"
        @deleteElem="deleteFile"
        @editElem="updateFile"
      >
        <template v-slot:desc>
          <span class="desc__text">Если у вас есть готовые файлы программы: презентации, таблицы, условия, Вы можете привязать их к ней.</span>
        </template>
        <template v-slot:button>
          <button class="dart-btn dart-btn-simple" @click.prevent="showFileModal = true">Добавить файл</button>
          <teleport to="body">
            <custom-modal v-model="showFileModal" @close="cancelFile" class="plan-modal">
              <template v-slot:title>{{ mode[m].header }}</template>
              <form @submit.prevent="onSubmitFile">
                <div class="plans-form-group">
                  <div class="dart-row">
                    <div class="d-col-md-12">
                      <div class="dart-form-group">
                        <label for="name">Наименование файла</label>
                        <InputText v-model="file.form.name" placeholder="" />
                      </div>
                    </div>
                    <div class="d-col-md-12">
                      <div class="dart-form-group">
                        <label for="name">Файл</label>
                        <FileUpload mode="basic" name="logo[]" :url="'/rest/file_upload.php?store_id=' + $route.params.id + '&path=programs/' + $route.params.bonus_id + '/files'" :maxFileSize="2000000" @upload="onUpload" :auto="true" chooseLabel="Выберите файл" />
                        <div v-if="file.form.file" class="program_files">
                          <div class="item">
                            <a :href="file.form.file" target="_blank">Скачать/Просмотреть</a>
                          </div>
                        </div>
                        <div v-if="file.form.files" class="program_files">
                          <div class="item" v-for="(file, key) in file.form.files" :key="key">
                            <a :href="file.original_href" target="_blank">Скачать/Просмотреть</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="d-col-md-12">
                      <div class="dart-form-group">
                        <label for="">Описание</label>
                        <Textarea v-model="file.form.description" rows="3" cols="30" />
                      </div>
                    </div>
                  </div>
                </div>
                <button class="dart-btn dart-btn-primary dart-btn-block dart-mt-1" type="submit" :class="{ 'dart-btn-loading': loadingFile }" :disabled="loadingFile">{{ mode[m].button }}</button>
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
import FileUpload from 'primevue/fileupload'

export default {
  name: 'programFiles',
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
          header: 'Добавление файла',
          button: 'Добавить'
        },
        edit: {
          header: 'Изменение файла',
          button: 'Сохранить'
        }
      },
      m: 'new',
      file: {
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
      loadingFile: false,
      showFileModal: false,
      table_data: {
        name: {
          label: 'Наименование',
          type: 'clickevent',
          sort: true
        },
        file: {
          label: 'Файл',
          type: 'downloadhref',
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
      'get_programfiles_from_api',
      'set_object_to_api',
      'unset_programfiles'
    ]),
    setFilter (data) {
      this.loading = true
      this.unset_programfiles()
      this.get_programfiles_from_api(data).then(
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
      this.unset_programfiles()
      this.get_programfiles_from_api(data).then(
        result => {
          this.loading = false
        },
        error => {
          // alert error
          console.log('Произошла ошибка ' + error)
        }
      )
    },
    onSubmitFile () {
      this.loadingFile = true
      this.$load(async () => {
        await this.set_object_to_api({
          action: 'set',
          type: 'programfile',
          id: router.currentRoute._value.params.id,
          bonus_id: router.currentRoute._value.params.bonus_id,
          data: this.file.form
        })
          .then((result) => {
            this.loadingFile = false
            this.showFileModal = false
            this.m = 'new'
            this.get_programfiles_from_api({
              page: this.page,
              perpage: this.pagination_items_per_page
            })
          })
          .catch((result) => {
            console.log(result)
          })
      })
    },
    cancelFile () {
      this.m = 'new'
      this.file.form.files = []
    },
    onUpload (data) {
      console.log(data.xhr)
      if (data.xhr.response) {
        const response = JSON.parse(data.xhr.response)
        if (Object.prototype.hasOwnProperty.call(response.data, 'files')) {
          // перечень загруженныйх файлов
          this.file.form.file = ''
          this.file.form.files = response.data.files
        }
      }
      this.$toast.add({ severity: 'info', summary: 'Файлы загружены', detail: 'Файл был успешно загружен', life: 3000 })
    },
    updateFile (data) {
      this.m = 'edit'
      this.file.form.name = data.name
      this.file.form.file = data.file
      this.file.form.description = data.description
      this.file.form.id = data.id
      this.showFileModal = true
    },
    deleteFile (data) {
      console.log(data)
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить файл ' + data.name + '?',
        header: 'Подтверждение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.unset_programfiles()
          // отправление AJAX
          return Axios('/rest/front_deleteobject', {
            method: 'POST',
            data: {
              id: router.currentRoute._value.params.id,
              type: 'programfile',
              bonus_id: router.currentRoute._value.params.bonus_id,
              file_id: data
            },
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
            .then((response) => {
              this.$toast.add({ severity: 'info', summary: 'Удаление', detail: 'файл ' + data.name + ' успешно удален', life: 3000 })
              this.get_programfiles_from_api({
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
    this.get_programfiles_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    })
  },
  components: { vTable, customModal, FileUpload, InputText, Textarea },
  computed: {
    ...mapGetters([
      'programfiles'
    ])
  },
  watch: {}
}
</script>

<style lang="scss">
  .program_files{
    margin: 30px -15px 0;
    display: flex;
    flex-wrap: wrap;
    .item{
      padding: 15px 15px;
      width: 33.3333333%;
      a{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ced4da;
        border-radius: 5px;
        min-height: 80px;
        font-size: 14px;
        text-decoration: none;
      }
    }
  }
</style>
