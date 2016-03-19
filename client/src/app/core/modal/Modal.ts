import {
    Component,
    DynamicComponentLoader,
    ApplicationRef,
    Injector,
    provide,
    Injectable
} from 'angular2/core';

import {ModalInstance, IModal} from './ModalInstance';

export default function ModalDecorator(options?: any) {
    return function <TFunction extends Function>(target: TFunction): any {
        const template = options && options.template;

        @Injectable()
        class Modal implements IModal {
            private modalInstance: ModalInstance;

            constructor(private componentLoader: DynamicComponentLoader,
                        private appRef: ApplicationRef) {
                const modalInstance = new ModalInstance();
                this.modalInstance = modalInstance;
                this.modalInstance.open = this.open.bind(this);
            }

            open() {
                const injectors = Injector.resolve([provide(ModalInstance, {useValue: this.modalInstance})]);

                this.componentLoader
                    .loadNextToLocation(ModalComponent, this.appRef['_rootComponents'][0].location, injectors)
                    .then((modalRef) => {
                        this.modalInstance.setModalRef(modalRef);

                        this.componentLoader.loadIntoLocation(target, modalRef.location, 'modalContent', injectors)
                            .then((contentComponentRef) => {
                                this.modalInstance.setModalContentRef(contentComponentRef);

                                return contentComponentRef;
                            });
                    });
            }

            close() {
                this.modalInstance.close();
            }
        }

        @Injectable()
        @Component({
            selector: 'modal',
            template: template || require('./modal.html')
        })
        class ModalComponent {
            constructor(private modal: ModalInstance) {

            }

            private onContainerClick(event) {
                this.modal.close();
            }
        }

        return Modal;
    }
}