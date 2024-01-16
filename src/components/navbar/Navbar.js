/* eslint-disable no-useless-constructor */
import React from 'react';
import styles from './Navbar.module.css';
import IconButton from '@mui/material/IconButton';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const Navbar = (props)=>{
    
        const handleKeyDown = (e) =>{
            if(e.key === 'Enter'){
                props.searchLocationSubmit(e)
            }
        }

        
        return(

            <div className={styles.header}>               
                <div className={styles.titleContainer}>
                    <h3>My Weather App</h3>
                </div>
                <div className={styles.btnContainer}>    
                       <div className={styles.search}>
                       <input type="text" name="searchLocation" value={props.search} onKeyUp={handleKeyDown} onChange={(e)=>props.searchChangeHandler(e)} placeholder='Search for a location...'/> 
                       <IconButton onClick={(e)=>props.searchLocationSubmit(e)} color="primary"  variant="contained" size="large" aria-label="search">
                            <SearchOutlinedIcon  />
                        </IconButton>

                       </div>                    
                       <IconButton  color="secondary"  variant="contained" size="large" aria-label="current location" onClick={()=>props.GeoLocateMe()} >
                            <MyLocationIcon  />
                        </IconButton>                      
                </div>                           
            </div>
        ) 
    
}

export default Navbar;