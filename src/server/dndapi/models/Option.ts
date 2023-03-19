/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { Choice } from './Choice';
import type { Damage } from './Damage';
import type { DC } from './DC';

/**
 * `Option`
 *
 */
export type Option = ({
    /**
     * Type of option; determines other attributes.
     */
    option_type?: string;
    item?: APIReference;
} | {
    /**
     * Type of option; determines other attributes.
     */
    option_type?: string;
    /**
     * The name of the action.
     */
    action_name?: string;
    /**
     * The number of times this action can be repeated if chosen.
     */
    count?: number;
    /**
     * For attack options that can be melee, ranged, abilities, or thrown.
     */
    type?: Option.type;
} | {
    /**
     * Type of option; determines other attributes.
     */
    option_type?: string;
    items?: Array<Option>;
} | {
    /**
     * Type of option; determines other attributes.
     */
    option_type?: string;
    choice?: Choice;
} | {
    /**
     * Type of option; determines other attributes.
     */
    option_type?: string;
    /**
     * The string.
     */
    string?: string;
} | {
    /**
     * Type of option; determines other attributes.
     */
    option_type?: string;
    /**
     * A description of the ideal.
     */
    desc?: string;
    /**
     * A list of alignments of those who might follow the ideal.
     */
    alignments?: Array<APIReference>;
} | {
    /**
     * Type of option; determines other attributes.
     */
    option_type?: string;
    /**
     * Count
     */
    count?: number;
    of?: APIReference;
} | {
    /**
     * Type of option; determines other attributes.
     */
    option_type?: string;
    ability_score?: APIReference;
    /**
     * The minimum score required to satisfy the prerequisite.
     */
    minimum_score?: number;
} | {
    /**
     * Type of option; determines other attributes.
     */
    option_type?: string;
    ability_score?: APIReference;
    /**
     * The bonus being applied to the ability score
     */
    bonus?: number;
} | {
    /**
     * Type of option; determines other attributes.
     */
    option_type?: string;
    /**
     * Name of the breath
     */
    name?: string;
    dc?: DC;
    /**
     * Damage dealt by the breath attack, if any.
     */
    damage?: Array<Damage>;
} | {
    /**
     * Type of option; determines other attributes.
     */
    option_type?: string;
    damage_type?: APIReference;
    /**
     * Damage expressed in dice (e.g. "13d6").
     */
    damage_dice?: string;
    /**
     * Information regarding the damage.
     */
    notes?: string;
});

export namespace Option {

    /**
     * For attack options that can be melee, ranged, abilities, or thrown.
     */
    export enum type {
        MELEE = 'melee',
        RANGED = 'ranged',
        ABILITY = 'ability',
        MAGIC = 'magic',
    }


}

