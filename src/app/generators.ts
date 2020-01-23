import {Descriptor, Shape, makeDescriptor} from 'tsfxr';

function rnd(n: number) {
	return Math.floor(Math.random() * (n + 1));
}

function frnd(range: number) {
	return Math.random() * range;
}

function pick(choices: Array<any>) {
	return choices[Math.floor(Math.random() * choices.length)];
}

export function pickupCoin(params?) {
	let desc = makeDescriptor(params);

	desc.p_base_freq = 0.4 + frnd(0.5);
	desc.p_env_attack = 0.0;
	desc.p_env_sustain = frnd(0.1);
	desc.p_env_decay = 0.1 + frnd(0.4);
	desc.p_env_punch = 0.3 + frnd(0.3);

	if (rnd(1)) {
		desc.p_arp_speed = 0.5 + frnd(0.2);
		desc.p_arp_mod = 0.2 + frnd(0.4);
	}

	return desc;
}

export function laserShoot(params?) {
	let desc = makeDescriptor(params);

	desc.wave_type = pick([Shape.Square, Shape.Sawtooth, Shape.Sine]);

	if (desc.wave_type === Shape.Sine && rnd(1)) {
		desc.wave_type = pick([Shape.Square, Shape.Sawtooth]);
	}

	desc.p_base_freq = 0.5 + frnd(0.5);
	desc.p_freq_limit = desc.p_base_freq - 0.2 - frnd(0.6);

	if (desc.p_freq_limit < 0.2) {
		desc.p_freq_limit = 0.2;
	}

	desc.p_freq_ramp = -0.15 - frnd(0.2);

	if (rnd(2) === 0) {
		desc.p_base_freq = 0.3 + frnd(0.6);
		desc.p_freq_limit = frnd(0.1);
		desc.p_freq_ramp = -0.35 - frnd(0.3);
	}

	if (rnd(1)) {
		desc.p_duty = frnd(0.5);
		desc.p_duty_ramp = frnd(0.2);
	}
	else {
		desc.p_duty = 0.4 + frnd(0.5);
		desc.p_duty_ramp = -frnd(0.7);
	}

	desc.p_env_attack = 0.0;
	desc.p_env_sustain = 0.1 + frnd(0.2);
	desc.p_env_decay = frnd(0.4);

	if (rnd(1)) {
		desc.p_env_punch = frnd(0.3);
	}

	if (rnd(2) === 0) {
		desc.p_pha_offset = frnd(0.2);
		desc.p_pha_ramp = -frnd(0.2);
	}
	if (rnd(1)) {
		desc.p_hpf_freq = frnd(0.3);
	}

	return desc;
}

export function explosion(params?) {
	let desc = makeDescriptor(params);

	desc.wave_type = Shape.Noise;

	if (rnd(1)) {
		desc.p_base_freq = 0.1 + frnd(0.4);
		desc.p_freq_ramp = -0.1 + frnd(0.4);
	}
	else {
		desc.p_base_freq = 0.2 + frnd(0.7);
		desc.p_freq_ramp = -0.2 - frnd(0.2);
	}

	desc.p_base_freq *= desc.p_base_freq;

	if (rnd(4) === 0) {
		desc.p_freq_ramp = 0.0;
	}
	if (rnd(2) === 0) {
		desc.p_repeat_speed = 0.3 + frnd(0.5);
	}

	desc.p_env_attack = 0.0;
	desc.p_env_sustain = 0.1 + frnd(0.3);
	desc.p_env_decay = frnd(0.5);

	if (rnd(1) === 0) {
		desc.p_pha_offset = -0.3 + frnd(0.9);
		desc.p_pha_ramp = -frnd(0.3);
	}

	desc.p_env_punch = 0.2 + frnd(0.6);

	if (rnd(1)) {
		desc.p_vib_strength = frnd(0.7);
		desc.p_vib_speed = frnd(0.6);
	}

	if (rnd(2) === 0) {
		desc.p_arp_speed = 0.6 + frnd(0.3);
		desc.p_arp_mod = 0.8 - frnd(1.6);
	}

	return desc;
}

export function powerup(params?) {
	let desc = makeDescriptor(params);

	if (rnd(1)) {
		desc.wave_type = Shape.Sawtooth;
	}
	else {
		desc.p_duty = frnd(0.6);
	}

	if (rnd(1)) {
		desc.p_base_freq = 0.2 + frnd(0.3);
		desc.p_freq_ramp = 0.1 + frnd(0.4);
		desc.p_repeat_speed = 0.4 + frnd(0.4);
	}
	else {
		desc.p_base_freq = 0.2 + frnd(0.3);
		desc.p_freq_ramp = 0.05 + frnd(0.2);

		if (rnd(1)) {
			desc.p_vib_strength = frnd(0.7);
			desc.p_vib_speed = frnd(0.6);
		}
	}

	desc.p_env_attack = 0.0;
	desc.p_env_sustain = frnd(0.4);
	desc.p_env_decay = 0.1 + frnd(0.4);

	return desc;
}

export function hitHurt(params?) {
	let desc = makeDescriptor(params);

	desc.wave_type = pick([Shape.Square, Shape.Sawtooth, Shape.Noise]);

	if (desc.wave_type === 0) {
		desc.p_duty = frnd(0.6);
	}

	desc.p_base_freq = 0.2 + frnd(0.6);
	desc.p_freq_ramp = -0.3 - frnd(0.4);
	desc.p_env_attack = 0.0;
	desc.p_env_sustain = frnd(0.1);
	desc.p_env_decay = 0.1 + frnd(0.2);

	if (rnd(1)) {
		desc.p_hpf_freq = frnd(0.3);
	}

	return desc;
}

