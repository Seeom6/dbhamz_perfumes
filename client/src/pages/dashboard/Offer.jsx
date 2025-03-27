import React from 'react'
import OfferList from '../../components/offers/OfferList'

const Offer = () => {
  return (
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Offers Management</h1>
        <OfferList />
      </div>
  )
}

export default Offer