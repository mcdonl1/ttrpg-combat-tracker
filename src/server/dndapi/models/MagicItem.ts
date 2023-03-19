/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { ResourceDescription } from './ResourceDescription';

/**
 * `MagicItem`
 *
 */
export type MagicItem = (APIReference & ResourceDescription & {
    equipment_category?: APIReference;
    rarity?: {
        /**
         * The rarity of the item.
         */
        name?: MagicItem.name;
    };
    variants?: Array<APIReference>;
    /**
     * Whether this is a variant or not
     */
    variant?: boolean;
});

export namespace MagicItem {

    /**
     * The rarity of the item.
     */
    export enum name {
        VARIES = 'Varies',
        COMMON = 'Common',
        UNCOMMON = 'Uncommon',
        RARE = 'Rare',
        VERY_RARE = 'Very Rare',
        LEGENDARY = 'Legendary',
        ARTIFACT = 'Artifact',
    }


}