export function jump(params?) {
	let desc = makeDescriptor(params);

	desc.wave_type = Shape.Square;
	desc.p_duty = frnd(0.6);
	desc.p_base_freq = 0.3 + frnd(0.3);
	desc.p_freq_ramp = 0.1 + frnd(0.2);
	desc.p_env_attack = 0.0;
	desc.p_env_sustain = 0.1 + frnd(0.3);
	desc.p_env_decay = 0.1 + frnd(0.2);

	if (rnd(1)) {
		desc.p_hpf_freq = frnd(0.3);
	}

	if (rnd(1)) {
		desc.p_lpf_freq = 1.0 - frnd(0.6);
	}

	return desc;
}

export function blipSelect(params?) {
	let desc = makeDescriptor(params);

	desc.wave_type = rnd(1);

	if (desc.wave_type === Shape.Square) {
		desc.p_duty = frnd(0.6);
	}

	desc.p_base_freq = 0.2 + frnd(0.4);
	desc.p_env_attack = 0.0;
	desc.p_env_sustain = 0.1 + frnd(0.1);
	desc.p_env_decay = frnd(0.2);
	desc.p_hpf_freq = 0.1;

	return desc;
}

export function tone(params?) {
	let desc = makeDescriptor(params);

	desc.wave_type = Shape.Sine;
	desc.p_base_freq = 0.24 + frnd(0.5);
	desc.p_env_attack = 0;
    desc.p_env_sustain = 0.6641; // 1 sec
    desc.p_env_decay = 0;
    desc.p_env_punch = 0;
    return desc;
}

export function randomize(params?) {
	let desc = makeDescriptor(params);

	desc.p_base_freq = Math.pow(frnd(2.0) - 1.0, 2.0);

	if (rnd(1)) {
		desc.p_base_freq = Math.pow(frnd(2.0) - 1.0, 3.0) + 0.5;
	}

	desc.p_freq_limit = 0.0;
	desc.p_freq_ramp = Math.pow(frnd(2.0) - 1.0, 5.0);

	if (desc.p_base_freq > 0.7 && desc.p_freq_ramp > 0.2) {
		desc.p_freq_ramp = -desc.p_freq_ramp;
	}

	if (desc.p_base_freq < 0.2 && desc.p_freq_ramp < -0.05) {
		desc.p_freq_ramp = -desc.p_freq_ramp;
	}

	desc.p_freq_dramp = Math.pow(frnd(2.0) - 1.0, 3.0);
	desc.p_duty = frnd(2.0) - 1.0;
	desc.p_duty_ramp = Math.pow(frnd(2.0) - 1.0, 3.0);
	desc.p_vib_strength = Math.pow(frnd(2.0) - 1.0, 3.0);
	desc.p_vib_speed = frnd(2.0) - 1.0;
	desc.p_vib_delay = frnd(2.0) - 1.0;
	desc.p_env_attack = Math.pow(frnd(2.0) - 1.0, 3.0);
	desc.p_env_sustain = Math.pow(frnd(2.0) - 1.0, 2.0);
	desc.p_env_decay = frnd(2.0) - 1.0;
	desc.p_env_punch = Math.pow(frnd(0.8), 2.0);

	if (desc.p_env_attack + desc.p_env_sustain + desc.p_env_decay < 0.2) {
		desc.p_env_sustain += 0.2 + frnd(0.3);
		desc.p_env_decay += 0.2 + frnd(0.3);
	}

	desc.p_lpf_resonance = frnd(2.0) - 1.0;
	desc.p_lpf_freq = 1.0 - Math.pow(frnd(1.0), 3.0);
	desc.p_lpf_ramp = Math.pow(frnd(2.0) - 1.0, 3.0);

	if (desc.p_lpf_freq < 0.1 && desc.p_lpf_ramp < -0.05) {
		desc.p_lpf_ramp = -desc.p_lpf_ramp;
	}

	desc.p_hpf_freq = Math.pow(frnd(1.0), 5.0);
	desc.p_hpf_ramp = Math.pow(frnd(2.0) - 1.0, 5.0);
	desc.p_pha_offset = Math.pow(frnd(2.0) - 1.0, 3.0);
	desc.p_pha_ramp = Math.pow(frnd(2.0) - 1.0, 3.0);
	desc.p_repeat_speed = frnd(2.0) - 1.0;
	desc.p_arp_speed = frnd(2.0) - 1.0;
	desc.p_arp_mod = frnd(2.0) - 1.0;

	return desc;
}

export function mutate(base: Descriptor) {
	let desc = makeDescriptor(base);

	if (rnd(1)) desc.p_base_freq += frnd(0.1) - 0.05;
	// if (rnd(1)) desc.p_freq_limit += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_freq_ramp += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_freq_dramp += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_duty += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_duty_ramp += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_vib_strength += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_vib_speed += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_vib_delay += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_env_attack += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_env_sustain += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_env_decay += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_env_punch += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_lpf_resonance += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_lpf_freq += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_lpf_ramp += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_hpf_freq += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_hpf_ramp += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_pha_offset += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_pha_ramp += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_repeat_speed += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_arp_speed += frnd(0.1) - 0.05;
	if (rnd(1)) desc.p_arp_mod += frnd(0.1) - 0.05;

	return desc;
}