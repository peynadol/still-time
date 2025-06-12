// new and edit session form
"use client";
import { moodOptions, sessionFormSchema } from "@/lib/types";
import { nanoid } from "nanoid";
import { Session, sessionSchema, SessionForm } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
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
import { Textarea } from "./ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { mockSessions } from "@/lib/data";

const SessionForm = () => {
  const uniqueTypes = Array.from(new Set(mockSessions.map((s) => s.type)));
  const [sessionType, setSessionType] = useState(uniqueTypes);

  const [isNewType, setIsNewType] = useState(false);
  const [newTypeInput, setNewTypeInput] = useState("");
  const [newToolInput, setNewToolInput] = useState("");
  const [isAddingNewTool, setIsAddingNewTool] = useState(false);

  const form = useForm<SessionForm>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      duration: 0,
      mood: [],
      notes: "",
      tools: [],
      type: "",
    },
  });

  const tools = useWatch({
    control: form.control,
    name: "tools",
  });

  const onFormSubmit = (values: SessionForm) => {
    try {
      const fullSession: Session = {
        ...values,
        id: nanoid(),
        timestamp: new Date().toISOString(),
      };

      console.log(fullSession);
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  const onNewTypeSubmit = (e) => {
    e.preventDefault();
    const newType = newTypeInput.toLowerCase().trim();
    const normalized = newType.toLowerCase().trim();
    if (!sessionType.includes(normalized)) {
      setSessionType((prev) => [...prev, normalized]);
    }

    form.setValue("type", newType);
    setIsNewType(false);
  };

  const handleRemoveTool = (tool: string) => {
    const updatedTools = tools.filter((t) => t !== tool);
    form.setValue("tools", updatedTools);
    console.log("removed");
  };

  const handleTypeChange = (selectedType: string) => {
    const matchingSessions = mockSessions
      .filter((s) => s.type === selectedType) // grab matching type from mock data
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime() // sort by most recent
      );

    // if we find matching sessions...
    if (matchingSessions.length > 0) {
      //grab tools from most recent session
      const recentTools = matchingSessions[0].tools;

      form.setValue("tools", recentTools);
    }
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
              <FormLabel>Session Type</FormLabel>
              <FormControl>
                {!isNewType ? (
                  <div>
                    <Select
                      value={field.value}
                      onValueChange={(val) => {
                        field.onChange(val);
                        handleTypeChange(val);
                      }}
                    >
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
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DURATION */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => {
            const totalMinutes = field.value || 0;
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            const updateDuration = (h: number, m: number) => {
              const clampedMins = Math.min(Math.max(m, 0), 59);
              const total = h * 60 + clampedMins;
              field.onChange(total);
            };

            return (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Hours"
                      value={hours}
                      onChange={(e) =>
                        updateDuration(Number(e.target.value), minutes)
                      }
                    />
                    <Input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Minutes"
                      value={minutes}
                      onChange={(e) =>
                        updateDuration(hours, Number(e.target.value))
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* NOTES */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea placeholder="Optional notes here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* MOOD TOGGLES */}
        <FormField
          control={form.control}
          name="mood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mood</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  value={field.value}
                  onValueChange={(val) => field.onChange(val)}
                  className="flex flex-wrap gap-2 w-full"
                >
                  {moodOptions.map((mood) => (
                    <ToggleGroupItem
                      key={mood}
                      value={mood}
                      aria-label={mood}
                      className="flex-none rounded-md border"
                    >
                      {mood}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default SessionForm;
