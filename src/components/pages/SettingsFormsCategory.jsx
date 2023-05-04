import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectHardwareData, addElementsToForm } from '../../store/hardwareSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table, Button } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


const SettingsFormsCategory = ({ show, name }) => {
    const hardwareData = useSelector(selectHardwareData);
    const [addedElements, setAddedElements] = useState([]);
    const [fieldsForms, setFieldsForms] = useState([])
    const dispatch = useDispatch();

    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const newElements = Array.from(addedElements);
        const [reorderedElement] = newElements.splice(result.source.index, 1);
        newElements.splice(result.destination.index, 0, reorderedElement);
        setAddedElements(addedElements => newElements);
    };

    const handleAddElement = (element) => {
        // Si ce n'est pas un doublon, ajoutez l'élément
        const isDuplicate = addedElements.some((item) => item.name === element.name);
        if (!isDuplicate) {
            setAddedElements([...addedElements, element]);
            toast.success('Élément ajouté à la liste !');
        } else {
            // Affichez une alerte indiquant que l'élément est déjà dans la liste
            toast.error('Cet élément a déjà été ajouté à la liste.');
        }
    };

    const handleRemoveElement = (index) => {
        setAddedElements(addedElements.filter((_, i) => i !== index));
    };



    const handleSubmit = () => {
        // Traitez les éléments ajoutés ici
       dispatch(addElementsToForm({ name, elements: addedElements }));
        toast.success('Les éléments ont été enregistrés dans le formulaire !');
        show(false)
    };

    const handleCancel = () => {
        show(false)
    }

    useEffect(() => {
        setFieldsForms(hardwareData.settings.fieldsForms)
        setAddedElements(hardwareData?.forms[name])
    }, [hardwareData, name])


    return (
        <div style={{ marginTop: '50px' }}>
            <ToastContainer />
            <h2>Champs de formulaire disponible</h2>
            <div style={{ display: 'flex', flexDirection: 'column', height: '400px', overflowY: 'scroll' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Label</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Ajouter</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fieldsForms.map((field, index) => (
                            <tr key={index}>
                                <td>{field.label}</td>
                                <td>{field.name}</td>
                                <td>{field.type}</td>
                                <td>
                                    <Button onClick={() => handleAddElement(field)}>Ajouter</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <div style={{ marginTop: "50px" }}>
                <h2>Formulaire {name}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', height: '400px', overflowY: 'scroll' }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Label</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                    <tbody {...provided.droppableProps} ref={provided.innerRef}>
                                        {addedElements.map((element, index) => (
                                            <Draggable key={element.name} draggableId={element.name} index={index}>
                                                {(provided) => (
                                                    <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <td>{element.label}</td>
                                                        <td>{element.name}</td>
                                                        <td>{element.type}</td>
                                                        <td>
                                                            <Button variant="outline-danger" onClick={() => handleRemoveElement(index)}>Supprimer</Button>
                                                        </td>
                                                    </tr>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </tbody>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </Table>
                </div>
                <Button variant="secondary" onClick={handleCancel}>Annuler</Button>{" "}
                <Button variant="outline-primary" onClick={handleSubmit}>Valider le formulaire</Button>
            </div>

        </div>
    );
};

export default SettingsFormsCategory;
