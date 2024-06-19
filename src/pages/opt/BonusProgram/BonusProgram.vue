<template>
  <div class="" :class="{ loading: loading }">
    <div class="">
      <div class="dart-home dart-window">
        <!-- <Breadcrumbs/> -->
        <div>
          <section class="bonus">
            <h2 class="bonus__title">Бонусная программа</h2>
            <div class="bonus__progress bonus-progress">
              <h3 class="bonus-progress__title">Продажи а вашем магазне</h3>
              <header class="bonus-progress__header">
                <div class="bonus-progress__statistics">
                  <div class="bonus-progress__percent">
                    <div class="bonus-progress__img-container">
                      <img
                        src="../../../assets/img/icons/BonusProgram/progress.svg"
                      />
                    </div>
                    <p class="bonus-progress__title">86%</p>
                  </div>
                  <div class="bonus-progress__sales">
                    <div class="bonus-progress__text-container">
                      <p class="bonus-progress__text">продаж всего</p>
                      <p class="bonus-progress__title">
                        107 <span class="bonus-progress__span">шт</span>
                      </p>
                    </div>
                    <div class="bonus-progress__text-container">
                      <p class="bonus-progress__text">
                        продаж с регистрацией в бонусной программе
                      </p>
                      <p class="bonus-progress__title">
                        80
                        <span class="bonus-progress__span">шт</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="bonus-progress__filter bonus-progress-filter">
                  <p class="bonus-progress-filter__text">Текущий месяц</p>
                  <img
                    src="../../../assets/img/icons/arrow.svg"
                    class="bonus-progress-filter__arrow"
                  />
                </div>
              </header>
              <main class="bonus-progress__main">
                <Chart
                  type="bar"
                  :data="barData"
                  :options="barOptions"
                  class="bonus-progress__chart"
                />
              </main>
            </div>
            <div class="bonus__targets targets">
              <header class="targets__header">
                <h3 class="targets__title">
                  Цели по регистрации покупателей в бонусной программе
                </h3>
                <div class="targets__filters">
                  <TreeSelect
                    placeholder="Время проведения"
                    class="targets__select"
                  />
                  <TreeSelect placeholder="Тип цели" class="targets__select" />
                </div>
              </header>
              <main class="targets__main targets">
                <TargetCard
                  :target="{
                    image: '../../../assets/img/gallery/1.jpg',
                    title:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    status: 'not_completed',
                    date: '10.10.2021',
                    images: ['', '', '', ''],
                  }"
                />
                <TargetCard
                  :target="{
                    image: '../../../assets/img/gallery/1.jpg',
                    title:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    status: 'received',
                    date: '10.10.2021',
                  }"
                />
                <TargetCard
                  :target="{
                    image: '../../../assets/img/gallery/1.jpg',
                    title:
                      'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor sit amet, consectetur adipiscing elit',
                    status: 'completed',
                    date: '10.10.2021',
                  }"
                />
              </main>
            </div>
            <div class="bonus__advantages advantages">
              <CardContainer
                title="Для продавца"
                :cards="bonusCards1"
                type="large"
              />
              <div class="advantages__horizontal">
                <CardContainer
                  title="Для розничных покупателей (вариант 1)"
                  :cards="bonusCards2"
                  type="small"
                />
                <CardContainer
                  title="Для розничных покупателей (вариант 2)"
                  :cards="bonusCards3"
                  type="small"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardContainer from './CardContainer.vue'
