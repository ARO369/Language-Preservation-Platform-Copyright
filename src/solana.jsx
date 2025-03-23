import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { Buffer } from "buffer";
import { useState, useEffect } from "react";

const prefetchCache = {};

// Set up connection and program ID
const CONNECTION = new Connection(
  "https://explorer-api.devnet.solana.com/",
  "confirmed"
);
const PROGRAM_ID = new PublicKey(
  "DcF2QAbpQimbsa3WPqBkyw1R3QAaUECM4udchmXEb928"
);

// Function to store metadata (unchanged)
export async function storeMetadata(metadata, metadataAccount, payer) {
  const metadataData = Buffer.from(JSON.stringify(metadata)); // Convert metadata to buffer
  const transaction = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: metadataAccount.publicKey,
      lamports: await CONNECTION.getMinimumBalanceForRentExemption(
        metadataData.length
      ),
      space: metadataData.length,
      programId: PROGRAM_ID,
    }),
    new TransactionInstruction({
      keys: [
        {
          pubkey: metadataAccount.publicKey,
          isSigner: false,
          isWritable: true,
        },
        { pubkey: payer.publicKey, isSigner: true, isWritable: false },
      ],
      programId: PROGRAM_ID,
      data: metadataData,
    })
  );
  try {
    const signature = await CONNECTION.sendTransaction(transaction, [
      payer,
      metadataAccount,
    ]);
    await CONNECTION.confirmTransaction(signature, "confirmed");
  } catch (error) {
    console.log(error);
  }
}

// Fetch and parse JSON metadata
export default async function fetchJson(prefetch = false) {
  if (prefetch && prefetchCache.data) {
    console.log("Using cached data");
    return prefetchCache.data;
  }
  let signatures = [];
  let lastSignature = null;

  // Fetch all signatures associated with the program ID
  while (true) {
    const options = { limit: 1000 };
    if (lastSignature) {
      options.before = lastSignature;
    }
    try {
      const result = await CONNECTION.getSignaturesForAddress(
        PROGRAM_ID,
        options
      );
      if (result.length === 0) break;

      signatures = signatures.concat(
        result.map((sigInfo) => sigInfo.signature)
      );
      lastSignature = result[result.length - 1].signature;
    } catch (error) {
      console.error("Error fetching signatures:", error.message);
      break;
    }
  }

  const allData = [];

  // Process each signature to retrieve transaction details
  for (const txId of signatures) {
    try {
      if (txId == lastSignature) {
        break;
      }
      const txDetails = await CONNECTION.getTransaction(txId);

      // Extract and clean log data to fetch JSON
      const finalData = JSON.parse(
        txDetails.meta.logMessages[3].replace(
          "Program log: Stored JSON data:",
          ""
        )
      );
      const aro = JSON.parse(finalData);

      // Log metadata for debugging
      console.log("Fetched Metadata:", aro);

      allData.push({
        name: aro.name,
        title: aro.title,
        description: aro.description,
        videoUrl: aro.videoFile
          ? "https://gateway.pinata.cloud/ipfs/" + aro.videoFile
          : null,
        audioUrl: aro.audioFile
          ? `https://gateway.pinata.cloud/ipfs/${aro.audioFile}`
          : null,
        imageUrl: aro.imageFile
          ? "https://gateway.pinata.cloud/ipfs/" + aro.imageFile
          : null,

        publishDate: aro.publishDate || null,
        category: aro.Category,
        fileUrl: aro.textFile
          ? `https://gateway.pinata.cloud/ipfs/${aro.textFile}`
          : null,
      });
    } catch (error) {
      console.error(`Error fetching details for transaction ${txId}:`, error);
    }
    if (prefetch) {
      prefetchCache.data = allData; // Store the data in cache
    }
  }

  console.log("Prefetched Data: ", allData);
  // console.log("All Data 1: ", allData[0]);
  return allData;
}
