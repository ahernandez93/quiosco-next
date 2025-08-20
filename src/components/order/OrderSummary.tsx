"use client"
import { useStore } from "@/store"
import { formatCurrency } from "@/utils"

export default function OrderSummary() {

    const order = useStore((state) => state.order)

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
            {order.length === 0 ? (
                <p className="text-center my-10">El carrito esta vacio</p>
            ) : (
                <ul>
                    {order.map(item => (
                        <li key={item.id}>
                            <div className="flex justify-between">
                                <p>{item.name}</p>
                                <p>{item.quantity} x {formatCurrency(item.price)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </aside>
    )
}
