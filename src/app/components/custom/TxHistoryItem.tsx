import { Note } from "@/app/components/Texts";
import CopyPill from "@/app/components/CopyPill";
import { formatShortAddress } from "@/app/components/custom/static";
import { TransactionHistory } from "feeless-utils/dist/client";
import Tag from "../Tag";
import { fPointsToFLSS } from "feeless-utils";

export default function TxHistoryItem({ tx }: { tx: TransactionHistory }) {
  const date = new Date(tx.timestamp);

  return (
    <div className="w-full hover:bg-gray-900 rounded-sm hover:cursor-pointer p-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center w-full">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <Note>Type:</Note>
          <Tag
            text={tx.type.toLocaleUpperCase()}
            color={
              tx.type === "mint"
                ? "yellow"
                : tx.type === "receive"
                ? "green"
                : "red"
            }
            inline
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
          <Note>Amount:</Note>
          <CopyPill
            text={
              tx.token
                ? tx.amount + " " + tx.token
                : fPointsToFLSS(tx.amount) + ""
            }
            copyText={tx.amount.toString()}
            inline
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 break-all">
          <Note>Address:</Note>
          <CopyPill
            text={formatShortAddress(tx.address)}
            copyText={tx.address}
            inline
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-1 sm:gap-4">
          <div className="flex items-center gap-1">
            <Note>Status:</Note>
            <Tag
              text={tx.status.toLocaleUpperCase()}
              color={tx.status === "confirmed" ? "green" : "yellow"}
              inline
            />
          </div>
          <div className="flex items-center gap-1">
            <Note>Block:</Note>
            <CopyPill text={tx.blockHeight + ""} inline />
          </div>
        </div>

        <div className="col-span-full text-right text-xs text-gray-400 mt-1">
          {date.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
