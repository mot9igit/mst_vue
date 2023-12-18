<template>
  <div class="participants mt-5">
    <div class="">
      <v-table
        :items_data="bonus_participants.items"
        :total="bonus_participants.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        :filters="this.filters"
        title="Участники программы"
        @filter="filter"
        @sort="filter"
        @paginate="paginate"
        @deleteElem="deleteParticipant"
        @approveElem="approveParticipant"
        @disapproveElem="disapproveParticipant"
      >
      </v-table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from '../table/v-table'
import Axios from 'axios'
import router from '@/router'

export default {
  name: 'bonusParticipants',
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
      loading: true,
      page: 1,
      filters: {
        filter: {
          name: 'Наименование',
          placeholder: 'Наименование',
          type: 'text'
        },
        date: {
          name: 'Выберите период',
          placeholder: 'Выберите период',
          type: 'range'
        }
      },
      table_data: {
        name: {
          label: 'Наименование',
          type: 'text',
          sort: true
        },
        date: {
          label: 'Дата присоединения',
          type: 'text',
          sort: true
        },
        status: {
          label: 'Статус',
          type: 'status',
          sort: true
        },
        actions: {
          label: 'Действия',
          type: 'actions',
          sort: false,
          available: {
            approve: {
              icon: 'pi pi-check',
              label: 'Одобрить заявку',
              link: 'status',
              link_values: [1, 3]
            },
            disapprove: {
              icon: 'pi pi-times',
              label: 'Отклонить заявку',
              link: 'status',
              link_values: [1, 2]
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
      'get_bonus_participants_from_api',
      'unset_bonus_participants'
    ]),
    filter (data) {
      this.loading = true
      this.unset_bonus_participants()
      this.get_bonus_participants_from_api(data).then(
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
      this.unset_bonus_participants()
      this.get_bonus_participants_from_api(data).then(
        result => {
          this.loading = false
        },
        error => {
          // alert error
          console.log('Произошла ошибка ' + error)
        }
      )
    },
    approveParticipant (data) {
      this.$confirm.require({
        message: 'Вы уверены, что хотите одобрить заявку участника ' + data.name + '?',
        header: 'Подтверждение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.unset_bonus_participants()
          // отправление AJAX
          return Axios('/rest/front_changeobject', {
            method: 'POST',
            data: {
              id: router.currentRoute._value.params.id,
              type: 'bonus_participants',
              action: 'approve',
              bonus_id: router.currentRoute._value.params.bonus_id,
              store: data
            },
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
            .then((response) => {
              this.$toast.add({ severity: 'info', summary: 'Одобрение заявки', detail: 'Заявка участника ' + data.name + ' успешно одобрена', life: 3000 })
              this.get_bonus_participants_from_api({
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
          this.$toast.add({ severity: 'error', summary: 'Одобрение заявки', detail: 'Одобрение заявки отклонено', life: 3000 })
        }
      })
    },
    disapproveParticipant (data) {
      this.$confirm.require({
        message: 'Вы уверены, что хотите отклонить заявку участника ' + data.name + '?',
        header: 'Подтверждение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.unset_bonus_participants()
          // отправление AJAX
          return Axios('/rest/front_changeobject', {
            method: 'POST',
            data: {
              id: router.currentRoute._value.params.id,
              type: 'bonus_participants',
              action: 'disapprove',
              bonus_id: router.currentRoute._value.params.bonus_id,
              store: data
            },
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
            .then((response) => {
              this.$toast.add({ severity: 'info', summary: 'Отклонение заявки', detail: 'Заявка участника ' + data.name + ' успешно отклонена', life: 3000 })
              this.get_bonus_participants_from_api({
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
          this.$toast.add({ severity: 'error', summary: 'Отклонение заявки', detail: 'Отклонение заявки отклонено', life: 3000 })
        }
      })
    },
    deleteParticipant (data) {
      this.$confirm.require({
        message: 'Вы уверены, что хотите удалить участника ' + data.name + ' из программы?',
        header: 'Подтверждение',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.unset_bonus_participants()
          // отправление AJAX
          return Axios('/rest/front_deleteobject', {
            method: 'POST',
            data: {
              id: router.currentRoute._value.params.id,
              type: 'bonus_participants',
              bonus_id: router.currentRoute._value.params.bonus_id,
              store: data
            },
            headers: {
              'Access-Control-Allow-Origin': '*'
            }
          })
            .then((response) => {
              this.$toast.add({ severity: 'info', summary: 'Удаление', detail: 'Участник ' + data.name + ' успешно удален', life: 3000 })
              this.get_bonus_participants_from_api({
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
    this.get_bonus_participants_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    })
  },
  components: { vTable },
  computed: {
    ...mapGetters([
      'bonus_participants'
    ])
  }
}
</script>
<style lang="scss">
</style>
