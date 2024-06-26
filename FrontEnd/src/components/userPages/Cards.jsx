import React, { useState } from "react";
import Modal from "./Modal";
function Card(props) {
    const token = localStorage.getItem('token');
    const [expanded, setExpanded] = useState(false);

    const [buttonState, setButtonState] = useState(props.type);

    const handleToggleDescription = () => {
        setExpanded(!expanded);
    };

    const handleSave = async (e) => {

        const response = await fetch('http://localhost:5000/api/seek/savedJobs', {
            method: 'Post',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ job_id: props._id })
        });
        setButtonState("saved");

    };

    const handleDelete = async (e) => {
        const response = await fetch('http://localhost:5000/api/seek/savedJobs/delete', {
            method: 'Post',
            headers: {
                'auth-token': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ job_id: props._id })
        });
        setButtonState("empty");

        const parentDiv = e.target.closest('.card'); // Assuming the card has a class 'card'
        if (parentDiv) {
            await parentDiv.remove();
        } else {
            console.error("Parent card element not found");
        }


    };


    return (

        <div id={props._id} >


            <div className="card-container" style={styles.cardContainer}>
                <div className="card text-left" style={styles.cardComponent}>
                    <div className="card-header">
                        <h5 className="card-title mb-3" style={styles.cardTitle}>{props.title}</h5>

                        <div className="row mb-2 p-1">
                            <div className="col-md-6">
                                <div className="row">
                                    <h6 className="mb-0 text-muted ml-3">Company:</h6>
                                    <h6 className="mb-0 text-muted ml-2" >
                                        {props.companyName}
                                    </h6>
                                </div>
                            </div>

                            <div className="col-md-6 ">
                                <div className="row">
                                    <h6 className="mb-0 text-muted ml-3">Location:</h6>
                                    <h6 className="mb-0 text-muted ml-2" >{props.location}</h6>
                                </div>
                            </div>

                        </div>


                        <div className="row mb-2 p-1">
                            <div className="col-md-6">
                                <div className="row">
                                    <h6 className="mb-0 text-muted ml-3">Salary:</h6>
                                    <h6 className=" mb-0 text-muted ml-2" >{props.Salary}</h6>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <h6 className="mb-0 text-muted ml-3">Posted On:</h6>
                                    <h6 className="mb-2 text-muted ml-2" >{props.postedDate}</h6>
                                </div>
                            </div>
                        </div>

                        </div>
                        <div className="card-body">
                        <div className="ml-3 mb-3 p-1">
                            <div className="row">


                                {props.Info.length > 100 ?
                                    <div >
                                        {expanded ?
                                            <div className="row" style={styles.expanded} >
                                                <h6 className="m-2 fw-normal mb-0 text-muted " style={styles.para}>{props.Info}</h6>
                                                <button className="btn btn-link btn-sm" onClick={handleToggleDescription}>Show Less</button>

                                            </div> :
                                            <div className="row" style={styles.truncated} >
                                                <h6 className="ml-2 fw-normal mb-0 text-muted"  style={styles.para}>{props.Info.substring(0, 200)} </h6>
                                                <button className="btn btn-link btn-sm pt-0 mt-0" onClick={handleToggleDescription}>Show More</button>

                                            </div>
                                        }
                                    </div>

                                    :
                                    <div  >
                                        <h6 className="fw-normal mb-0 text-muted">{props.Info}</h6>
                                    </div>
                                }

                            </div>
                        </div>
                        </div>
                        <div className="card-footer">

                        {props.page === 'rec' && (
                            <div style={styles.buttonGroup}>
                                {(buttonState === 'saved') &&
                                    <div>
                                        <button className="btn btn-warning btn-sm" style={styles.actionButton}>Saved</button>

                                        <Modal jobId={props._id} name="Apply" />

                                    </div>
                                }
                                {buttonState === 'applied' &&
                                    <button className="btn btn-success btn-sm" style={styles.actionButton}>Applied</button>}

                                {buttonState === 'empty' &&
                                    <div>
                                        <button className="btn btn-primary btn-sm" style={styles.actionButton} onClick={handleSave}>Save</button>
                                        <Modal _id={props._id} name="Apply" />


                                    </div>
                                }


                            </div>
                        )}

                        {props.page === 'save' && (

                            <div style={styles.buttonGroup}>

                                {buttonState === 'applied' &&
                                    <div>
                                        <button className="btn btn-danger btn-sm" style={styles.actionButton} onClick={handleDelete}>Remove</button>

                                        <button className="btn btn-success btn-sm" style={styles.actionButton}>Applied</button>
                                    </div>
                                }

                                {buttonState === 'saved' && <div>
                                    <button className="btn btn-danger btn-sm" style={styles.actionButton} onClick={handleDelete}>Remove</button>
                                    <Modal _id={props._id} name="Apply" />
                                </div>
                                }
                            </div>

                        )}

                        {props.page === 'applied' && (

                            <div style={styles.buttonGroup}>

                                {buttonState === 'Pending' &&
                                    <div>
                                        <button className="btn btn-primary btn-sm" style={styles.actionButton} >Pending</button>
                                    </div>
                                }

                                {buttonState === 'Rejected' &&
                                    <div>
                                        <button className="btn btn-danger btn-sm" style={styles.actionButton} >Rejected</button>
                                        <Modal _id={props._id} name="Message" />
                                    </div>
                                }
                                {buttonState === 'Accepted' &&
                                    <div>
                                        <button className="btn btn-success   btn-sm" style={styles.actionButton} >Rejected</button>
                                        <Modal _id={props._id} name="Message" />
                                    </div>
                                }
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const styles = {
    cardContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2%',

    },
    cardComponent: {
        width: '100%',
        borderRadius: "15px",
        backgroundColor: 'white',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
        padding: '10px',
    },
    cardTitle: {
        fontWeight: 'bold',
        color: '#333',
    },
    actionButton: {
        padding: '8px 20px',
        marginLeft: '10px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
    },

    truncated: {

        overflow: 'visible',
        whiteSpace: 'normal',

    },

    expanded: {
        overflow: 'hidden',
        whiteSpace: 'normal',

    },
    para: {
        lineHeight: '1.5em',
        whiteSpace: 'pre-wrap'

    }
};

export default Card;