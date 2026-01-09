const iWanClient = require('iwan-sdk');

module.exports = async (req, res) => {
    const { IWAN_API_KEY, IWAN_SECRET_KEY, IWAN_RPC_URL } = process.env;

    if (!IWAN_API_KEY || !IWAN_SECRET_KEY || !IWAN_RPC_URL) {
        return res.status(500).json({ error: 'API credentials are not configured.' });
    }

    const option = {
        url: IWAN_RPC_URL,
        port: 8443,
        flag: "ws",
        version: "v3",
    };

    let apiClient;
    try {
        apiClient = new iWanClient(IWAN_API_KEY, IWAN_SECRET_KEY, option);

        const [chainInfo, tokenPairs, tokenInfo, supportedChains] = await Promise.all([
            apiClient.getRegisteredChainLogo(),
            apiClient.getTokenPairs(),
            apiClient.getRegisteredMultiChainOrigToken(),
            apiClient.getSupportedChainInfo()
        ]);

        res.status(200).json({ chainInfo, tokenPairs, tokenInfo, supportedChains });
    } catch (error) {
        console.error('Error fetching data from iWan SDK:', error);
        res.status(500).json({ error: 'Failed to fetch data.' });
    } finally {
        if (apiClient) {
            apiClient.close();
        }
    }
};
