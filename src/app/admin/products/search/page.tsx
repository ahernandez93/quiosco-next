import Heading from "@/components/ui/Heading"
import { prisma } from "@/lib/prisma"
import ProductsTable from "@/components/products/ProductsTable"
import ProductSearchForm from "@/components/products/ProductSearchForm"

async function searchProducts(search: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: search,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })
    return products
}

export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {
    const search = await searchParams.search
    const products = await searchProducts(search)
    return (
        <>
            <Heading>
                Resultado de la busqueda : {search}
            </Heading>
            <div className="flex flex-col lg:flex-row  lg:justify-end gap-5">
                <ProductSearchForm />
            </div>
            {products.length === 0 ? (
                <p className="text-center text-lg">No hay resultados</p>
            ) : (
                <ProductsTable
                    products={products}
                />
            )}
        </>
    )
}
