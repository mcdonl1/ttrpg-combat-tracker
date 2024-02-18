import { relations, sql } from "drizzle-orm";
import {
  bigint,
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

export const posts = mysqlTable(
  "post",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    createdById: varchar("createdById", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    createdByIdIdx: index("createdById_idx").on(example.createdById),
    nameIndex: index("name_idx").on(example.name),
  }),
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
  notes: mediumtext("notes"),
  slug: varchar("slug", { length: 255 }).notNull(),
  desc: mediumtext("desc"),
  name: varchar("name", { length: 255 }).notNull(),
  size: varchar("size", { length: 50 }),
  type: varchar("type", { length: 50 }),
  subtype: varchar("subtype", { length: 100 }),
  group: varchar("group", { length: 255 }),
  alignment: varchar("alignment", { length: 100 }),
  armor_class: int("armor_class"),
  armor_desc: varchar("armor_desc", { length: 100 }),
  hit_points: int("hit_points"),
  hit_dice: varchar("hit_dice", { length: 50 }),
  speed: json("speed"),
  initiative_modifier: int("initiative_modifier"),
  strength: int("strength"),
  dexterity: int("dexterity"),
  constitution: int("constitution"),
  intelligence: int("intelligence"),
  wisdom: int("wisdom"),
  charisma: int("charisma"),
  strength_save: int("strength_save"),
  dexterity_save: int("dexterity_save"),
  constitution_save: int("constitution_save"),
  intelligence_save: int("intelligence_save"),
  wisdom_save: int("wisdom_save"),
  charisma_save: int("charisma_save"),
  perception: int("perception"),
  skills: json("skills"),
  damage_vulnerabilities: mediumtext("damage_vulnerabilities"),
  damage_resistances: mediumtext("damage_resistances"),
  damage_immunities: mediumtext("damage_immunities"),
  condition_immunities: mediumtext("condition_immunities"),
  senses: varchar("senses", { length: 510 }),
  languages: varchar("languages", { length: 510 }),
  challenge_rating: varchar("challenge_rating", { length: 255 }),
  cr: int("cr"),
  actions: json("actions"),
  bonus_actions: json("bonus_actions"),
  reactions: json("reactions"),
  legendary_desc: mediumtext("legendary_desc"),
  legendary_actions: json("legendary_actions"),
  special_abilities: json("special_abilities"),
  spell_list: json("spell_list"),
  page_no: int("page_no"),
  environments: json("environments"),
  img_main: varchar("img_main", { length: 500 }),
  document__slug: varchar("document__slug", { length: 255 }),
  document__title: varchar("document__title", { length: 255 }),
  document__license_url: varchar("document__license_url", {
    length: 510,
  }),
  document__url: varchar("document__url", { length: 510 }),
  userId: varchar("userId", { length: 255 }),
});

export const creatureRelations = relations(creatures, ({ one }) => ({
  user: one(users, {
    fields: [creatures.userId],
    references: [users.id],
  }),
}));
