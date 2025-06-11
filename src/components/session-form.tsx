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

  const onSubmit = (values: Session) => {
    console.log(values);
  };

  console.log(form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Type</FormLabel>
              <FormControl>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Session Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {sessionType.map((type) => {
                        return (
                          <SelectItem key={type} value="type">
                            {toTitle(type)}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
