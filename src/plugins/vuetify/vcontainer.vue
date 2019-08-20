<template>
    <v-container :fill-height="fillHeight" :fluid="fluid" :class="fluid ? 'pa-0' : 'pt-0'">
        <v-row class="vcontainer-row">
            <v-col cols="12" :class="colStyle">
                <slot></slot>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: 'vcontainer',

    props: {
        fillHeight: {
            type: Boolean,
            default: true
        },
        fluid: {
            type: Boolean,
            default: false
        },
        align: {
            type: String,
            default: 'start'
            // start, center, end, space-between, space-around, space-evenly
        }
    },

    computed: {
        colStyle () {
            var cl = 'vcontainer-col pa-0' + ' '

            switch (this.align) {
            case 'start': return cl + 'c-start'
            case 'center': return cl + 'c-center'
            case 'end': return cl + 'c-end'
            case 'space-between': return cl + 'c-space-between'
            case 'space-around': return cl + 'c-space-around'
            case 'space-evenly': return cl + 'c-space-evenly'
            case 'stretch': return cl + 'c-stretch'
            }

            return cl
        }
    }

}
</script>

<style scoped>
.row {
    -webkit-flex: 0 1 auto !important; /* Safari 6.1+ */
    -ms-flex: 0 1 auto !important; /* IE 10 */
    flex: 0 1 auto !important;
}
.vcontainer-row {
    margin: 0px;
    width: 100%;
    height: 100%;
}
.vcontainer-col {
    display: flex;
    flex-direction: column;
}

.c-start {
    justify-content: flex-start !important;
}
.c-center {
    justify-content: center !important;
}
.c-end {
    justify-content: flex-end !important;
}
.c-space-between {
    justify-content: space-between !important;
}
.c-space-around {
    justify-content: space-around !important;
}
.c-space-evenly {
    justify-content: space-evenly !important;
}
.c-stretch {
    align-items: stretch !important;
}
</style>
