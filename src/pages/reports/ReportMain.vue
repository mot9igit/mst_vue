<template>
  <h2>Мастер отчетов</h2>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div class="panel_widget panel_widget_organization">
    <div class="panel_widget__header">
      <span class="title">Генерация отчета</span>
    </div>
    <div class="panel_widget__content">
      <div class="form">
        <form action="#" @submit.prevent="formSubmit">
          <div class="dart-row">
            <div class="d-col-md-3">
              <span class="p-float-label">
                <InputText id="username" v-model="report.name" />
                <label for="username">Наименование отчета</label>
              </span>
            </div>
            <div class="d-col-md-3">
              <span class="p-float-label">
                <Calendar v-model="report.date_from" :minDate="dates.minDateFrom" :maxDate="dates.maxDateFrom" showIcon @update:modelValue="setMinToDate()"/>
                <label for="username">От</label>
              </span>
            </div>
            <div class="d-col-md-3">
              <span class="p-float-label">
                <Calendar v-model="report.date_to" :minDate="dates.minDateTo" :maxDate="dates.maxDateTo" showIcon @update:modelValue="setMaxFromDate()"/>
                <label for="username">По</label>
              </span>
            </div>
            <div class="d-col-md-3">
              <div class="p-float-label">
                <Dropdown v-model="report.type" :options="reportTypes" optionLabel="name" placeholder="Тип отчета" />
                <label for="dd-city">Тип отчета</label>
              </div>
            </div>
          </div>
          <div class="addicted_params" v-if="addictedParams[report.type.code]">
            <span class="title">Дополнительные параметры</span>
            <div class="dart-row" v-for="(ffilter, i) in addictedParams[report.type.code]" :key="i">
              <div class="d-col-md-3" v-for="(filter, ind) in ffilter" :key="ind">
                <div class="p-float-label" v-if="filter.type == 'dropdown'">
                  <Dropdown v-model="report[ind]" :options="filter.values" optionLabel="name" optionValue="id" :placeholder="filter.placeholder"></Dropdown>
                  <label for="">{{ filter.placeholder }}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="buttons-container">
            <button type="submit" class="dart-btn dart-btn-primary" :class="{ 'dart-btn-loading': loading }" :disabled="loading">Сгенерировать отчет</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="profile">
    <v-table
      :items_data="getreports.items"
      :total="getreports.total"
      :pagination_items_per_page="this.pagination_items_per_page"
      :pagination_offset="this.pagination_offset"
      :page="this.page"
      :table_data="this.table_data"
      :filters="this.filters"
      title="Отчеты"
      @filter="filter"
      @sort="filter"
      @paginate="paginate"
      @deleteElem="deleteReport"
    >
      <template v-slot:button>
        <button @click="reload()" class="dart-btn dart-btn-primary" :class="{ 'dart-btn-loading': reloading }" :disabled="reloading">Обновить</button>
      </template>
    </v-table>
    <div class="panel_widget panel_widget_organization">
      <span class="panel_widget_organization__title">Отчеты</span>
      <ul class="panel_widget_organization__menu">
        <li><router-link :to="{ name: 'org_reports_topsales', params: { id: $route.params.id }}">Топы продаж</router-link></li>
        <li><router-link :to="{ name: 'org_reports_available', params: { id: $route.params.id }}">Наличие товара</router-link></li>
        <li><router-link :to="{ name: 'org_reports_present', params: { id: $route.params.id }}">План по первичной передставленности</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Axios from 'axios'
import router from '@/router'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import Dropdown from 'primevue/dropdown'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import vTable from '@/components/table/v-table'

