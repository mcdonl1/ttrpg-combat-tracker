/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { ResourceDescription } from './ResourceDescription';

/**
 * `AbilityScore`
 *
 */
export type AbilityScore = (APIReference & ResourceDescription & {
    /**
     * Full name of the ability score.
     */
    full_name?: string;
    /**
     * List of skills that use this ability score.
     */
    skills?: Array<APIReference>;
});

