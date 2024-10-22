import { useEffect, useRef, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';

import { fetchTodos } from '../../data/todos';

import './Todo.css'

const initItemsPerPage = 10
const initOnlyWaiting = false

function Todo() {
    // todosRaw -> filters -> todos -> display 
    // todosRaw
    const [todosRaw, setTodoRaw] = useState([])
    // filters
    const [onlyWaiting, setOnlyWaiting] = useState(false)
    const [itemsPerPage, setItemsPerPage] = useState(5)
    //  todos
    const [todos, setTodos] = useState([])
    // display 
    const [numPages, setNumPages] = useState(0)
    const [curPage, setCurPage] = useState(0)

    const itemsPerPageRef = useRef()
    const onlyWaitingRef = useRef()

    useEffect (() => {
        setTodoRaw(fetchTodos())

        setOnlyWaiting(initOnlyWaiting)
        itemsPerPageRef.current.value = initItemsPerPage
        
        setItemsPerPage(initItemsPerPage)
        onlyWaitingRef.current.checked = initOnlyWaiting
    }, [])

    useEffect(() => {
        if (onlyWaiting) {
            setTodos(todosRaw.filter((todo) => !todo.completed))
        } else {
            setTodos(todosRaw)
        }       
    }, [todosRaw, onlyWaiting]) // onlyWaiting

    useEffect(() => {
        setNumPages(Math.ceil(todosRaw.length / itemsPerPage))
    }, [todos, itemsPerPage])

    useEffect(() => {
        if (numPages <= 0) setCurPage(0)
        else if (curPage === 0) setCurPage(1)
        else if (curPage > numPages) setCurPage(numPages)
    }, [numPages])

    // event handle
    function deleteClick(id) {
        setTodoRaw(todosRaw.filter( (todo) =>  todo.id !== id ))
    }

    function waitClick(id) {
        const todosRawSelected = todosRaw.find( (todo) => todo.id === id )
        todosRawSelected.completed = true
        setTodoRaw( [...todosRaw] ) // ระเบิดออกมา
    }

    function addClick(id, title) {
        const newItem = {
            id,
            title,
            completed: false,
            userId: 1,
        }
        setTodoRaw([...todosRaw, newItem])
    }

    // modal handlers
    const [show, setShow] = useState(false);

    const newIdRef = useRef()
    const newTitleRef = useRef()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (  
        <div className='todo-container'>
            <hr />
            {/* modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <span className='bi bi-plus-lg'>&nbsp;Add todo</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>ID:</Form.Label>
                            <Form.Control 
                                type="text" 
                                autoFocus 
                                disabled 
                                value={
                                    Number(
                                        todosRaw.reduce( 
                                        (prev, todo) => (todo.id > prev ? todo.id : prev), 0)) + 1
                                } 
                                ref={newIdRef}
                                style={{ textAlign: 'left' }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control type="text" autoFocus ref={newTitleRef}  style={{ textAlign: 'left' }}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >
                        <span className='bi bi-x-lg'>&nbsp; Cancel</span>
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={ () => {
                            const id = newIdRef.current.value
                            const title = newTitleRef.current.value.trim()
                            if (title === '') {
                                alert('Title cannot be empty')
                                newTitleRef.current.value = ''
                                newTitleRef.current.focus() 
                            } else {
                                addClick(id, title)
                                handleClose()
                            } 
                        }}>
                        <span className='bi bi-plus-lg'>&nbsp; Add</span>
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* filter controls */}
            <div className='todo-filter-container'>
                {/* toggle  */}
                <div className="form-check form-switch">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        role="switch" 
                        id="flexSwitchCheckChecked" 
                        onChange={(e) => {setOnlyWaiting(e.target.checked)}}
                        ref={onlyWaitingRef}
                    />
                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
                        Show only &nbsp; 
                    </label>
                    <button className='btn btn-warning' disabled >
                        waiting&nbsp;
                        <span className='bi bi-clock'></span>
                    </button>
                </div>

                {/* items per page  */}
                <select 
                    className="form-select" 
                    aria-label="Default select example"
                    defaultValue={5}
                    style={{width : '200px'}}
                    onChange={(e) => {setItemsPerPage(e.target.value)}}
                    ref={itemsPerPageRef}>
                        <option value={5} selected>5 items per page</option>
                        <option value={10}>10 items per page</option>
                        <option value={50}>50 items per page</option>
                        <option value={100}>100 items per page</option>
                </select>
            </div>

            {/* table  */}
            <table className='table table-striped' >
                <thead className='table-dark'>
                    <tr>
                        <th style={{width : '5%'}} valign='middle' align='left'>ID</th>
                        <th valign='middle' >TITLE</th>
                        <th style={{ textAlign : 'right', width : '20%' }}>
                            Completed &nbsp;
                            <button className='btn btn-primary'
                                onClick={ () => {handleShow()} }>
                               <span className='bi bi-plus-lg'></span>
                            </button>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {todos.
                    filter( (todo, index) => {
                            const min = (curPage - 1 ) * itemsPerPage
                            const max = curPage * itemsPerPage - 1
                            return index >= min && index <= max
                        })
                    .map((todo) => (
                        <tr key={todo.id}>
                            <td valign='middle'>  
                                <span 
                                    className='badge bg-secondary'
                                    style={{ width : '3rem'}}>
                                    {todo.id}
                                </span>
                            </td>
                            <td align='left' valign='middle'>{todo.title}</td>
                            <td align='right' valign='middle'>
                                {todo.completed ? (
                                    <span className='badge bg-success'>
                                        done &nbsp;
                                        <span className='bi bi-check'></span>
                                    </span>
                                ) : (
                                    <button 
                                        className='btn btn-warning' 
                                        onClick={ () => {waitClick(todo.id)} }>
                                        waiting &nbsp;
                                        <span className={'bi bi-clock'}></span>
                                    </button>
                                )}
                                &nbsp;
                                <button className='btn btn-danger'
                                    onClick={ () => { deleteClick(todo.id)} } >
                                    <span className='<bi bi-trash'></span>
                                </button> 
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* page control  */}
            <div>
                <button 
                    className='btn btn-outline-primary todo-button-spacing'
                    onClick={() => {setCurPage(1)}}
                    disabled={curPage <= 1}>
                    First
                </button>
                <button 
                    className='btn btn-outline-primary todo-button-spacing'
                    onClick={() => curPage > 1 && setCurPage (curPage - 1)}
                    disabled={curPage === 1}
                    >
                    Previous
                </button>
                <span className='todo-space'>
                    {curPage}&nbsp;/&nbsp;{numPages}
                </span>
                <button 
                    className='btn btn-outline-primary todo-button-spacing'
                    onClick={() => curPage < numPages && setCurPage (curPage + 1)}
                    disabled={curPage === numPages}
                    >
                    Next
                </button>
                <button 
                    className='btn btn-outline-primary todo-button-spacing'
                    onClick={() => {setCurPage(numPages)}}
                    disabled={curPage === numPages}>
                    Last
                </button>
                <hr />
            </div>
        </div>
    );
}

export default Todo;