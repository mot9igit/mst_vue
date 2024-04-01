<template>
    <div class="navmain">
        <div class="navmain__hand">
            <Link class="navmain__logo" href="#">
                <img src="/logo.svg" alt="Логотип" />
                <span>для бизнеса</span>
            </Link>

            <div class="navmain__search dart-input dart-input-search">
                <div class="navmain__search_btn">
                    <input type="text" placeholder="Найти во всех магазинах" />
                    <a href="/search.html" class="navmain__dart_btn dart-btn dart-btn-primary">Найти</a>
                </div>
            </div>
        </div>

        <a href="#" class="navmain__components_desctop dart-btn">
            <i class="pi pi-sliders-h"></i>
            <b>Сравнение</b>
        </a>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

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
      loading: true
    }
  },
  methods: {
    ...mapActions([
    ])
  },
  mounted () {
  },
  components: { },
  computed: {
    ...mapGetters([
    ])
  }
}
</script>
<style lang="scss">
    .navmain{
        width: 100%;
        height: 80px;
        background: #FFF;
        padding: 0 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__logo{
            display: flex;
            align-items: center;
            text-decoration: none;

            img{
                margin-right: 16px;
                width: 210px;
                height: 80px;
                display: block;
            }
            span{
                color: #8A8A8A;
                font-size: 16px;
                font-weight: 400;
            }
        }

        &__hand{
            display: flex;
            align-items: center;
        }

        &__components_desctop{
            color: #282828;
        }
        &__search{
            display: flex;
            align-items: center;
            // min-width: 400px;
            margin-left: 32px;
            input{
                border-radius: 5px 0 0 5px;
                padding: 13px 44px;
                &:focus{
                    border-right: 0px;
                }
            }

            .dart-btn-primary{
                position: relative;
                left: -5px;
            }
        }

        &__dart_btn{
            position: relative;
            left: -5px;
        }

        &__search_btn{
            display: flex;
            align-items: center;
            position: relative;
            width: 400px;
            transition: width .4s;
        }
    }
</style>
