<template>
    <div class="navmain">
        <div class="navmain__hand">
            <Link class="navmain__logo" href="#">
                <img src="../../src/assets/img/logo_alt.svg" alt="Логотип" />
                <span>для бизнеса</span>
            </Link>

            <div v-if="opt_vendors.selected_count > 0" class="navmain__search a-dart-input a-dart-input-search">
                <form action="#" method="post" @submit.prevent="toSearch()">
                    <div class="navmain__search_btn">
                        <input type="text" placeholder="Найти у выбранных поставщиков" v-model="search"/>
                        <button type="submit" class="navmain__dart_btn a-dart-btn a-dart-btn-primary">Найти</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="a-dart-btn a-dart-btn-secondary kenost-vendors" @click="changeActive">
            <i class="mst-icon mst-icon-my_vendors kenost-vendors__icon"></i>
            <span>{{ this.opt_vendors.selected_count }} из {{this.opt_vendors.available_count}}</span>
            <i class="pi pi-angle-down"></i>
            <div class="kenost-vendors__list">
                <span>Выбранные поставщики</span>
                <div class="kenost-vendors__images">
                    <div class="k-order__actions" v-if="this.opt_vendors.selected_count > 0">
                        <div class="k-actions" v-for="(action) in this.opt_vendors.selected" v-bind:key="action.id">
                            <img class="k-order__actions-el" :src="action.image" >
                        </div>
                    </div>
                    <div class="k-order__actions" v-if="this.opt_vendors.selected_count > 6">
                        <div class="k-actions" v-for="(action, index) in opt_vendors.selected" v-bind:key="action.id">
                            <img v-if="index > 6 && index < 12" class="k-order__actions-el" :src="action.image" >
                        </div>
                    </div>
                    <div class="k-order__actions" v-if="this.opt_vendors.selected_count > 12">
                        <div class="k-actions" v-for="(action, index) in opt_vendors.selected" v-bind:key="action.id">
                            <img v-if="index > 12 && index < 18" class="k-order__actions-el" :src="action.image" >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Vendors @changeActive="changeActive" @vendorCheck="vendorCheck" :vendorModal="this.vendorModal" :items="this.opt_vendors" />

        <!-- <a href="#" class="navmain__components_desctop a-dart-btn">
            <i class="pi pi-sliders-h"></i>
            <b>Сравнение</b>
        </a> -->
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
import Vendors from './opt/Vendors.vue'

