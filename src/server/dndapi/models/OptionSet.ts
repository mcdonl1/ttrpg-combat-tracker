/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { Option } from './Option';

/**
 * `Option Set`
 *
 */
export type OptionSet = ({
    /**
     * Type of option set; determines other attributes.
     */
    option_set_type?: string;
    /**
     * Array of options to choose from.
     */
    options_array?: Array<Option>;
} | {
    /**
     * Type of option set; determines other attributes.
     */
    option_set_type?: string;
    equipment_category?: APIReference;
} | {
    /**
     * Type of option set; determines other attributes.
     */
    option_set_type?: string;
    /**
     * A reference (by URL) to a collection in the database.
     */
    resource_list?: string;
});

