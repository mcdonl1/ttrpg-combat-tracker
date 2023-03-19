/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { Choice } from './Choice';
import type { Prerequisite } from './Prerequisite';

/**
 * `Multiclassing`
 *
 */
export type Multiclassing = {
    /**
     * List of prerequisites that must be met.
     */
    prerequisites?: Array<Prerequisite>;
    /**
     * List of choices of prerequisites to meet for.
     */
    prerequisite_options?: Array<Choice>;
    /**
     * List of proficiencies available when multiclassing.
     */
    proficiencies?: Array<APIReference>;
    /**
     * List of choices of proficiencies that are given when multiclassing.
     */
    proficiency_choices?: Array<Choice>;
};

