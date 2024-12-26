import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

try {
  // Validate the public key by attempting to create a PublicKey instance
  const publicKey = new PublicKey(suppliedPublicKey);

  // Check if the public key is on the curve (valid Solana public key)
  if (!PublicKey.isOnCurve(publicKey.toBytes())) {
    throw new Error("The provided public key is not valid (not on the curve)!");
  }

  //const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  const balanceInLamports = await connection.getBalance(publicKey);
  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

  console.log(
    `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`,
  );
} catch (error) {
  throw new Error(`Invalid public key provided: ${error.message}`);
}
