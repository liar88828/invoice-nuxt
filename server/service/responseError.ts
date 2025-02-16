import { z } from "zod";
import { H3Event } from "h3";

export function responseError (e: unknown,event:H3Event,from:string) {
    console.error(e)
    if (e instanceof z.ZodError) {
        setResponseStatus(event, 400)
        return {
            message: "Error Validation",
            error: e.flatten().formErrors,
            status: false
        }
    }

    if (e instanceof Error) {
        setResponseStatus(event, 404)
        return {
            message: e.message,
            status: false
        }
    }

    setResponseStatus(event, 500)
    return {
        message: `Fail Find Data ${from}}`,
        status: false
    }
}