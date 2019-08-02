<template>
    <v-container grid-list-xl fill-height pt-0>

        <v-layout wrap align-start>

            <v-flex xs12 v-if="$vuetify.breakpoint.mdAndUp">
                <v-layout wrap align-center>
                    <v-flex grow>
                        <div class="headline">{{ $t('title') }}</div>
                    </v-flex>
                    <v-flex shrink>
                        <TemplateAdder />
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12>
                <v-toolbar dense fixed floating>
                    <v-text-field hide-details prepend-icon="search" single-line></v-text-field>
                </v-toolbar>
            </v-flex>

            <v-flex xs12 sm6>
                <v-layout column fill-height>
                    <v-flex xs12 pa-1 v-for="item in items.a" :key="item.id">
                        <TemplateCard :item="item" />
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12 sm6>
                <v-layout column fill-height>
                    <v-flex xs12 pa-1 v-for="item in items.b" :key="item.id">
                        <TemplateCard :item="item" />
                    </v-flex>
                </v-layout>
            </v-flex>

            <v-flex xs12>
                {{ $t('noneyet') }}
            </v-flex>

        </v-layout>

        <v-fab-transition v-if="!$vuetify.breakpoint.mdAndUp">
            <TemplateAdder>
                <template v-slot:default="trigger">
                    <v-btn fab fixed bottom right color="primary" v-on="trigger.on">
                        <v-icon>add</v-icon>
                    </v-btn>
                </template>
            </TemplateAdder>
        </v-fab-transition>

    </v-container>
</template>

<script>
const TemplateCard = () => import('@/components/template/Card')
import TemplateAdder from '@/components/adder/Template'

export default {
    name: 'Own',

    components: {
        TemplateCard, TemplateAdder
    },

    computed: {

        items () {
            var items = this.$store.getters['food/all']
            var a = []
            var b = []
            items.forEach((item, key) => {
                if (key % 2 == 0) b.push(item)
                else a.push(item)
            });
            return {
                a: a,
                b: b
            }
        }

    },

    mounted () {
        this.$store.dispatch('food/load')
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
