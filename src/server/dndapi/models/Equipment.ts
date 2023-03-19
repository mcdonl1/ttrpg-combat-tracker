/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Armor } from './Armor';
import type { EquipmentPack } from './EquipmentPack';
import type { Gear } from './Gear';
import type { Weapon } from './Weapon';

/**
 * `Equipment`
 *
 */
export type Equipment = (Weapon | Armor | Gear | EquipmentPack);

