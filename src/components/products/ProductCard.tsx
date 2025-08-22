import { Product } from "@prisma/client"
import { formatCurrency, getImagePath } from "@/utils"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const imagePath = getImagePath(product.image)
    return (
        <div className="border bg-white">
            <Image
                src={imagePath}
                alt={`Imagen platillo ${product.name}`}
                width={600}
                height={500}
                priority
            />
            <div className="p-5">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatCurrency(product.price)}</p>
                <AddProductButton
                    product={product}
                />
            </div>
        </div>
    )
}
