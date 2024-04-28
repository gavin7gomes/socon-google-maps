import axios from 'axios';

interface MakeApiRequestData {
}

export async function makeApiRequest(method: string, url: string, data: MakeApiRequestData = {}): Promise<any> {
  

  const headers = {
    // Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json', 
  };

  try {
    const response = await axios({
      method,
      url,
      headers,
      data: JSON.stringify(data), // Only for POST/PUT requests
    });

    return response.data;
  } catch (error) {
    console.error('Error making API request:', error);
    throw error; // Re-throw the error for further handling
  }
}