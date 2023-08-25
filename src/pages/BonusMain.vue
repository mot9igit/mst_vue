<template>
  <div class="profile">
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div>
      <v-bonus
        :items_data="getbonuses.items"
        :total="getbonuses.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        :filters="this.filters"
        title="Доступные программы"
        @filter="filter"
        @sort="filter"
        @paginate="paginate"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import vBonus from '@/components/table/v-bonus'

export default {
  name: 'BonusMain',
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 24
    },
    pagination_offset: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      loading: false,
      reloading: false,
      page: 1
    }
  },
  components: { vBonus, ConfirmDialog, Toast },
  computed: {
    ...mapGetters([
      'organization',
      'getbrands',
      'getbonuses'
    ])
  },
  mounted () {
    this.get_organization_from_api().then(() => {
      this.get_bonuses_from_api({
        page: this.page,
        perpage: this.pagination_items_per_page
      })
    })
  },
  unmounted () {
    // очищаем бонусы
    this.unset_bonuses_data()
  },
  methods: {
    ...mapActions([
      'get_organization_from_api',
      'get_bonuses_from_api',
      'get_brands_from_api',
      'unset_bonuses_data'
    ]),
    filter (data) {
      this.unset_bonuses_data()
      this.get_bonuses_from_api(data).then(
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
      this.unset_bonuses_data()
      this.get_bonuses_from_api(data).then(
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
    getbrands: function (newVal, oldVal) {
      // TODO: add
    }
  }
}
</script>

<style lang="scss">
</style>
