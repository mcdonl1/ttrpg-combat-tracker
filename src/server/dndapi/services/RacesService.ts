/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIReferenceList } from '../models/APIReferenceList';
import type { Race } from '../models/Race';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class RacesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get a race by index.
     * Each race grants your character ability and skill bonuses as well as racial traits.
     * @param index The `index` of the race to get.
     *
     * @returns Race OK
     * @throws ApiError
     */
    public getApiRaces(
        index: 'dragonborn' | 'dwarf' | 'elf' | 'gnome' | 'half-elf' | 'half-orc' | 'halfling' | 'human' | 'tiefling',
    ): CancelablePromise<Race> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/races/{index}',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get subraces available for a race.
     * @param index The `index` of the race to get.
     *
     * @returns APIReferenceList List of subraces for the race.
     * @throws ApiError
     */
    public getApiRacesSubraces(
        index: 'dragonborn' | 'dwarf' | 'elf' | 'gnome' | 'half-elf' | 'half-orc' | 'halfling' | 'human' | 'tiefling',
    ): CancelablePromise<APIReferenceList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/races/{index}/subraces',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get proficiencies available for a race.
     * @param index The `index` of the race to get.
     *
     * @returns APIReferenceList List of proficiencies for the race.
     * @throws ApiError
     */
    public getApiRacesProficiencies(
        index: 'dragonborn' | 'dwarf' | 'elf' | 'gnome' | 'half-elf' | 'half-orc' | 'halfling' | 'human' | 'tiefling',
    ): CancelablePromise<APIReferenceList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/races/{index}/proficiencies',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get traits available for a race.
     * @param index The `index` of the race to get.
     *
     * @returns APIReferenceList List of traits for the race.
     * @throws ApiError
     */
    public getApiRacesTraits(
        index: 'dragonborn' | 'dwarf' | 'elf' | 'gnome' | 'half-elf' | 'half-orc' | 'halfling' | 'human' | 'tiefling',
    ): CancelablePromise<APIReferenceList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/races/{index}/traits',
            path: {
                'index': index,
            },
        });
    }

}
