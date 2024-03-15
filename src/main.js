import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { i18n } from './i18n'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import PrimeVue from 'primevue/config'
import AutoComplete from 'primevue/autocomplete'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import VueCookies from 'vue-cookies'

import { setupCalendar } from 'v-calendar'

import ApiPlugin from './plugins/api'
import LoadPlugin from './plugins/load'

import 'primevue/resources/themes/aura-light-green/theme.css'
import '@/assets/styles.scss'

const app = createApp(App)

app.config.globalProperties.site_url = 'https://a.mst.tools/'
app.config.globalProperties.site_url_prefix = 'https://mst.tools/'

app
  .use(i18n)
  .use(store)
  .use(router)
  .use(ApiPlugin)
  .use(LoadPlugin)
  .use(mdiVue, {
    icons: mdijs
  })
  .use(VueCookies, { expires: '7d' })
  .use(setupCalendar, {})
  .use(PrimeVue, {
    ripple: true,
    locale: {
      startsWith: 'Начинается с',
      contains: 'Содержит',
      notContains: 'Не содержит',
      endsWith: 'Заканчивается',
      equals: 'Равно',
      notEquals: 'Не равно',
      noFilter: 'Нет фильтра',
      filter: 'Фильтр',
      lt: 'Меньше чем',
      lte: 'Меньше чем или равно',
      gt: 'Более чем',
      gte: 'Более чем или равно',
      dateIs: 'Дата равна',
      dateIsNot: 'Дата не равна',
      dateBefore: 'Дата до',
      dateAfter: 'Дата после',
      custom: 'Пользовательский',
      clear: 'Очистить',
      apply: 'Принять',
      matchAll: 'Сопоставить все',
      matchAny: 'Совпадение с любым',
      addRule: 'Добавить правило',
      removeRule: 'Удалить правило',
      accept: 'Да',
      reject: 'Нет',
      choose: 'Выбрать',
      upload: 'Загрузить',
      cancel: 'Отмена',
      completed: 'Завершено',
      pending: 'В ожидании',
      dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      dayNamesShort: ['Вск', 'Пнд', 'Втр', 'Срд', 'Чтв', 'Птн', 'Сбт'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      chooseYear: 'Выбрать год',
      chooseMonth: 'Выбрать месяц',
      chooseDate: 'Выбрать дату',
      prevDecade: 'Предыдущее десятилетие',
      nextDecade: 'Следующее десятилетие',
      prevYear: 'Предыдущий год',
      nextYear: 'Следующий год',
      prevMonth: 'Предыдущий месяц',
      nextMonth: 'Следующий месяц',
      prevHour: 'Предыдущий час',
      nextHour: 'Следующий час',
      prevMinute: 'Предыдущая минута',
      nextMinute: 'Следующая минута',
      prevSecond: 'Предыдущая секунда',
      nextSecond: 'Следующая секунда',
      am: 'до полудня',
      pm: 'после полудня',
      today: 'Сегодня',
      weekHeader: 'Нед.',
      firstDayOfWeek: 1,
      dateFormat: 'dd.mm.yy',
      weak: 'Простой',
      medium: 'Нормальный',
      strong: 'Хороший',
      passwordPrompt: 'Введите пароль',
      emptyFilterMessage: 'Результатов не найдено',
      searchMessage: '{0} результатов доступно',
      selectionMessage: '{0} элементов выбрано',
      emptySelectionMessage: 'Нет выбранного элемента',
      emptySearchMessage: 'Результатов не найдено',
      emptyMessage: 'Нет доступных вариантов',
      aria: {
        trueLabel: 'Верно',
        falseLabel: 'Неверно',
        nullLabel: 'Не выбран',
        star: '1 звезда',
        stars: '{star} звёзд',
        selectAll: 'Выбраны все элементы',
        unselectAll: 'Все элементы не выбраны',
        close: 'Закрыть',
        previous: 'Предыдущий',
        next: 'Следующий',
        navigation: 'Навигация',
        scrollTop: 'Прокрутить в начало',
        moveTop: 'Переместить в начало',
        moveUp: 'Переместить вверх',
        moveDown: 'Переместить вниз',
        moveBottom: 'Переместить в конец',
        moveToTarget: 'Переместить в приёмник',
        moveToSource: 'Переместить в источник',
        moveAllToTarget: 'Переместить всё в приёмник',
        moveAllToSource: 'Переместить всё в источник',
        pageLabel: '{page}',
        firstPageLabel: 'Первая страница',
        lastPageLabel: 'Последняя страница',
        nextPageLabel: 'Следующая страница',
        previousPageLabel: 'Предыдущая страница',
        rowsPerPageLabel: 'Строк на странице',
        jumpToPageDropdownLabel: 'Перейти к раскрывающемуся списку страниц',
        jumpToPageInputLabel: 'Перейти к вводу страницы',
        selectRow: 'Выбрана строка',
        unselectRow: 'Строка не выбрана',
        expandRow: 'Строка развёрнута',
        collapseRow: 'Строка свёрнута',
        showFilterMenu: 'Показать меню фильтра',
        hideFilterMenu: 'Скрыть меню фильтра',
        filterOperator: 'Оператор фильтра',
        filterConstraint: 'Ограничение фильтра',
        editRow: 'Редактирование строки',
        saveEdit: 'Сохранить правку',
        cancelEdit: 'Отменить правку',
        listView: 'В виде списка',
        gridView: 'В виде сетки',
        slide: 'Слайд',
        slideNumber: '{slideNumber}',
        zoomImage: 'Увеличить изображение',
        zoomIn: 'Увеличить',
        zoomOut: 'Уменьшить',
        rotateRight: 'Повернуть вправо',
        rotateLeft: 'Повернуть влево'
      }
    }
  })
  .use(ToastService)
  .use(ConfirmationService)
  .component('AutoComplete', AutoComplete)
  .mount('#app')

app.config.globalProperties.$filters = {
  round (value) {
    return value.toFixed(2)
  }
}

PrimeVue.changeTheme('aura-light-green', 'aura-light-green', 'theme-link', () => {})
