async function fetchData(url) {
  try{
    const response = await fetch(url);
    if(!response.ok) {
      throw {
        message: "Failed to fetch data", 
        statusText: response.statusText,
        status: response.status
      }
    }
    const data = await response.json();
    return data.jokes;
  } catch(error) {
    throw new Error(error.message);
  }
}

export default fetchData