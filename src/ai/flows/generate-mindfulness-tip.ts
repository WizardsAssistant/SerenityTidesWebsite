// src/ai/flows/generate-mindfulness-tip.ts
'use server';

/**
 * @fileOverview Generates personalized mindfulness tips relevant to Serenity Tides' events and wellness content.
 *
 * - generateMindfulnessTip - A function that generates a mindfulness tip.
 * - GenerateMindfulnessTipInput - The input type for the generateMindfulnessTip function.
 * - GenerateMindfulnessTipOutput - The return type for the generateMindfulnessTip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMindfulnessTipInputSchema = z.object({
  eventDetails: z
    .string()
    .describe('Details about recent and upcoming Serenity Tides events.'),
  wellnessContent: z
    .string()
    .describe('Information about Serenity Tides wellness content.'),
  userPreferences: z
    .string()
    .optional()
    .describe('Optional user preferences for mindfulness practices.'),
});

export type GenerateMindfulnessTipInput = z.infer<
  typeof GenerateMindfulnessTipInputSchema
>;

const GenerateMindfulnessTipOutputSchema = z.object({
  mindfulnessTip: z
    .string()
    .describe('A personalized mindfulness tip relevant to the provided context.'),
});

export type GenerateMindfulnessTipOutput = z.infer<
  typeof GenerateMindfulnessTipOutputSchema
>;

export async function generateMindfulnessTip(
  input: GenerateMindfulnessTipInput
): Promise<GenerateMindfulnessTipOutput> {
  return generateMindfulnessTipFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMindfulnessTipPrompt',
  input: {schema: GenerateMindfulnessTipInputSchema},
  output: {schema: GenerateMindfulnessTipOutputSchema},
  prompt: `You are a mindfulness expert providing personalized tips.

  Based on the recent and upcoming events:
  {{eventDetails}}

  Wellness content:
  {{wellnessContent}}

  And optional user preferences:
  {{#if userPreferences}}
  {{userPreferences}}
  {{else}}
  None.
  {{/if}}

  Generate a mindfulness tip that the user can easily integrate into their daily routine. Make sure the tip is relevant to the provided context.
  Do not include any introductory or concluding remarks, only provide the tip.
  `,
});

const generateMindfulnessTipFlow = ai.defineFlow(
  {
    name: 'generateMindfulnessTipFlow',
    inputSchema: GenerateMindfulnessTipInputSchema,
    outputSchema: GenerateMindfulnessTipOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
