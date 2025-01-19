import {defineStore} from "pinia";

export const useBreadcrumbStore = defineStore('breadcrumb', {
    state: () => ({
        breadcrumbs: [],
    }),
    actions: {
        set(breadcrumbs) {
            this.breadcrumbs = breadcrumbs
        },
    },
})