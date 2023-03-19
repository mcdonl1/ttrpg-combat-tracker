/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';

/**
 * `SubclassLevel`
 *
 */
export type SubclassLevel = {
    /**
     * Resource index for shorthand searching.
     */
    index?: string;
    /**
     * URL of the referenced resource.
     */
    url?: string;
    /**
     * Number value for the current level object.
     */
    level?: number;
    /**
     * Total number of ability score bonuses gained, added from previous levels.
     */
    ability_score_bonuses?: number;
    /**
     * Proficiency bonus for this class at the specified level.
     */
    prof_bonus?: number;
    /**
     * List of features gained at this level.
     */
    features?: Array<APIReference>;
    /**
     * Summary of spells known at this level.
     */
    spellcasting?: {
        cantrips_known?: number;
        spells_known?: number;
        spell_slots_level_1?: number;
        spell_slots_level_2?: number;
        spell_slots_level_3?: number;
        spell_slots_level_4?: number;
        spell_slots_level_5?: number;
        spell_slots_level_6?: number;
        spell_slots_level_7?: number;
        spell_slots_level_8?: number;
        spell_slots_level_9?: number;
    };
    /**
     * Class specific information such as dice values for bard songs and number of warlock invocations.
     */
    classspecific?: any;
};

