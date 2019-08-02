<template>
    <v-container grid-list-xl fill-height>
        <v-layout wrap align-start>

            <v-layout wrap align-center>
                <v-flex grow>
                    <div class="headline">{{ $t('title') }}</div>
                </v-flex>
                <v-flex shrink>
                    <TemplateAdder />
                </v-flex>
            </v-layout>

            <v-flex xs12 sm6 lg4>

            </v-flex>

            <v-flex xs12>
                {{ $t('noneyet') }}
            </v-flex>

        </v-layout>
        <YouSure :show="sure" :affected="toDelete ? toDelete.title : ''" @accept="sure = false, delItem(toDelete)" @decline="toDelete = null, sure = false" />
    </v-container>
</template>

<script>
import YouSure from '@/components/YouSure'
import TemplateAdder from '@/components/adder/Template'

export default {
    name: 'Own',

    components: {
        TemplateAdder, YouSure
    },

    i18n: {
        messages: {
            en: {
                title: 'Your Templates',
                amount: 'Amount',
                calories: 'Calories/100',
                total: 'Total',
                noneyet: 'You have not yet created your own templates',
                removeImgError: 'Image remove failed'
            },
            de: {
                title: 'Deine Vorlagen',
                amount: 'Menge',
                calories: 'Kalorien/100',
                total: 'Total',
                noneyet: 'Du hast noch keine eigenen Vorlagen erstellt',
                removeImgError: 'Bild entfernen fehlgeschlagen'
            }
        }
    }

}
</script>
