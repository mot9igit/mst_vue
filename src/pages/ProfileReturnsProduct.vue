<template>
    <div class="d-col-12">
                <div class="return-container return-container_two return-page-two">
                    <div class="d-col-xxl-7 d-col-xl-9 d-col-lg-12 d-col-lg-8 padding-null">
                        <a class="back-button">
                            <div class="back-button__icon d_icon-left-arrow"></div>
                            <span href="#" class="back-button__text">
                              <div class="to__up">
                                <router-link :to="{ name: 'returns_home', params: { id: $route.params.id } }">
                                  <mdicon name="arrow-left" />
                                  <span>Назад к возвратам</span>
                                </router-link>
                              </div>
                            </span>
                        </a>

                        <h3 class="return-container__subtitle">Возврат от {{ this.return_product[0]?.date }}</h3>

                        <div class="back-button back-button_margin">
                            <span href="#" class="back-button__text back-button__text_decoration-none">Заказ {{ this.return_product[0]?.num }}</span>
                        </div>

                        <div class="return-container_display-flex">
                            <table class="return-container__table return-table">
                                <thead class="return-table__thead">
                                    <tr>
                                        <th class="return-table__title return-table_elem-center d-col-xxl-1 d-col-lg-1 d-col-md-2 d-col-sm-3 d-col-4">Фото</th>
                                        <th class="return-table__title return-table_elem-center d-col-xxl-2 d-col-lg-3 d-col-md-4 d-col-sm-6 d-col-8">Наименование</th>
                                        <th class="return-table__title return-table_elem-center d-col-xxl-1 d-col-lg-1 d-col-md-2 d-col-sm-0 return-table__title_mobile-none">Артикул</th>
                                        <th class="return-table__title return-table_elem-center d-col-xxl-1 d-col-lg-1 d-col-md-2 d-col-sm-0 return-table__title_mobile-none">Кол-во</th>
                                        <th class="return-table__title return-table_elem-center d-col-xxl-1 d-col-lg-1 d-col-md-2 d-col-sm-3 d-col-0 return-table__title_mobile-small-none">Цена</th>
                                    </tr>
                                </thead>
                                <tbody class="return-table__tbody table-tbody">
                                    <tr>
                                        <td class="table-tbody__td table-tbody__td_center">
                                            <div class="table-tbody__image table-tbody__image_margin">
                                                <img :src="this.return_product[0]?.image" alt="">
                                            </div>
                                        </td>
                                        <td class="table-tbody__td table-tbody__td_center table-tbody__td_mobile-left">
                                            <div class="table-tbody__info">
                                                <a href="#" class="table-tbody__text table-tbody__text_margin">{{ this.return_product[0]?.pagetitle }}</a>
                                                <div class="table-tbody__article table-tbody__mobile">{{ this.return_product[0]?.article }}</div>
                                                <div class="table-tbody__mobile table-tbody__mobile-small table-tbody_margin-null">{{ this.return_product[0]?.count }} шт.</div>
                                                <div class="table-tbody__mobile table-tbody__mobile-small table-tbody_margin-null">{{ this.return_product[0]?.cost }} р.</div>
                                            </div>
                                        </td>
                                        <td class="table-tbody__td table-tbody__td_center table-tbody__td_mobile-none-small">
                                            <div class="table-tbody__article table-tbody__td_mobile-none">{{ this.return_product[0]?.article }}</div>
                                            <div class="table-tbody__mobile">{{ this.return_product[0]?.count }} шт.</div>
                                            <div class="table-tbody__mobile">{{ this.return_product[0]?.cost }} р.</div>
                                        </td>
                                        <td class="table-tbody__td table-tbody__td_center table-tbody__td_mobile-none">{{ this.return_product[0]?.count }} шт.</td>
                                        <td class="table-tbody__td table-tbody__td_center table-tbody__td_mobile-none">{{ this.return_product[0]?.cost }} р.</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                        <div class="d-col-xxl-8 d-col-xl-10 d-col-lg-10 d-col-md-9 padding-null">
                            <div class="status-menu">
                                <div class="status-menu__title status-menu__title_green-color">Ожидание решения поставщика</div>
                                <div class="status-menu__item">
                                    <span>Сообщения и комментарии от МП</span>
                                    <span>{{ this.return_product[0]?.comments_mp }}</span>
                                </div>
                                <div class="status-menu__item">
                                    <span>Решение</span>
                                    <span>-</span>
                                </div>
                                <div class="status-menu__item">
                                    <span>Необходимые действия</span>
                                    <span>Ожидайте</span>
                                </div>
                                <div class="status-menu__item">
                                    <span>Крайний срок</span>
                                    <span>1 рабочий день</span>
                                </div>
                            </div>

                            <h5 class="h5_margin">Причина возврата</h5>
                            <div class="status-menu">
                                <div class="status-menu__title">Товар ненадлежащего качества</div>
                                <div class="status-menu__item status-menu__item_small-text">
                                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores aspernatur laudantium minus ipsam ut recusandae autem exercitationem deleniti quasi dolore neque ad, aut itaque ab quaerat quia. Excepturi, fugit obcaecati!</span>
                                </div>
                            </div>

                            <h5 class="h5_margin">Фото</h5>
                            <div class="small-photo-gallery">
                                <div class="d-col-xxl-3 d-col-lg-3 d-col-md-3 d-col-sm-3 d-col-3 padding-null">
                                    <a href="/img/products/1.png"><img class="small-photo-gallery__imgage" src="img/products/1.png" alt=""></a>
                                </div>

                                <div class="d-col-xxl-3 d-col-lg-3 d-col-md-3 d-col-sm-3 d-col-3 padding-null">
                                    <a href="/img/products/1.png"><img class="small-photo-gallery__imgage" src="img/products/1.png" alt=""></a>
                                </div>

                                <div class="d-col-xxl-3 d-col-lg-3 d-col-md-3 d-col-sm-3 d-col-3 padding-null">
                                    <a href="/img/products/1.png"><img class="small-photo-gallery__imgage" src="img/products/1.png" alt=""></a>
                                </div>

                                <div class="d-col-xxl-3 d-col-lg-3 d-col-md-3 d-col-sm-3 d-col-3 padding-null">
                                    <a href="/img/products/1.png"><img class="small-photo-gallery__imgage" src="img/products/1.png" alt=""></a>
                                </div>

                                <div class="d-col-xxl-3 d-col-lg-3 d-col-md-3 d-col-sm-3 d-col-3 padding-null">
                                    <a href="/img/products/1.png"><img class="small-photo-gallery__imgage" src="img/products/1.png" alt=""></a>
                                </div>

                                <div class="d-col-xxl-3 d-col-lg-3 d-col-md-3 d-col-sm-3 d-col-3 padding-null">
                                    <a href="/img/products/1.png"><img class="small-photo-gallery__imgage" src="img/products/1.png" alt=""></a>
                                </div>
                            </div>

                            <h5 class="h5_margin">Требование</h5>

                            <div class="status-menu">
                                <div class="status-menu__item status-menu__item_black-color">
                                    <span>Вернуть денежные средства</span>
                                </div>
                            </div>

                            <h5 class="h5_margin">Данные для возврата</h5>

                            <div class="status-menu status-menu_padding-small">
                                <div class="status-menu__item status-menu__item_padding-small">
                                    <span>ФИО</span>
                                    <span>Иванов Иван Иванович</span>
                                </div>
                                <div class="status-menu__item status-menu__item_padding-small">
                                    <span>Наименование банка</span>
                                    <span>Сбербанк</span>
                                </div>
                                <div class="status-menu__item status-menu__item_padding-small">
                                    <span>БИК банка</span>
                                    <span>4566477568</span>
                                </div>
                                <div class="status-menu__item status-menu__item_padding-small">
                                    <span>Корреспондентский счет</span>
                                    <span>4566477568</span>
                                </div>
                                <div class="status-menu__item status-menu__item_padding-small">
                                    <span>Расчетный счет</span>
                                    <span>4566477568</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div>
                        <a href="#" class="dart-btn dart-btn-secondary dart-btn_padding dart-btn_sticky">Отменить</a>
                    </div>
                </div>
            </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProfileReturns',
  props: {},
  data () {
    return {
      showFormModal: false,
      return_product: {}
    }
  },
  methods: {
    ...mapActions([
      'get_returns_from_api'
    ])
  },
  mounted () {
    this.get_returns_from_api().then(
      this.return_product = this.returnproduct
    )
  },
  components: { },
  computed: {
    ...mapGetters([
      'returnproduct'
    ])
  },
  watch: {
    returnproduct: function (newVal, oldVal) {
      this.return_product = newVal
    }
  }
}
</script>
<style lang="scss" scoped>
  .side_menu_profile_info{
    padding: 24px 24px 0;
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;

    img{
        width: 80px;
        height: 80px;
        border-radius: 150px;
        margin-bottom: 16px;
    }

    &_name{
        font-size: 24px;
        color: #282828;
        word-spacing: 100vw;
        border-bottom: 1px rgba(0, 0, 0, 0.12) solid;
        padding-bottom: 24px;
    }
}

