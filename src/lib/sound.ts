"use client"

// Singleton for AudioContext to reuse it and prevent creating many contexts
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playUIClick = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const t = ctx.currentTime;
    
    // Create oscillator and gain nodes
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Map the nodes
    osc.connect(gain);
    gain.connect(ctx.destination);

    // Setup a very soft, premium "wood tick" or "glass tap" sound
    osc.type = "sine";
    
    // Frequency envelope (starts higher, drops rapidly)
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.02);

    // Volume envelope (quick attack, quick release)
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.1, t + 0.005); // Volume up fast but soft (0.1 max)
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    // Play and cleanup
    osc.start(t);
    osc.stop(t + 0.05);
  } catch (e) {
    // Silently ignore if audio isn't supported or fails
    console.warn("UI click sound failed", e);
  }
};
