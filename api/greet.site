// This is your server-side code
export default function handler(request, response) {
  // We get the name from the frontend request
  const { name } = request.query; 

  // We send back a message
  response.status(200).json({
    message: `Welcome to Nalam Oil Organic, ${name || 'Friend'}!`,
    timestamp: new Date().toISOString()
  });
}
