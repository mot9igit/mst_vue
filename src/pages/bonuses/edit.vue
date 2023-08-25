<template>
  <div>
    <div class="to__up">
      <router-link :to="{ name: 'org_ourbonuses', params: { id: $route.params.id } }">
        <mdicon name="arrow-left" />
        <span>Назад к программам</span>
      </router-link>
    </div>
    <Toast />
    <div>
      <form @submit.prevent="formEditSubmit">
        <div class="profile-content__title">
            <span class="title">Редактирование программы производителя</span>
            <div class="buttons_container">
              <RouterLink :to="{ name: 'org_bonuses', params: { id: $route.params.id }}" class="dart-btn dart-btn-secondary">Отменить</RouterLink>
              <button type="submit" class="dart-btn dart-btn-primary" :class="{ 'dart-btn-loading': loading }" :disabled="loading">Редактировать</button>
            </div>
        </div>
        <div>
          <div class="dart-form-group">
            <label for="name">Наименование</label>
            <input v-model="bonus.name" type="text" name="name" placeholder="Укажите название программы" class="dart-form-control">
          </div>
          <div class="dart-form-group">
            <label for="name">Выберите баннер</label>
            <FileUpload mode="basic" name="banner[]" :url="'/rest/file_upload.php?store_id=' + $route.params.id + '&path=banners'" accept="image/*" :maxFileSize="2000000" @upload="onUpload" :auto="true" chooseLabel="Выбрать" />
            <div class="dart-upload_files" v-if="form.files.length">
              <div class="item" v-for="(file, key) in form.files" :key="key">
                <img :src="file.thumb" alt="">
              </div>
            </div>
            <div class="dart-upload_files" v-else>
              <div class="item" v-for="(file, key) in bonus.files" :key="key">
                <img :src="file.thumb" alt="">
              </div>
            </div>
          </div>
          <div class="dart-form-group">
            <label for="name">Период действия</label>
            <Calendar v-model="form.dates" selectionMode="range" placeholder="Выберите диапазон дат" :manualInput="false" showIcon dateFormat="dd/mm/yy" modelValue="string"/>
          </div>
          <div class="dart-form-group">
            <label for="name">Бренд</label>
            <Dropdown v-model="bonus.brand_id" :options="available_brands" filter showClear optionLabel="name" optionValue="id" placeholder="Выберите бренд"></Dropdown>
          </div>
          <div class="dart-form-group">
            <label for="conditions">Условия участия</label>
            <textarea v-model="bonus.conditions" type="text" name="conditions" placeholder="Укажите условия участия" class="dart-form-control"></textarea>
          </div>
          <div class="dart-form-group">
            <label for="programs">Обязательно участие в программах:</label>
            <MultiSelect v-model="form.trigger_programs" :options="getbonuses.items" optionLabel="name" placeholder="Выберите программы" :maxSelectedLabels="3" class="w-full md:w-20rem" />
          </div>
          <div class="dart-form-group">
            <label for="reward">Вознаграждение</label>
            <textarea v-model="bonus.reward" type="text" name="reward" placeholder="Укажите вознаграждение" class="dart-form-control"></textarea>
          </div>
          <div class="dart-form-group">
            <div class="flex flex-wrap justify-content-start gap-3">
              <div class="flex dart-align-items-center">
                  <Checkbox v-model="bonus.fstores" name="stores" value="1" :binary="1"/>
                  <label class="ml-2"> Доступен для розницы </label>
              </div>
              <div class="flex align-items-center">
                  <Checkbox v-model="bonus.fwarehouses" name="warehouses" value="1" :binary="1"/>
                  <label class="ml-2"> Доступен для опта </label>
              </div>
              <div class="flex align-items-center">
                <Checkbox v-model="bonus.auto" name="auto" value="1" :binary="1"/>
                <label class="ml-2"> Автоматическое одобрение заявок </label>
              </div>
            </div>
          </div>
          <div class="dart-form-group">
            <label for="regions">Регионы доступности программы</label>
            <TreeSelect v-model="region" :options="this.getregions" selectionMode="checkbox" placeholder="Выберите регион" class="w-full"/>
          </div>
          <div class="dart-form-group picker-wrap">
            <label for="name">Добавление точек продаж, доступных для программы</label>
            <PickList v-model="bonus.stores" :selection="form.stores" listStyle="height:342px" dataKey='id' :showSourceControls="false" :showTargetControls="false"
            @update:selection="saveData(data)">
              <template #sourceheader>
                <div class="source_list">
                  <span>Доступные</span>
                  <div class="filter">
                    <div class="form_input_group input_pl input-parent required">
                      <input
                      type="text"
                      id="filter_name"
                      placeholder="Артикул, наименование"
                      name="filter"
                      class="dart-form-control"
                      v-model="filter"
                      @input="setFilter"
                      @keyup.delete="setFilter"
                      />
                      <label for="product_filter_name" class="s-complex-input__label">Наименование</label>
                      <div class="form_input_group__icon">
                          <i class="d_icon d_icon-search"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template #targetheader> Выбранные </template>
              <template #item="slotProps">
                  <div class="flex flex-wrap p-2 align-items-center gap-3">
                      <div class="flex-1 flex flex-column gap-2">
                          <span class="font-bold">{{ slotProps.item.name }}</span>
                          <span class="article">{{ slotProps.item.address }}</span>
                      </div>
                  </div>
              </template>
            </PickList>
          </div>
        </div>
      </form>
      <bonusFiles></bonusFiles>
      <bonusParticipants></bonusParticipants>
      <planNew></planNew>
      <plan></plan>
    </div>
  </div>
