import { Creature, Speed } from "~/types/encounterTypes";
import { type UseFormReturn, useForm } from "react-hook-form";

import { Form, FormItem, FormField, FormLabel, FormControl } from "~/@/components/ui/form";
import { Input } from "~/@/components/ui/input";
import { Button } from "~/@/components/ui/button";
import { Separator } from "~/@/components/ui/separator";
import { Textarea } from "~/@/components/ui/textarea";

import { InfoIcon } from "lucide-react";

import { PropertiesField } from "./PropertiesField";

export function CreatureEdit({ creature }: { creature: Creature }) {
  const form = useForm({values: creature });
  
  const onSubmit = (data: Creature) => {
    console.log(data);
  };

  return <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-2"
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => {
          return <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Jed, the Scary Beast"{...field} />
            </FormControl>
          </FormItem>
        }}
      />
      <div className="flex gap-2 flex-wrap">
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => {
            return <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <Input
                  className="w-28"
                  placeholder="Medium"
                  {...field}
                />
              </FormControl>
            </FormItem>
          }}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => {
            return <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input
                  className="w-28"
                  placeholder="Humanoid"
                  {...field}
                />
              </FormControl>
            </FormItem>
          }}
        />
      </div>
      <FormField
        control={form.control}
        name="desc"
        render={({ field }) => {
          return <FormItem>
            <FormLabel
              className="flex gap-1"
              title="Description of the creature. Supports markdown."
            >
              Description
              <InfoIcon size="10px"/>
            </FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
          </FormItem>
        }}
      />
      <div className="flex gap-2 flex-wrap">
        <FormField
          control={form.control}
          name="armor_class"
          render={({ field }) => {
            return <FormItem>
              <FormLabel>Armor Class</FormLabel>
              <FormControl>
                <Input
                  className="w-24"
                  placeholder="10"
                  {...field}
                />
              </FormControl>
            </FormItem>
          }}
        />
        <FormField
          control={form.control}
          name="armor_desc"
          render={({ field }) => {
            return <FormItem>
              <FormLabel>Armor Description</FormLabel>
              <FormControl>
                <Input
                  className="w-48"
                  placeholder="natural armor"
                  {...field}
                />
              </FormControl>
            </FormItem>
          }}
        />
      </div>
      <FormField
        control={form.control}
        name="hit_points"
        render={({ field }) => {
          return <FormItem>
            <FormLabel>Hit Points</FormLabel>
            <FormControl>
              <Input placeholder="34 (6d10+4)"{...field} />
            </FormControl>
          </FormItem>
        }}
      />
      <FormLabel>Speed</FormLabel>
      <Separator />
      <PropertiesField
        object={creature.speed as Speed}
        form={form}
        name="speed"
        validKeys={[
          { label: "Walk", value: "walk" },
          { label: "Fly", value: "fly" },
          { label: "Wwim", value: "swim" },
          { label: "Climb", value: "climb" },
          { label: "Burrow", value: "burrow" },
          { label: "Hover", value: "hover" },
        ]}
      />
      <FormField
        control={form.control}
        name="damage_resistances"
        render={({ field }) => {
          return <FormItem>
            <FormLabel>Damage Resistances</FormLabel>
            <FormControl>
              <Input placeholder="fire, lightening, force, etc..."{...field} />
            </FormControl>
          </FormItem>
        }}
      />
      <FormField
        control={form.control}
        name="damage_immunities"
        render={({ field }) => {
          return <FormItem>
            <FormLabel>Damage Immunities</FormLabel>
            <FormControl>
              <Input placeholder="fire, lightening, force, etc..."{...field} />
            </FormControl>
          </FormItem>
        }}
      />
      <FormField
        control={form.control}
        name="condition_immunities"
        render={({ field }) => {
          return <FormItem>
            <FormLabel>Condition Immunities</FormLabel>
            <FormControl>
              <Input placeholder="prone, poisoned, etc..."{...field} />
            </FormControl>
          </FormItem>
        }}
      />
      <FormField
        control={form.control}
        name="senses"
        render={({ field }) => {
          return <FormItem>
            <FormLabel>Senses</FormLabel>
            <FormControl>
              <Input placeholder="passive Perception 15, Darkvison 30ft., etc..."{...field} />
            </FormControl>
          </FormItem>
        }}
      />
      <FormField
        control={form.control}
        name="languages"
        render={({ field }) => {
          return <FormItem>
            <FormLabel>Languages</FormLabel>
            <FormControl>
              <Input placeholder="common, draconic, etc..." {...field} />
            </FormControl>
          </FormItem>
        }}
      />
      <FormField
        control={form.control}
        name="challenge_rating"
        render={({ field }) => {
          return <FormItem>
            <FormLabel>Challenge Rating</FormLabel>
            <FormControl>
              <Input placeholder="1/2" {...field} />
            </FormControl>
          </FormItem>
        }}
      />
      <FormField
        control={form.control}
        name="armor_class"
        render={({ field }) => {
          return <FormItem>
            <FormLabel>Armor Class</FormLabel>
            <FormControl>
              <Input placeholder="10" {...field} />
            </FormControl>
          </FormItem>
        }}
      />
      <FormField
        control={form.control}
        name="armor_class"
        render={({ field }) => {
          return <FormItem>
            <FormLabel>Armor Class</FormLabel>
            <FormControl>
              <Input placeholder="10" {...field} />
            </FormControl>
          </FormItem>
        }}
      />
      <FormField
        control={form.control}
        name="armor_class"
        render={({ field }) => {
          return <FormItem>
            <FormLabel>Armor Class</FormLabel>
            <FormControl>
              <Input placeholder="10" {...field} />
            </FormControl>
          </FormItem>
        }}
      />
      <FormField
        control={form.control}
        name="armor_class"
        render={({ field }) => {
          return <FormItem>
            <FormLabel>Armor Class</FormLabel>
            <FormControl>
              <Input placeholder="10" {...field} />
            </FormControl>
          </FormItem>
        }}
      />
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => {
          return <FormItem>
            <FormLabel
              className="flex gap-1"
              title="Use this space for notes you'd like to make on this creature. Supports markdown."
            >
              Notes
              <InfoIcon size="10px"/>
            </FormLabel>
            <FormControl>
              <Textarea placeholder="10" {...field} />
            </FormControl>
          </FormItem>
        }}
      />
      <Separator />
      <span className="flex justify-around">
        <Button type="submit">Save</Button>
        <Button type="reset" variant="destructive">Discard</Button>
      </span>
    </form>
  </Form>

}
