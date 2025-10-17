"use server";

import { generateMindfulnessTip } from "@/ai/flows/generate-mindfulness-tip";

// Dummy data for context, as per the AI flow's requirements.
const DUMMY_EVENT_DETAILS = "Upcoming events include a sunrise yoga session on the beach this Saturday and a virtual guided meditation workshop next Wednesday. Recent events included a successful weekend retreat on mindful movement.";
const DUMMY_WELLNESS_CONTENT = "Our latest blog post discusses the benefits of deep breathing exercises. The app also features a new library of calming soundscapes for meditation.";

export async function getMindfulnessTipAction() {
  try {
    const result = await generateMindfulnessTip({
      eventDetails: DUMMY_EVENT_DETAILS,
      wellnessContent: DUMMY_WELLNESS_CONTENT,
    });
    return { success: true, data: result };
  } catch (e: any) {
    console.error(e);
    return { success: false, error: e.message || "An unexpected error occurred." };
  }
}
