import { DEV_WALLET, fPointsToFLSS, Transaction } from "feeless-utils";
import CopyPill from "../CopyPill";
import { Note } from "../Texts";
import Tag from "../Tag";
import { categorizeTx, formatShortAddress } from "./static";

export default function TransactionItem({ tx }: { tx: Transaction }) {
  return <div
    onClick={() => {
      if (!tx.signature) return;
      document.location.href = `/tx/${tx.signature}`;
    }}
    className="w-full hover:bg-gray-900 rounded-sm hover:cursor-pointer"
  >
    <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-4 gap-4 items-start w-full">
      <div className="flex items-center col-span-4 sm:col-span-1 md:col-span-1">
        <Note>from:</Note>
        <CopyPill
          text={formatShortAddress(tx.sender)}
          copyText={tx.sender}
          inline
        />
      </div>

      <div className="flex items-center col-span-4 sm:col-span-1 md:col-span-1">
        <Note>to:</Note>
        <CopyPill
          text={formatShortAddress(tx.receiver)}
          copyText={tx.receiver}
          inline
        />
      </div>

      <div className="flex items-center col-span-4 sm:col-span-1 md:col-span-1">
        <Note>amount:</Note>
        <CopyPill
          text={
            tx.token
              ? tx.amount + " " + tx.token
              : fPointsToFLSS(tx.amount) + " FLSS"
          }
          copyText={tx.amount + ""}
          inline
        />
      </div>

      <div className="flex justify-start md:justify-end col-span-4 sm:col-span-1 md:col-span-1">
        <Tag
          text={categorizeTx(tx)}
          color={
            categorizeTx(tx).includes("fee")
              ? "#D79E67"
              : categorizeTx(tx) === "mint"
              ? "#E8D27A"
              : categorizeTx(tx) === "block reward"
              ? "#E8D27A"
              : categorizeTx(tx) === "locked"
              ? "#D36C6C"
              : "#7DBE83"
          }
          inline
        />
      </div>
    </div>
  </div>;
}