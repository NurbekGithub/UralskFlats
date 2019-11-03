import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { useFirestoreCollection } from "../hooks/firestore"

const IndexPage = () => {
  const flats = useFirestoreCollection("flats")
  console.log({ flats })
  return (
    <Layout>
      <SEO title="Home" />
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
