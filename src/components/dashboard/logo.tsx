import Image from "next/image"

export default function Logo() {
    return (
        <div className="relative h-8 w-8 rounded-full border">
            <Image
                src={"/logo.webp"}
                alt="Logo App"
                fill
                className="object-contain"
            />
        </div>
    )
}
