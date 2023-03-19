/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { Cost } from './Cost';
import type { ResourceDescription } from './ResourceDescription';

/**
 * `Armor`
 *
 */
export type Armor = (APIReference & ResourceDescription & {
    equipment_category?: APIReference;
    /**
     * The category of armor this falls into.
     */
    armor_category?: string;
    /**
     * Details on how to calculate armor class.
     */
    armor_class?: Record<string, string>;
    /**
     * Minimum STR required to use this armor.
     */
    str_minimum?: number;
    /**
     * Whether the armor gives disadvantage for Stealth.
     */
    stealth_disadvantage?: boolean;
    cost?: Cost;
    /**
     * How much the equipment weighs.
     */
    weight?: number;
});

