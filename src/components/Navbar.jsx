import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Dropdown, Card } from "react-bootstrap";

function TodoApp() {
    const [todoName, setTodoName] = useState("");
    const [todoDescription, setTodoDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [editingIndex, setEditingIndex] = useState(null); // Index for the todo being edited
    const [editName, setEditName] = useState(""); // Edit name
    const [editDescription, setEditDescription] = useState(""); // Edit description

    const handleAddTodo = () => {
        if (todoName && todoDescription) {
            setTodos([...todos, { name: todoName, description: todoDescription, status: 'Not Completed' }]);
            setTodoName("");
            setTodoDescription("");
        } else {
            alert("Please fill in both fields.");
        }
    };

    const handleDeleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    const handleStatusChange = (index, status) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, status: status } : todo
        );
        setTodos(updatedTodos);
    };

    // Start editing a todo
    const startEditing = (index) => {
        const todo = todos[index];
        setEditingIndex(index);
        setEditName(todo.name);
        setEditDescription(todo.description);
    };

    // Save the edited todo
    const saveEdit = () => {
        if (editName && editDescription) {
            const updatedTodos = todos.map((todo, i) =>
                i === editingIndex ? { ...todo, name: editName, description: editDescription } : todo
            );
            setTodos(updatedTodos);
            setEditingIndex(null); // Clear editing mode
            setEditName(""); // Clear the edit fields
            setEditDescription("");
        } else {
            alert("Please fill in both fields.");
        }
    };

    // Cancel the edit
    const cancelEdit = () => {
        setEditingIndex(null); // Clear editing mode
        setEditName(""); // Clear the edit fields
        setEditDescription("");
    };

    const filteredTodos = todos.filter(todo =>
        statusFilter === 'All' || todo.status === statusFilter
    );

    const visibleTodos = filteredTodos.slice(0, 9);

    return (
        <Container className="mt-5">
            {/* Form Row */}
            <Row className="align-items-center mb-3">
                <Col md={4}>
                    <Form.Control
                        style={{ border: '1.5px solid green' }}
                        type="text"
                        placeholder="Todo Name"
                        value={todoName}
                        onChange={(e) => setTodoName(e.target.value)}
                    />
                </Col>
                <Col md={4}>
                    <Form.Control
                        style={{ border: '1.5px solid green' }}
                        type="text"
                        placeholder="Todo Description"
                        value={todoDescription}
                        onChange={(e) => setTodoDescription(e.target.value)}
                    />
                </Col>
                <Col md={3}>
                    <Button className="addbtn" variant="outline-success" onClick={handleAddTodo}>
                        Add Todo
                    </Button>
                </Col>
            </Row>

            {/* Status Filter Dropdown */}
            <Row style={{ marginTop: '20px' }}>
                <Col md={12} style={{ textAlign: 'right' }}>
                    <Dropdown>
                        <Dropdown.Toggle variant="danger" id="dropdown-basic">
                            {statusFilter} Status
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ backgroundColor: "brown" }}>
                            <Dropdown.Item
                                style={{ color: "white" }}
                                onClick={() => setStatusFilter('All')}
                            >
                                All
                            </Dropdown.Item>
                            <Dropdown.Item
                                style={{ color: "white" }}
                                onClick={() => setStatusFilter('Completed')}
                            >
                                Completed
                            </Dropdown.Item>
                            <Dropdown.Item
                                style={{ color: "white" }}
                                onClick={() => setStatusFilter('Not Completed')}
                            >
                                Not Completed
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            {/* Todo Cards Display */}
            <Row style={{ marginTop: '40px' }}>
                {visibleTodos.length > 0 ? (
                    visibleTodos.map((todo, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <Card style={{ backgroundColor: "aquamarine" }}>
                                <Card.Body className="text-start">
                                    <Card.Text><h6>Name: {todo.name}</h6></Card.Text>
                                    <Card.Text><h6>Description: {todo.description}</h6></Card.Text>
                                    <Card.Text>
                                        <Dropdown>
                                            <h6>Status:&#x00A0;&#x00A0;
                                                <Dropdown.Toggle
                                                    variant={todo.status === 'Completed' ? 'success' : 'danger'}
                                                    id="dropdown-basic"
                                                >
                                                    {todo.status}
                                                </Dropdown.Toggle>
                                            </h6>
                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    onClick={() => handleStatusChange(index, 'Completed')}
                                                >
                                                    Completed
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => handleStatusChange(index, 'Not Completed')}
                                                >
                                                    Not Completed
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <div className="mt-3">
                                            <Button variant="success" style={{ width: "30%" }} onClick={() => startEditing(index)}>
                                                Edit
                                            </Button>
                                            <Button variant="danger" style={{ marginLeft: "10%", width: "30%" }} onClick={() => handleDeleteTodo(index)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col md={12}>
                        <p>No todos available</p>
                    </Col>
                )}
            </Row>

            {/* Edit Todo Modal or Form */}
            {editingIndex !== null && (
                <Row className="mt-4">
                    <Col md={12}>
                        <h5>Edit Todo</h5>
                        <Form>
                            <Form.Group controlId="formTodoName">
                                <Form.Label>Todo Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formTodoDescription">
                                <Form.Label>Todo Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                />
                            </Form.Group>
                            <div className="mt-3">
                                <Button variant="primary" onClick={saveEdit}>
                                    Save
                                </Button>
                                <Button variant="secondary" onClick={cancelEdit} style={{ marginLeft: "10%" }}>
                                    Cancel
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default TodoApp;
