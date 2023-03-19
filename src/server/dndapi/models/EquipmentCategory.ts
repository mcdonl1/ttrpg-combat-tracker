/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';

/**
 * `EquipmentCategory`
 *
 */
export type EquipmentCategory = (APIReference & {
    /**
     * A list of the equipment that falls into this category.
     */
    equipment?: Array<APIReference>;
});