.back-button{
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    cursor: pointer;
    color: #ADADAD;

    &:hover .back-button__text{
        text-decoration: none;
    }

    &__icon{
        font-size: 24px;
    }

    &__text{
        text-decoration: underline;
        font-size: 14px;

        &_decoration-none{
            text-decoration: none;
            cursor: auto;
        }
    }

    &_margin{
        margin-bottom: 24px;
    }
}

.return-container{
    &__subtitle{
        margin: 16px 0;
    }

    &__table{
        margin-bottom: 24px;
    }

    &_display-flex{
        display: flex;
        gap: 24px;
    }

    &.return-page-two{
        display: none;
    }

    &_two{
        display: none;
        &.return-page-two{
            display: flex;
            justify-content: space-between;
        }
    }
}

.form-check_margin-25-18{
    margin: 25px 0 18px 0;
}

.return-table{
    border-radius: 5px;
    border-spacing: 0;
    border-collapse: separate;
    // border-radius: 5px 5px 0px 0px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    width: 100%;
    background: #fff;

    &__thead{
        background: #F8F9FA;
        position: relative;
    }

    &__title{
        padding: 24px 16px;
        color: #282828;

        &:nth-last-child(1){
            border-radius: 0px 5px 0px 0px;
        }

        &:nth-child(1){
            border-radius: 5px 0px 0px 0px;
        }
    }

    &_elem-center{
        text-align: center;
    }
}

