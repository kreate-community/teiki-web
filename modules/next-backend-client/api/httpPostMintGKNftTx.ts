/* eslint-disable @typescript-eslint/no-explicit-any */
import { GenesisKreationQuotation } from "@kreate/protocol/schema/teiki/kolours";
import { Hex } from "@kreate/protocol/types";

import { assert } from "@/modules/common-utils";
import { fromJson, toJson } from "@/modules/json-utils";

type Params = {
  quotation: GenesisKreationQuotation;
  signature: string;
  txHex: Hex;
};

type Response = { txId: string; tx: Hex };

export async function httpPostMintGKNftTx({
  quotation,
  signature,
  txHex,
}: Params): Promise<Response> {
  const response = await fetch("/api/kolours/genesis-kreation/submit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: toJson({
      quotation,
      signature,
      tx: txHex,
    }),
  });

  assert(response.ok, "response not ok");
  const body = await response.text();
  const responseData = fromJson(body);
  assert(isResponse(responseData), "invalid response");

  return responseData;
}

function isResponse(obj: any): obj is Response {
  return obj?.error === undefined && obj?.txId && obj?.tx;
}
