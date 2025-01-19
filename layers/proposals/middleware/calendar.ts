
export default defineNuxtRouteMiddleware(async (to, from) => {
    const route = useRoute()

    const id = route.params.id;

    if (!id) {
        const {data,error, status } = await useFetch('https://pet-connect-back-deploy.onrender.com/api/proposal/accessible/' + to.params.id, {
            onRequest({ request, options }) {
                // Set the request headers
                // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
                const tokenTest = useCookie("token").value as string
                options.headers.set('Authorization', `Bearer ${tokenTest}`)
            }
        })

        if(error.value !== null){
            if(!error.value.data.success){
                return abortNavigation()
            }
        }
    }else{
        return abortNavigation()
    }
})
