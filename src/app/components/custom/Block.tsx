import {
  Block as BlockType,
  DEV_WALLET,
  fPointsToFLSS,
  Transaction,
} from "feeless-utils";
import CopyPill from "../CopyPill";
import { Body, Note } from "../Texts";
import Tag from "../Tag";
import { ExternalLinkIcon } from "lucide-react";
import TransactionItem from "./TransactionItem";

export default function Block({ block }: { block: BlockType }) {
  return (
    <div key={block.hash}>
      <hr></hr>
      <div
        onClick={() => (document.location.href = "/block/" + block.hash)}
        className="my-4 flex w-full justify-between items-center hover:bg-gray-900 rounded-sm hover:cursor-pointer"
      >
        <div className="flex items-center">
          <Body>Hash: </Body>
          <CopyPill
            text={block.hash.slice(0, 10) + "..."}
            copyText={block.hash}
            inline
          ></CopyPill>
        </div>
        <div className="flex items-center gap-2">
          <Body>
            {new Date(block.timestamp).toLocaleString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </Body>
          <ExternalLinkIcon className="transition-all hover:cursor-pointer hover:scale-[1.3]" />
        </div>
      </div>

      <Note>{block.transactions.length} transactions:</Note>
      <div>
        {(block.transactions as Transaction[]).map((tx, i) => (
          <div key={Math.random()}>
            <TransactionItem tx={tx} />
            {i !== block.transactions.length - 1 && (
              <hr className="md:hidden text-gray-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
