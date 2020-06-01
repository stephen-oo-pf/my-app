// File: dialogs/Modal.tsx
// Date: 05/28/2020
// Note: react-modal / @types/react-modal
//..............................................................................
import React from "react";
import ReactModal from "react-modal";
import VideoReact from "./VideoReact";
import ReactSelect from "./ReactSelect"
interface IModalProps {
  modalContent?: string | JSX.Element;
  widthClose?: boolean;
}

interface IModalState {
  showModal: boolean;
}

ReactModal.setAppElement("#root");

class Modal extends React.Component<IModalProps, IModalState> {
  /** CONSTRUCTOR */
  constructor(props: IModalProps) {
    super(props);
    this.state = {
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  /** EVENT's */
  private handleOpenModal() {
    this.setState({ showModal: true });
  }

  private handleCloseModal() {
    this.setState({ showModal: false });
  }

  /** RENDER */
  public render(): JSX.Element {
    const { modalContent, widthClose } = this.props;
    const customModalStyle = {
      content: {
      	width: "320px",
      	height: "240px",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)"
      }
    };
    return (
      <div>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Minimal Modal Example"
          style={customModalStyle}
        >
       
        		<ReactSelect />
         	
          <div style={{ display: "flex", flexDirection: "column" }}>
            {modalContent}
            {widthClose && (
              <button onClick={this.handleCloseModal}>Close Modal</button>
            )}
          </div>
        </ReactModal>
      </div>
    );
  }
}
export default Modal;
