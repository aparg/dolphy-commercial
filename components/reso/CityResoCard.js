'use client'
import Link from 'next/link'
import React from 'react'
import TimeAgo from '../TimeAgo'

import { commercial } from '@/api/routes'

const CityResoCard = React.forwardRef(({ curElem, city }, ref) => {
  const price = Number(curElem.ListPrice).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })

  const mapObj = {
    MLS: curElem.MLS,
    index: 1,
  }
  const imgSrc = commercial.photos.replace(/MLS|index/gi, function (matched) {
    return mapObj[matched]
  })

  const handleImageError = (e) => {
    e.target.onerror = null
    e.target.src = `/noimage.webp`
  }

  return (
    <>
      <div className="col additional_sales-card" ref={ref}>
        <Link
          href={`/ontario/${city}/${curElem.MLS}`}
          className="text-decoration-none text-dark"
        >
          <div className="afte-proj">
            <div className="img-text ">
              <p className="m-0 text-small">
                <TimeAgo modificationTimestamp={curElem.TimestampSql} />
              </p>
            </div>

            <img
              src={imgSrc}
              className="imghei img-responsive imghei-small"
              alt={curElem.MLS}
              onError={handleImageError}
            />

            <div className="card-textt card text-small">
              <p className="mb-0 card-price card-price-small">{price}</p>

              <p className="mb-0 text-s"> MLS® #{curElem.MLS}</p>
              <p className="mb-0 text-s">{curElem.UnparsedAddress}</p>

              <p className="mb-0 text-s"> Listed by {curElem.ListBrokerage}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
})

export default CityResoCard
