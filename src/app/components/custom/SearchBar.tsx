"use client";
import { useState } from "react";
import TextInput from "../TextInput";
import Button from "../Button";
import { Note, SubTitle } from "../Texts";
import clsx from "clsx";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  const isActive = focused || search.trim().length > 0;

  return (
    <div className="relative w-full px-4 bg-black">
      <div className="flex items-center gap-4">
        <SubTitle className="whitespace-nowrap hover:cursor-pointer" onClick={() => document.location.href = "/"}>FeeLess Explorer</SubTitle>
        <div className="flex-1">
          <TextInput
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search address, block, or tx..."
            className="w-full"
          />
        </div>
      </div>

      <div
        className={clsx(
          "absolute left-0 top-full mt-2 w-full bg-white dark:bg-neutral-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg transition-all duration-300 overflow-hidden z-50",
          {
            "max-h-[300px] opacity-100 p-4": isActive,
            "max-h-0 opacity-0 p-0": !isActive,
          }
        )}
      >
        <Note className="mb-4 text-sm text-center">
          Enter public address, block hash, or transaction signature to search
        </Note>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Button onClick={() => (document.location.href = "/addr/" + search)}>
            Find Address
          </Button>
          <Button onClick={() => (document.location.href = "/block/" + search)}>
            Find Block
          </Button>
          <Button onClick={() => (document.location.href = "/tx/" + search)}>
            Find Transaction
          </Button>
        </div>
      </div>
    </div>
  );
}
