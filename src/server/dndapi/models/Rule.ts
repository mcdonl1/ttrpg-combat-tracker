/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';

/**
 * `Rule`
 *
 */
export type Rule = (APIReference & {
    /**
     * Description of the rule.
     */
    desc?: string;
    /**
     * List of sections for each subheading underneath the rule in the SRD.
     */
    subsections?: Array<APIReference>;
});

