import { NextRequest, NextResponse } from "next/server";

/**
 * Voice Cloning API Route - Sesame CSM via Hugging Face
 * 
 * This endpoint handles voice cloning using Sesame CSM-1B model on Hugging Face.
 * 
 * Setup Instructions:
 * 1. Get Hugging Face API token: https://huggingface.co/settings/tokens
 * 2. Accept model access: https://huggingface.co/sesame/csm-1b
 * 3. Add to .env.local:
 *    HUGGINGFACE_API_TOKEN=your_token_here
 */

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File;
    const text = formData.get("text") as string;

    if (!audioFile || !text) {
      return NextResponse.json(
        { error: "Missing audio file or text" },
        { status: 400 }
      );
    }

    console.log("Voice clone request received:", {
      audioSize: audioFile.size,
      audioType: audioFile.type,
      textLength: text.length,
    });

    const hfToken = process.env.HUGGINGFACE_API_TOKEN;
    
    if (!hfToken) {
      console.log("No HF token - using simulation");
      await new Promise(resolve => setTimeout(resolve, 2000));
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Add HUGGINGFACE_API_TOKEN to .env.local to enable real voice cloning",
        audioUrl: null,
      });
    }

    // Call Sesame's official Space API
    console.log("Calling Sesame Space API...");
    
    try {
      // Prepare form data for Space API
      const spaceFormData = new FormData();
      spaceFormData.append("audio", audioFile);
      spaceFormData.append("text", text);
      
      const response = await fetch(
        "https://sesame-csm-1b.hf.space/api/predict",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${hfToken}`,
          },
          body: spaceFormData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Space API error:", errorText);
        
        // Fallback to simulation if Space is unavailable
        if (response.status === 503) {
          console.log("Space is loading, using simulation");
          await new Promise(resolve => setTimeout(resolve, 2000));
          return NextResponse.json({
            success: true,
            simulated: true,
            message: "Space is warming up. Using simulation for now.",
            audioUrl: null,
          });
        }
        
        throw new Error(`Space API error: ${response.status}`);
      }

      // Get the generated audio
      const generatedAudio = await response.arrayBuffer();
      
      console.log("Voice cloning successful!");
      
      // Return the audio file
      return new NextResponse(generatedAudio, {
        headers: {
          "Content-Type": "audio/wav",
          "Content-Disposition": "attachment; filename=voice-clone.wav",
        },
      });
      
    } catch (error) {
      console.error("Failed to call Space API:", error);
      
      // Fallback to simulation
      console.log("Falling back to simulation");
      await new Promise(resolve => setTimeout(resolve, 2000));
      return NextResponse.json({
        success: true,
        simulated: true,
        message: "Real cloning unavailable, using simulation",
        audioUrl: null,
      });
    }

  } catch (error) {
    console.error("Voice cloning error:", error);
    return NextResponse.json(
      { 
        error: "Failed to process voice cloning request",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
