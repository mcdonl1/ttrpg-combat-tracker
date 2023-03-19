/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIReferenceList } from '../models/APIReferenceList';
import type { Monster } from '../models/Monster';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class MonstersService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get list of monsters with optional filtering
     * @param challengeRating The challenge rating or ratings to filter on.
     * @returns APIReferenceList OK
     * @throws ApiError
     */
    public getApiMonsters(
        challengeRating?: Array<number>,
    ): CancelablePromise<APIReferenceList> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/monsters',
            query: {
                'challenge_rating': challengeRating,
            },
        });
    }

    /**
     * Get monster by index.
     * @param index The `index` of the `Monster` to get.
     *
     * @returns Monster OK
     * @throws ApiError
     */
    public getApiMonsters1(
        index: string,
    ): CancelablePromise<Monster> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/monsters/{index}',
            path: {
                'index': index,
            },
        });
    }

}
