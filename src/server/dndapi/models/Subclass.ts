/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { ResourceDescription } from './ResourceDescription';
import type { SpellPrerequisite } from './SpellPrerequisite';

/**
 * `Subclass`
 *
 */
export type Subclass = (APIReference & ResourceDescription & {
    class?: APIReference;
    /**
     * Lore-friendly flavor text for a classes respective subclass.
     */
    subclass_flavor?: string;
    /**
     * Resource url that shows the subclass level progression.
     */
    subclass_levels?: string;
    spells?: Array<{
        prerequisites?: Array<SpellPrerequisite>;
        spell?: APIReference;
    }>;
});

