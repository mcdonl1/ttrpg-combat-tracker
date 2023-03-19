/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';

/**
 * `Proficiency`
 *
 */
export type Proficiency = (APIReference & {
    /**
     * The general category of the proficiency.
     */
    type?: string;
    /**
     * Classes that start with this proficiency.
     */
    classes?: Array<APIReference>;
    /**
     * Races that start with this proficiency.
     */
    races?: Array<APIReference>;
    /**
     * `APIReference` to the full description of the related resource.
     *
     */
    reference?: APIReference;
});

