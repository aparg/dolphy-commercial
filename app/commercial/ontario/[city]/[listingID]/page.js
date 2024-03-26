import React from "react";
import dynamic from "next/dynamic";
import Gallery from "@/components/reso/Gallery";
import Link from "next/link";
import { commercial } from "@/api/routes";
import { generateImageURLs } from "@/helpers/generateImageURLs";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import { getCommercialData } from "@/actions/fetchCommercialActions";
import BookShowingForm from "@/components/BookShowingForm";
import MortgageCalculator from "@/components/reso/MortgageCalculator";

const Map = dynamic(() => import("@/components/reso/Map"), { ssr: false });

import AdditionalListing from "@/components/reso/AdditionalListing";
import PropertyPage from "@/components/reso/propertyPage";

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 10;

const page = async ({ params }) => {
  const city = params.city;
  const formattedSlug = capitalizeFirstLetter(city);
  const listingID = params.listingID;
  const options = {
    method: "GET",
  };

  const urlToFetchMLSDetail = commercial.properties.replace(
    "$query",
    `?$select=MLS='${listingID}'`
  );

  const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
  const data = await resMLSDetail.json();
  const main_data = data.results[0]; //always a single object inside the array

  const newSalesData = await getCommercialData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    formattedSlug,
    main_data?.TypeOwnSrch
  );

  const imageURLs = generateImageURLs(listingID);

  const address = `${main_data?.Street} ${main_data.StreetName} ${main_data.StreetAbbreviation}`;

  return (
    <>
      <div className="container-fluid pt-md-3 pt-0">
        <div className="container-fluid pt-3 pt-md-5">
          <nav
            style={{
              "--bs-breadcrumb-divider":
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z' fill='%236c757d'/%3E%3C/svg%3E\")",
            }}
            aria-label="breadcrumb"
          >
            <ol className="breadcrumb  ps-2">
              <li className="breadcrumb-item ">
                <Link href="/">Dolphy</Link>
              </li>
              <li className="breadcrumb-item ">
                <Link href="/commercial/ontario">ON</Link>
              </li>
              <li className="breadcrumb-item ">
                <Link href={`/commercial/ontario/${city}/`}>
                  {main_data.Municipality}
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {address}
              </li>
            </ol>
          </nav>
          <Gallery data={imageURLs} />
        </div>

        <section className="padding-top flex items-center w-full text-sm">
          <div className="padding-top flex items-center w-full">
            <div
              className={`mx-auto row justify-between gap-0 w-full md:max-w-[80%]`}
            >
              <div className="col-md-8">
                <PropertyPage {...{ main_data }} />
                <div className="z-20 relative my-4">
                  <h3 className="main-title fs-2 aff2">Map View</h3>
                  <Map main_data={main_data} />
                </div>
                <div>
                  <MortgageCalculator price={main_data?.ListPrice} />
                </div>
              </div>

              <div className="col col-md-4 ps-md-2 pt-5 pt-md-0" id="contact">
                <BookShowingForm
                  defaultmessage={`Please book a showing for this property "${address}"`}
                  city={main_data.Municipality}
                ></BookShowingForm>
              </div>
            </div>
          </div>
        </section>

        <section className="additonal__listing md:max-w-[75%] mx-auto">
          <AdditionalListing
            city={formattedSlug}
            newSalesData={newSalesData}
            listingType={main_data?.TypeOwn1Out}
          />
        </section>
      </div>
    </>
  );
};

export default page;