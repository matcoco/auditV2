import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Modal } from 'react-bootstrap';
import { selectHardwareData, addCategory, updateCategory, deleteCategory } from '../store/hardwareSlice';
import SettingsFormsCategory from './pages/SettingsFormsCategory'
import ButtonValidation from './ButtonValidation';

const ManageCategoriesForms = () => {
    const dispatch = useDispatch();
    const hardwareData = useSelector(selectHardwareData);

    const [showModal, setShowModal] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [categoriesName, setCategoriesName] = useState([])
    const [lastedName, setLastedName] = useState([])
    const [showSettingsCategory, setShowSettingsCategory] = useState(false)
    const [currentSelectName, setCurrentSelectName] = useState("")

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleSubmit = () => {
        setShowSettingsCategory(false)
        if (isEditing) {
            dispatch(updateCategory({ categoryName, lastedName }));
        } else {
            dispatch(addCategory(categoryName));
        }
        handleCloseModal();
    };

    useEffect(() => {
        if (Object.entries(hardwareData).length !== 0) {
            let values = Object.entries(hardwareData.forms).map((item) => item[0])
            setCategoriesName(values)
        }
    }, [hardwareData])


    const handleEdit = (name) => {
        setIsEditing(true);
        setCategoryName(name);
        setLastedName(name)
        handleShowModal();
    };

    const handleDelete = (name) => {
        setShowSettingsCategory(false)
        dispatch(deleteCategory(name));
    };

    const handleEditForms = (name) => {
        setShowSettingsCategory(true)
        setCurrentSelectName(name)
    };

    return (
        <div className='mb-5'>
            <h2 className="mb-4">Gestionnaire des formulaires et catégorie</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categoriesName.map((name, index) => (
                        <tr key={index}>
                            <td>{name}</td>
                            <td>
                                <Button variant="outline-primary" onClick={() => handleEdit(name)}>Modifier</Button>{" "}
                                <ButtonValidation  onDelete={() => handleDelete(name)} />{" "}
                                <Button variant="secondary" onClick={() => handleEditForms(name)}>Paramétrer le formulaire</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="success" onClick={handleShowModal}>Ajouter</Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? 'Modifier' : 'Ajouter'} un élément</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div>
                            <label htmlFor="name">Nom:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={categoryName}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {isEditing ? 'Modifier' : 'Ajouter'}
                    </Button>
                </Modal.Footer>
            </Modal>

            <div>
                {
                    showSettingsCategory
                    &&
                    <SettingsFormsCategory
                        show={setShowSettingsCategory}
                        name={currentSelectName}
                    />}
            </div>
        </div>
    );
};

export default ManageCategoriesForms;