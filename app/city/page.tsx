import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import CheapFlights from "@/components/CheapFlights";

async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return (
    <>
      <SiteHeader />
      <CheapFlights city={slug} />
      <SiteFooter />
    </>
  );
}
export default page;
