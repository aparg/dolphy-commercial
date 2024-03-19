'use client'
import React, { useState, useEffect } from 'react'

import TimeAgo from '@/components/TimeAgo'

//CUSTOM HOOKS
import useDeviceView from '@/helpers/useDeviceView'

import Collapse from '@/components/reso/Collapse'
import { saleLease } from '@/constant'

const PropertyPage = ({ main_data }) => {
  const [navbar, setNavbar] = useState(false)
  const { isMobileView } = useDeviceView()
  const getCommunityFeatures = () => {
    const {
      PropertyFeatures1,
      PropertyFeatures2,
      PropertyFeatures3,
      PropertyFeatures4,
      PropertyFeatures5,
      PropertyFeatures6,
    } = main_data

    return [
      PropertyFeatures1,
      PropertyFeatures2,
      PropertyFeatures3,
      PropertyFeatures4,
      PropertyFeatures5,
      PropertyFeatures6,
    ].join(', ')
  }

  const formatNumber = (value) => {
    // Check if the value is not null or undefined
    if (value != null) {
      return Number(value).toLocaleString('en-US')
    } else {
      // Handle the case where the value is null or undefined
      return 'N/A' // or any default value or message you prefer
    }
  }

  function formatCurrency(value) {
    // Check if the value is not null or undefined
    if (value != null) {
      return Number(value).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      })
    } else {
      // Handle the case where the value is null or undefined
      return 'N/A' // or any default value or message you prefer
    }
  }

  const handleScrollToContactAgent = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const price = formatCurrency(main_data?.ListPrice)
  const TaxAnnualAmount = formatCurrency(main_data?.Taxes)
  const AssociationFee = formatCurrency(main_data?.AddlMonthlyFees)

  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', () => {
        if (window.scrollY >= 870) {
          setNavbar(true)
        } else {
          setNavbar(false)
        }
      })
    }
  }, [])

  return (
    <>
      <div
        className={`border-0 p-4 rounded-3 bg-light ${
          isMobileView ? 'mt-2' : 'mt-4'
        }`}
      >
        <div className={`d-flex ${isMobileView ? 'gap-2' : 'gap-3'}`}>
          <span
            className="badge custom-badge text-dark"
            style={{ backgroundColor: '#ddd !important' }}
          >
            {saleLease[main_data.SaleLease.toLowerCase()].name}
          </span>
          <span
            className="badge custom-badge text-dark"
            style={{ backgroundColor: '#ddd !important' }}
          >
            <TimeAgo modificationTimestamp={main_data.TimestampSql} />
          </span>
        </div>
        <div className="row row-cols-lg-2 row-cols-1 pt-2 pt-md-0">
          <div className="col">
            <div className={` ${isMobileView ? 'pt-1' : 'pt-4'} `}>
              <h2 className="main-title fs-3 mb-0">C{price}</h2>
              <p className="cardd-subtitle">
                est. {formatCurrency((main_data.ListPrice / 60).toFixed(0))} /
                month
              </p>
            </div>
          </div>

          <div className={` col pt-3  ${isMobileView ? 'pt-0' : 'pt-4'}`}>
            <h1 className="main-title fs-3 mb-0">
              {main_data.Street} {main_data.StreetName}{' '}
              {main_data.StreetAbbreviation}
            </h1>
            <p className="cardd-subtitle">
              {main_data.Municipality}, {main_data.Province},{' '}
              {main_data.PostalCode}
            </p>
          </div>
        </div>

        {isMobileView ? (
          <div
            className={`contact-agent mt-3 ${
              navbar ? 'contact__scrolled' : ''
            }`}
          >
            <button
              className="btn bg-dark text-white btn-lg w-100 rounded-pill"
              onClick={handleScrollToContactAgent}
            >
              Book a showing
            </button>
          </div>
        ) : null}
      </div>

      {/* Description */}
      <div className={`${isMobileView ? 'pt-4' : 'pt-4'}`}>
        <div className="border border-0 p-4  rounded-3 bg-light">
          <h3 className="fw-bold cardd-title pb-3">Description</h3>
          <div
            className={`row row-cols-2  row-cols-md-4 w-100 ${
              isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
            }`}
          >
            <div className="col-7 col-md border-bottom py-2 py-md-3">
              <p className="cardd-subtitle_bg-black">Last check for updates</p>
            </div>
            <div className="col-5 col-md border-bottom py-2 py-md-3">
              <p className="fw-bold cardd-subtitle_bg-black">
                <TimeAgo modificationTimestamp={main_data.TimestampSql} />
              </p>
            </div>
            <div className="col-7 col-md border-bottom py-2 py-md-3">
              <p className="cardd-subtitle_bg-black">Property type</p>
            </div>
            <div className="col-5 col-md border-bottom py-2 py-md-3">
              <p className="fw-bold cardd-subtitle_bg-black">
                {main_data.TypeOwn1Out}
              </p>
            </div>
          </div>

          <div
            className={`row row-cols-2  row-cols-md-4 w-100 ${
              isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
            }`}
          >
            <div className="col-7 col-md border-bottom py-2 py-md-3">
              <p className="cardd-subtitle_bg-black">Style </p>
            </div>
            <div className="col-5 col-md border-bottom py-2 py-md-3">
              <p className="fw-bold cardd-subtitle_bg-black">
                {main_data.Style}
              </p>
            </div>
            <div className="col-7 col-md border-bottom py-2 py-md-3">
              <p className="cardd-subtitle_bg-black">Community</p>
            </div>
            <div className="col-5 col-md border-bottom py-2 py-md-3">
              <p className="fw-bold cardd-subtitle_bg-black">
                {main_data.Community}
              </p>
            </div>
          </div>

          <div
            className={`row row-cols-2  row-cols-md-4 w-100 ${
              isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
            }`}
          >
            <div className="col-7 col-md border-bottom border-sm   py-2 py-md-3">
              <p className="cardd-subtitle_bg-black">Lot size</p>
            </div>
            <div className="col-5 col-md border-bottom border-sm py-2 py-md-3">
              <p className="fw-bold cardd-subtitle_bg-black">
                {formatNumber(
                  (main_data.LotDepth * main_data.LotFront).toFixed(0)
                )}{' '}
                Sqft
              </p>
            </div>
            <div className="col-7 col-md border-bottom py-2 py-md-3">
              <p className="cardd-subtitle_bg-black">Garage spaces</p>
            </div>
            <div className="col-5 col-md border-bottom py-2 py-md-3">
              <p className="fw-bold cardd-subtitle_bg-black">
                {formatNumber(main_data.GarageSpaces)}
              </p>
            </div>
          </div>
          <p className="pty-description pt-4">{main_data.RemarksForClients}</p>
        </div>
      </div>

      {/*Home Overview  */}
      <div className={`${isMobileView ? 'pt-4 pb-4' : 'pt-4 pb-4'}`}>
        <div className="row row-cols-1 row-cols-md-2">
          <div className="col-md-12">
            <div className="container bg-light rounded-3 p-4 border-0">
              <h5 className="fw-bold cardd-title pb-4">Property Overview</h5>
              <div
                className={`row row-cols-2  row-cols-md-4 w-100 ${
                  isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
                }`}
              >
                <div className="col-7 col-md border-bottom py-2 py-md-3">
                  <p className="cardd-subtitle_bg-black">
                    Basement information
                  </p>
                </div>
                <div className="col-5 col-md border-bottom py-2 py-md-3">
                  <p className="fw-bold cardd-subtitle_bg-black">
                    {main_data?.Basement1
                      ? `${main_data?.Basement1}, ${main_data?.Basement2}`
                      : 'None'}
                  </p>
                </div>
                <div className="col-7 col-md border-bottom py-2 py-md-3">
                  <p className="cardd-subtitle_bg-black">Virtual tour</p>
                </div>
                <div className="col-5 col-md border-bottom py-2 py-md-3">
                  <p className="fw-bold cardd-subtitle_bg-black">
                    <a href={main_data.VirtualTourURL} target="_blank">
                      Tour Now
                    </a>
                  </p>
                </div>
              </div>

              <div
                className={`row row-cols-2  row-cols-md-4 w-100 ${
                  isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
                }`}
              >
                <div className="col-7 col-md border-bottom py-2 py-md-3">
                  <p className="cardd-subtitle_bg-black">Mls® #</p>
                </div>
                <div className="col-5 col-md border-bottom py-2 py-md-3">
                  <p className="fw-bold cardd-subtitle_bg-black">
                    {main_data.MLS}
                  </p>
                </div>
                <div className="col-7 col-md border-bottom py-2 py-md-3">
                  <p className="cardd-subtitle_bg-black">Building size</p>
                </div>
                <div className="col-5 col-md border-bottom py-2 py-md-3">
                  <p className="fw-bold cardd-subtitle_bg-black">
                    {main_data.ApproxSquareFootage}
                  </p>
                </div>
              </div>

              <div
                className={`row row-cols-2  row-cols-md-4 w-100 ${
                  isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
                }`}
              >
                <div className="col-7 col-md border-bottom py-2 py-md-3">
                  <p className="cardd-subtitle_bg-black">Status</p>
                </div>
                <div className="col-5 col-md border-bottom py-2 py-md-3">
                  <p className="fw-bold cardd-subtitle_bg-black">
                    {main_data.Status === 'A' ? 'Active' : 'In-Active'}
                  </p>
                </div>
                <div className="col-7 col-md border-bottom py-2 py-md-3">
                  <p className="cardd-subtitle_bg-black">Property sub type</p>
                </div>
                <div className="col-5 col-md border-bottom py-2 py-md-3">
                  <p className="fw-bold cardd-subtitle_bg-black">
                    {/* {main_data.PropertySubType} */}
                  </p>
                </div>
              </div>

              <div
                className={`row row-cols-2  row-cols-md-4 w-100 ${
                  isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
                }`}
              >
                <div className="col-7 col-md border-bottom py-2 py-md-3">
                  <p className="cardd-subtitle_bg-black">Taxes</p>
                </div>
                <div className="col-5 col-md border-bottom py-2 py-md-3">
                  <p className="fw-bold cardd-subtitle_bg-black">
                    {TaxAnnualAmount}
                  </p>
                </div>
                <div className="col-7 col-md border-bottom py-2 py-md-3">
                  <p className="cardd-subtitle_bg-black">Tax year</p>
                </div>
                <div className="col-5 col-md border-bottom py-2 py-md-3">
                  <p className="fw-bold cardd-subtitle_bg-black">
                    {main_data.TaxYear}
                  </p>
                </div>
              </div>

              <div
                className={`row row-cols-2  row-cols-md-4 w-100 ${
                  isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
                }`}
              >
                <div className="col-7 col-md border-bottom py-2 py-md-3">
                  <p className="cardd-subtitle_bg-black">Maintenance fee</p>
                </div>
                <div className="col-5 col-md border-bottom py-2 py-md-3">
                  <p className="fw-bold cardd-subtitle_bg-black">
                    {AssociationFee}
                  </p>
                </div>
                <div className="col-7 col-md border-bottom py-2 py-md-3">
                  <p className="cardd-subtitle_bg-black">Year built</p>
                </div>
                <div className="col-5 col-md border-bottom py-2 py-md-3">
                  <p className="fw-bold cardd-subtitle_bg-black">
                    {main_data.AssessmentYear || '--'}
                  </p>
                </div>
              </div>

              <div className="collapse" id="collapseExample">
                {/* Interior */}
                <h5 className="py-2 fw-bold pt-5">Interior</h5>
                <div
                  className={`row row-cols-2  row-cols-md-4 w-100 ${
                    isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
                  }`}
                >
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black"># total bathrooms</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data.Washrooms}
                    </p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black"># Full baths</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data.Washrooms}
                    </p>
                  </div>
                </div>

                <div
                  className={`row row-cols-2  row-cols-md-4 w-100 ${
                    isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
                  }`}
                >
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">
                      # of above grade bedrooms
                    </p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data.Bedrooms}
                    </p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black"># of rooms</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {Number(main_data.Rooms) + Number(main_data.RoomsPlus)}
                    </p>
                  </div>
                </div>

                <div
                  className={`row row-cols-2  row-cols-md-4 w-100 ${
                    isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
                  }`}
                >
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">
                      Family room available
                    </p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {Boolean(Number(main_data.FamilyRoom) > 0) ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">
                      Laundry information
                    </p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data.LaundryLevel}
                    </p>
                  </div>
                </div>

                {/* Exterior */}
                <h5 className="py-2 fw-bold pt-5">Exterior</h5>
                <div
                  className={`row row-cols-2  row-cols-md-4 w-100 ${
                    isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
                  }`}
                >
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">
                      Construction materials
                    </p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data.Exterior1}
                    </p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Other structures</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data.OtherStructures1}
                    </p>
                  </div>
                </div>

                <div
                  className={`row row-cols-2  row-cols-md-4 w-100 ${
                    isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
                  }`}
                >
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black"># garage spaces</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {formatNumber(main_data.GarageSpaces)}
                    </p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black"># parking spaces</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data.ParkingSpaces}
                    </p>
                  </div>
                </div>

                <div
                  className={`row row-cols-2  row-cols-md-4 w-100 ${
                    isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
                  }`}
                >
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Garage features</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data.GarageType}
                    </p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">
                      Has basement (y/n)
                    </p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data.Basement1 ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>

                <div
                  className={`row row-cols-2  row-cols-md-4 w-100 ${
                    isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
                  }`}
                >
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Has garage (y/n)</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data.GarageType ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Drive</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data.Drive}
                    </p>
                  </div>
                </div>

                {/* Amenities / Utilities */}
                <h5 className="py-2 fw-bold pt-5">Amenities / Utilities</h5>
                <div
                  className={`row row-cols-2  row-cols-md-4 w-100 ${
                    isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
                  }`}
                >
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Cooling</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data.AirConditioning}
                    </p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Heat source</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data?.HeatSource}
                    </p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Heat type</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data?.HeatType}
                    </p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Sewers</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data?.Sewers}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <h5 className="py-2 fw-bold pt-5">Location</h5>
                <div
                  className={`row row-cols-2  row-cols-md-4 w-100 ${
                    isMobileView ? 'flex-wrap' : 'flex-nowrap prp-gap'
                  }`}
                >
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Water source</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data.Water}
                    </p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Area</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data.Area}
                    </p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Community</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data.Community}
                    </p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">
                      Community features
                    </p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {getCommunityFeatures()}
                    </p>
                  </div>
                  <div className="col-7 col-md border-bottom py-2 py-md-3">
                    <p className="cardd-subtitle_bg-black">Directions</p>
                  </div>
                  <div className="col-5 col-md border-bottom py-2 py-md-3">
                    <p className="fw-bold cardd-subtitle_bg-black">
                      {main_data.DirectionsCrossStreets}
                    </p>
                  </div>
                </div>
              </div>
              {/* see more */}

              <div className="pt-3">
                <Collapse> </Collapse>
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default PropertyPage
