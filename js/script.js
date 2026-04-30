(function() {
  'use strict';
  const CONFIG = { 
    PIXEL_SIZE: 5, 
	FONT_SCALE: 24, 
	ROCKET_SPEED: 20, 
	GRAVITY: 0.12, 
	FRICTION: 0.985, 
	TEXT_HOLD_TIME: 3500, 
	TRAIL_LENGTH: 12, 
	STAR_COUNT: 200, 
	MAX_ROCKETS: 50, 
	MAX_PARTICLES: 8000, 
	PARTICLES_PER_PIXEL: 8 
  };
  const COLORS = { 
    BLACK: '#000000', 
	WHITE: '#ffffff', 
	RED: '#ff0040', 
	CYAN: '#00ffff', 
	PURPLE: '#ff00ff', 
	ELECTRIC_PURPLE: '#bf00ff',
	VIOLET: '#ee82ee',
	GREEN: '#00ff40', 
	NEON_GREEN: '#40ff80', 
	LIME: '#bfff00', 
	BLUE: '#4040ff', 
	ELECTRIC_BLUE: '#0080ff', 
	YELLOW: '#ffff00', 
	ORANGE: '#ff8000', 
	PINK: '#ff60b0', 
	GOLD: '#ffd700', 
	MAGENTA: '#ff0080', 
	HOT_PINK: '#ff69b4', 
	DEEP_RED: '#cc0000', 
	CORAL: '#ff7f50', 
	SKY: '#87ceeb' 
  };
  const FIREWORK_COLORS = [COLORS.RED, COLORS.CYAN, COLORS.PURPLE, COLORS.ELECTRIC_PURPLE, COLORS.VIOLET, 
    COLORS.GREEN, COLORS.NEON_GREEN, COLORS.LIME, COLORS.BLUE, COLORS.ELECTRIC_BLUE, COLORS.YELLOW, COLORS.ORANGE, 
	COLORS.PINK, COLORS.GOLD, COLORS.MAGENTA, COLORS.HOT_PINK, COLORS.DEEP_RED, COLORS.CORAL, COLORS.SKY];
  const FONT = {
    'A': [[0,0,1,1,1,1,0,0],[0,1,0,0,0,0,1,0],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1],
	  [1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0]],
    'B': [[1,1,1,1,1,1,0,0],[1,0,0,0,0,0,1,0],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,1,1,1,1,1,0,0],
	  [1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,1,0],[1,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0]],
    'C': [[0,0,1,1,1,1,1,0],[0,1,0,0,0,0,0,1],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],
	  [1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,1],[0,0,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]],
    'D': [[1,1,1,1,1,1,0,0],[1,0,0,0,0,0,1,0],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],
	  [1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,1,0],[1,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0]],
    'E': [[1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,1,1,1,1,1,0,0],
	  [1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0]],
    'F': [[1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,1,1,1,1,1,0,0],
	  [1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]],
    'G': [[0,0,1,1,1,1,1,0],[0,1,0,0,0,0,0,1],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,0,0,1,1,1,1,1],
	  [1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[0,1,0,0,0,0,0,1],[0,0,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]],
    'H': [[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1],
	  [1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0]],
    'I': [[0,1,1,1,1,1,1,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],
	  [0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,1,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]],
    'J': [[0,0,0,1,1,1,1,1],[0,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0],
	  [0,0,0,0,0,1,0,0],[1,0,0,0,0,1,0,0],[1,0,0,0,0,1,0,0],[0,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0]],
    'K': [[1,0,0,0,0,0,1,0],[1,0,0,0,0,1,0,0],[1,0,0,0,1,0,0,0],[1,0,0,1,0,0,0,0],[1,1,1,0,0,0,0,0],
	  [1,0,0,1,0,0,0,0],[1,0,0,0,1,0,0,0],[1,0,0,0,0,1,0,0],[1,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0]],
    'L': [[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],
	  [1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0]],
    'M': [[1,0,0,0,0,0,0,1],[1,1,0,0,0,0,1,1],[1,0,1,0,0,1,0,1],[1,0,0,1,1,0,0,1],[1,0,0,0,0,0,0,1],
	  [1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0]],
    'N': [[1,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,1],[1,0,1,0,0,0,0,1],[1,0,0,1,0,0,0,1],[1,0,0,0,1,0,0,1],
	  [1,0,0,0,0,1,0,1],[1,0,0,0,0,0,1,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0]],
    'O': [[0,0,1,1,1,1,0,0],[0,1,0,0,0,0,1,0],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],
	  [1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[0,1,0,0,0,0,1,0],[0,0,1,1,1,1,0,0],[0,0,0,0,0,0,0,0]],
    'P': [[1,1,1,1,1,1,0,0],[1,0,0,0,0,0,1,0],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,1,1,1,1,1,0,0],
	  [1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]],
    'Q': [[0,0,1,1,1,1,0,0],[0,1,0,0,0,0,1,0],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],
	  [1,0,0,1,0,1,0,1],[1,0,1,0,1,0,0,1],[0,1,0,0,0,0,1,0],[0,0,1,1,1,1,0,1],[0,0,0,0,0,0,0,0]],
    'R': [[1,1,1,1,1,1,0,0],[1,0,0,0,0,0,1,0],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,1,1,1,1,1,0,0],
	  [1,0,0,1,0,0,0,0],[1,0,0,0,1,0,0,0],[1,0,0,0,0,1,0,0],[1,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0]],
    'S': [[0,0,1,1,1,1,1,0],[0,1,0,0,0,0,0,1],[1,0,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[0,1,1,1,1,1,0,0],
	  [0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,1],[0,1,0,0,0,0,1,0],[0,0,1,1,1,1,1,0],[0,0,0,0,0,0,0,0]],
    'T': [[1,1,1,1,1,1,1,1],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],
	  [0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0]],
    'U': [[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],
	  [1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[0,1,0,0,0,0,1,0],[0,0,1,1,1,1,0,0],[0,0,0,0,0,0,0,0]],
    'V': [[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[0,1,0,0,0,0,1,0],[0,1,0,0,0,0,1,0],
	  [0,0,1,0,0,1,0,0],[0,0,1,0,0,1,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],[0,0,0,0,0,0,0,0]],
    'W': [[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[1,0,0,1,1,0,0,1],
	  [1,0,1,0,0,1,0,1],[1,1,0,0,0,0,1,1],[1,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0]],
    'X': [[1,0,0,0,0,0,0,1],[0,1,0,0,0,0,1,0],[0,0,1,0,0,1,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,1,0,0,0],
	  [0,0,0,1,1,0,0,0],[0,0,1,0,0,1,0,0],[0,1,0,0,0,0,1,0],[1,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0]],
    'Y': [[1,0,0,0,0,0,0,1],[0,1,0,0,0,0,1,0],[0,0,1,0,0,1,0,0],[0,0,0,1,1,0,0,0],[0,0,0,1,0,0,0,0],
	  [0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0]],
    'Z': [[1,1,1,1,1,1,1,1],[0,0,0,0,0,0,1,0],[0,0,0,0,0,1,0,0],[0,0,0,0,1,0,0,0],[0,0,0,1,0,0,0,0],
	  [0,0,1,0,0,0,0,0],[0,1,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1],[0,0,0,0,0,0,0,0]],
    ' ': [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
	  [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]],
    '!': [[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,1,0,0,0,0],
	  [0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]],
    '-': [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,1,1,1,1,0,0],
	  [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]],
    '0': [[0,0,1,1,1,1,0,0],[0,1,0,0,0,0,1,0],[1,0,0,0,0,0,0,1],[1,0,0,0,1,0,0,1],[1,0,0,1,0,0,0,1],
	  [1,0,1,0,0,0,0,1],[1,0,0,0,0,0,0,1],[0,1,0,0,0,0,1,0],[0,0,1,1,1,1,0,0],[0,0,0,0,0,0,0,0]],
    '8': [[0,0,1,1,1,1,0,0],[0,1,0,0,0,0,1,0],[1,0,0,0,0,0,0,1],[0,1,0,0,0,0,1,0],[0,0,1,1,1,1,0,0],
	  [0,1,0,0,0,0,1,0],[1,0,0,0,0,0,0,1],[0,1,0,0,0,0,1,0],[0,0,1,1,1,1,0,0],[0,0,0,0,0,0,0,0]]
  };
  const textQueue = ['SILUS', 'GAMING', 'WORLD', 'THANK', 'YOU', 'FOR', '15,000', 'SUBSCRIBERS', 'SILUS GAMING WORLD'];
  const rand = (min, max) => Math.random() * (max - min) + min;
  const randInt = (min, max) => Math.floor(rand(min, max + 1));
  const randColor = () => FIREWORK_COLORS[randInt(0, FIREWORK_COLORS.length - 1)];
  const dist = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const lerp = (a, b, t) => a + (b - a) * t;
  let state = { 
    width: window.innerWidth, 
    height: window.innerHeight, 
	started: false, 
	finaleTriggered: false, 
	currentTextIndex: 0, 
	lastTextTime: 0, 
	isShowingText: false, 
	animationId: null, 
	demoEnding: false, 
	timeouts: [], 
	rockets: [], 
	particles: [], 
	stars: [] 
  };
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  canvas.width = state.width;
  canvas.height = state.height;
      const intro = document.getElementById('intro');
      const transition = document.getElementById('transition');
      const endScreen = document.getElementById('endScreen');
      const AudioEngine = {
        ctx: null, master: null, ready: false,
        init() { if (this.ctx) return; try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); this.master = this.ctx.createGain(); this.master.gain.value = 0.4; this.master.connect(this.ctx.destination); this.ready = true; } catch (e) {} },
        playLaunch() { if (!this.ready || !this.ctx) return; const now = this.ctx.currentTime, dur = 0.8; try { const noise = this.ctx.createBuffer(1, this.ctx.sampleRate * dur, this.ctx.sampleRate); const data = noise.getChannelData(0); for (let i = 0; i < data.length; i++) { const t = i / this.ctx.sampleRate; data[i] = (Math.random() * 2 - 1) * (1 - Math.exp(-t * 30)) * Math.exp(-t * 2.5) * 0.5; } const src = this.ctx.createBufferSource(); src.buffer = noise; const filter = this.ctx.createBiquadFilter(); filter.type = 'bandpass'; filter.Q.value = 2; filter.frequency.setValueAtTime(400, now); filter.frequency.exponentialRampToValueAtTime(3500, now + dur * 0.6); const gain = this.ctx.createGain(); gain.gain.setValueAtTime(0.7, now); gain.gain.exponentialRampToValueAtTime(0.001, now + dur); src.connect(filter); filter.connect(gain); gain.connect(this.master); src.start(); src.stop(now + dur); const osc = this.ctx.createOscillator(); osc.type = 'sine'; osc.frequency.setValueAtTime(600, now); osc.frequency.exponentialRampToValueAtTime(2800, now + dur); const oscGain = this.ctx.createGain(); oscGain.gain.setValueAtTime(0.1, now); oscGain.gain.exponentialRampToValueAtTime(0.001, now + dur); osc.connect(oscGain); oscGain.connect(this.master); osc.start(); osc.stop(now + dur); } catch (e) {} },
        playExplosion(intensity = 1, isHeart = false) { if (!this.ready || !this.ctx) return; const now = this.ctx.currentTime; try { const boom = this.ctx.createOscillator(); boom.type = 'sine'; boom.frequency.setValueAtTime(150 * intensity, now); boom.frequency.exponentialRampToValueAtTime(15, now + 0.5); const boomGain = this.ctx.createGain(); boomGain.gain.setValueAtTime(isHeart ? 0.5 : 0.35, now); boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5); const boomFilter = this.ctx.createBiquadFilter(); boomFilter.type = 'lowpass'; boomFilter.frequency.value = 250; boom.connect(boomFilter); boomFilter.connect(boomGain); boomGain.connect(this.master); boom.start(); boom.stop(now + 0.5); const crackle = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.2, this.ctx.sampleRate); const cData = crackle.getChannelData(0); for (let i = 0; i < cData.length; i++) { const t = i / this.ctx.sampleRate; cData[i] = (Math.random() * 2 - 1) * Math.exp(-t * 15); } const cSrc = this.ctx.createBufferSource(); cSrc.buffer = crackle; const cFilter = this.ctx.createBiquadFilter(); cFilter.type = 'highpass'; cFilter.frequency.value = 1000; const cGain = this.ctx.createGain(); cGain.gain.setValueAtTime(0.2 * intensity, now); cGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2); cSrc.connect(cFilter); cFilter.connect(cGain); cGain.connect(this.master); cSrc.start(); } catch (e) {} },
        playCrackle() { if (!this.ready || !this.ctx) return; try { const noise = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.05, this.ctx.sampleRate); const data = noise.getChannelData(0); for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noise.length * 0.3)); const src = this.ctx.createBufferSource(); src.buffer = noise; const filter = this.ctx.createBiquadFilter(); filter.type = 'highpass'; filter.frequency.value = 3000; const gain = this.ctx.createGain(); gain.gain.value = 0.04; src.connect(filter); filter.connect(gain); gain.connect(this.master); src.start(); } catch (e) {} },
        playTransition() { if (!this.ready || !this.ctx) return; const now = this.ctx.currentTime; try { const osc = this.ctx.createOscillator(); osc.type = 'square'; osc.frequency.setValueAtTime(100, now); osc.frequency.exponentialRampToValueAtTime(900, now + 0.25); osc.frequency.exponentialRampToValueAtTime(100, now + 0.5); const gain = this.ctx.createGain(); gain.gain.setValueAtTime(0.1, now); gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5); osc.connect(gain); gain.connect(this.master); osc.start(); osc.stop(now + 0.5); } catch (e) {} },
        playFinale() { if (!this.ready || !this.ctx) return; const now = this.ctx.currentTime; try { for (let i = 0; i < 5; i++) { const boom = this.ctx.createOscillator(); boom.type = 'sine'; boom.frequency.setValueAtTime(120 - i * 15, now + i * 0.12); boom.frequency.exponentialRampToValueAtTime(10, now + i * 0.12 + 1); const gain = this.ctx.createGain(); gain.gain.setValueAtTime(0.45, now + i * 0.12); gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 1); boom.connect(gain); gain.connect(this.master); boom.start(now + i * 0.12); boom.stop(now + i * 0.12 + 1); } } catch (e) {} },
        playMegaFinale() { if (!this.ready || !this.ctx) return; const now = this.ctx.currentTime; try { for (let i = 0; i < 8; i++) { const boom = this.ctx.createOscillator(); boom.type = 'sine'; boom.frequency.setValueAtTime(100 - i * 8, now + i * 0.06); boom.frequency.exponentialRampToValueAtTime(6, now + i * 0.06 + 1.5); const gain = this.ctx.createGain(); gain.gain.setValueAtTime(0.55, now + i * 0.06); gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 1.5); boom.connect(gain); gain.connect(this.master); boom.start(now + i * 0.06); boom.stop(now + i * 0.06 + 1.5); } } catch (e) {} },
        cleanup() { if (this.ctx) { try { this.ctx.close(); } catch (e) {} this.ctx = null; this.master = null; this.ready = false; } }
      };
      function getPixels(text, scale, cx, cy) { const pixels = []; const cw = 8, ch = 10, sp = 2; const totalW = text.length * (cw + sp) * scale - sp * scale; const startX = cx - totalW / 2; const startY = cy - (ch * scale) / 2; for (let ci = 0; ci < text.length; ci++) { const char = text[ci].toUpperCase(); const data = FONT[char] || FONT[' ']; const charX = startX + ci * (cw + sp) * scale; for (let row = 0; row < ch; row++) { for (let col = 0; col < cw; col++) { if (data[row] && data[row][col]) pixels.push({ x: charX + col * scale, y: startY + row * scale }); } } } return pixels; }
      function genCircle(cx, cy, r, n) { const pts = []; for (let i = 0; i < n; i++) { const a = (Math.PI * 2 * i) / n; pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }); } return pts; }
      function genStar(cx, cy, or, ir, n) { const pts = []; for (let i = 0; i < n * 2; i++) { const a = (Math.PI * 2 * i) / (n * 2) - Math.PI / 2; const r = i % 2 === 0 ? or : ir; pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }); } return pts; }
      function genTriangle(cx, cy, size) { const pts = []; const h = size * Math.sqrt(3) / 2; for (let i = 0; i < 3; i++) { const a = (Math.PI * 2 * i) / 3 - Math.PI / 2; pts.push({ x: cx + Math.cos(a) * size, y: cy + Math.sin(a) * h }); } return pts; }
      function genSquare(cx, cy, size) { const half = size / 2; return [{ x: cx - half, y: cy - half }, { x: cx + half, y: cy - half }, { x: cx + half, y: cy + half }, { x: cx - half, y: cy + half }]; }
      function genDiamond(cx, cy, size) { const half = size / 2; return [{ x: cx, y: cy - half }, { x: cx + half, y: cy }, { x: cx, y: cy + half }, { x: cx - half, y: cy }]; }
      function genSpiral(cx, cy, maxR, turns, n) { const pts = []; for (let i = 0; i < n; i++) { const t = (i / n) * turns * Math.PI * 2; const r = (i / n) * maxR; pts.push({ x: cx + Math.cos(t) * r, y: cy + Math.sin(t) * r }); } return pts; }
      function genHeart(cx, cy, size) { const pts = []; for (let i = 0; i < 60; i++) { const t = (i / 60) * Math.PI * 2; const x = 16 * Math.pow(Math.sin(t), 3); const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t)); pts.push({ x: cx + x * size / 16, y: cy + y * size / 16 }); } for (let fy = -size; fy <= size; fy += size / 8) { for (let fx = -size; fx <= size; fx += size / 8) { const x = fx / size * 16, y = -fy / size * 16; if (Math.pow(x*x + y*y - 1, 3) - x*x*y*y*y < 0) pts.push({ x: cx + fx, y: cy + fy }); } } return pts; }
      function genHexagon(cx, cy, size) { const pts = []; for (let i = 0; i < 6; i++) { const a = (Math.PI * 2 * i) / 6; pts.push({ x: cx + Math.cos(a) * size, y: cy + Math.sin(a) * size }); } return pts; }
      function genCross(cx, cy, size) { const pts = []; for (let i = -size/2; i <= size/2; i += size / 8) { pts.push({ x: cx + i, y: cy }); pts.push({ x: cx, y: cy + i }); } return pts; }
      function createParticle(x, y, color, tx, ty, isText) { if (isText) return { x, y, color, tx, ty, isText, vx: rand(-10, 10), vy: rand(-10, 10), phase: 'flying', life: 255, maxLife: 255, hold: CONFIG.TEXT_HOLD_TIME, size: CONFIG.PIXEL_SIZE, shimmer: rand(0, Math.PI * 2), spark: Math.random() < 0.4 }; const a = Math.atan2(ty - y, tx - x); const d = dist(x, y, tx, ty); return { x, y, color, tx, ty, isText, vx: Math.cos(a) * d/28 + rand(-2, 2), vy: Math.sin(a) * d/28 + rand(-2, 2), phase: 'falling', life: rand(80, 140), maxLife: 140, hold: 0, size: rand(CONFIG.PIXEL_SIZE * 0.5, CONFIG.PIXEL_SIZE), shimmer: rand(0, Math.PI * 2), spark: false }; }
      function addTimeout(fn, delay) { const id = setTimeout(fn, delay); state.timeouts.push(id); return id; }
      function clearAllTimeouts() { state.timeouts.forEach(id => clearTimeout(id)); state.timeouts = []; }
      function launchText(text) { const maxW = state.width * 0.85; const scale = Math.min(CONFIG.FONT_SCALE, maxW / (text.length * 10)); const pixels = getPixels(text, scale, state.width/2, state.height * 0.4); const groups = Math.min(15, Math.ceil(pixels.length / 15)); const size = Math.ceil(pixels.length / groups); for (let g = 0; g < groups; g++) { addTimeout(() => { if (!state.started) return; const group = pixels.slice(g * size, (g + 1) * size); const ax = group.reduce((s, p) => s + p.x, 0) / group.length; const ay = group.reduce((s, p) => s + p.y, 0) / group.length; state.rockets.push({ x: ax, y: state.height + 50, targetY: ay, color: FIREWORK_COLORS[g % FIREWORK_COLORS.length], speed: CONFIG.ROCKET_SPEED + rand(0, 5), trail: [], exploded: false, targets: group }); AudioEngine.playLaunch(); }, g * 80); } }
      function launchShape(pixels, color, delay) { addTimeout(() => { if (!state.started) return; const groups = Math.min(8, Math.ceil(pixels.length / 25)); const size = Math.ceil(pixels.length / groups); for (let g = 0; g < groups; g++) { addTimeout(() => { const group = pixels.slice(g * size, (g + 1) * size); const ax = group.reduce((s, p) => s + p.x, 0) / group.length; const ay = group.reduce((s, p) => s + p.y, 0) / group.length; state.rockets.push({ x: ax, y: state.height + 50, targetY: ay, color, speed: CONFIG.ROCKET_SPEED + rand(0, 3), trail: [], exploded: false, targets: group }); AudioEngine.playLaunch(); }, g * 60); } }, delay); }
      function launchHeart(customSize, customX, customY, customColor) { const size = customSize || Math.min(state.width, state.height) * 0.25; const cx = customX || state.width / 2; const cy = customY || state.height * 0.38; const pixels = genHeart(cx, cy, size); const color = customColor || null; const groups = Math.min(10, Math.ceil(pixels.length / 20)); const sizeGrp = Math.ceil(pixels.length / groups); for (let g = 0; g < groups; g++) { addTimeout(() => { if (!state.started) return; const group = pixels.slice(g * sizeGrp, (g + 1) * sizeGrp); const ax = group.reduce((s, p) => s + p.x, 0) / group.length; const ay = group.reduce((s, p) => s + p.y, 0) / group.length; state.rockets.push({ x: ax + rand(-10, 10), y: state.height + 50, targetY: ay, color: color || (Math.random() < 0.5 ? COLORS.RED : COLORS.PINK), speed: CONFIG.ROCKET_SPEED + rand(0, 6), trail: [], exploded: false, targets: group, isHeart: true }); AudioEngine.playLaunch(); }, g * 100); } }
      function launchAmbient() { state.rockets.push({ x: rand(state.width * 0.1, state.width * 0.9), y: state.height + 50, targetY: rand(state.height * 0.1, state.height * 0.45), color: randColor(), speed: CONFIG.ROCKET_SPEED + rand(0, 5), trail: [], exploded: false, targets: null }); AudioEngine.playLaunch(); }
      function launchAmbientBurst(count, interval) { for (let i = 0; i < count; i++) { addTimeout(() => { launchAmbient(); AudioEngine.playExplosion(0.5 + Math.random() * 0.3); }, i * interval); } }
      function triggerFinale() { state.finaleTriggered = true; AudioEngine.playFinale(); let delay = 0; launchShape(genCircle(state.width * 0.5, state.height * 0.28, 60, 50), COLORS.CYAN, delay); delay += 1200; launchShape(genCircle(state.width * 0.25, state.height * 0.32, 45, 40), COLORS.MAGENTA, delay); launchShape(genCircle(state.width * 0.75, state.height * 0.32, 45, 40), COLORS.GOLD, delay); delay += 1200; launchShape(genStar(state.width * 0.5, state.height * 0.35, 70, 35, 5), COLORS.WHITE, delay); delay += 1400; launchShape(genTriangle(state.width * 0.2, state.height * 0.4, 65), COLORS.NEON_GREEN, delay); launchShape(genTriangle(state.width * 0.8, state.height * 0.4, 65), COLORS.CORAL, delay); delay += 1200; launchShape(genSquare(state.width * 0.35, state.height * 0.42, 80), COLORS.ELECTRIC_BLUE, delay); launchShape(genSquare(state.width * 0.65, state.height * 0.42, 80), COLORS.LIME, delay); delay += 1200; launchShape(genDiamond(state.width * 0.5, state.height * 0.4, 75), COLORS.HOT_PINK, delay); delay += 1200; launchShape(genSpiral(state.width * 0.3, state.height * 0.38, 60, 3, 60), COLORS.YELLOW, delay); launchShape(genSpiral(state.width * 0.7, state.height * 0.38, 60, 3, 60), COLORS.ORANGE, delay); delay += 1400; launchShape(genHexagon(state.width * 0.2, state.height * 0.35, 60), COLORS.PURPLE, delay); launchShape(genHexagon(state.width * 0.8, state.height * 0.35, 60), COLORS.DEEP_RED, delay); delay += 1200; launchShape(genCross(state.width * 0.5, state.height * 0.45, 90), COLORS.WHITE, delay); delay += 1800; launchHeart(); delay += 4500; addTimeout(() => { AudioEngine.playMegaFinale(); launchShape(genStar(state.width * 0.5, state.height * 0.25, 85, 42, 5), COLORS.GOLD, 0); for (let i = 0; i < 4; i++) { addTimeout(() => { const x = state.width * (0.18 + i * 0.22); const y = state.height * (0.32 + (i % 2) * 0.15); const hSize = Math.min(state.width, state.height) * 0.08; launchHeart(hSize, x, y, [COLORS.RED, COLORS.PINK, COLORS.HOT_PINK, COLORS.CORAL][i]); }, i * 350); } addTimeout(() => launchAmbientBurst(12, 100), 1500); addTimeout(() => { launchShape(genCircle(state.width * 0.5, state.height * 0.38, 90, 70), COLORS.WHITE, 0); launchAmbientBurst(20, 60); }, 3500); addTimeout(() => launchHeart(Math.min(state.width, state.height) * 0.15, state.width * 0.5, state.height * 0.35, COLORS.RED), 5500); addTimeout(() => launchAmbientBurst(25, 50), 7000); addTimeout(() => endDemo(), 9000); }, delay); }
      function endDemo() { addTimeout(() => { state.demoEnding = true; if (state.animationId) { cancelAnimationFrame(state.animationId); state.animationId = null; } const fadeStart = Date.now(); const fadeDuration = 4000; function fadeOut() { const elapsed = Date.now() - fadeStart; const progress = Math.min(elapsed / fadeDuration, 1); ctx.fillStyle = `rgba(0, 0, 8, ${0.05 + progress * 0.2})`; ctx.fillRect(0, 0, state.width, state.height); for (const s of state.stars) { s.brightness += s.speed; const a = ((Math.sin(s.brightness) + 1) / 2) * (1 - progress); ctx.globalAlpha = a * 0.7; ctx.fillStyle = COLORS.CYAN; ctx.fillRect(Math.floor(s.x / CONFIG.PIXEL_SIZE) * CONFIG.PIXEL_SIZE, Math.floor(s.y / CONFIG.PIXEL_SIZE) * CONFIG.PIXEL_SIZE, s.size * CONFIG.PIXEL_SIZE, s.size * CONFIG.PIXEL_SIZE); } ctx.globalAlpha = 1; if (progress < 1) requestAnimationFrame(fadeOut); else { ctx.fillStyle = '#000008'; ctx.fillRect(0, 0, state.width, state.height); showEndScreen(); } } fadeOut(); }, 10000); }
      function showEndScreen() { endScreen.classList.add('active'); addTimeout(() => resetDemo(), 3500); }
      function resetDemo() { clearAllTimeouts(); AudioEngine.cleanup(); state.rockets.length = 0; state.particles.length = 0; state.started = false; state.finaleTriggered = false; state.currentTextIndex = 0; state.lastTextTime = 0; state.isShowingText = false; state.demoEnding = false; if (state.animationId) { cancelAnimationFrame(state.animationId); state.animationId = null; } endScreen.classList.remove('active'); transition.classList.remove('active', 'fade-out'); transition.style.display = ''; canvas.style.opacity = '0'; intro.classList.remove('hidden'); document.body.classList.remove('demo-started'); if (document.fullscreenElement) document.exitFullscreen().catch(() => {}); }
      function animate() { if (!state.started || state.demoEnding) return; state.animationId = requestAnimationFrame(animate); const now = Date.now(); ctx.fillStyle = '#000010'; ctx.fillRect(0, 0, state.width, state.height); for (const s of state.stars) { s.brightness += s.speed; const a = (Math.sin(s.brightness) + 1) / 2; const flicker = Math.random() < 0.02 ? 1.3 : 1; ctx.globalAlpha = a * 0.85 * flicker; const starColor = a > 0.7 ? COLORS.WHITE : (a > 0.4 ? COLORS.CYAN : COLORS.PURPLE); ctx.fillStyle = starColor; ctx.fillRect(Math.floor(s.x / CONFIG.PIXEL_SIZE) * CONFIG.PIXEL_SIZE, Math.floor(s.y / CONFIG.PIXEL_SIZE) * CONFIG.PIXEL_SIZE, s.size * CONFIG.PIXEL_SIZE, s.size * CONFIG.PIXEL_SIZE); } ctx.globalAlpha = 1; if (!state.finaleTriggered) { if (now - state.lastTextTime > 5500 && !state.isShowingText) { state.isShowingText = true; state.lastTextTime = now; launchText(textQueue[state.currentTextIndex++]); if (state.currentTextIndex >= textQueue.length) addTimeout(triggerFinale, 5000); addTimeout(() => state.isShowingText = false, 5000); } if (Math.random() < 0.01 && state.rockets.length < CONFIG.MAX_ROCKETS) launchAmbient(); }
        for (let i = state.rockets.length - 1; i >= 0; i--) { const r = state.rockets[i]; if (r.exploded) continue; r.trail.unshift({ x: r.x, y: r.y }); if (r.trail.length > CONFIG.TRAIL_LENGTH) r.trail.pop(); r.y -= r.speed; r.speed *= 0.982; for (let t = 0; t < r.trail.length; t++) { const p = r.trail[t]; const a = 1 - t / r.trail.length; ctx.globalAlpha = a * 0.7; ctx.fillStyle = r.color; ctx.fillRect(Math.floor(p.x / CONFIG.PIXEL_SIZE) * CONFIG.PIXEL_SIZE, Math.floor(p.y / CONFIG.PIXEL_SIZE) * CONFIG.PIXEL_SIZE, CONFIG.PIXEL_SIZE, CONFIG.PIXEL_SIZE * 1.3); } ctx.globalAlpha = 1; ctx.save(); ctx.shadowColor = r.color; ctx.shadowBlur = 15; ctx.fillStyle = r.color; ctx.beginPath(); ctx.arc(r.x, r.y, 4, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = COLORS.WHITE; ctx.beginPath(); ctx.arc(r.x, r.y, 2, 0, Math.PI * 2); ctx.fill(); ctx.restore(); if (r.y <= r.targetY || r.speed < 2) { r.exploded = true; AudioEngine.playExplosion(r.isHeart ? 1.3 : (r.targets ? 0.95 : 1), r.isHeart || false); if (r.targets && r.targets.length > 0) { r.targets.forEach((tg, ti) => { addTimeout(() => { for (let j = 0; j < CONFIG.PARTICLES_PER_PIXEL; j++) { if (state.particles.length < CONFIG.MAX_PARTICLES) state.particles.push(createParticle(r.x + rand(-10, 10), r.y + rand(-10, 10), r.color, tg.x + rand(-3, 3), tg.y + rand(-3, 3), true)); } }, ti * 0.8); }); } else { for (let p = 0; p < 100; p++) { if (state.particles.length < CONFIG.MAX_PARTICLES) { const a = (Math.PI * 2 * p) / 100 + rand(-0.1, 0.1); const s = rand(3, 12); state.particles.push(createParticle(r.x, r.y, r.color, r.x + Math.cos(a) * s * 28, r.y + Math.sin(a) * s * 28, false)); } } } state.rockets.splice(i, 1); } }
        for (let i = state.particles.length - 1; i >= 0; i--) { const p = state.particles[i]; p.shimmer += 0.25; if (p.isText) { if (p.phase === 'flying') { const d = dist(p.x, p.y, p.tx, p.ty); if (d > 4) { const spd = Math.min(d * 0.22, 24); p.vx = lerp(p.vx, ((p.tx - p.x) / d) * spd, 0.16); p.vy = lerp(p.vy, ((p.ty - p.y) / d) * spd, 0.16); p.x += p.vx; p.y += p.vy; } else { p.x = p.tx; p.y = p.ty; p.phase = 'holding'; } p.life = 255; } else if (p.phase === 'holding') { p.x = p.tx; p.y = p.ty; p.hold -= 16; if (p.hold <= 0) { p.phase = 'falling'; p.vx = rand(-2, 2); p.vy = rand(0, 3); } } else { p.vy += CONFIG.GRAVITY; p.vx *= CONFIG.FRICTION; p.vy *= CONFIG.FRICTION; p.x += p.vx; p.y += p.vy; p.life -= 2.5; if (Math.random() < 0.002) AudioEngine.playCrackle(); } } else { p.vy += CONFIG.GRAVITY; p.vx *= CONFIG.FRICTION; p.vy *= CONFIG.FRICTION; p.x += p.vx; p.y += p.vy; p.life -= 1.8; } if (p.life <= 0 || p.y > state.height + 100) { state.particles.splice(i, 1); continue; } const lifeRatio = p.life / p.maxLife; const sh = (Math.sin(p.shimmer) + 1) / 2; ctx.globalAlpha = lifeRatio * (p.phase === 'holding' ? (0.8 + sh * 0.2) : 1); if (p.isText && (p.phase === 'holding' || p.phase === 'flying')) { ctx.save(); ctx.shadowColor = p.color; ctx.shadowBlur = 10 + sh * 8; ctx.fillStyle = p.color; ctx.fillRect(Math.floor(p.x / CONFIG.PIXEL_SIZE) * CONFIG.PIXEL_SIZE, Math.floor(p.y / CONFIG.PIXEL_SIZE) * CONFIG.PIXEL_SIZE, p.size, p.size); ctx.restore(); } if (p.spark && Math.random() < 0.35) { ctx.fillStyle = COLORS.WHITE; ctx.fillRect(Math.floor(p.x / CONFIG.PIXEL_SIZE) * CONFIG.PIXEL_SIZE + rand(-3, 3), Math.floor(p.y / CONFIG.PIXEL_SIZE) * CONFIG.PIXEL_SIZE + rand(-3, 3), p.size * 0.3, p.size * 0.3); } ctx.fillStyle = p.phase === 'holding' && sh > 0.6 ? COLORS.WHITE : p.color; ctx.fillRect(Math.floor(p.x / CONFIG.PIXEL_SIZE) * CONFIG.PIXEL_SIZE, Math.floor(p.y / CONFIG.PIXEL_SIZE) * CONFIG.PIXEL_SIZE, p.size, p.size); ctx.globalAlpha = 1; }
        ctx.fillStyle = 'rgba(0, 0, 0, 0.025)'; for (let y = 0; y < state.height; y += 2) ctx.fillRect(0, y, state.width, 1); const grad = ctx.createRadialGradient(state.width/2, state.height/2, state.height * 0.4, state.width/2, state.height/2, state.height); grad.addColorStop(0, 'rgba(0,0,0,0)'); grad.addColorStop(0.6, 'rgba(0,0,0,0.05)'); grad.addColorStop(1, 'rgba(0,0,0,0.35)'); ctx.fillStyle = grad; ctx.fillRect(0, 0, state.width, state.height);
      }
      function resizeHandler() { state.width = window.innerWidth; state.height = window.innerHeight; canvas.width = state.width; canvas.height = state.height; }
      window.addEventListener('resize', resizeHandler);
      for (let i = 0; i < CONFIG.STAR_COUNT; i++) state.stars.push({ x: rand(0, state.width), y: rand(0, state.height), brightness: rand(0, Math.PI * 2), speed: rand(0.02, 0.06), size: rand(1, 2) });
      intro.addEventListener('click', async () => { AudioEngine.init(); AudioEngine.playTransition(); document.body.classList.add('demo-started'); try { await document.documentElement.requestFullscreen(); } catch (e) {} transition.classList.add('active'); intro.classList.add('hidden'); addTimeout(() => { transition.classList.add('fade-out'); canvas.style.opacity = '1'; addTimeout(() => { transition.style.display = 'none'; state.started = true; state.lastTextTime = Date.now(); animate(); }, 500); }, 1200); });
  window.addEventListener('beforeunload', () => { clearAllTimeouts(); AudioEngine.cleanup(); if (state.animationId) cancelAnimationFrame(state.animationId); });
})();
