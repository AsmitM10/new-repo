"use client";

// When someone lands on /<slug> we'll serve the regular landing page
// The JoinFormSection component already looks at `window.location.pathname` and
// sets the referral information. So this simple wrapper is enough.

import FitnessLanding from "../page";

export default function ReferralPage({ params }: { params: { slug: string } }) {
  // params.slug could be used for server-side fetching if needed later
  return <FitnessLanding />;
}
