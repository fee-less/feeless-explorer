"use client";

import Block from "@/app/components/custom/Block";
import { nodeHTTP, nodeWS } from "@/app/components/custom/static";
import IsolatedCard from "@/app/components/IsolatedCard";
import { Note, Title } from "@/app/components/Texts";
import { Block as BlockType, FeelessClient } from "feeless-utils";
import { useEffect, useState } from "react";
import { use } from "react";

export default function BlockPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string }>;
}) {
  const params = use(paramsPromise);
  const bHash = params.slug;

  const [block, setBlock] = useState<BlockType>();
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    (async () => {
      const fc = new FeelessClient(nodeWS, nodeHTTP, "012031203648912737351301023712378");
      await fc.init();

      const res = await fc.searchBlockByHash(bHash);
      setBlock(res.block);
      setHeight(res.height);
    })();
  }, [bHash]);

  if (!block) return <Note>Loading...</Note>

  return (
    <div className="p-4 sm:p-10">
      <IsolatedCard>
        <Title>Block #{height}</Title>
        <Block block={block} />
      </IsolatedCard>
    </div>
  );
}
