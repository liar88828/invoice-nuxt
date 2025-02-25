import { type ResponseAPI } from "~/interface/response"
import { responseError } from "~/server/service/responseError";
import { faker } from '@faker-js/faker';
import prisma from "~/lib/prisma";
import { toRepeat } from "~/utils/toRepeat";

export default defineEventHandler(async (event)=> {
    return ''
    //     for await (const i of toRepeat(2000)) {
    //             await prisma.products.create({
    //                     data: {
    //                         harga: faker.number.int({ min: 100000, max: 100000 }),
    //                         jumlah: faker.number.int({ min: 100, max: 1000 }),
    //                         nama: faker.person.firstName(),
    //                         keterangan: faker.lorem.sentence(),
    //                     }
    //                 }
    //             )
    //         }
    //
    // try {
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