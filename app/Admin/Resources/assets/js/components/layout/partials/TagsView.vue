<template>
    <div class="tags-view-container">
        <div class="tags-view-wrapper">
            <router-link
                :class="isActive(tag)?'active':''"
                :key="tag.path"
                :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
                @click.middle.native="closeSelectedTag(tag)"
                class="tags-view-item"
                ref="tag"
                tag="span"
                v-for="tag in visitedViews">
                {{ tag.title }}
                <v-icon size="14" @click.prevent.stop="closeSelectedTag(tag)" class="el-icon-close">clear</v-icon>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                top: 0,
                left: 0,
                selectedTag: {}
            }
        },
        computed: {
            visitedViews() {
                return this.$store.state.tagsView.visitedViews
            }
        },
        watch: {
            $route() {
                this.addViewTags();
            },
        },
        mounted() {
            this.addViewTags()
        },
        methods: {
            isActive(route) {
                return route.path === this.$route.path
            },
            addViewTags() {
                const {tagView} = this.$route.meta;
                if (tagView) {
                    this.$store.dispatch('tagsView/addView', this.$route)
                }
                return false
            },
            closeSelectedTag(view) {
                console.log(this.$store.state.tagsView.visitedViews)
                this.$store.dispatch('tagsView/delView', view).then(({visitedViews}) => {
                    if (this.isActive(view)) {
                        const latestView = visitedViews.slice(-1)[0];
                        if (latestView) {
                            this.$router.push(latestView)
                        } else {
                            this.$router.push('/')
                        }
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .tags-view-container {
        height: 34px;
        width: 100%;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);

        .tags-view-wrapper {
            .tags-view-item {
                display: inline-block;
                position: relative;
                cursor: pointer;
                height: 26px;
                line-height: 26px;
                border: 1px solid #d8dce5;
                color: #495060;
                background: #fff;
                padding: 0 8px;
                font-size: 12px;
                margin-left: 5px;
                margin-top: 4px;

                &:first-of-type {
                    margin-left: 15px;
                }

                &:last-of-type {
                    margin-right: 15px;
                }

                &.active {
                    background-color: #42b983;
                    color: #fff;
                    border-color: #42b983;

                    &::before {
                        content: '';
                        background: #fff;
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        position: relative;
                        margin-right: 2px;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
    //reset element css of el-icon-close
    .tags-view-wrapper {
        .tags-view-item {
            .el-icon-close {
                //width: 16px;
                //height: 16px;
                //vertical-align: 2px;
                border-radius: 50%;
                text-align: center;
                transition: all .3s cubic-bezier(.645, .045, .355, 1);
                transform-origin: 100% 50%;

                &:before {
                    transform: scale(.6);
                    display: inline-block;
                    vertical-align: -3px;
                }

                &:hover {
                    background-color: #b4bccc;
                    color: #fff;
                }
            }
        }
    }
</style>
