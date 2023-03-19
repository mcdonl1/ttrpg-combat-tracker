/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { Cost } from './Cost';
import type { ResourceDescription } from './ResourceDescription';

/**
 * `Gear`
 *
 */
export type Gear = (APIReference & ResourceDescription & {
    equipment_category?: APIReference;
    gear_category?: APIReference;
    cost?: Cost;
    /**
     * How much the equipment weighs.
     */
    weight?: number;
});

