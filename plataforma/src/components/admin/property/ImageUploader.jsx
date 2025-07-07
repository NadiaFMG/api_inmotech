import React, { useState } from 'react';
import { Form, Row, Col, Image, Button } from 'react-bootstrap';
import { FaUpload, FaTrash } from 'react-icons/fa';

const ImageUploader = ({ images, onImageUpload, onImageRemove }) => {
    const [previewImages, setPreviewImages] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages([...previewImages, ...previews]);
        onImageUpload(files);
    };

    return (
        <div className="mb-4">
            <h4 className="mb-3">Imágenes y Videos</h4>
            <Form.Group>
                <Form.Label className="w-100">
                    <div className="upload-area p-4 border rounded text-center">
                        <FaUpload className="mb-2" size={30} />
                        <p className="mb-0">Arrastra las imágenes aquí o haz clic para seleccionar</p>
                    </div>
                    <Form.Control
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </Form.Label>
            </Form.Group>

            <Row className="mt-3">
                {previewImages.map((preview, index) => (
                    <Col key={index} xs={6} md={3} className="mb-3">
                        <div className="position-relative">
                            <Image src={preview} fluid className="preview-image" />
                            <Button
                                variant="danger"
                                size="sm"
                                className="position-absolute top-0 end-0 m-1"
                                onClick={() => onImageRemove(index)}
                            >
                                <FaTrash />
                            </Button>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ImageUploader;