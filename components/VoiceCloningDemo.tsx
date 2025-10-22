"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, Square, Play, Download, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface VoiceCloningDemoProps {
  onComplete: () => void;
}

type Stage = "intro" | "recording" | "processing" | "generating" | "complete";

export default function VoiceCloningDemo({ onComplete }: VoiceCloningDemoProps) {
  const [stage, setStage] = useState<Stage>("intro");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [clonedAudioUrl, setClonedAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const sampleScript = `Welcome to the future of banking. Our AI-powered fraud detection system 
analyzes millions of transactions in real-time, identifying suspicious patterns with 
unprecedented accuracy. This technology is already protecting financial institutions 
across the country.`;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      if (clonedAudioUrl) URL.revokeObjectURL(clonedAudioUrl);
    };
  }, [audioUrl, clonedAudioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setStage("processing");
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setStage("recording");
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      setError("Microphone access denied. Please allow microphone access to continue.");
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const generateClone = async () => {
    if (!audioBlob) return;

    setStage("generating");
    setError(null);

    try {
      // TODO: Replace with actual Sesame API call
      // For now, simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simulate cloned audio (in production, this would be the Sesame API response)
      // For demo purposes, we'll use the original recording
      setClonedAudioUrl(audioUrl);
      setStage("complete");
      onComplete();
    } catch (err) {
      setError("Failed to generate voice clone. Please try again.");
      setStage("processing");
      console.error("Error generating clone:", err);
    }
  };

  const reset = () => {
    setStage("intro");
    setIsRecording(false);
    setRecordingTime(0);
    setAudioBlob(null);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    if (clonedAudioUrl) URL.revokeObjectURL(clonedAudioUrl);
    setAudioUrl(null);
    setClonedAudioUrl(null);
    setError(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black mb-3">Voice Cloning Studio</h2>
        <p className="text-text-muted">
          Record your voice for 30-60 seconds, then hear it cloned speaking banking content.
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </motion.div>
      )}

      {/* Stage: Intro */}
      {stage === "intro" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-gold/5 border border-gold/20 rounded-xl p-6">
            <h3 className="font-bold mb-3">Sample Script (Read this aloud):</h3>
            <p className="text-text-muted leading-relaxed">{sampleScript}</p>
          </div>

          <button
            onClick={startRecording}
            className="w-full flex items-center justify-center gap-3 px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold text-lg hover:scale-105 transition-transform"
          >
            <Mic className="w-6 h-6" />
            Start Recording
          </button>
        </motion.div>
      )}

      {/* Stage: Recording */}
      {stage === "recording" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center mb-6"
            >
              <Mic className="w-16 h-16 text-white" />
            </motion.div>
            
            <div className="text-6xl font-black mb-2">
              {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}
            </div>
            <p className="text-text-muted">Recording in progress...</p>
          </div>

          <button
            onClick={stopRecording}
            className="w-full flex items-center justify-center gap-3 px-8 py-6 bg-text-strong text-white rounded-2xl font-semibold text-lg hover:scale-105 transition-transform"
          >
            <Square className="w-6 h-6" />
            Stop Recording
          </button>
        </motion.div>
      )}

      {/* Stage: Processing */}
      {stage === "processing" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="font-bold text-green-900">Recording Complete!</h3>
            </div>
            <p className="text-sm text-green-800 mb-4">
              Duration: {recordingTime} seconds
            </p>
            {audioUrl && (
              <audio controls src={audioUrl} className="w-full" />
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={generateClone}
              className="flex-1 flex items-center justify-center gap-3 px-8 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold text-lg hover:scale-105 transition-transform"
            >
              Generate Voice Clone
            </button>
            <button
              onClick={reset}
              className="px-8 py-6 border-2 border-text-soft text-text-strong rounded-2xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Re-record
            </button>
          </div>
        </motion.div>
      )}

      {/* Stage: Generating */}
      {stage === "generating" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-12"
        >
          <Loader2 className="w-16 h-16 text-gold animate-spin mb-6" />
          <h3 className="text-2xl font-bold mb-2">Cloning Your Voice...</h3>
          <p className="text-text-muted">This may take 10-30 seconds</p>
        </motion.div>
      )}

      {/* Stage: Complete */}
      {stage === "complete" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-8 text-center">
            <CheckCircle className="w-16 h-16 text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-black mb-2">Voice Clone Ready!</h3>
            <p className="text-text-muted mb-6">
              Listen to your cloned voice speaking the banking script
            </p>
            {clonedAudioUrl && (
              <audio controls src={clonedAudioUrl} className="w-full mb-4" />
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={reset}
              className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-text-soft text-text-strong rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => {
                if (clonedAudioUrl) {
                  const a = document.createElement("a");
                  a.href = clonedAudioUrl;
                  a.download = "voice-clone.webm";
                  a.click();
                }
              }}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-gold text-white rounded-xl font-semibold hover:scale-105 transition-transform"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
          </div>

          <div className="bg-gold/5 border border-gold/20 rounded-xl p-6">
            <h4 className="font-bold mb-2">Use Cases for Banking:</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>• Customer service IVR systems</li>
              <li>• Compliance training narration</li>
              <li>• Personalized account notifications</li>
              <li>• Executive communications at scale</li>
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
}
