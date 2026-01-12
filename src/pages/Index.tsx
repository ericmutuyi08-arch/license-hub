import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import HotDealsSection from '@/components/home/HotDealsSection';
import CategorySection from '@/components/home/CategorySection';
import FeaturedSection from '@/components/home/FeaturedSection';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>GiftCard Pro - Premium Gift Cards | Instant Digital Delivery</title>
        <meta name="description" content="Shop premium gift cards from top brands. Instant digital delivery or physical cards shipped free. Amazon, Apple, Steam, Netflix, and 50+ more brands." />
      </Helmet>
      <Layout>
        <HeroSection />
        <HotDealsSection />
        <CategorySection />
        <FeaturedSection />
      </Layout>
    </>
  );
};

export default Index;
