import Benefits from "@/components/landing/Benefits"
import HeaderSection from "@/components/landing/HeaderSection"

export default function BenefitsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div
        className="relative"
        style={{
          background:
            "linear-gradient(180deg, #C3F7EF 0%, #CBFAF1 11.63%, #D7FAF4 23.25%, #DCFBF5 31.56%, #E1FBF7 39.87%, #E6FCF8 55.48%, #EBFCFA 71.08%, #F0FDFB 85.54%, #F5TEFC 92.77%, #FFFFFF 100%)",
        }}
      >
        <HeaderSection />
      </div>
      <div className="bg-white py-16">
        <Benefits />
      </div>
    </div>
  )
}
