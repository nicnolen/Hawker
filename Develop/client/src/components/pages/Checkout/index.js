import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { QUERY_CHECKOUT, QUERY_SINGLE_ITEM } from '../../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';
import Confirmation from '../Confirmation';
import { ExternalLink } from 'react-external-link';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Checkout = () => {
  let itemId = window.location.href.slice(-24);
  const itemIds = useQuery(QUERY_SINGLE_ITEM, { variables: { id: itemId } });
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  // console.info(data);
  const details = JSON.parse(localStorage.getItem('itemData')).item;

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  function submitCheckout() {
    window.location.assign('/success');
    const id = [];
    id.push(itemIds);
    getCheckout({
      variables: { items: id }
    });
  }

  const tax = (8.25 / 100) * details.price;
  const shipping = (5 / 100) * details.price;
  const total = details.price + tax + shipping;

  return (
    <div className="itemContainer">
      <div>
        <h1>Purchase Confirmation</h1>
        <h3>Shipping Details</h3>
        <button
          className="openModalBtn btn-primary"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Add
        </button>
        {modalOpen && <Confirmation setModalOpen={setModalOpen} />}
      </div>
      <div className='priceDiv'>
        <div className="pricing">
        <p>Item Price- {details.price}</p>
        <p>Sales Tax- {tax}</p>
        <p>Shipping- {shipping}</p>
        <p>Total- {total}</p>
        </div>
        

        <div>
          <img src={details.image} alt={details.title} style={{ width: '10rem' }}></img>
        </div>

        <div>
          <button onClick={submitCheckout} className="btn-primary no-link">
            <ExternalLink href="https://buy.stripe.com/test_28o9CgcqlgDD7vO7ss">
              <span>Checkout</span>
            </ExternalLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
