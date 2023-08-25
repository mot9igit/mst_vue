<template>
  <div class="plannew mt-5">
      <Toast />
      <ConfirmDialog></ConfirmDialog>
      <v-table
        :items_data="bonus_newplans.items"
        :total="bonus_newplans.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        :filters="this.filters"
        title="Планы для новых участников"
        @filter="filter"
        @sort="filter"
        @paginate="paginate"
        @deleteElem="deletePlannew"
      >
        <template v-slot:desc>
          <span class="desc">Для создания нового шаблона для нового участника необходимо удалить или отредактировать уже имеющийся</span>
        </template>
        <template v-slot:button>
          <button class="dart-btn dart-btn-simple" @click.prevent="showNewPlanModal = true" v-if="bonus_newplans.total < 1">Добавить план</button>
          <teleport to="body">
            <custom-modal v-model="showNewPlanModal" @cancel="cancelNewPlan" class="plan-modal">
              <template v-slot:title>Добавление плана нового участника</template>
              <form @submit.prevent="onSubmitNewPlan">
                <div class="plans-form-group">
                  <div class="dart-row">
                    <div class="d-col-md-6">
                      <div class="dart-form-group">
                        <label for="name">Отчет</label>
                        <Dropdown v-model="plannew.form.report" :options="this.reporttypes" showClear optionLabel="name" optionValue="id" placeholder="Выберите отчет" @change="setField"></Dropdown>
                      </div>
                    </div>
                    <div class="d-col-md-6">
                      <div class="dart-form-group">
                        <label for="name">Какой показатель считаем</label>
                        <Dropdown v-model="plannew.form.report_field" :options="this.reporttypesfields" showClear optionLabel="name" optionValue="id" placeholder="Выберите поле"></Dropdown>
                      </div>
                    </div>
                    <div class="d-col-md-6">
                      <div class="dart-form-group">
                        <label for="name">Значение показателя</label>
                        <InputText v-model="plannew.form.report_field_value" placeholder="" />
                      </div>
                    </div>
                    <div class="d-col-md-6" v-for="(item, index) in parameters" :key="index">
                      <div class="dart-form-group" v-if="item.key == 'region'">
                        <label for="name">{{ item.name }}</label>
                        <TreeSelect v-model="plannew.form.params[item.key]" :options="regions" selectionMode="checkbox" :placeholder="item.name" class="w-full"/>
                      </div>
                      <div class="dart-form-group" v-if="item.key == 'matrix'">
                        <label for="name">{{ item.name }}</label>
                        <Dropdown v-model="plan.form.params[item.key]" :options="getmatrixes" optionLabel="name" optionValue="id" :placeholder="item.name"></Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="plans-form-group">
                  <div class="dart-row">
                    <div class="d-col-md-6">
                      <div class="dart-form-group">
                        <label for="name">Наименование плана</label>
                        <InputText v-model="plannew.form.name" placeholder="" />
                      </div>
                    </div>
                    <div class="d-col-md-6">
                      <div class="dart-form-group">
                        <label for="name">Вознаграждение</label>
                        <InputText v-model="plannew.form.reward" placeholder="" />
                      </div>
                    </div>
                    <div class="d-col-md-12">
                      <div class="dart-form-group">
                        <label for="">Комментарий</label>
                        <Textarea v-model="plannew.form.description" rows="3" cols="30" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="plans-form-group">
                  <div class="dart-row">
                    <div class="d-col-md-6">
                      <div class="dart-form-group">
                        <label for="name">Период действия</label>
                        <Calendar v-model="plannew.form.dates" selectionMode="range" placeholder="Выберите диапазон дат" :manualInput="false" showIcon/>
                      </div>
                    </div>
                    <div class="d-col-md-6">
                      <div class="dart-form-group">
                        <label for="name">Отчетный период</label>
                        <Dropdown v-model="plannew.form.regular" :options="this.regular" showClear optionLabel="name" optionValue="id" placeholder="Выберите поле"></Dropdown>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="dart-btn dart-btn-primary dart-btn-block dart-mt-1" type="submit" :class="{ 'dart-btn-loading': loadingNewPlan }" :disabled="loadingNewPlan">Подтвердить</button>
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
import vTable from '../table/v-table'
import customModal from '@/components/popup/CustomModal'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import TreeSelect from 'primevue/treeselect'

