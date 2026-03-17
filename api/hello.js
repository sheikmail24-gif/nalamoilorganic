// api/hello.js
export default function handler(request, response) {
  // This is where your backend logic goes (database calls, emails, etc.)
  response.status(200).json({ 
    message: "Hello from the backend!",
    site: "Nalam Oil Organic"
  });
}
