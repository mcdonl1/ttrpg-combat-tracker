/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Feat } from '../models/Feat';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FeatsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get a feat by index.
     * # Feat
     *
     * A feat is a boon a character can receive at level up instead of an ability score increase.
     *
     * @param index The `index` of the feat to get.
     *
     * @returns Feat OK
     * @throws ApiError
     */
    public getApiFeats(
        index: 'grappler',
    ): CancelablePromise<Feat> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/feats/{index}',
            path: {
                'index': index,
            },
        });
    }

}
