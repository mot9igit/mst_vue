<template>
  <div class="to__up">
    <router-link :to="{ name: 'org_bonuses', params: { id: $route.params.id } }">
      <mdicon name="arrow-left" />
      <span>Назад к программам</span>
    </router-link>
  </div>
  <Toast />
  <form @submit.prevent="formSubmit">
    <div class="profile-content__title">
        <span class="title">Добавление программы производителя</span>
        <div class="buttons_container">
          <RouterLink :to="{ name: 'org_bonuses', params: { id: $route.params.id }}" class="dart-btn dart-btn-secondary">Отменить</RouterLink>
          <button type="submit" class="dart-btn dart-btn-primary" :class="{ 'dart-btn-loading': loading }" :disabled="loading">Добавить</button>
        </div>
    </div>
    <div>
      <div class="dart-form-group">
        <label for="name">Наименование</label>
        <input v-model="form.name" type="text" name="name" placeholder="Укажите наименование программы" class="dart-form-control">
      </div>
      <div class="dart-form-group">
        <label for="name">Выберите баннер</label>
        <FileUpload mode="basic" name="banner[]" :url="'/rest/file_upload.php?store_id=' + $route.params.id + '&path=banners'" accept="image/*" :maxFileSize="2000000" @upload="onUpload" :auto="true" chooseLabel="Выбрать" />
        <div class="dart-upload_files">
          <div class="item" v-for="(file, key) in form.files" :key="key">
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
        <Dropdown v-model="form.brand_id" :options="available_brands" filter showClear optionLabel="name" optionValue="id" placeholder="Выберите бренд"></Dropdown>
      </div>
      <div class="dart-form-group">
        <label for="conditions">Условия участия</label>
        <textarea v-model="form.conditions" type="text" name="conditions" placeholder="Укажите условия участия" class="dart-form-control"></textarea>
      </div>
      <div class="dart-form-group">
        <label for="programs">Обязательно участие в программах:</label>
        <MultiSelect v-model="form.trigger_programs" :options="getbonuses.items" optionLabel="name" placeholder="Выберите программы" :maxSelectedLabels="3" class="w-full md:w-20rem" />
      </div>
      <div class="dart-form-group">
        <label for="reward">Вознаграждение</label>
        <textarea v-model="form.reward" type="text" name="reward" placeholder="Укажите вознаграждение" class="dart-form-control"></textarea>
      </div>
      <div class="dart-form-group">
        <div class="flex flex-wrap justify-content-start gap-3">
          <div class="flex dart-align-items-center">
              <Checkbox v-model="form.fstores" name="stores" value="1" :binary="1"/>
              <label class="ml-2"> Доступна для розницы </label>
          </div>
          <div class="flex align-items-center">
              <Checkbox v-model="form.fwarehouses" name="warehouses" value="1" :binary="1"/>
              <label class="ml-2"> Доступна для опта </label>
          </div>
          <div class="flex align-items-center">
            <Checkbox v-model="form.auto" name="auto" value="1" :binary="1"/>
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
        <PickList v-model="available_stores.items" :selection="form.stores" listStyle="height:342px" dataKey='id' :showSourceControls="false" :showTargetControls="false"
        @update:selection="saveData(data)">
          <template #sourceheader>
            <div class="source_list">
              <span>Доступные</span>
              <div class="filter">
                <div class="form_input_group input_pl input-parent required">
                  <input
                  type="text"
                  id="filter_name"
                  placeholder="Наименование"
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
</template>

<script>
import { toRaw } from 'vue'
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
import Checkbox from 'primevue/checkbox'
import Calendar from 'primevue/calendar'
import PickList from 'primevue/picklist'
import Dropdown from 'primevue/dropdown'
import Toast from 'primevue/toast'
import MultiSelect from 'primevue/multiselect'
import TreeSelect from 'primevue/treeselect'
import FileUpload from 'primevue/fileupload'

export default {
  name: 'ProfileBonusAdd',
  props: { },
  data () {
    return {
      loading: false,
      filter: '',
      region: [],
      selected: [],
      form: {
        files: []
      }
    }
  },
  methods: {
    ...mapActions([
      'get_available_stores_from_api',
      'get_available_brands_from_api',
      'get_regions_from_api',
      'set_bonus_to_api',
      'get_bonuses_from_api'
    ]),
    setFilter () {
      if (this.filter.length > 2 || this.filter.length === 0) {
        setTimeout(() => {
          const data = { filter: this.filter, selected: this.selected }
          this.get_available_stores_from_api(data)
        })
      }
    },
    saveData () {
      this.selected = this.available_stores.items[1]
    },
    formSubmit (event) {
      this.loading = true
      const dates = toRaw(this.form.dates)
      dates[0] = dates[0].toDateString()
      dates[1] = dates[1].toDateString()
      this.$load(async () => {
        await this.set_bonus_to_api({
          action: 'set',
          type: 'bonus',
          id: router.currentRoute._value.params.id,
          brand: this.form.brand_id,
          name: this.form.name,
          stores: this.form.fstores,
          warehouses: this.form.fwarehouses,
          conditions: this.form.conditions,
          auto: this.form.auto,
          trigger_programs: this.form.trigger_programs,
          reward: this.form.reward,
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
    this.get_available_stores_from_api({ filter: '', selected: [] })
    this.get_available_brands_from_api({ type: 'bonuses' })
    this.get_bonuses_from_api({
      our: 1,
      page: this.page,
      perpage: this.pagination_items_per_page
    })
    this.get_regions_from_api()
  },
  components: { MultiSelect, Calendar, Dropdown, PickList, Checkbox, FileUpload, Toast, TreeSelect },
  computed: {
    ...mapGetters([
      'available_stores',
      'available_brands',
      'getbonuses',
      'getregions'
    ])
  }
}
</script>

<style lang="scss">
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
