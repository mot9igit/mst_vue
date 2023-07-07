<template>
  <div>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <h2>Активная база клиентов</h2>
    <div class="akb_plan">
      <v-table
        :items_data="getakbdotsplan.items"
        :total="getakbdotsplan.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        :filters="this.filters"
        title="План АКБ по торговым точкам"
        @filter="filter"
        @sort="filter"
        @paginate="paginate"
        @deleteElem="deleteAkbDots"
      >
        <template v-slot:button>
          <button class="dart-btn dart-btn-primary" @click.prevent="showDotsModal = true">Добавить план</button>
          <teleport to="body">
            <custom-modal v-model="showDotsModal" @cancel="cancelDots">
              <template v-slot:title>Добавить план АКБ по торговым точкам</template>
              <form @submit.prevent="onSubmitAkbDots">
                <div class="dart-form-group">
                  <label for="">Месяц</label>
                  <Calendar v-model="akbdotsplan.form.month" view="month" dateFormat="mm/yy" showIcon :class="{ 'p-invalid': akbdotsplan.errors.month }" id="month"/>
                  <small class="p-error" id="date-error">{{ akbdotsplan.errors.month || '&nbsp;' }}</small>
                </div>
                <div class="dart-form-group">
                  <label for="">Наименование региона/города</label>
                  <TreeSelect v-model="akbdotsplan.form.city" :options="getregions" selectionMode="checkbox" placeholder="Выберите город" class="w-full" :class="{ 'p-invalid': errors.region }"/>
                </div>
                <div class="dart-form-group">
                  <label for="">Точек добавить</label>
                  <InputNumber v-model="akbdotsplan.form.dots" inputId="integeronly" :min="0" :max="9999" @input="akbdotsplancount" :class="{ 'p-invalid': errors.dots }"/>
                  <small class="p-error" id="number-error">{{ errorMessage || (errors.length > 0 ? errors : '&nbsp;') }}</small>
                </div>
                <div class="dart-form-group">
                  <div class="form-flex">
                    <div>
                      <label for="">Точек сейчас:</label>
                      <InputText v-model="akbdotsplan.form.available_dots" disabled placeholder="" />
                    </div>
                    <div>
                      <label for="">Точек станет:</label>
                      <InputText v-model="akbdotsplan.form.available_future_dots" disabled placeholder="" />
                    </div>
                  </div>
                </div>
                <button class="dart-btn dart-btn-primary dart-btn-block dart-mt-1" type="submit" :class="{ 'dart-btn-loading': loadingAkbDotsPlan }" :disabled="loadingAkbDotsPlan">Добавить план</button>
              </form>
            </custom-modal>
          </teleport>
        </template>
      </v-table>
    </div>
    <div class="dart-mt-3">
      <report-akb-punkts/>
    </div>
    <div class="dart-mt-3">
      <report-akb-dots/>
    </div>
    <div class="akb_plan">
      <v-table
        :items_data="getakbpunktsplan.items"
        :total="getakbpunktsplan.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data_punkts"
        :filters="this.filters_punkts"
        title="План АКБ по населенным пунктам"
        @filter="filterPunkts"
        @sort="filterPunkts"
        @paginate="paginatePunkts"
        @deleteElem="deleteAkbPunkts"
      >
        <template v-slot:button>
          <button class="dart-btn dart-btn-primary" @click.prevent="showPunktsModal = true">Добавить план</button>
          <teleport to="body">
            <custom-modal v-model="showPunktsModal" @cancel="cancelPunkts">
              <template v-slot:title>Добавить план АКБ по населенным пунктам</template>
              <form @submit.prevent="onSubmitAkbPunkts">
                <div class="dart-form-group">
                  <label for="">Месяц</label>
                  <Calendar v-model="akbpunktsplan.form.month" view="month" dateFormat="mm/yy" showIcon :class="{ 'p-invalid': akbdotsplan.errors.month }" id="month"/>
                  <small class="p-error" id="date-error">{{ akbpunktsplan.errors.month || '&nbsp;' }}</small>
                </div>
                <div class="dart-form-group">
                  <label for="">Точек добавить</label>
                  <InputNumber v-model="akbpunktsplan.form.dots" inputId="integeronly" :min="0" :max="9999" @input="akbdotsplancount" :class="{ 'p-invalid': errors.dots }"/>
                  <small class="p-error" id="number-error">{{ errorMessage || (errors.length > 0 ? errors : '&nbsp;') }}</small>
                </div>
                <div class="dart-form-group">
                  <div class="form-flex">
                    <div>
                      <label for="">Точек сейчас:</label>
                      <InputText v-model="akbdotsplan.form.available_dots" disabled placeholder="" />
                    </div>
                    <div>
                      <label for="">Точек станет:</label>
                      <InputText v-model="akbdotsplan.form.available_future_dots" disabled placeholder="" />
                    </div>
                  </div>
                </div>
                <button class="dart-btn dart-btn-primary dart-btn-block dart-mt-1" type="submit" :class="{ 'dart-btn-loading': loadingAkbPunktsPlan }" :disabled="loadingAkbPunktsPlan">Добавить план</button>
              </form>
            </custom-modal>
          </teleport>
        </template>
      </v-table>
    </div>
    <div class="dart-mt-3">
      <report-akb-settlements/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
