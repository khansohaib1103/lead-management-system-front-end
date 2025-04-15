const API_BASE_URL = 'https://lead-management-system-production-69ac.up.railway.app/api/leads';
const TIMEOUT = 10000; 

const handleApiError = (error, operation) => {
  if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
    throw new Error(`Unable to connect to the server. Please make sure your backend is running at ${API_BASE_URL}`);
  }
  throw new Error(`${operation} failed: ${error.message}`);
};


export const fetchLeads = async () => {
  try {
    console.log('Fetching leads from:', API_BASE_URL);
    const response = await fetch(API_BASE_URL);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error (${response.status}): ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Fetched leads:', data);
    return data;
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
};


export const addLead = async (leadData) => {
  try {
    console.log('Attempting to add lead:', leadData);
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

  
    console.log('Server response status:', response.status);
    
    const responseData = await response.json().catch(e => {
      console.error('Error parsing response:', e);
      return null;
    });
    
    console.log('Server response data:', responseData);

    if (!response.ok) {
      
      console.error('Server error details:', {
        status: response.status,
        statusText: response.statusText,
        data: responseData
      });
      
      throw new Error(
        responseData?.message || 
        `Server error (${response.status}): ${response.statusText}`
      );
    }

    return responseData;
  } catch (error) {
    console.error('Error in addLead:', error);
    throw error;
  }
};


export const deleteLead = async (id) => {
  try {
    console.log('Deleting lead:', id);
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error (${response.status}): ${response.statusText}`);
    }

    console.log('Lead deleted successfully:', id);
    return true;
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
};