.table-tbody{
    &__td{
        padding: 24px 0;
        border-top: 1px solid rgba(0, 0, 0, 0.12);

        &_margin-left{
            padding-left: 24px;
            display: flex;
            align-items: center;
        }

        &_center{
            text-align: center;
        }
    }

    &__image{
        width: 87px;
        height: 48px;
        &_margin{
            margin: auto;
        }
    }

    &__text{
        font-size: 14px;
        color: #282828;
        max-width: 300px;
        line-height: normal;
        letter-spacing: 0.15px;

        &_margin{
            margin-bottom: 8px;
        }
    }

    &__article{
        font-size: 14px;
        color: #ADADAD;
    }

    &__mobile{
        display: none;
    }

}

.dart-btn_padding{
    padding: 11px 55px !important;
    height: fit-content;
}

.dart-btn_margin-top{
    margin-top: 25px;
}

.info-frame{
    padding: 24px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: #FFF;
    height: fit-content;

    &__text{
        font-size: 14px;
        color: #ADADAD;
        letter-spacing: 0.25px;
    }

    &_mobile{
        display: none;
        margin-top: 16px;
    }

}

@media only screen and (max-width: 1800px) {
    .info-frame{
        &_desktop{
            display: none;
        }

        &_mobile{
            display: block;
        }
    }
}

.status-menu{
    border-radius: 5px;
    border: 1px solid #E2E2E2;
    background: #FFF;
    padding: 0 0 24px 0;

    &__title{
        padding: 24px 40px;
        font-size: 18px;
        letter-spacing: 0.15px;
        color: #282828;
        position: relative;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);

        &_green-color{
            color: #009821;
        }
    }

    &__item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px 40px 0 40px;

        :nth-child(1){
            color: #ADADAD;
        }

        &_black-color span{
            color: #282828 !important;
        }

        &_small-text{
            font-size: 14px;
            line-height: 130%;
            letter-spacing: 0.5px;
        }

        &_padding-small{
            padding: 16px 40px 0 40px;
        }
    }

    &_padding-small{
        padding: 0 0 16px 0;
    }
}

.h5{
    &_margin{
        margin: 40px 0 16px 0;
    }

    &_margin-bottom-null{
        margin-bottom: 0;
    }
}

.padding-null{
    padding: 0;
}

.margin-null{
    margin: 0 !important;
}

