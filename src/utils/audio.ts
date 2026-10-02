// Web Audio API generator for serene Indian classical Tanpura drone and soft bell ambiance

class AmbientAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private intervalId: number | null = null;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public play() {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 3);
      this.masterGain.connect(this.ctx.destination);

      // Tanpura frequencies: C# tuning (~138.59 Hz, Sa, Pa, Sa high)
      const baseFreq = 138.59;
      const notes = [baseFreq * 0.75, baseFreq, baseFreq * 1.5, baseFreq * 2];

      this.oscillators = notes.map((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const noteGain = this.ctx!.createGain();

        // Warm harmonic drone
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq + (Math.random() * 0.4 - 0.2), this.ctx!.currentTime);

        noteGain.gain.setValueAtTime(0.2, this.ctx!.currentTime);
        osc.connect(noteGain);
        noteGain.connect(this.masterGain!);

        osc.start();
        return osc;
      });

      // Gentle intermittent chime notes reminiscent of temple bells
      this.intervalId = window.setInterval(() => {
        if (!this.ctx || !this.isPlaying) return;
        this.playSoftChime();
      }, 4500);

      this.isPlaying = true;
    } catch (e) {
      console.warn('Audio context could not start:', e);
      this.isPlaying = false;
    }
  }

  private playSoftChime() {
    if (!this.ctx || !this.masterGain) return;
    try {
      const pentatonic = [554.37, 622.25, 698.46, 830.61, 932.33, 1108.73];
      const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 3.2);
    } catch (e) {
      // ignore
    }
  }

  public stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.2);
      setTimeout(() => {
        this.oscillators.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch (e) {}
        });
        this.oscillators = [];
        if (this.ctx) {
          this.ctx.close();
          this.ctx = null;
        }
      }, 1300);
    }
    this.isPlaying = false;
  }
}

export const ambientAudio = new AmbientAudioPlayer();
