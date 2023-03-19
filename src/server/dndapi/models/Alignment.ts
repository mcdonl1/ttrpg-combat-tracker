/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';

/**
 * `Alignment`
 *
 */
export type Alignment = (APIReference & {
    /**
     * Brief description of the resource.
     */
    desc?: string;
    /**
     * Abbreviation/initials/acronym for the alignment.
     */
    abbreviation?: string;
});

