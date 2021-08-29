import { handleAuthorizeRequest } from './handlers/authorize'
import { handleCallbackRequest } from './handlers/callback'

addEventListener('fetch', (event) => {
  const path = new URL(event.request.url).pathname

  if (path === "/api/authorize") {
    event.respondWith(handleAuthorizeRequest(event.request))
  } else if (path === "/api/callback") {
    event.respondWith(handleCallbackRequest(event.request))
  } else {
    event.respondWith(new Response("Not found", {status: 404}))
  }
})