</template>

<script>
import { toRaw } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
import bonusParticipants from '@/components/bonuses/participants'
import bonusFiles from '@/components/bonuses/files'
import planNew from '@/components/bonuses/plannew'
import plan from '@/components/bonuses/plan'
import Checkbox from 'primevue/checkbox'
import Calendar from 'primevue/calendar'
import PickList from 'primevue/picklist'
import Dropdown from 'primevue/dropdown'
import Toast from 'primevue/toast'
import TreeSelect from 'primevue/treeselect'
import MultiSelect from 'primevue/multiselect'
import FileUpload from 'primevue/fileupload'

export default {
  name: 'ProfileBonusEdit',
  props: { },
  data () {
    return {
      loading: false,
      filter: '',
      region: [],
      selected: [],
      form: {
        files: [],
        bonuses: [],
        dates: []
      }
    }
  },
  methods: {
    ...mapActions([
      'get_available_stores_from_api',
      'get_available_brands_from_api',
      'get_organization_from_api',
      'get_regions_from_api',
      'get_bonus_from_api',
      'set_bonus_to_api',
      'set_connection_to_api',
      'get_bonuses_from_api'
    ]),
    setFilter () {
      if (this.filter.length > 2 || this.filter.length === 0) {
        setTimeout(() => {
          const data = { filter: this.filter, selected: this.selected }
          this.get_available_stores_from_api(data).then(() => {
            this.bonus.stores = this.available_stores.items
          })
        })
      }
    },
    saveData () {
      this.selected = this.bonus.stores[1]
    },
    formEditSubmit (event) {
      this.loading = true
      const dates = toRaw(this.form.dates)
      dates[0] = dates[0].toDateString()
      dates[1] = dates[1].toDateString()
      // console.log(dates)
      this.$load(async () => {
        await this.set_bonus_to_api({
          action: 'set',
          type: 'bonus',
          id: router.currentRoute._value.params.id,
          bonus_id: router.currentRoute._value.params.bonus_id,
          name: this.bonus.name,
          stores: this.bonus.fstores,
          warehouses: this.bonus.fwarehouses,
          auto: this.bonus.auto,
          trigger_programs: this.form.trigger_programs,
          conditions: this.bonus.conditions,
          reward: this.bonus.reward,
          brand: this.bonus.brand_id,
          region: this.region,
          files: toRaw(this.form.files),
          available_dates: dates,
          store_ids: toRaw(this.selected)
        })
          .then((result) => {
            this.loading = false
            router.push({ name: 'org_ourbonuses', params: { id: router.currentRoute._value.params.id } })
          })
          .catch((result) => {
            console.log(result)
          })
      })
    },
    onUpload (data) {
      console.log(data.xhr)
      if (data.xhr.response) {
        const response = JSON.parse(data.xhr.response)
        if (Object.prototype.hasOwnProperty.call(response.data, 'files')) {
          // перечень загруженныйх файлов
          this.form.files = response.data.files
        }
      }
      this.$toast.add({ severity: 'info', summary: 'Файлы загружены', detail: 'Файл был успешно загружен', life: 3000 })
    }
  },
  mounted () {
    this.get_organization_from_api().then(() => {
      this.get_available_brands_from_api({ type: 'bonuses' })
      this.get_bonus_from_api({ id: router.currentRoute._value.params.bonus_id }).then(() => {
        this.selected = this.bonus.stores[1]
        console.log(this.bonus.properties)
        if (this.bonus.properties) {
          const props = JSON.parse(this.bonus.properties)
          if (Object.prototype.hasOwnProperty.call(props, 'region')) {
            this.region = props.region
          }
        }
      })
      this.get_bonuses_from_api({
        our: 1,
        simple: 1,
        bonusid: router.currentRoute._value.params.bonus_id,
        page: this.page,
        perpage: this.pagination_items_per_page
      })
    })
    this.get_regions_from_api()
  },
  components: { MultiSelect, bonusParticipants, plan, planNew, bonusFiles, Calendar, Dropdown, PickList, Checkbox, FileUpload, Toast, TreeSelect },
  computed: {
    ...mapGetters([
      'available_stores',
      'available_brands',
      'organization',
      'bonus',
      'getbonuses',
      'getregions'
    ])
  },
  watch: {
    bonus: function (newVal, oldVal) {
      this.form.trigger_programs = newVal.trigger_programs
      this.form.dates = newVal.dates
    }
  }
}
</script>

