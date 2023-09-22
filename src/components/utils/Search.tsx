import React, { useState } from 'react'

export default function Search() {
    const [search, setSearch] = useState();
  return (
    <div className="flex justify-center my-5">
        <input className="min-w-[500px] border border-black/20 rounded-md focus:outline-none focus:border-black/50 focus:bg-black/10 transition ease-in-out duration-500 p-2" placeholder="Search" value={search} type="text"/>
    </div>
  )
}
