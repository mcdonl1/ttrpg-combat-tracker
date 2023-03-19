/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { Choice } from './Choice';

/**
 * `Background`
 *
 */
export type Background = (APIReference & {
    /**
     * Starting proficiencies for all new characters of this background.
     */
    starting_proficiencies?: Array<APIReference>;
    /**
     * Starting equipment for all new characters of this background.
     */
    starting_equipment?: Array<APIReference>;
    starting_equipment_options?: Choice;
    language_options?: Choice;
    /**
     * Special feature granted to new characters of this background.
     */
    feature?: {
        name?: string;
        desc?: Array<string>;
    };
    /**
     * Choice of personality traits for this background.
     */
    personality_traits?: any;
    ideals?: Choice;
    bonds?: Choice;
    flaws?: Choice;
});

