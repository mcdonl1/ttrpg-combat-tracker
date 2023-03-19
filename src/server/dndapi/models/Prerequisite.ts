/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';

/**
 * `Prerequisite`
 *
 */
export type Prerequisite = {
    ability_score?: APIReference;
    /**
     * Minimum score to meet the prerequisite.
     */
    minimum_score?: number;
};

