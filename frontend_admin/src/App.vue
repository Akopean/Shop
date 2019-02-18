<template>
    <v-app>
        <preloader v-if="!$root.ready"></preloader>
        <router-view></router-view>
    </v-app>
</template>

