import React, { useState } from 'react';
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ITEMS } from '../../../utils/queries';
import { QUERY_CATEGORIES } from '../../../utils/queries';
import Form from 'react-bootstrap/Form';

function Homepage() {
  const { data: itemData } = useQuery(QUERY_ITEMS);
  const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  const [categories, setCategories] = useState();
  // console.info(itemData);

  const [inputText, setInputText] = useState('');
  let inputHandler = (event) => {
    //convert input text to lower case
    var lowerCase = event.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  // getting item data from the database and mapping to the ui
  const getItemData = () => {
    return itemData.items.map((item) => (
      <CCard key={item._id}>
        <CCardImage orientation="top" src={item.image} alt={item.title} width="100%" />
        <CCardBody>
          <CCardTitle>{item.title}</CCardTitle>
          <CCardText>${item.price}</CCardText>
          <Link to={{ pathname: `/SingleItem/${item._id}`, item: item }}>
            {' '}
            <CButton>See Item</CButton>
          </Link>
        </CCardBody>
      </CCard>
    ));
  };

  const setState = (e) => {
    setCategories(e.target.innerText);
  };

  const filterCategory = () => {
    const newArr = itemData.items.filter((e) => e.category.name === categories);

    return newArr.map((filteredItem) => (
      <CCard key={filteredItem._id}>
        <CCardImage
          orientation="top"
          src={filteredItem.image}
          alt={filteredItem.title}
          width="100%"
        />
        <CCardBody>
          <CCardTitle>{filteredItem.title}</CCardTitle>
          <CCardText>${filteredItem.price}</CCardText>
          <Link to={`/SingleItem/${filteredItem._id}`}>
            {' '}
            <CButton>See Item</CButton>
          </Link>
        </CCardBody>
      </CCard>
    ));
  };

  const getCategoryData = () => {
    return (
      <div id="catBtn" className="cats">
        {categoryData.categories.map((category) => (
          <div key={category._id} name={category.name} onClick={setState}>
            {category.name}
          </div>
        ))}
      </div>
    );
  };

  // console.log(itemData);
  const filteredData = () => {
    const newArr = itemData.items.filter((item) => {
      console.log(item.title);
      const lowerTitle = item.title.toLowerCase()
      if (lowerTitle.includes(inputText)) {
        return item;
      }
    });
    console.log(newArr);
  };

  // newArr.map((item) => (
  //   <div className="box" key={item._id}>
  //     <p>{item.title}</p>
  //     {/* <p>{item.author}</p> */}
  //   </div>
  // ));

  const showDiv = () => {
    if (document.querySelector('#catBtn').style.display === '') {
      document.querySelector('#catBtn').style.display = 'flex';
    } else {
      document.querySelector('#catBtn').style.display = '';
    }
  };

  const renderCards = () => {
    if (itemData && categories === undefined) {
      return getItemData();
    } else if (categories !== undefined) {
      return filterCategory();
    }
  };

  return (
    <div>
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          onChange={inputHandler}
          className="me-2 formField"
          aria-label="Search"
          input={inputText}
        />
        <button className="btn-primary">Search</button>
      </Form>
      <div className="selectCat">
        <button className="btn-primary" onClick={showDiv}>
          Categories
        </button>
      </div>

      <div>{categoryData ? getCategoryData() : <div>Loading...</div>}</div>
      <div className="itemContainer">{itemData ? filteredData() : <div>Loading...</div>}</div>
      <div className="itemContainer">{itemData ? renderCards() : <div>Loading...</div>}</div>
    </div>
  );
}

export default Homepage;
