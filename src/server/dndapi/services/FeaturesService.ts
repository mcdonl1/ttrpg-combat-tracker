/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Feature } from '../models/Feature';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class FeaturesService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get a feature by index.
     * # Feature
     *
     * When you gain a new level in a class, you get its features for that level.
     * You don’t, however, receive the class’s starting Equipment, and a few
     * features have additional rules when you’re multiclassing: Channel Divinity,
     * Extra Attack, Unarmored Defense, and Spellcasting.
     *
     * @param index The `index` of the feature to get.
     *
     * Available values can be found in the [`ResourceList`](#get-/api/-endpoint-) for `features`.
     *
     * @returns Feature OK
     * @throws ApiError
     */
    public getApiFeatures(
        index: string,
    ): CancelablePromise<Feature> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/features/{index}',
            path: {
                'index': index,
            },
        });
    }

}
