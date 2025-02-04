'use client'
import 'website/src/framer/styles.css'
import { useSearchParams, useRouter } from 'next/navigation'

import Image from 'next/image'
import SearchbarFramerComponent from 'website/src/framer/searchbar'
import TableItemFramerComponent from 'website/src/framer/table-item'

const data = [
    {
        email: 'john.doe@example.com',
        status: 'active',
        cost: '$99.99',
    },
    {
        email: 'jane.smith@example.com',
        status: 'pending',
        cost: '$149.99',
    },
    {
        email: 'bob.wilson@example.com',
        status: 'inactive',
        cost: '$79.99',
    },
    {
        email: 'sarah.jones@example.com',
        status: 'active',
        cost: '$199.99',
    },
    {
        email: 'mike.brown@example.com',
        status: 'pending',
        cost: '$129.99',
    },
]

const inputName = 'search-input'

export default function Home() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const query = searchParams.get(inputName) || ''

    const searchLower = query.toLowerCase()
    const filteredData = data.filter(
        (item) =>
            item.email.toLowerCase().includes(searchLower) ||
            item.status.toLowerCase().includes(searchLower) ||
            item.cost.toLowerCase().includes(searchLower),
    )

    return (
        <div className='flex flex-col'>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const searchQuery =
                        formData.get(inputName)?.toString() || ''
                    router.push(
                        `?${inputName}=${encodeURIComponent(searchQuery)}`,
                    )
                }}
                className='bg-white min-w-[700px] p-10 mx-auto self-center'
            >
                <SearchbarFramerComponent searchName={inputName} />
                <div className='flex flex-col gap-4'>
                    {filteredData.map((x) => {
                        return <TableItemFramerComponent key={x.email} {...x} />
                    })}
                </div>
            </form>
        </div>
    )
}
