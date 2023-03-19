/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AbilityBonus } from './AbilityBonus';
import type { APIReference } from './APIReference';
import type { Choice } from './Choice';

/**
 * `Subrace`
 *
 */
export type Subrace = (APIReference & {
    /**
     * Description of the subrace.
     */
    desc?: string;
    /**
     * Parent race for the subrace.
     */
    race?: APIReference;
    /**
     * Additional ability bonuses for the subrace.
     */
    ability_bonuses?: Array<AbilityBonus>;
    /**
     * Starting proficiencies for all new characters of the subrace.
     */
    starting_proficiencies?: Array<APIReference>;
    /**
     * Starting languages for all new characters of the subrace.
     */
    languages?: Array<APIReference>;
    /**
     * Starting languages to choose from for the subrace.
     */
    language_options?: Choice;
    /**
     * List of traits that for the subrace.
     */
    racial_traits?: Array<APIReference>;
});

