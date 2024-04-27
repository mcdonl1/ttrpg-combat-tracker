import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
  json,
  mediumtext,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator(
  (name) => `roll-initiative_${name}`,
);

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
}));

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);

export const creatures = mysqlTable("creature", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .default(sql`(uuid())`),
  notes: mediumtext("notes").notNull(),
  slug: varchar("slug", { length: 255 }).notNull(),
  desc: mediumtext("desc").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  size: varchar("size", { length: 50 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  subtype: varchar("subtype", { length: 100 }).notNull(),
  group: varchar("group", { length: 255 }).notNull(),
  alignment: varchar("alignment", { length: 100 }).notNull(),
  armor_class: int("armor_class").notNull(),
  armor_desc: varchar("armor_desc", { length: 100 }).notNull(),
  hit_points: int("hit_points").notNull(),
  hit_dice: varchar("hit_dice", { length: 50 }).notNull(),
  speed: json("speed").notNull(),
  initiative_modifier: int("initiative_modifier").notNull(),
  strength: int("strength").notNull(),
  dexterity: int("dexterity").notNull(),
  constitution: int("constitution").notNull(),
  intelligence: int("intelligence").notNull(),
  wisdom: int("wisdom").notNull(),
  charisma: int("charisma").notNull(),
  strength_save: int("strength_save").notNull(),
  dexterity_save: int("dexterity_save").notNull(),
  constitution_save: int("constitution_save").notNull(),
  intelligence_save: int("intelligence_save").notNull(),
  wisdom_save: int("wisdom_save").notNull(),
  charisma_save: int("charisma_save").notNull(),
  perception: int("perception").notNull(),
  skills: json("skills").notNull(),
  damage_vulnerabilities: mediumtext("damage_vulnerabilities").notNull(),
  damage_resistances: mediumtext("damage_resistances").notNull(),
  damage_immunities: mediumtext("damage_immunities").notNull(),
  condition_immunities: mediumtext("condition_immunities").notNull(),
  senses: varchar("senses", { length: 510 }).notNull(),
  languages: varchar("languages", { length: 510 }).notNull(),
  challenge_rating: varchar("challenge_rating", { length: 255 }).notNull(),
  cr: int("cr").notNull(),
  actions: json("actions").notNull(),
  bonus_actions: json("bonus_actions").notNull(),
  reactions: json("reactions").notNull(),
  legendary_desc: mediumtext("legendary_desc").notNull(),
  legendary_actions: json("legendary_actions").notNull(),
  special_abilities: json("special_abilities").notNull(),
  spell_list: json("spell_list").notNull(),
  page_no: int("page_no").notNull(),
  environments: json("environments").notNull(),
  img_main: varchar("img_main", { length: 500 }).notNull(),
  document__slug: varchar("document__slug", { length: 255 }).notNull(),
  document__title: varchar("document__title", { length: 255 }).notNull(),
  document__license_url: varchar("document__license_url", {
    length: 510,
  }).notNull(),
  document__url: varchar("document__url", { length: 510 }).notNull(),
  userId: varchar("userId", { length: 255 }),
});

export const creatureRelations = relations(creatures, ({ one }) => ({
  user: one(users, {
    fields: [creatures.userId],
    references: [users.id],
  }),
}));

export const encounters = mysqlTable("encounters", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .default(sql`(uuid())`),
  name: varchar("name", { length: 255 }).notNull(),
  group: varchar("encounterGroup", { length: 255 }),
  desc: mediumtext("notes"),
  encounter: json("blob"),
  userId: varchar("userId", { length: 255 }),
});

export const encounterRelations = relations(encounters, ({ one }) => ({
  user: one(users, {
    fields: [encounters.userId],
    references: [users.id],
  }),
}));

export const tags = mysqlTable("tags", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .default(sql`(uuid())`),
  name: varchar("name", { length: 255 }).notNull(),
  userId: varchar("userId", { length: 255 }),
  color: varchar("color", { length: 255 }),
});

export const tagsRelations = relations(tags, ({ one }) => ({
  user: one(users, {
    fields: [tags.userId],
    references: [users.id],
  }),
}));
