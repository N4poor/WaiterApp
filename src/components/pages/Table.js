import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllTables } from "../../redux/tablesRedux";
import { useNavigate } from "react-router-dom";
import { Form, Button} from "react-bootstrap";

const Table = () => {
  // Pobieramy ID stolika z URL-a (np. /table/3 → id = "3")
    const { id } = useParams();

  // Hook do przekierowania użytkownika (po edycji stolika)
    const navigate = useNavigate();

  // Pobieramy listę wszystkich stolików z Reduxa
    const tables = useSelector(getAllTables);

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
        // TODO: tutaj w przyszłości dodamy dispatch do aktualizacji danych w store i/lub API
        alert('Updated table (symulacja)');
        navigate('/');
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
                    <Form.Label>People</Form.Label>
                        <Form.Control
                            type="number"
                            value={peopleAmount}
                            onChange={(e) => setPeopleAmount(parseInt(e.target.value))}
                        />                      
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Max People</Form.Label>
                        <Form.Control
                            type="number"
                            value={maxPeopleAmount}
                            onChange ={(e) => setMaxPeopleAmount(parseInt(e.target.value))}
                        />
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