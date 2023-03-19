/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { ResourceDescription } from './ResourceDescription';

/**
 * `Skill`
 *
 */
export type Skill = (APIReference & ResourceDescription & {
    ability_score?: APIReference;
});

