# Merry Events — Website

A gallery + client enquiry site for Merry Events, built with Next.js.
Photos are stored in **Vercel Blob** (free tier), so you can add new
photos any time from the `/admin` page — no re-deploying needed.

## What's inside

- `/` — Home page (hero, about, services, gallery preview, enquiry form)
- `/gallery` — Full photo gallery
- `/admin` — Password-protected page to upload/delete photos and view
  client enquiries (name + phone submitted from the site)

## 1. Put this project on GitHub

1. Create a free account at github.com if you don't have one.
2. Create a new empty repository, e.g. `merryevents-site`.
3. Upload all the files in this folder to that repository
   (GitHub's "Add file → Upload files" button works fine for this).

## 2. Deploy to Vercel

1. Go to vercel.com and sign up (you can sign up using your GitHub
   account — makes step 3 automatic).
2. Click **Add New → Project**, then pick the `merryevents-site`
   repository you just created.
3. Click **Deploy**. Vercel will build the site — it may show an
   error the first time because storage isn't connected yet. That's
   expected, continue to step 3 below.

## 3. Add free photo storage (Vercel Blob)

1. In your Vercel project, go to the **Storage** tab.
2. Click **Create Database → Blob**, give it any name, click Create.
3. Vercel automatically connects it to your project and adds a
   `BLOB_READ_WRITE_TOKEN` value for you — you don't need to copy
   anything.
4. Go to **Deployments**, click the latest deployment's **⋯ menu →
   Redeploy**, so the site picks up the new storage connection.

## 4. Set your admin password

1. In your Vercel project, go to **Settings → Environment Variables**.
2. Add a new variable:
   - Name: `ADMIN_SECRET`
   - Value: any password you'll remember (this protects `/admin`)
3. Redeploy once more (Deployments → ⋯ → Redeploy) so it takes effect.

Once deployed, visit `yourproject.vercel.app/admin`, enter the
password you set, and you can start uploading photos immediately.

## 5. Connect your Hostinger domain (merryevents.in)

1. In your Vercel project, go to **Settings → Domains**, type
   `merryevents.in`, click Add.
2. Vercel will show you 1–2 DNS records to add (usually an A record
   for `merryevents.in` and a CNAME for `www`).
3. Log in to Hostinger → your domain → DNS / Nameservers section.
4. Add the exact records Vercel showed you.
5. Wait 10 minutes–24 hours for it to activate. Vercel will show a
   green checkmark next to the domain once it's connected, and adds
   free HTTPS (the padlock) automatically.

## Things you'll want to edit later

- **Phone numbers**: currently placeholders (`0000000000`,
  `9999999999`) in `app/components/Footer.tsx` — search for those
  digits and replace them.
- **WhatsApp link**: in `app/components/Footer.tsx`, find the
  WhatsApp icon's `href="#"` and replace `#` with your WhatsApp link
  (e.g. `https://wa.me/91XXXXXXXXXX`).
- **Copy/text**: headline, about text, and services list are in
  `app/page.tsx` — plain English, easy to edit even without coding
  experience.

## Running it on your own computer (optional)

If you want to preview changes before deploying:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. You'll need a `.env.local` file
(copy `.env.example`) with your own Blob token for uploads to work
locally — otherwise the gallery will just show as empty.
