/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AbilityBonus } from './AbilityBonus';
import type { APIReference } from './APIReference';
import type { Choice } from './Choice';

/**
 * `Race`
 *
 */
export type Race = (APIReference & {
    /**
     * Base move speed for this race (in feet per round).
     */
    speed?: number;
    /**
     * Racial bonuses to ability scores.
     */
    ability_bonuses?: Array<AbilityBonus>;
    /**
     * Flavor description of likely alignments this race takes.
     */
    alignment?: string;
    /**
     * Flavor description of possible ages for this race.
     */
    age?: string;
    /**
     * Size class of this race.
     */
    size?: string;
    /**
     * Flavor description of height and weight for this race.
     */
    size_description?: string;
    /**
     * Starting proficiencies for all new characters of this race.
     */
    starting_proficiencies?: Array<APIReference>;
    /**
     * Starting proficiency options for all new characters of this race.
     */
    starting_proficiency_options?: Choice;
    /**
     * Starting languages for all new characters of this race.
     */
    languages?: Array<APIReference>;
    /**
     * Flavor description of the languages this race knows.
     */
    language_desc?: string;
    /**
     * Racial traits that provide benefits to its members.
     */
    traits?: Array<APIReference>;
    /**
     * All possible subraces that this race includes.
     */
    subraces?: Array<APIReference>;
});

