<template>
  <div>
    <div class="dart-row">
      <div class="d-col-md-6">
        <v-table
          :items_data="getakbpunkts.items"
          :total="getakbpunkts.total"
          :pagination_items_per_page="this.pagination_items_per_page"
          :pagination_offset="this.pagination_offset"
          :page="this.page"
          :table_data="this.table_data"
          title="Торговые точки по месяцам"
          @sort="filter"
          @paginate="paginate"
        >
        </v-table>
      </div>
      <div class="d-col-md-6">
        <div class="profile-content__title"><span class="title">Охват магазинов</span></div>
        <YandexMap  :settings="settings" :coordinates="coords" class="ymap" :zoom="4">
          <YandexClusterer :options="{ preset: 'islands#invertedRedClusterIcons' }">
            <YandexMarker
              v-for="(item, i) in getakbpunkts.all_stores"
              :key="i"
              :coordinates="item.coords"
              :marker-id="`1-marker-${i}`"
            >
              <template #component>
                <div>
                  <span class="title">{{ item.name }}</span>
                  <p><b>Адрес:</b> {{ item.address }}</p>
                </div>
              </template>
            </YandexMarker>
          </YandexClusterer>
        </YandexMap>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { YandexMap, YandexMarker, YandexClusterer } from 'vue-yandex-maps'
import vTable from '@/components/table/v-table'

export default {
  name: 'ReportAkbDots',
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
      coords: [58.006627, 56.227724],
      settings: {
        apiKey: '8a4240ba-5a98-49e5-8880-20d75fa3f9b9',
        lang: 'ru_RU',
        coordorder: 'latlong',
        enterprise: false,
        version: '2.1'
      },
      reloading: false,
      filters: { },
      table_data: {
        month: {
          label: 'Месяц',
          type: 'text',
          sort: false
        },
        stores: {
          label: 'Охваченные торговые точки',
          type: 'text',
          sort: false
        }
      }
    }
  },
  components: { vTable, YandexMap, YandexMarker, YandexClusterer },
  computed: {
    ...mapGetters([
      'getakbpunkts'
    ])
  },
  mounted () {
    this.get_akbpunkts_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    })
  },
  unmounted () {
    // очищаем бонусы
    this.unset_akbpunkts_data()
  },
  methods: {
    ...mapActions([
      'get_akbpunkts_from_api',
      'unset_akbpunkts_data'
    ]),
    filter () {

    },
    paginate (data) {
      this.unset_akbpunkts_data()
      this.get_akbpunkts_from_api(data).then(
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
  watch: { }
}
</script>

<style lang="scss">
  .ymap{
    min-height: 100%;
    position: relative;
    & > div{
      position: relative;
      height: 450px;
    }
    .yandex-balloon{
      min-height: 150px;
      min-width: 150px;
      .title{
        display: block;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 106%;
        text-align: left;
        letter-spacing: 0.25px;
        color: #282828;
        & + p{
          margin-top: 10px;
        }
      }
      p{
        display: block;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 106%;
        text-align: left;
        letter-spacing: 0.25px;
        color: #282828;
      }
    }
  }
</style>