import Axios from 'axios'
// import { useField, useForm } from 'vee-validate'
// import * as yup from 'yup'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import vTable from '@/components/table/v-table'
import Calendar from 'primevue/calendar'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import TreeSelect from 'primevue/treeselect'
import customModal from '@/components/popup/CustomModal'
import ReportAkbDots from '@/components/reports/report-akb-dots.vue'
import ReportAkbSettlements from '@/components/reports/report-akb-settlements.vue'
import ReportAkbPunkts from '@/components/reports/report-akb-punkts.vue'

export default {
  name: 'ReportsAkb',
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
      showDotsModal: false,
      showPunktsModal: false,
      loadingAkbDotsPlan: false,
      loadingAkbPunktsPlan: false,
      reloading: false,
      errors: { },
      akbdotsplan: {
        form: { },
        errors: { }
      },
      akbpunktsplan: {
        form: { },
        errors: { }
      },
      filters: {
      },
      filters_punkts: {
      },
      table_data: {
        name: {
          label: 'Наименование региона/населенных пунктов',
          type: 'text'
        },
        count: {
          label: 'План АКБ',
          type: 'text'
        },
        fact_akb: {
          label: 'Выполнение АКБ',
          type: 'text'
        },
        date: {
          label: 'Месяц',
          type: 'text'
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
      },
      table_data_punkts: {
        count: {
          label: 'План АКБ',
          type: 'text'
        },
        fact_akb: {
          label: 'Выполнение АКБ',
          type: 'text'
        },
        date: {
          label: 'Месяц',
          type: 'text'
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
  components: { ReportAkbDots, ReportAkbSettlements, ReportAkbPunkts, Calendar, TreeSelect, InputNumber, InputText, vTable, customModal, Toast, ConfirmDialog },
  computed: {
    ...mapGetters([
      'getakbdotsplan',
      'getakbpunktsplan',
      'getakbdata',
      'getregions'
    ])
  },
  mounted () {
    this.get_akbdotsplan_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    }).then(() => {})
    this.get_akbpunktsplan_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    }).then(() => {})
    this.get_regions_from_api().then(
      this.regions = this.getregions
    )
    this.get_akb_data().then(
      this.akbdotsplan.form.available_dots = this.getakbdata.dots
    )
  },
  unmounted () {
    this.unset_akbdotsplan_data()
    this.unset_akbpunktsplan_data()
  },
  methods: {
    ...mapActions([
      'get_akbdotsplan_from_api',
      'get_akbpunktsplan_from_api',
      'get_akb_data',
      'get_regions_from_api',
      'unset_akbdotsplan_data',
      'unset_akbpunktsplan_data',
      'set_object_to_api'
    ]),
    setDots () {
    },
    akbdotsplancount (e) {
      this.akbdotsplan.form.available_future_dots = Number(this.akbdotsplan.form.available_dots) + Number(e.value)
    },
    onSubmitAkbDots () {
      // TODO: VALIDATE
      this.loadingAkbDotsPlan = true
      this.$load(async () => {
        const data = {
          action: 'set',
          id: router.currentRoute._value.params.id,
          type: 'akbdotsplan',
          data: this.akbdotsplan.form
        }
        await this.set_object_to_api(data)
          .then((result) => {
            this.loadingAkbDotsPlan = false
            this.showDotsModal = false
            this.get_akbdotsplan_from_api({
              page: this.page,
              perpage: this.pagination_items_per_page
            }).then(() => {})
          })
          .catch((result) => {
            console.log(result)
          })
      })
    },
    onSubmitAkbPunkts () {
      // TODO: VALIDATE
      this.loadingAkbPunktsPlan = true
      this.$load(async () => {
        const data = {
          action: 'set',
          id: router.currentRoute._value.params.id,
          type: 'akbpunktsplan',
          data: this.akbpunktsplan.form
        }
        await this.set_object_to_api(data)
          .then((result) => {
            this.loadingAkbPunktsPlan = false
            this.showPunktsModal = false
            this.get_akbpunktsplan_from_api({
              page: this.page,
              perpage: this.pagination_items_per_page
            }).then(() => {})
          })
          .catch((result) => {
            console.log(result)
          })
      })
    },
    cancelDots () {
      this.akbdotsplan.form = {}
    },
    cancelPunkts () {
      this.akbpunktsplan.form = {}
    },
    deleteAkbDots (data) {
      console.log(4)
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить план на ' + data.date + '?',
        header: 'Подтверждение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.unset_akbdotsplan_data()
          // отправление AJAX
          return Axios('/rest/front_deleteobject', {
            method: 'POST',
            data: {
              id: router.currentRoute._value.params.id,
              type: 'akbdotsplan',
              plan_id: data
            },
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
            .then((response) => {
              this.$toast.add({ severity: 'info', summary: 'Удаление', detail: 'План на ' + data.date + ' успешно удален', life: 3000 })
              this.get_akbdotsplan_from_api({
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
    deleteAkbPunkts (data) {
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить план на ' + data.date + '?',
        header: 'Подтверждение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.unset_akbpunktsplan_data()
          // отправление AJAX
          return Axios('/rest/front_deleteobject', {
            method: 'POST',
            data: {
              id: router.currentRoute._value.params.id,
              type: 'akbpunktsplan',
              plan_id: data
            },
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
            .then((response) => {
              this.$toast.add({ severity: 'info', summary: 'Удаление', detail: 'План на ' + data.date + ' успешно удален', life: 3000 })
              this.get_akbpunktsplan_from_api({
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
    paginate (data) {
      this.unset_akbdotsplan_data()
      this.loading = true
      this.get_akbdotsplan_from_api(data).then(
        result => {
          this.loading = false
        },
        error => {
          // alert error
          console.log('Произошла ошибка ' + error)
        }
      )
    },
    paginatePunkts (data) {
      this.unset_akbpunktsplan_data()
      this.loading = true
      this.get_akbpunktsplan_from_api(data).then(
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
    getregions: function (newVal, oldVal) {
      this.regions = this.getregions
    },
    getakbdata: function (newVal, oldVal) {
      this.akbdotsplan.form.available_dots = this.getakbdata.dots
      this.akbdotsplan.errors = { }
    }
  }
}
</script>

<style lang="scss">
  .form-flex{
    display: flex;
    justify-content: space-between;
    div{
      display: flex;
      align-items: center;
      label + input{
        margin-left: 5px;
      }
      input{
        max-width: 80px;
      }
      & + div{
        padding-left: 10px;
      }
    }
  }
  .panel_widget{
    .panel_widget__header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      span.title{
        display: block;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 1.3;
        color: #282828;
      }
      & + .panel_widget__content{
        margin-top: 35px;
      }
    }
    .addicted_params{
      padding-top: 35px;
      .title{
        display: block;
        margin-bottom: 25px;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 1.3;
        letter-spacing: 0.25px;
        color: #282828;
      }
    }
    .p-calendar{
      width: 100%;
    }
    .buttons-container{
      padding-top: 15px;
      display: flex;
      justify-content: flex-end;
    }
  }
  .p-multiselect .p-multiselect-label,
  .p-inputtext,
  .p-autocomplete .p-autocomplete-multiple-container {
    padding: 10px 15px !important;
    font-size: 14px !important;
    line-height: 1.4;
  }
</style>