.radio-buttons-list{

    &_position-list{
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    input[type="radio"] {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }
      label:before {
        content: "";
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 0.5em;
        border-radius: 100%;
        vertical-align: -3px;
        border: 2px solid #ADADAD;
        padding: 0.13em;
        background-color: transparent;
        background-clip: content-box;
      }
      label {
        margin-right: 1em;
      }
      input:hover + label:before {
        border-color: #FF0000;
      }
      input:checked + label:before {
        background-color: #FF0000;
        border-color: #FF0000;
      }
}

.textarea-comment{
    border-radius: 5px;
    border: 1px solid #E2E2E2;
    background: #F2F2F2;
    resize: none;
    font-size: 14px;
    padding: 16px;
    line-height: 130%; /* 18.2px */
    letter-spacing: 0.5px;
    outline: none;
    width: 100%;

    &_margin-top-24{
        margin-top: 24px;
    }
}

.small-text-info{
    color: #ADADAD;
    font-size: 14px;
    line-height: 142%;
    letter-spacing: 0.25px;
    margin: 8px 0 16px 0;
}

.loading-photos{
    border: 1px dashed #C8C8C8;
    height: 125px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;

    &__icon-pluse{
        color: #fff;
        font-size: 28px;
        line-height: 1.1;
        background: #282828;
    }

    &__icon-background{
        border-radius: 5px;
        background: #282828;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        overflow: hidden;
        box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2);

    }
}

.dropdown {
  position: relative;
  width: 100%;
}
.dropdown__button {
  position: relative;
  display: block;
  width: 100%;
  text-align: left;
  border-radius: 5px;
  border: 1px solid #E2E2E2;
  background: #FFF;
  padding: 16px;
  font-size: 14px;
  color: #282828;
  cursor: pointer;
  &::before {
    content: "\e922";
        position: absolute;
        font-size: 8px;
        font-family: 'icomoon' !important;
        right: 16px;
    }
}
.dropdown__button:focus, .dropdown__button--active {
  outline: none;
}
.dropdown__list {
  display: none;
  position: absolute;
  left: 0;
  top: 50px;
  margin: 0;
  padding: 0;
  list-style-type: none;
  background: #FFFFFF;
  overflow: hidden;
  border-radius: 6px;
  width: 100%;
  z-index: 1;
}
.dropdown__list--visible {
  display: block;
}
.dropdown__list-item {
  margin: 0;
  padding: 0;
  border: 1px solid #E2E2E2;
  border-bottom: 0px;
  padding: 13px 20px;
  cursor: pointer;
  &:first-child {
    border-radius: 6px 6px 0 0;
  }
  &:last-child {
    border-radius: 0 0 6px 6px;
    border-bottom: 1px solid #7E9BBD;
  }
  &:hover {
    background: rgba(181, 190, 202, 0.26);
  }
}
.dropdown__input-hidden {
  display: none;
}

.form_input_group_list{
    display: flex;
    gap: 16px;
}

.dart-section_dispay{
    display: inline;

    .dart_container{
        padding-bottom: 40px;
    }
}

.dart-btn_sticky{
    position: sticky !important;
    top: 50px;
}

.small-photo-gallery{

    display: flex;
    gap: 16px;
    flex-wrap: wrap;

    &__imgage{
        width: 100%;
        object-fit: cover;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.12);
        // margin-right: 8px;
        background-color: #fff;
    }
}

.dart-btn_cancel-mobile{
    display: none !important;
    margin-left: 16px;
}

.table-tbody{
    &__mobile-small{
        display: none !important;
    }
}

