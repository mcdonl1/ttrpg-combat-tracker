/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';

export type AbilityBonus = {
    /**
     * Bonus amount for this ability score.
     */
    bonus?: number;
    ability_score?: APIReference;
};

