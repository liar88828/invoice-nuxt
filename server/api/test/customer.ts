import { type ResponseAPI } from "~/interface/response"
import { responseError } from "~/server/service/responseError";
import { faker } from '@faker-js/faker';
import prisma from "~/lib/prisma";
import { toRepeat } from "~/utils/toRepeat";

export default defineEventHandler(async (event) => {
    return ''
    //     for await (const i of toRepeat(2000)) {
    //         await prisma.customers.create({
    //                 data: {
    //                     kota: faker.location.country(),
    //                     alamat: faker.location.city(),
    //                     nama: faker.person.firstName(),
    //                     tlp: faker.phone.number({style:"national"})
    //                 }
    //             }
    //         )
    //     }
    //
    //     try {
    //         return {
    //             message: "Success Find Data Invoice",
    //             status: true,
    //         }
    //     } catch
    //         (e: unknown) {
    //         return responseError(e, event, 'Count is Error')
    //     }
    }
)