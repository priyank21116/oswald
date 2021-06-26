import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import {
      showSelectedItem,
      removeSelectedItem,
      addToCart,
} from "../redux/actions/actionCreater";
import './containerStyle.css'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Navbar from "../components/Navbar"


const ItemDetails = () => {
      const [quantity, setQuantity] = useState(1)
     const[toAddOnCart,settoAddOn] =useState({
           item:{},
           quant:1,
     })

      const { id } = useParams();
      const Allitem = useSelector((state) => state.allItems.listarray);


      var deatiledProd = Allitem.find(item => item.id === parseInt(id))
      var deatiledProdReducer = useSelector((state) => state.oneProduct);

      console.log("DEtailed itemssss from Reducer ", deatiledProdReducer)
       console.log("tihs is quantitiy",quantity)
      const { image, title, price, category, description } = deatiledProdReducer;
      
      function Addon(){
            settoAddOn({
                  item : deatiledProdReducer,
                  quant : quantity,
            })


            dispatch(addToCart(toAddOnCart))
            console.log("tihs is addon   ",toAddOnCart)

      }

      const dispatch = useDispatch();

      useEffect(() => {
            if (id && id !== "") dispatch(showSelectedItem(deatiledProd));
            return () => {
                  dispatch(removeSelectedItem())
            }
      }, [id]);

      const discount = 6;
      return (
            <div >
                  {Object.keys(deatiledProd).length === 0 ? (
                        <div>...Loading</div>
                  ) : (

                        <section id="header" className="d-flex align-items-center">
                        <Navbar />
                              <Container maxWidth="md" id="detail_conatainer">
                                    <Grid container spacing={4} item >

                                          <div className="container-fluid nav_bg">
                                                <div className="row">
                                                      <Grid item xs={12} md={6}>
                                                            <div className="">
                                                                  <img className="details_img" alt="homeimg" src={image} />

                                                            </div>
                                                      </Grid>
                                                      <Grid item xs={12} md={6}>

                                                            <div className="detail_text">
                                                                  <h1>{title}</h1>
                                                                  <h4 className=""> <strong className="brand-name">#{category}</strong></h4>
                                                                  <h5>{description}</h5>
                                                                  <div className="rowprice">
                                                                        <div className="col-6">
                                                                              <Typography variant="body1" id="cardprice1">
                                                                                    ${price}
                                                                              </Typography>
                                                                              <span>6% off</span>
                                                                        </div>
                                                                        <div className="col-6">
                                                                              <Typography variant="body1" id="cardprice2">
                                                                                    ${(price - discount / 100 * price).toFixed(2)}
                                                                              </Typography>
                                                                        </div>


                                                                  </div>
                                                                  <Grid item md={4}>
                                                                  <div className="details_info_incdec xyz">
                                                                        <span className="dec" onClick={() => { if (quantity > 1) { setQuantity(quantity - 1) } }}><RemoveIcon /></span>
                                                                        <span className="quantity">{quantity}</span>
                                                                        <span className="inc" onClick={() => setQuantity(quantity + 1)}><AddIcon /></span>


                                                                  </div>
                                                                  </Grid>
                                                                  <Grid item md={8}>
                                                                  <div className="mt-6 xyz" id="detailaddtocartbuton">
                                                                        <button type="button" class="btn btn-primary" onClick={()=>  dispatch(addToCart({deatiledProdReducer,quantity}))}>ADD TO CART</button>

                                                                  </div>
                                                                  </Grid>
                                                            </div>
                                                      </Grid>

                                                </div>
                                          </div>
                                    </Grid>
                              </Container>

                        </section>
                  )}

            </div>

      )
}

export default ItemDetails;