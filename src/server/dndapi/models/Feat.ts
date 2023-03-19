/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { Prerequisite } from './Prerequisite';
import type { ResourceDescription } from './ResourceDescription';

/**
 * `Feat`
 *
 */
export type Feat = (APIReference & ResourceDescription & {
    /**
     * An object of APIReferences to ability scores and minimum scores.
     */
    prerequisites?: Array<Prerequisite>;
});

