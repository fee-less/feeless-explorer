"use client";
import { useEffect, useState } from "react";
import Card from "./components/Card";
import IsolatedCard from "./components/IsolatedCard";
import { Note, Title } from "./components/Texts";
import {
  Block as BlockType,
  calculateReward,
  FeelessClient,
} from "feeless-utils";
import Block from "./components/custom/Block";
import { nodeHTTP, nodeWS } from "./components/custom/static";
import CopyPill from "./components/CopyPill";

export default function Home() {
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const [hashrate, setHashRate] = useState(0);
  const [diff, setDiff] = useState(0);
  const [supply, setSupply] = useState(0);

  useEffect(() => {
    (async () => {
      const fc = new FeelessClient(
        nodeWS,
        nodeHTTP,
        "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
      );

      const diff = (await fetch(nodeHTTP + "/diff").then(res => res.json())).diff;
      setHashRate(
        Number((BigInt(
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        ) / BigInt("0x" + diff)) / BigInt(30))
      );
      setDiff(
        Number(
          BigInt(
            "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
          ) / BigInt("0x" + diff)
        )
      );

      const height = (await fc.getBlockHeight()) - 1;
      const blockPromises = Array.from({ length: 15 }, (_, i) =>
        fc.getBlock(height - i)
      );
      const blocks = await Promise.all(blockPromises);
      setBlocks(blocks);

      let supply = 5000000;
      for (let i = 0; i < height; i++) {
        supply += calculateReward(i);
      }
      setSupply(supply);
    })();
  }, []);

  const formatHashrate = (hr: number): string => {
    if (hr === 0) return "0 H/s";

    const units = ["H/s", "KH/s", "MH/s", "GH/s", "TH/s", "PH/s", "EH/s"];
    const i = Math.floor(Math.log(hr) / Math.log(1000));
    const value = hr / Math.pow(1000, i);

    return `${value.toFixed(2)} ${units[i]}`;
  };
  const formatDiff = (d: number): string => {
    if (d === 0) return "0";

    const units = ["", "K", "M", "G", "T", "P", "E"];
    const i = Math.floor(Math.log(d) / Math.log(1000));
    const value = d / Math.pow(1000, i);

    return `${value.toFixed(2)} ${units[i]}`;
  };

  const formatter = new Intl.NumberFormat();

  return (
    <div>
      <Card>
        <Title>FeeLess Explorer</Title>
        <p>
          Track transactions, view balances, it's all here, a few clicks away.
        </p>

        <IsolatedCard>
          <Title>Network Statistics</Title>
          <div className="flex items-center">
            <Note>Hashrate:</Note>
            <CopyPill
              text={formatHashrate(hashrate)}
              copyText={hashrate + ""}
              inline
            />
          </div>
          <div className="flex items-center">
            <Note>Difficulty:</Note>
            <CopyPill text={formatDiff(diff)} copyText={diff + ""} inline />
          </div>
          <div className="flex items-center">
            <Note>Circulating Supply:</Note>
            <CopyPill text={formatter.format(supply)} copyText={supply + ""} inline />
          </div>
        </IsolatedCard>

        <IsolatedCard>
          <Title>Latest Blocks</Title>
          <Note>Ordered from newest to latest.</Note>
          {blocks.map((b) => (
            <Block key={b.nonce} block={b} />
          ))}
        </IsolatedCard>
      </Card>
    </div>
  );
}
