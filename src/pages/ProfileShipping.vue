<template>
  <div class="block-header">
    <div class="dart-row dart-align-items-center">
      <div class="d-col-md-4">
        <span class="block-header__title">Отгрузки</span>
      </div>
      <div class="d-col-md-8">
        <div class="block-header__buttons">
          <a
            href="#"
            class="dart-btn dart-btn-primary-outline"
            @click.prevent="showShippingModal = true"
          >Добавить отгрузку</a>
          <teleport to="body">
            <custom-modal v-model="showShippingModal" @close="formReset">
              <template v-slot:title>Планирование отгрузки</template>
              <form action="#" @submit.prevent="formSubmit">
                <div class="shipping-form">
                  <div class="dart-form-group" :class="{ error: v$.form.selectedStores.$errors.length }">
                    <label for="">Выберите магазины</label>
                    <AutoComplete
                      v-model="form.selectedStores"
                      :suggestions="form.filteredStores"
                      :multiple="true"
                      :dropdown="true"
                      optionLabel="label"
                      dataKey="value"
                      placeholder='Начните вводить наименование магазина'
                      @complete="searchStore($event)"
                    />
                    <span class="error_desc" v-for="error of v$.form.selectedStores.$errors" :key="error.$uid">
                      {{ error.$message }}
                    </span>
                  </div>
                  <div class="dart-row">
                    <div class="d-col-md-12">
                      <div class="dart-form-group"  :class="{ error: v$.form.timeSelected.repeater.$errors.length }">
                        <label for="">Повторять</label>
                        <Dropdown
                          v-model="form.timeSelected.repeater"
                          :options="form.timeSelect.repeater"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Выберите период повторения"
                        />
                        <span class="error_desc" v-for="error of v$.form.timeSelected.repeater.$errors" :key="error.$uid">
                          {{ error.$message }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="dart-row" v-if="form.timeSelected.repeater != 0">
                    <div class="d-col-md-6" v-if="form.timeSelected.repeater == 'week'">
                      <div class="dart-form-group">
                        <label for="">В следующие дни</label>
                        <MultiSelect
                          v-model="form.timeSelected.days"
                          :options="form.timeSelect.days"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Выберите дни отгрузок"
                        />
                      </div>
                    </div>
                    <div class="d-col-md-6" v-if="form.timeSelected.repeater == 'week'">
                      <div class="dart-form-group">
                        <label for="">Каждую ... неделю</label>
                        <Dropdown
                          v-model="form.timeSelected.weeks"
                          :options="form.timeSelect.weeks"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Выберите неделю"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="dart-form-group"  :class="{ error: v$.form.timeSelected.range.$errors.length }">
                    <label for="">В период</label>
                    <DatePicker
                      :modelValue="form.timeSelected.range"
                      :masks="{ weekdays: 'WW' }"
                      mode="date"
                      is-range
                    >
                      <template v-slot="{ inputValue, inputEvents, isDragging }">
                        <div class="dart-row">
                          <div class="d-col-md-6">
                            <input
                              class="dart-form-control"
                              :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                              :value="inputValue.start"
                              v-on="inputEvents.start"
                            />
                          </div>
                          <div class="d-col-md-6">
                            <input
                              class="dart-form-control"
                              :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                              :value="inputValue.end"
                              v-on="inputEvents.end"
                            />
                          </div>
                        </div>
                      </template>
                    </DatePicker>
                    <span class="error_desc" v-for="error of v$.form.timeSelected.range.$errors" :key="error.$uid">
                      {{ error.$message }}
                    </span>
                  </div>
                </div>
                <button class="dart-btn dart-btn-primary dart-btn-block dart-mt-1" type="submit">ДОБАВИТЬ ОТГРУЗКУ</button>
              </form>
            </custom-modal>
          </teleport>
        </div>
      </div>
    </div>
  </div>
  <div class="dart-row">
    <div class="d-col-md-8">
      <Calendar
        is-expanded
        title-position="left"
        :attributes="attributes"
        :masks="{ weekdays: 'WW' }"
        :modelValue="checkDate"
        @dayclick='dayClicked'
      />
    </div>
    <div class="d-col-md-12 dart-mt-2">
      <div class="profile-content b-wrap">
        <div class="products">
          <v-table
            :filters="this.filters"
            :items_data="shipping.shipment"
            :total="shipping.total"
            :pagination_items_per_page="this.pagination_items_per_page"
            :pagination_offset="this.pagination_offset"
            :page="this.page"
            :table_data="this.table_data"
            :editMode="this.editMode"
            title="Отгрузки"
            @filter="filter"
            @setAllCheck="setAll"
            @sort="filter"
            @paginate="paginate"
            @clickElem="clickElem"
            @checkElem="checkElem"
          >
            <template v-slot:button>
              <div v-if="editMode">
                <button class="dart-btn dart-btn-secondary" @click="toggleEditMode()">Отменить</button>
              </div>
              <div v-else>
                <button class="dart-btn dart-btn-primary" type="submit" @click="toggleEditMode()">Редактировать</button>
              </div>
            </template>
          </v-table>
        </div>
      </div>
    </div>
  </div>
  <teleport to="body">
    <custom-modal v-model="showShipModal" @close="closeShipModal" class="plan-modal">
      <template v-slot:title>Отгрузка товаров магазина {{ modal.store_name }} на {{ modal.store_date }}</template>
      <div>
        <v-table
          :items_data="getshipdata.items"
          :total="getshipdata.total"
          :pagination_items_per_page="this.pagination_items_per_page"
          :pagination_offset="this.pagination_offset"
          :page="this.ship_page"
          :table_data="this.table_modal_data"
          @paginate="paginateModal"
        />
      </div>
    </custom-modal>
  </teleport>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@/utils/i18n-validators'
import router from '@/router'
import AutoComplete from 'primevue/autocomplete'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import { Calendar, DatePicker } from 'v-calendar'
import customModal from '@/components/popup/CustomModal'
import vTable from '../components/table/v-table'
import 'v-calendar/dist/style.css'

export default {
  name: 'ProfileShipping',
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
      editMode: false,
      showShipModal: false,
      modal: {
        store_name: '',
        store_date: ''
      },
      checkDate: null,
      shipping_values: {},
      form: {
        loading: false,
        selectedStores: null,
        filteredStores: null,
        filter: '',
        timeSelect: {
          repeater: [{
            label: 'Не повторять',
            value: 0
          }, {
            label: 'Ежедневно',
            value: 'day'
          }, {
            label: 'Еженедельно',
            value: 'week'
          }],
          weeks: [{
            label: '1',
            value: 1
          }, {
            label: '2',
            value: 2
          }, {
            label: '3',
            value: 3
          }, {
            label: '4',
            value: 4
          }],
          days: [{
            label: 'Пн',
            value: 1
          }, {
            label: 'Вт',
            value: 2
          }, {
            label: 'Ср',
            value: 3
          }, {
            label: 'Чт',
            value: 4
          }, {
            label: 'Пт',
            value: 5
          }, {
            label: 'Сб',
            value: 6
          }, {
            label: 'Вс',
            value: 7
          }]
        },
        timeSelected: {
          repeater: null,
          weeks: null,
          days: null,
          range: null
        }
      },
      selectedDay: null,
      page: 1,
      ship_page: 1,
      table_modal_data: {
        image: {
          label: '',
          type: 'image'
        },
        name: {
          label: 'Товар',
          type: 'text'
        },
        count: {
          label: 'Кол-во',
          type: 'text'
        },
        price: {
          label: 'Цена',
          type: 'text'
        }
      },
      table_data: {
        check: {
          label: '',
          checked: false,
          type: 'editmode'
        },
        date: {
          label: 'Дата',
          type: 'text'
        },
        store_name: {
          label: 'Дилер',
          type: 'clickevent'
        },
        city_name: {
          label: 'Город',
          type: 'text'
        },
        weight: {
          label: 'Объем товаров, кг',
          type: 'text'
        },
        count: {
          label: 'Кол-во товаров, шт',
          type: 'text'
        },
        status: {
          label: 'Статус',
          type: 'status'
        }
      },
      filters: {
        region: {
          name: 'Регион',
          placeholder: 'Выберите регион',
          type: 'tree',
          values: this.getregions
        },
        store: {
          name: 'Магазин',
          type: 'dropdown',
          optionLabel: 'label',
          optionValue: 'value',
          placeholder: 'Магазин',
          values: []
        },
        range: {
          name: 'Временной промежуток',
          placeholder: 'Выберите даты',
          range: 'all',
          type: 'range'
        },
        status: {
          name: 'Статус',
          type: 'dropdown',
          optionLabel: 'name',
          optionValue: 'id',
          placeholder: 'Статус',
          values: this.shipping_statuses
        }
      },
      attributes: [
        {
          key: 'today',
          highlight: 'red',
          dates: new Date()
        }
        // this.shipping.dates
      ],
      showShippingModal: false
    }
  },
  methods: {
    ...mapActions([
      'get_shipping_from_api',
      'set_shipping_to_api',
      'get_regions_from_api',
      'get_shipping_statuses',
      'get_ship_data_api',
      'unset_ship_data'
    ]),
    ...mapMutations([
      'SET_SHIPPING_CHECK',
      'SET_SHIPPING_CHECK_ONE'
    ]),
    checkElem (data) {
      this.SET_SHIPPING_CHECK_ONE(data, { root: true })
    },
    toggleEditMode () {
      this.editMode = !this.editMode
    },
    setAll (data) {
      this.SET_SHIPPING_CHECK(data, { root: true })
    },
    searchStore (event) {
      this.$load(async () => {
        const data = await this.$api.getStores.get({
          filter: event.query,
          stores: this.form.selectedStores,
          id: router.currentRoute._value.params.id,
          type: router.currentRoute._value.params.type
        })
        this.form.filteredStores = data.data.data.stores
      })
    },
    async formSubmit (event) {
      const result = await this.v$.$validate()
      if (!result) {
        console.log(result)
      } else {
        this.$load(async () => {
          await this.set_shipping_to_api({
            action: 'set',
            id: router.currentRoute._value.params.id,
            type: router.currentRoute._value.params.type,
            timing: this.form.timeSelected,
            stores: this.form.selectedStores
          })
          this.attributes.pop()
          this.attributes.push(this.shipping.dates)
          this.showShippingModal = false
          this.formReset()
        })
      }
    },
    clickElem (data) {
      console.log(data)
      this.get_ship_data_api({
        shipid: data.id,
        page: this.ship_page,
        perpage: this.pagination_items_per_page
      })
      this.modal.store_name = data.dilers
      this.modal.store_date = data.date
      this.showShipModal = true
    },
    closeShipModal () {
      this.modal.store_name = ''
      this.modal.store_date = ''
      this.unset_ship_data()
    },
    formReset () {
      this.form.timeSelected.repeater = null
      this.form.timeSelected.weeks = null
      this.form.timeSelected.days = null
      this.form.timeSelected.range = null
      this.form.selectedStores = null
    },
    dayClicked (day) {
      this.form.timeSelected.range = {
        start: day,
        end: day
      }
      this.showShippingModal = true
    },
    filter (data) {
      console.log(data)
      if (typeof data.filtersdata !== 'undefined') {
        if (typeof data.filtersdata.range !== 'undefined' && data.filtersdata.range !== null) {
          data.filtersdata.dates = []
          if (data.filtersdata.range[0]) {
            const d = data.filtersdata.range[0]
            data.filtersdata.dates.push(d.toDateString())
          }
          if (data.filtersdata.range[1]) {
            const d = data.filtersdata.range[1]
            data.filtersdata.dates.push(d.toDateString())
          }
        }
        if (typeof data.filtersdata.status === 'undefined' && data.filtersdata.status === null) {
          data.filtersdata.status = 0
        }
      }
      // console.log(data)
      this.loading = true
      this.get_shipping_from_api(data).then(
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
      this.get_shipping_from_api(data).then(
        result => {
          this.loading = false
        },
        error => {
          // alert error
          console.log('Произошла ошибка ' + error)
        }
      )
    },
    paginateModal (data) {
      this.loading = true
      this.ship_page = data.page
      this.get_ship_data_api(data).then(
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
  mounted () {
    this.$load(async () => {
      await this.get_shipping_from_api({ filter: [] })
      this.attributes.push(this.shipping.dates)
    })
    this.$load(async () => {
      const data = await this.$api.getStores.get({
        id: router.currentRoute._value.params.id,
        type: router.currentRoute._value.params.type
      })
      this.form.filteredStores = data.data.data.stores
      this.filters.store.values = data.data.data.stores
    })
    this.get_regions_from_api().then(
      // this.filters.region.values = this.getregions
    )
    this.get_shipping_statuses().then(
      // this.filters.status.values = this.shipping_statuses
    )
  },
  components: {
    Dropdown,
    MultiSelect,
    AutoComplete,
    Calendar,
    DatePicker,
    customModal,
    vTable
  },
  computed: {
    ...mapGetters([
      'shipping',
      'getregions',
      'shipping_statuses',
      'getshipdata'
    ])
  },
  setup () {
    return { v$: useVuelidate() }
  },
  validations () {
    return {
      form: {
        timeSelected: {
          range: { required },
          repeater: { required }
        },
        selectedStores: { required }
      }
    }
  },
  watch: {
    getregions: function (newVal, oldVal) {
      this.filters.region.values = newVal
    },
    shipping_statuses: function (newVal, oldVal) {
      this.filters.status.values = newVal
    },
    shipping: function (newVal, oldVal) {
      this.shipping_values = newVal
    }
  }
}
</script>

<style lang="scss">
.vc-container{
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}
.shipping-form{
  overflow: hidden;
}
.dart-form-group{
  display: flex;
  flex-wrap: wrap;
  &.error{
    .p-inputwrapper,
    .dart-form-control{
      border: 1px solid #f00;
      border-radius: 6px;
      .p-inputtext{
        border: none;
      }
    }
    span.error_desc{
      color: #e24c4c;
      font-size: 12px
    }
  }
  & > *{
    width: 100%;
  }
  .p-autocomplete{
    flex: 0 0 100%;
  }
  label{
    display: block;
    margin-bottom: 5px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: 0.25px;
    color: #ADADAD;
  }
}
.p-autocomplete {
    width: 100%;
    display: flex;
}
.p-dropdown{
  width: 100%;
}
.p-multiselect .p-multiselect-label,
.p-inputtext,
.p-autocomplete .p-autocomplete-multiple-container{
  padding: 10px 15px !important;
}
.p-autocomplete .p-autocomplete-multiple-container .p-autocomplete-input-token{
  padding: 0 !important;
}
.p-autocomplete .p-autocomplete-multiple-container{
  width: 100%;
}
.p-component{
  font-size: 14px !important;
  line-height: 106%;
}
.profile-content{
  margin-bottom: 30px;
}
</style>
