// // // import { NextResponse } from "next/server";
// // // import OpenAI from "openai";

// // // const client = new OpenAI({
// // //   apiKey: process.env.OPENAI_API_KEY,
// // // });

// // // export async function POST(req: Request) {
// // //   try {
// // //     const { prompt } = await req.json();

// // //     const completion = await client.chat.completions.create({
// // //       model: "gpt-4o-mini",
// // //       messages: [
// // //         {
// // //           role: "system",
// // //           content:
// // //             "You are a hackathon assistant. Return ONLY valid JSON with keys: checklist, timeline, roles. Each value must be an array of strings.",
// // //         },
// // //         {
// // //           role: "user",
// // //           content: prompt,
// // //         },
// // //       ],
// // //     });

// // //     const text = completion.choices[0].message.content;

// // //     return NextResponse.json(JSON.parse(text || "{}"));
// // //   } catch (error) {
// // //     console.error(error);
// // //     return NextResponse.json(
// // //       { error: "AI generation failed" },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }

// // import { NextResponse } from "next/server";
// // import OpenAI from "openai";

// // export async function POST(req: Request) {
// //   try {
// //     if (!process.env.OPENAI_API_KEY) {
// //       console.error("❌ Missing OPENAI_API_KEY");
// //       return NextResponse.json(
// //         { error: "Missing API key" },
// //         { status: 500 }
// //       );
// //     }

// //     const { prompt } = await req.json();

// //     const client = new OpenAI({
// //       apiKey: process.env.OPENAI_API_KEY,
// //     });

// //     const completion = await client.chat.completions.create({
// //       model: "gpt-4o-mini",
// //       messages: [
// //         {
// //           role: "system",
// //           content:
// //             "Return ONLY valid JSON with keys checklist, timeline, roles. No markdown. No explanation.",
// //         },
// //         {
// //           role: "user",
// //           content: prompt,
// //         },
// //       ],
// //     });

// //     const text = completion.choices[0].message.content;

// //     if (!text) {
// //       throw new Error("Empty AI response");
// //     }

// //     return NextResponse.json(JSON.parse(text));
// //   } catch (err) {
// //     console.error("🔥 API ERROR:", err);

// //     return NextResponse.json(
// //       { error: "AI generation failed" },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// export async function POST(req: Request) {
//   try {
//     if (!process.env.OPENAI_API_KEY) {
//       throw new Error("Missing OpenAI API Key");
//     }

//     const { prompt } = await req.json();

//     const client = new OpenAI({
//       apiKey: process.env.OPENAI_API_KEY,
//     });

//     const completion = await client.chat.completions.create({
//       model: "gpt-4o-mini",
//       temperature: 0.3,
//       messages: [
//         {
//           role: "system",
//           content: `
// You are an expert hackathon planner.

// Your task:
// - Read the user's hackathon description carefully
// - Detect whether it is FRONTEND, BACKEND, FULLSTACK, or GENERAL

// Rules:
// - If FRONTEND: focus on UI, UX, accessibility, responsiveness, components
// - If BACKEND: focus on APIs, databases, authentication, scalability
// - If FULLSTACK: balance frontend and backend tasks
// - If unclear: generate a general hackathon plan

// Return ONLY valid JSON.
// NO markdown.
// NO explanations.
// NO extra text.

// JSON format (mandatory):
// {
//   "checklist": string[],
//   "timeline": string[],
//   "roles": string[]
// }
// `,

//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//     });

//     const raw = completion.choices[0].message.content;

//     const parsed = JSON.parse(raw ?? "{}");

//     return NextResponse.json(parsed);
//   } catch (error) {
//     console.error("API ERROR:", error);

//     return NextResponse.json(
//       {
//         checklist: ["README", "GitHub Repo", "Live Demo"],
//         timeline: ["Ideation", "Development", "Submission"],
//         roles: ["Developer", "Designer", "Presenter"],
//       },
//       { status: 200 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OpenAI API Key");
    }

    const { prompt } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `
You are an expert hackathon planner.

STRICT RESPONSE RULES:
1. Return ONLY valid JSON.
2. NO markdown, NO code blocks, NO explanatory text.
3. The JSON must have exactly three keys: "checklist", "timeline", "roles".
4. Each key must be an ARRAY of STRINGS.

few-shot examples:

User: "Build a blockchain voting app"
Assistant:
{
  "checklist": ["Define smart contract architecture", "Select blockchain network (e.g., Ethereum, Solana)", "Draft whitepaper", "Design UI/UX for voting interface"],
  "timeline": ["Hour 1-4: Smart Contract Dev", "Hour 5-8: Frontend Integration", "Hour 9-12: Testing & Deployment"],
  "roles": ["Smart Contract Engineer", "Frontend Developer", "Project Manager"]
}

User: "Create a fitness tracking mobile app"
Assistant:
{
  "checklist": ["Design user profile flow", "Integrate HealthKit/Google Fit API", "Build dashboard UI", "Implement workout logging"],
  "timeline": ["Hour 1-6: UI Design & Prototyping", "Hour 7-12: API Integration", "Hour 13-18: State Management", "Hour 19-24: Polish & Demo"],
  "roles": ["Mobile Developer (React Native/Flutter)", "UI/UX Designer", "Backend Developer"]
}

Now, generate for the user's prompt.
`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const raw = completion.choices[0].message.content;

    const parsed = JSON.parse(raw ?? "{}");

    // 🛡️ SANITIZATION (CRITICAL)
    const sanitize = (arr: any[]) =>
      Array.isArray(arr)
        ? arr.map((v) => (typeof v === "string" ? v : String(v)))
        : [];

    return NextResponse.json({
      checklist: sanitize(parsed.checklist),
      timeline: sanitize(parsed.timeline),
      roles: sanitize(parsed.roles),
    });
  } catch (error) {
    console.error("API ERROR:", error);

    // Fallback so UI NEVER breaks
    return NextResponse.json({
      checklist: ["README", "GitHub Repo", "Live Demo"],
      timeline: ["Ideation", "Development", "Submission"],
      roles: ["Developer", "Designer", "Presenter"],
    });
  }
}

