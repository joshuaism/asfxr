import { Component } from '@angular/core';
import { Descriptor, Shape, makeDescriptor, synthesizeSamples } from 'tsfxr';
import { pickupCoin, laserShoot, explosion, powerup, hitHurt, jump, blipSelect, randomize, mutate, tone } from './generators';
import { Subscription, fromEvent } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'asfxr - Sound Effects Generator';
	subscription: Subscription;
	wav;

	constructor(private sanitizer: DomSanitizer) { }

	ngOnInit() {
		this.subscription = fromEvent(document, 'keypress', e => e.key).subscribe(key => {
			key = key.toLowerCase();
			this.onGeneratorClick(key);
		});
		this.saveAudio();
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onGeneratorClick(gen: string) {
		gen = gen.toLowerCase();
		switch (gen) {
			case 'c': setDescriptor(pickupCoin()); break;
			case 'l': setDescriptor(laserShoot()); break;
			case 'e': setDescriptor(explosion()); break;
			case 'p': setDescriptor(powerup()); break;
			case 'h': setDescriptor(hitHurt()); break;
			case 'j': setDescriptor(jump()); break;
			case 'b': setDescriptor(blipSelect()); break;
			case 't': setDescriptor(tone()); break;
			case 'r': setDescriptor(randomize()); break;
			case 'm': setDescriptor(mutate(currentDescriptor)); break;
			case 'a': playDescriptor(currentDescriptor); break;
			case '1':
			case '2':
			case '3':
			case '4': this.setWaveTypeAndUI(parseInt(gen, 10)); break;
		}
		this.saveAudio();
	}

	saveAudio() {
		var samples = synthesizeSamples(currentDescriptor);
		const ctx = new AudioContext();
		const buffer = ctx.createBuffer(2, samples.length, wav_freq);
		const data = buffer.getChannelData(0);

		for (let i = 0; i < samples.length; i++) {
			data[i] = samples[i];
		}

		const proc = ctx.createBufferSource();
		proc.buffer = buffer;

		let url = bufferToWave(buffer, samples.length);
		console.log(url);
		this.wav = this.sanitizer.bypassSecurityTrustUrl(url);
	}

	setWaveTypeAndUI(value: number) {
		let desc = makeDescriptor(currentDescriptor);
		this.setWaveType(value, desc);
		setDescriptor(desc, true);
	}

	onWaveTypeClick(event: MouseEvent) {
		const target = <HTMLInputElement>event.target;
		let desc = makeDescriptor(currentDescriptor);
		this.setWaveType(parseInt(target.value, 10), desc);
		setDescriptor(desc, false);
		this.saveAudio();
	}

	setWaveType(val: number, desc: Descriptor) {
		switch (val) {
			case 1: desc.wave_type = Shape.Square; break;
			case 2: desc.wave_type = Shape.Sawtooth; break;
			case 3: desc.wave_type = Shape.Sine; break;
			case 4: desc.wave_type = Shape.Noise; break;
		}
	}

	onSliderChange(event: Event) {
		const target = <HTMLInputElement>event.target;
		let desc = makeDescriptor(currentDescriptor);
		desc[target.name] = +target.value;
		setDescriptor(desc, false);
		this.saveAudio();
	};

	onWaveFrequencyClick(event: MouseEvent) {
		const target = <HTMLInputElement>event.target;
		wav_freq = parseInt(target.value, 10);
		setDescriptor(currentDescriptor, false);
		this.saveAudio();
	};

	onWaveBitsClick(event: MouseEvent) {
		const target = <HTMLInputElement>event.target;
		wav_bits = parseInt(target.value, 10);
		setDescriptor(currentDescriptor, false);
		this.saveAudio();
	};
}

function getInputElementById(id: string) {
	return <HTMLInputElement> document.getElementById(id);
}

var wav_bits = 16;
var wav_freq = 44100;
var currentDescriptor = makeDescriptor();

function setDescriptor(desc: Descriptor, shouldUpdateUI = true) {
	currentDescriptor = desc;
	playDescriptor(desc);

	if (shouldUpdateUI) {
		updateUI(desc);
  }
  console.log(currentDescriptor);
}

document.addEventListener('DOMContentLoaded', function() {
	updateUI(currentDescriptor);
})

function playDescriptor(desc: Descriptor) {
	const samples = synthesizeSamples(desc);
	playSamples(samples, wav_freq);
}

