
# SellerPintar Frontend Test

This is a Next.js project for the frontend test of SellerPintar.

## Getting Started Locally

To run the application locally, follow these steps:

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/andi-abdillah/sellerpintar-frontend-test.git
```

### 2. Create the `.env` File

After cloning the repository, you need to create a `.env` file based on the `.env.example` template.

1. Copy the `.env.example` file:

   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and replace the values for `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_JWT_SECRET` with your actual values:

   ```env
   NEXT_PUBLIC_API_URL=<Your_API_URL>
   NEXT_PUBLIC_JWT_SECRET=<Your_JWT_SECRET>
   ```

### 3. Install Dependencies

Navigate to the project directory and install the dependencies:

```bash
cd sellerpintar-frontend-test
npm install
# or using yarn
# yarn install
# or using pnpm
# pnpm install
```

### 4. Run the Development Server

After the dependencies are installed, start the development server by running the following command:

```bash
npm run dev
# or using yarn
# yarn dev
# or using pnpm
# pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### 5. Start Editing

You can now start editing the application. For example, modify the file `app/page.tsx` to update the homepage. The page will auto-reload as you make changes.

---

## Deployment

If you'd like to test the application without running it locally, the app is already deployed at [https://sellerpintar-frontend-test.vercel.app/](https://sellerpintar-frontend-test.vercel.app/).

You can visit this URL to see the application live.

---