<style lang="scss">
  .conditions{
    padding: 24px 24px;
    background: #FCFCFC;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: 0.25px;
    color: #282828;
  }
  .store_bonus{
    max-width: 752px;
  }
  .reward_block{
    display: flex;
    align-items: center;
    .icon{
      width: 40px;
      height: 40px;
      border: 1px solid #F9CD31;
      border-radius: 50%;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #F9CD31;
      & + .text{
        padding-left: 15px;
      }
    }
    .text{
      display: block;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 1.3;
      letter-spacing: 0.25px;
      color: #282828;
    }
  }
  .banner-desc{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .vendor,
    .customer{
      display: flex;
      align-items: center;
      img{
        max-height: 50px;
        max-width: 150px;
        & + span{
          padding-left: 10px;
        }
      }
      span{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 1.3;
        letter-spacing: 0.25px;
        color: #ADADAD;
        & + span{
          padding-left: 10px;
        }
      }
    }
  }
  img{
    max-width: 100%;
  }
  .dart-upload_files{
    .item{
      margin: 30px 0;
      img{
        max-width: 300px;
        width: 100%;
      }
    }
  }
  .source_list{
    position: relative;
    z-index: 3;
    .filter{
      position: absolute;
      bottom: -95px;
      left: 0;
      right: 15px;
    }
  }
  .p-checkbox + label{
    margin-bottom: 0;
  }
  .p-picklist .p-picklist-list.p-picklist-source{
    padding-top: 75px !important;
  }
  .dart-form-group{
    max-width: 755px;
    &.picker-wrap{
      max-width: 100%;
    }
  }
  .profile-content__title{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .buttons_container{
    display: flex;
    align-items: center;
    .dart-btn + .dart-btn {
        margin-left: 5px;
    }
  }
</style>
