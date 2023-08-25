<template>
  <div>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div class="to__up">
      <router-link :to="{ name: 'org_bonuses', params: { id: $route.params.id } }">
        <mdicon name="arrow-left" />
        <span>Назад к программам</span>
      </router-link>
    </div>
    <Toast />
    <div>
      <div class="profile-content__title" v-if="bonus.name">
        <span class="title">Программа {{ bonus.name }}</span>
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
            <div class="program_condition" v-if="bonus.trigger_nocondition">
              <span class="program_condition__title">Доступно для участников программ:</span>
              <ul>
                <li v-for="row in program_trigger" :key="row.id">
                  <RouterLink :to="{ name: 'org_bonus_read', params: { id: $route.params.id, bonus_id: row.id }}" target="_blank" v-if="row.nocondition">
                    {{ row.name }}
                  </RouterLink>
                </li>
              </ul>
            </div>
            <div v-else>
              <div v-if="bonus.auto_accept">
                <button type="submit" class="dart-btn dart-btn-primary" :class="{ 'dart-btn-loading': loading }" :disabled="loading" @click="chellengeAccepted">Присоединиться</button>
              </div>
              <div v-else>
                <button type="submit" class="dart-btn dart-btn-primary" :class="{ 'dart-btn-loading': loading }" :disabled="loading" @click="chellengeAccepted">Подать заявку</button>
              </div>
            </div>
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
        <div class="dart-alert dart-alert-info" v-if="bonus.trigger_nocondition">
          <p>Доступно для участников программ:</p>
          <ul>
            <li v-for="row in program_trigger" :key="row.id">
              <RouterLink :to="{ name: 'org_bonus_read', params: { id: $route.params.id, bonus_id: row.id }}" target="_blank" v-if="row.nocondition">
                {{ row.name }}
              </RouterLink>
            </li>
          </ul>
        </div>
        <div class="dart-fieldset banner" v-if="bonus.banner">
          <img :src="bonus.thumb_big" :alt="bonus.name">
          <div class="banner-desc">
            <div class="vendor">
              <img :src="'https://mst.tools/' + bonus.brand_logo" :alt="bonus.brand">
              <span>{{ bonus.brand }}</span>
            </div>
            <div class="customer">
              <span>Поставщик: {{ bonus.customer }}</span>
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
              <span>Поставщик: </span>
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
import ConfirmDialog from 'primevue/confirmdialog'
import router from '@/router'
import Toast from 'primevue/toast'
import Skeleton from 'primevue/skeleton'

export default {
  name: 'ProfileBonusRead',
  props: { },
  data () {
    return {
      loading: false,
      filter: '',
      selected: [],
      program_trigger: [],
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
    programFilter (item) {
      if (item.nocondition) {
        return true
      }
      return false
    },
    setFilter () {
      if (this.filter.length > 3 || this.filter.length === 0) {
        setTimeout(() => {
          const data = { filter: this.filter, selected: this.selected }
          this.get_available_stores_from_api(data)
        })
      }
    },
    chellengeAccepted () {
      this.$confirm.require({
        message: 'Вы уверены, что хотите присоединиться к программе ' + this.bonus.name + '?',
        header: 'Подтверждение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.loading = false
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
        reject: () => {
          this.$toast.add({ severity: 'error', summary: 'Действие', detail: 'Действие отклонено', life: 3000 })
        }
      })
    }
  },
  mounted () {
    this.get_organization_from_api().then(() => {
      this.get_available_brands_from_api({ type: 'bonuses' })
      this.get_bonus_from_api({ id: router.currentRoute._value.params.bonus_id })
    })
  },
  components: { Toast, Skeleton, ConfirmDialog },
  computed: {
    ...mapGetters([
      'organization',
      'bonus'
    ])
  },
  watch: {
    bonus: function (newVal, oldVal) {
      if (newVal.trigger_nocondition) {
        const programs = newVal.trigger_programs
        this.program_trigger = programs.filter(this.programFilter)
      }
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
  .program_condition{
    position: relative;
    &__title{
      font-weight: bold;
      display: block;
      font-size: 16px;
    }
    ul{
      list-style-type: none;
      padding: 0;
      margin: 0;
      li{
        display: block;
        a{
          display: block;
          text-decoration: none;
          color: #333333;
          padding: 5px 0;
        }
      }
    }
  }
  .buttons_container{
    display: flex;
    align-items: center;
    .dart-btn + .dart-btn {
        margin-left: 5px;
    }
  }
</style>
