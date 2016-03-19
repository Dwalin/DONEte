import {
    Injectable,
    ComponentRef
} from 'angular2/core';


@Injectable()
export class ModalInstance implements IModal {
    private contentComponentRef: ComponentRef;
    private modalRef: ComponentRef;

    constructor() {
    }

    open() {

    }

    close() {
        if (this.contentComponentRef) {
            this.contentComponentRef.dispose();
            this.modalRef.dispose();
        }
    }

    setModalRef(modalRef: ComponentRef) {
        this.modalRef = modalRef;
    }

    setModalContentRef(contentComponentRef: ComponentRef) {
        this.contentComponentRef = contentComponentRef
    }
}

export interface IModal {
    open: Function,
    close: Function
}