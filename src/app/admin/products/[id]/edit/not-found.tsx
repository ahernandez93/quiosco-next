import Heading from '@/components/ui/Heading'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="text-center flex flex-col items-center justify-center h-screen">
            <Heading>
                Producto no encontrado
            </Heading>
            <p className="text-lg my-5">El producto que intentas editar no existe</p>
            <Link
                href="/admin/products"
                className="bg-amber-400 text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto"
            >
                Ir a productos
            </Link>
        </div>
    )
}
