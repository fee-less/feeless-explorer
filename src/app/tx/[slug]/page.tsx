"use client";

import CopyPill from "@/app/components/CopyPill";
import { nodeHTTP, nodeWS } from "@/app/components/custom/static";
import IsolatedCard from "@/app/components/IsolatedCard";
import Tag from "@/app/components/Tag";
import { Body, Note, SubTitle, Title } from "@/app/components/Texts";
import {
  DEV_WALLET,
  FeelessClient,
  fPointsToFLSS,
  Transaction,
} from "feeless-utils";
import { useEffect, useState } from "react";
import { use } from "react";

export default function BlockPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const params = use(paramsPromise);
  const txSign = params.slug;

  const [tx, setTx] = useState<Transaction>();
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    (async () => {
      const fc = new FeelessClient(
        nodeWS,
        nodeHTTP,
        "012031203648912737351301023712378"
      );
      await fc.init();

      const res = await fc.searchTransaction(txSign);
      setTx(res.results[0].tx);
      setHeight(res.results[0].blockHeight);
    })();
  }, [txSign]);

  const formatShortAddress = (addr: string): string => {
    if (addr === DEV_WALLET) return "DEV WALLET";
    if (addr === "network") return "NETWORK";
    if (addr === "mint") return "MINT";
    return addr.slice(0, 10) + "...";
  };

  const categorizeTx = (
    tx: Transaction
  ):
    | "normal"
    | "locked"
    | "block fee"
    | "block reward"
    | "mint fee"
    | "mint" => {
    if (tx.sender === "mint") return "mint";
    if (tx.receiver === DEV_WALLET && tx.sender === "network")
      return "block fee";
    if (tx.sender === "network") return "block reward";
    if (tx.mint) return "mint fee";
    if (tx.unlock) return "locked";
    return "normal";
  };

  if (!tx) return <Note>Loading...</Note>;

  return (
    <div className="p-4 sm:p-10">
      <IsolatedCard>
        <div className="mb-6">
          <Title>Transaction at block #{height}</Title>
          <Body>
            {new Date(tx.timestamp).toLocaleString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </Body>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General Info */}
          <div className="flex flex-col gap-4">
            <div className="w-full flex justify-center">
              <Tag text="GENERAL INFO" color="red" inline />
            </div>
            <div className="flex items-center gap-2">
              <Note>Amount:</Note>
              <CopyPill
                text={
                  (tx.token ? tx.amount : fPointsToFLSS(tx.amount)) +
                  (tx.token ?? " FLSS")
                }
                copyText={tx.amount + ""}
                inline
              />
            </div>
            <div className="flex items-center gap-2">
              <Note>From:</Note>
              <CopyPill
                text={formatShortAddress(tx.sender)}
                copyText={tx.sender}
                inline
              />
            </div>
            <div className="flex items-center gap-2">
              <Note>To:</Note>
              <CopyPill
                text={formatShortAddress(tx.receiver)}
                copyText={tx.receiver}
                inline
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-4">
            <div className="w-full flex justify-center">
              <Tag text="DETAILS" color="orange" inline />
            </div>
            <div className="flex items-center gap-2">
              <Note>Signature:</Note>
              <CopyPill
                text={formatShortAddress(tx.signature)}
                copyText={tx.signature}
                inline
              />
            </div>
            <div className="flex items-center gap-2">
              <Note>Nonce:</Note>
              <CopyPill text={tx.nonce + ""} copyText={tx.nonce + ""} inline />
            </div>
            <div className="flex items-center gap-2">
              <Note>TX Type:</Note>
              <Tag text={categorizeTx(tx)} color="green" inline />
            </div>
          </div>
        </div>

        {/* Unlock Info */}
        {tx.unlock && (
          <div className="mt-10 border-t pt-6">
            <div className="w-full flex justify-center mb-2">
              <Tag text="LOCKED TRANSACTION" color="purple" inline />
            </div>
            <div className="flex items-center justify-center gap-3">
              <Note>Fulfills at:</Note>
              <Body>
                {new Date(tx.unlock).toLocaleString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </Body>
            </div>
          </div>
        )}

        {/* Mint Info */}
        {tx.mint && (
          <div className="mt-10 border-t pt-6">
            <div className="w-full flex justify-center mb-2">
              <Tag text="MINT DETAILS" color="purple" inline />
            </div>
            <div className="flex items-center gap-2">
              <Note>Minting Token:</Note>
              <CopyPill text={tx.mint.token} inline />
            </div>
            <div className="flex items-center gap-2">
              <Note>Minter airdrop:</Note>
              <CopyPill text={`${tx.mint.airdrop} ${tx.mint.token}`} inline />
            </div>
            {tx.mint.miningReward && (
              <div className="flex items-center gap-2">
                <Note>Mining reward:</Note>
                <CopyPill
                  text={`${tx.mint.miningReward} ${tx.mint.token}`}
                  inline
                />
              </div>
            )}
          </div>
        )}
      </IsolatedCard>
    </div>
  );
}
