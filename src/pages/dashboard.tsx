import React from 'react'
import Search from '@/components/utils/Search'
import Card from '@/components/dashboard/Card'

export default function dashboard() {
  return (
    <div>
        <Search/>
        <section>
            <h2 className="text-2xl font-bold">
                Course Materials
            </h2>
            <Card/>
            <Card/>
            <Card/>
        </section>
    </div>
  )
}
