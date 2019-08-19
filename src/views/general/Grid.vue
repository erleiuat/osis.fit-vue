<template>
    <vcontainer :fillHeight="fill" :fluid="fluid" :align="align">

        <v-row class="row-style" justify="space-around">
            <v-col cols="3" class="col-style">
                I'm a COL inside ROW (cols="3")
            </v-col>
            <v-col cols="3" class="col-style">
                I'm a COL inside ROW (cols="3")
            </v-col>
            <v-col cols="12" class="col-style">
                I'm a COL inside ROW (cols="12")
            </v-col>
            <v-col class="col-style" v-for="i in 15" :key="i">
                Col {{ i }}
            </v-col>
        </v-row>

        <v-row class="row-style">
            <v-col class="col-style">
                I'm a COL inside ROW
            </v-col>
            <v-col class="col-style">
                I'm anoter COL inside ROW
            </v-col>
        </v-row>

        <v-row class="row-style" justify="center">
            <v-col cols="auto" class="col-style">
                I'm a COL inside ROW
            </v-col>
        </v-row>

        <!-- THIS WILL DESTROY THE LAYOUT:
        <v-col cols="6" class="col-style">
            I'm a COL right inside CONTAINER
        </v-col>

        <v-col cols="6" class="col-style">
            I'm a COL right inside CONTAINER
        </v-col>
        -->

        <v-row class="row-style">
            <v-col cols="12" class="col-style">
                <v-card>
                    <v-card-title class="title">
                        Options
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <v-switch v-model="fill" label="fill-height (default: true)"></v-switch>
                            </v-col>
                            <v-col>
                                <v-switch v-model="fluid" label="fluid"></v-switch>
                            </v-col>
                            <v-col cols="12">
                                <v-divider></v-divider>
                            </v-col>
                        </v-row>
                        <v-row justify="center">
                            <v-col cols="12">
                                <div class="title">Align</div>
                                <div class="caption">(Only notable with 'fill-height' enabled)</div>
                            </v-col>
                            <v-col v-for="opt in aligns" :key="opt">
                                <v-btn @click="align = opt" :color="align === opt ? 'success' : ''" depressed>
                                    {{ opt }} {{ opt === 'start' ? '(default)' : '' }}
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

    </vcontainer>
</template>

<script>
export default {
    name: 'Grid',

    data: () => ({
        fill: true,
        fluid: false,
        dense: false,
        align: 'start',
        aligns: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly', 'stretch']
    })

}
</script>

<style scoped>
.row-style {
    padding: 10px;
    background-color:rgba(255,0,0,.1);
    border-bottom: 1px solid rgba(86,61,124,.2);
}
.col-style {
    padding: 10px;
    background-color :rgba(86,61,124,.15);
    border: 1px solid rgba(86,61,124,.2);
}
.container-style {
    padding: 10px;
    background-color: ghostwhite;
}
</style>
