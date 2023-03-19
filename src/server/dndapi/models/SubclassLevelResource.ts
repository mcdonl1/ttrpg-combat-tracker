/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';

export type SubclassLevelResource = {
    index?: string;
    url?: string;
    level?: number;
    features?: Array<APIReference>;
    class?: APIReference;
    subclass?: APIReference;
};

