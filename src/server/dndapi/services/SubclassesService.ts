/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIReferenceList } from '../models/APIReferenceList';
import type { Subclass } from '../models/Subclass';
import type { SubclassLevel } from '../models/SubclassLevel';
import type { SubclassLevelResource } from '../models/SubclassLevelResource';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class SubclassesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get a subclass by index.
     * Subclasses reflect the different paths a class may take as levels are gained.
     * @param index The `index` of the subclass to get.
     *
     * @returns Subclass OK
     * @throws ApiError
     */
    public getApiSubclasses(
        index: 'berserker' | 'champion' | 'devotion' | 'draconic' | 'evocation' | 'fiend' | 'hunter' | 'land' | 'life' | 'lore' | 'open-hand' | 'thief',
    ): CancelablePromise<Subclass> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/subclasses/{index}',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get features available for a subclass.
     * @param index The `index` of the subclass to get.
     *
     * @returns APIReferenceList List of features for the subclass.
     * @throws ApiError
     */
    public getApiSubclassesFeatures(
        index: 'berserker' | 'champion' | 'devotion' | 'draconic' | 'evocation' | 'fiend' | 'hunter' | 'land' | 'life' | 'lore' | 'open-hand' | 'thief',
    ): CancelablePromise<APIReferenceList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/subclasses/{index}/features',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get all level resources for a subclass.
     * @param index The `index` of the subclass to get.
     *
     * @returns SubclassLevelResource List of level resource for the subclass.
     * @throws ApiError
     */
    public getApiSubclassesLevels(
        index: 'berserker' | 'champion' | 'devotion' | 'draconic' | 'evocation' | 'fiend' | 'hunter' | 'land' | 'life' | 'lore' | 'open-hand' | 'thief',
    ): CancelablePromise<Array<SubclassLevelResource>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/subclasses/{index}/levels',
            path: {
                'index': index,
            },
        });
    }

    /**
     * Get level resources for a subclass and level.
     * @param index The `index` of the subclass to get.
     *
     * @param subclassLevel
     * @returns SubclassLevel Level resource for the subclass and level.
     * @throws ApiError
     */
    public getApiSubclassesLevels1(
        index: 'berserker' | 'champion' | 'devotion' | 'draconic' | 'evocation' | 'fiend' | 'hunter' | 'land' | 'life' | 'lore' | 'open-hand' | 'thief',
        subclassLevel: number,
    ): CancelablePromise<SubclassLevel> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/subclasses/{index}/levels/{subclass_level}',
            path: {
                'index': index,
                'subclass_level': subclassLevel,
            },
        });
    }

    /**
     * Get features of the requested spell level available to the class.
     * @param index The `index` of the subclass to get.
     *
     * @param subclassLevel
     * @returns APIReferenceList List of features for the subclass and level.
     * @throws ApiError
     */
    public getApiSubclassesLevelsFeatures(
        index: 'berserker' | 'champion' | 'devotion' | 'draconic' | 'evocation' | 'fiend' | 'hunter' | 'land' | 'life' | 'lore' | 'open-hand' | 'thief',
        subclassLevel: number,
    ): CancelablePromise<APIReferenceList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/subclasses/{index}/levels/{subclass_level}/features',
            path: {
                'index': index,
                'subclass_level': subclassLevel,
            },
        });
    }

}
