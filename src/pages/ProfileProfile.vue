<template>
  <Toast />
  <div class="profile-content b-wrap">
    <div class="profile-content__title">
      <span class="title">О компании</span>
      <div class="info info-default">
        <i class="d_icon d_icon-clock"></i>
        <span>Подана заявка на изменение реквизитов</span>
      </div>
    </div>
    <form action="#" @submit.prevent="formChangeSimple">
      <div class="dart-alert dart-alert-info">Вы можете изменить только данные контактного лица и логотип организации.</div>
      <div class="dart-form-group">
        <label for="name">Выберите логотип организации</label>
        <FileUpload mode="basic" name="logo[]" :url="'/rest/file_upload.php?store_id=' + $route.params.id + '&path=logo'" accept="image/*" :maxFileSize="2000000" @upload="onUpload" :auto="true" chooseLabel="Выбрать" />
        <div class="dart-upload_files">
          <div class="item" v-for="(file, key) in organization.files" :key="key">
            <img :src="file.thumb" alt="">
          </div>
        </div>
      </div>
      <div class="dart-row">
        <div class="d-col-md-4" v-for="(field, index) in form.fields" :key="index">
          <div class="form_input_group">
            <label for="">{{ field.label }}</label>
            <input type="text" v-model="organization[field.name]" class="dart-form-control" :name="field.name" :placeholder="field.placeholder" :readonly="field.readonly"/>
          </div>
        </div>
      </div>
      <div class="buttons_container">
        <button class="dart-btn dart-btn-primary-outline" type="submit">
          <span>Сохранить</span>
        </button>
        <button class="dart-btn dart-btn-secondary alert_change_btn" type="button" @click.prevent="showFormModal = true">
          <span>Запросить изменение данных</span>
        </button>
      </div>
    </form>
    <teleport to="body">
      <custom-modal v-model="showFormModal" @confirm="confirm" @cancel="cancel">
        <template v-slot:title>Запрос на изменение реквизитов</template>
        <form action="">
          <div class="form_input_group" v-for="(field, index) in form.fields" :key="index">
            <label for="">{{ field.label }}</label>
            <input type="text" v-model="organization[field.name]" class="dart-form-control" :name="field.name" :placeholder="field.placeholder"/>
          </div>
          <div class="form_input_group">
            <button class="dart-btn dart-btn-primary dart-btn-block dart-mt-1" type="submit">Отправить</button>
          </div>
        </form>
      </custom-modal>
    </teleport>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
import customModal from '@/components/popup/CustomModal.vue'
import Toast from 'primevue/toast'
import FileUpload from 'primevue/fileupload'

export default {
  name: 'ProfileProfile',
  props: {},
  data () {
    return {
      showFormModal: false,
      form: {
        fields: [
          {
            name: 'contact',
            label: 'ФИО (контактного лица)',
            placeholder: 'Иванов Иван Иванович',
            type: 'text',
            readonly: 0
          },
          {
            name: 'phone',
            label: 'Телефон (контактного лица)',
            placeholder: '+79991234567',
            type: 'text',
            readonly: 0
          },
          {
            name: 'email',
            label: 'E-mail (контактного лица)',
            placeholder: 'mail@site.ru',
            type: 'text',
            readonly: 0
          },
          {
            name: 'ur_name',
            label: 'Наименования юридического лица',
            placeholder: 'ООО "Магазин"',
            type: 'text',
            readonly: 1
          },
          {
            name: 'inn',
            label: 'ИНН',
            placeholder: '77856974123',
            type: 'text',
            readonly: 1
          },
          {
            name: 'ogrn',
            label: 'ОГРН',
            placeholder: '77856974123',
            type: 'text',
            readonly: 1
          },
          {
            name: 'kpp',
            label: 'КПП',
            placeholder: '77856974123',
            type: 'text',
            readonly: 1
          },
          {
            name: 'rs',
            label: 'Расчетный счет',
            placeholder: '7785612544545',
            type: 'text',
            readonly: 1
          },
          {
            name: 'ks',
            label: 'Корреспондентский счет',
            placeholder: '7785612544545',
            type: 'text',
            readonly: 1
          },
          {
            name: 'bik',
            label: 'БИК',
            placeholder: '12345678',
            type: 'text',
            readonly: 1
          },
          {
            name: 'bik',
            label: 'Банк',
            placeholder: 'ПАО "Сбербанк"',
            type: 'text',
            readonly: 1
          }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'get_organization_from_api',
      'set_organization_data'
    ]),
    onUpload (data) {
      console.log(data.xhr)
      if (data.xhr.response) {
        const response = JSON.parse(data.xhr.response)
        if (Object.prototype.hasOwnProperty.call(response.data, 'files')) {
          // перечень загруженныйх файлов
          this.organization.files = response.data.files
        }
      }
      this.$toast.add({ severity: 'info', summary: 'Файлы загружены', detail: 'Файл был успешно загружен', life: 3000 })
    },
    formChangeSimple () {
      this.loading = true
      this.$load(async () => {
        await this.set_organization_data({
          action: 'set',
          type: 'organization',
          id: router.currentRoute._value.params.id,
          contact: this.organization.contact,
          phone: this.organization.phone,
          email: this.organization.email,
          files: this.organization.files
        })
          .then((result) => {
            this.loading = false
            this.$toast.add({ severity: 'info', summary: 'Данные изменены', detail: 'Данные были успешно изменены', life: 3000 })
            this.get_organization_from_api()
          })
          .catch((result) => {
            console.log(result)
          })
      })
    },
    formSendRequest () {
    }
  },
  mounted () {
    this.get_organization_from_api()
  },
  components: { customModal, FileUpload, Toast },
  computed: {
    ...mapGetters([
      'organization'
    ])
  }
}
</script>

<style lang="scss" scoped>
.buttons_container {
  .dart-btn+.dart-btn {
    margin-left: 5px;
  }
}
</style>
