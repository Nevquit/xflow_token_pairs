import React, { useState } from 'react';

interface OperationStatus {
  loading: boolean;
  success: boolean | null;
  message: string;
}

const SolanaXportDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prep' | 'deploy' | 'ops'>('ops');

  // State for Solana to EVM
  const [solToEvmAmount, setSolToEvmAmount] = useState('10');
  const [wanUserAddr, setWanUserAddr] = useState('0x...');
  const [solToEvmStatus, setSolToEvmStatus] = useState<OperationStatus>({ loading: false, success: null, message: '' });

  // State for EVM to Solana
  const [evmToSolAmount, setEvmToSolAmount] = useState('10');
  const [solUserATA, setSolUserATA] = useState('Address...');
  const [evmToSolStatus, setEvmToSolStatus] = useState<OperationStatus>({ loading: false, success: null, message: '' });

  const handleSolToEvm = async () => {
    setSolToEvmStatus({ loading: true, success: null, message: 'Initiating transfer from Solana to EVM...' });
    setTimeout(() => {
      setSolToEvmStatus({
        loading: false,
        success: true,
        message: `Successfully unlocked ${solToEvmAmount} USDC on Solana for ${wanUserAddr} on Wanchain.`
      });
    }, 2000);
  };

  const handleEvmToSol = async () => {
    setEvmToSolStatus({ loading: true, success: null, message: 'Initiating transfer from EVM to Solana...' });
    setTimeout(() => {
      setEvmToSolStatus({
        loading: false,
        success: true,
        message: `Successfully sent ${evmToSolAmount} USDC from Wanchain to Solana ATA: ${solUserATA}.`
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-blue-600 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold">Solana Xport Dashboard</h1>
        <p className="mt-2 opacity-80">Manage your cross-chain asset transfers between Solana and Wanchain</p>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <nav className="flex space-x-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('prep')}
            className={`pb-2 px-4 font-medium transition-colors ${activeTab === 'prep' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            1. Environment Preparation
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`pb-2 px-4 font-medium transition-colors ${activeTab === 'deploy' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            2. Deployment & Initialization
          </button>
          <button
            onClick={() => setActiveTab('ops')}
            className={`pb-2 px-4 font-medium transition-colors ${activeTab === 'ops' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            3. Operation Flows
          </button>
        </nav>

        <div className="bg-white rounded-lg shadow p-8">
          {activeTab === 'prep' && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-blue-700">Environment Preparation</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3">1</span>
                    Basic Tools
                  </h3>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600">
                    <li>Node.js v22.*</li>
                    <li>Rust v1.91.1</li>
                    <li>Solana CLI v3.1.13</li>
                    <li>Anchor Framework v0.31.1</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3">2</span>
                    Test Coins
                  </h3>
                  <p className="text-gray-600">Prepare the following for transactions:</p>
                  <ul className="list-disc list-inside ml-4 space-y-2 text-gray-600">
                    <li><strong>Sol:</strong> Solana Devnet fees</li>
                    <li><strong>Wan:</strong> Wanchain Testnet fees</li>
                    <li><strong>USDC:</strong> Solana Devnet (XPort ERC20)</li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'deploy' && (
            <section className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-blue-700">Solana Contract</h2>
                <div className="bg-gray-100 p-4 rounded-md font-mono text-sm space-y-2 overflow-x-auto">
                  <p>solana config set --url devnet</p>
                  <p>solana-keygen new</p>
                  <p>cd ./token-xport-demo && npm install</p>
                  <p>./0_delete_target.sh</p>
                  <p>./1_build.app.sh</p>
                  <p># Update program ID in lib.rs with output from ./2_get_app_address.sh</p>
                  <p>./3_deploy.sh</p>
                  <p>node ./app/0_initialize.js</p>
                </div>
              </div>

              <div className="space-y-4 border-t pt-8">
                <h2 className="text-2xl font-bold text-blue-700">Wanchain Contract</h2>
                <div className="bg-gray-100 p-4 rounded-md font-mono text-sm space-y-2 overflow-x-auto">
                  <p>cd ./evm-token-transfer && npm install</p>
                  <p>npx hardhat run ./scripts/deploy_rec20tokenremote.js --network wantest</p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'ops' && (
            <section className="space-y-12">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">Step 1: Solana to EVM</h2>
                <p className="text-blue-600 mb-6 italic">Transfer USDC from Solana to Wanchain</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USDC)</label>
                      <input
                        type="number"
                        value={solToEvmAmount}
                        onChange={(e) => setSolToEvmAmount(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Target EVM Address (WanUserAddr)</label>
                      <input
                        type="text"
                        value={wanUserAddr}
                        onChange={(e) => setWanUserAddr(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                      />
                    </div>
                    <button
                      onClick={handleSolToEvm}
                      disabled={solToEvmStatus.loading}
                      className={`w-full py-3 rounded-md font-bold text-white transition-colors ${solToEvmStatus.loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                    >
                      {solToEvmStatus.loading ? 'Processing...' : 'Run 1_unlock.js'}
                    </button>
                  </div>
                  <div className="bg-white p-4 rounded-md border border-blue-200">
                    <h3 className="font-semibold mb-2 text-blue-800 uppercase text-xs tracking-wider">Status Console</h3>
                    <div className={`p-3 rounded text-sm ${solToEvmStatus.success === true ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'}`}>
                      {solToEvmStatus.message || 'Ready for operation.'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border border-purple-100">
                <h2 className="text-2xl font-bold text-purple-800 mb-4">Step 2: EVM to Solana</h2>
                <p className="text-purple-600 mb-6 italic">Transfer USDC from Wanchain to Solana</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USDC)</label>
                      <input
                        type="number"
                        value={evmToSolAmount}
                        onChange={(e) => setEvmToSolAmount(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Target Solana ATA (solUserATA)</label>
                      <input
                        type="text"
                        value={solUserATA}
                        onChange={(e) => setSolUserATA(e.target.value)}
                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500 outline-none font-mono"
                      />
                    </div>
                    <button
                      onClick={handleEvmToSol}
                      disabled={evmToSolStatus.loading}
                      className={`w-full py-3 rounded-md font-bold text-white transition-colors ${evmToSolStatus.loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
                    >
                      {evmToSolStatus.loading ? 'Processing...' : 'Run 25_token_transfer_send.js'}
                    </button>
                  </div>
                  <div className="bg-white p-4 rounded-md border border-purple-200">
                    <h3 className="font-semibold mb-2 text-purple-800 uppercase text-xs tracking-wider">Status Console</h3>
                    <div className={`p-3 rounded text-sm ${evmToSolStatus.success === true ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'}`}>
                      {evmToSolStatus.message || 'Ready for operation.'}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default SolanaXportDashboard;
