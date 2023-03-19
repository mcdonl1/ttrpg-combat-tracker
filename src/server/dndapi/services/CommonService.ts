/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIReferenceList } from '../models/APIReferenceList';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class CommonService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get all resource URLs.
     * Making a request to the API's base URL returns an object containing available endpoints.
     * @returns string OK
     * @throws ApiError
     */
    public getApi(): CancelablePromise<Record<string, string>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api',
        });
    }

    /**
     * Get list of all available resources for an endpoint.
     * Currently only the [`/spells`](#get-/api/spells) and [`/monsters`](#get-/api/monsters) endpoints support filtering with query parameters. Use of these query parameters is documented under the respective [Spells](#tag--Spells) and [Monsters](#tag--Monsters) sections.
     *
     * @param endpoint
     * @returns APIReferenceList OK
     * @throws ApiError
     */
    public getApi1(
        endpoint: 'ability-scores' | 'alignments' | 'backgrounds' | 'classes' | 'conditions' | 'damage-types' | 'equipment' | 'equipment-categories' | 'feats' | 'features' | 'languages' | 'magic-items' | 'magic-schools' | 'monsters' | 'proficiencies' | 'races' | 'rule-sections' | 'rules' | 'skills' | 'spells' | 'subclasses' | 'subraces' | 'traits' | 'weapon-properties',
    ): CancelablePromise<APIReferenceList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/{endpoint}',
            path: {
                'endpoint': endpoint,
            },
        });
    }

}
