<template>
    <v-toolbar flat dark dense>
        <v-spacer />
        <v-toolbar-items>
            <v-btn flat :to="{name: 'blog'}" v-if="$route.name != 'blog'">
                <v-icon left>arrow_left</v-icon>
                {{ $t('blog') }}
            </v-btn>
            <v-btn flat :to="{name: 'blog.editor'}">
                <v-icon left>view_list</v-icon>
                {{ $t('list') }}
            </v-btn>
            <v-btn flat :to="{name: 'blog.editor.edit', params: {url: $route.params.url}}" v-if="$route.name === 'blog.article'">
                <v-icon left>edit</v-icon>
                {{ $t('edit') }}
            </v-btn>
            <v-btn flat :to="{name: 'blog.editor.add'}">
                <v-icon left small>add</v-icon>
                {{ $t('create') }}
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>

export default {
    name: 'Nav',
    i18n: {
        messages: {
            en: {
                menu: 'Writer',
                edit: 'Edit this Article',
                blog: 'Back to start',
                list: 'All Articles',
                create: 'Create'
            },
            de: {
                menu: 'Author',
                edit: 'Diesen Artikel bearbeiten',
                blog: 'Zurück zur Übersicht',
                list: 'Alle Artikel',
                create: 'Neuer Artikel'
            }
        }
    }
}
</script>