export default {
  name: 'bonusPlanNew',
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
      regular: [{
        id: 'dayly',
        name: 'Ежедневно'
      }, {
        id: 'weekly',
        name: 'Еженедельно'
      }, {
        id: 'monthly',
        name: 'Ежемесячно'
      }],
      reporttypesfields: [],
      plannew: {
        form: {
          report: null,
          report_field: null,
          report_field_value: null,
          regular: null,
          name: '',
          reward: '',
          description: '',
          params: { }
        }
      },
      loadingNewPlan: false,
      showNewPlanModal: false,
      page: 1,
      regions: [],
      matrixes: [],
      filters: { },
      table_data: {
        name: {
          label: 'Наименование',
          type: 'text',
          sort: true
        },
        period: {
          label: 'Отчетный период',
          type: 'text',
          sort: true
        },
        date_from: {
          label: 'Начало действия',
          type: 'text',
          sort: true
        },
        date_to: {
          label: 'Конец действия',
          type: 'text',
          sort: true
        },
        report_field_name: {
          label: 'Показатель',
          type: 'text',
          sort: true
        },
        report_type_field_value: {
          label: 'Значение показателя',
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
              label: 'Удалить'
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
      'get_bonus_newplans_from_api',
      'get_reporttypes_from_api',
      'set_plan_to_api',
      'unset_bonus_newplans',
      'get_regions_from_api',
      'get_matrixes_from_api'
    ]),
    setField () {
      let find = false
      this.reporttypes.forEach((element) => {
        if (element.id === this.plannew.form.report) {
          find = 1
          this.reporttypesfields = element.fields
          this.parameters = element.params
        }
      })
      if (!find) {
        this.reporttypesfields = null
        this.parameters = null
      }
    },
    filter (data) {
      this.loading = true
      this.unset_bonus_newplans()
      this.get_bonus_newplans_from_api(data).then(
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
      this.unset_bonus_newplans()
      this.get_bonus_newplans_from_api(data).then(
        result => {
          this.loading = false
        },
        error => {
          // alert error
          console.log('Произошла ошибка ' + error)
        }
      )
    },
    onSubmitNewPlan () {
      this.loadingNewPlan = true
      this.$load(async () => {
        await this.set_plan_to_api({
          action: 'set',
          type: 'plan',
          id: router.currentRoute._value.params.id,
          bonus_id: router.currentRoute._value.params.bonus_id,
          data: this.plannew.form,
          new: true
        })
          .then((result) => {
            this.loadingNewPlan = false
            this.showNewPlanModal = false
            this.get_bonus_newplans_from_api({
              page: this.page,
              perpage: this.pagination_items_per_page
            })
          })
          .catch((result) => {
            console.log(result)
          })
      })
    },
    deletePlannew (data) {
      console.log(data)
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить план ' + data.name + '?',
        header: 'Подтверждение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.unset_bonus_newplans()
          // отправление AJAX
          return Axios('/rest/front_deleteobject', {
            method: 'POST',
            data: {
              id: router.currentRoute._value.params.id,
              type: 'plan',
              plan_id: data
            },
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
            .then((response) => {
              this.$toast.add({ severity: 'info', summary: 'Удаление', detail: 'План ' + data.name + ' успешно удален', life: 3000 })
              this.get_bonus_newplans_from_api({
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
    this.get_bonus_newplans_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    }).then(() => {
      const data = {
        toplan: 1
      }
      this.get_reporttypes_from_api(data)
    })
    this.get_regions_from_api().then(
      this.regions = this.getregions
    )
    this.get_matrixes_from_api().then(
      this.matrixes = this.getmatrixes
    )
  },
  components: { vTable, customModal, InputText, Textarea, Dropdown, Calendar, ConfirmDialog, Toast, TreeSelect },
  computed: {
    ...mapGetters([
      'bonus_newplans',
      'reporttypes',
      'getregions',
      'getmatrixes'
    ])
  }
}
</script>
<style lang="scss">
  .plan-modal form{
    padding: 0 12px;
    label {
      color: #282828;
      margin-bottom: 10px;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 1.3;
      letter-spacing: 0.25px;
    }
  }
  .plans-form-group{
    padding: 24px 0 12px;
    & + .plans-form-group{
      border-top: 1px solid rgba(0, 0, 0, 0.12);
    }
  }
</style>
