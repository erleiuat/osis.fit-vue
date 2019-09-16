<template>
    <vcontainer>
        <transition appear name="fade" mode="out-in">
            <router-view />
        </transition>
    </vcontainer>
</template>

<script>
export default {
    name: 'About'
}
</script>
