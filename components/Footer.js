'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { getCommercialData } from '@/actions/fetchCommercialActions'

const Footer = ({ cities }) => {
  const pathname = usePathname()

  if (pathname.startsWith('/admin')) {
    return <></>
  }
  return (
    <footer className="footer mt-5 shadow-lg">
      <div className="container-fluid footer-top">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-about">
            <Link href="/" className="logo d-flex align-items-center pb-2">
              <span className="fs-1 text-dark">Dolphy</span>
            </Link>

            <p className="me-md-5 pe-md-5">
              Dolphy, your top destination for resale properties in Ontario.
              1000+ resale townhomes, detached & condos available at Dolphy. The
              content of the pages of this website is for your general
              information, reference only. We are not liable for the use or
              misuse of the site's information. Prices, sizes, specifications,
              and promotions of the condos are subject to change by the builder
              without notice. E&OE
            </p>
            <div className="social-links d-flex mt-4">
              <Link href="#" className="me-2">
                <i className="bi bi-twitter"></i>
              </Link>
              <Link href="#" className="me-2">
                <i className="bi bi-facebook"></i>
              </Link>
              <Link href="#" className="me-2">
                <i className="bi bi-instagram"></i>
              </Link>
              <Link href="#" className="me-2">
                <i className="bi bi-linkedin"></i>
              </Link>
            </div>
          </div>

          <div className="col-12 col-lg-4 col-6 footer-links">
            <h4>Properties in Onatrio</h4>
            <ul>
              {cities &&
                cities.map((city) => (
                  <li key={city.id} className="footerlinks">
                    <Link href={`/pre-construction-homes/${city.slug}`}>
                      <span>New construction condos in {city.name}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div className="col-lg-3 col-md-12 footer-contact text-start text-md-start">
            <h4>Contact Dolphy</h4>
            <p>Dolphy Inc.</p>
            <p>8300 Woodbine Ave ste 500,Markham, ON L3R 9Y7</p>
            <p>Office Hours ⋅ 9AM - 6 PM</p>
            <p className="mt-4">
              <strong>Phone: </strong>
              <Link href="tel:6476745958" className="text-dark">
                647 527 4970
              </Link>
            </p>
            <p>
              <strong>Email: </strong>
              <Link href="mailto:hello@dolphy.ca" className="text-dark">
                hello@dolphy.ca
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="container copyright text-start text-md-center mt-4">
        <p>
          ©2023 <span>Copyright</span>{' '}
          <strong className="px-1">Dolphy Inc.</strong>{' '}
          <span>All Rights Reserved</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
