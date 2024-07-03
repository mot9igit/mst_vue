<template>
  <Toast />
  <div class="profile-content b-wrap">
    <TabView class="tab-custom">
      <TabPanel header="О компании">
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
                <img :src="file.url" alt="">
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
            <div class="d-col-md-6">
              <div class="form_input_group">
                <label for="">Описание организации</label>
                <textarea v-model="organization.description" class="dart-form-control" :name="description" placeholder="Опишите ваш ассортимент и конкурентные преимущества"></textarea>
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
      </TabPanel>
      <TabPanel header="Настройки">
        <form action="#" @submit.prevent="formChangeSettings">
          <div class="dart-row">
            <div class="d-col-md-6">
              <div class="dart-form-block">
                <span class="title">Маркетплейс</span>
                <div class="dart-form-block__content">
                  <div class="dart-form-group">
                    <FloatLabel class="w-full md:w-14rem">
                      <Dropdown v-model="this.settingsForm.price" :options="this.typePrice" optionLabel="name" class="w-full" />
                      <label for="dd-city">Выберите цену по умолчанию для маркетплейса</label>
                    </FloatLabel>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-col-md-6">
              <div class="dart-form-block">
                <span class="title">Закупки</span>
                <div class="dart-form-block__content">
                  <div class="dart-form-group">
                    <FloatLabel class="w-full md:w-14rem">
                      <Dropdown v-model="this.settingsForm.opt_price" :options="this.typePrice" optionLabel="name" class="w-full" />
                      <label for="dd-city">Выберите цену по умолчанию для маркетплейса</label>
                    </FloatLabel>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="form_input_group">
            <button class="dart-btn dart-btn-primary dart-mt-1" type="submit">Сохранить</button>
          </div>
        </form>
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
import FloatLabel from 'primevue/floatlabel'
import Dropdown from 'primevue/dropdown'
import customModal from '@/components/popup/CustomModal.vue'
import Toast from 'primevue/toast'
import FileUpload from 'primevue/fileupload'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'

export default {
  name: 'ProfileProfile',
  props: {},
  data () {
    return {
      showFormModal: false,
      typePrice: [],
      settingsForm: {
        price: 0,
        opt_price: 0
      },
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
            name: 'bank_number',
            label: 'Расчетный счет',
            placeholder: '7785612544545',
            type: 'text',
            readonly: 1
          },
          {
            name: 'bank_knumber',
            label: 'Корреспондентский счет',
            placeholder: '7785612544545',
            type: 'text',
            readonly: 1
          },
          {
            name: 'bank_bik',
            label: 'БИК',
            placeholder: '12345678',
            type: 'text',
            readonly: 1
          },
          {
            name: 'bank_name',
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
      'set_organization_data',
      'opt_get_prices'
    ]),
    onUpload (data) {
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
          description: this.organization.description,
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
    this.get_organization_from_api().then(() => {
      this.opt_get_prices({
        action: 'get/type/prices',
        store_id: router.currentRoute._value.params.id
      })
    })
  },
  components: { customModal, FileUpload, Toast, TabView, TabPanel, Dropdown, FloatLabel },
  computed: {
    ...mapGetters([
      'organization',
      'oprprices'
    ])
  },
  watch: {
    oprprices: function (newVal, oldVal) {
      this.typePrice = []
      for (let i = 0; i < newVal.length; i++) {
        this.typePrice.push({ key: newVal[i].guid, name: newVal[i].name })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.buttons_container {
  .dart-btn+.dart-btn {
    margin-left: 5px;
  }
}
.dart-upload_files .item img {
  max-width: 52px;
  width: 100%;
}
.dart-form-block{
  display: block;
  span.title{
    display: block;
    font-size: 24px;
    line-height: 1.3;
    font-weight: 500;
  }
  &__content{
    padding: 15px 0;
    .dart-form-group{
      padding-top: 15px;
    }
  }
}
</style>
