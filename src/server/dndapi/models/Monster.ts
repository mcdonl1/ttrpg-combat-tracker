/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { APIReference } from './APIReference';
import type { Choice } from './Choice';
import type { DC } from './DC';
import type { Monster_allOf_3_properties_actions_items } from './Monster_allOf_3_properties_actions_items';
import type { Monster_allOf_3_properties_actions_items_properties_damage_items } from './Monster_allOf_3_properties_actions_items_properties_damage_items';
import type { Monster_allOf_3_properties_special_abilities_items_properties_usage } from './Monster_allOf_3_properties_special_abilities_items_properties_usage';
import type { ResourceDescription } from './ResourceDescription';

/**
 * `Monster`
 *
 */
export type Monster = (APIReference & ResourceDescription & {
    /**
     * A monster's ability to charm or intimidate a player.
     */
    charisma?: number;
    /**
     * How sturdy a monster is."
     */
    constitution?: number;
    /**
     * The monster's ability for swift movement or stealth
     */
    dexterity?: number;
    /**
     * The monster's ability to outsmart a player.
     */
    intelligence?: number;
    /**
     * How hard a monster can hit a player.
     */
    strength?: number;
    /**
     * A monster's ability to ascertain the player's plan.
     */
    wisdom?: number;
} & {
    /**
     * The image url of the monster.
     */
    image?: string;
    /**
     * The size of the monster ranging from Tiny to Gargantuan."
     */
    size?: Monster.size;
    /**
     * The type of monster.
     */
    type?: string;
    /**
     * The sub-category of a monster used for classification of monsters."
     */
    subtype?: string;
    /**
     * A creature's general moral and personal attitudes.
     */
    alignments?: Monster.alignments;
    /**
     * The difficulty for a player to successfully deal damage to a monster.
     */
    armor_class?: Array<({
        type?: 'dex';
        value?: number;
        desc?: string;
    } | {
        type?: 'natural';
        value?: number;
        desc?: string;
    } | {
        type?: 'armor';
        value?: number;
        armor?: Array<APIReference>;
        desc?: string;
    } | {
        type?: 'spell';
        value?: number;
        spell?: APIReference;
        desc?: string;
    } | {
        type?: 'condition';
        value?: number;
        condition?: APIReference;
        desc?: string;
    })>;
    /**
     * The hit points of a monster determine how much damage it is able to take before it can be defeated.
     */
    hit_points?: number;
    /**
     * The hit die of a monster can be used to make a version of the same monster whose hit points are determined by the roll of the die. For example: A monster with 2d6 would have its hit points determine by rolling a 6 sided die twice.
     */
    hit_dice?: string;
    /**
     * The roll for determining a monster's hit points, which consists of the hit dice (e.g. 18d10) and the modifier determined by its Constitution (e.g. +36). For example, 18d10+36
     */
    hit_points_roll?: string;
    /**
     * A list of actions that are available to the monster to take during combat.
     */
    actions?: Array<{
        name?: string;
        desc?: string;
        action_options?: Choice;
        actions?: Array<{
            action_name?: string;
            count?: number;
            type?: 'melee' | 'ranged' | 'ability' | 'magic';
        }>;
        options?: Choice;
        multiattack_type?: string;
        attack_bonus?: number;
        dc?: DC;
        attacks?: Array<{
            name?: string;
            dc?: DC;
            damage?: Monster_allOf_3_properties_actions_items_properties_damage_items;
        }>;
        damage?: Array<{
            damage_type?: APIReference;
            damage_dice?: string;
        }>;
    }>;
    /**
     * A list of legendary actions that are available to the monster to take during combat.
     */
    legendary_actions?: Array<Monster_allOf_3_properties_actions_items>;
    /**
     * A monster's challenge rating is a guideline number that says when a monster becomes an appropriate challenge against the party's average level. For example. A group of 4 players with an average level of 4 would have an appropriate combat challenge against a monster with a challenge rating of 4 but a monster with a challenge rating of 8 against the same group of players would pose a significant threat.
     */
    challenge_rating?: number;
    /**
     * A list of conditions that a monster is immune to.
     */
    condition_immunities?: Array<APIReference>;
    /**
     * A list of damage types that a monster will take double damage from.
     */
    damage_immunities?: Array<string>;
    /**
     * A list of damage types that a monster will take half damage from.
     */
    damage_resistances?: Array<string>;
    /**
     * A list of damage types that a monster will take double damage from.
     */
    damage_vulnerabilities?: Array<string>;
    /**
     * List of other related monster entries that are of the same form. Only applicable to Lycanthropes that have multiple forms.
     */
    forms?: Array<APIReference>;
    /**
     * The languages a monster is able to speak.
     */
    languages?: string;
    /**
     * A list of proficiencies of a monster.
     */
    proficiencies?: Array<{
        value?: number;
        proficiency?: APIReference;
    }>;
    /**
     * A list of reactions that is available to the monster to take during combat.
     */
    reactions?: Array<Monster_allOf_3_properties_actions_items>;
    /**
     * Monsters typically have a passive perception but they might also have other senses to detect players.
     */
    senses?: {
        /**
         * The monster's passive perception (wisdom) score.
         */
        passive_perception?: number;
        /**
         * A monster with blindsight can perceive its surroundings without relying on sight, within a specific radius.
         */
        blindsight?: string;
        /**
         * A monster with darkvision can see in the dark within a specific radius.
         */
        darkvision?: string;
        /**
         * A monster with tremorsense can detect and pinpoint the origin of vibrations within a specific radius, provided that the monster and the source of the vibrations are in contact with the same ground or substance.
         */
        tremorsense?: string;
        /**
         * A monster with truesight can, out to a specific range, see in normal and magical darkness, see invisible creatures and objects, automatically detect visual illusions and succeed on saving throws against them, and perceive the original form of a shapechanger or a creature that is transformed by magic. Furthermore, the monster can see into the Ethereal Plane within the same range.
         */
        truesight?: string;
    };
    /**
     * A list of the monster's special abilities.
     */
    special_abilities?: Array<{
        name?: string;
        desc?: string;
        attack_bonus?: number;
        damage?: Array<Monster_allOf_3_properties_actions_items_properties_damage_items>;
        dc?: DC;
        spellcasting?: {
            ability?: APIReference;
            dc?: number;
            modifier?: number;
            components_required?: Array<string>;
            school?: string;
            slots?: Record<string, number>;
            spells?: Array<{
                name?: string;
                level?: number;
                url?: string;
                usage?: Monster_allOf_3_properties_special_abilities_items_properties_usage;
            }>;
        };
        usage?: {
            type?: 'at will' | 'per day' | 'recharge after rest' | 'recharge on roll';
            rest_types?: Array<string>;
            times?: number;
        };
    }>;
    /**
     * Speed for a monster determines how fast it can move per turn.
     */
    speed?: {
        /**
         * All creatures have a walking speed, simply called the monster’s speed. Creatures that have no form of ground-based locomotion have a walking speed of 0 feet.
         */
        walk?: string;
        /**
         * A monster that has a burrowing speed can use that speed to move through sand, earth, mud, or ice. A monster can’t burrow through solid rock unless it has a special trait that allows it to do so.
         */
        burrow?: string;
        /**
         * A monster that has a climbing speed can use all or part of its movement to move on vertical surfaces. The monster doesn’t need to spend extra movement to climb.
         */
        climb?: string;
        /**
         * A monster that has a flying speed can use all or part of its movement to fly.
         */
        fly?: string;
        /**
         * A monster that has a swimming speed doesn’t need to spend extra movement to swim.
         */
        swim?: string;
    };
    /**
     * The number of experience points (XP) a monster is worth is based on its challenge rating.
     */
    xp?: number;
});

export namespace Monster {

    /**
     * The size of the monster ranging from Tiny to Gargantuan."
     */
    export enum size {
        TINY = 'Tiny',
        SMALL = 'Small',
        MEDIUM = 'Medium',
        LARGE = 'Large',
        HUGE = 'Huge',
        GARGANTUAN = 'Gargantuan',
    }

    /**
     * A creature's general moral and personal attitudes.
     */
    export enum alignments {
        CHAOTIC_NEUTRAL = 'chaotic neutral',
        CHAOTIC_EVIL = 'chaotic evil',
        CHAOTIC_GOOD = 'chaotic good',
        LAWFUL_NEUTRAL = 'lawful neutral',
        LAWFUL_EVIL = 'lawful evil',
        LAWFUL_GOOD = 'lawful good',
        NEUTRAL = 'neutral',
        NEUTRAL_EVIL = 'neutral evil',
        NEUTRAL_GOOD = 'neutral good',
        ANY_ALIGNMENT = 'any alignment',
        UNALIGNED = 'unaligned',
    }


}

