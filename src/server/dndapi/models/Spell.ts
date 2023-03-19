/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { AreaOfEffect } from './AreaOfEffect';
import type { DamageAtCharacterLevel } from './DamageAtCharacterLevel';
import type { DamageAtSlotLevel } from './DamageAtSlotLevel';
import type { ResourceDescription } from './ResourceDescription';

/**
 * `Spell`
 *
 */
export type Spell = (APIReference & ResourceDescription & {
    /**
     * List of descriptions for casting the spell at higher levels.
     */
    higher_level?: Array<string>;
    /**
     * Range of the spell, usually expressed in feet.
     */
    range?: string;
    /**
     * List of shorthand for required components of the spell.
     * V: verbal
     * S: somatic
     * M: material
     *
     */
    components?: Array<'V' | 'S' | 'M'>;
    /**
     * Material component for the spell to be cast.
     */
    material?: string;
    area_of_effect?: AreaOfEffect;
    /**
     * Determines if a spell can be cast in a 10-min(in-game) ritual.
     */
    ritual?: boolean;
    /**
     * How long the spell effect lasts.
     */
    duration?: string;
    /**
     * Determines if a spell needs concentration to persist.
     */
    concentration?: boolean;
    /**
     * How long it takes for the spell to activate.
     */
    casting_time?: string;
    /**
     * Level of the spell.
     */
    level?: number;
    /**
     * Attack type of the spell.
     */
    attack_type?: string;
    damage?: (DamageAtCharacterLevel | DamageAtSlotLevel);
    /**
     * Magic school this spell belongs to.
     */
    school?: APIReference;
    /**
     * List of classes that are able to learn the spell.
     */
    classes?: Array<APIReference>;
    /**
     * List of subclasses that have access to the spell.
     */
    subclasses?: Array<APIReference>;
});

