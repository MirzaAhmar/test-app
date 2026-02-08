import React, { useState } from 'react';
import { videoBanner } from '../assets/images';
import { faCircleXmark, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Modal from 'react-modal';
Modal.setAppElement('#root');

const Video = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleOverlayClick = (e) => {
        // Ensure click is on the overlay, not on modal content
        if (e.target.classList.contains('youtube-modal-overlay')) {
            closeModal();
        }
    };

    return (
        <section id="video">
            <div className="container">
                <figure>
                    <img src={videoBanner} alt="videoBanner" />
                    <div className="play_btn open-video-btn" onClick={openModal}>
                        <FontAwesomeIcon icon={faPlay} />
                    </div>
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        className="youtube-modal"
                        overlayClassName="youtube-modal-overlay"
                    >
                        <div
                            className="youtube-modal-overlay"
                            onClick={handleOverlayClick}
                        >
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                {/* Prevent modal content click from closing the modal */}
                                <button onClick={closeModal} className="close-modal-btn"><FontAwesomeIcon icon={faCircleXmark} /></button>
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src="https://www.youtube.com/watch?v=u0AngRHdEig"
                                    title="YouTube video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    </Modal>
                </figure>
            </div>
        </section>
    );
};

export default Video;
