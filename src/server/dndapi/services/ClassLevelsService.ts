/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIReferenceList } from '../models/APIReferenceList';
import type { ClassLevel } from '../models/ClassLevel';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ClassLevelsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get all level resources for a class.
     * @param index The `index` of the class to get.
     *
     * @param subclass Adds subclasses for class to the response
     * @returns ClassLevel OK
     * @throws ApiError
     */
    public getApiClassesLevels(
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
        subclass?: string,
    ): CancelablePromise<Array<ClassLevel>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/classes/{index}/levels',
            path: {
                'index': index,
            },
            query: {
                'subclass': subclass,
            },
        });
    }

    /**
     * Get level resource for a class and level.
     * @param index The `index` of the class to get.
     *
     * @param classLevel
     * @returns ClassLevel OK
     * @throws ApiError
     */
    public getApiClassesLevels1(
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
        classLevel: number,
    ): CancelablePromise<ClassLevel> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/classes/{index}/levels/{class_level}',
            path: {
                'index': index,
                'class_level': classLevel,
            },
        });
    }

    /**
     * Get features available to a class at the requested level.
     * @param index The `index` of the class to get.
     *
     * @param classLevel
     * @returns APIReferenceList OK
     * @throws ApiError
     */
    public getApiClassesLevelsFeatures(
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
        classLevel: number,
    ): CancelablePromise<APIReferenceList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/classes/{index}/levels/{class_level}/features',
            path: {
                'index': index,
                'class_level': classLevel,
            },
        });
    }

    /**
     * Get spells of the requested level available to the class.
     * @param index The `index` of the class to get.
     *
     * @param spellLevel
     * @returns APIReferenceList OK
     * @throws ApiError
     */
    public getApiClassesLevelsSpells(
        index: 'barbarian' | 'bard' | 'cleric' | 'druid' | 'fighter' | 'monk' | 'paladin' | 'ranger' | 'rogue' | 'sorcerer' | 'warlock' | 'wizard',
        spellLevel: number,
    ): CancelablePromise<APIReferenceList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/classes/{index}/levels/{spell_level}/spells',
            path: {
                'index': index,
                'spell_level': spellLevel,
            },
        });
    }

}
