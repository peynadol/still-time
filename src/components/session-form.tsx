// new and edit session form
"use client";
import { Session, sessionSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toTitle } from "@/lib/utils";

const SessionForm = () => {
  const [sessionType, setSessionType] = useState([
    "wood carving",
    "painting",
    "blind drawing",
  ]);
  const [isNewType, setIsNewType] = useState(false);
  const [newTypeInput, setNewTypeInput] = useState("");

  const form = useForm<Session>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      id: "",
      duration: 0,
      mood: "Calm",
      notes: "",
      tools: [],
      type: "",
      timestamp: "",
    },
  });

  const onFormSubmit = (values: Session) => {
    console.log(values);
  };

  const onNewTypeSubmit = (e) => {
    e.preventDefault();
    const newType = newTypeInput.toLowerCase().trim();
    if (!sessionType.includes(newType)) {
      setSessionType([...sessionType, newType]);
    }
    form.setValue("type", newType);
    setIsNewType(false);
  };

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)}>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Type</FormLabel>
              <FormControl>
                {!isNewType ? (
                  <div>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Session Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {sessionType.map((type) => {
                            return (
                              <SelectItem key={type} value={type}>
                                {toTitle(type)}
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <button onClick={() => setIsNewType(true)}>
                      Add new type
                    </button>
                  </div>
                ) : (
                  <div>
                    <Input
                      placeholder="Enter session type"
                      onChange={(e) => setNewTypeInput(e.target.value)}
                    />
                    <button onClick={onNewTypeSubmit}>Confirm</button>
                  </div>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Submit</Button>
      </form>
    </Form>
  );
};

export default SessionForm;
