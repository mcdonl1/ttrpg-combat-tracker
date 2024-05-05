import { api } from "~/trpc/react";

import { v4 as uuidv4 } from "uuid";

import { Action, Creature, Speed } from "~/types/encounterTypes";
import { savingThrows, skills } from "~/constants/constants";

import { useForm } from "react-hook-form";

import { Form, FormItem, FormField, FormLabel, FormControl } from "~/@/components/ui/form";
import { Input } from "~/@/components/ui/input";
import { Button } from "~/@/components/ui/button";
import { Separator } from "~/@/components/ui/separator";
import { Textarea } from "~/@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { InfoIcon } from "lucide-react";

import { PropertiesField } from "./PropertiesField";
import { ActionsField } from "./ActionField";
import { useToast } from "~/@/components/ui/use-toast";

export function CreatureEdit({ creature }: { creature: Creature }) {
  const form = useForm({values: creature });
  const { toast } = useToast();
  const creatureMutation = api.creatures.saveCreature.useMutation();
  const onSubmit = (data: Creature) => {
    creatureMutation.mutate(data as Creature);
    if (creatureMutation.error) {
      toast({title: "Something went wrong", description: "Failed to save creature. Please try again later." });
    } else {
      toast({title: "Creature saved", description: "Creature saved successfully" });
    }
  };

  const handleSaveNew = () => {
    form.setValue("id", uuidv4());
    form.handleSubmit(onSubmit)();
  }

  const handleOverwrite = () => {
    form.handleSubmit(onSubmit)();
  }
  


  return <Form {...form} register={form.register}>
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
              <Input placeholder="Jed, the Scary Beast" {...field} value={field.value || ""}/>
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
                  value={field.value || ""}
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
                  value={field.value || ""}
                />
              </FormControl>
            </FormItem>
          }}
        />
      </div>
      <FormField
        control={form.control}
        name="alignment"
        render={({ field }) => {
          return <FormItem>
            <FormLabel>Alignment</FormLabel>
            <FormControl>
              <Input {...field} value={field.value || ""}/>
            </FormControl>
          </FormItem>
        }}
      />
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
              <Textarea {...field} value={field.value || ""}/>
            </FormControl>
          </FormItem>
        }}
      />
      <div className="flex gap-2 flex-wrap">
        <FormField
          control={form.control}
          name="armor_class"
          rules={{}}
          render={({ field }) => {
            return <FormItem>
              <FormLabel>Armor Class</FormLabel>
              <FormControl>
                <Input
                  className="w-24"
                  {...field}
                  {...form.register("armor_class", { valueAsNumber: true })}
                  type="number"
                  value={field.value !== null ? field.value : ""}
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
                  value={field.value || ""}
                />
              </FormControl>
            </FormItem>
          }}
        />
      </div>
      <div className="flex gap-2 flex-wrap">
      <FormField
        control={form.control}
        name="hit_points"
        render={({ field }) => {
          return <FormItem>
            <FormLabel>Hit Points</FormLabel>
            <FormControl>
              <Input
                {...form.register("hit_points", { valueAsNumber: true })}
                {...field}
                type="number"
                value={field.value || ""}
                className="w-24"
              />
            </FormControl>
          </FormItem>
        }}
      />
        <FormField
          control={form.control}
          name="hit_dice"
          render={({ field }) => {
            return <FormItem>
              <FormLabel>Hit Dice</FormLabel>
              <FormControl>
                <Input
                  className="w-48"
                  placeholder="1d8 + 2"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
            </FormItem>
          }}
        />
      </div>
      <FormLabel>Speed</FormLabel>
      <Separator />
      <PropertiesField
        object={form.getValues("speed") as {[key: string]: number}}
        setObject={(object) => {
          form.setValue("speed", object);
          form.trigger("speed");
        }}
        validKeys={[
          { label: "Walk", value: "walk" },
          { label: "Fly", value: "fly" },
          { label: "Swim", value: "swim" },
          { label: "Climb", value: "climb" },
          { label: "Burrow", value: "burrow" },
          { label: "Hover", value: "hover" },
        ]}
        type="number"
      />
      <FormField
        control={form.control}
        name="damage_resistances"
        render={({ field }) => {
          return <FormItem>
            <FormLabel>Damage Resistances</FormLabel>
            <FormControl>
              <Input placeholder="fire, lightening, force, etc..."{...field} value={field.value || ""}/>
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
              <Input placeholder="fire, lightening, force, etc..."{...field} value={field.value || ""}/>
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
              <Input placeholder="prone, poisoned, etc..."{...field} value={field.value || ""}/>
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
              <Input placeholder="common, draconic, etc..." {...field} value={field.value || ""}/>
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
              <Input placeholder="1/2" {...field} value={field.value || ""} />
            </FormControl>
          </FormItem>
        }}
      />
      <FormLabel>Skills</FormLabel>
      <Separator />
      <PropertiesField
        object={form.getValues("skills") as {[key: string]: number}}
        setObject={(object) => {
          form.setValue("skills", object);
          form.trigger("skills");
        }}
        validKeys={skills}
        type="number"
        keyClassName="w-48"
      />
      <FormLabel
        className="flex gap-1"
        title="You only need to fill in saving throws that are different from the ability modifier (e.g. because of proficiency)."
      >
        Saving Throws
        <InfoIcon size="10px"/>
      </FormLabel>
      <Separator />
      <PropertiesField
        object={function() {
          let obj: {[key: string]: number} = {};
          savingThrows.forEach((st) => {
            // This condition is tricky. Need some way to hide the throws that aren't needed while still allowing them to be empty.
            obj[st.value] = form.getValues(st.value as keyof Creature) as number;
          });
          return obj;
        }()}
        setObject={(object) => {
          savingThrows.forEach((st) => {
            console.log(st.value, object[st.value]);
            form.setValue(st.value as keyof Creature, object[st.value] === "" ? null : object[st.value]);
            form.trigger(st.value as keyof Creature);
          });
        }}
        validKeys={savingThrows}
        type="number"
        keyClassName="w-48"
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
              <Textarea placeholder="This creature owes my rogue 40 gp..." {...field} value={field.value || ""} />
            </FormControl>
          </FormItem>
        }}
      />
      <FormLabel>Actions</FormLabel>
      <Separator />
      <ActionsField
        actions={form.getValues("actions") as Action[]}
        setActions={(actions) => {
          form.setValue("actions", actions);
          form.trigger("actions");
        }}
      />
      <FormLabel>Bonus Actions</FormLabel>
      <Separator />
      <ActionsField
        actions={form.getValues("bonus_actions") as Action[]}
        setActions={(bonusActions) => {
          form.setValue("bonus_actions", bonusActions);
          form.trigger("bonus_actions");
        }}
      />
      <FormLabel>Reactions</FormLabel>
      <Separator />
      <ActionsField
        actions={form.getValues("reactions") as Action[]}
        setActions={(reactions) => {
          form.setValue("reactions", reactions);
          form.trigger("reactions");
        }}
      />
      <Separator />
      <span className="flex justify-around">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Save</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Save Type</DialogTitle>
              <DialogDescription>
                Choose whether to save a new unique creature or overwrite the existing one.
              </DialogDescription>
            </DialogHeader>
            <DialogClose asChild>
              <Button onClick={handleSaveNew}>Save as New</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="secondary" onClick={handleOverwrite}>Overwrite</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <Button type="reset" variant="destructive">Discard</Button>
      </span>
    </form>
  </Form>

}
