import { createPublicClient } from 'https://esm.sh/viem';

import { localhost } from 'https://esm.sh/viem/chains';

export const createClient = () => {
  const client = createPublicClient({
    chain: localhost,
    transport: http('http://localhost:7545'),
  });
  return client;
};
