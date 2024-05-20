import React from "react";
import dynamic from "next/dynamic";
import Gallery from "@/components/reso/Gallery";
import Link from "next/link";
import { commercial } from "@/api/routes";
import { generateImageURLs } from "@/helpers/generateImageURLs";
import { capitalizeFirstLetter } from "@/helpers/capitalizeFIrstLetter";
import { getCommercialData } from "@/actions/fetchCommercialActions";
import BookShowingForm from "@/components/BookShowingForm";
// import MortgageCalculator from "@/components/reso/MortgageCalculator";
import { Resend } from "resend";

const Map = dynamic(() => import("@/components/reso/Map"), { ssr: false });

import AdditionalListing from "@/components/reso/AdditionalListing";
import PropertyPage from "@/components/reso/propertyPage";
import { generateURL } from "@/helpers/generateURL";
import BookingDateOption from "@/components/BookingDateOption";
import BookingDate from "@/components/BookingDate";
import { Image } from "react-bootstrap";
// import { Button } from "@nextui-org/react";

const INITIAL_OFFSET = 0;
const INITIAL_LIMIT = 10;

const fetchData = async (listingID) => {
  const options = {
    method: "GET",
  };
  const urlToFetchMLSDetail = commercial.properties.replace(
    "$query",
    `?$select=MLS='${listingID}'`
  );

  const resMLSDetail = await fetch(urlToFetchMLSDetail, options);
  const data = await resMLSDetail.json();
  return data.results[0];
};

const page = async ({ params }) => {
  const city = params.city;
  const formattedSlug = capitalizeFirstLetter(city);
  const parts = params.listingID.split("-");
  const lastPart = parts[parts.length - 1];
  const listingID = lastPart;

  const main_data = await fetchData(listingID); //always a single object inside the array

  const resend = new Resend("re_EwHkJKn7_BqC3Jj57KVoFXeELa5b74Qhd");

  const newSalesData = await getCommercialData(
    INITIAL_OFFSET,
    INITIAL_LIMIT,
    formattedSlug,
    main_data?.TypeOwnSrch
  );

  const imageURLs = generateImageURLs(listingID);

  // const address = `${main_data?.Street} ${main_data?.StreetName} ${main_data?.StreetAbbreviation}`;
  const address = [
    main_data?.Street,
    main_data?.StreetName,
    main_data?.StreetAbbreviation,
  ]
    .filter(Boolean)
    .join(" ");
  const sendEmail = async (content) => {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["apargtm@gmail.com"],
      subject: "Hello world",
      react: `<p>${content}</p>`,
    });
    if (error) console.log(error.message);
    console.log(data, error);
  };

  return (
    <>
      <div className="fixed w-100 bottom-0 flex justify-between items-center sm:bottom-5 sm:hidden px-3 py-4 z-[999] bg-white border-top shadow-lg w-screen">
        {/* <Link
          href="#contact"
          className="btn btn-md w-full bg-primary-green shadow-2xl text-white shadow-md rounded-pill"
        >
          Book a showing
        </Link> */}
        <div
          className={`min-w-[50px] inline-flex items-center justify-center bg-[#3a88ef]/[0.08] hover:bg-[#3a88ef]/[0.2] rounded-md leading-7 py-[6px] px-[15px] text-md mx-1`}
        >
          <Image className="pr-1 w-5" src="/mailOutline.svg" alt="Email" />
          Email
        </div>
        <div
          className={`min-w-[70px] inline-flex items-center justify-center bg-[#ffedea]/[0.5] hover:bg-[#ffdad4]/[0.8] rounded-md leading-7 py-[6px] px-[15px] text-md mx-1`}
        >
          <Image className="pr-1 w-5" src="/phone.svg" alt="Phone" />
          Phone
        </div>
        <div
          className={`min-w-[70px] inline-flex items-center justify-center bg-[#43bb3f]/[0.1] hover:bg-[#43bb3f]/[0.2] rounded-md leading-7 py-[6px] px-[15px] text-md mx-1`}
        >
          <Image className="pr-1 w-5" src="/whatsapp.svg" alt="whatsapp" />
          Whatsapp
        </div>
      </div>
      <div className="mx-2 sm:mx-40">
        {/* <button className="fixed w-full text-white text-2xl sm:text-xl bottom-2 sm:bottom-5 sm:hidden p-6 z-[999]">
        <Link
          href="#contact"
          className="bg-primary-green rounded-md shadow-2xl px-[50px] sm:px-[100px] py-3 sm:py-5 text-white shadow-md"
        >
          Book a showing
        </Link>
      </button> */}

        <div className="pt-md-3 pt-0 ">
          <div className="pt-3 pt-md-5">
            <div className="fixed-breadcrumbs">
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
                    <Link href="/ontario">ON</Link>
                  </li>
                  <li className="breadcrumb-item ">
                    <Link href={generateURL({ cityVal: city })}>
                      {main_data.Municipality}
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {address}
                  </li>
                </ol>
              </nav>
            </div>
            <Gallery data={imageURLs} />
          </div>

          <section className="w-full padding-top flex items-center justify-center w-full text-sm">
            {/* <div className="padding-top flex items-center w-full"> */}
            <div className={`row justify-between w-full`}>
              <div className="col-md-8">
                <PropertyPage {...{ main_data }} />
                <BookingDate bannerImage={imageURLs[0]} />
                <div className="z-20 relative mt-24">
                  <h2 className="font-extrabold pb-3 text-lg sm:text-4xl">
                    Map View
                  </h2>
                  <Map main_data={main_data} />
                </div>
              </div>

              <div className="col col-md-4 ps-md-2 pt-5 pt-md-0" id="contact">
                <BookShowingForm
                  defaultmessage={`Please book a showing for this property "${address}"`}
                  city={main_data.Municipality}
                ></BookShowingForm>
              </div>
            </div>
            {/* </div> */}
          </section>

          {formattedSlug && (
            <section className="additonal__listing mt-24 sm:mt-52">
              <AdditionalListing
                city={formattedSlug}
                newSalesData={newSalesData}
                listingType={main_data?.Use}
              />
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default page;

export async function generateMetadata({ params }, parent) {
  const parts = params.listingID.split("-");
  const lastPart = parts[parts.length - 1];
  const listingID = lastPart;
  const main_data = await fetchData(listingID);
  const imageURLs = generateImageURLs(listingID);
  return {
    ...parent,
    alternates: {
      // canonical: `https://dolphy.ca/pre-construction-homes/${params.city}/${params.slug}`,
    },
    openGraph: {
      images: await fetch(imageURLs[0]),
    },
    title: `${main_data?.Street} ${main_data?.StreetName} ${main_data?.StreetAbbreviation}`,
    description: `${parseInt(main_data?.TotalArea).toFixed(0)}.
    ${main_data?.TotalAreaCode}.${main_data?.TypeOwn1Out}.${
      main_data?.Municipality
    }`,
  };
}
