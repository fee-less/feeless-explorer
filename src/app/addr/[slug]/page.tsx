"use client";

import Card from "@/app/components/Card";
import CopyPill from "@/app/components/CopyPill";
import IsolatedCard from "@/app/components/IsolatedCard";
import { Body, Note, SubTitle, Title } from "@/app/components/Texts";
import { FeelessClient, fPointsToFLSS } from "feeless-utils";
import { useEffect, useState } from "react";
import { use } from "react";
import TxHistoryItem from "@/app/components/custom/TxHistoryItem"; // adjust path as needed
import {
  formatShortAddress,
  nodeHTTP,
  nodeWS,
} from "@/app/components/custom/static";
import { TransactionHistory } from "feeless-utils/dist/client";
import Tag from "@/app/components/Tag";
import { useParams } from "next/navigation";

export default function Address() {
  const { slug } = useParams();
  const addr = slug as string;

  const [txHistory, setTxHistory] = useState<TransactionHistory[]>([]);
  const [tokens, setTokens] = useState<string[]>([]);
  const [tokenBalances, setTokenBalances] = useState<Record<string, number>>(
    {}
  );
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const fc = new FeelessClient(
        nodeWS,
        nodeHTTP,
        "012031203648912737351301023712378"
      );
      await fc.init();

      // Native baalnce
      setBalance(
        await fetch(nodeHTTP + "/balance/" + addr).then((res) => res.json())
      );

      // TX history
      const hist = await fc.getAddressHistory(addr);
      setTxHistory(hist);
      setLoading(false);

      // Tokens
      const tokens = await fetch(nodeHTTP + "/tokens/" + addr).then((res) =>
        res.json()
      );
      setTokens(tokens);

      // Token balances
      const balances: Record<string, number> = {};
      for (const tkn of tokens) {
        balances[tkn] = await fetch(
          nodeHTTP + "/balance/" + addr + "." + tkn
        ).then((res) => res.json());
      }

      setTokenBalances(balances);
    })();
  }, [addr]);

  return (
    <div className="p-4 sm:p-10">
      <IsolatedCard>
        <Title>Address Info</Title>
        <div className="flex items-center mb-6">
          <Note>Address:</Note>
          <CopyPill text={formatShortAddress(addr)} copyText={addr} inline />
        </div>

        <IsolatedCard className="mb-0 flex flex-col">
          <SubTitle>Balance</SubTitle>
          <CopyPill
            text={fPointsToFLSS(balance) + " FLSS"}
            copyText={balance + ""}
            inline
            className="text-2xl self-center"
          />
          {tokens.length > 0 && (
            <div>
              <Body>Token Balances:</Body>
              <div className="flex flex-wrap gap-2">
                {Object.entries(tokenBalances).map(([token, amount]) => (
                  <div key={token} className="flex items-center gap-2">
                    <CopyPill
                      text={amount + " " + token}
                      copyText={amount.toString()}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </IsolatedCard>

        {tokens.length > 0 && (
          <IsolatedCard className="mb-0">
            <SubTitle>Owned Tokens</SubTitle>
            <div className="flex flex-wrap gap-5">
              {tokens.map((tkn) => (
                <Tag key={tkn} text={tkn} color="purple" />
              ))}
            </div>
          </IsolatedCard>
        )}

        <IsolatedCard>
          <SubTitle>Transaction History</SubTitle>

          {loading && <Note>Loading transaction history...</Note>}

          {!loading && txHistory.length === 0 && (
            <Note>No transactions found for this address.</Note>
          )}

          {!loading && txHistory.length > 0 && (
            <div className="space-y-3 mt-4">
              {txHistory.map((tx, idx) => (
                <TxHistoryItem key={`${tx.blockHeight}-${idx}`} tx={tx} />
              ))}
            </div>
          )}
        </IsolatedCard>
      </IsolatedCard>
    </div>
  );
}
