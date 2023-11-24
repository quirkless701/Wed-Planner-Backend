// Function to get the saved places IDs from local storage
export const getSavedPlacesIds = () => {
    const savedPlacesIds = localStorage.getItem('savedPlacesIds');
    return savedPlacesIds ? JSON.parse(savedPlacesIds) : [];
  };
  
  // Function to save the places IDs to local storage
  export const savePlacesIds = (placesIds) => {
    localStorage.setItem('savedPlacesIds', JSON.stringify(placesIds));
  };
  
  // Function to remove a place ID from local storage
  export const removePlacesId = (placeId) => {
    const savedPlacesIds = getSavedPlacesIds();
    const updatedPlacesIds = savedPlacesIds.filter((id) => id !== placeId);
    savePlacesIds(updatedPlacesIds);
  };
  

