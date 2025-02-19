import { createWalletClient, http, parseEther } from 'https://esm.sh/viem';
import { localhost } from 'https://esm.sh/viem/chains';

const form = document.querySelector('#transaction-form');
const fromInput = document.querySelector('#from');
const toInput = document.querySelector('#to');
const valueInput = document.querySelector('#value');

let client = undefined;
const initApp = () => {
  client = createWalletClient({
    chain: localhost,
    transport: http('http://localhost:7545'),
  });
};

const createTransaction = async (e) => {
  e.preventDefault();

  try {
    await client.sendTransaction({
      account: fromInput.value,
      to: toInput.value,
      value: parseEther(valueInput.value),
    });

    location.href = './blocks.html';
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener('DOMContentLoaded', initApp);
form.addEventListener('submit', createTransaction);
