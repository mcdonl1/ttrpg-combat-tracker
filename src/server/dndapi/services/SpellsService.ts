/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIReferenceList } from '../models/APIReferenceList';
import type { Spell } from '../models/Spell';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SpellsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get list of spells with optional filtering.
     * @param level The level or levels to filter on.
     * @param school The magic school or schools to filter on.
     * @returns APIReferenceList OK
     * @throws ApiError
     */
    public getApiSpells(
        level?: Array<number>,
        school?: Array<string>,
    ): CancelablePromise<APIReferenceList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/spells',
            query: {
                'level': level,
                'school': school,
            },
        });
    }

    /**
     * Get a spell by index.
     * @param index The `index` of the `Spell` to get.
     *
     * Available values can be found in the [`ResourceList`](#get-/api/-endpoint-) for `spells`.
     *
     * @returns Spell OK
     * @throws ApiError
     */
    public getApiSpells1(
        index: string,
    ): CancelablePromise<Spell> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/spells/{index}',
            path: {
                'index': index,
            },
        });
    }

}
