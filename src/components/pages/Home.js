import React from 'react';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../redux/tablesRedux';
import { Link } from 'react-router-dom';
import { Button, ListGroup,} from 'react-bootstrap';

const Home = () => {

   const tables = useSelector(getAllTables);

   return (
      <div>
         <h2>All Tables</h2>
         <ListGroup>
            {tables.map(table => (
               <ListGroup.Item key={table.id} className="d-flex justify-content-between align-items-center">
                  <div>
                     <strong>Table {table.id}</strong>{' '}
                     <span className="ms-3">
                        <strong>Status:</strong> {table.status}
                     </span>
                  </div>
                  <Link to={`/table/${table.id}`}>
                     <Button variant="primary">Show more</Button>
                  </Link>
               </ListGroup.Item>
            ))}
         </ListGroup>
      </div>
   )
};

export default Home;