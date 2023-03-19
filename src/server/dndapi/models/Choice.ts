/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OptionSet } from './OptionSet';

/**
 * `Choice`
 *
 */
export type Choice = {
    /**
     * Description of the choice to be made.
     */
    desc?: string;
    /**
     * Number of items to pick from the list.
     */
    choose?: number;
    /**
     * Type of the resources to choose from.
     */
    type?: string;
    from?: OptionSet;
};

