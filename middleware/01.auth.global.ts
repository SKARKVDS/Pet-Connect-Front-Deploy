import {useTokenStore} from "~/stores/token";
import axios from 'axios'
import type { APIResponse } from "~/services/types";


export default defineNuxtRouteMiddleware(async (to, from) => {
    const token = useCookie("token")
    const nuxtApp = useNuxtApp()

    if (!token.value && to?.name !== 'login' && to?.name !== 'sign-up') {
        return navigateTo("/login")
    } else if (token.value && (to?.name === 'login' || to?.name === 'sign-up')) {
        return abortNavigation()
    }
    else if(token.value && (to.path.startsWith('/admin'))){

        const {data,error, status } = await useFetch('https://pet-connect-back-deploy.onrender.com/api/user/checkTokenAdmin', {
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

    }
    else if (token.value) {
        const {data,error, status } = await useFetch('https://pet-connect-back-deploy.onrender.com/api/user/checkToken', {
          onRequest({ request, options }) {
            // Set the request headers
            // note that this relies on ofetch >= 1.4.0 - you may need to refresh your lockfile
            const tokenTest = useCookie("token").value as string
            options.headers.set('Authorization', `Bearer ${tokenTest}`)
          }
        })

        if(error.value !== null){
          if(!error.value.data.success){
            useCookie("token").value = null
            return navigateTo("/login")
          }
        }

    }

  if(token.value && (to.path.startsWith('/admin/specie/race/'))){
    const {data,error, status } = await useFetch('https://pet-connect-back-deploy.onrender.com/api/specie/admin/exist/' + to.params.id, {
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
  }

  if(token.value && (to.path.startsWith('/admin/user/pet/') || to.path.startsWith('/admin/user/proposal/'))){
    const {data,error, status } = await useFetch('https://pet-connect-back-deploy.onrender.com/api/user/admin/exist/' + to.params.id, {
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
  }

  if(token.value && (to.path.startsWith('/admin/forum/topic/post/') || to.path.startsWith('/forum/topic/post/'))){
    const {data,error, status } = await useFetch('https://pet-connect-back-deploy.onrender.com/api/topic/exist/' + to.params.id)

    if(error.value !== null){
      if(!error.value.data.success){
        return abortNavigation()
      }
    }
  }else if(token.value && (to.path.startsWith('/admin/forum/topic/') || to.path.startsWith('/forum/topic/'))){
    const {data,error, status } = await useFetch('https://pet-connect-back-deploy.onrender.com/api/forum/exist/' + to.params.id)

    if(error.value !== null){
      if(!error.value.data.success){
        return abortNavigation()
      }
    }
  }

  if(token.value && (to.path.startsWith('/pet/vaccine/'))){
    const {data,error, status } = await useFetch('https://pet-connect-back-deploy.onrender.com/api/pet/accessible/' + to.params.id, {
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
  }

  if(token.value && (to.path.startsWith('/reservation/request/'))){
    const {data,error, status } = await useFetch('https://pet-connect-back-deploy.onrender.com/api/reservation/request/accessible/' + to.params.id, {
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
  }

  if(token.value && (to.path.startsWith('/reservation/proposal/'))){
    const {data,error, status } = await useFetch('https://pet-connect-back-deploy.onrender.com/api/reservation/proposal/accessible/' + to.params.id, {
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
  }

  if(token.value && (to.path.startsWith('/memories/'))){
    const {data,error, status } = await useFetch('https://pet-connect-back-deploy.onrender.com/api/reservation/memory/accessible/' + to.params.id, {
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
  }
})
