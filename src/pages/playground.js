import React from 'react';
import { graphql } from "gatsby"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import Image from "gatsby-image"

export default ({data}) => {
    console.log(data.file.childImageSharp.fluid)
    return <Layout>
    <h2>Playground</h2>
    <Image
        fluid={data.file.childImageSharp.fluid}
        tracedSVG={true}
      />
</Layout>
}

export const query = graphql`
query {
    file(relativePath: {eq: "first.jpg" }){
      relativePath
      childImageSharp {
        fluid{
            ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`