.widget-item{
    padding: 24px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.12);

    &_background-orange{
        background: linear-gradient(90deg, #FF6221 0.12%, #FF3C21 99.85%);
        i{
            color: #FF6221;
        }
    }

    &_background-blue{
        background: linear-gradient(90deg, #008FFF 0.12%, #00A3FF 99.85%);
        i{
            color: #008FFF
        }
    }

    &__icon{
        width: 40px;
        height: 40px;
        border-radius: 80px;
        background-color: #ffffff;
        opacity: 0.4;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: center;

        i{
            font-size: 25px;
        }
    }

    &__title{
        color: #fff;
        font-size: 28px;
        line-height: 106%;
        letter-spacing: 0.5px;
        font-weight: 500;
    }

    &__text{
        color: #fff;
        font-size: 14px;
        line-height: 106%;
        letter-spacing: 0.25px;
        margin: 0;
        margin-top: 16px;
    }
}

.pop-up-window{
    position: fixed;
    right: 40px;
    bottom: 40px;
    z-index: 1;
    display: flex;
    gap: 26px;
    align-items: center;

    &__icon{
        width: 56px;
        height: 56px;
    }

    &__message{
        padding: 16px 24px;
        background: #282828;
        border-radius: 5px;
        min-width: 300px;
        position: relative;

        p{
            color: #FFF;
            font-size: 14px;
            font-weight: 400;
            line-height: 106%;
            letter-spacing: 0.25px;
            margin: 0;
            padding-bottom: 9px;
            position: relative;

            &::before{
                content: "";
                position: absolute;
                height: 1px;
                width: 100%;
                background: #414141;
                bottom: 0;
            }
        }

        &::before{
            content: "";
            width: 26px;
            height: 26px;
            border-radius: 5px;
            background: #282828;
            position: absolute;
            z-index: 1;
            right: -11px;
            top: calc(50% - 13px);
            transform: rotate(45deg);
        }
    }

    &__input{
        width: 100%;
        border: none;
        background: transparent;
        outline: none;
        color: #7B7B7B;
        font-size: 12px;
        line-height: 106%;
        letter-spacing: 0.25px;
        margin-top: 8px;
    }
}

//

.display-flex{
    display: flex;
}

.material_no-icon{
    min-height: unset !important;
    padding: 16px 20px !important;
}

.card-container{
    display: flex;
    // gap: 24px;
    margin-bottom: 100px;
}

.card-image{
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: #FFF;
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    width: auto;
    height: 100%;

    &__text{
        text-align: center;
        margin: 0;
    }
}

.swiper-slide{
    height: initial !important;
}
.swiper-wrapper{
    box-sizing: border-box !important;
}

.model-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    &__text{
        font-size: 25px;
        color: #ADADAD;
        font-weight: 400;
    }

    &__content{
        display: flex;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 24px;
    }
}

.info-with-button{
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: #FFF;
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;

    p{
        margin: 16px 0 36px 0;
        text-align: center;
    }

    b{
        text-align: center;
    }
}

.content-container-chapter{
    &_frame-margin{
        margin: 24px 0 40px 0;
        max-width: 330px;
    }

    &__image{
        // margin-right: 40px;
        max-height: 558px;
        min-height: 500px;

        img{
            height: 100% !important;
            object-fit: cover;
            border-radius: 5px;
            border: 1px solid rgba(0, 0, 0, 0.12);
        }
    }

    &__content{
        width: 100%;
    }

    &__all-plises{
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
    }

    &__block-diagram{
        display: flex;
        align-items: center;
        gap: 50px;

        &_margin{
            margin: 40px 0;
        }
    }

    &__diagram-horisontal{
        display: flex;
        gap: 25px;
    }

    &__block{
        font-size: 16px;
        line-height: 130%;
        letter-spacing: 0.5px;
        padding: 16px;
        color: #282828;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.12);
        background: #FFF;
        max-width: 265px;
        display: flex;
        align-items: center;

        &_right-line{
            position: relative;
            &::before{
                height: 1px;
                // background-image: url(/img/sale/brokenLine.svg);
                background-repeat: repeat-x;
                background-position: center;
                border: none;
                content: "";
                position: absolute;
                width: 150px;
                /* right: 0; */
                transform: translate(-50%, -50%);
                top: 50%;
                right: -100px;
                z-index: -1;
            }
        }

        &_left-line{
            position: relative;
            &::before{
                height: 1px;
                // background-image: url(/img/sale/brokenLine.svg);
                background-repeat: repeat-x;
                background-position: center;
                border: none;
                content: "";
                position: absolute;
                width: 50px;
                /* right: 0; */
                transform: translate(-50%, -50%);
                top: 50%;
                left: 0;
                z-index: -1;
            }
        }

        &_horisontal-line{
            position: relative;

            &::before{
                height: 1px;
                // background-image: url(/img/sale/brokenLine.svg);
                background-repeat: repeat-x;
                background-position: center;
                border: none;
                content: "";
                position: absolute;
                width: calc(50% - 19px);
                transform: translate(-50%, -50%) rotate(90deg);
                top: calc(50% - 8px);
                left: -25px;
                z-index: -1;
            }
        }
    }

    &__mini-brief-info{
        display: flex;
        gap: 8px 24px;
        flex-wrap: wrap;
    }
}

.mini-brief-info{
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    background: #FFF;
    display: flex;
    gap: 8px;
    padding: 8px;
    align-items: center;

    &__text{
        margin: 0;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.25px;
        line-height: 1;
    }

    &__icon{
        font-size: 24px;
    }
}

