<template>
  <div class="profile-content b-wrap">
    <div class="profile-content__title">
        <span class="title">О компании</span>
        <div class="info info-default">
            <i class="d_icon d_icon-clock"></i>
            <span>Подана заявка на изменение реквизитов</span>
        </div>
    </div>
    <form action="#">
        <div class="dart-alert dart-alert-info">Вы можете изменить только данные контактного лица. </div>
        <div class="dart-row">
            <div class="d-col-md-4">
                <div class="form_input_group">
                    <label for="">ФИО (контактного лица)</label>
                    <input type="text" class="dart-form-control" name="contact" value="" placeholder="Иванов Иван Иванович"/>
                </div>
            </div>
            <div class="d-col-md-4">
                <div class="form_input_group">
                    <label for="">Телефон (контактного лица)</label>
                    <input type="text" class="dart-form-control" name="email" value="" placeholder="Иванов Иван Иванович"/>
                </div>
            </div>
            <div class="d-col-md-4">
                <div class="form_input_group">
                    <label for="">E-mail (контактного лица)</label>
                    <input type="text" class="dart-form-control" name="phone" value="" placeholder="Иванов Иван Иванович"/>
                </div>
            </div>
            <div class="d-col-md-4">
                <div class="form_input_group">
                    <label for="">Наименования юридического лица</label>
                    <input type="text" class="dart-form-control" placeholder="ООО Магазин" name="name" value=""/>
                </div>
            </div>
            <div class="d-col-md-4">
                <div class="form_input_group">
                    <label for="">ИНН</label>
                    <input type="text" class="dart-form-control" placeholder="7785612563" name="inn" value=""/>
                </div>
            </div>
            <div class="d-col-md-4">
                <div class="form_input_group">
                    <label for="">ОГРН</label>
                    <input type="text" class="dart-form-control" placeholder="7785612563" name="ogrn" value=""/>
                </div>
            </div>
            <div class="d-col-md-4">
                <div class="form_input_group">
                    <label for="">КПП</label>
                    <input type="text" class="dart-form-control" placeholder="77856125" name="kpp" value=""/>
                </div>
            </div>
            <div class="d-col-md-4">
                <div class="form_input_group">
                    <label for="">Р/C</label>
                    <input type="text" class="dart-form-control" placeholder="7785612544545" name="rs" value=""/>
                </div>
            </div>
            <div class="d-col-md-4">
                <div class="form_input_group">
                    <label for="">Корр/C</label>
                    <input type="text" class="dart-form-control" placeholder="7785612544545" name="ks" value=""/>
                </div>
            </div>
            <div class="d-col-md-4">
                <div class="form_input_group">
                    <label for="">БИК</label>
                    <input type="text" class="dart-form-control" placeholder="12345678" name="bik" value=""/>
                </div>
            </div>
            <div class="d-col-md-4">
                <div class="form_input_group">
                    <label for="">Банк</label>
                    <input type="text" class="dart-form-control" placeholder="ПАО Сбербанк" name="bik" value=""/>
                </div>
            </div>
        </div>
        <div class="buttons_container">
            <button class="dart-btn dart-btn-primary-outline" type="submit">
                <span>Сохранить</span>
            </button>
            <button class="dart-btn dart-btn-secondary alert_change_btn" type="button" data-bs-toggle="modal" data-bs-target="#change_profile_data">
                <span>Запросить изменение данных</span>
            </button>
        </div>
    </form>
</div>
</template>

<script>
export default {
  name: 'ProfileProfile',
  props: { },
  data () {
    return {
      form: {
      }
    }
  },
  methods: {
  },
  mounted () {
  },
  components: { },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
    .buttons_container{
        .dart-btn + .dart-btn {
            margin-left: 5px;
        }
    }
</style>
