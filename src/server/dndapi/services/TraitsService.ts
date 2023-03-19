/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Trait } from '../models/Trait';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TraitsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get a trait by index.
     * @param index The `index` of the `Trait` to get.
     * @returns Trait OK
     * @throws ApiError
     */
    public getApiTraits(
        index: 'artificers-lore' | 'brave' | 'breath-weapon' | 'damage-resistance' | 'darkvision' | 'draconic-ancestry' | 'draconic-ancestry-black' | 'draconic-ancestry-blue' | 'draconic-ancestry-brass' | 'draconic-ancestry-bronze' | 'draconic-ancestry-copper' | 'draconic-ancestry-gold' | 'draconic-ancestry-green' | 'draconic-ancestry-red' | 'draconic-ancestry-silver' | 'draconic-ancestry-white' | 'dwarven-combat-training' | 'dwarven-resilience' | 'dwarven-toughness' | 'elf-weapon-training' | 'extra-language' | 'fey-ancestry' | 'gnome-cunning' | 'halfling-nimbleness' | 'hellish-resistance' | 'high-elf-cantrip' | 'infernal-legacy' | 'keen-senses' | 'lucky' | 'menacing' | 'naturally-stealthy' | 'relentless-endurance' | 'savage-attacks' | 'skill-versatility' | 'stonecunning' | 'tinker' | 'tool-proficiency' | 'trance',
    ): CancelablePromise<Trait> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/traits/{index}',
            path: {
                'index': index,
            },
        });
    }

}
