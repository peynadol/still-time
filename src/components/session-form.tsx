// new and edit session form
import { Session, sessionSchema } from "@/lib/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const SessionForm = () => {
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

  return <div></div>;
};

export default SessionForm;
