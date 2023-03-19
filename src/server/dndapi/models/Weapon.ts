/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { Cost } from './Cost';
import type { Damage } from './Damage';
import type { ResourceDescription } from './ResourceDescription';

/**
 * `Weapon`
 *
 */
export type Weapon = (APIReference & ResourceDescription & {
    equipment_category?: APIReference;
    /**
     * The category of weapon this falls into.
     */
    weapon_category?: string;
    /**
     * Whether this is a Melee or Ranged weapon.
     */
    weapon_range?: string;
    /**
     * A combination of weapon_category and weapon_range.
     */
    category_range?: string;
    range?: {
        /**
         * The weapon's normal range in feet.
         */
        normal?: number;
        /**
         * The weapon's long range in feet.
         */
        long?: number;
    };
    damage?: Damage;
    two_handed_damage?: Damage;
    /**
     * A list of the properties this weapon has.
     */
    properties?: Array<APIReference>;
    cost?: Cost;
    /**
     * How much the equipment weighs.
     */
    weight?: number;
});

