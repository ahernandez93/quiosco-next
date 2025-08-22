"use client"
import { CldUploadWidget } from "next-cloudinary"
import { TbPhotoPlus } from "react-icons/tb"
import { useState } from "react"
import Image from "next/image"
import { getImagePath } from "@/utils"


export default function ImageUpload({ image }: { image: string | undefined }) {
    const [imageUrl, setImageUrl] = useState('')

    return (
        <CldUploadWidget
            onSuccess={(result, { widget }) => {
                if (result.event === 'success') {
                    widget.close()
                    // @ts-expect-error: No hay manera de tipar el resultado de Cloudinary 
                    setImageUrl(result.info?.secure_url)
                }
            }}
            uploadPreset="upload-preset"
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => (
                <>
                    <div className="space-y-2">
                        <label className="text-slate-800">Imagen Producto</label>
                        <div
                            className="relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100"
                            onClick={() => open()}
                        >
                            <TbPhotoPlus
                                size={50}
                            />
                            <p className="text-lg font-semibold">Agregar Imagen</p>
                            {imageUrl && (
                                <div className="absolute inset-0 w-full h-full">
                                    <Image
                                        fill
                                        src={imageUrl}
                                        alt="Imagen Producto"
                                        className="object-contain"
                                    />

                                </div>
                            )}
                        </div>
                    </div>
                    {image && !imageUrl && (
                        <div className="space-y-2 flex flex-col items-center justify-center">
                            <label className="text-slate-800">Imagen Actual:</label>
                            <div className="relative w-64 h-64">
                                <Image
                                    fill
                                    src={getImagePath(image)}
                                    alt="Imagen Producto"
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    )}
                    <input
                        type="hidden"
                        name="image"
                        defaultValue={imageUrl ? imageUrl : image}
                    />
                </>
            )}
        </CldUploadWidget>
    )
}
