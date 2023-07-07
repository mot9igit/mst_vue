<template>
  <div>
    <div class="to__up">
      <router-link :to="{ name: 'org_bonuses', params: { id: $route.params.id } }">
        <mdicon name="arrow-left" />
        <span>Назад к бонусам</span>
      </router-link>
    </div>
    <Toast />
    <div v-if="organization.type === 3">
      <form @submit.prevent="formSubmit">
        <div class="profile-content__title">
            <span class="title">Редактирование ретро-бонуса</span>
            <div class="buttons_container">
              <RouterLink :to="{ name: 'org_bonuses', params: { id: $route.params.id }}" class="dart-btn dart-btn-secondary">Отменить</RouterLink>
              <button type="submit" class="dart-btn dart-btn-primary" :class="{ 'dart-btn-loading': loading }" :disabled="loading">Редактировать</button>
            </div>
        </div>
        <div>
          <div class="dart-form-group">
            <label for="name">Наименование бонуса</label>
            <input v-model="bonus.name" type="text" name="name" placeholder="Укажите название ретро бонуса" class="dart-form-control">
          </div>
          <div class="dart-form-group">
            <label for="name">Выберите баннер</label>
            <FileUpload mode="basic" name="banner[]" :url="'/rest/file_upload.php?store_id=' + $route.params.id + '&path=banners'" accept="image/*" :maxFileSize="2000000" @upload="onUpload" :auto="true" chooseLabel="Выбрать" />
            <div class="dart-upload_files">
              <div class="item" v-for="(file, key) in bonus.files" :key="key">
                <img :src="file.thumb" alt="">
              </div>
            </div>
          </div>
          <div class="dart-form-group">
            <label for="name">Период действия</label>
            <Calendar v-model="bonus.dates" selectionMode="range" placeholder="Выберите диапазон дат" :manualInput="false" showIcon/>
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
            </div>
          </div>
          <div class="dart-form-group picker-wrap">
            <label for="name">Добавление точек продаж, доступных для бонуса</label>
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
    </div>
    <div v-else>
      <div class="profile-content__title" v-if="bonus.name">
        <span class="title">Ретро-бонус {{ bonus.name }}</span>
        <div class="buttons_container">
          <div v-if="bonus.connection">
            <div class="participation-block">
              <div class="participation participation-yes">
                <mdicon name="check" />
                <span>Участие принято</span>
              </div>
            </div>
          </div>
          <div v-else>
            <button type="submit" class="dart-btn dart-btn-primary" :class="{ 'dart-btn-loading': loading }" :disabled="loading" @click="chellengeAccepted">Принять участие</button>
          </div>
        </div>
      </div>
      <div class="profile-content__title" v-else>
        <span class="title">
          <Skeleton width="10rem"></Skeleton>
        </span>
        <div class="buttons_container">
          <Skeleton width="10rem"></Skeleton>
        </div>
      </div>
      <div class="store_bonus" v-if="bonus.name">
        <div class="dart-fieldset banner" v-if="bonus.banner">
          <img :src="bonus.thumb_big" :alt="bonus.name">
          <div class="banner-desc">
            <div class="vendor">
              <img :src="'https://mst.tools/' + bonus.brand_logo" :alt="bonus.brand">
              <span>{{ bonus.brand }}</span>
            </div>
            <div class="customer">
              <span>Поставщик бонуса: {{ bonus.customer }}</span>
            </div>
          </div>
        </div>
        <div class="dart-fieldset">
          <span class="fieldset_label">Даты проведения</span>
          <span class="fieldset_value">{{ bonus.date_from_e }} - {{ bonus.date_to_e }}</span>
        </div>
        <div class="dart-fieldset" v-if="bonus.conditions">
          <span class="fieldset_label">Условия участия</span>
          <span class="fieldset_value">
            <div class="conditions">
              {{ bonus.conditions }}
            </div>
          </span>
        </div>
        <div class="dart-fieldset" v-if="bonus.reward">
          <span class="fieldset_label">Вознаграждение</span>
          <span class="fieldset_value">
            <div class="reward_block">
              <div class="icon">
                <mdicon name="wallet-giftcard" />
              </div>
              <div class="text">
                <span>{{ bonus.reward }}</span>
              </div>
            </div>
          </span>
        </div>
      </div>
      <div class="store_bonus" v-else>
        <div class="dart-fieldset banner">
          <Skeleton width="100%" height="24rem" class="mb-2" borderRadius="16px"></Skeleton>
          <div class="banner-desc">
            <div class="vendor">
              <Skeleton size="3rem" class="mr-2"></Skeleton>
              <span><Skeleton width="2rem"></Skeleton></span>
            </div>
            <div class="customer">
              <span>Поставщик бонуса: </span>
              <span><Skeleton width="2rem" class="ml-2"></Skeleton></span>
            </div>
          </div>
        </div>
        <div class="dart-fieldset">
          <span class="fieldset_label">Даты проведения</span>
          <span class="fieldset_value"><Skeleton width="4rem"></Skeleton></span>
        </div>
        <div class="dart-fieldset" v-if="bonus.conditions">
          <span class="fieldset_label">Условия участия</span>
          <span class="fieldset_value">
            <div class="conditions">
              <Skeleton width="10rem"></Skeleton>
            </div>
          </span>
        </div>
        <div class="dart-fieldset" v-if="bonus.reward">
          <span class="fieldset_label">Вознаграждение</span>
          <span class="fieldset_value">
            <div class="reward_block">
              <div class="icon">
                <mdicon name="wallet-giftcard" />
              </div>
              <div class="text">
                <span><Skeleton width="10rem"></Skeleton></span>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
