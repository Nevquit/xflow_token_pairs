# Wanchain XFlows Asset Panorama

This project displays a panoramic view of asset paths in the Wanchain XFlows ecosystem. It is built with a simple HTML/CSS/JavaScript frontend and uses a Vercel serverless function to fetch data from the `iwan-js-sdk`.

## Development

To run this project locally, you will need to have the [Vercel CLI](https://vercel.com/docs/cli) installed.

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add the following environment variables:

    ```
    IWAN_API_KEY='your_api_key'
    IWAN_SECRET_KEY='your_secret_key'
    IWAN_RPC_URL='api.wanchain.org'
    ```

    You will need to obtain your own API Key and Secret Key from the [iWan website](https://iwan.wanchain.org/).

3.  **Run the development server:**

    ```bash
    vercel dev
    ```

    The application will be available at `http://localhost:3000`.

## Deployment

This project is designed to be deployed on [Vercel](https://vercel.com). When deploying, you will need to set the same environment variables in your Vercel project settings.
