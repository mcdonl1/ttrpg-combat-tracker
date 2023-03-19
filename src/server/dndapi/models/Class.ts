/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { Choice } from './Choice';
import type { Multiclassing } from './Multiclassing';
import type { Spellcasting } from './Spellcasting';

/**
 * `Class`
 *
 */
export type Class = (APIReference & {
    /**
     * Hit die of the class. (ex: 12 == 1d12).
     */
    hit_die?: number;
    /**
     * URL of the level resource for the class.
     */
    class_levels?: string;
    multi_classing?: Multiclassing;
    spellcasting?: Spellcasting;
    /**
     * URL of the spell resource list for the class.
     */
    spells?: string;
    /**
     * List of equipment and their quantities all players of the class start with.
     */
    starting_equipment?: Array<{
        quantity?: number;
        equipment?: APIReference;
    }>;
    /**
     * List of choices of starting equipment.
     */
    starting_equipment_options?: Array<Choice>;
    /**
     * List of choices of starting proficiencies.
     */
    proficiency_choices?: Array<Choice>;
    /**
     * List of starting proficiencies for all new characters of this class.
     */
    proficiencies?: Array<APIReference>;
    /**
     * Saving throws the class is proficient in.
     */
    saving_throws?: Array<APIReference>;
    /**
     * List of all possible subclasses this class can specialize in.
     */
    subclasses?: Array<APIReference>;
});

