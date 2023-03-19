/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { AreaOfEffect } from './AreaOfEffect';
import type { Choice } from './Choice';
import type { DC } from './DC';
import type { ResourceDescription } from './ResourceDescription';

/**
 * `Trait`
 *
 */
export type Trait = (APIReference & ResourceDescription & {
    /**
     * List of `Races` that have access to the trait.
     */
    races?: Array<APIReference>;
    /**
     * List of `Subraces` that have access to the trait.
     */
    subraces?: Array<APIReference>;
    /**
     * List of `Proficiencies` this trait grants.
     */
    proficiencies?: Array<APIReference>;
    proficiency_choices?: Choice;
    language_options?: Choice;
    /**
     * Information specific to this trait
     */
    trait_specific?: (Choice | {
        /**
         * A damage type associated with this trait.
         */
        'damage-type'?: APIReference;
        /**
         * The breath weapon action associated with a draconic ancestry.
         */
        'breath-weapon'?: {
            name?: string;
            desc?: string;
            area_of_effect?: AreaOfEffect;
            damage?: {
                damage_at_character_level?: Record<string, string>;
                damage_type?: APIReference;
            };
            dc?: DC;
            /**
             * Description of the usage constraints of this action.
             */
            usage?: {
                times?: number;
                type?: string;
            };
        };
    });
});

