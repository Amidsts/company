import { createClient } from "redis"

const client = createClient()



export async function connectRedis () {
    try {
        // await client.on( "connect", () => {
        //     console.log( "connected to redis" )
        // } )
        await client.connect()
    } catch (e) {
        client.on("error", (err) => {
            console.log(`REDIS Client Error ${err}`)
        
        })
    }
}

export async function SETEX (key: string, value: string) {
    try {

        const redisCode = await client.setEx(key, 60*15, value)
        return redisCode

    } catch (e) {
        console.log(`setex error ${e}`)
    }
}

export async function GET (key: string) {
    try {

        const redisCode = await client.get(key)
        
        return redisCode
        
    } catch (e) {
        console.log(`get error ${e}`)
    }
}