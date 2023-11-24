import React, { useState, useEffect } from 'react';
import { Input, Card, Button, CardColumns, Container, Jumbotron, Form, Col } from 'antd';


const Venue = () => {
  const [searchedPlaces, setSearchedPlaces] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedPlacesIds, setSavedPlacesIds] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
 
      const response = {
        ok: true,
        data: [
          {
            id: 1,
            description: 'Venue 1 description',
            location: 'Venue 1 address',
            contactNumber: 'Venue 1 phone number',
            image: 'venue1.png',
          },

        ],
      };

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const { data } = response;

      const placesData = data.map((place) => ({
        PlacesId: place.id,
        description: place.description,
        location: place.location,
        contactNumber: place.contactNumber,
        image: place.image,
      }));

      setSearchedPlaces(placesData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavePlaces = async (PlacesId) => {

    if (savedPlacesIds.includes(PlacesId)) {
      return; 
    }

    setSavedPlacesIds([...savedPlacesIds, PlacesId]);
  };

  const getSavedPlacesIds = () => {
    console.log("test");
  }

  useEffect(() => {
    const savedIds = getSavedPlacesIds();
    if (savedIds) {
      setSavedPlacesIds(savedIds);
    }
  }, [savedPlacesIds]);

  return (
    <>
    <div className="hero">
        <h1 className="text-gradient sublogo">Venues</h1>
        <img src="robot.png" width="200px" alt="Robot wearing a veil"></img>
        <h3 className="text-gradient description">&ldquo;Discover enchanting venues that set the stage for your dream wedding. From elegant ballrooms to picturesque gardens, explore a curated collection of spaces that elevate your celebration to a timeless and memorable experience.&rdquo;</h3>
      </div>
      <div fluid="true" className='text-light bg-dark'>
        <div>
          <h1>Search for Places!</h1>
          <Form onSubmit={handleFormSubmit}>
            <div>
              <div>
                <Input
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a Place'
                />
              </div>
              <div>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>

      <div>
        <h2>
          {searchedPlaces.length
            ? `Viewing ${searchedPlaces.length} results:`
            : 'Search for a Place to begin'}
        </h2>
        <div>
          {searchedPlaces.map((place) => {
            return (
              <Card key={place.PlacesId} border='dark'>
                {place.image ? (
                  <img src={place.image} alt={`The image for ${place.location}`} variant='top' />
                ) : null}
                <div>
                  <p>{place.location}</p>
                  <p className='small'>Contact: {place.contactNumber}</p>
                  <p>{place.description}</p>
                  <Button
                    disabled={savedPlacesIds.includes(place.PlacesId)}
                    className='btn-block btn-info'
                    onClick={() => handleSavePlaces(place.PlacesId)}
                  >
                    {savedPlacesIds.includes(place.PlacesId)
                      ? 'This Place has already been saved!'
                      : 'Save this Place!'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Venue;