export default {
  name: 'ReportsMain',
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
          name: 'Тип отчета',
          placeholder: 'Тип отчета',
          type: 'dropdown',
          values: this.reportTypes
        }
      },
      table_data: {
        name: {
          label: 'Наименование отчета',
          type: 'link',
          link_to: 'org_reports_page',
          link_params: {
            id: this.$route.params.id,
            report_id: 'id'
          },
          sort: true
        },
        type: {
          label: 'Тип отчета',
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
        createdon: {
          label: 'Дата генерации',
          type: 'text',
          sort: false
        },
        updatedon: {
          label: 'Дата обновления',
          type: 'text',
          sort: false
        },
        status: {
          label: 'Статус',
          type: 'text',
          sort: false
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
      report: {
        name: '',
        date_from: '',
        date_to: '',
        type: ''
      },
      dates: {
        minDateFrom: '',
        maxDateFrom: new Date(),
        minDateTo: '',
        maxDateTo: new Date()
      },
      reportTypes: [
        { name: 'Топы продаж', code: '1' },
        { name: 'План по первичной представленности', code: '2' },
        { name: 'Соблюдение РРЦ', code: '3' },
        { name: 'Понедельный отчет по продажам', code: '4' }
      ],
      addictedParams: {
        2: [{
          matrix: {
            name: 'Матрица',
            placeholder: 'Выберите матрицу товаров',
            type: 'dropdown',
            values: this.getmatrix
          }
        }],
        3: [{
          brand: {
            name: 'Бренд',
            placeholder: 'Выберите бренд',
            type: 'dropdown',
            values: this.getbrands
          }
        }],
        4: [{
          matrix: {
            name: 'Матрица',
            placeholder: 'Выберите матрицу товаров',
            type: 'dropdown',
            values: this.getmatrix
          }
        }]
      }
    }
  },
  components: { vTable, InputText, Calendar, Dropdown, Toast, ConfirmDialog },
  computed: {
    ...mapGetters([
      'getmatrixes',
      'getbrands',
      'getreports'
    ])
  },
  mounted () {
    this.get_reports_from_api({
      report_id: 0,
      page: this.page,
      perpage: this.pagination_items_per_page
    })
    this.get_matrixes_from_api()
    this.get_brands_from_api()
  },
  unmounted () {
    // очищаем репорт
    this.unset_reports_data()
  },
  methods: {
    ...mapActions([
      'get_reports_from_api',
      'get_matrixes_from_api',
      'get_brands_from_api',
      'set_report_to_api',
      'unset_reports_data'
    ]),
    reload () {
      this.reloading = true
      this.unset_reports_data()
      this.$load(async () => {
        this.get_reports_from_api({
          report_id: 0,
          page: this.page,
          perpage: this.pagination_items_per_page
        })
          .then((result) => {
            this.reloading = false
          })
          .catch((result) => {
            console.log(result)
          })
      })
    },
    setMinToDate () {
      this.dates.minDateTo = this.report.date_from
    },
    setMaxFromDate () {
      this.dates.maxDateFrom = this.report.date_to
    },
    deleteReport (data) {
      console.log(data)
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить отчет ' + data.name + '?',
        header: 'Подтверждение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.unset_reports_data()
          // отправление AJAX
          return Axios('/rest/front_deleteobject', {
            method: 'POST',
            data: {
              id: router.currentRoute._value.params.id,
              type: 'report',
              report_id: data
            },
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
            .then((response) => {
              this.$toast.add({ severity: 'info', summary: 'Удаление', detail: 'Отчет ' + data.name + ' успешно удален', life: 3000 })
              this.get_reports_from_api({
                report_id: 0,
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
      this.unset_reports_data()
      this.get_reports_from_api(data).then(
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
      this.unset_reports_data()
      this.get_reports_from_api(data).then(
        result => {
          this.loading = false
        },
        error => {
          // alert error
          console.log('Произошла ошибка ' + error)
        }
      )
    },
    formSubmit () {
      this.loading = true
      this.$load(async () => {
        await this.set_report_to_api({
          action: 'set',
          id: router.currentRoute._value.params.id,
          report: this.report
        })
          .then((result) => {
            this.loading = false
            this.get_reports_from_api({
              page: this.page,
              perpage: this.pagination_items_per_page
            })
            // обнуляем форму
            this.report = {
              name: '',
              date_from: '',
              date_to: '',
              type: ''
            }
          })
          .catch((result) => {
            console.log(result)
          })
      })
    }
  },
  watch: {
    getmatrixes: function (newVal, oldVal) {
      for (const key in this.addictedParams) {
        Array.prototype.forEach.call(this.addictedParams[key], item => {
          if (typeof item.matrix !== 'undefined') {
            item.matrix.values = this.getmatrixes
          }
        })
      }
    },
    getbrands: function (newVal, oldVal) {
      for (const key in this.addictedParams) {
        Array.prototype.forEach.call(this.addictedParams[key], item => {
          if (typeof item.brand !== 'undefined') {
            item.brand.values = this.getbrands
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
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
