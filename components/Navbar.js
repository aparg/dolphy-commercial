"use client";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "@/components/reso/SearchBar";

const Navbar = (props) => {
  const [isSticky, setIsSticky] = useState(false);
  const [hidden, setHidden] = useState(true);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <></>;
  }

  const isHomePage = useMemo(() => {
    return pathname === "/";
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 0);
    };
    // Add event listener to scroll event
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // return (
  //   <div
  //     className={`navbar-transparent sticky-top overflow-hidden ${
  //       isSticky ? "bg-white shadow-md" : "bg-transparent"
  //     }`}
  //   >
  //     <nav className="navbar navbar-expand-md py-2 flex items-center">
  //       <div className={`container-fluid mx-md-5 mx-0`}>
  //         <Link href="/" className="logo d-flex align-items-center ">
  //           <span
  //             className={`fs-1 ${
  //               !isHomePage || isSticky ? "text-black" : "text-white"
  //             }`}
  //           >
  //             Dolphy
  //           </span>
  //         </Link>

  //         {!isHomePage || isSticky ? (
  //           <div className="input-group input-group-search me-2 me-md-0">
  //             <SearchBar />
  //             <button
  //               className="input-group-text btn bg-light2 bg-lh mybtn d-block py-search"
  //               type="button"
  //               aria-label="Search Button"
  //             >
  //               <svg
  //                 aria-hidden="true"
  //                 className="svg"
  //                 viewBox="0 0 30 30"
  //                 xmlns="http://www.w3.org/2000/svg"
  //                 height="22"
  //                 width="22"
  //               >
  //                 <path
  //                   d="M20.756 18.876l6.155 6.154-1.88 1.881-6.155-6.155A9.269 9.269 0 0 1 13.3 22.61a9.31 9.31 0 1 1 9.31-9.31c0 2.091-.69 4.021-1.854 5.576zM13.3 19.95a6.65 6.65 0 1 0 0-13.3 6.65 6.65 0 0 0 0 13.3z"
  //                   fill="#000000"
  //                 ></path>
  //               </svg>
  //             </button>
  //           </div>
  //         ) : null}

  //         <button
  //           className="navbar-toggler d-lg-none"
  //           type="button"
  //           data-bs-toggle="collapse"
  //           data-bs-target="#collapsibleNavId"
  //           aria-controls="collapsibleNavId"
  //           aria-expanded="false"
  //           aria-label="Toggle navigation"
  //         >
  //           <span className="navbar-toggler-icon"></span>
  //         </button>
  //         <div className="collapse navbar-collapse z-50" id="collapsibleNavId">
  //           <ul
  //             className={`navbar-nav ms-auto mt-2 mt-lg-0 flex justify-content-center text-white ${
  //               !isHomePage || isSticky ? "text-black" : "text-white"
  //             }`}
  //           >
  //             <li className="nav-item">
  //               <a
  //                 className={`nav-link hover:text-black ${
  //                   !isHomePage || isSticky ? "text-black" : "text-white"
  //                 }`}
  //                 href="#"
  //               >
  //                 Latest Projects
  //               </a>
  //             </li>
  //             {/* <li className="nav-item dropdown">
  //             <a
  //               className="nav-link dropdown-toggle active fw-bold"
  //               href="#"
  //               id="dropdownId"
  //               data-bs-toggle="dropdown"
  //               aria-haspopup="true"
  //               aria-expanded="false"
  //             >
  //               Top Cities
  //             </a>
  //             <div className="dropdown-menu" aria-labelledby="dropdownId">
  //               {cities &&
  //                 cities.map((city) => (
  //                   <Link
  //                     className="dropdown-item"
  //                     href={`/pre-construction-homes/${city.slug}`}
  //                     key={city.id}
  //                   >
  //                     {city.name}
  //                   </Link>
  //                 ))}
  //             </div>
  //           </li> */}

  //             {/* <li className="nav-item dropdown dropdown-fullwidth">
  //             <button
  //               className="nav-link dropdown-toggle show"
  //               href="#"
  //               data-bs-toggle="dropdown"
  //               aria-haspopup="true"
  //               aria-expanded="true"
  //             >
  //               Top Cities
  //             </button>
  //             <div
  //               className="dropdown-menu dropdown-menu-end show"
  //               data-bs-popper="static"
  //             >
  //               <div className="row p-4">
  //                 <div className="col-12 col-sm-6 col-md-3 mb-3">
  //                   <h6 className="mb-2 fw-mine fs-4">Toronto</h6>
  //                   <ul className="list-unstyled">
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         Alfie Condos
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         Temple Condos
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         Temple Condos
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         Maison Wellesley Condos
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         400 Front Street Condos
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a
  //                         className="dropdown-item d-flex align-items-center mt-4"
  //                         href="#"
  //                       >
  //                         View All
  //                         <i className="bi bi-arrow-right ms-1"></i>
  //                       </a>
  //                     </li>
  //                   </ul>
  //                 </div>
  //                 <div className="col-12 col-sm-6 col-md-3 mb-3">
  //                   <h6 className="mb-2 fw-mine fs-4">Calgary</h6>
  //                   <ul className="list-unstyled">
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         Myne Condos
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         Cornerview Towns
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         Novella 2 Townhomes
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         Highgate Condos
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         Metroside Condos
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a
  //                         className="dropdown-item d-flex align-items-center mt-4"
  //                         href="#"
  //                       >
  //                         View All
  //                         <i className="bi bi-arrow-right ms-1"></i>
  //                       </a>
  //                     </li>
  //                   </ul>
  //                 </div>
  //                 <div className="col-12 col-sm-6 col-md-3 mb-3">
  //                   <h6 className="mb-2 fw-mine fs-4">Brampton</h6>
  //                   <ul className="list-unstyled">
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         Honeystone House
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         Bramalea Square Condos
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         Bodhi Towns
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         Arbor West Homes
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         Boutin Tower
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a
  //                         className="dropdown-item d-flex align-items-center mt-4"
  //                         href="#"
  //                       >
  //                         View All
  //                         <i className="bi bi-arrow-right ms-1"></i>
  //                       </a>
  //                     </li>
  //                   </ul>
  //                 </div>
  //                 <div className="col-12 col-sm-6 col-md-3 mb-3">
  //                   <h6 className="mb-2 fw-mine fs-4">Mississauga</h6>
  //                   <ul className="list-unstyled">
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         Whitehorn Wood Towns
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         M6 Condos
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         The Southland Condos
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         MW Condos
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a className="dropdown-item" href="#">
  //                         Canopy Towers 2
  //                       </a>
  //                     </li>
  //                     <li>
  //                       <a
  //                         className="dropdown-item d-flex align-items-center mt-4"
  //                         href="#"
  //                       >
  //                         View All
  //                         <i className="bi bi-arrow-right ms-1"></i>
  //                       </a>
  //                     </li>
  //                   </ul>
  //                 </div>
  //                 <div className="col-12">
  //                   <div
  //                     className="alert alert-success bg-lightyellow alert-dismissible fade show mt-2 mb-0 rounded-3 d-flex justify-content-sm-between align-items-sm-center flex-column flex-sm-row justify-content-start align-items-start gap-3"
  //                     role="alert"
  //                   >
  //                     <div>
  //                       Top Featured : Niagara Joy Towns Coming Soon
  //                       <a href="#" className="text-dark fw-bld ms-3">
  //                         Join Event Now
  //                         <span className="ms-2"></span>
  //                         <i className="bi bi-arrow-right"></i>
  //                       </a>
  //                     </div>
  //                     <button className="btn btn-call">
  //                       Explore all cities
  //                     </button>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </li> */}
  //             <li className="nav-item">
  //               <a
  //                 className={`nav-link hover:text-black ${
  //                   !isHomePage || isSticky ? "text-black" : "text-white"
  //                 }`}
  //                 href="#"
  //               >
  //                 Cities
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a
  //                 className={`nav-link hover:text-black ${
  //                   !isHomePage || isSticky ? "text-black" : "text-white"
  //                 }`}
  //                 href="#"
  //               >
  //                 Blogs
  //               </a>
  //             </li>
  //             <li className="nav-item">
  //               <a
  //                 className={`nav-link hover:text-black ${
  //                   !isHomePage || isSticky ? "text-black" : "text-white"
  //                 }`}
  //                 href="#"
  //               >
  //                 Contact
  //               </a>
  //             </li>
  //             <li className={`nav-item flex items-center`}>
  //               <Link
  //                 href="tel:6476745958"
  //                 className={`p-2 call-btn ${
  //                   !isHomePage || isSticky ? "text-dark" : "text-light"
  //                 } ${isSticky && "hover-black"}`}
  //               >
  //                 Call : 647 527 4970
  //               </Link>
  //             </li>
  //           </ul>
  //         </div>
  //       </div>
  //     </nav>
  //   </div>
  // );
  return (
    <header
      className={`pb-6 lg:pb-0 relative z-50 ${
        isSticky && "bg-white sticky top-0"
      }`}
    >
      <div
        className={`px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ${
          isSticky && "sticky"
        }`}
      >
        <nav className={`flex items-center justify-between h-16 lg:h-20`}>
          <div className="flex-shrink-0">
            <Link href="/" className="logo d-flex align-items-center ">
              <span className="fs-1">Dolphy </span>
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
            onClick={() => setHidden(!hidden)}
          >
            <svg
              className="block w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 8h16M4 16h16"
              />
            </svg>

            <svg
              className="hidden w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
            <Link
              href="#"
              title=""
              className={`text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 ${
                isHomePage && !isSticky && "lg:text-white"
              }`}
            >
              {" "}
              Latest Projects{" "}
            </Link>

            <Link
              href="#"
              title=""
              className={`text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 ${
                isHomePage && !isSticky && "lg:text-white"
              }`}
            >
              {" "}
              Cities{" "}
            </Link>

            <Link
              href="#"
              title=""
              className={`text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 ${
                isHomePage && !isSticky && "lg:text-white"
              }`}
            >
              {" "}
              Blogs{" "}
            </Link>

            <Link
              href="#"
              title=""
              className={`text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600 ${
                isHomePage && !isSticky && "lg:text-white"
              }`}
            >
              {" "}
              Contact{" "}
            </Link>
          </div>

          <Link
            href="tel:6476745958"
            title=""
            className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700"
            role="button"
          >
            {" "}
            Call : 647 527 4970{" "}
          </Link>
        </nav>

        <nav
          className={`pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md ${
            hidden && "hidden"
          } lg:hidden`}
        >
          <div className="flow-root">
            <div className="flex flex-col px-6 -my-2 space-y-1">
              <Link
                href="#"
                title=""
                className={`inline-flex py-2 text-base font-medium transition-all duration-200 hover:text-blue-600 focus:text-blue-600 text-black lg:text-white`}
              >
                {" "}
                Latest Projects{" "}
              </Link>

              <Link
                href="#"
                title=""
                className={`inline-flex py-2 text-base font-medium transition-all duration-200 hover:text-blue-600 focus:text-blue-600 text-black `}
              >
                {" "}
                Cities{" "}
              </Link>

              <Link
                href="#"
                title=""
                className={`inline-flex py-2 text-base font-medium transition-all duration-200 hover:text-blue-600 focus:text-blue-600 text-black `}
              >
                {" "}
                Blogs{" "}
              </Link>

              <Link
                href="#"
                title=""
                className={`inline-flex py-2 text-base font-medium transition-all duration-200 hover:text-blue-600 focus:text-blue-600 text-black `}
              >
                {" "}
                Contact{" "}
              </Link>
            </div>
          </div>

          <div className="px-6 mt-6">
            <Link
              href="tel:6476745958"
              title=""
              className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md tems-center hover:bg-blue-700 focus:bg-blue-700"
              role="button"
            >
              Call : 647 527 4970
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
