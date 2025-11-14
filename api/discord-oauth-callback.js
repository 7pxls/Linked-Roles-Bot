// api/discord-oauth-callback.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // This handles the OAuth callback (code -> token -> role connections)
  // Minimal example: exchange code for token and respond (adapt to your app)
  const code = req.query.code;
  if (!code) return res.status(400).send('Missing code');

  const params = new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.DISCORD_REDIRECT_URI // must match Portal
  });

  try {
    const tokenResp = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      body: params,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const tokenJson = await tokenResp.json();
    // Save tokenJson somewhere if you need to call Discord on behalf of user

    // For now, show success to user
    res.status(200).json({ ok: true, token: tokenJson });
  } catch (err) {
    console.error('oauth error', err);
    res.status(500).json({ error: 'OAuth exchange failed' });
  }
}