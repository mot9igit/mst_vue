<template>
    <section class="section">
        <h4 class="section__title">{{ title }}</h4>
        <div :class="`section__card-container section__card-container--${type}`">
            <article v-for="card in cards" :key="card" class="section__card card">
                <img src="../../../assets/img/icons/BonusProgram/telephone.svg" class="card__img">
                <p class="card__text">{{ card.text }}</p>
            </article>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const imageRef = ref({})

    return {
      imageRef
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    cards: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'small'
    }
  },
  computed: {
    image () {
      if (this.id === 11) return '../../../assets/img/icons/BonusProgram/telephone.svg'
      if (this.id === 12) return '../../../assets/img/icons/BonusProgram/edit.svg'
      if (this.id === 13) return '../../../assets/img/icons/BonusProgram/target.svg'

      if (this.id === 21) return '../../../assets/img/icons/BonusProgram/store-discount1.svg'
      if (this.id === 22) return '../../../assets/img/icons/BonusProgram/telephone-small.svg'
      if (this.id === 23) return '../../../assets/img/icons/BonusProgram/bonus.svg'
      if (this.id === 24) return '../../../assets/img/icons/BonusProgram/bonus-payment.svg'

      if (this.id === 31) return '../../../assets/img/icons/BonusProgram/store-discount2.svg'
      if (this.id === 32) return '../../../assets/img/icons/BonusProgram/bonus-payment.svg'

      return ''
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.section {
    display: flex;
    flex-direction: column;
    gap: 16px;

    border: 1px solid rgba(226, 226, 226, 1);
    border-radius: 5px;

    padding: 24px;

    &__title {
        background-color: rgba(248, 247, 245, 1);
        color: rgba(40, 40, 40, 1);

        font-size: 14px;
        font-weight: 500;

        padding: 12px 16px;
        width: fit-content;
    }

    &__card-container {
        display: grid;
        justify-content: space-around;
        gap: 40px;

        &--large {
            grid-template: auto / repeat(3, 1fr);

            .card {
                gap: 10px;

                &__img {
                    width: 95px;
                    aspect-ratio: 1;
                }
            }
        }

        &--small {
            grid-template: auto / repeat(2, 1fr);

            .card {
                gap: 6px;

                &__img {
                    width: 55px;
                    aspect-ratio: 1;
                }
            }
        }
    }

    &__card,
    .card {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        border: none;

        &__img {
            object-fit: contain;
        }

        &__text {
            font-size: 14px;
            text-align: center;
        }
    }
}
</style>
