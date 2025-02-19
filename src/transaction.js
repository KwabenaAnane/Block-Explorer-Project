import { createPublicClient, http } from 'https://esm.sh/viem';
import { localhost } from 'https://esm.sh/viem/chains';

const transactionDetailsDisplay = document.querySelector('#transactionDetails');

let client = undefined;

const initApp = () => {
  const hash = location.search.split('=')[1];
  client = createPublicClient({
    chain: localhost,
    transport: http('http://localhost:7545'),
  });

  displayTransactionDetails(hash);
};

const displayTransactionDetails = async (hash) => {
  const block = await client.getBlock({ blockHash: hash });
  // console.log(block);
  // console.log(block.transactions);
  if (block.transactions.length === 0) {
    generateDisplay(block);
    return;
  }

  for (let trx of block.transactions) {
    const transaction = await client.getTransaction({
      hash: trx,
    });

    generateDisplay(block, transaction);
  }
};

const generateDisplay = (block, transaction) => {
  let html = '';
  transactionDetailsDisplay.innerHTML = html;

  if (!transaction) {
    document.querySelector('.page-title').innerText = 'NO TRANSACTIONS';
    return;
  }
  html = `
  <h2 id = 'blockNumber'> BLOCK NUMBER ${block.number} </h2>
  <article class='trx-details'>
    <section>
      <span>Gas Used</span>
      <small>${block.gasUsed}</small>
    </section>

    <section>
      <span>Gas Limit</span>
      <small>${block.gasLimit}</small>
    </section>

    <section>
      <span>Mined on</span>
      <small>${new Date(
        parseInt(block.timestamp * 1000n)
      ).toLocaleString()}</small>
    </section>
    
     <section>
      <span>Block Hash</span>
      <small>${block.hash}</small>
    </section>
     </article>
    

    <h2 id ='trxHash'>TX Hash ${transaction.hash}</h2>
    <article class='trx-details'>
     <section>
      <span>From:</span>
      <small>${transaction.from}</small>
    </section>

      <section>
      <span>To:</span>
      <small>${transaction.to}</small>
    </section>

      <section>
      <span>Gas Used:</span>
      <small>${transaction.gas}</small>
    </section>

      <section>
      <span>Value:</span>
      <small>${transaction.value}</small>
    </section>

  </article>

`;

  transactionDetailsDisplay.innerHTML = html;
};

document.addEventListener('DOMContentLoaded', initApp);
