"use server"

import { ProductSchema } from "@/schema"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const updateProduct = async (data: unknown, id: number) => {
    const result = ProductSchema.safeParse(data)
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        await prisma.product.update({
            where: {
                id
            },
            data: result.data
        })
    } catch (error) {
        console.log(error)
    }
    revalidatePath('/admin/products')
}
