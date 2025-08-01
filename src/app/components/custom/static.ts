import { DEV_WALLET, Transaction } from "feeless-utils";

export const nodeHTTP = "http://localhost:8000";
export const nodeWS = "ws://localhost:6061";
export const categorizeTx = (
  tx: Transaction
):
  | "normal"
  | "locked"
  | "block fee"
  | "block reward"
  | "mint fee"
  | "mint" => {
  if (tx.sender === "mint") return "mint";
  else if (tx.receiver === DEV_WALLET && tx.sender === "network")
    return "block fee";
  else if (tx.sender === "network") return "block reward";
  else if (tx.mint) return "mint fee";
  else if (tx.unlock) return "locked";
  return "normal";
};

export const formatShortAddress = (addr: string): string => {
  if (addr === DEV_WALLET) return "DEV WALLET";
  if (addr === "network") return "NETWORK";
  if (addr === "mint") return "MINT";
  return addr.slice(0, 10) + "...";
};