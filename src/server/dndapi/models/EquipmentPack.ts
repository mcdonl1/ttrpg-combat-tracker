/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { Cost } from './Cost';
import type { ResourceDescription } from './ResourceDescription';

/**
 * `EquipmentPack`
 *
 */
export type EquipmentPack = (APIReference & ResourceDescription & {
    equipment_category?: APIReference;
    gear_category?: APIReference;
    cost?: Cost;
    /**
     * The list of adventuring gear in the pack.
     */
    contents?: Array<APIReference>;
});

