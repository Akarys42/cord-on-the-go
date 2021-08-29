import {DISCORD_API} from "./constants"
import jsonwebtoken = require("@tsndr/cloudflare-worker-jwt")

export async function tryGenerateToken(postData: object) : Promise<Response> {
    const formData = new FormData()
    for (const [k, v] of Object.entries(postData)) {
        formData.set(k, v)
    }

    const tokenResponse = await fetch(
        `${DISCORD_API}/oauth2/token`,
        {
            method: "POST",
            body: formData
        }
    )

    if (!tokenResponse.ok) {
        return new Response("Failed to authenticate. Please try again.", {status: 401})
    }
    const tokenBody = await tokenResponse.json()
    const accessToken = tokenBody.access_token
    const refreshToken = tokenBody.refresh_token

    const userResponse = await fetch(
        `${DISCORD_API}/users/@me`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )
    if (!userResponse.ok) {
        return new Response("Failed to fetch user detail. Please try again.", {status: 401})
    }

    const userBody = await userResponse.json()
    if (userBody.verified === false) {
        return new Response("Please verify your Discord email address first.", {status: 401})
    }

    let token = await jsonwebtoken.sign({
        sub: userBody.id,
        refresh: refreshToken
    }, HMAC_SECRET)

    return new Response("", {
        status: 302,
        headers: {
            "Set-Cookie": `token=${token}; Path=/`,
            Location: "/show_token"
        }
    })
}