import Checkbox from 'primevue/checkbox'
import Calendar from 'primevue/calendar'
import PickList from 'primevue/picklist'
import Dropdown from 'primevue/dropdown'
import Toast from 'primevue/toast'
import FileUpload from 'primevue/fileupload'
import Skeleton from 'primevue/skeleton'

export default {
  name: 'ProfileBonusEdit',
  props: { },
  data () {
    return {
      loading: false,
      filter: '',
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
      'get_organization_from_api',
      'get_bonus_from_api',
      'set_bonus_to_api',
      'set_connection_to_api'
    ]),
    setFilter () {
      if (this.filter.length > 3 || this.filter.length === 0) {
        setTimeout(() => {
          const data = { filter: this.filter, selected: this.selected }
          this.get_available_stores_from_api(data)
        })
      }
    },
    saveData () {
      this.selected = this.bonus.stores[1]
    },
    formSubmit (event) {
      this.loading = true
      this.$load(async () => {
        await this.set_bonus_to_api({
          action: 'set',
          type: 'bonus',
          id: router.currentRoute._value.params.id,
          bonus_id: router.currentRoute._value.params.bonus_id,
          name: this.bonus.name,
          stores: this.bonus.fstores,
          warehouses: this.bonus.fwarehouses,
          conditions: this.bonus.conditions,
          reward: this.bonus.reward,
          brand: this.bonus.brand_id,
          files: this.form.files,
          dates: this.bonus.dates,
          store_ids: this.selected
        })
          .then((result) => {
            this.loading = false
            router.push({ name: 'org_bonuses', params: { id: router.currentRoute._value.params.id } })
          })
          .catch((result) => {
            console.log(result)
          })
      })
    },
    chellengeAccepted () {
      this.loading = true
      this.$load(async () => {
        await this.set_connection_to_api({
          action: 'set',
          type: 'bonus_connection',
          id: router.currentRoute._value.params.id,
          bonus_id: router.currentRoute._value.params.bonus_id
        })
          .then((result) => {
            this.loading = false
            this.get_bonus_from_api({ id: router.currentRoute._value.params.bonus_id })
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
      this.get_bonus_from_api({ id: router.currentRoute._value.params.bonus_id })
    })
  },
  components: { Calendar, Dropdown, PickList, Checkbox, FileUpload, Toast, Skeleton },
  computed: {
    ...mapGetters([
      'available_stores',
      'available_brands',
      'organization',
      'bonus'
    ])
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
