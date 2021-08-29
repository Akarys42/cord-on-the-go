import { handleAuthorizeRequest } from './handlers/authorize'
import { handleCallbackRequest } from './handlers/callback'
import {handleShowTokenRequest} from "./handlers/show_token";

addEventListener('fetch', (event) => {
  const path = new URL(event.request.url).pathname

  if (path === "/api/authorize") {
    event.respondWith(handleAuthorizeRequest(event.request))
  } else if (path === "/api/callback") {
    event.respondWith(handleCallbackRequest(event.request))
  } else if (path === "/show_token") {
    event.respondWith(handleShowTokenRequest(event.request))
  } else {
    event.respondWith(new Response("Not found", {status: 404}))
  }
})
