// Royal Shaadi Wedding Music & Rhythmic Percussion Engine

export interface WeddingTrack {
  id: string;
  title: string;
  subtitle: string;
  src: string | null;
  badge: string;
}

export const weddingTracks: WeddingTrack[] = [
  {
    id: 'din-shagna',
    title: 'Din Shagna Da (विवाह धुन)',
    subtitle: 'Continuous Festive Wedding Loop',
    src: 'audio/wedding-theme.mp3',
    badge: 'Looping 🔁'
  }
];

class WeddingAudioPlayer {
  private audioElement: HTMLAudioElement | null = null;
  private isPlaying = false;
  private currentTrackIndex = 0;
  private volume = 0.6;
  private ctx: AudioContext | null = null;
  private synthGain: GainNode | null = null;
  private dholakTimer: number | null = null;
  private shehnaiTimer: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioElement = new Audio();
      this.audioElement.volume = this.volume;
      this.audioElement.loop = true;
      this.audioElement.addEventListener('ended', () => {
        this.next();
      });
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack(): WeddingTrack {
    return weddingTracks[this.currentTrackIndex];
  }

  public play(index?: number) {
    if (index !== undefined) {
      this.currentTrackIndex = (index + weddingTracks.length) % weddingTracks.length;
    }
    const track = weddingTracks[this.currentTrackIndex];
    this.isPlaying = true;

    if (track.src && this.audioElement) {
      this.stopRhythmicSynth();
      if (this.audioElement.src !== window.location.origin + '/' + track.src && !this.audioElement.src.endsWith(track.src)) {
        this.audioElement.src = track.src;
      }
      this.audioElement.volume = this.volume;
      this.audioElement.play().catch(() => {
        this.startRhythmicSynth();
      });
    } else {
      if (this.audioElement) this.audioElement.pause();
      this.startRhythmicSynth();
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.audioElement) this.audioElement.pause();
    this.stopRhythmicSynth();
  }

  public next() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % weddingTracks.length;
    if (this.isPlaying) {
      this.play();
    }
  }

  public prev() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + weddingTracks.length) % weddingTracks.length;
    if (this.isPlaying) {
      this.play();
    }
  }

  public setVolume(val: number) {
    this.volume = val;
    if (this.audioElement) this.audioElement.volume = val;
    if (this.synthGain && this.ctx && this.ctx.state !== 'closed') {
      this.synthGain.gain.setValueAtTime(val * 0.22, this.ctx.currentTime);
    }
  }

  private startRhythmicSynth() {
    this.stopRhythmicSynth();
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.synthGain = this.ctx.createGain();
      this.synthGain.gain.setValueAtTime(this.volume * 0.22, this.ctx.currentTime);
      this.synthGain.connect(this.ctx.destination);

      let step = 0;
      const tempoMs = 145; // ~104 BPM energetic festive Keherwa rhythm

      this.dholakTimer = window.setInterval(() => {
        if (!this.ctx || this.ctx.state === 'closed') return;
        this.playDholakStep(step);
        step = (step + 1) % 8;
      }, tempoMs);

      let melodyStep = 0;
      const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33];

      this.shehnaiTimer = window.setInterval(() => {
        if (!this.ctx || this.ctx.state === 'closed') return;
        this.playShehnaiNote(notes[melodyStep % notes.length]);
        melodyStep++;
      }, tempoMs * 2);

    } catch (e) {
      console.warn('Synth error:', e);
    }
  }

  private playDholakStep(step: number) {
    if (!this.ctx || !this.synthGain || this.ctx.state === 'closed') return;
    const now = this.ctx.currentTime;
    const isBass = (step === 0 || step === 1 || step === 4 || step === 5);
    const isTreble = (step === 0 || step === 2 || step === 3 || step === 4 || step === 6 || step === 7);

    if (isBass) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime((step === 0 || step === 4) ? 140 : 105, now);
      osc.frequency.exponentialRampToValueAtTime((step === 0 || step === 4) ? 65 : 55, now + 0.12);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.synthGain);
      osc.start(now);
      osc.stop(now + 0.19);
    }

    if (isTreble) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime((step === 2 || step === 7) ? 480 : 560, now);
      gain.gain.setValueAtTime(step === 7 ? 0.28 : 0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.synthGain);
      osc.start(now);
      osc.stop(now + 0.09);
    }
  }

  private playShehnaiNote(freq: number) {
    if (!this.ctx || !this.synthGain || this.ctx.state === 'closed') return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now);
    filter.Q.setValueAtTime(2.5, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.synthGain);

    osc.start(now);
    osc.stop(now + 0.28);
  }

  private stopRhythmicSynth() {
    if (this.dholakTimer) {
      clearInterval(this.dholakTimer);
      this.dholakTimer = null;
    }
    if (this.shehnaiTimer) {
      clearInterval(this.shehnaiTimer);
      this.shehnaiTimer = null;
    }
    if (this.ctx && this.ctx.state !== 'closed') {
      try {
        this.ctx.close();
      } catch (e) {}
      this.ctx = null;
      this.synthGain = null;
    }
  }
}

export const ambientAudio = new WeddingAudioPlayer();
