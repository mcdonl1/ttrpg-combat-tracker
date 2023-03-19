/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { ResourceDescription } from './ResourceDescription';

/**
 * `Feature`
 *
 */
export type Feature = (APIReference & ResourceDescription & {
    /**
     * The level this feature is gained.
     */
    level?: number;
    class?: APIReference;
    subclass?: APIReference;
    parent?: APIReference;
    /**
     * The prerequisites for this feature.
     */
    prerequisites?: Array<({
        type?: string;
        level?: number;
    } | {
        type?: string;
        feature?: string;
    } | {
        type?: string;
        spell?: string;
    })>;
    /**
     * Information specific to this feature.
     */
    feature_specific?: any;
});

