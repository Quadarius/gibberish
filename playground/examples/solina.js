/*
 * The chorus effect in gibberish is modeled after the ensemble effect found in
 * the Arp Solina-V string ensemble. This effect uses three heavily modulated delay
 * lines (six in stereo) to create its effect. There are oscillators modulating the
 * "slow" delay lines, which create gradual fluctuations in pitch, and oscillators
 * modulating the "fast" delay line, which creates a vibrao effect. The frequency and
 * amplitude of the the slow and fast delay lines can be set in groups.
 */

// create a polysynth to feed the chorus
syn = PolySynth({ waveform:'square', attack:44100 / 2, decay:88200 * 1.8, antialias:true, gain:.25 })

// create our chorus effect
chorus = Chorus({ input: syn }).connect()

// feed chorus into reverb
verb = Freeverb({ input: chorus, roomSize: .95, damping:.95 }).connect()

// play some dark chordy goodness... Depeche Mode - Drive
baseChord = [55,110,220,330,440,520]

seq = Sequencer.make( 
  [ 
    baseChord, 
    baseChord.map( v=> v * 1.2 ), 
    baseChord.map( v=> v * .8  ), 
    baseChord.map( v=> v * .95 )
  ], 

  [88200 * 2], // 4 seconds per note
  syn, 
  'chord' 
).start()

// kick drum just because
kick = Kick().connect()
kickseq = Sequencer.make( [80], [22050], kick, 'note' ).start()

// increase the strength of the "slow" modulation
chorus.slowGain = 2

// decrease the speed of the "fast", or vibrato, modulation
chorus.fastFrequency = 2

// get intense
chorus.slowGain = 4
chorus.fastGain = .5