import TargetCard from './TargetCard.vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import TreeSelect from 'primevue/treeselect'
import Chart from 'primevue/chart'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'BonusProgram',
  setup () {
    const bonusCards1 = [
      {
        id: 11,
        image: '../../../assets/img/icons/BonusProgram/telephone.svg',
        text: 'При продаже в магазине спросите у покупателя его номер телефона для начисления бонусов'
      },
      {
        id: 12,
        image: '../../../assets/img/icons/BonusProgram/edit.svg',
        text: 'При оформлении заказа внесите номер в поле «Спросить у Равиля»'
      },
      {
        id: 13,
        image: '../../../assets/img/icons/BonusProgram/target.svg',
        text: 'Выполняйте цели по регистрации покупателей в бонусной программе - получайте вознаграждение от MachineStore'
      }
    ]
    const bonusCards2 = [
      {
        id: 21,
        image: '../../../assets/img/icons/BonusProgram/store-discount1.svg',
        text: 'Клиент, покупая в вашем магазине офлайн, получает 1% от суммы покупки бонусами'
      },
      {
        id: 22,
        image: '../../../assets/img/icons/BonusProgram/telephone-small.svg',
        text: 'Для начисления бонусов клиент должен предоставить номер телефона'
      },
      {
        id: 23,
        image: '../../../assets/img/icons/BonusProgram/bonus.svg',
        text: 'При регистрации на сайте MachineStore клиент получит все бонусы, заработанные за покупки в вашем магазине'
      },
      {
        id: 24,
        image: '../../../assets/img/icons/BonusProgram/bonus-payment.svg',
        text: 'Клиент может полностью или частично  оплачивать бонусами покупки на сайте MachineStore'
      }
    ]
    const bonusCards3 = [
      {
        id: 31,
        image: '../../../assets/img/icons/BonusProgram/store-discount2.svg',
        text: 'Клиент, покупая в вашем магазине онлайн, получает 2% от суммы покупки бонусами'
      },
      {
        id: 32,
        image: '../../../assets/img/icons/BonusProgram/bonus-payment.svg',
        text: 'Клиент может полностью или частично  оплачивать бонусами покупки на сайте MachineStore'
      }
    ]

    const barData = {
      labels: [
        '10.10.2021',
        '11.10.2021',
        '12.10.2021',
        '13.10.2021',
        '14.10.2021',
        '15.10.2021',
        '16.10.2021'
      ],
      datasets: [
        {
          type: 'bar',
          label: 'С бонусами',
          data: [5, 15, 5, 25, 10, 30, 15],
          backgroundColor: '#ff6221',
          borderRadius: 5
        },
        {
          type: 'bar',
          label: 'Всего',
          data: [10, 20, 10, 30, 15, 40, 20],
          backgroundColor: '#dedede',
          borderRadius: 5
        }
      ]
    }

    const barOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltips: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          stacked: true
        },
        y: {
          stacked: true
        }
      }
    }

    return {
      bonusCards1,
      bonusCards2,
      bonusCards3,
      barData,
      barOptions
    }
  },
  components: {
    CardContainer,
    TargetCard,
    TreeSelect,
    Chart
  },
  methods: {},
  mounted () {}
}
</script>

<style lang="scss" scoped>
.bonus {
  display: flex;
  flex-direction: column;
  gap: 12px;

  h3,
  p {
    margin: 0;
    line-height: 1.05;
  }

  &__title {
    font-size: 24px;
    margin-bottom: 12px;
  }

  &__progress,
  .bonus-progress {
    display: flex;
    flex-direction: column;
    gap: 16px;

    border: 1px solid rgba(226, 226, 226, 1);
    border-radius: 5px;

    padding: 24px;

    &__title {
      font-size: 14px;
      font-weight: 500;
    }

    &__text {
      color: rgba(173, 173, 173, 1);
      font-size: 12px;
    }

    &__span {
      font-size: 12px;
      color: rgba(94, 94, 94, 1);
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 100px;
    }

    &__statistics {
      display: flex;
      align-items: center;
      gap: 100px;
    }

    &__percent {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    &__img-container {
      display: flex;
      justify-content: center;
      align-items: center;

      background-color: rgba(248, 247, 245, 1);
      border-radius: 10px;

      padding: 8px;
    }

    &__sales {
      display: flex;
      align-items: center;
      gap: 75px;
    }

    &__text-container {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    &__filter,
    .bonus-progress-filter {
      display: flex;
      align-items: center;
      gap: 4px;

      cursor: pointer;

      &__arrow {
        padding: 8px 6px;
        rotate: -90deg;
      }
    }

    &__main {
    }

    &__chart {
      max-height: 184px;
    }
  }

  &__targets,
  .targets {
    display: flex;
    flex-direction: column;
    gap: 60px;

    border: 1px solid rgba(226, 226, 226, 1);
    border-radius: 5px;

    padding: 24px;

    &__header {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }

    &__filters {
      display: flex;
      gap: 12px;
    }

    &__select {
      min-width: 220px;
    }
  }

  &__advantages,
  .advantages {
    display: flex;
    flex-direction: column;
    gap: 12px;

    &__horizontal {
      display: flex;
      gap: 13px;
    }
  }
}
</style>
