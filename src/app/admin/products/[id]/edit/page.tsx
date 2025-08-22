import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import Heading from "@/components/ui/Heading"
import GoBackButton from "@/components/ui/GoBackButton"

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id
        }
    })

    if (!product) {
        notFound()
    }
    return product
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const product = await getProductById(Number(id))
    return (
        <>
            <Heading>
                Editar Producto: {product?.name}
            </Heading>
            <GoBackButton />
            <EditProductForm>
                <ProductForm product={product} />
            </EditProductForm>
        </>
    )
}
