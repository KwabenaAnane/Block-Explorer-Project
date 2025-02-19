import { createElement, createTextElement } from './dom.js';
import { formatEther } from 'https://esm.sh/viem';
import { createClient } from './helpers/explorer.js';

const blockList = document.querySelector('#list');
const subTitle = document.querySelector('h4');

let client = undefined;

const initApp = async () => {
  client = createClient();
  getBalance();
  listAllBlocks();
};

const getBalance = async () => {
  const balance = await client.getBalance({
    address: '0x544FA64DeA5697b87e23c88fB90860d3a3B6Ee0d',
  });

  subTitle.innerText = `Current Balance: ${parseFloat(
    formatEther(balance)
  ).toFixed(2)}`;
};

const listAllBlocks = async () => {
  const blocks = await client.getBlockNumber();

  for (let i = blocks; i >= 0; i--) {
    const block = await client.getBlock({ blockNumber: i });
    console.log(block);

    const div = createElement('div');
    div.classList.add('section');

    div.appendChild(createTextElement('div', block.number)); // Block number

    div.appendChild(createTextElement('div', block.hash)); //Hash

    div.appendChild(
      createTextElement(
        'div',
        new Date(parseInt(block.timestamp * 1000n)).toLocaleString()
      )
    ); //Date

    //Add button

    const button = createElement('a');
    button.innerText = 'Show';
    button.classList.add('btn'); // add class in javascript
    button.classList.add('btn-rounded');
    button.style.width = '100px';
    button.href = `../pages/transaction.html?hash=${block.hash}`;

    div.appendChild(button);

    blockList.append(div);
  }
};

document.addEventListener('DOMContentLoaded', initApp);
