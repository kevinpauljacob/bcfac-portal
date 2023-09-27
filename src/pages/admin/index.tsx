import React from 'react'
import Search from '@/components/utils/Search'
import Card from '@/components/dashboard/AdminCard'
import withAdminAuth from '@/utils/withAdminAuth'

const Dashboard = () => {
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

export default withAdminAuth(Dashboard);