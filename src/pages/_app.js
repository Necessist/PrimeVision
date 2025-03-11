import Layout from "$dev/components/Layout";
import "$dev/styles/global.css";
import { DefaultSeo } from "next-seo";

import SEO from '$dev/seo.config'

const PrimeVision = ({ Component, pageProps }) => {
  return (
    <>
          <DefaultSeo {...SEO} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default PrimeVision;
