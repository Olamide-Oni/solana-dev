import * as web3 from "@solana/web3.js";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import "dotenv/config";

const suppliedToPubkey = process.argv[2] || null;

if (!suppliedToPubkey) {
    console.log(`Please provide a public key to send to`);
    process.exit(1);
  }

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY"); 

const toPubkey = new web3.PublicKey(suppliedToPubkey);

const connection = new  web3.Connection(web3.clusterApiUrl("devnet"));

console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
  );

const transaction = new web3.Transaction();

const LAMPORTS_TO_SEND = 10000;


const sendSolInstructionnstruction = web3.SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND
}

)

transaction.add(sendSolInstructionnstruction);

 
const signature = await web3.sendAndConfirmTransaction(connection, transaction, [
    senderKeypair,
  ]);
   
  console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
  );
  console.log(`Transaction signature is ${signature}!`);



