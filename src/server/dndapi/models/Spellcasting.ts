/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';

/**
 * `Spellcasting`
 *
 */
export type Spellcasting = {
    /**
     * Level at which the class can start using its spellcasting abilities.
     */
    level?: number;
    /**
     * Descriptions of the class' ability to cast spells.
     */
    info?: Array<{
        /**
         * Feature name.
         */
        name?: string;
        /**
         * Feature description.
         */
        desc?: Array<string>;
    }>;
    /**
     * Reference to the `AbilityScore` used for spellcasting by the class.
     */
    spellcasting_ability?: APIReference;
};