.mini-pluses{
    display: flex;
    gap: 16px;

    &__text{
        max-width: 190px;
    }

    &__icon{
        width: 40px;
        height: 40px;
        border-radius: 5px;
        background: #282828;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 29px;
    }
}

.sales-form{
    background-color: #282828;
    padding: 40px;

    &__form{
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.12);
        background: #FFF;
        padding: 40px;
    }

    textarea{
        resize: none;
    }

    &__title{
        margin-bottom: 24px;
        margin-top: 0;
    }

    &__input{
        margin-bottom: 16px;
    }

    &__button{
        margin-top: 8px;
    }

}

.action-steps{
    display: flex;
    flex-wrap: wrap;
    gap: 32px;
    padding-left: 50px;

    &__item{
        max-width: 200px;
    }

    &__text{
        color: #FFF;
        font-size: 16px;
        font-weight: 400;
        line-height: 130%;
        letter-spacing: 0.5px;
        margin: 0;
        position: relative;

        &::before{
            content: "";
            width: 1px;
            height: 100%;
            position: absolute;
            background: #575757;
            left: -24px;
        }

        &::after{
            content: "";
            width: 8px;
            height: 8px;
            background: #575757;
            position: absolute;
            left: -27.5px;
            top: 0;
            border-radius: 8px;
        }
    }

    &__number{
        color: #575757;
        font-size: 35px;
        font-weight: 500;
        margin-bottom: 16px;
        line-height: 1;
    }
}

.dart_side_menu_mobile-active{
    display: block !important;
}

.swiper-navigation{
    width: 100%;
    position: absolute;
    top: calc(50% - 48px);
    right: 0;

    .swiper-button-prev{
        width: 48px;
        height: 48px;
        border-radius: 100px;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.12);
        box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;

        &:after{
            color: #282828 !important;
            font-size: 22px !important;
        }
    }
    .swiper-button-next{
        width: 48px;
        height: 48px;
        border-radius: 100px;
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.12);
        box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        &:after{
            color: #282828 !important;
            font-size: 22px !important;
        }
    }

    .swiper-button-disabled{
        display: none !important;
    }
}

@media only screen and (max-width: 1800px) {
    .card-container{
        // gap: 16px;
        // overflow-x: auto;
    }

    .card-image{
        // min-height: 200px;
        padding: 25px 16px;

        // &__text{
        //     font-size: 14px;
        // }

        &__icon{
            width: 58px;
            height: 58px;
        }
    }

    // .content-container-chapter__image{
    //     margin-right: 30px;
    // }

    .content-container-chapter__all-plises{
        gap: 25px 16px;
        margin: 0;
    }

    .mini-pluses__text {
        max-width: 160px;
        font-size: 14px;
    }

    .action-steps{
        padding-left: 40px;

        &__text{
            font-size: 14px;
        }

        &__item {
            max-width: calc(calc(100% / 3) - 30px);
            padding-left: 30px;
        }
    }

}

@media only screen and (max-width: 1200px) {
    .dart-btn_sticky{
        display: none !important;
    }

    .dart-btn_cancel-mobile{
        display: inline-block !important;
    }

    .return-container_display-flex{
        overflow-x: auto;
    }

    .return-table{
        margin-bottom: 0;
    }

    .scroll-attention{
        &::before{
            position: absolute;
            width: 30px;
            height: 100%;
            content: "";
            top: 0;
            z-index: 1;
            background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #a2a2a2 100%);
            right: 12px;
            border-radius: 5px;
            transition: all 0.5s;
            opacity: 1;
            user-select: none;
        }

        &.scroll-right{
            &::before{
                opacity: 0;
                transition: all 0.5s;
            }
        }

    }

    .return-next-page{
        margin-top: 16px;
    }

    .action-steps{
        gap: 10px 30px;
    }

    // .sale-nav-container{
    //     display: flex;
    //     flex-direction: column
    // }

    .content-container-chapter__image {
        max-height: 358px;
        min-height: 400px;
    }

    .mini-pluses{
        gap: 8px;
        &__icon {
            width: 30px;
            height: 30px;
            font-size: 18px;
        }

        &__text{
            max-width: 200px;
        }
    }

    .content-container-chapter__all-plises {
        gap: 10px 16px;
    }

    .content-container-chapter__block{
        padding: 8px;
        font-size: 12px;
    }

    .sales-form__form{
        height: fit-content;
        padding: 26px;
    }

    .action-steps__item {
        max-width: calc(calc(100% / 2) - 20px);
        padding-left: 30px;
    }
}

