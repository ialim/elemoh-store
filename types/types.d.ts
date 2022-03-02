import React from "react";

export type reactChild = {
  children: React.ReactNode;
};

export type ActionType =
  | "VIEW"
  | "EDIT"
  | "ADD PAYMENT"
  | "VIEW PAYMENT"
  | "DELETE";

export interface IProps {
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
  label: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (formData: FormData) => void;
  uploadFileName: string;
}
