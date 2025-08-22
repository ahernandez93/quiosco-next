"use server"

import { ProductSchema } from "@/schema"
import { prisma } from "@/lib/prisma"

export const createProduct = async (data: unknown) => {
    const result = ProductSchema.safeParse(data)
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        await prisma.product.create({
            data: result.data
        })
    } catch (error) {
        console.log(error)
    }
}
