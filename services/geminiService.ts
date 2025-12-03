import { GoogleGenAI, Type } from "@google/genai";
import { ProtestData, GeneratedEmail, ConcernType } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Variations to ensure uniqueness and avoid spam filters/throttling
const VARIATIONS: Record<string, string[]> = {
  [ConcernType.NOISE]: [
    "I am deeply worried about the constant 24/7 hum from cooling fans disturbing our peace.",
    "The noise levels from such a large facility will degrade the quiet nature of our residential neighborhood.",
    "Studies show datacenter noise can be heard for miles; we do not want this industrial soundscape.",
    "Our property rights include the right to quiet enjoyment, which this noise pollution threatens.",
    "A constant mechanical drone is incompatible with a family-friendly community.",
    "I am concerned about the health impacts of low-frequency noise from the generators and HVAC systems.",
    "Mitigation walls are often insufficient to block the sound of thousands of servers running.",
    "Please consider the auditory impact on local wildlife and pets, not just residents."
  ],
  [ConcernType.WATER]: [
    "Our local aquifer cannot support the millions of gallons of water required for cooling.",
    "In a drought-prone state like Texas, wasting water on servers is irresponsible.",
    "I fear this will lead to water rationing for residents while the datacenter consumes freely.",
    "The water usage of this facility rivals that of thousands of homes.",
    "We should prioritize water for living communities, not industrial data processing.",
    "Evaporative cooling releases chemicals and consumes precious potable water.",
    "Round Rock's water resources are already strained; this adds unnecessary pressure.",
    "Future water security is my top priority, and this project jeopardizes it."
  ],
  [ConcernType.PROPERTY_VALUE]: [
    "Industrial facilities next to homes historically lower property resale values.",
    "I am concerned my home investment will depreciate due to the unsightly view.",
    "Potential buyers will be deterred by the noise and industrial presence.",
    "This changes the character of the neighborhood, reducing its desirability.",
    "We bought here for the residential atmosphere, which this destroys.",
    "Real estate studies show proximity to datacenters can negatively impact home prices.",
    "Nobody wants to live next to a massive concrete warehouse.",
    "This development undermines the premium we paid for this location."
  ],
  [ConcernType.POWER_GRID]: [
    "The Texas grid is fragile; adding a massive load like this is risky.",
    "We experienced blackouts recently; a datacenter will only compete for scarce electricity.",
    "Residential rates might hike due to the infrastructure upgrades needed for this facility.",
    "Prioritize keeping the lights on for homes over powering servers.",
    "The energy consumption of this site equals that of a small city.",
    "I worry about brownouts during peak summer heat if this comes online.",
    "This puts strain on our local substation and transmission lines.",
    "Sustainable energy usage should be a prerequisite, and this project lacks it."
  ],
  [ConcernType.TRAFFIC]: [
    "Construction traffic will damage our local roads and cause congestion.",
    "Heavy trucks during the build phase pose a safety risk to our children.",
    "Our streets are not designed for industrial heavy equipment transport.",
    "Maintenance crews and deliveries will create constant traffic flow issues.",
    "Emergency vehicle access could be impeded by construction congestion.",
    "The ingress/egress points are too close to residential driveways.",
    "We already struggle with rush hour; this will exacerbate the bottleneck.",
    "Road wear and tear will fall on the taxpayers to fix."
  ],
  [ConcernType.ZONING]: [
    "This land was intended for mixed-use or residential, not heavy industrial.",
    "Spot zoning this for a datacenter violates the comprehensive city plan.",
    "We need compatible development like retail or parks, not a server farm.",
    "Placing industry right next to a bedroom community is poor urban planning.",
    "It creates a dangerous precedent for future industrial encroachments.",
    "The buffer zones proposed are insufficient for this type of facility.",
    "Zoning laws exist to protect residents from exactly this kind of intrusion.",
    "We request the council uphold the original spirit of the area's zoning."
  ]
};

export const generateProtestEmail = async (data: ProtestData): Promise<GeneratedEmail> => {
  const model = "gemini-2.5-flash";

  // Select a random variation for each selected concern
  const selectedVariations = data.concerns.map(concern => {
    const options = VARIATIONS[concern];
    if (options && options.length > 0) {
      const randomIndex = Math.floor(Math.random() * options.length);
      return options[randomIndex];
    }
    return concern;
  });

  const prompt = `
    You are assisting a resident of Round Rock, Texas, in writing a formal, persuasive, and respectful protest email to the City Council regarding a proposed datacenter in their neighborhood.
    
    Resident Name: ${data.name}
    Neighborhood/Area: ${data.neighborhood}
    Specific Arguments to Include: ${selectedVariations.join(" ")}
    
    Context: There is a proposed datacenter development that residents are opposing due to its proximity to residential areas (Protect Round Rock campaign).
    
    Task:
    Generate a JSON object containing a 'subject' and a 'body' for the email.
    
    Guidelines:
    1. The tone should be concerned but professional and civic-minded.
    2. The subject line should be clear and urgent (e.g., "Opposition to Proposed Datacenter...", "Concerns regarding...").
    3. The body should introduce the resident, state their location, and weave the specific arguments provided above into a cohesive narrative.
    4. Mention "Protect Round Rock" or the neighborhood specifically to show community solidarity.
    5. CRITICAL: Format the email body with clear paragraphs. You MUST use double newlines (\n\n) to separate paragraphs in the JSON string value. The body should NOT be one large block of text.
    6. Do NOT include placeholders like "[Insert Name Here]" in the output; use the provided data.
    7. Keep the email concise (under 300 words) so it is likely to be read.
    8. Vary the sentence structure and opening greetings slightly to ensure this email looks unique compared to others.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful civic assistant. You always ensure email drafts are properly formatted with double newlines between paragraphs for readability.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            body: { type: Type.STRING }
          },
          required: ["subject", "body"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as GeneratedEmail;
    }
    
    throw new Error("Empty response from AI");
  } catch (error) {
    console.error("Error generating email:", error);
    throw new Error("Failed to generate email draft. Please try again.");
  }
};