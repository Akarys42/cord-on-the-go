export function getCookie(request: Request, name: String): string | null {
    let result = null
    const cookieString = request.headers.get("Cookie")
    if (cookieString) {
        const cookies = cookieString.split(";")
        cookies.forEach(cookie => {
            const cookiePair = cookie.split("=", 2)
            const cookieName = cookiePair[0].trim()
            if (cookieName === name) {
                result = cookiePair[1]
            }
        })
    }
    return result
}