export default async (req, res) => {
    // Set the cookie with an empty value and a past expiry date to delete it
    res.setHeader(
      'Set-Cookie',
      'kualifyApp=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; HttpOnly'
    )
      res.status(200).json({ message: 'Cookie deleted successfully' });
  }