import { ReactNode } from 'react';

type ModalProps = {
	openModal: boolean;
	setOpenModal: (open: boolean) => boolean | void;
	children: ReactNode;
};

const AddMedia = ({ openModal, setOpenModal, children }: ModalProps) => {
	return (
		<>
			<dialog
				id="my_modal_3"
				className={`modal ${openModal ? 'modal-open' : ''}`}
			>
				<div className="modal-box">
					<button
						onClick={() => setOpenModal(false)}
						className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
					>
						✕
					</button>
					{children}
				</div>
			</dialog>
		</>
	);
};

export default AddMedia;
