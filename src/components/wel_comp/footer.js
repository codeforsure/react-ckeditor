import React from 'react';
import { Grid, NavItem } from 'react-bootstrap';

function Footer(){
  return(
    <div className = "footer">
    <footer>
      <Grid>
          <NavItem
            eventKey={2}
            title="Item">
            Terms & Conditions
          </NavItem>
        <div className="text-center small copyright">
          © copyright 2019
        </div>
      </Grid>
    </footer>
    </div>
  );
}
export default Footer;
