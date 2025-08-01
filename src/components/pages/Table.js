import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllTables, saveTableRequest } from "../../redux/tablesRedux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col} from "react-bootstrap";

const Table = () => {
  // Pobieramy ID stolika z URL-a (np. /table/3 → id = "3")
    const { id } = useParams();

  // Hook do przekierowania użytkownika (po edycji stolika)
    const navigate = useNavigate();

  // Pobieramy listę wszystkich stolików z Reduxa
    const tables = useSelector(getAllTables);

  // Inicjalizacja hooka dispatch do wysyłania akcji do Reduxa
    const dispatch = useDispatch();

  // Szukamy konkretnego stolika po jego ID
    const table = tables.find(tables => tables.id === id);

  // Inicjalizujemy stany lokalne z danymi stolika (status, liczba osób itd.)
    const [status, setStatus] = useState(table.status)
    const [peopleAmount ,setPeopleAmount] = useState(table.peopleAmount)
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount)
    const [bill, setBill] = useState(table.bill)

  // Obsługa formularza: symulacja zapisania zmian i powrót do strony głównej
    const handleSubmit = (e) => {
  e.preventDefault();

  // Możesz usunąć alert jeśli od razu chcesz robić dispatch
  // alert('Updated table (symulacja)');

  // Tworzymy obiekt do zapisu z aktualnymi danymi
  const updatedTable = {
    ...table,
    status,
    peopleAmount,
    maxPeopleAmount,
    bill,
  };

  // Wywołujemy thunk, który zapisze dane na serwer i w redux store
  dispatch(saveTableRequest(updatedTable))
    .then(() => {
      // Po sukcesie nawigujemy do strony głównej
      navigate('/');
    })
};
  // Jeśli nie znaleziono stolika – wyświetl informację
  if (!table) return <p>Table not found</p>;

    return (
        <div>
            <h2>Table {table.id}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select value={status} onChange = {(e) => setStatus(e.target.value)}>
                        <option>Free</option>
                        <option>Reserved</option>
                        <option>Busy</option>
                        <option>Cleaning</option>
                    </Form.Select>               
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>People / Max People</Form.Label>
                    <Row>
                        <Col xs="auto" className="pe-1">
                        <Form.Control
                            type="number"
                            min={0}
                            max={maxPeopleAmount}
                            value={peopleAmount}
                            onChange={e => setPeopleAmount(Number(e.target.value))}
                        />
                        </Col>
                        <Col xs="auto" className="d-flex align-items-center px-0">
                        <span>/</span>
                        </Col>
                        <Col xs="auto" className="ps-1">
                        <Form.Control
                            type="number"
                            min={1}
                            max={10}
                            value={maxPeopleAmount}
                            onChange={e => setMaxPeopleAmount(Number(e.target.value))}
                        />
                        </Col>
                    </Row>
                </Form.Group>
                {/* Rachunek (pokazuje się tylko jeśli status = Busy) */}
                {status === 'Busy' && (
                <Form.Group className="mb-3">
                    <Form.Label>Bill</Form.Label>
                        <Form.Control
                            type="number"
                            value={bill}
                            onChange={(e) => setBill(parseFloat(e.target.value))}
                        />
                </Form.Group>
                )}
                <Button type="submit" variant="success">Update</Button>
            </Form>
        </div>
    )
};

export default Table;