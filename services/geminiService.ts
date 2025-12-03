import { ProtestData, GeneratedEmail, ConcernType } from '../types';

const SUBJECTS = [
  "Opposition to Proposed Datacenter Development",
  "Vote NO on the Neighborhood Datacenter Project",
  "Urgent Concerns: Protect Round Rock from Datacenter Development",
  "Resident Feedback: Opposition to Datacenter near [Neighborhood]",
  "Protect Round Rock: Concerns regarding new development",
  "Formal Opposition to Datacenter Construction"
];

const INTROS = [
  "My name is [Name], and I am a resident of [Neighborhood]. I am writing to formally express my strong opposition to the proposed datacenter development in our area.",
  "As a dedicated member of the [Neighborhood] community, I, [Name], am reaching out to urge the City Council to reconsider the approval of the massive datacenter project proposed for our area.",
  "I am writing to you today as [Name], a concerned homeowner in [Neighborhood]. I wish to share my deep reservations regarding the industrial datacenter planned for our residential community.",
  "Please accept this letter from [Name], a resident of [Neighborhood], regarding the severe negative impact the proposed datacenter development will have on our quality of life and property."
];

const OUTROS = [
  "Thank you for your time and service to our community. I trust you will make the right decision to protect the character of Round Rock.",
  "Please prioritize the well-being and safety of your constituents over industrial expansion. We urge you to vote against this proposal.",
  "I look forward to your response and hope you will stand with the residents of Round Rock to stop this incompatible development.",
  "Protecting our established neighborhoods should be the council's top priority. Please deny the permits for this facility."
];

const SIGN_OFFS = [
  "Sincerely,",
  "Respectfully,",
  "Thank you,",
  "Best regards,",
  "With concern,"
];

const CONCERN_VARIANTS: Record<ConcernType, string[]> = {
  [ConcernType.NOISE]: [
    "The constant hum of cooling fans and HVAC systems associated with datacenters is known to travel for miles. This 24/7 industrial noise will destroy the peace and quiet of our residential neighborhood.",
    "I am deeply concerned about noise pollution. Mitigation walls are often insufficient to block the low-frequency drone of thousands of servers, which can lead to sleep disturbance and long-term health issues for nearby residents.",
    "Our community relies on a quiet environment. Introducing a facility that generates constant mechanical noise violates our right to quiet enjoyment of our homes and disrupts the local soundscape.",
    "Studies show that datacenter noise is intrusive and relentless. Allowing such a facility near homes is incompatible with the residential character of our area and unfair to families living nearby."
  ],
  [ConcernType.WATER]: [
    "Datacenters consume millions of gallons of water for cooling. In a drought-prone state like Texas, diverting such massive amounts of water from our local aquifer is irresponsible and dangerous for our long-term sustainability.",
    "I fear that this facility will put undue strain on Round Rock's water resources. We should be prioritizing water conservation for residents and essential services, not expending it on industrial cooling towers.",
    "The proposed water usage for this site rivals that of thousands of households. This creates a significant risk to our water security, especially during summer months when our reservoirs are already low.",
    "With water restrictions becoming common, it is unjust to approve a facility that will guzzle precious potable water while residents are asked to conserve. This is an inequitable use of our shared resources."
  ],
  [ConcernType.PROPERTY_VALUE]: [
    "Industrial developments adjacent to residential zones historically drive down property values. I am concerned that the sight and sound of this facility will make our homes less desirable to future buyers.",
    "This project threatens our financial security. Prospective buyers will likely be deterred by the proximity of a massive data warehouse, lowering the resale value of our homes and damaging our investment.",
    "We invested in this neighborhood for its residential appeal. A massive industrial complex next door undermines that value, changes the character of the community, and makes it harder to sell our homes.",
    "Real estate data suggests that industrial encroachment negatively impacts home prices. We should not have to bear the financial cost of this development through the depreciation of our assets."
  ],
  [ConcernType.POWER_GRID]: [
    "The Texas power grid is already fragile. Adding a facility that consumes as much electricity as a small city increases the risk of local brownouts and blackouts, putting vulnerable residents at risk.",
    "I am worried about the strain this will place on our electrical infrastructure. Residents should not have to compete with a server farm for reliable power during peak usage times or extreme weather events.",
    "This facility's energy demand is staggering. It puts unnecessary pressure on our substation and could lead to increased utility rates for families to subsidize the infrastructure upgrades needed for the datacenter.",
    "Prioritizing the massive energy needs of a datacenter over the reliability of the grid for homes and essential services is a mistake. Our grid should serve people first, not servers."
  ],
  [ConcernType.TRAFFIC]: [
    "The construction phase alone will bring heavy trucks and machinery through our streets, creating safety hazards for our children, damaging our roads, and increasing noise and dust.",
    "Our local roads are not designed for industrial traffic. The congestion caused by construction crews and maintenance vehicles will create a bottleneck for residents trying to get to work and school.",
    "I am concerned about emergency vehicle access being impeded by the increased traffic flow associated with this development. Seconds matter in an emergency, and added congestion is a risk we cannot take.",
    "The ingress and egress for such a large facility will disrupt traffic patterns and create dangerous conditions at intersections near our homes. The proposed infrastructure improvements are insufficient to handle this load."
  ],
  [ConcernType.ZONING]: [
    "This land is ill-suited for heavy industrial use. Spot-zoning it for a datacenter violates the spirit of our city's comprehensive plan to keep industry away from homes and preserve residential integrity.",
    "We need development that complements our neighborhood, like retail or parks, not a massive concrete server farm that belongs in a dedicated industrial park far from families.",
    "Approving this project sets a dangerous precedent for allowing industrial creep into residential areas. We must uphold zoning standards to protect our quality of life and preventing incompatible land uses.",
    "The proposed buffer zones are insufficient. Placing a high-intensity industrial facility right next to a bedroom community is poor urban planning that disregards the well-being of existing residents."
  ]
};

const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

export const generateProtestEmail = async (data: ProtestData): Promise<GeneratedEmail> => {
  // Simulate a small delay for better UX (so the loader shows for a split second)
  await new Promise(resolve => setTimeout(resolve, 600));

  let subject = getRandom(SUBJECTS).replace("[Neighborhood]", data.neighborhood);
  
  let intro = getRandom(INTROS)
      .replace("[Name]", data.name)
      .replace("[Neighborhood]", data.neighborhood);

  let bodyParts = ["Dear Mayor and City Council Members,", intro];

  data.concerns.forEach(concern => {
      const variants = CONCERN_VARIANTS[concern as ConcernType];
      if (variants) {
          bodyParts.push(getRandom(variants));
      }
  });

  let outro = getRandom(OUTROS);
  bodyParts.push(outro);

  // Add signature block
  const signOff = getRandom(SIGN_OFFS);
  const signature = `${signOff}\n${data.name}\n${data.neighborhood}`;
  bodyParts.push(signature);

  const body = bodyParts.join("\n\n");

  return {
      subject,
      body
  };
};