export default {
  name: 'Nav',
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
      search: '',
      opt_vendors: [],
      vendorModal: false
    }
  },
  methods: {
    ...mapActions([
      'get_opt_vendors_from_api',
      'get_salses_banners_to_api'
    ]),
    toSearch () {
      router.push({ name: 'opt_search', params: { search: this.search } })
    },
    changeActive () {
      this.vendorModal = !this.vendorModal
    },
    vendorCheck () {
      const data = {
        action: 'get/banners',
        id: router.currentRoute._value.params.id
      }
      this.get_salses_banners_to_api(data)
    }
  },
  mounted () {
    this.get_opt_vendors_from_api().then(
      this.opt_vendors = this.optvendors
    )
  },
  components: { Vendors },
  computed: {
    ...mapGetters([
      'optvendors',
      'salesbanners'
    ])
  },
  watch: {
    optvendors: function (newVal, oldVal) {
      this.opt_vendors = newVal
    }
  }
}
</script>
<style lang="scss">
    .kenost-vendors{
        position: relative;
        &__icon{
            font-size: 24px;
        }

        &:hover{
            .kenost-vendors__list{
                opacity: 1;
                pointer-events: all;
            }
        }

        &__list{
            position: absolute;
            width: 204px;
            padding: 12px;
            border-radius: 5px;
            box-shadow: 0px 0px 12px 0px rgba(51, 51, 51, 0.1490196078);
            top: 55px;
            z-index: 2;
            right: 0;
            background: #FFF;
            opacity: 0;
            pointer-events: none;
            transition: all 0.7s;

            span{
                color: #ACABAB;
                font-size: 12px;
                font-weight: 400;
                width: 100%;
                display: block;
                text-align: left;
            }
        }

        &__images{
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
    }
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

    .a-dart-btn{
        border-radius: 5px;
        padding: 15px 24px;
        text-decoration: none;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 19px;
        transition: all 0.3s;
        display: inline-flex;
        text-align: center;
        align-items: center;
        justify-content: center;
        gap: 8px;
        cursor: pointer;
        border: none;
        .d_icon{
            font-size: 18px;
        }
    }

    .a-d_icon-hover{
        color: var(--secondary-color);
        transition: all 0.3s;

        &:hover{
            color: var(--link-color-hover);
        }
    }

    .a-dart-btn-primary{
        background: var(--primary-color);
        color: var(--white-color);

        &:hover{
            background: var(--primary-hover);
            color: var(--white-color);
        }
    }

    .a-dart-btn-primary-mini{
        font-size: 14px;
        padding: 8px 16px;
        background: var(--primary-color);
        color: var(--white-color);

        &:hover{
            background: var(--primary-hover);
            color: var(--white-color);
        }
    }

    .a-dart-btn-secondary{
        background: var(--white-color);
        color: var(--secondary-color);
        border: 1px solid #E2E2E2;

        &:hover{
            background: var(--btn-secondary-color);
            color: var(--secondary-color);
        }
    }

    .a-dart-btn-secondary-mini{
        font-size: 14px;
        padding: 8px 16px;
        background: var(--white-color);
        color: var(--secondary-color);
        border: 1px solid #E2E2E2;

        &:hover{
            background: var(--btn-secondary-color);
            color: var(--secondary-color);
        }
    }

    .a-dart-btn-choice{
        background: var(--btn-secondary-outline-background);
        justify-content: space-between;

        p{
            color: var(--text-color-dop);
            font-weight: 400;
            font-size: 16px;
            line-height: 16px;
        }
        i{
            color: var(--secondary-color);
            font-size: 24px;
        }

        &:hover{
            background: var(--btn-secondary-outline-hover);
        }
    }

    .a-dart-btn-secondary-outline{
        background: var(--btn-secondary-outline-background);
        color: var(--btn-secondary-outline-color);

        &:hover{
            background: var(--btn-secondary-outline-hover);
            color: var(--btn-secondary-outline-color);
        }
    }

    .a-dart-btn-secondary-outline-mini{
        font-size: 14px;
        padding: 8px 16px;
        background: var(--btn-secondary-outline-background);
        color: var(--btn-secondary-outline-color);

        &:hover{
            background: var(--btn-secondary-outline-hover);
            color: var(--btn-secondary-outline-color);
        }

        .d_icon{
            font-size: 16px;
        }
    }

    .a-dart-btn-icon-list{
        color: var(--secondary-color);
        border: 1px solid var(--border-color);
        background: var(--white-color);
        display: inline-flex;
        align-items: center;
        gap: 8px;

        .d_icon-down-arrow{
            font-size: 12px;
            position: relative;
            top: 2px;
        }

        &:hover{
            color: var(--secondary-color);
            background-color: var(--btn-secondary-color);
        }
    }

    .a-dart-btn-radio{
        padding: 0;
        input{
            display: none;
        }

        label{
            background-color: var(--btn-secondary-outline-background);
            color: var(--secondary-color);
            cursor: pointer;
            padding: 15px 24px;
            border-radius: 5px;

            &:hover{
                background-color: var(--btn-secondary-outline-hover);
            }
        }

        input:checked + label{
            background-color: var(--secondary-color);
            color: var(--white-color);
        }
    }

    .a-dart-btn-radio-mini{
        padding: 0 !important;
        input{
            display: none;
        }

        label{
            background-color: var(--btn-secondary-outline-background);
            color: var(--secondary-color);
            cursor: pointer;
            font-size: 14px;
            padding: 8px 16px;
            border-radius: 5px;

            &:hover{
                background-color: var(--btn-secondary-outline-hover);
            }
        }

        input:checked + label{
            background-color: var(--secondary-color);
            color: var(--white-color);
        }
    }

    .a-dart-input input{
        outline: none;
        border-radius: 5px;
        background: var(--btn-secondary-outline-background);
        transition: all 0.3s;
        color: var(--secondary-color);
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        width: 100%;
    }

    .a-dart-input-search input{
        padding: 14px 44px;
        border: 1px solid transparent;

        &:focus{
            border: 1px solid var(--border-color);
        }
    }

    .a-dart-input-search{
        position: relative;
        &::before{
            content: "\e908";
            position: absolute;
            font-size: 18px;
            font-family: 'primeicons' !important;
            top: 50%;
            transform: translate(0, -50%);
            left: 12px;
            z-index: 3;
            color: #282828;
        }
    }

    .a-dart-input-text input{
        padding: 16px 12px;
        border: 1px solid transparent;

        &:focus{
            border: 1px solid var(--border-color);
        }
    }

    .a-dart-btn-next{
        &:hover{
            background: var(--color-prev-hover);
            filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
            transition: all .3s;
        }
    }

    .a-dart-btn-prev{
        &:hover{
            background: var(--color-prev-hover);
            filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.08));
            transition: all .3s;
        }
    }

    .a-dart-link-all{
        &:hover{
            color: var(--link-color-hover);
            transition: all .3s;
        }
    }

    .a-btn-close{
        cursor: pointer;
        background: var(--color-sitebar-text);
        opacity: 0.3;
        color: var(--white-color) !important;
        width: 24px !important;
        height: 24px !important;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s;
        padding: 0;

        &:hover{
            background: var(--color-sitebar-text);
            opacity: 0.5;
            color: var(--white-color) !important;
        }

        .d_icon{
            font-size: 8px;
        }
    }

    .a-dart-textarea{
        width: 100%;
        background: var(--btn-secondary-outline-background);
        border-radius: 5px;
        padding: 16px 12px;
        transition: all 0.3s;
        color: var(--secondary-color);
        font-size: 16px;
        border: 1px solid transparent;
        outline: none;
        resize: none;

        &:focus{
            border: 1px solid var(--border-color);
        }
    }

</style>
