// new and edit session form
"use client";
import { Session, sessionSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "./ui/button";
import { BadgeX } from "lucide-react";
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
import { Badge } from "./ui/badge";

const SessionForm = () => {
  const [sessionType, setSessionType] = useState([
    "wood carving",
    "painting",
    "blind drawing",
  ]);
  const [isNewType, setIsNewType] = useState(false);
  const [newTypeInput, setNewTypeInput] = useState("");
  const [newToolInput, setNewToolInput] = useState("");
  const [isAddingNewTool, setIsAddingNewTool] = useState(false);

  const form = useForm<Session>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      id: "",
      duration: 0,
      mood: "Calm",
      notes: "",
      tools: ["sloyd knife", "strop", "sandpaper"],
      type: "",
      timestamp: "",
    },
  });

  const tools = useWatch({
    control: form.control,
    name: "tools",
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

  const handleRemoveTool = (tool: string) => {
    const updatedTools = tools.filter((t) => t !== tool);
    form.setValue("tools", updatedTools);
    console.log("removed");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)}>
        {/* SESSION TYPE DROP DOWN */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              {/* SESSION TYPE DROP DOWN */}
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

        {/* Tool pills and input */}
        <FormField
          control={form.control}
          name="tools"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tools Used:</FormLabel>

              {tools.map((tool) => {
                return (
                  <Badge key={tool} variant="outline">
                    {toTitle(tool)}
                    <button onClick={() => handleRemoveTool(tool)}>
                      <BadgeX />
                    </button>
                  </Badge>
                );
              })}
              <FormControl>
                {isAddingNewTool ? (
                  <div className="flex gap-2">
                    <Input
                      value={newToolInput}
                      onChange={(e) => setNewToolInput(e.target.value)}
                      placeholder="Enter new tool"
                      className="w-auto flex-1"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        const newTool = newToolInput.toLowerCase().trim();
                        if (!newTool || tools.includes(newTool)) return;

                        form.setValue("tools", [...tools, newTool]);
                        setNewToolInput("");
                        setIsAddingNewTool(false);
                      }}
                    >
                      Confirm
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddingNewTool(true)}
                  >
                    + Add New Tool
                  </Button>
                )}
              </FormControl>
            </FormItem>
          )}
        />

        {/* NOTES */}
        <Button>Submit</Button>
      </form>
    </Form>
  );
};

export default SessionForm;
