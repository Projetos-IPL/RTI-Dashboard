import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

function PhotoModal({ showModal, handleClose, image, loading }) {
  return (
    <Modal show={showModal} onHide={handleClose} size="lg" centered>
      <ModalHeader closeButton>
        <ModalTitle>Foto</ModalTitle>
      </ModalHeader>
      <ModalBody>
        {!loading && (
          <img
            src={"data:image/jpeg;charset=utf-8;base64," + image}
            width="100%"
            alt="Imagem da Webcam"
          />
        )}
        <ClipLoader loading={loading} css="display: block; margin: 0 auto;" />
      </ModalBody>
    </Modal>
  );
}

export default PhotoModal;
