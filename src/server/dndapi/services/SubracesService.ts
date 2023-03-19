/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIReferenceList } from '../models/APIReferenceList';
import type { Subrace } from '../models/Subrace';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SubracesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get a subrace by index.
     * Subraces reflect the different varieties of a certain parent race.
     * @param index The `index` of the subrace to get.
     *
     * @returns Subrace OK
     * @throws ApiError
     */
    public getApiSubraces(
        index: 'high-elf' | 'hill-dwarf' | 'lightfoot-halfling' | 'rock-gnome',
    ): CancelablePromise<Subrace> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/subraces/{index}',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get proficiences available for a subrace.
     * @param index The `index` of the subrace to get.
     *
     * @returns APIReferenceList List of proficiences for the subrace.
     * @throws ApiError
     */
    public getApiSubracesProficiencies(
        index: 'high-elf' | 'hill-dwarf' | 'lightfoot-halfling' | 'rock-gnome',
    ): CancelablePromise<APIReferenceList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/subraces/{index}/proficiencies',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get traits available for a subrace.
     * @param index The `index` of the subrace to get.
     *
     * @returns APIReferenceList List of traits for the subrace.
     * @throws ApiError
     */
    public getApiSubracesTraits(
        index: 'high-elf' | 'hill-dwarf' | 'lightfoot-halfling' | 'rock-gnome',
    ): CancelablePromise<APIReferenceList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/subraces/{index}/traits',
            path: {
                'index': index,
            },
        });
    }

}
