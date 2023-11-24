import React, { useState, useEffect } from 'react';
import { Input, Card, notification, Empty } from 'antd';
import Auth from '../utils/auth';
import { useMutation } from "@apollo/client";
import { ADD_INSPIRATION } from '../utils/mutations.js';
import { searchUnsplash } from '../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark as faBookmarkFilled, faSquareUpRight } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

export const getInspirationList = () => JSON.parse(localStorage.getItem('activeInspirationList') || '[]');

export const saveInspirationList = (inspirationArr) =>
  inspirationArr.length
    ? localStorage.setItem('activeInspirationList', JSON.stringify(inspirationArr))
    : localStorage.removeItem('activeInspirationList');

const Inspiration = () => {
  const headers = {
    headers: {
      Authorization: `Bearer ${Auth.getToken()}`
    }
  },
  [addInspiration, { error }] = useMutation(ADD_INSPIRATION),
  [inspirationList, setInspirationList] = useState(getInspirationList()),
  [searchInput, setSearchInput] = useState(''),
  [searchedInspiration, setSearchedInspiration] = useState([]),
  [api, contextHolder] = notification.useNotification(),
  { Search } = Input;
  useEffect(() => {
    saveInspirationList(inspirationList);
  });
  const handleFormSubmit = async () => {
    if (!searchInput) return false;
    try {
      const response = await searchUnsplash(searchInput);
      if (!response) throw new Error('something went wrong!');
      setSearchedInspiration(response.results);
      setSearchInput('');
    } catch (err) {
      console.error("Try/Catch Error: " + err);
    }
  };
  const handleSaveInspiration = async (inspirationId) => {
    const inspirationToSave = searchedInspiration.find((inspiration) => inspiration.id === inspirationId),
          token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log("token: ", token);
    console.log("inspirationToSave: ", inspirationToSave);
    if (!token) return false;
    try {
      const inspirationData = {
        id: inspirationToSave.id,
        likes: inspirationToSave.likes,
        backgroundImage: inspirationToSave.urls.small,
        alt_description: inspirationToSave.alt_description,
        raw: inspirationToSave.urls.raw
      };
      console.log("inspirationData: ", inspirationData);
      const { data } = await addInspiration({ 
        variables: { inspirationData },
        context: headers, 
      });
      console.log(data);
      if (!data) throw new Error('something went wrong!'); 
       setInspirationList([...inspirationList, inspirationToSave.id]);
       openNotification('topRight');
    } catch (err) {
      console.error("Try/Catch Error: " + err);
      console.error("Mutation error: " + error);
    }
  }
  const openNotification = (placement) => {
    api.info({
      message: "Inspiration saved!",
      description: "Check your dashboard to view all of your saved inspiration.",
      placement,
    });
  };

  return (
    <>
      <div className="hero">
        <h1 className="text-gradient sublogo">Creative Showcase</h1>
        <img src="robot.png" width="200px" alt="Robot wearing a veil"></img>
        <h3 className="text-gradient description">&ldquo;Experience the epitome of creativity with our curated Creative Showcase. Immerse yourself in a world of innovative ideas and artistic inspiration that redefine the boundaries of wedding aesthetics. Discover unique concepts and trends that promise to elevate your celebration into an extraordinary and unforgettable experience.&rdquo;</h3>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onSearch={handleFormSubmit}
        />
      </div>
      {contextHolder}
      <div className="inspiration-container">
        {searchedInspiration.length > 0 ? (
          searchedInspiration.map((item) => (
            <React.Fragment key={item.id}>
              {Auth.loggedIn() ? (
                <Card
                  hoverable
                  className="inspiration-item"
                  actions={[<p className="salmon"><a href={item.urls.raw} target="_blank" rel="noreferrer">View larger. <FontAwesomeIcon icon={faSquareUpRight} /></a></p>]}
                  style={{ width: 240 }}>
                    <Card type="inner" 
                      title={<small><FontAwesomeIcon icon={faHeart} />&nbsp;&nbsp;&nbsp;{item.likes === 1 ? `${item.likes} Like` : `${item.likes} Likes`}</small>} 
                      extra={
                        <small onClick={() => handleSaveInspiration(item.id)}>
                          {inspirationList?.some((inspirationId) => inspirationId === item.id) ? (
                            <>
                              <FontAwesomeIcon 
                                icon={faBookmarkFilled} 
                                aria-label="Inspiration was saved!" 
                                className="bookmark" />&nbsp;&nbsp;&nbsp;
                              <strong>Saved!</strong>
                            </>
                          ) : (
                            <>
                              <FontAwesomeIcon 
                                icon={faBookmark} 
                                aria-label="Save Inspiration"
                                className="bookmark" />&nbsp;&nbsp;&nbsp;
                              <strong>Save</strong>
                            </>
                          )}
                        </small>
                      } />
                    <div className="ant-card-cover inspiration-cover" style={{ backgroundImage: `url(${item.urls.small})` }}></div>
                    <div className="body">
                      <p>{item.alt_description}</p>
                    </div>
                </Card>
              ) : (
                <Card
                  hoverable
                  className="inspiration-item"
                  style={{ width: 240 }}>
                    <Card type="inner" title={<small><FontAwesomeIcon icon={faHeart} />&nbsp;&nbsp;&nbsp;{item.likes === 1 ? `${item.likes} Like` : `${item.likes} Likes`}</small>} extra={<small>Login to save!</small>} />
                    <div className="ant-card-cover inspiration-cover" style={{ backgroundImage: `url(${item.urls.small})` }}></div>
                    <div className="body">
                      <p>{item.alt_description}</p>
                    </div>
                </Card>
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="search-now">
            <div className="search-now-content">
              <h2>Search Showcase</h2>
              <Empty description="No inspiration found." />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Inspiration; 