@media only screen and (max-width: 990px){
    .dart_side_menu_mobile-none{
        display: none !important;
    }
    .table-mibile-width{
        max-width: 1200px !important;
    }

    .content-container-chapter{
        flex-direction: column;
    }

    .content-container-chapter{
        max-height: unset;
        &__image {
            margin: 0;
            margin-bottom: 30px;
            max-height: 350px;
            min-height: 200px;
            width: 100%;
            display: flex;
            align-items: center;
            overflow: hidden;
            object-fit: cover;
            border-radius: 5px;
            border: 1px solid rgba(0, 0, 0, 0.12);

            img{
                width: 100%;
            }
        }
    }

    .mobile-column-reverse{
        flex-direction: column-reverse;
    }

    .content-container-chapter__block{
        padding: 16px;
    }

    .sales-form{
        flex-direction: column;
    }

    .action-steps {
        margin: 40px 0 0 0;
    }

    .card-container{
        margin-bottom: 50px;
    }

    .sales-form,
    .content-container-chapter{
        margin-top: 50px;
    }

    .content-container-chapter__block_horisontal-line::before{
        width: calc(25% + 18px);
    }
    .action-steps__item {
        max-width: calc(calc(100% / 3) - 30px);
        padding-left: 30px;
    }

.swiper-navigation{
    top: calc(50% - 36px);

    .swiper-button-prev{
        width: 36px;
        height: 36px;

        &:after{
            font-size: 18px !important;
        }
    }
    .swiper-button-next{
        width: 36px;
        height: 36px;
        &:after{
            font-size: 18px !important;
        }
    }

}

}

@media only screen and (max-width: 768px){
    .table-tbody{
        &__mobile{
            display: block;
        }

        &__td{
            &_mobile-none{
                display: none;
            }

            &_mobile-left{
                text-align: left;
            }
        }
    }

    .return-table{
        &__title{
            &_mobile-none{
                display: none;
            }
        }
    }

    .card-image {
        // min-width: 300px;
    }

    .model-container__content{
        flex-direction: column;
    }

    .action-steps__item {
        max-width: calc(calc(100% / 2) - 20px);
        padding-left: 30px;
    }
}

@media only screen and (max-width: 600px){
    .table-tbody{
        &__mobile-small{
            display: block !important;
            width: fit-content;
            margin-top: 8px;
        }

        &_margin-null{
            margin-top: 0;
        }

        &__td{
            &_mobile-none-small{
                display: none;
            }
        }
    }

    .return-table{
        &__title{
            &_mobile-small-none{
                display: none;
            }
        }
    }

    .status-menu__item{
        padding: 16px 16px 0 16px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .status-menu__title {
        padding: 24px;
    }

    .form_input_group_list{
        flex-direction: column;
    }

    .dart-btn_padding{
        padding: 11px !important;
    }

    .mini-pluses{
        align-items: center;
        &__text {
            max-width: unset;
            width: 90%;
            margin: 0;
        }
    }

    .content-container-chapter{
        &__all-plises {
            gap: 16px;
        }

        &__block-diagram{
            flex-direction: column;
            gap: 32px;
            margin: 20px 0;

        }

        &__diagram-horisontal{
            flex-direction: column;
            gap: 16px;
        }

        &__block_horisontal-line{
            display: flex;
            gap: 16px;
        }

        &__block {
            padding: 16px;
            width: 100%;
            margin: 0;
        }

        &__block_right-line::before {
            width: 30px;
            transform: translate(-50%, -50%) rotate(90deg);
            top: calc(100% + 4px);
            right: calc(50% - 30px);
            z-index: -1;
        }

        &__block_left-line::before {
            width: 30px;
            transform: translate(-50%, -50%) rotate(90deg);
            top: 0;
            left: 50%;
            z-index: -1;
        }

        .content-container-chapter__block_horisontal-line::before {
            width: 100%;
            transform: translate(-50%, -50%);
            left: 50%;
            top: -15px;
            z-index: -1;
            width: calc(50% + 10px);
        }

        .sales-form{
            padding: 40px 16px;
        }
    }

    .action-steps__item {
        max-width: calc(100% - 30px);
    }
}
</style>
