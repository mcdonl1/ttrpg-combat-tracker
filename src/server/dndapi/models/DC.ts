/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';

/**
 * `DC`
 *
 */
export type DC = {
    dc_type?: APIReference;
    /**
     * Value to beat
     */
    dc_value?: number;
    /**
     * Result of a successful save. Can be \"none\", \"half\", or \"other\"
     */
    success_type?: string;
};

