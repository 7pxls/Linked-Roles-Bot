// api/linked-role.js
export default function handler(req, res) {
  // Optional: log UA for debugging
  console.log('/linked-role requested, UA=', req.headers['user-agent']);

  // Respond with 200 and whatever the tutorial expects.
  // The Linked Roles tutorial only requires a reachable URL that returns 200.
  res.status(200).json({
    success: true,
    message: 'Linked Roles verification endpoint — OK'
  });
}