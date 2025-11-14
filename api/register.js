// api/register.js

export default async function handler(req, res) {
  try {
    const { DISCORD_CLIENT_ID, DISCORD_TOKEN } = process.env;

    if (!DISCORD_CLIENT_ID || !DISCORD_TOKEN) {
      return res.status(500).json({
        error: "Missing environment variables DISCORD_CLIENT_ID or DISCORD_TOKEN"
      });
    }

    const url = `https://discord.com/api/v10/applications/${DISCORD_CLIENT_ID}/role-connections/metadata`;

    const body = [
      {
        key: 'cookieseaten',
        name: 'Cookies Eaten',
        description: 'Cookies Eaten Greater Than',
        type: 2
      },
      {
        key: 'sreemanscafe',
        name: "Sreeman's Café",
        description: 'Get A Cookie',
        type: 7
      }
    ];

    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${DISCORD_TOKEN}`
      }
    });

    const text = await response.text();
    let json;

    try { json = JSON.parse(text); } catch (_) {}

    if (response.ok) {
      return res.status(200).json({
        success: true,
        message: "Metadata registered successfully!",
        discordResponse: json || text
      });
    } else {
      return res.status(response.status).json({
        success: false,
        error: "Discord API returned an error",
        status: response.status,
        response: json || text
      });
    }

  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
