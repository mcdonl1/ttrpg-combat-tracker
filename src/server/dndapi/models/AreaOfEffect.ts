/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AreaOfEffect = {
    size?: number;
    type?: AreaOfEffect.type;
};

export namespace AreaOfEffect {

    export enum type {
        SPHERE = 'sphere',
        CONE = 'cone',
        CYLINDER = 'cylinder',
        LINE = 'line',
        CUBE = 'cube',
    }


}

