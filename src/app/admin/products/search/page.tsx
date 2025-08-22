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
interface PageProps {
    searchParams: Promise<{ search?: string }>
}

export default async function SearchPage({ searchParams }: PageProps) {
    const sp = await searchParams
    const search = sp.search!
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
