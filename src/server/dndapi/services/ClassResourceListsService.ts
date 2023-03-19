/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIReferenceList } from '../models/APIReferenceList';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ClassResourceListsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get subclasses available for a class.
     * @param index The `index` of the class to get.
     *
     * @returns APIReferenceList OK
     * @throws ApiError
     */
    public getApiClassesSubclasses(
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
    ): CancelablePromise<APIReferenceList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/classes/{index}/subclasses',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get spells available for a class.
     * @param index The `index` of the class to get.
     *
     * @returns APIReferenceList OK
     * @throws ApiError
     */
    public getApiClassesSpells(
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
    ): CancelablePromise<APIReferenceList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/classes/{index}/spells',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get features available for a class.
     * @param index The `index` of the class to get.
     *
     * @returns APIReferenceList List of features for the class.
     * @throws ApiError
     */
    public getApiClassesFeatures(
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
    ): CancelablePromise<APIReferenceList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/classes/{index}/features',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get proficiencies available for a class.
     * @param index The `index` of the class to get.
     *
     * @returns APIReferenceList List of proficiencies for the class.
     * @throws ApiError
     */
    public getApiClassesProficiencies(
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
    ): CancelablePromise<APIReferenceList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/classes/{index}/proficiencies',
            path: {
                'index': index,
            },
        });
    }

}