function playSamples(samples: Array<number>, sampleRate: number) {
	const ctx = new AudioContext();
	const buffer = ctx.createBuffer(1, samples.length, sampleRate);
	const data = buffer.getChannelData(0);

	for (let i = 0; i < samples.length; i++) {
		data[i] = samples[i];
	}

	const proc = ctx.createBufferSource();
	proc.buffer = buffer;
	proc.connect(ctx.destination);
	proc.start();
}

function updateUI(desc: Descriptor) {
	switch (desc.wave_type) {
	case Shape.Square: getInputElementById('wave_type_square').checked = true; break;
	case Shape.Sawtooth: getInputElementById('wave_type_sawtooth').checked = true; break;
	case Shape.Sine: getInputElementById('wave_type_sine').checked = true; break;
	case Shape.Noise: getInputElementById('wave_type_noise').checked = true; break;
	}

	getInputElementById('sound_vol').value = '' + desc.sound_vol;
	getInputElementById('p_env_attack').value = '' + desc.p_env_attack;
	getInputElementById('p_env_sustain').value = '' + desc.p_env_sustain;
	getInputElementById('p_env_punch').value = '' + desc.p_env_punch;
	getInputElementById('p_env_decay').value = '' + desc.p_env_decay;
	getInputElementById('p_base_freq').value = '' + desc.p_base_freq;
	getInputElementById('p_freq_limit').value = '' + desc.p_freq_limit;
	getInputElementById('p_freq_ramp').value = '' + desc.p_freq_ramp;
	getInputElementById('p_freq_dramp').value = '' + desc.p_freq_dramp;
	getInputElementById('p_vib_strength').value = '' + desc.p_vib_strength;
	getInputElementById('p_vib_speed').value = '' + desc.p_vib_speed;
	getInputElementById('p_arp_mod').value = '' + desc.p_arp_mod;
	getInputElementById('p_arp_speed').value = '' + desc.p_arp_speed;
	getInputElementById('p_duty').value = '' + desc.p_duty;
	getInputElementById('p_duty_ramp').value = '' + desc.p_duty_ramp;
	getInputElementById('p_repeat_speed').value = '' + desc.p_repeat_speed;
	getInputElementById('p_pha_offset').value = '' + desc.p_pha_offset;
	getInputElementById('p_pha_ramp').value = '' + desc.p_pha_ramp;
	getInputElementById('p_lpf_freq').value = '' + desc.p_lpf_freq;
	getInputElementById('p_lpf_ramp').value = '' + desc.p_lpf_ramp;
	getInputElementById('p_lpf_resonance').value = '' + desc.p_lpf_resonance;
	getInputElementById('p_hpf_freq').value = '' + desc.p_hpf_freq;
	getInputElementById('p_hpf_ramp').value = '' + desc.p_hpf_ramp;

	switch (wav_freq) {
	case 44100: getInputElementById('wav_freq_44100').checked = true; break;
	case 22050: getInputElementById('wav_freq_22050').checked = true; break;
	}

	switch (wav_bits) {
	case 8: getInputElementById('wav_bits_8').checked = true; break;
	case 16: getInputElementById('wav_bits_16').checked = true; break;
	}
}

function bufferToWave(abuffer, len) {
    var numOfChan = abuffer.numberOfChannels,
        length = len * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [], i, sample,
        offset = 0,
        pos = 0;
  
    // write WAVE header
    setUint32(0x46464952);                         // "RIFF"
    setUint32(length - 8);                         // file length - 8
    setUint32(0x45564157);                         // "WAVE"
  
    setUint32(0x20746d66);                         // "fmt " chunk
    setUint32(16);                                 // length = 16
    setUint16(1);                                  // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2);                      // block-align
    setUint16(16);                                 // 16-bit (hardcoded in this demo)
  
    setUint32(0x61746164);                         // "data" - chunk
    setUint32(length - pos - 4);                   // chunk length
  
    // write interleaved data
    for(i = 0; i < abuffer.numberOfChannels; i++)
      channels.push(abuffer.getChannelData(i));
  
    while(pos < length) {
      for(i = 0; i < numOfChan; i++) {             // interleave channels
        sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; // scale to 16-bit signed int
        view.setInt16(pos, sample, true);          // write 16-bit sample
        pos += 2;
      }
      offset++                                     // next source sample
    }
  
    // create Blob
    var wav = new Blob([buffer], {type: "audio/wav"});
	var dataURI = URL.createObjectURL(wav);
	return dataURI;
    
    function setUint16(data) {
        view.setUint16(pos, data, true);
        pos += 2;
      }
    
      function setUint32(data) {
        view.setUint32(pos, data, true);
        pos += 4;
      }
    }