import Link from "next/link"


export default function Tags() {

    const tagsData = ['Next.js', 'React', 'Web Development', 'JavaScript', 'asasas','sasas','sasass','saasas']

    return (
        <div className="mt-12 p-8 md:flex md:flex-rows">
            {tagsData.map((tag, index) => (
                <Link href={'/'+tag} key={index} className="rounded-full text-md bg-gray-300 m-2 px-4 py-2 hover:cursor-pointer hover:bg-gray-400 duration-500">
                    {tag}
                </Link>
            ))}
        </div>
    )
}