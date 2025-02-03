import Groq from "groq-sdk";
import 'dotenv/config'

const groq = new Groq({ apiKey:process.env.GROQ_API_KEY });

export async function translateText(text: string) {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Translate the following text into Kannada, Bengali, Punjabi, and Hindi. 
        Return a valid JSON array like this:
        {
          "kannada": "string",
          "punjabi": "string",
          "hindi": "string",
          "bangali": "string"
        }
        Do not include any explanations or extra text.
        Text: "${text}"`,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  try {
    const llmRes = response.choices[0].message.content!;
    console.log("Raw LLM Response:", llmRes);

    
    const parsedLlmRes = JSON.parse(llmRes.toString());

    if (typeof parsedLlmRes !== "object" || Array.isArray(parsedLlmRes)) {
      throw new Error("Invalid JSON format received from LLM");
    }

    console.log("Parsed LLM Response:", parsedLlmRes);

    return {
      kannada: parsedLlmRes.kannada || "",
      punjabi: parsedLlmRes.punjabi || "",
      hindi: parsedLlmRes.hindi || "",
      bangali: parsedLlmRes.bangali || "",
    };
  } catch (error) {
    console.error("Error parsing LLM response:", error);
    return { kannada: "", punjabi: "", hindi: "", bangali: "" };
  }
}
