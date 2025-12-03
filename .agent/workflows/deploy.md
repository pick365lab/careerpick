---
description: Deploy the application to Vercel
---

1. **Install Vercel CLI (if not installed)**
   Run the following command to install Vercel globally (optional but recommended, or use npx):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   npx vercel login
   ```
   - Select your login method (Email, GitHub, etc.) and follow the instructions in the browser.

3. **Deploy Project**
   Run the deploy command in the project root:
   ```bash
   npx vercel
   ```
   - Set up and deploy? **Y**
   - Which scope do you want to deploy to? **(Select your account)**
   - Link to existing project? **N**
   - What’s your project’s name? **career-flow** (or press Enter)
   - In which directory is your code located? **./** (Press Enter)
   - Want to modify these settings? **N** (Press Enter)

4. **Set Environment Variables**
   Go to the Vercel Dashboard URL provided in the terminal output.
   - Navigate to **Settings** > **Environment Variables**.
   - Add the following variables from your `.env.local`:
     - `GEMINI_API_KEY`
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Important**: After adding variables, you must redeploy for them to take effect.

5. **Redeploy for Production**
   ```bash
   npx vercel --prod
   ```
   - This creates the final production build.

6. **Verify Deployment**
   - Visit the `Production` URL provided in the output.
